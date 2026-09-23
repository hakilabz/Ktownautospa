import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Stripe from 'stripe';
import { RATE_CARD, VEHICLES, calculateOrderTotals } from '../rates.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const RESERVATIONS_FILE = path.join(__dirname, '../data/reservations.json');

const router = express.Router();

// Initialize Stripe if valid key is available
const stripeKey = process.env.STRIPE_SECRET_KEY;
const isStripeConfigured = Boolean(stripeKey && stripeKey.startsWith('sk_') && !stripeKey.includes('your_stripe_secret_key'));
const stripe = isStripeConfigured ? new Stripe(stripeKey) : null;

// Helper to read and write reservations
function getReservations() {
  try {
    if (!fs.existsSync(RESERVATIONS_FILE)) {
      fs.writeFileSync(RESERVATIONS_FILE, JSON.stringify([]));
      return [];
    }
    const data = fs.readFileSync(RESERVATIONS_FILE, 'utf-8');
    return JSON.parse(data || '[]');
  } catch (err) {
    console.error('Error reading reservations:', err);
    return [];
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
    fs.writeFileSync(RESERVATIONS_FILE, JSON.stringify(list, null, 2));
    return reservation;
  } catch (err) {
    console.error('Error saving reservation:', err);
    throw err;
  }
}

// 1. Health check & configuration status
router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    stripeReady: isStripeConfigured,
    stripePublishableKey: process.env.VITE_STRIPE_PUBLISHABLE_KEY || null,
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
      // Live / Sandbox Stripe payment intent
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

// 4. Save and confirm a reservation (Card paid or Pay-at-drop-off)
router.post('/reservations', async (req, res) => {
  try {
    const { reservationId, items, customer, appointment, paymentMethod, paymentStatus, total } = req.body;

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

    // Dispatch notification to shop email via Web3Forms
    try {
      const emailContent = `
NEW BOOKING CONFIRMED: ${newReservation.id}
--------------------------------------------------
Customer: ${newReservation.customer.name}
Phone: ${newReservation.customer.phone}
Email: ${newReservation.customer.email}
Vehicle: ${newReservation.customer.vehicleYear} ${newReservation.customer.vehicleMake} ${newReservation.customer.vehicleModel}
Date: ${newReservation.appointment.date} (${newReservation.appointment.slot})
Location: 36 Joseph St, Kingston, ON

SERVICES BOOKED:
${newReservation.items.map(i => `• ${i.title} (${i.vehicleLabel}): $${i.totalPrice} CAD${i.addons.length ? ` [Addons: ${i.addons.map(a => a.title).join(', ')}]` : ''}`).join('\n')}

Subtotal: $${newReservation.pricing.subtotal} CAD
HST (13%): $${newReservation.pricing.hstTax} CAD
Total: $${newReservation.pricing.grandTotal} CAD
Payment: ${newReservation.payment.method} (${newReservation.payment.status})
Special Notes: ${newReservation.customer.notes || 'None'}
--------------------------------------------------
      `;

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          access_key: '2e1c3132-7a7a-4c2c-80a5-f8510800fa26',
          subject: `🚨 NEW BOOKING: ${newReservation.customer.name} - ${newReservation.id} ($${newReservation.pricing.grandTotal})`,
          from_name: 'Ktown Auto Spa Checkout',
          to_email: 'ktownautomobilespa@gmail.com',
          replyto: newReservation.customer.email,
          message: emailContent,
        }),
      }).catch(e => console.log('Web3Forms dispatch fallback error:', e.message));
    } catch (dispatchErr) {
      console.log('Dispatch trigger error (non-fatal):', dispatchErr);
    }

    res.status(201).json({
      success: true,
      reservationId: id,
      reservation: newReservation,
    });
  } catch (err) {
    console.error('Reservation creation error:', err);
    res.status(500).json({ error: err.message || 'Failed to save reservation' });
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
  }

  res.json({ received: true });
});

export default router;
