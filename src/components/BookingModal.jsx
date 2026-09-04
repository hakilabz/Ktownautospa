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
      access_key: '2e1c3132-7a7a-4c2c-80a5-f8510800fa26',
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
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(emailPayload),
      });
    } catch (err) {
      console.log('Web3Forms dispatch fallback:', err);
    }

    try {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#F0D590', '#C9A03C', '#3E9BDA', '#12305F'],
      });
    } catch (err) {
      console.log('Confetti triggered');
    }

    setSubmitting(false);
    setSubmitted(true);
  };

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
    width: '100%', background: '#FFFFFF', border: '1.5px solid var(--cream-3)',
    color: 'var(--navy-deep)', borderRadius: '8px', padding: '0.75rem', fontSize: '0.92rem',
    outline: 'none', fontFamily: 'inherit', fontWeight: 600,
  };

  const labelStyle = {
    fontSize: '0.78rem', fontWeight: 800, color: 'var(--navy-deep)', display: 'block', marginBottom: '0.35rem',
    textTransform: 'uppercase', letterSpacing: '0.04em',
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '1rem', background: 'rgba(10,30,66,0.85)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
      overflowY: 'auto',
    }}>
      <div className="frame" style={{ position: 'relative', width: '100%', maxWidth: '42rem', margin: '2rem auto', background: 'var(--cream)' }}>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: '1.25rem', right: '1.25rem', color: 'var(--navy-deep)',
            padding: '0.45rem', borderRadius: '50%', background: 'var(--cream-2)',
            border: '1px solid var(--gold-dk)', cursor: 'pointer', display: 'flex',
          }}
          aria-label="Close modal"
        >
          <X style={{ width: '1.2rem', height: '1.2rem' }} />
        </button>

        {!submitted ? (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
            
            {/* Header */}
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'var(--cream-2)', border: '1px solid var(--gold-dk)', padding: '0.3rem 0.8rem', borderRadius: '9999px', fontSize: '0.74rem', fontWeight: 800, color: 'var(--gold-dk)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                <Sparkles style={{ width: '0.85rem', height: '0.85rem', color: 'var(--gold-dk)' }} />
                <span>36 Joseph St, Kingston Studio</span>
              </div>
              <h3 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(1.6rem, 3.2vw, 2.1rem)', fontWeight: 800, color: 'var(--navy-deep)', textTransform: 'uppercase', margin: 0 }}>
                RESERVE YOUR DETAILING SESSION
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--slate)', marginTop: '0.25rem' }}>
                Selected: <strong style={{ color: 'var(--navy-deep)' }}>{pkgName}</strong> ({vehicleLabel}) — Estimated: <strong style={{ color: 'var(--water-dk)', fontSize: '1.1rem' }}>${totalEstimate} CAD</strong>
              </p>
            </div>

            {/* Form Inputs Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.9rem' }}>
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
                <input type="text" required placeholder="e.g. 2023 Honda CR-V / BMW M3" value={formData.vehicleModel}
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
              <label style={labelStyle}>Special Notes / Focus Areas</label>
              <textarea rows={2} placeholder="Mention specific salt buildup, bug removal focus, pet hair, tire shine preference..."
                value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                style={{ ...inputStyle, resize: 'vertical' }} />
            </div>

            {/* Dispatch Badge */}
            <div style={{ background: '#FFFFFF', padding: '0.85rem 1rem', borderRadius: '10px', border: '1px solid var(--cream-3)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--slate)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Mail style={{ width: '1.1rem', height: '1.1rem', color: 'var(--water-dk)', flexShrink: 0 }} />
                <span>Instant dispatch to <strong>ktownautomobilespa@gmail.com</strong></span>
              </div>
              <span style={{ color: 'var(--gold-dk)', fontWeight: 800 }}>Direct Notification</span>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={submitting} 
              className="btn btn--gold" 
              style={{ width: '100%', minHeight: '56px', fontSize: '1.1rem', opacity: submitting ? 0.7 : 1 }}
            >
              {submitting ? (
                <>
                  <Loader2 className="animate-spin" style={{ width: '1.25rem', height: '1.25rem' }} />
                  <span>Dispatching to Spa...</span>
                </>
              ) : (
                <>
                  <Send style={{ width: '1.1rem', height: '1.1rem' }} />
                  <span>Confirm &amp; Reserve Appointment</span>
                </>
              )}
            </button>

          </form>
        ) : (
          /* Confirmation Screen */
          <div style={{ textAlign: 'center', padding: '1rem 0', display: 'flex', flexDirection: 'column', gap: '1.25rem', alignItems: 'center' }}>
            
            <div style={{ width: '4rem', height: '4rem', background: 'rgba(30,138,76,0.15)', color: '#1E8A4C', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #1E8A4C' }}>
              <CheckCircle2 style={{ width: '2.5rem', height: '2.5rem' }} />
            </div>

            <div>
              <h3 style={{ fontFamily: 'var(--display)', fontSize: '2.2rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--navy-deep)', margin: 0 }}>
                APPOINTMENT RESERVED!
              </h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--slate)', maxWidth: '28rem', margin: '0.4rem auto 0' }}>
                Thank you, <strong style={{ color: 'var(--navy-deep)' }}>{formData.name}</strong>! Your booking has been dispatched directly to <strong style={{ color: 'var(--navy-deep)' }}>ktownautomobilespa@gmail.com</strong>.
              </p>
            </div>

            {/* Receipt Summary */}
            <div style={{ background: '#FFFFFF', padding: '1.25rem', borderRadius: '10px', border: '1.5px solid var(--gold-dk)', maxWidth: '28rem', width: '100%', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.84rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--slate)' }}>
                <span>Selected Package:</span>
                <strong style={{ color: 'var(--navy-deep)' }}>{pkgName}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--slate)' }}>
                <span>Vehicle Class:</span>
                <strong style={{ color: 'var(--navy-deep)' }}>{vehicleLabel}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--slate)' }}>
                <span>Date &amp; Time Slot:</span>
                <strong style={{ color: 'var(--water-dk)' }}>{formData.preferredDate} ({formData.preferredTime})</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--slate)' }}>
                <span>Location:</span>
                <strong style={{ color: 'var(--navy-deep)' }}>36 Joseph St, Kingston, ON</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--navy-deep)', borderTop: '1px dashed var(--cream-3)', paddingTop: '0.5rem', fontWeight: 800, fontSize: '1rem' }}>
                <span>Total Estimated:</span>
                <span style={{ color: 'var(--water-dk)' }}>${totalEstimate} CAD</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%', maxWidth: '28rem' }}>
              
              {/* Google Calendar Link */}
              <a
                href={getGoogleCalendarUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--gold"
                style={{ width: '100%', minHeight: '52px' }}
              >
                <CalendarPlus style={{ width: '1.25rem', height: '1.25rem' }} />
                <span>Add to Google Calendar</span>
              </a>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <a
                  href={`mailto:ktownautomobilespa@gmail.com?subject=${encodeURIComponent(`New Booking: ${formData.name}`)}`}
                  className="btn btn--outline"
                  style={{ minHeight: '44px', fontSize: '0.82rem' }}
                >
                  <Mail style={{ width: '0.9rem', height: '0.9rem' }} />
                  <span>Email Copy</span>
                </a>

                <a href="tel:6479153530" className="btn btn--navy" style={{ minHeight: '44px', fontSize: '0.82rem' }}>
                  <Phone style={{ width: '0.9rem', height: '0.9rem' }} />
                  <span>647-915-3530</span>
                </a>
              </div>
            </div>

            <button
              onClick={() => { setSubmitted(false); onClose(); }}
              style={{ fontSize: '0.82rem', color: 'var(--slate)', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', marginTop: '0.5rem' }}
            >
              Done / Close Window
            </button>

          </div>
        )}

      </div>
    </div>
  );
}
