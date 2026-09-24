import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Stripe from 'stripe';
import { RATE_CARD, VEHICLES, calculateOrderTotals } from '../rates.js';
import { sendBookingNotifications, getNotificationRecipients } from '../mailer.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isVercel = Boolean(process.env.VERCEL);
const RESERVATIONS_FILE = isVercel
  ? path.join('/tmp', 'ktown_reservations.json')
  : path.join(__dirname, '../data/reservations.json');

const router = express.Router();

// Initialize Stripe if valid key is available
const stripeKey = process.env.STRIPE_SECRET_KEY;
const isStripeConfigured = Boolean(stripeKey && stripeKey.startsWith('sk_') && !stripeKey.includes('your_stripe_secret_key'));
const stripe = isStripeConfigured ? new Stripe(stripeKey) : null;

// In-memory cache fallback for serverless environments
let inMemoryReservations = [];

// Helper to read and write reservations
function getReservations() {
  try {
    if (!fs.existsSync(RESERVATIONS_FILE)) {
      try {
        fs.writeFileSync(RESERVATIONS_FILE, JSON.stringify([]));
      } catch {
        return inMemoryReservations;
      }
      return [];
    }
    const data = fs.readFileSync(RESERVATIONS_FILE, 'utf-8');
    return JSON.parse(data || '[]');
  } catch (err) {
    console.warn('Reservations read note (in-memory fallback):', err.message);
    return inMemoryReservations;
  }
}

function saveReservation(reservation) {
  try {
    const list = getReservations();
    const existingIndex = list.findIndex(r => r.id === reservation.id);
    if (existingIndex >= 0) {
      list[existingIndex] = { ...list[existingIndex], ...reservation, updatedAt: new Date().toISOString() };
    } else {
      list.unshift({ ...reservation, createdAt: new Date().toISOString() });
    }
    inMemoryReservations = list;
    try {
      fs.writeFileSync(RESERVATIONS_FILE, JSON.stringify(list, null, 2));
    } catch (fsErr) {
      console.warn('Storage fallback to memory (Vercel serverless):', fsErr.message);
    }
    return reservation;
  } catch (err) {
    console.error('Error saving reservation:', err);
    return reservation;
  }
}

// Coupon storage for owner-managed discounts
const COUPONS_FILE = isVercel
  ? path.join('/tmp', 'ktown_coupons.json')
  : path.join(__dirname, '../data/coupons.json');

let inMemoryCoupons = [];

function getCoupons() {
  try {
    if (!fs.existsSync(COUPONS_FILE)) {
      try {
        fs.writeFileSync(COUPONS_FILE, JSON.stringify([]));
      } catch {
        return inMemoryCoupons;
      }
      return [];
    }
    const data = fs.readFileSync(COUPONS_FILE, 'utf-8');
    return JSON.parse(data || '[]');
  } catch (err) {
    return inMemoryCoupons;
  }
}

function saveCoupons(list) {
  try {
    inMemoryCoupons = list;
    try {
      fs.writeFileSync(COUPONS_FILE, JSON.stringify(list, null, 2));
    } catch (fsErr) {
      console.warn('Storage fallback to memory (coupons):', fsErr.message);
    }
    return list;
  } catch (err) {
    return list;
  }
}

// 1. Health check & configuration status
router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    stripeReady: isStripeConfigured,
    stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY || process.env.VITE_STRIPE_PUBLISHABLE_KEY || null,
    notificationRecipients: getNotificationRecipients(),
  });
});

// 2. Fetch live Rate Card from server
router.get('/rates', (req, res) => {
  res.json({
    rateCard: RATE_CARD,
    vehicles: VEHICLES,
  });
});

// Admin Authentication Helper
function isAuthorizedAdmin(req) {
  const adminPin = req.headers['x-admin-pin'] || req.query.pin || req.body?.pin;
  const configuredPin = process.env.ADMIN_PIN || 'ktown2026';
  return Boolean(adminPin && adminPin === configuredPin);
}

