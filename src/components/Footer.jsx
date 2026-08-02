import React from 'react';
import { Phone, Mail, MapPin, Clock, ShieldCheck, Sparkles, Heart } from 'lucide-react';

export default function Footer({ onOpenBooking }) {
  return (
    <footer id="contact" style={{ background: '#050608', borderTop: '1px solid rgba(234,179,8,0.2)', padding: '4rem 0 3rem', position: 'relative', overflow: 'hidden' }}>
      
      <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '800px', height: '300px', background: 'rgba(234,179,8,0.05)', filter: 'blur(160px)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1rem' }}>
        
        {/* Main Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2.5rem' }}>
          
          {/* Brand */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: '3rem', height: '3rem', borderRadius: '0.75rem', overflow: 'hidden', border: '1px solid rgba(234,179,8,0.4)', padding: '2px', background: 'linear-gradient(135deg, rgba(234,179,8,0.3), rgba(30,58,138,0.4))' }}>
                <img src="/logo.png" alt="Ktown Auto Spa Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>
              <div>
                <span className="gold-gradient-text" style={{ fontSize: '1.5rem', fontWeight: 900 }}>KTOWN AUTO SPA</span>
                <span style={{ display: 'block', fontSize: '0.625rem', letterSpacing: '0.2em', color: '#00D2FF', fontWeight: 600, textTransform: 'uppercase', marginTop: '-4px' }}>
                  Experience The Shine You Deserve
                </span>
              </div>
            </div>

            <p style={{ color: '#cbd5e1', fontSize: '0.875rem', lineHeight: 1.7, maxWidth: '28rem' }}>
              Kingston and area's premier hand wash &amp; auto detailing spa. 
              Specialists in paint correction, deep carpet steam cleaning, 
              <strong style={{ color: '#facc15' }}> Bug Removal ($5)</strong>, and 
              <strong style={{ color: '#00D2FF' }}> High-Gloss Tire Shine ($10)</strong>.
            </p>

            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(234,179,8,0.1)', border: '1px solid rgba(234,179,8,0.3)', padding: '0.375rem 0.875rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 700, color: '#fde047', alignSelf: 'flex-start' }}>
              <ShieldCheck style={{ width: '1rem', height: '1rem', color: '#facc15' }} />
              <span>No Pressure Washers Used • 100% Paint Safe Hand Wash</span>
            </div>
          </div>

          {/* Contact + Hours row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            
            {/* Direct Contact */}
            <div className="spa-card-gold" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h4 style={{ fontSize: '0.875rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#facc15', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Sparkles style={{ width: '1rem', height: '1rem', color: '#facc15' }} />
                <span>Direct Booking &amp; Inquiries</span>
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <a href="tel:6479153530" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'rgba(15,23,42,0.9)', padding: '0.75rem', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.06)', textDecoration: 'none', color: 'inherit', transition: 'border-color 0.2s' }}>
                  <div style={{ padding: '0.5rem', background: 'rgba(234,179,8,0.2)', color: '#facc15', borderRadius: '0.75rem' }}>
                    <Phone style={{ width: '1rem', height: '1rem' }} />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.625rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 600, display: 'block' }}>Phone For Bookings</span>
                    <span style={{ fontSize: '1rem', fontWeight: 800, color: 'white' }}>647-915-3530</span>
                  </div>
                </a>

                <a href="mailto:ktownautomobilespa@gmail.com" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'rgba(15,23,42,0.9)', padding: '0.75rem', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.06)', textDecoration: 'none', color: 'inherit' }}>
                  <div style={{ padding: '0.5rem', background: 'rgba(0,210,255,0.2)', color: '#00D2FF', borderRadius: '0.75rem' }}>
                    <Mail style={{ width: '1rem', height: '1rem' }} />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.625rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 600, display: 'block' }}>Email Contact</span>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#67e8f9', wordBreak: 'break-all' }}>ktownautomobilespa@gmail.com</span>
                  </div>
                </a>
              </div>

              <button onClick={onOpenBooking} className="gold-button" style={{ width: '100%' }}>
                Book Appointment Now
              </button>
            </div>

            {/* Hours */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h4 style={{ fontSize: '0.875rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'white' }}>Spa Hours &amp; Location</h4>
              
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.75rem', color: '#cbd5e1' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Clock style={{ width: '1rem', height: '1rem', color: '#facc15', flexShrink: 0 }} />
                  <span>Mon - Sun: 8:00 AM - 7:00 PM</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <MapPin style={{ width: '1rem', height: '1rem', color: '#00D2FF', flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: 'white', display: 'block' }}>36 Joseph St, Kingston, ON</strong>
                    <span style={{ fontSize: '0.6875rem', color: '#64748b' }}>In-Shop Spa &amp; Mobile Service</span>
                  </div>
                </li>
              </ul>

              <div style={{ paddingTop: '0.5rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.5rem' }}>Service Quick Links</span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', fontSize: '0.75rem', color: '#cbd5e1' }}>
                  <a href="#packages" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Medium Package</a>
                  <span>•</span>
                  <a href="#packages" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Full Detail</a>
                  <span>•</span>
                  <a href="#calculator" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Bug Removal ($5)</a>
                  <span>•</span>
                  <a href="#calculator" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Tire Shine ($10)</a>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div style={{ paddingTop: '2rem', marginTop: '2rem', borderTop: '1px solid rgba(15,23,42,1)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', fontSize: '0.75rem', color: '#475569' }}>
          <p>© {new Date().getFullYear()} Ktown Auto Spa. All Rights Reserved. "Experience The Shine You Deserve".</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <span>Crafted for luxury car enthusiasts with</span>
            <Heart style={{ width: '0.875rem', height: '0.875rem', color: '#ef4444', fill: '#ef4444' }} />
          </div>
        </div>

      </div>
    </footer>
  );
}
