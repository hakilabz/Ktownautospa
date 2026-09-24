import React, { useState, useEffect, useMemo } from 'react';
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
  Printer,
  ShieldCheck,
  Send,
  Banknote,
  Clock,
  Tag,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../context/CartContext';

function getAvailableSlots(dateStr) {
  if (!dateStr) return { slots: [], isSunday: false, isSaturday: false };
  const [yyyy, mm, dd] = dateStr.split('-').map(Number);
  const d = new Date(yyyy, mm - 1, dd);
  const day = d.getDay(); // 0 = Sun, 6 = Sat

  if (day === 0) {
    return { slots: [], isSunday: true, isSaturday: false };
  }

  if (day === 6) {
    return {
      slots: [
        '12:00 PM',
        '1:00 PM',
        '2:00 PM',
        '3:00 PM',
        '4:00 PM',
        '5:00 PM',
        '6:00 PM',
      ],
      isSunday: false,
      isSaturday: true,
    };
  }

  return {
    slots: [
      '9:00 AM',
      '10:00 AM',
      '11:00 AM',
      '12:00 PM',
      '1:00 PM',
      '2:00 PM',
      '3:00 PM',
      '4:00 PM',
      '5:00 PM',
      '6:00 PM',
    ],
    isSunday: false,
    isSaturday: false,
  };
}

function getInitialBookingDate() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  if (d.getDay() === 0) {
    d.setDate(d.getDate() + 1); // skip Sunday to Monday
  }
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