function recordCouponUsage(couponCode) {
  if (!couponCode) return;
  try {
    const list = getCoupons();
    const match = list.find(c => c.code.toUpperCase() === couponCode.trim().toUpperCase());
    if (match) {
      match.usedCount = (match.usedCount || 0) + 1;
      saveCoupons(list);
    }
  } catch (err) {
    console.warn('Coupon usage record note:', err.message);
  }
}

// 2b. Validate customer coupon code
router.get('/coupons/validate', (req, res) => {
  const code = (req.query.code || '').trim().toUpperCase();
  const subtotal = Math.max(0, Number(req.query.subtotal) || 0);

  if (!code) {
    return res.status(400).json({ valid: false, error: 'Coupon code is required.' });
  }

  const coupons = getCoupons();
  const match = coupons.find(c => c.code.toUpperCase() === code);

  if (!match || !match.active) {
    return res.status(404).json({ valid: false, error: 'Invalid or expired coupon code.' });
  }

  if (match.expiresAt && new Date(match.expiresAt) < new Date()) {
    return res.status(400).json({ valid: false, error: 'This coupon code has expired.' });
  }

  if (match.maxRedemptions && match.usedCount >= match.maxRedemptions) {
    return res.status(400).json({ valid: false, error: 'This coupon has reached its maximum redemption limit.' });
  }

  let discount = 0;
  if (match.type === 'percent') {
    discount = (subtotal * match.value) / 100;
  } else {
    discount = match.value;
  }

  if (match.maxDiscountCap && match.maxDiscountCap > 0) {
    discount = Math.min(discount, match.maxDiscountCap);
  }

  discount = Math.min(subtotal, Math.round(discount * 100) / 100);

  res.json({
    valid: true,
    coupon: {
      code: match.code,
      type: match.type,
      value: match.value,
      maxDiscountCap: match.maxDiscountCap,
    },
    discountAmount: discount,
  });
});

// 2c. Get all coupons (Admin)
router.get('/admin/coupons', (req, res) => {
  if (!isAuthorizedAdmin(req)) {
    return res.status(401).json({ error: 'Unauthorized. Invalid Owner PIN.' });
  }
  res.json({ coupons: getCoupons() });
});

// 2d. Create coupon (Admin)
router.post('/admin/coupons', (req, res) => {
  if (!isAuthorizedAdmin(req)) {
    return res.status(401).json({ error: 'Unauthorized. Invalid Owner PIN.' });
  }

  const { code, type, value, maxDiscountCap, maxRedemptions, expiresAt } = req.body;
  if (!code || !code.trim()) {
    return res.status(400).json({ error: 'Coupon code is required.' });
  }

  const cleanCode = code.trim().toUpperCase().replace(/[^A-Z0-9_-]/g, '');
  if (cleanCode.length < 2) {
    return res.status(400).json({ error: 'Coupon code must be at least 2 alphanumeric characters.' });
  }

  const numericValue = Number(value);
  if (isNaN(numericValue) || numericValue <= 0) {
    return res.status(400).json({ error: 'Discount value must be greater than 0.' });
  }

  const coupons = getCoupons();
  if (coupons.some(c => c.code.toUpperCase() === cleanCode)) {
    return res.status(400).json({ error: `Coupon code '${cleanCode}' already exists.` });
  }

  const newCoupon = {
    code: cleanCode,
    type: type === 'fixed' ? 'fixed' : 'percent',
    value: numericValue,
    maxDiscountCap: maxDiscountCap ? Math.max(0, Number(maxDiscountCap)) : null,
    maxRedemptions: maxRedemptions ? Math.max(1, parseInt(maxRedemptions, 10)) : null,
    usedCount: 0,
    expiresAt: expiresAt || null,
    active: true,
    createdAt: new Date().toISOString(),
  };

  coupons.unshift(newCoupon);
  saveCoupons(coupons);

  res.status(201).json({ success: true, coupon: newCoupon, coupons });
});

// 2e. Delete coupon (Admin)
router.delete('/admin/coupons/:code', (req, res) => {
  if (!isAuthorizedAdmin(req)) {
    return res.status(401).json({ error: 'Unauthorized. Invalid Owner PIN.' });
  }

  const codeToDelete = (req.params.code || '').trim().toUpperCase();
  const coupons = getCoupons();
  const filtered = coupons.filter(c => c.code.toUpperCase() !== codeToDelete);
  saveCoupons(filtered);

  res.json({ success: true, coupons: filtered });
});

