import React, { useState, useEffect } from 'react';
import {
  X,
  Calendar,
  CreditCard,
  CheckCircle2,
  CalendarPlus,
  ArrowRight,
  Loader2,
  Lock,
  AlertCircle,
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

  // Lock body scroll and listen for escape key when modal is open
  useEffect(() => {
    if (isCheckoutOpen) {
      document.body.classList.add('modal-open');
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          setIsCheckoutOpen(false);
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.classList.remove('modal-open');
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isCheckoutOpen, setIsCheckoutOpen]);

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
      className="checkout-overlay"
      onClick={() => setIsCheckoutOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkoutModalTitle"
    >
      <div
        className="checkout-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Topbar */}
        <div className="checkout-header">
          <div className="checkout-header-left">
            <img src="/logo.png" alt="Ktown Auto Spa" className="checkout-header-logo" />
            <div style={{ minWidth: 0 }}>
              <h2 id="checkoutModalTitle" className="checkout-header-title">
                {step === 'form' ? 'Checkout & Scheduling' : 'Booking Confirmed'}
              </h2>
              <span className="checkout-header-sub">
                36 Joseph St, Kingston ON &middot; 647-915-3530
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="checkout-close-btn"
            aria-label="Close checkout modal"
          >
            <X style={{ width: '1.4rem', height: '1.4rem' }} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="checkout-body">
          {step === 'form' ? (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
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
              <div className="checkout-grid-main">
                
                {/* Left Column: Form Fields */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  
                  {/* Step A: Appointment Schedule */}
                  <div>
                    <label className="checkout-field-label">
                      1. Preferred Date &amp; Drop-off Slot
                    </label>
                    <div className="checkout-row-date-slot">
                      <div>
                        <span className="checkout-input-sublabel">Drop-off Date *</span>
                        <input
                          type="date"
                          name="preferredDate"
                          value={formData.preferredDate}
                          onChange={handleChange}
                          required
                          className="checkout-input"
                        />
                      </div>
                      <div>
                        <span className="checkout-input-sublabel">Arrival Window *</span>
                        <select
                          name="preferredSlot"
                          value={formData.preferredSlot}
                          onChange={handleChange}
                          className="checkout-input"
                          style={{ fontSize: '0.84rem' }}
                        >
                          <option value="Morning (9 AM - 12 PM)">Morning (9 AM - 12 PM)</option>
                          <option value="Afternoon (12 PM - 3 PM)">Afternoon (12 PM - 3 PM)</option>
                          <option value="Late Afternoon (3 PM - 6 PM)">Late Afternoon (3 PM - 6 PM)</option>
                        </select>
                      </div>
                    </div>
                    <span style={{ fontSize: '0.72rem', color: 'var(--muted-color)', display: 'block', marginTop: '0.2rem' }}>
                      Open Saturdays &middot; Heated indoor bays year-round
                    </span>
                  </div>

                  {/* Step B: Customer Information */}
                  <div>
                    <label className="checkout-field-label">
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
                        className="checkout-input"
                      />
                      <div className="checkout-row-contact">
                        <input
                          type="tel"
                          name="phone"
                          placeholder="Phone / WhatsApp *"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="checkout-input"
                        />
                        <input
                          type="email"
                          name="email"
                          placeholder="Email Address *"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="checkout-input"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Step C: Vehicle Information */}
                  <div>
                    <label className="checkout-field-label">
                      3. Vehicle Details
                    </label>
                    <div className="checkout-row-vehicle">
                      <input
                        type="text"
                        name="vehicleYear"
                        placeholder="Year"
                        value={formData.vehicleYear}
                        onChange={handleChange}
                        className="checkout-input"
                      />
                      <input
                        type="text"
                        name="vehicleMake"
                        placeholder="Make (e.g. BMW)"
                        value={formData.vehicleMake}
                        onChange={handleChange}
                        className="checkout-input"
                      />
                      <input
                        type="text"
                        name="vehicleModel"
                        placeholder="Model (e.g. M3)"
                        value={formData.vehicleModel}
                        onChange={handleChange}
                        className="checkout-input"
                      />
                    </div>
                    <textarea
                      name="notes"
                      rows={2}
                      placeholder="Special requests or instructions (e.g. pet hair, drop-off timing)"
                      value={formData.notes}
                      onChange={handleChange}
                      className="checkout-input"
                      style={{ resize: 'none', height: 'auto', minHeight: '58px' }}
                    />
                  </div>

                </div>

                {/* Right Column: Order Breakdown & Payment Method */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  
                  {/* Order Summary Box */}
                  <div
                    style={{
                      background: 'var(--surface-card)',
                      border: '1.5px solid var(--surface-border)',
                      borderRadius: '12px',
                      padding: '1.15rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.75rem',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--surface-border)', paddingBottom: '0.55rem' }}>
                      <span style={{ fontFamily: 'var(--mono)', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--gold-primary)', fontWeight: 800 }}>
                        Order Summary
                      </span>
                      <span style={{ fontSize: '0.74rem', color: 'var(--muted-color)' }}>
                        {cart.length} {cart.length === 1 ? 'item' : 'items'}
                      </span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', maxHeight: '160px', overflowY: 'auto' }}>
                      {cart.map((item, idx) => {
                        const addTotal = (item.addons || []).reduce((a, b) => a + b.price, 0);
                        const lineTotal = (item.basePrice || 0) + addTotal;

                        return (
                          <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.84rem' }}>
                            <div style={{ minWidth: 0 }}>
                              <strong style={{ color: 'var(--text-main)', display: 'block', wordBreak: 'break-word' }}>{item.title}</strong>
                              <span style={{ color: 'var(--muted-color)', fontSize: '0.72rem', display: 'block' }}>
                                Class: {item.vehicleLabel} {item.addons?.length ? `(+${item.addons.length} add-ons)` : ''}
                              </span>
                            </div>
                            <b style={{ fontFamily: 'var(--display)', fontSize: '1.1rem', color: 'var(--water-dk)', flexShrink: 0 }}>
                              ${lineTotal}
                            </b>
                          </div>
                        );
                      })}
                    </div>

                    {/* Tax & Total */}
                    <div style={{ borderTop: '1px solid var(--surface-border)', paddingTop: '0.65rem', display: 'flex', flexDirection: 'column', gap: '0.3rem', fontSize: '0.85rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--muted-color)' }}>
                        <span>Subtotal:</span>
                        <span>${subtotal.toFixed(2)} CAD</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--muted-color)' }}>
                        <span>Ontario HST (13%):</span>
                        <span>${hstTax.toFixed(2)} CAD</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingTop: '0.4rem', borderTop: '1px dashed var(--surface-border)' }}>
                        <span style={{ fontWeight: 800, color: 'var(--heading-color)', fontSize: '0.92rem' }}>Grand Total:</span>
                        <div style={{ textAlign: 'right' }}>
                          <span style={{ fontFamily: 'var(--display)', fontSize: '1.75rem', fontWeight: 900, color: 'var(--gold-primary)' }}>
                            ${grandTotal.toFixed(2)}
                          </span>
                          <span style={{ fontSize: '0.7rem', color: 'var(--muted-color)', marginLeft: '0.3rem' }}>CAD</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Selection */}
                  <div>
                    <label className="checkout-field-label">
                      4. Select Payment Option
                    </label>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                      {/* Option 1: Credit Card (Stripe) */}
                      <label className={`checkout-pay-option ${formData.paymentMethod === 'card_stripe' ? 'is-selected' : 'not-selected'}`}>
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="card_stripe"
                          checked={formData.paymentMethod === 'card_stripe'}
                          onChange={handleChange}
                          style={{ marginTop: '0.2rem', accentColor: 'var(--gold)' }}
                        />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div className="checkout-pay-header">
                            <strong style={{ fontSize: '0.9rem', color: 'var(--heading-color)' }}>
                              Pay with Credit Card
                            </strong>
                            <div className="checkout-stripe-badge">
                              <Lock style={{ width: '0.65rem', height: '0.65rem' }} />
                              <span>Powered by Stripe</span>
                            </div>
                          </div>
                          <span style={{ fontSize: '0.75rem', color: 'var(--muted-color)', display: 'block', marginTop: '0.2rem' }}>
                            Secure 256-bit encryption. Visa, Mastercard, Amex.
                          </span>

                          {/* Card input mockup fields */}
                          {formData.paymentMethod === 'card_stripe' && (
                            <div style={{ marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                              <div style={{ position: 'relative' }}>
                                <input
                                  type="text"
                                  placeholder="Card number (0000 0000 0000 0000)"
                                  value={formData.cardNumber}
                                  onChange={handleCardNumberChange}
                                  maxLength={19}
                                  className="checkout-input"
                                  style={{ paddingLeft: '2.2rem', fontFamily: 'monospace', fontSize: '0.85rem' }}
                                />
                                <CreditCard style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', width: '1rem', height: '1rem', color: 'var(--gold-primary)' }} />
                              </div>
                              <div className="checkout-row-card-details">
                                <input
                                  type="text"
                                  placeholder="MM/YY"
                                  value={formData.cardExp}
                                  onChange={handleExpChange}
                                  maxLength={5}
                                  className="checkout-input checkout-input-center"
                                />
                                <input
                                  type="password"
                                  placeholder="CVC"
                                  name="cardCvc"
                                  value={formData.cardCvc}
                                  onChange={handleChange}
                                  maxLength={4}
                                  className="checkout-input checkout-input-center"
                                />
                                <input
                                  type="text"
                                  placeholder="Postal Code"
                                  name="cardZip"
                                  value={formData.cardZip}
                                  onChange={handleChange}
                                  maxLength={7}
                                  className="checkout-input checkout-input-center"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </label>

                      {/* Option 2: Pay at Drop-off */}
                      <label className={`checkout-pay-option ${formData.paymentMethod === 'pay_at_dropoff' ? 'is-selected' : 'not-selected'}`}>
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="pay_at_dropoff"
                          checked={formData.paymentMethod === 'pay_at_dropoff'}
                          onChange={handleChange}
                          style={{ marginTop: '0.2rem', accentColor: 'var(--gold)' }}
                        />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <strong style={{ fontSize: '0.9rem', color: 'var(--heading-color)', display: 'block' }}>
                            Pay at Drop-off (In Shop)
                          </strong>
                          <span style={{ fontSize: '0.75rem', color: 'var(--muted-color)', display: 'block', marginTop: '0.2rem', lineHeight: 1.4 }}>
                            Inspect your vehicle with our technician first. Pay by debit, credit card or e-transfer in the shop.
                          </span>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn btn--gold checkout-submit-btn"
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
                        <ArrowRight style={{ width: '1.1rem', height: '1.1rem', flexShrink: 0 }} />
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
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem', textAlign: 'center', padding: '0.5rem 0 1rem' }}>
              <div
                style={{
                  width: '4rem',
                  height: '4rem',
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
                <CheckCircle2 style={{ width: '2.2rem', height: '2.2rem' }} />
              </div>

              <div>
                <span style={{ fontFamily: 'var(--mono)', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--gold-primary)', fontWeight: 800 }}>
                  Booking Confirmed
                </span>
                <h3 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(1.7rem, 5vw, 2.3rem)', fontWeight: 900, margin: '0.2rem 0', color: 'var(--heading-color)', lineHeight: 1.1 }}>
                  WE HAVE YOUR APPOINTMENT!
                </h3>
                <p style={{ color: 'var(--muted-color)', fontSize: '0.92rem', maxWidth: '44ch', margin: '0 auto', wordBreak: 'break-word' }}>
                  A confirmation email has been dispatched to <strong>{confirmedReservation?.customer?.email}</strong>.
                </p>
              </div>

              {/* Receipt Summary Card */}
              <div className="checkout-receipt-card">
                <div className="checkout-receipt-row checkout-receipt-row-border">
                  <span className="checkout-receipt-label">Reservation Reference:</span>
                  <strong className="checkout-receipt-value-gold">
                    {confirmedReservation?.id}
                  </strong>
                </div>

                <div className="checkout-receipt-row">
                  <span className="checkout-receipt-label">Scheduled Drop-off:</span>
                  <strong className="checkout-receipt-value">
                    {confirmedReservation?.appointment?.date} &middot; {confirmedReservation?.appointment?.slot}
                  </strong>
                </div>

                <div className="checkout-receipt-row">
                  <span className="checkout-receipt-label">Shop Address:</span>
                  <strong className="checkout-receipt-value">36 Joseph St, Kingston, ON K7K 2H5</strong>
                </div>

                <div className="checkout-receipt-row">
                  <span className="checkout-receipt-label">Vehicle:</span>
                  <strong className="checkout-receipt-value">
                    {confirmedReservation?.customer?.vehicleYear} {confirmedReservation?.customer?.vehicleMake} {confirmedReservation?.customer?.vehicleModel || 'Vehicle'}
                  </strong>
                </div>

                <div className="checkout-receipt-row">
                  <span className="checkout-receipt-label">Payment Method:</span>
                  <strong className="checkout-receipt-value">
                    {confirmedReservation?.payment?.method === 'card_stripe' ? 'Credit Card (Stripe)' : 'Pay at Drop-off (In-Store)'}
                  </strong>
                </div>

                <div className="checkout-receipt-row" style={{ borderTop: '1px dashed var(--surface-border)', paddingTop: '0.6rem' }}>
                  <span style={{ fontWeight: 800, color: 'var(--heading-color)' }}>Total Amount:</span>
                  <div style={{ fontFamily: 'var(--display)', fontSize: '1.5rem', fontWeight: 900, color: 'var(--gold-primary)' }}>
                    ${confirmedReservation?.pricing?.grandTotal?.toFixed(2)} CAD
                  </div>
                </div>
              </div>

              {/* Action Buttons: Add to Calendar, iCal, Print */}
              <div className="checkout-confirm-actions">
                <a
                  href={generateGoogleCalendarUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--gold"
                >
                  <CalendarPlus style={{ width: '1rem', height: '1rem' }} />
                  <span>Google Calendar</span>
                </a>

                <button
                  type="button"
                  onClick={downloadIcs}
                  className="btn btn--outline"
                >
                  <Calendar style={{ width: '1rem', height: '1rem' }} />
                  <span>Download iCal</span>
                </button>

                <button
                  type="button"
                  onClick={() => window.print()}
                  className="btn btn--outline"
                >
                  <Printer style={{ width: '1rem', height: '1rem' }} />
                  <span>Print Receipt</span>
                </button>
              </div>

              <div style={{ marginTop: '0.25rem' }}>
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