export default function CheckoutModal() {
  const {
    cart,
    subtotal,
    discountAmount,
    netSubtotal,
    hstTax,
    cardFee,
    grandTotalStandard,
    grandTotalCard,
    grandTotal,
    appliedCoupon,
    isCheckoutOpen,
    setIsCheckoutOpen,
    clearCart,
  } = useCart();

  const [step, setStep] = useState('form'); // 'form' | 'verifying' | 'success'
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const initialDate = useMemo(() => getInitialBookingDate(), []);
  const initialSlots = useMemo(() => getAvailableSlots(initialDate).slots, [initialDate]);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    vehicleYear: '',
    vehicleMake: '',
    vehicleModel: '',
    notes: '',
    preferredDate: initialDate,
    preferredSlot: initialSlots[0] || '9:00 AM',
    paymentMethod: 'etransfer', // 'etransfer' | 'cash' | 'card_stripe'
  });

  const [confirmedReservation, setConfirmedReservation] = useState(null);

  const { slots: availableSlots, isSunday, isSaturday } = useMemo(
    () => getAvailableSlots(formData.preferredDate),
    [formData.preferredDate]
  );

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    const { slots, isSunday: isSun } = getAvailableSlots(newDate);
    setFormData(prev => ({
      ...prev,
      preferredDate: newDate,
      preferredSlot: isSun ? '' : (slots.includes(prev.preferredSlot) ? prev.preferredSlot : (slots[0] || '')),
    }));
  };

  // Handle Stripe return URLs (?booking=success or ?booking=cancelled)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const bookingStatus = params.get('booking');
    const sessionId = params.get('session_id');
    const reservationId = params.get('reservation_id');

    if (bookingStatus === 'success' && sessionId) {
      setIsCheckoutOpen(true);
      setStep('verifying');

      fetch(`/api/confirm-stripe-session?session_id=${encodeURIComponent(sessionId)}&reservation_id=${encodeURIComponent(reservationId || '')}`)
        .then(async (res) => {
          if (!res.ok) {
            const errData = await res.json().catch(() => ({}));
            throw new Error(errData.error || 'Payment verification with Stripe was unsuccessful');
          }
          return res.json();
        })
        .then((data) => {
          if (data.reservation) {
            setConfirmedReservation(data.reservation);
            setStep('success');
            clearCart();

            // Confetti celebration for confirmed paid reservation
            try {
              confetti({
                particleCount: 160,
                spread: 85,
                origin: { y: 0.6 },
                colors: ['#F0D590', '#C9A03C', '#3E9BDA', '#12305F'],
              });
            } catch {}

            // Clean query parameters from URL bar
            window.history.replaceState(null, '', window.location.pathname);
          } else {
            throw new Error('No confirmed reservation details received');
          }
        })
        .catch((err) => {
          console.error('Session confirmation error:', err);
          setStep('form');
          setErrorMsg(err.message || 'Payment verification failed. Please contact us at (613) 484-8848 or ktownautomobilespa@gmail.com.');
        });
    } else if (bookingStatus === 'cancelled') {
      setIsCheckoutOpen(true);
      setStep('form');
      setErrorMsg('Payment was cancelled or interrupted. Your selections are still saved—you can try again or select "Pay at Drop-off (In Shop)".');
      window.history.replaceState(null, '', window.location.pathname);
    }
  }, [clearCart, setIsCheckoutOpen]);

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
      setErrorMsg('Please select your preferred appointment date.');
      return;
    }

    if (isSunday) {
      setErrorMsg('We are closed on Sundays. Please choose a date from Monday to Saturday.');
      return;
    }

    if (!formData.preferredSlot) {
      setErrorMsg('Please select an arrival time slot for your appointment.');
      return;
    }

    setSubmitting(true);

    try {
      const activeTotal = formData.paymentMethod === 'card_stripe' ? grandTotalCard : grandTotalStandard;

      // 1. Stripe Hosted Checkout Flow (Cards, Apple Pay, Google Pay)
      if (formData.paymentMethod === 'card_stripe') {
        const sessionRes = await fetch('/api/create-checkout-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            items: cart,
            couponCode: appliedCoupon?.code || undefined,
            discountAmount: discountAmount || 0,
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
          }),
        });

        if (!sessionRes.ok) {
          const err = await sessionRes.json().catch(() => ({}));
          throw new Error(err.error || 'Failed to initialize secure checkout session');
        }

        const sessionData = await sessionRes.json();
        if (sessionData.url) {
          // Redirect directly to Stripe Hosted Checkout
          window.location.href = sessionData.url;
          return;
        } else {
          throw new Error(sessionData.message || 'Stripe checkout URL was not returned');
        }
      }

      // 2. Interac e-Transfer or Cash (In Shop) Flow
      const resvRes = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart,
          couponCode: appliedCoupon?.code || undefined,
          discountAmount: discountAmount || 0,
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
          paymentMethod: formData.paymentMethod, // 'etransfer' | 'cash'
          paymentStatus: formData.paymentMethod === 'etransfer' ? 'pending_etransfer' : 'pending_cash',
          total: activeTotal,
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

      // Dispatch browser-level notification backup to guarantee delivery
      try {
        const itemSummary = cart.map(i => `${i.title} (${i.vehicleLabel}) - $${i.totalPrice} CAD`).join(', ');
        const payLabel = formData.paymentMethod === 'etransfer' ? 'Interac e-Transfer (ktownautomobilespa@gmail.com)' : 'Cash in Shop (36 Joseph St)';
        fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({
            access_key: '2e1c3132-7a7a-4c2c-80a5-f8510800fa26',
            subject: `🚨 NEW BOOKING (${payLabel}): ${formData.name} - ${resvData.reservation?.id} ($${activeTotal.toFixed(2)} CAD)`,
            from_name: 'Ktown Auto Spa Bookings',
            replyto: formData.email,
            message: `Booking Ref: ${resvData.reservation?.id}\nCustomer: ${formData.name} (${formData.phone}, ${formData.email})\nVehicle: ${formData.vehicleYear} ${formData.vehicleMake} ${formData.vehicleModel}\nDate: ${formData.preferredDate} (${formData.preferredSlot})\nServices: ${itemSummary}\nTotal: $${activeTotal.toFixed(2)} CAD\nPayment Method: ${payLabel}\nCoupon: ${appliedCoupon?.code || 'None'}\nNotes: ${formData.notes || 'None'}`,
          }),
        }).catch(() => {});
      } catch {}

      // Confetti celebration
      try {
        confetti({
          particleCount: 140,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#F0D590', '#C9A03C', '#3E9BDA', '#12305F'],
        });
      } catch {}
    } catch (err) {
      console.error('Checkout error:', err);
      const friendlyMsg = err.message || 'An error occurred during booking. Please try again.';
      setErrorMsg(friendlyMsg);

      // Record failed payment attempt on backend so owners can rescue the booking
      if (formData.paymentMethod === 'card_stripe') {
        try {
          fetch('/api/payment-failed', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              customer: {
                name: formData.name,
                phone: formData.phone,
                email: formData.email,
                vehicleYear: formData.vehicleYear,
                vehicleMake: formData.vehicleMake,
                vehicleModel: formData.vehicleModel,
                notes: formData.notes,
              },
              items: cart,
              error: friendlyMsg,
              attemptedPaymentMethod: 'card_stripe',
            }),
          }).catch(() => {});
        } catch {}
      }
    } finally {
      setSubmitting(false);
    }
  };

  const generateGoogleCalendarUrl = () => {
    if (!confirmedReservation || !confirmedReservation.appointment) return '#';
    const dateStr = (confirmedReservation.appointment.date || '').replace(/-/g, '');
    let startHour = '090000';
    let endHour = '120000';

    if (confirmedReservation.appointment.slot?.includes('12 PM')) {
      startHour = '120000';
      endHour = '150000';
    } else if (confirmedReservation.appointment.slot?.includes('3 PM')) {
      startHour = '150000';
      endHour = '180000';
    }

    const startFormatted = `${dateStr}T${startHour}`;
    const endFormatted = `${dateStr}T${endHour}`;
    const title = encodeURIComponent(`Ktown Auto Spa Appointment (${confirmedReservation.id})`);
    const serviceTitles = confirmedReservation.items?.length
      ? confirmedReservation.items.map(i => i.title).join(', ')
      : 'Automotive Detailing';
    const details = encodeURIComponent(
      `Appointment Ref: ${confirmedReservation.id}\nServices: ${serviceTitles}\nTotal: $${confirmedReservation.pricing?.grandTotal?.toFixed(2)} CAD\nContact: 647-915-3530`
    );
    const location = encodeURIComponent('36 Joseph St, Kingston, ON K7K 2H5');

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startFormatted}/${endFormatted}&details=${details}&location=${location}`;
  };

  const downloadIcs = () => {
    if (!confirmedReservation || !confirmedReservation.appointment) return;
    const dateStr = (confirmedReservation.appointment.date || '').replace(/-/g, '');
    const serviceTitles = confirmedReservation.items?.length
      ? confirmedReservation.items.map(i => i.title).join(', ')
      : 'Automotive Detailing';
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Ktown Auto Spa//Booking Engine//EN
BEGIN:VEVENT
SUMMARY:Ktown Auto Spa - ${serviceTitles}
DESCRIPTION:Booking Ref: ${confirmedReservation.id}\\nTotal: $${confirmedReservation.pricing?.grandTotal?.toFixed(2)} CAD\\nLocation: 36 Joseph St, Kingston, ON
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
                {step === 'form' ? 'Checkout & Scheduling' : step === 'verifying' ? 'Verifying Payment' : 'Booking Confirmed'}
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
          {step === 'verifying' ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3.5rem 1rem', textAlign: 'center', gap: '1.25rem' }}>
              <Loader2 style={{ width: '3.2rem', height: '3.2rem', color: 'var(--gold-primary)', animation: 'spin 1s linear infinite' }} />
              <div>
                <h3 style={{ fontFamily: 'var(--display)', fontSize: '1.5rem', fontWeight: 900, color: 'var(--heading-color)', margin: '0 0 0.5rem' }}>
                  Verifying Secure Payment with Stripe...
                </h3>
                <p style={{ color: 'var(--muted-color)', fontSize: '0.9rem', maxWidth: '42ch', margin: '0 auto', lineHeight: 1.5 }}>
                  Please hold on while we finalize your appointment and generate your official receipt.
                </p>
              </div>
            </div>
          ) : step === 'form' ? (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
              {errorMsg && (
                <div
                  style={{
                    background: 'rgba(239, 68, 68, 0.12)',
                    border: '1.5px solid #EF4444',
                    borderRadius: '8px',
                    padding: '0.9rem 1rem',
                    color: '#f87171',
                    fontSize: '0.86rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.6rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <AlertCircle style={{ width: '1.1rem', height: '1.1rem', flexShrink: 0, color: '#ef4444' }} />
                    <span style={{ fontWeight: 600 }}>{errorMsg}</span>
                  </div>

                  {formData.paymentMethod === 'card_stripe' && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.2rem' }}>
                      <button
                        type="button"
                        onClick={() => {
                          setFormData(prev => ({ ...prev, paymentMethod: 'pay_at_dropoff' }));
                          setErrorMsg('');
                        }}
                        style={{
                          background: 'var(--gold, #c9a03c)',
                          color: '#0a1e42',
                          border: 'none',
                          borderRadius: '6px',
                          padding: '0.45rem 0.85rem',
                          fontSize: '0.8rem',
                          fontWeight: 800,
                          cursor: 'pointer',
                        }}
                      >
                        ✓ Switch to Pay at Drop-off &amp; Reserve Spot Now
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Grid 2 Columns: Details + Order Summary */}
              <div className="checkout-grid-main">
                
                {/* Left Column: Form Fields */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  
                  {/* Step A: Appointment Schedule */}
                  <div>
                    <label className="checkout-field-label">
                      1. Preferred Date &amp; Arrival Slot
                    </label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                      <div>
                        <span className="checkout-input-sublabel">Appointment Date *</span>
                        <input
                          type="date"
                          name="preferredDate"
                          min={initialDate}
                          value={formData.preferredDate}
                          onChange={handleDateChange}
                          required
                          className="checkout-input"
                        />
                      </div>

                      {isSunday ? (
                        <div style={{ background: 'rgba(239, 68, 68, 0.12)', border: '1px solid rgba(239, 68, 68, 0.35)', borderRadius: '8px', padding: '0.75rem 1rem', color: '#fca5a5', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <AlertCircle style={{ width: '1.2rem', height: '1.2rem', flexShrink: 0, color: '#ef4444' }} />
                          <span>We are <strong>closed on Sundays</strong>. Please select Monday through Saturday for your appointment.</span>
                        </div>
                      ) : (
                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                            <span className="checkout-input-sublabel">Select Hourly Arrival Window *</span>
                            <span style={{ fontSize: '0.72rem', color: 'var(--muted-color)' }}>
                              {isSaturday ? 'Saturday: 12 PM - 6 PM' : 'Mon - Fri: 9 AM - 6 PM'}
                            </span>
                          </div>

                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(88px, 1fr))', gap: '0.45rem' }}>
                            {availableSlots.map((slot) => {
                              const isSelected = formData.preferredSlot === slot;
                              return (
                                <button
                                  key={slot}
                                  type="button"
                                  onClick={() => setFormData(prev => ({ ...prev, preferredSlot: slot }))}
                                  style={{
                                    padding: '0.55rem 0.35rem',
                                    borderRadius: '6px',
                                    border: isSelected ? '1.5px solid var(--gold)' : '1px solid var(--surface-border)',
                                    background: isSelected ? 'rgba(201, 160, 60, 0.2)' : 'var(--bg-card)',
                                    color: isSelected ? 'var(--gold-primary)' : 'var(--text-main)',
                                    fontSize: '0.8rem',
                                    fontWeight: isSelected ? 800 : 500,
                                    cursor: 'pointer',
                                    transition: 'all 0.15s ease',
                                    textAlign: 'center',
                                  }}
                                >
                                  {slot}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                    <span style={{ fontSize: '0.72rem', color: 'var(--muted-color)', display: 'block', marginTop: '0.35rem' }}>
                      Heated indoor spa facility &middot; 36 Joseph St, Kingston
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

                    {/* Tax & Total Breakdown */}
                    <div style={{ borderTop: '1px solid var(--surface-border)', paddingTop: '0.65rem', display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.85rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--muted-color)' }}>
                        <span>Subtotal:</span>
                        <span>${subtotal.toFixed(2)} CAD</span>
                      </div>

                      {discountAmount > 0 && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#10B981' }}>
                          <span>Coupon Discount ({appliedCoupon?.code}):</span>
                          <strong>-${discountAmount.toFixed(2)} CAD</strong>
                        </div>
                      )}

                      <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--muted-color)' }}>
                        <span>Ontario HST (13%):</span>
                        <span>${hstTax.toFixed(2)} CAD</span>
                      </div>

                      {formData.paymentMethod === 'card_stripe' ? (
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--gold-primary)' }}>
                          <span>Card Processing Fee (3%):</span>
                          <span>+${cardFee.toFixed(2)} CAD</span>
                        </div>
                      ) : (
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#10B981', fontSize: '0.78rem' }}>
                          <span>Payment Fee:</span>
                          <span>$0.00 (Waived for {formData.paymentMethod === 'etransfer' ? 'e-Transfer' : 'Cash'})</span>
                        </div>
                      )}

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingTop: '0.4rem', borderTop: '1px dashed var(--surface-border)' }}>
                        <span style={{ fontWeight: 800, color: 'var(--heading-color)', fontSize: '0.92rem' }}>Total:</span>
                        <div style={{ textAlign: 'right' }}>
                          <span style={{ fontFamily: 'var(--display)', fontSize: '1.75rem', fontWeight: 900, color: 'var(--gold-primary)' }}>
                            ${formData.paymentMethod === 'card_stripe' ? grandTotalCard.toFixed(2) : grandTotalStandard.toFixed(2)}
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

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                      {/* Option 1: Interac e-Transfer */}
                      <label className={`checkout-pay-option ${formData.paymentMethod === 'etransfer' ? 'is-selected' : 'not-selected'}`}>
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="etransfer"
                          checked={formData.paymentMethod === 'etransfer'}
                          onChange={handleChange}
                          style={{ marginTop: '0.2rem', accentColor: 'var(--gold)' }}
                        />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div className="checkout-pay-header">
                            <strong style={{ fontSize: '0.92rem', color: 'var(--heading-color)' }}>
                              Interac e-Transfer
                            </strong>
                            <span style={{ fontSize: '0.68rem', fontWeight: 800, padding: '2px 7px', borderRadius: '4px', background: 'rgba(16, 185, 129, 0.15)', color: '#10B981', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                              0% Fee &middot; 13% HST Only
                            </span>
                          </div>
                          <span style={{ fontSize: '0.75rem', color: 'var(--muted-color)', display: 'block', marginTop: '0.2rem' }}>
                            Send to <strong>ktownautomobilespa@gmail.com</strong>. Auto-deposit enabled. No card surcharge.
                          </span>

                          {formData.paymentMethod === 'etransfer' && (
                            <div style={{ marginTop: '0.65rem', padding: '0.75rem 0.85rem', background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.25)', borderRadius: '8px', fontSize: '0.76rem', color: 'var(--text-main)', lineHeight: 1.45 }}>
                              <div style={{ fontWeight: 800, color: '#10B981', marginBottom: '0.2rem' }}>
                                📱 Interac e-Transfer Instructions:
                              </div>
                              <div>&bull; Recipient: <strong>Ktown Auto Spa</strong></div>
                              <div>&bull; Email: <strong>ktownautomobilespa@gmail.com</strong></div>
                              <div>&bull; Amount: <strong>${grandTotalStandard.toFixed(2)} CAD</strong></div>
                              <div style={{ color: 'var(--muted-color)', marginTop: '0.25rem', fontSize: '0.72rem' }}>
                                Your appointment is booked instantly. Transfer receipt will be verified by our team.
                              </div>
                            </div>
                          )}
                        </div>
                      </label>

                      {/* Option 2: Cash (In Shop) */}
                      <label className={`checkout-pay-option ${formData.paymentMethod === 'cash' ? 'is-selected' : 'not-selected'}`}>
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="cash"
                          checked={formData.paymentMethod === 'cash'}
                          onChange={handleChange}
                          style={{ marginTop: '0.2rem', accentColor: 'var(--gold)' }}
                        />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div className="checkout-pay-header">
                            <strong style={{ fontSize: '0.92rem', color: 'var(--heading-color)' }}>
                              Cash (Pay in Shop)
                            </strong>
                            <span style={{ fontSize: '0.68rem', fontWeight: 800, padding: '2px 7px', borderRadius: '4px', background: 'rgba(59, 130, 246, 0.15)', color: '#60A5FA', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
                              0% Fee &middot; 13% HST Only
                            </span>
                          </div>
                          <span style={{ fontSize: '0.75rem', color: 'var(--muted-color)', display: 'block', marginTop: '0.2rem' }}>
                            Pay with cash when dropping off your vehicle at <strong>36 Joseph St, Kingston</strong>.
                          </span>
                        </div>
                      </label>

                      {/* Option 3: Credit Card / Apple Pay (Stripe) */}
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
                            <strong style={{ fontSize: '0.92rem', color: 'var(--heading-color)' }}>
                              Pay with Credit Card
                            </strong>
                            <div className="checkout-stripe-badge">
                              <Lock style={{ width: '0.65rem', height: '0.65rem' }} />
                              <span>Stripe 256-Bit</span>
                            </div>
                          </div>
                          <span style={{ fontSize: '0.75rem', color: 'var(--muted-color)', display: 'block', marginTop: '0.2rem' }}>
                            Official Stripe 256-bit encryption. +3% processing fee (${cardFee.toFixed(2)} CAD).
                          </span>

                          {formData.paymentMethod === 'card_stripe' && (
                            <div
                              style={{
                                marginTop: '0.75rem',
                                padding: '0.85rem 1rem',
                                background: 'rgba(201, 160, 60, 0.08)',
                                border: '1px solid rgba(201, 160, 60, 0.25)',
                                borderRadius: '8px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.45rem',
                              }}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--gold-primary)', fontWeight: 700, fontSize: '0.82rem' }}>
                                <ShieldCheck style={{ width: '1.1rem', height: '1.1rem', flexShrink: 0 }} />
                                <span>Official Stripe Hosted Checkout</span>
                              </div>
                              <p style={{ margin: 0, fontSize: '0.76rem', color: 'var(--muted-color)', lineHeight: 1.45 }}>
                                Instant card authorization with 3D-Secure bank protection.
                              </p>
                              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', alignItems: 'center', marginTop: '0.2rem' }}>
                                <span style={{ fontSize: '0.68rem', padding: '0.2rem 0.45rem', borderRadius: '4px', background: 'var(--surface-card)', border: '1px solid var(--surface-border)', color: 'var(--text-main)', fontWeight: 600 }}>💳 Cards (Visa, MC, Amex)</span>
                                <span style={{ fontSize: '0.68rem', padding: '0.2rem 0.45rem', borderRadius: '4px', background: 'var(--surface-card)', border: '1px solid var(--surface-border)', color: 'var(--text-main)', fontWeight: 600 }}>🍏 Apple Pay</span>
                                <span style={{ fontSize: '0.68rem', padding: '0.2rem 0.45rem', borderRadius: '4px', background: 'var(--surface-card)', border: '1px solid var(--surface-border)', color: 'var(--text-main)', fontWeight: 600 }}>🤖 Google Pay</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={submitting || isSunday || !formData.preferredSlot}
                    className="btn btn--gold checkout-submit-btn"
                  >
                    {submitting ? (
                      <>
                        <Loader2 style={{ width: '1.2rem', height: '1.2rem', animation: 'spin 1s linear infinite' }} />
                        <span>
                          {formData.paymentMethod === 'card_stripe' ? 'Redirecting to Stripe...' : 'Reserving Appointment...'}
                        </span>
                      </>
                    ) : (
                      <>
                        <span>
                          {formData.paymentMethod === 'card_stripe'
                            ? `Proceed to Stripe Checkout ($${grandTotalCard.toFixed(2)} CAD)`
                            : formData.paymentMethod === 'etransfer'
                            ? `Reserve with Interac e-Transfer ($${grandTotalStandard.toFixed(2)} CAD)`
                            : `Reserve Appointment ($${grandTotalStandard.toFixed(2)} CAD)`}
                        </span>
                        <ArrowRight style={{ width: '1.1rem', height: '1.1rem', flexShrink: 0 }} />
                      </>
                    )}
                  </button>

                  <div style={{ textAlign: 'center', fontSize: '0.72rem', color: 'var(--muted-color)', lineHeight: 1.4 }}>
                    Appointment only &middot; Final price confirmed before service &middot; 36 Joseph St, Kingston
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
                    {confirmedReservation?.payment?.method === 'card_stripe'
                      ? 'Credit Card (Stripe - Paid Online)'
                      : confirmedReservation?.payment?.method === 'etransfer'
                      ? 'Interac e-Transfer'
                      : confirmedReservation?.payment?.method === 'cash'
                      ? 'Cash at Drop-off'
                      : 'Pay at Drop-off (In-Store)'}
                  </strong>
                </div>

                <div className="checkout-receipt-row" style={{ borderTop: '1px dashed var(--surface-border)', paddingTop: '0.6rem' }}>
                  <span style={{ fontWeight: 800, color: 'var(--heading-color)' }}>Total Amount:</span>
                  <div style={{ fontFamily: 'var(--display)', fontSize: '1.5rem', fontWeight: 900, color: 'var(--gold-primary)' }}>
                    ${confirmedReservation?.pricing?.grandTotal?.toFixed(2)} CAD
                  </div>
                </div>

                {confirmedReservation?.payment?.method === 'etransfer' && (
                  <div style={{ marginTop: '0.85rem', padding: '0.85rem 1rem', background: 'rgba(16, 185, 129, 0.1)', border: '1.5px solid rgba(16, 185, 129, 0.4)', borderRadius: '8px', textAlign: 'left', fontSize: '0.82rem', lineHeight: 1.5 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 800, color: '#10B981', marginBottom: '0.35rem' }}>
                      <Send style={{ width: '1rem', height: '1rem' }} />
                      <span>Next Step: Complete Your Interac e-Transfer</span>
                    </div>
                    <div>&bull; Recipient: <strong>Ktown Auto Spa</strong></div>
                    <div>&bull; Send to Email: <strong>ktownautomobilespa@gmail.com</strong></div>
                    <div>&bull; Transfer Amount: <strong>${confirmedReservation?.pricing?.grandTotal?.toFixed(2)} CAD</strong></div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--muted-color)', marginTop: '0.35rem' }}>
                      Auto-deposit is enabled. Please include reference <strong>{confirmedReservation?.id}</strong> in your transfer note. Our shop team will mark your booking verified.
                    </div>
                  </div>
                )}

                {confirmedReservation?.payment?.method === 'cash' && (
                  <div style={{ marginTop: '0.85rem', padding: '0.85rem 1rem', background: 'rgba(59, 130, 246, 0.1)', border: '1.5px solid rgba(59, 130, 246, 0.4)', borderRadius: '8px', textAlign: 'left', fontSize: '0.82rem', lineHeight: 1.5 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 800, color: '#60A5FA', marginBottom: '0.35rem' }}>
                      <Banknote style={{ width: '1rem', height: '1rem' }} />
                      <span>Cash Drop-off Instructions</span>
                    </div>
                    <div>&bull; Bring <strong>${confirmedReservation?.pricing?.grandTotal?.toFixed(2)} CAD</strong> in cash when dropping off your vehicle.</div>
                    <div>&bull; Shop Location: <strong>36 Joseph St, Kingston, ON K7K 2H5</strong>.</div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--muted-color)', marginTop: '0.35rem' }}>
                      Our technician will greet you, inspect the vehicle, and hand you your official paper receipt.
                    </div>
                  </div>
                )}
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