// 3. Create Stripe Payment Intent (or mock intent if keys pending)
router.post('/create-payment-intent', async (req, res) => {
  try {
    const { items, customer, appointment } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Cart is empty. Please add detailing services.' });
    }

    const totals = calculateOrderTotals(items);
    const reservationId = 'KT-' + Math.floor(100000 + Math.random() * 900000);

    if (totals.amountInCents <= 0) {
      return res.status(400).json({ error: 'Invalid total amount.' });
    }

    if (isStripeConfigured && stripe) {
      // Live / Sandbox Stripe payment intent with Idempotency Key protection
      const paymentIntent = await stripe.paymentIntents.create({
        amount: totals.amountInCents,
        currency: 'cad',
        automatic_payment_methods: { enabled: true },
        metadata: {
          reservationId,
          customerName: customer?.name || 'Guest',
          customerPhone: customer?.phone || '',
          customerEmail: customer?.email || '',
          vehicle: `${customer?.vehicleYear || ''} ${customer?.vehicleMake || ''} ${customer?.vehicleModel || ''}`.trim(),
          appointmentDate: appointment?.date || '',
          appointmentSlot: appointment?.slot || '',
          itemCount: String(totals.items.length),
        },
      }, {
        idempotencyKey: `pi_${reservationId}`,
      });

      return res.json({
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
        reservationId,
        totals,
        stripeLive: true,
      });
    }

    // Mock Mode: When Stripe keys are pending setup
    return res.json({
      clientSecret: `mock_secret_${reservationId}_${Date.now()}`,
      reservationId,
      totals,
      stripeLive: false,
      message: 'Stripe credentials not configured yet in .env. Sandbox reservation mode active.',
    });
  } catch (err) {
    console.error('Payment intent error:', err);
    res.status(500).json({ error: err.message || 'Failed to create payment intent' });
  }
});

