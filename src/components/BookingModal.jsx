import React, { useState } from 'react';
import { X, Calendar, Clock, Phone, Mail, Car, CheckCircle2, Sparkles, Send } from 'lucide-react';
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

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
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
    setSubmitted(true);
  };

  const totalEstimate = quoteData ? quoteData.total : 100;
  const pkgName = quoteData ? quoteData.pkgName : 'Medium Package';
  const vehicleLabel = quoteData ? quoteData.vehicleLabel : 'Sedan';

  const inputStyle = {
    width: '100%', background: '#020617', border: '1px solid rgba(255,255,255,0.08)',
    color: 'white', borderRadius: '0.75rem', padding: '0.75rem', fontSize: '0.875rem',
    outline: 'none', fontFamily: 'inherit',
  };

  const labelStyle = {
    fontSize: '0.75rem', fontWeight: 600, color: '#cbd5e1', display: 'block', marginBottom: '0.375rem',
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '1rem', background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
      overflowY: 'auto',
    }}>
      <div className="spa-card-gold" style={{ position: 'relative', width: '100%', maxWidth: '42rem', margin: '2rem auto' }}>
        
        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: '1.25rem', right: '1.25rem', color: '#94a3b8',
            padding: '0.5rem', borderRadius: '50%', background: 'rgba(15,23,42,0.8)',
            border: '1px solid rgba(255,255,255,0.08)', cursor: 'pointer',
          }}
        >
          <X style={{ width: '1.25rem', height: '1.25rem' }} />
        </button>

        {!submitted ? (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Header */}
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(234,179,8,0.1)', border: '1px solid rgba(234,179,8,0.3)', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 700, color: '#fde047', marginBottom: '0.5rem' }}>
                <Sparkles style={{ width: '0.875rem', height: '0.875rem', color: '#facc15' }} />
                <span>Ktown Auto Spa Appointment</span>
              </div>
              <h3 className="gold-gradient-text" style={{ fontSize: 'clamp(1.5rem, 3vw, 1.875rem)', fontWeight: 900 }}>
                BOOK YOUR DETAILED SPA SESSION
              </h3>
              <p style={{ fontSize: '0.75rem', color: '#cbd5e1', marginTop: '0.25rem' }}>
                Selected: <strong style={{ color: '#facc15' }}>{pkgName}</strong> ({vehicleLabel}) — Estimated Total: <strong style={{ color: '#22d3ee' }}>${totalEstimate} CAD</strong>
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

            {/* Email Reminder */}
            <div style={{ background: '#020617', padding: '0.875rem', borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', color: '#64748b' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Mail style={{ width: '1rem', height: '1rem', color: '#22d3ee', flexShrink: 0 }} />
                <span>Confirmation sent to <strong>ktownautomobilespa@gmail.com</strong></span>
              </div>
              <span style={{ color: '#facc15', fontWeight: 600 }}>$0 Deposit</span>
            </div>

            {/* Submit */}
            <button type="submit" className="gold-button" style={{ width: '100%', height: '3.5rem' }}>
              <Send style={{ width: '1rem', height: '1rem', color: '#080a0f' }} />
              <span>Confirm &amp; Reserve Appointment</span>
            </button>

          </form>
        ) : (
          /* Confirmation State */
          <div style={{ textAlign: 'center', padding: '2rem 0', display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
            
            <div style={{ width: '4rem', height: '4rem', background: 'rgba(234,179,8,0.2)', color: '#facc15', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(234,179,8,0.4)' }}>
              <CheckCircle2 style={{ width: '2.5rem', height: '2.5rem' }} />
            </div>

            <div>
              <h3 className="gold-gradient-text" style={{ fontSize: '1.875rem', fontWeight: 900 }}>
                APPOINTMENT REQUESTED!
              </h3>
              <p style={{ fontSize: '0.875rem', color: '#cbd5e1', maxWidth: '28rem', margin: '0.5rem auto 0' }}>
                Thank you, <strong style={{ color: 'white' }}>{formData.name}</strong>! We have received your booking request for your <strong style={{ color: '#facc15' }}>{formData.vehicleModel}</strong>.
              </p>
            </div>

            {/* Receipt */}
            <div style={{ background: '#020617', padding: '1.25rem', borderRadius: '1rem', border: '1px solid rgba(234,179,8,0.3)', maxWidth: '28rem', width: '100%', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#cbd5e1' }}>
                <span>Selected Package:</span>
                <strong style={{ color: 'white' }}>{pkgName}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#cbd5e1' }}>
                <span>Vehicle Class:</span>
                <strong style={{ color: 'white' }}>{vehicleLabel}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#cbd5e1' }}>
                <span>Preferred Date &amp; Time:</span>
                <strong style={{ color: '#22d3ee' }}>{formData.preferredDate} ({formData.preferredTime})</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#facc15', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '0.5rem', fontWeight: 700 }}>
                <span>Total Price Estimate:</span>
                <span style={{ fontSize: '0.875rem' }}>${totalEstimate} CAD</span>
              </div>
            </div>

            <p style={{ fontSize: '0.75rem', color: '#64748b' }}>
              Our detailing specialist will call you shortly at <strong style={{ color: '#facc15' }}>{formData.phone}</strong> to confirm!
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.75rem', paddingTop: '0.5rem' }}>
              <a
                href={`mailto:ktownautomobilespa@gmail.com?subject=Booking Confirmation - ${formData.name}&body=Name: ${formData.name}%0D%0APhone: ${formData.phone}%0D%0AVehicle: ${formData.vehicleModel}%0D%0APackage: ${pkgName}%0D%0ADate: ${formData.preferredDate}%0D%0ATotal: $${totalEstimate}`}
                className="gold-button" style={{ textDecoration: 'none' }}
              >
                <Mail style={{ width: '1rem', height: '1rem', color: '#080a0f' }} />
                <span>Open Direct Email</span>
              </a>

              <a href="tel:6479153530" className="cyan-button" style={{ textDecoration: 'none' }}>
                <Phone style={{ width: '1rem', height: '1rem', color: '#00D2FF' }} />
                <span>Call 647-915-3530 Now</span>
              </a>
            </div>

            <div style={{ paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <button
                onClick={() => { setSubmitted(false); onClose(); }}
                style={{ fontSize: '0.75rem', color: '#64748b', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
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
