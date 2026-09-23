import React, { useState, useEffect } from 'react';
import {
  X,
  Calendar,
  Clock,
  Phone,
  Mail,
  Car,
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  CalendarPlus,
  ArrowRight,
  Loader2,
  Lock,
  AlertCircle,
  FileText,
  Printer
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../context/CartContext';

export default function CheckoutModal() {
  const {
    cart,
    subtotal,
    hstTax,
    grandTotal,
    isCheckoutOpen,
    setIsCheckoutOpen,
    clearCart,
  } = useCart();

  const [step, setStep] = useState('form'); // 'form' | 'success'
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    vehicleYear: '',
    vehicleMake: '',
    vehicleModel: '',
    notes: '',
    preferredDate: '',
    preferredSlot: 'Morning (9 AM - 12 PM)',
    paymentMethod: 'pay_at_dropoff', // 'card_stripe' | 'pay_at_dropoff'
    cardNumber: '',
    cardExp: '',
    cardCvc: '',
    cardZip: '',
  });

  const [confirmedReservation, setConfirmedReservation] = useState(null);

  // Set default appointment date to tomorrow if empty
  useEffect(() => {
    if (!formData.preferredDate) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const yyyy = tomorrow.getFullYear();
      const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
      const dd = String(tomorrow.getDate()).padStart(2, '0');
      setFormData(prev => ({ ...prev, preferredDate: `${yyyy}-${mm}-${dd}` }));
    }
  }, [formData.preferredDate]);

  if (!isCheckoutOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCardNumberChange = (e) => {
    // Format card number with spaces
    const val = e.target.value.replace(/\D/g, '').slice(0, 16);
    const formatted = val.match(/.{1,4}/g)?.join(' ') || val;
    setFormData(prev => ({ ...prev, cardNumber: formatted }));
  };

  const handleExpChange = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 4);
    const formatted = val.length >= 3 ? `${val.slice(0, 2)}/${val.slice(2)}` : val;
    setFormData(prev => ({ ...prev, cardExp: formatted }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (cart.length === 0) {
      setErrorMsg('Your cart is empty. Please select a service before checking out.');
      return;
    }

    if (!formData.name || !formData.phone || !formData.email) {
      setErrorMsg('Please enter your full name, phone number, and email.');
      return;
    }

    if (!formData.preferredDate) {
      setErrorMsg('Please select your preferred drop-off date.');
      return;
    }

    if (formData.paymentMethod === 'card_stripe') {
      if (!formData.cardNumber || !formData.cardExp || !formData.cardCvc) {
        setErrorMsg('Please fill in your card details to reserve with card.');
        return;
      }
    }

    setSubmitting(true);

    try {
      // 1. If card payment selected, initiate Payment Intent with backend
      let paymentIntentData = null;
      if (formData.paymentMethod === 'card_stripe') {
        const intentRes = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            items: cart,
            customer: {
              name: formData.name,
              phone: formData.phone,
              email: formData.email,
              vehicleYear: formData.vehicleYear,
              vehicleMake: formData.vehicleMake,
              vehicleModel: formData.vehicleModel,
            },
            appointment: {
              date: formData.preferredDate,
              slot: formData.preferredSlot,
            },
          }),
        });

        if (!intentRes.ok) {
          const err = await intentRes.json().catch(() => ({}));
          throw new Error(err.error || 'Failed to prepare payment intent');
        }

        paymentIntentData = await intentRes.json();
      }

      // 2. Submit confirmed reservation to backend
      const resvRes = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reservationId: paymentIntentData?.reservationId,
          items: cart,
          customer: {
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            vehicleYear: formData.vehicleYear,
            vehicleMake: formData.vehicleMake,
            vehicleModel: formData.vehicleModel,
            notes: formData.notes,
          },
          appointment: {
            date: formData.preferredDate,
            slot: formData.preferredSlot,
          },
          paymentMethod: formData.paymentMethod,
          paymentStatus: formData.paymentMethod === 'card_stripe' ? 'paid' : 'pending_at_dropoff',
          total: grandTotal,
        }),
      });

      if (!resvRes.ok) {
        const err = await resvRes.json().catch(() => ({}));
        throw new Error(err.error || 'Failed to complete reservation');
      }

      const resvData = await resvRes.json();
      setConfirmedReservation(resvData.reservation);
      setStep('success');
      clearCart();

      // Confetti celebration
      try {
        confetti({
          particleCount: 140,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#F0D590', '#C9A03C', '#3E9BDA', '#12305F'],
        });
      } catch (e) {
        // Confetti optional
      }
    } catch (err) {
      console.error('Checkout error:', err);
      setErrorMsg(err.message || 'An error occurred during booking. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const generateGoogleCalendarUrl = () => {
    if (!confirmedReservation) return '#';
    const dateStr = confirmedReservation.appointment.date.replace(/-/g, '');
    let startHour = '090000';
    let endHour = '120000';

    if (confirmedReservation.appointment.slot.includes('12 PM')) {
      startHour = '120000';
      endHour = '150000';
    } else if (confirmedReservation.appointment.slot.includes('3 PM')) {
      startHour = '150000';
      endHour = '180000';
    }

    const startFormatted = `${dateStr}T${startHour}`;
    const endFormatted = `${dateStr}T${endHour}`;
    const title = encodeURIComponent(`Ktown Auto Spa Appointment (${confirmedReservation.id})`);
    const details = encodeURIComponent(
      `Appointment Ref: ${confirmedReservation.id}\nServices: ${confirmedReservation.items.map(i => i.title).join(', ')}\nTotal: $${confirmedReservation.pricing.grandTotal} CAD\nContact: 647-915-3530`
    );
    const location = encodeURIComponent('36 Joseph St, Kingston, ON K7K 2H5');

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startFormatted}/${endFormatted}&details=${details}&location=${location}`;
  };

  const downloadIcs = () => {
    if (!confirmedReservation) return;
    const dateStr = confirmedReservation.appointment.date.replace(/-/g, '');
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Ktown Auto Spa//Booking Engine//EN
BEGIN:VEVENT
SUMMARY:Ktown Auto Spa - ${confirmedReservation.items.map(i => i.title).join(', ')}
DESCRIPTION:Booking Ref: ${confirmedReservation.id}\\nTotal: $${confirmedReservation.pricing.grandTotal} CAD\\nLocation: 36 Joseph St, Kingston, ON
LOCATION:36 Joseph St, Kingston, ON K7K 2H5
DTSTART:${dateStr}T090000
DTEND:${dateStr}T120000
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `ktown_reservation_${confirmedReservation.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 110,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(5, 17, 36, 0.82)',
        backdropFilter: 'blur(7px)',
        padding: '1rem',
        overflowY: 'auto',
      }}
      onClick={() => setIsCheckoutOpen(false)}
    >
      <div
        style={{
          width: 'min(820px, 100%)',
          maxHeight: '92vh',
          background: 'var(--bg-page)',
          border: '2px solid var(--gold)',
          borderRadius: '16px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          zIndex: 111,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Topbar */}
        <div
          style={{
            padding: '1.2rem 1.6rem',
            borderBottom: '1px solid var(--surface-border)',
            background: 'var(--header-bg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <img src="/logo.png" alt="Ktown Auto Spa" style={{ height: '36px', width: 'auto' }} />
            <div>
              <h2
                style={{
                  fontFamily: 'var(--display)',
                  fontSize: '1.5rem',
                  fontWeight: 800,
                  margin: 0,
                  textTransform: 'uppercase',
                  color: 'var(--heading-color)',
                  lineHeight: 1,
                }}
              >
                {step === 'form' ? 'Checkout & Appointment Scheduling' : 'Booking Confirmed'}
              </h2>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '0.74rem', color: 'var(--muted-color)' }}>
                36 Joseph St, Kingston ON &middot; 647-915-3530
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(false)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--muted-color)',
              cursor: 'pointer',
              padding: '0.4rem',
              display: 'flex',
            }}
          >
            <X style={{ width: '1.4rem', height: '1.4rem' }} />
          </button>
        </div>

        {/* Modal Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.6rem' }}>
          {step === 'form' ? (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
              {errorMsg && (
                <div
                  style={{
                    background: 'rgba(239, 68, 68, 0.12)',
                    border: '1.5px solid #EF4444',
                    borderRadius: '8px',
                    padding: '0.75rem 1rem',
                    color: '#EF4444',
                    fontSize: '0.86rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}
                >
                  <AlertCircle style={{ width: '1.1rem', height: '1.1rem', flexShrink: 0 }} />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Grid 2 Columns: Details + Order Summary */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: '1.6rem' }}>
                
                {/* Left Column: Form Fields */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
                  
                  {/* Step A: Appointment Schedule */}
                  <div>
                    <label style={{ fontFamily: 'var(--mono)', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--gold-primary)', display: 'block', marginBottom: '0.5rem' }}>
                      1. Preferred Date &amp; Drop-off Slot
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '0.6rem', marginBottom: '0.6rem' }}>
                      <div>
                        <input
                          type="date"
                          name="preferredDate"
                          value={formData.preferredDate}
                          onChange={handleChange}
                          required
                          style={{
                            width: '100%',
                            padding: '0.75rem',
                            borderRadius: '8px',
                            border: '1px solid var(--surface-border)',
                            background: 'var(--surface-card)',
                            color: 'var(--text-main)',
                            fontSize: '0.9rem',
                            fontFamily: 'var(--body)',
                          }}
                        />
                      </div>
                      <div>
                        <select
                          name="preferredSlot"
                          value={formData.preferredSlot}
                          onChange={handleChange}
                          style={{
                            width: '100%',
                            padding: '0.75rem',
                            borderRadius: '8px',
                            border: '1px solid var(--surface-border)',
                            background: 'var(--surface-card)',
                            color: 'var(--text-main)',
                            fontSize: '0.82rem',
                            fontFamily: 'var(--body)',
                          }}
                        >
                          <option value="Morning (9 AM - 12 PM)">Morning (9 AM - 12 PM)</option>
                          <option value="Afternoon (12 PM - 3 PM)">Afternoon (12 PM - 3 PM)</option>
                          <option value="Late Afternoon (3 PM - 6 PM)">Late Afternoon (3 PM - 6 PM)</option>
                        </select>
                      </div>
                    </div>
                    <span style={{ fontSize: '0.72rem', color: 'var(--muted-color)', display: 'block' }}>
                      Open Saturdays &middot; Heated indoor bays year-round
                    </span>
                  </div>

                  {/* Step B: Customer Information */}
                  <div>
                    <label style={{ fontFamily: 'var(--mono)', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--gold-primary)', display: 'block', marginBottom: '0.5rem' }}>
                      2. Contact Information
                    </label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                      <input
                        type="text"
                        name="name"
                        placeholder="Your Full Name *"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          borderRadius: '8px',
                          border: '1px solid var(--surface-border)',
                          background: 'var(--surface-card)',
                          color: 'var(--text-main)',
                          fontSize: '0.9rem',
                        }}
                      />
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
                        <input
                          type="tel"
                          name="phone"
                          placeholder="Phone / WhatsApp *"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          style={{
                            width: '100%',
                            padding: '0.75rem',
                            borderRadius: '8px',
                            border: '1px solid var(--surface-border)',
                            background: 'var(--surface-card)',
                            color: 'var(--text-main)',
                            fontSize: '0.9rem',
                          }}
                        />
                        <input
                          type="email"
                          name="email"
                          placeholder="Email Address *"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          style={{
                            width: '100%',
                            padding: '0.75rem',
                            borderRadius: '8px',
                            border: '1px solid var(--surface-border)',
                            background: 'var(--surface-card)',
                            color: 'var(--text-main)',
                            fontSize: '0.9rem',
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Step C: Vehicle Information */}
                  <div>
                    <label style={{ fontFamily: 'var(--mono)', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--gold-primary)', display: 'block', marginBottom: '0.5rem' }}>
                      3. Vehicle Details
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr 1fr', gap: '0.6rem', marginBottom: '0.6rem' }}>
                      <input
                        type="text"
                        name="vehicleYear"
                        placeholder="Year"
                        value={formData.vehicleYear}
                        onChange={handleChange}
                        style={{
                          padding: '0.75rem',
                          borderRadius: '8px',
                          border: '1px solid var(--surface-border)',
                          background: 'var(--surface-card)',
                          color: 'var(--text-main)',
                          fontSize: '0.9rem',
                        }}
                      />
                      <input
                        type="text"
                        name="vehicleMake"
                        placeholder="Make (e.g. BMW)"
                        value={formData.vehicleMake}
                        onChange={handleChange}
                        style={{
                          padding: '0.75rem',
                          borderRadius: '8px',
                          border: '1px solid var(--surface-border)',
                          background: 'var(--surface-card)',
                          color: 'var(--text-main)',
                          fontSize: '0.9rem',
                        }}
                      />
                      <input
                        type="text"
                        name="vehicleModel"
                        placeholder="Model (e.g. M3)"
                        value={formData.vehicleModel}
                        onChange={handleChange}
                        style={{
                          padding: '0.75rem',
                          borderRadius: '8px',
                          border: '1px solid var(--surface-border)',
                          background: 'var(--surface-card)',
                          color: 'var(--text-main)',
                          fontSize: '0.9rem',
                        }}
                      />
                    </div>
                    <textarea
                      name="notes"
                      rows={2}
                      placeholder="Special requests or instructions (e.g. pet hair, drop-off timing)"
                      value={formData.notes}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        borderRadius: '8px',
                        border: '1px solid var(--surface-border)',
                        background: 'var(--surface-card)',
                        color: 'var(--text-main)',
                        fontSize: '0.85rem',
                        resize: 'none',
                      }}
                    />
                  </div>

                </div>

                {/* Right Column: Order Breakdown & Payment Method */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
                  
                  {/* Order Summary Box */}
                  <div
                    style={{
                      background: 'var(--surface-card)',
                      border: '1.5px solid var(--surface-border)',
                      borderRadius: '12px',
                      padding: '1.25rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.8rem',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--surface-border)', paddingBottom: '0.6rem' }}>
                      <span style={{ fontFamily: 'var(--mono)', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--gold-primary)', fontWeight: 800 }}>
                        Order Summary
                      </span>
                      <span style={{ fontSize: '0.74rem', color: 'var(--muted-color)' }}>
                        {cart.length} {cart.length === 1 ? 'item' : 'items'}
                      </span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', maxHeight: '180px', overflowY: 'auto' }}>
                      {cart.map((item, idx) => {
                        const addTotal = (item.addons || []).reduce((a, b) => a + b.price, 0);
                        const lineTotal = (item.basePrice || 0) + addTotal;

                        return (
                          <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem' }}>
                            <div>
                              <strong style={{ color: 'var(--text-main)', display: 'block' }}>{item.title}</strong>
                              <span style={{ color: 'var(--muted-color)', fontSize: '0.74rem' }}>
                                Class: {item.vehicleLabel} {item.addons?.length ? `(+${item.addons.length} add-ons)` : ''}
                              </span>
                            </div>
                            <b style={{ fontFamily: 'var(--display)', fontSize: '1.1rem', color: 'var(--water-dk)' }}>
                              ${lineTotal}
                            </b>
                          </div>
                        );
                      })}
                    </div>

                    {/* Tax & Total */}
                    <div style={{ borderTop: '1px solid var(--surface-border)', paddingTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.86rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--muted-color)' }}>
                        <span>Subtotal:</span>
                        <span>${subtotal.toFixed(2)} CAD</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--muted-color)' }}>
                        <span>Ontario HST (13%):</span>
                        <span>${hstTax.toFixed(2)} CAD</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingTop: '0.4rem', borderTop: '1px dashed var(--surface-border)' }}>
                        <span style={{ fontWeight: 800, color: 'var(--heading-color)', fontSize: '0.95rem' }}>Grand Total:</span>
                        <div style={{ textAlign: 'right' }}>
                          <span style={{ fontFamily: 'var(--display)', fontSize: '1.85rem', fontWeight: 900, color: 'var(--gold-primary)' }}>
                            ${grandTotal.toFixed(2)}
                          </span>
                          <span style={{ fontSize: '0.7rem', color: 'var(--muted-color)', marginLeft: '0.3rem' }}>CAD</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Selection */}
                  <div>
                    <label style={{ fontFamily: 'var(--mono)', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--gold-primary)', display: 'block', marginBottom: '0.6rem' }}>
                      4. Select Payment Option
                    </label>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                      {/* Option 1: Credit Card (Stripe) */}
                      <label
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '0.75rem',
                          padding: '0.85rem',
                          borderRadius: '10px',
                          border: `1.5px solid ${formData.paymentMethod === 'card_stripe' ? 'var(--gold)' : 'var(--surface-border)'}`,
                          background: formData.paymentMethod === 'card_stripe' ? 'rgba(201, 160, 60, 0.08)' : 'var(--surface-card)',
                          cursor: 'pointer',
                        }}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="card_stripe"
                          checked={formData.paymentMethod === 'card_stripe'}
                          onChange={handleChange}
                          style={{ marginTop: '0.2rem' }}
                        />
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <strong style={{ fontSize: '0.9rem', color: 'var(--heading-color)' }}>
                              Pay with Credit Card
                            </strong>
                            <div style={{ display: 'flex', gap: '0.3rem', alignItems: 'center', fontSize: '0.68rem', background: '#0A1E42', color: 'var(--gold-lt)', padding: '0.15rem 0.5rem', borderRadius: '4px' }}>
                              <Lock style={{ width: '0.65rem', height: '0.65rem' }} />
                              <span>Powered by Stripe</span>
                            </div>
                          </div>
                          <span style={{ fontSize: '0.76rem', color: 'var(--muted-color)', display: 'block', marginTop: '0.15rem' }}>
                            Secure 256-bit encryption. Visa, Mastercard, Amex.
                          </span>

                          {/* Card input mockup fields */}
                          {formData.paymentMethod === 'card_stripe' && (
                            <div style={{ marginTop: '0.8rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                              <div style={{ position: 'relative' }}>
                                <input
                                  type="text"
                                  placeholder="Card number (0000 0000 0000 0000)"
                                  value={formData.cardNumber}
                                  onChange={handleCardNumberChange}
                                  maxLength={19}
                                  style={{
                                    width: '100%',
                                    padding: '0.65rem 0.75rem 0.65rem 2.2rem',
                                    borderRadius: '6px',
                                    border: '1px solid var(--surface-border)',
                                    background: 'var(--bg-page)',
                                    color: 'var(--text-main)',
                                    fontSize: '0.85rem',
                                    fontFamily: 'monospace',
                                  }}
                                />
                                <CreditCard style={{ position: 'absolute', left: '0.7rem', top: '50%', transform: 'translateY(-50%)', width: '1rem', height: '1rem', color: 'var(--gold-primary)' }} />
                              </div>
                              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.4rem' }}>
                                <input
                                  type="text"
                                  placeholder="MM/YY"
                                  value={formData.cardExp}
                                  onChange={handleExpChange}
                                  maxLength={5}
                                  style={{
                                    padding: '0.6rem 0.75rem',
                                    borderRadius: '6px',
                                    border: '1px solid var(--surface-border)',
                                    background: 'var(--bg-page)',
                                    color: 'var(--text-main)',
                                    fontSize: '0.85rem',
                                    textAlign: 'center',
                                  }}
                                />
                                <input
                                  type="password"
                                  placeholder="CVC"
                                  name="cardCvc"
                                  value={formData.cardCvc}
                                  onChange={handleChange}
                                  maxLength={4}
                                  style={{
                                    padding: '0.6rem 0.75rem',
                                    borderRadius: '6px',
                                    border: '1px solid var(--surface-border)',
                                    background: 'var(--bg-page)',
                                    color: 'var(--text-main)',
                                    fontSize: '0.85rem',
                                    textAlign: 'center',
                                  }}
                                />
                                <input
                                  type="text"
                                  placeholder="Postal Code"
                                  name="cardZip"
                                  value={formData.cardZip}
                                  onChange={handleChange}
                                  maxLength={7}
                                  style={{
                                    padding: '0.6rem 0.75rem',
                                    borderRadius: '6px',
                                    border: '1px solid var(--surface-border)',
                                    background: 'var(--bg-page)',
                                    color: 'var(--text-main)',
                                    fontSize: '0.85rem',
                                    textAlign: 'center',
                                  }}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </label>

                      {/* Option 2: Pay at Drop-off */}
                      <label
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '0.75rem',
                          padding: '0.85rem',
                          borderRadius: '10px',
                          border: `1.5px solid ${formData.paymentMethod === 'pay_at_dropoff' ? 'var(--gold)' : 'var(--surface-border)'}`,
                          background: formData.paymentMethod === 'pay_at_dropoff' ? 'rgba(201, 160, 60, 0.08)' : 'var(--surface-card)',
                          cursor: 'pointer',
                        }}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="pay_at_dropoff"
                          checked={formData.paymentMethod === 'pay_at_dropoff'}
                          onChange={handleChange}
                          style={{ marginTop: '0.2rem' }}
                        />
                        <div>
                          <strong style={{ fontSize: '0.9rem', color: 'var(--heading-color)' }}>
                            Pay at Drop-off (In Shop)
                          </strong>
                          <span style={{ fontSize: '0.76rem', color: 'var(--muted-color)', display: 'block', marginTop: '0.15rem' }}>
                            Inspect your vehicle with our technician first. Pay by debit, card or e-transfer in the shop.
                          </span>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn btn--gold"
                    style={{ width: '100%', minHeight: '54px', fontSize: '1rem', fontWeight: 900 }}
                  >
                    {submitting ? (
                      <>
                        <Loader2 style={{ width: '1.2rem', height: '1.2rem', animation: 'spin 1s linear infinite' }} />
                        <span>Confirming Reservation...</span>
                      </>
                    ) : (
                      <>
                        <span>
                          {formData.paymentMethod === 'card_stripe'
                            ? `Pay $${grandTotal.toFixed(2)} CAD & Reserve`
                            : `Reserve Appointment ($${grandTotal.toFixed(2)} CAD)`}
                        </span>
                        <ArrowRight style={{ width: '1.1rem', height: '1.1rem' }} />
                      </>
                    )}
                  </button>

                  <div style={{ textAlign: 'center', fontSize: '0.72rem', color: 'var(--muted-color)', lineHeight: 1.4 }}>
                    Appointment only &middot; Final price confirmed at drop-off, never after &middot; 36 Joseph St, Kingston
                  </div>

                </div>

              </div>
            </form>
          ) : (
            /* Confirmation Receipt View */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.6rem', textAlign: 'center', padding: '1rem 0' }}>
              <div
                style={{
                  width: '4.5rem',
                  height: '4.5rem',
                  borderRadius: '50%',
                  background: 'rgba(16, 185, 129, 0.15)',
                  border: '2px solid #10B981',
                  color: '#10B981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto',
                }}
              >
                <CheckCircle2 style={{ width: '2.5rem', height: '2.5rem' }} />
              </div>

              <div>
                <span style={{ fontFamily: 'var(--mono)', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--gold-primary)', fontWeight: 800 }}>
                  Booking Confirmed
                </span>
                <h3 style={{ fontFamily: 'var(--display)', fontSize: '2.4rem', fontWeight: 900, margin: '0.2rem 0', color: 'var(--heading-color)' }}>
                  WE HAVE YOUR APPOINTMENT!
                </h3>
                <p style={{ color: 'var(--muted-color)', fontSize: '0.95rem', maxWidth: '42ch', margin: '0 auto' }}>
                  A confirmation email has been dispatched to <strong>{confirmedReservation?.customer?.email}</strong>.
                </p>
              </div>

              {/* Receipt Summary Card */}
              <div
                style={{
                  background: 'var(--surface-card)',
                  border: '2px solid var(--surface-border-gold)',
                  borderRadius: '12px',
                  padding: '1.4rem',
                  textAlign: 'left',
                  maxWidth: '520px',
                  margin: '0 auto',
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--surface-border)', paddingBottom: '0.6rem' }}>
                  <span style={{ color: 'var(--muted-color)', fontSize: '0.85rem' }}>Reservation Reference:</span>
                  <strong style={{ fontFamily: 'var(--mono)', fontSize: '1rem', color: 'var(--gold-primary)' }}>
                    {confirmedReservation?.id}
                  </strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                  <span style={{ color: 'var(--muted-color)' }}>Scheduled Drop-off:</span>
                  <strong style={{ color: 'var(--text-main)' }}>
                    {confirmedReservation?.appointment?.date} &middot; {confirmedReservation?.appointment?.slot}
                  </strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                  <span style={{ color: 'var(--muted-color)' }}>Shop Address:</span>
                  <strong style={{ color: 'var(--text-main)' }}>36 Joseph St, Kingston, ON K7K 2H5</strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                  <span style={{ color: 'var(--muted-color)' }}>Vehicle:</span>
                  <strong style={{ color: 'var(--text-main)' }}>
                    {confirmedReservation?.customer?.vehicleYear} {confirmedReservation?.customer?.vehicleMake} {confirmedReservation?.customer?.vehicleModel || 'Vehicle'}
                  </strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                  <span style={{ color: 'var(--muted-color)' }}>Payment Method:</span>
                  <strong style={{ color: 'var(--text-main)' }}>
                    {confirmedReservation?.payment?.method === 'card_stripe' ? 'Credit Card (Stripe)' : 'Pay at Drop-off (In-Store)'}
                  </strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderTop: '1px dashed var(--surface-border)', paddingTop: '0.6rem' }}>
                  <span style={{ fontWeight: 800, color: 'var(--heading-color)' }}>Total Amount:</span>
                  <div style={{ fontFamily: 'var(--display)', fontSize: '1.6rem', fontWeight: 900, color: 'var(--gold-primary)' }}>
                    ${confirmedReservation?.pricing?.grandTotal?.toFixed(2)} CAD
                  </div>
                </div>
              </div>

              {/* Action Buttons: Add to Calendar, iCal, Print */}
              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <a
                  href={generateGoogleCalendarUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--gold"
                  style={{ minHeight: '44px', padding: '0 1.25rem', fontSize: '0.88rem' }}
                >
                  <CalendarPlus style={{ width: '1rem', height: '1rem' }} />
                  <span>Google Calendar</span>
                </a>

                <button
                  type="button"
                  onClick={downloadIcs}
                  className="btn btn--outline"
                  style={{ minHeight: '44px', padding: '0 1.25rem', fontSize: '0.88rem' }}
                >
                  <Calendar style={{ width: '1rem', height: '1rem' }} />
                  <span>Download iCal</span>
                </button>

                <button
                  type="button"
                  onClick={() => window.print()}
                  className="btn btn--outline"
                  style={{ minHeight: '44px', padding: '0 1.25rem', fontSize: '0.88rem' }}
                >
                  <Printer style={{ width: '1rem', height: '1rem' }} />
                  <span>Print Receipt</span>
                </button>
              </div>

              <div>
                <button
                  onClick={() => {
                    setIsCheckoutOpen(false);
                    setStep('form');
                  }}
                  className="btn btn--navy"
                  style={{ minHeight: '42px', padding: '0 1.5rem', fontSize: '0.88rem' }}
                >
                  Back to Website
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