// 3b. Create Stripe Checkout Session (Direct Stripe-hosted flow with Apple Pay, Google Pay & Cards)
router.post('/create-checkout-session', async (req, res) => {
  try {
    const { items, customer, appointment, couponCode, discountAmount } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Cart is empty. Please add detailing services.' });
    }

    let validatedDiscount = 0;
    let appliedCouponObj = null;
    if (couponCode) {
      const coupons = getCoupons();
      const c = coupons.find(x => x.code.toUpperCase() === couponCode.trim().toUpperCase() && x.active);
      if (c && (!c.maxRedemptions || c.usedCount < c.maxRedemptions)) {
        const rawSubtotal = (items || []).reduce((sum, item) => {
          const addons = (item.addons || []).reduce((a, b) => a + (b.price || 0), 0);
          return sum + ((item.basePrice || 0) + addons);
        }, 0);
        let disc = c.type === 'percent' ? (rawSubtotal * c.value) / 100 : c.value;
        if (c.maxDiscountCap > 0) disc = Math.min(disc, c.maxDiscountCap);
        validatedDiscount = Math.min(rawSubtotal, Math.round(disc * 100) / 100);
        appliedCouponObj = c;
      }
    } else if (discountAmount > 0) {
      validatedDiscount = Number(discountAmount);
    }

    const totals = calculateOrderTotals(items, validatedDiscount, 'card_stripe');
    const reservationId = 'KT-' + Math.floor(100000 + Math.random() * 900000);

    if (isStripeConfigured && stripe) {
      const line_items = items.map(item => {
        const itemAddons = (item.addons || []).reduce((a, b) => a + (b.price || 0), 0);
        const itemGross = (item.basePrice || 0) + itemAddons;
        const ratio = totals.subtotal > 0 ? itemGross / totals.subtotal : 1 / items.length;
        const netItemPrice = Math.max(0.50, Math.round(totals.netSubtotal * ratio * 100) / 100);

        return {
          price_data: {
            currency: 'cad',
            product_data: {
              name: `${item.title} (${item.vehicleLabel})${appliedCouponObj ? ` [Promo: -${appliedCouponObj.code}]` : ''}`,
              description: item.addons?.length ? `Includes: ${item.addons.map(a => a.title).join(', ')}` : 'Ktown Auto Spa Professional Detailing',
            },
            unit_amount: Math.round(netItemPrice * 100),
          },
          quantity: 1,
        };
      });

      if (totals.hstTax > 0) {
        line_items.push({
          price_data: {
            currency: 'cad',
            product_data: {
              name: 'Ontario Harmonized Sales Tax (HST 13%)',
            },
            unit_amount: Math.round(totals.hstTax * 100),
          },
          quantity: 1,
        });
      }

      if (totals.cardFee > 0) {
        line_items.push({
          price_data: {
            currency: 'cad',
            product_data: {
              name: 'Online Card Processing Surcharge (3%)',
              description: 'Standard credit card payment gateway transaction processing fee',
            },
            unit_amount: Math.round(totals.cardFee * 100),
          },
          quantity: 1,
        });
      }

      const origin = req.headers.origin 
        || (req.headers.host ? `${req.headers['x-forwarded-proto'] || 'https'}://${req.headers.host}` : null) 
        || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://www.ktownautospa.ca');

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        customer_email: customer?.email || undefined,
        client_reference_id: reservationId,
        metadata: {
          reservationId,
          customerName: customer?.name || '',
          customerPhone: customer?.phone || '',
          customerEmail: customer?.email || '',
          vehicleYear: customer?.vehicleYear || '',
          vehicleMake: customer?.vehicleMake || '',
          vehicleModel: customer?.vehicleModel || '',
          customerNotes: customer?.notes || '',
          appointmentDate: appointment?.date || '',
          appointmentSlot: appointment?.slot || '',
          couponCode: couponCode || '',
          subtotal: String(totals.subtotal),
          discountAmount: String(totals.discountAmount || 0),
          netSubtotal: String(totals.netSubtotal),
          hstTax: String(totals.hstTax),
          cardFee: String(totals.cardFee),
          grandTotal: String(totals.grandTotal),
          paymentMethod: 'card_stripe',
        },
        success_url: `${origin}/?booking=success&reservation_id=${reservationId}&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/?booking=cancelled`,
      }, {
        idempotencyKey: `cs_${reservationId}`,
      });

      // Persist pending reservation before redirect
      const pendingReservation = {
        id: reservationId,
        customer: {
          name: customer?.name || '',
          phone: customer?.phone || '',
          email: customer?.email || '',
          vehicleYear: customer?.vehicleYear || '',
          vehicleMake: customer?.vehicleMake || '',
          vehicleModel: customer?.vehicleModel || '',
          notes: customer?.notes || '',
        },
        appointment: {
          date: appointment?.date || '',
          slot: appointment?.slot || 'Morning (9 AM - 12 PM)',
        },
        items: totals.items,
        pricing: {
          subtotal: totals.subtotal,
          discountAmount: totals.discountAmount || 0,
          netSubtotal: totals.netSubtotal,
          hstTax: totals.hstTax,
          cardFee: totals.cardFee,
          grandTotal: totals.grandTotal,
          currency: 'CAD',
        },
        couponCode: couponCode || null,
        payment: {
          method: 'card_stripe',
          status: 'pending_payment',
          stripeCheckoutSessionId: session.id,
        },
        status: 'pending_payment',
      };
      saveReservation(pendingReservation);

      return res.json({
        url: session.url,
        reservationId,
        sessionId: session.id,
        stripeLive: true,
      });
    }

    // Mock fallback if Stripe keys pending
    return res.json({
      mock: true,
      reservationId,
      stripeLive: false,
      message: 'Stripe keys pending in .env. Reservation saved in sandbox mode.',
    });
  } catch (err) {
    console.error('Checkout session error:', err);
    res.status(500).json({ error: err.message || 'Failed to create checkout session' });
  }
});

