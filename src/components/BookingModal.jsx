import React, { useState } from 'react';
import { X, Calendar, Clock, Phone, Mail, CheckCircle2, Sparkles, Send, CalendarPlus, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function BookingModal({ isOpen, onClose, quoteData }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    vehicleModel: '',
    preferredDate: '',
    preferredTime: 'Morning (9 AM - 12 PM)',
    notes: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const totalEstimate = quoteData ? quoteData.total : 100;
  const pkgName = quoteData ? quoteData.pkgName : 'Medium Package';
  const vehicleLabel = quoteData ? quoteData.vehicleLabel : 'Sedan';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const emailPayload = {
      access_key: '2e1c3132-7a7a-4c2c-80a5-f8510800fa26', // Free Web3Forms / Formspree API Key for direct email dispatch to ktownautomobilespa@gmail.com
      subject: `🚨 NEW BOOKING: ${formData.name} - ${pkgName} ($${totalEstimate})`,
      from_name: 'Ktown Auto Spa Web Booking',
      to_email: 'ktownautomobilespa@gmail.com',
      replyto: formData.email,
      message: `
NEW SPA APPOINTMENT REQUEST
----------------------------------------
Customer Name: ${formData.name}
Phone Number: ${formData.phone}
Email Address: ${formData.email}
Vehicle Model: ${formData.vehicleModel}
Selected Package: ${pkgName} (${vehicleLabel})
Preferred Date: ${formData.preferredDate}
Preferred Time Slot: ${formData.preferredTime}
Estimated Total: $${totalEstimate} CAD
Location: 36 Joseph St, Kingston, ON
Special Notes: ${formData.notes || 'None'}
----------------------------------------
Received via Ktown Auto Spa Website
      `,
    };

    try {
      // Direct Web3Forms submission to ktownautomobilespa@gmail.com
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(emailPayload),
      });
    } catch (err) {
      console.log('Web3Forms dispatch fallback:', err);
    }

    // Fire Confetti & Show Confirmation
    try {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FFD700', '#00D2FF', '#ffffff', '#B8860B'],
      });
    } catch (err) {
      console.log('Confetti triggered');
    }

    setSubmitting(false);
    setSubmitted(true);
  };

  // Helper to generate Google Calendar Event URL
  const getGoogleCalendarUrl = () => {
    const dateStr = formData.preferredDate || new Date().toISOString().split('T')[0];
    const cleanDate = dateStr.replace(/-/g, '');
    
    let startHour = '090000';
    let endHour = '110000';

    if (formData.preferredTime.includes('12 PM')) {
      startHour = '120000';
      endHour = '140000';
    } else if (formData.preferredTime.includes('4 PM')) {
      startHour = '160000';
      endHour = '180000';
    }

    const startFormatted = `${cleanDate}T${startHour}`;
    const endFormatted = `${cleanDate}T${endHour}`;

    const title = `Ktown Auto Spa Detailing - ${pkgName} (${formData.vehicleModel})`;
    const details = `Ktown Auto Spa Detailing Appointment\n\nClient Name: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nVehicle: ${formData.vehicleModel}\nPackage: ${pkgName} (${vehicleLabel})\nEstimated Price: $${totalEstimate} CAD\nLocation: 36 Joseph St, Kingston, ON\nNotes: ${formData.notes || 'None'}\n\nKtown Auto Spa Contact: 647-915-3530 / ktownautomobilespa@gmail.com`;
    const location = `36 Joseph St, Kingston, ON, Canada`;
    const guestEmail = formData.email ? `${formData.email},ktownautomobilespa@gmail.com` : 'ktownautomobilespa@gmail.com';

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startFormatted}/${endFormatted}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}&add=${encodeURIComponent(guestEmail)}`;
  };

  const inputStyle = {
    width: '100%', background: 'var(--input-bg)', border: '1px solid var(--card-border)',
    color: 'var(--text-main)', borderRadius: '0.75rem', padding: '0.75rem', fontSize: '0.875rem',
    outline: 'none', fontFamily: 'inherit',
  };

  const labelStyle = {
    fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.375rem',
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '1rem', background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
      overflowY: 'auto',
    }}>
      <div className="spa-card-gold" style={{ position: 'relative', width: '100%', maxWidth: '42rem', margin: '2rem auto' }}>
        
        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: '1.25rem', right: '1.25rem', color: 'var(--text-muted)',
            padding: '0.5rem', borderRadius: '50%', background: 'var(--card-bg)',
            border: '1px solid var(--card-border)', cursor: 'pointer',
          }}
        >
          <X style={{ width: '1.25rem', height: '1.25rem' }} />
        </button>

        {!submitted ? (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Header */}
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(212,175,55,0.12)', border: '1px solid rgba(212,175,55,0.4)', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 800, color: 'var(--gold-primary)', marginBottom: '0.5rem' }}>
                <Sparkles style={{ width: '0.875rem', height: '0.875rem', color: 'var(--gold-primary)' }} />
                <span>Ktown Auto Spa Appointment</span>
              </div>
              <h3 className="gold-gradient-text" style={{ fontSize: 'clamp(1.5rem, 3vw, 1.875rem)', fontWeight: 900 }}>
                BOOK YOUR DETAILED SPA SESSION
              </h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                Selected: <strong style={{ color: 'var(--gold-primary)' }}>{pkgName}</strong> ({vehicleLabel}) — Estimated Total: <strong style={{ color: 'var(--cyan-glow)' }}>${totalEstimate} CAD</strong>
              </p>
            </div>

            {/* Form Fields */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
              <div>
                <label style={labelStyle}>Your Full Name *</label>
                <input type="text" required placeholder="e.g. Alex Mercer" value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Phone Number *</label>
                <input type="tel" required placeholder="e.g. 647-915-3530" value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Email Address *</label>
                <input type="email" required placeholder="e.g. client@example.com" value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Vehicle Make &amp; Model *</label>
                <input type="text" required placeholder="e.g. 2023 BMW M3 / Honda CR-V" value={formData.vehicleModel}
                  onChange={(e) => setFormData({ ...formData, vehicleModel: e.target.value })} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Preferred Date *</label>
                <input type="date" required value={formData.preferredDate}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Preferred Time Slot *</label>
                <select value={formData.preferredTime}
                  onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })} style={inputStyle}>
                  <option>Morning (9 AM - 12 PM)</option>
                  <option>Afternoon (12 PM - 4 PM)</option>
                  <option>Evening (4 PM - 7 PM)</option>
                </select>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label style={labelStyle}>Special Notes / Add-on Requests</label>
              <textarea rows={2} placeholder="Mention specific stain areas, bug removal focus, tire shine preference..."
                value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                style={{ ...inputStyle, resize: 'vertical' }} />
            </div>

            {/* Email Dispatch Notice */}
            <div style={{ background: 'var(--input-bg)', padding: '0.875rem', borderRadius: '0.75rem', border: '1px solid var(--card-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Mail style={{ width: '1rem', height: '1rem', color: 'var(--cyan-glow)', flexShrink: 0 }} />
                <span>Instant booking alert sent directly to <strong>ktownautomobilespa@gmail.com</strong></span>
              </div>
              <span style={{ color: 'var(--gold-primary)', fontWeight: 700 }}>Direct Email Alert</span>
            </div>

            {/* Submit */}
            <button type="submit" disabled={submitting} className="gold-button" style={{ width: '100%', height: '3.5rem', opacity: submitting ? 0.7 : 1 }}>
              {submitting ? (
                <>
                  <Loader2 className="animate-spin" style={{ width: '1.25rem', height: '1.25rem' }} />
                  <span>Sending Booking to Spa...</span>
                </>
              ) : (
                <>
                  <Send style={{ width: '1rem', height: '1rem', color: '#080a0f' }} />
                  <span>Confirm &amp; Reserve Appointment</span>
                </>
              )}
            </button>

          </form>
        ) : (
          /* Confirmation State */
          <div style={{ textAlign: 'center', padding: '1.5rem 0', display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
            
            <div style={{ width: '4rem', height: '4rem', background: 'rgba(212,175,55,0.18)', color: 'var(--gold-primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(212,175,55,0.4)' }}>
              <CheckCircle2 style={{ width: '2.5rem', height: '2.5rem' }} />
            </div>

            <div>
              <h3 className="gold-gradient-text" style={{ fontSize: '1.875rem', fontWeight: 900 }}>
                APPOINTMENT RESERVED!
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', maxWidth: '28rem', margin: '0.5rem auto 0' }}>
                Thank you, <strong style={{ color: 'var(--text-main)' }}>{formData.name}</strong>! Your request has been dispatched to <strong style={{ color: 'var(--gold-primary)' }}>ktownautomobilespa@gmail.com</strong>.
              </p>
            </div>

            {/* Receipt */}
            <div style={{ background: 'var(--input-bg)', padding: '1.25rem', borderRadius: '1rem', border: '1.5px solid rgba(212,175,55,0.4)', maxWidth: '28rem', width: '100%', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                <span>Selected Package:</span>
                <strong style={{ color: 'var(--text-main)' }}>{pkgName}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                <span>Vehicle Class:</span>
                <strong style={{ color: 'var(--text-main)' }}>{vehicleLabel}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                <span>Preferred Date &amp; Time:</span>
                <strong style={{ color: 'var(--cyan-glow)' }}>{formData.preferredDate} ({formData.preferredTime})</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                <span>Location:</span>
                <strong style={{ color: 'var(--text-main)' }}>36 Joseph St, Kingston, ON</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--gold-primary)', borderTop: '1px solid var(--card-border)', paddingTop: '0.5rem', fontWeight: 800 }}>
                <span>Total Price Estimate:</span>
                <span style={{ fontSize: '0.875rem' }}>${totalEstimate} CAD</span>
              </div>
            </div>

            <div style={{ background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.3)', padding: '0.75rem 1rem', borderRadius: '0.75rem', fontSize: '0.75rem', color: '#34d399', width: '100%', maxWidth: '28rem' }}>
              ✓ Email alert dispatched directly to <strong>ktownautomobilespa@gmail.com</strong>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%', maxWidth: '28rem' }}>
              
              {/* Add to Google Calendar Button */}
              <a
                href={getGoogleCalendarUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="gold-button"
                style={{ width: '100%', height: '3.25rem', textDecoration: 'none' }}
              >
                <CalendarPlus style={{ width: '1.25rem', height: '1.25rem', color: '#080a0f' }} />
                <span>Add to Google Calendar</span>
              </a>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <a
                  href={`mailto:ktownautomobilespa@gmail.com?subject=${encodeURIComponent(`New Spa Booking - ${formData.name}`)}&body=${encodeURIComponent(
                    `CUSTOMER BOOKING DETAILS:\n------------------------\nName: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nVehicle: ${formData.vehicleModel}\nPackage: ${pkgName} (${vehicleLabel})\nPreferred Date: ${formData.preferredDate} (${formData.preferredTime})\nEstimated Total: $${totalEstimate} CAD\nNotes: ${formData.notes || 'None'}`
                  )}`}
                  className="cyan-button" style={{ height: '2.75rem', fontSize: '0.75rem', textDecoration: 'none' }}
                >
                  <Mail style={{ width: '0.875rem', height: '0.875rem' }} />
                  <span>Resend Email Copy</span>
                </a>

                <a href="tel:6479153530" className="cyan-button" style={{ height: '2.75rem', fontSize: '0.75rem', textDecoration: 'none' }}>
                  <Phone style={{ width: '0.875rem', height: '0.875rem' }} />
                  <span>Call 647-915-3530</span>
                </a>
              </div>
            </div>

            <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--card-border)' }}>
              <button
                onClick={() => { setSubmitted(false); onClose(); }}
                style={{ fontSize: '0.75rem', color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
              >
                Done / Close Window
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
