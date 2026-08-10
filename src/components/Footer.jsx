import React from 'react';
import { Phone, Mail, MapPin, Clock, ShieldCheck, Sparkles, Heart, HeartHandshake } from 'lucide-react';

export default function Footer({ onOpenBooking }) {
  return (
    <footer id="contact" style={{ background: 'var(--bg-page)', borderTop: '1px solid var(--card-border)', padding: '4rem 0 3rem', position: 'relative', overflow: 'hidden' }}>
      
      <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '800px', height: '300px', background: 'rgba(212,175,55,0.05)', filter: 'blur(160px)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1rem' }}>
        
        {/* Main Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2.5rem' }}>
          
          {/* Brand */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <img src="/logo.png" alt="Ktown Auto Spa Logo" style={{ height: '3rem', width: 'auto', objectFit: 'contain' }} />
            </div>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.7, maxWidth: '32rem' }}>
              Kingston &amp; area’s conscientious automotive appearance studio. 
              Specialists in unhurried hand wash detailing, paint correction, ceramic clear protection, 
              <strong style={{ color: 'var(--gold-primary)', fontWeight: 800 }}> Bug Removal ($5)</strong>, and 
              <strong style={{ color: 'var(--cyan-glow)', fontWeight: 800 }}> High-Gloss Tire Shine ($10)</strong>.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--card-bg)', border: '1.5px solid var(--card-gold-border)', padding: '0.375rem 0.875rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 800, color: 'var(--gold-primary)' }}>
                <ShieldCheck style={{ width: '0.875rem', height: '0.875rem', color: 'var(--gold-primary)' }} />
                <span>Fully Insured &amp; Certified</span>
              </div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--card-bg)', border: '1.5px solid var(--card-border)', padding: '0.375rem 0.875rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-main)' }}>
                <HeartHandshake style={{ width: '0.875rem', height: '0.875rem', color: 'var(--cyan-glow)' }} />
                <span>Support Local Kingston</span>
              </div>
            </div>
          </div>

          {/* Contact + Hours row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            
            {/* Direct Contact */}
            <div className="spa-card-gold" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h4 style={{ fontSize: '0.875rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--gold-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Sparkles style={{ width: '1rem', height: '1rem', color: 'var(--gold-primary)' }} />
                <span>Direct Booking &amp; Inquiries</span>
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <a href="tel:6479153530" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'var(--card-bg)', padding: '0.75rem', borderRadius: '1rem', border: '1px solid var(--card-border)', textDecoration: 'none', color: 'inherit' }}>
                  <div style={{ padding: '0.5rem', background: 'rgba(212,175,55,0.18)', color: 'var(--gold-primary)', borderRadius: '0.75rem' }}>
                    <Phone style={{ width: '1rem', height: '1rem' }} />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.625rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, display: 'block' }}>Phone For Bookings</span>
                    <span style={{ fontSize: '1rem', fontWeight: 900, color: 'var(--text-main)' }}>647-915-3530</span>
                  </div>
                </a>

                <a href="mailto:ktownautomobilespa@gmail.com" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'var(--card-bg)', padding: '0.75rem', borderRadius: '1rem', border: '1px solid var(--card-border)', textDecoration: 'none', color: 'inherit' }}>
                  <div style={{ padding: '0.5rem', background: 'rgba(0,210,255,0.18)', color: 'var(--cyan-glow)', borderRadius: '0.75rem' }}>
                    <Mail style={{ width: '1rem', height: '1rem' }} />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.625rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, display: 'block' }}>Email Contact</span>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--cyan-glow)', wordBreak: 'break-all' }}>ktownautomobilespa@gmail.com</span>
                  </div>
                </a>
              </div>

              <button onClick={onOpenBooking} className="gold-button" style={{ width: '100%' }}>
                Book Appointment Now
              </button>
            </div>

            {/* Hours & Regions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h4 style={{ fontSize: '0.875rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-main)' }}>Spa Hours &amp; Location</h4>
              
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Clock style={{ width: '1rem', height: '1rem', color: 'var(--gold-primary)', flexShrink: 0 }} />
                  <span>Mon - Sun: 8:00 AM - 7:00 PM</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <MapPin style={{ width: '1rem', height: '1rem', color: 'var(--cyan-glow)', flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: 'var(--text-main)', display: 'block', fontWeight: 800 }}>36 Joseph St, Kingston, ON</strong>
                    <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>In-Shop Spa Studio &amp; Mobile Service</span>
                  </div>
                </li>
              </ul>

              <div style={{ paddingTop: '0.5rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-main)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.375rem' }}>Communities Served</span>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  Kingston • Amherstview • Bath • Odessa • Napanee • Loyalist Township
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div style={{ paddingTop: '2rem', marginTop: '2rem', borderTop: '1px solid var(--card-border)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
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