// 3c. Confirm Stripe Checkout Session and finalize booking
router.get('/confirm-stripe-session', async (req, res) => {
  try {
    const { session_id, reservation_id } = req.query;

    if (!session_id) {
      return res.status(400).json({ error: 'Session ID is required.' });
    }

    if (!isStripeConfigured || !stripe) {
      return res.status(500).json({ error: 'Stripe is not configured on this server.' });
    }

    // Retrieve the authoritative session directly from Stripe API
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (!session) {
      return res.status(404).json({ error: 'Stripe checkout session not found.' });
    }

    if (session.payment_status !== 'paid') {
      return res.status(400).json({
        error: `Payment is not marked as paid by Stripe. Current status: ${session.payment_status}`,
        paymentStatus: session.payment_status,
      });
    }

    const resvId = reservation_id || session.client_reference_id || session.metadata?.reservationId;

    // Retrieve or reconstruct reservation
    const list = getReservations();
    let resv = list.find(r => r.id === resvId || r.payment?.stripeCheckoutSessionId === session.id);

    const isAlreadyPaid = resv && resv.payment?.status === 'paid';

    if (!resv) {
      // Reconstruct reservation if lambda container recycled
      const metadata = session.metadata || {};
      resv = {
        id: resvId || ('KT-' + Math.floor(100000 + Math.random() * 900000)),
        customer: {
          name: metadata.customerName || session.customer_details?.name || 'Customer',
          phone: metadata.customerPhone || session.customer_details?.phone || '',
          email: metadata.customerEmail || session.customer_details?.email || '',
          vehicleYear: metadata.vehicleYear || '',
          vehicleMake: metadata.vehicleMake || '',
          vehicleModel: metadata.vehicleModel || '',
          notes: metadata.customerNotes || '',
        },
        appointment: {
          date: metadata.appointmentDate || new Date().toISOString().split('T')[0],
          slot: metadata.appointmentSlot || 'Morning (9 AM - 12 PM)',
        },
        items: [],
        pricing: {
          subtotal: parseFloat(metadata.subtotal || '0') || ((session.amount_total || 0) / 100 / 1.13),
          discountAmount: parseFloat(metadata.discountAmount || '0'),
          netSubtotal: parseFloat(metadata.netSubtotal || '0') || ((session.amount_total || 0) / 100 / 1.13),
          hstTax: parseFloat(metadata.hstTax || '0') || (((session.amount_total || 0) / 100) - ((session.amount_total || 0) / 100 / 1.13)),
          cardFee: parseFloat(metadata.cardFee || '0'),
          grandTotal: parseFloat(metadata.grandTotal || '0') || ((session.amount_total || 0) / 100),
          currency: 'CAD',
        },
        couponCode: metadata.couponCode || null,
        payment: {
          method: 'card_stripe',
          status: 'paid',
          stripeCheckoutSessionId: session.id,
          stripePaymentIntentId: typeof session.payment_intent === 'string' ? session.payment_intent : session.payment_intent?.id,
        },
        status: 'confirmed',
      };
    } else {
      resv.status = 'confirmed';
      resv.payment = {
        ...resv.payment,
        method: 'card_stripe',
        status: 'paid',
        stripeCheckoutSessionId: session.id,
        stripePaymentIntentId: typeof session.payment_intent === 'string' ? session.payment_intent : session.payment_intent?.id,
      };
    }

    saveReservation(resv);

    if (session.metadata?.couponCode || resv.couponCode) {
      recordCouponUsage(session.metadata?.couponCode || resv.couponCode);
    }

    // Send email notifications if not already sent for this paid booking
    let notificationResults = null;
    if (!isAlreadyPaid) {
      try {
        notificationResults = await sendBookingNotifications(resv);
        console.log(`[Stripe Checkout Confirmed] Notifications dispatched for ${resv.id}:`, notificationResults);
      } catch (notifyErr) {
        console.error('[Stripe Checkout Confirmed] Notification dispatch note:', notifyErr.message);
      }
    }

    return res.json({
      success: true,
      reservation: resv,
      notifications: notificationResults,
    });
  } catch (err) {
    console.error('Confirm stripe session error:', err);
    res.status(500).json({ error: err.message || 'Failed to verify Stripe checkout session' });
  }
});

