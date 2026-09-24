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
    const { items, customer, appointment } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Cart is empty. Please add detailing services.' });
    }

    const totals = calculateOrderTotals(items);
    const reservationId = 'KT-' + Math.floor(100000 + Math.random() * 900000);

    if (isStripeConfigured && stripe) {
      const line_items = items.map(item => ({
        price_data: {
          currency: 'cad',
          product_data: {
            name: `${item.title} (${item.vehicleLabel})`,
            description: item.addons?.length ? `Includes: ${item.addons.map(a => a.title).join(', ')}` : 'Ktown Auto Spa Professional Detailing',
          },
          unit_amount: Math.round(item.totalPrice * 100),
        },
        quantity: 1,
      }));

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
          subtotal: String(totals.subtotal),
          hstTax: String(totals.hstTax),
          grandTotal: String(totals.grandTotal),
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
          hstTax: totals.hstTax,
          grandTotal: totals.grandTotal,
          currency: 'CAD',
        },
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
          hstTax: parseFloat(metadata.hstTax || '0') || (((session.amount_total || 0) / 100) - ((session.amount_total || 0) / 100 / 1.13)),
          grandTotal: parseFloat(metadata.grandTotal || '0') || ((session.amount_total || 0) / 100),
          currency: 'CAD',
        },
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

// 4. Save and confirm a reservation (Card paid or Pay-at-drop-off)
router.post('/reservations', async (req, res) => {
  try {
    const { reservationId, items, customer, appointment, paymentMethod, paymentStatus } = req.body;

    const id = reservationId || ('KT-' + Math.floor(100000 + Math.random() * 900000));
    const totals = calculateOrderTotals(items || []);

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
        hstTax: totals.hstTax,
        grandTotal: totals.grandTotal,
        currency: 'CAD',
      },
      payment: {
        method: paymentMethod || 'pay_at_dropoff', // 'card_stripe' | 'pay_at_dropoff'
        status: paymentStatus || (paymentMethod === 'card_stripe' ? 'paid' : 'pending_at_dropoff'),
      },
      status: 'confirmed',
    };

    saveReservation(newReservation);

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

  const paidCount = confirmed.filter(r => r.payment?.status === 'paid').length;
  const dropoffCount = confirmed.filter(r => r.payment?.status !== 'paid').length;
  const totalRevenue = confirmed
    .filter(r => r.payment?.status === 'paid')
    .reduce((sum, r) => sum + (r.pricing?.grandTotal || 0), 0);

  const pendingRevenue = confirmed
    .filter(r => r.payment?.status !== 'paid')
    .reduce((sum, r) => sum + (r.pricing?.grandTotal || 0), 0);

  res.json({
    stats: {
      totalBookings: confirmed.length,
      paidCount,
      dropoffCount,
      failedAttemptsCount: failed.length,
      totalRevenue: Math.round(totalRevenue * 100) / 100,
      pendingRevenue: Math.round(pendingRevenue * 100) / 100,
    },
    confirmed,
    failedAttempts: failed,
  });
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