// 4. Save and confirm a reservation (Card paid, e-Transfer, or Cash)
router.post('/reservations', async (req, res) => {
  try {
    const { reservationId, items, customer, appointment, paymentMethod, paymentStatus, couponCode, discountAmount } = req.body;

    const id = reservationId || ('KT-' + Math.floor(100000 + Math.random() * 900000));
    const cleanMethod = ['card_stripe', 'etransfer', 'cash', 'pay_at_dropoff'].includes(paymentMethod) ? paymentMethod : 'cash';

    let validatedDiscount = 0;
    if (couponCode) {
      const coupons = getCoupons();
      const c = coupons.find(x => x.code.toUpperCase() === couponCode.trim().toUpperCase() && x.active);
      if (c && (!c.maxRedemptions || c.usedCount < c.maxRedemptions)) {
        const rawSub = (items || []).reduce((sum, item) => {
          const addons = (item.addons || []).reduce((a, b) => a + (b.price || 0), 0);
          return sum + ((item.basePrice || 0) + addons);
        }, 0);
        let disc = c.type === 'percent' ? (rawSub * c.value) / 100 : c.value;
        if (c.maxDiscountCap > 0) disc = Math.min(disc, c.maxDiscountCap);
        validatedDiscount = Math.min(rawSub, Math.round(disc * 100) / 100);
      }
    } else if (discountAmount > 0) {
      validatedDiscount = Number(discountAmount);
    }

    const totals = calculateOrderTotals(items || [], validatedDiscount, cleanMethod);

    let initialPaymentStatus = 'pending';
    if (cleanMethod === 'etransfer') {
      initialPaymentStatus = 'pending_etransfer';
    } else if (cleanMethod === 'cash') {
      initialPaymentStatus = 'pending_cash';
    } else if (cleanMethod === 'card_stripe') {
      initialPaymentStatus = paymentStatus || 'paid';
    } else {
      initialPaymentStatus = 'pending_at_dropoff';
    }

    const newReservation = {
      id,
      customer: {
        name: customer?.name || '',
        phone: customer?.phone || '',
        email: customer?.email || '',
        vehicleYear: customer?.vehicleYear || '',
        vehicleMake: customer?.vehicleMake || '',
        vehicleModel: customer?.vehicleModel || '',
        notes: customer?.notes || '',
      },
      appointment: {
        date: appointment?.date || '',
        slot: appointment?.slot || 'Morning (9 AM - 12 PM)',
      },
      items: totals.items,
      pricing: {
        subtotal: totals.subtotal,
        discountAmount: totals.discountAmount || 0,
        netSubtotal: totals.netSubtotal,
        hstTax: totals.hstTax,
        cardFee: totals.cardFee,
        grandTotal: totals.grandTotal,
        currency: 'CAD',
      },
      couponCode: couponCode || null,
      payment: {
        method: cleanMethod,
        status: initialPaymentStatus,
      },
      status: 'confirmed',
    };

    saveReservation(newReservation);

    if (couponCode) {
      recordCouponUsage(couponCode);
    }

    // Dispatch dual notifications to ktownautomobilespa@gmail.com and gud4notin@hotmail.com
    let notificationResults = null;
    try {
      notificationResults = await sendBookingNotifications(newReservation);
      console.log(`[Reservation] Dispatched notification for ${id}:`, notificationResults);
    } catch (dispatchErr) {
      console.error('[Reservation] Notification dispatch error (non-fatal):', dispatchErr);
    }

    res.status(201).json({
      success: true,
      reservationId: id,
      reservation: newReservation,
      notifications: notificationResults,
    });
  } catch (err) {
    console.error('Reservation creation error:', err);
    res.status(500).json({ error: err.message || 'Failed to save reservation' });
  }
});

// 4b. Record a failed or abandoned payment attempt (card decline, timeout, 3DS drop)
router.post('/payment-failed', async (req, res) => {
  try {
    const { reservationId, customer, items, error, attemptedPaymentMethod } = req.body;
    const totals = calculateOrderTotals(items || []);
    const failedRecord = {
      id: reservationId || ('FAIL-' + Math.floor(100000 + Math.random() * 900000)),
      status: 'failed',
      failureReason: error?.message || (typeof error === 'string' ? error : 'Payment processing failed or was interrupted'),
      failureCode: error?.code || error?.decline_code || 'card_declined',
      attemptedPaymentMethod: attemptedPaymentMethod || 'card_stripe',
      customer: {
        name: customer?.name || 'Incomplete',
        phone: customer?.phone || 'No phone',
        email: customer?.email || 'No email',
        vehicleYear: customer?.vehicleYear || '',
        vehicleMake: customer?.vehicleMake || '',
        vehicleModel: customer?.vehicleModel || '',
        notes: customer?.notes || '',
      },
      items: totals.items,
      pricing: {
        subtotal: totals.subtotal,
        hstTax: totals.hstTax,
        grandTotal: totals.grandTotal,
        currency: 'CAD',
      },
      attemptedAt: new Date().toISOString(),
    };

    saveReservation(failedRecord);
    console.log(`[Payment Failed Recorded] ${failedRecord.id} - ${failedRecord.customer.name} ($${totals.grandTotal} CAD): ${failedRecord.failureReason}`);

    res.json({ success: true, loggedId: failedRecord.id });
  } catch (err) {
    console.error('Failed to log payment failure:', err.message);
    res.status(500).json({ error: 'Could not log failure' });
  }
});

// 5. Lookup single reservation
router.get('/reservations/:id', (req, res) => {
  const list = getReservations();
  const match = list.find(r => r.id === req.params.id);
  if (!match) {
    return res.status(404).json({ error: 'Reservation not found' });
  }
  res.json(match);
});

// 5b. Owner Admin Portal API (PIN Protected)
router.get('/admin/reservations', async (req, res) => {
  const adminPin = req.headers['x-admin-pin'] || req.query.pin;
  const configuredPin = process.env.ADMIN_PIN || 'ktown2026';

  if (!adminPin || adminPin !== configuredPin) {
    // Artificial delay to prevent brute-force timing attacks
    await new Promise(r => setTimeout(r, 400));
    return res.status(401).json({ error: 'Unauthorized. Invalid Owner PIN.' });
  }

  const all = getReservations();
  const confirmed = all.filter(r => r.status === 'confirmed');
  const failed = all.filter(r => r.status === 'failed');
  const cancelled = all.filter(r => r.status === 'cancelled');

  const paidReservations = confirmed.filter(r => r.payment?.status === 'paid');
  const pendingReservations = confirmed.filter(r => r.payment?.status !== 'paid');

  const totalRevenue = paidReservations.reduce((sum, r) => sum + (r.pricing?.grandTotal || 0), 0);
  const pendingRevenue = pendingReservations.reduce((sum, r) => sum + (r.pricing?.grandTotal || 0), 0);

  // Breakdown by payment method
  const stripePaidCount = paidReservations.filter(r => r.payment?.method === 'card_stripe').length;
  const etransferPaidCount = paidReservations.filter(r => r.payment?.receivedVia === 'etransfer' || (r.payment?.method === 'etransfer' && r.payment?.status === 'paid')).length;
  const cashPaidCount = paidReservations.filter(r => r.payment?.receivedVia === 'cash' || (r.payment?.method === 'cash' && r.payment?.status === 'paid')).length;

  const etransferPendingCount = pendingReservations.filter(r => r.payment?.method === 'etransfer' || r.payment?.status === 'pending_etransfer').length;
  const cashPendingCount = pendingReservations.filter(r => r.payment?.method === 'cash' || r.payment?.status === 'pending_cash' || r.payment?.method === 'pay_at_dropoff').length;

  res.json({
    stats: {
      totalBookings: confirmed.length,
      paidCount: paidReservations.length,
      dropoffCount: pendingReservations.length,
      failedAttemptsCount: failed.length,
      cancelledCount: cancelled.length,
      totalRevenue: Math.round(totalRevenue * 100) / 100,
      pendingRevenue: Math.round(pendingRevenue * 100) / 100,
      stripePaidCount,
      etransferPaidCount,
      cashPaidCount,
      etransferPendingCount,
      cashPendingCount,
    },
    confirmed,
    failedAttempts: failed,
    cancelled,
  });
});

// 5c. Owner Admin Reservation Management (Mark Money Received, Mark Cash Received, Reschedule, Cancel)
router.patch('/admin/reservations/:id', async (req, res) => {
  if (!isAuthorizedAdmin(req)) {
    return res.status(401).json({ error: 'Unauthorized. Invalid Owner PIN.' });
  }

  const resvId = req.params.id;
  const { action, date, slot, reason, notes } = req.body;
  const list = getReservations();
  const resv = list.find(r => r.id === resvId);

  if (!resv) {
    return res.status(404).json({ error: 'Reservation not found.' });
  }

  if (action === 'mark_etransfer_paid' || action === 'mark_cash_paid' || action === 'mark_paid') {
    const receivedVia = action === 'mark_etransfer_paid' ? 'etransfer' : (action === 'mark_cash_paid' ? 'cash' : (resv.payment?.method || 'shop_direct'));
    resv.payment = {
      ...resv.payment,
      status: 'paid',
      receivedVia,
      paidAt: new Date().toISOString(),
    };
    resv.status = 'confirmed';
    if (notes) {
      resv.adminNotes = (resv.adminNotes ? resv.adminNotes + ' | ' : '') + notes;
    }
  } else if (action === 'reschedule') {
    if (!date) {
      return res.status(400).json({ error: 'New appointment date is required.' });
    }
    const previousDate = resv.appointment?.date;
    const previousSlot = resv.appointment?.slot;
    resv.appointment = {
      ...resv.appointment,
      date,
      slot: slot || resv.appointment?.slot || 'Morning (9 AM - 12 PM)',
    };
    resv.rescheduledHistory = resv.rescheduledHistory || [];
    resv.rescheduledHistory.push({
      from: `${previousDate} (${previousSlot})`,
      to: `${date} (${resv.appointment.slot})`,
      at: new Date().toISOString(),
    });
  } else if (action === 'cancel') {
    resv.status = 'cancelled';
    resv.cancelledAt = new Date().toISOString();
    resv.cancellationReason = reason || 'Cancelled by administrator';
  } else {
    return res.status(400).json({ error: `Unknown action: ${action}` });
  }

  saveReservation(resv);
  res.json({ success: true, reservation: resv });
});

// 6. Stripe Webhook handler
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!isStripeConfigured || !stripe || !webhookSecret) {
    return res.status(200).json({ received: true, note: 'Webhook skipped (Stripe not live)' });
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;
    const reservationId = paymentIntent.metadata?.reservationId;
    if (reservationId) {
      const list = getReservations();
      const resv = list.find(r => r.id === reservationId);
      if (resv) {
        resv.payment.status = 'paid';
        resv.payment.stripePaymentIntentId = paymentIntent.id;
        saveReservation(resv);
        console.log(`Reservation ${reservationId} marked paid via Stripe webhook.`);
      }
    }
  } else if (event.type === 'payment_intent.payment_failed') {
    const paymentIntent = event.data.object;
    const reservationId = paymentIntent.metadata?.reservationId;
    const failureMsg = paymentIntent.last_payment_error?.message || 'Payment intent failed';
    console.warn(`[Stripe Webhook] Payment failed for ${reservationId}: ${failureMsg}`);

    const list = getReservations();
    const existing = list.find(r => r.id === reservationId);
    if (existing) {
      existing.status = 'failed';
      existing.failureReason = failureMsg;
      saveReservation(existing);
    }
  } else if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const reservationId = session.client_reference_id || session.metadata?.reservationId;
    if (reservationId) {
      const list = getReservations();
      const resv = list.find(r => r.id === reservationId);
      if (resv) {
        resv.payment.status = 'paid';
        resv.payment.stripeCheckoutSessionId = session.id;
        saveReservation(resv);
        console.log(`Reservation ${reservationId} marked paid via Stripe Checkout webhook.`);
      }
    }
  } else if (event.type === 'checkout.session.expired') {
    const session = event.data.object;
    const reservationId = session.client_reference_id || session.metadata?.reservationId;
    console.warn(`[Stripe Webhook] Checkout session expired/abandoned for ${reservationId}`);
  }

  res.json({ received: true });
});

export default router;
