import React from 'react';
import { Sparkles, ShieldCheck, CheckCircle2, ChevronRight, Phone, Mail, Droplets } from 'lucide-react';

export default function Hero({ onOpenBooking }) {
  return (
    <section 
      style={{ 
        position: 'relative', 
        minHeight: '85vh',
        paddingTop: '9rem', 
        paddingBottom: '5rem', 
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundImage: `
          linear-gradient(to right, var(--hero-overlay-1, #080a0f) 0%, var(--hero-overlay-2, rgba(8,10,15,0.92)) 40%, var(--hero-overlay-3, rgba(8,10,15,0.55)) 75%, var(--hero-overlay-1, rgba(8,10,15,0.8)) 100%),
          linear-gradient(to bottom, var(--hero-overlay-2, rgba(8,10,15,0.7)) 0%, transparent 40%, var(--bg-page, #080a0f) 100%),
          url('/hero-car.jpg')
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'center right',
        backgroundRepeat: 'no-repeat',
      }}
    >
      
      {/* Subtle Ambient Glow overlays */}
      <div style={{ position: 'absolute', top: '20%', left: '10%', width: '500px', height: '500px', background: 'rgba(234,179,8,0.08)', borderRadius: '50%', filter: 'blur(160px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '10%', width: '400px', height: '400px', background: 'rgba(0,210,255,0.08)', borderRadius: '50%', filter: 'blur(140px)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1rem', width: '100%', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '44rem', display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          
          {/* Top Badge */}
          <div>
            <div className="pulse-glow" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--card-bg)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid rgba(212,175,55,0.4)', padding: '0.5rem 1rem', borderRadius: '9999px' }}>
              <ShieldCheck style={{ width: '1rem', height: '1rem', color: 'var(--gold-primary)', flexShrink: 0 }} />
              <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--gold-primary)' }}>
                100% Hand Wash Only • No Pressure Washer Used
              </span>
            </div>
          </div>

          {/* Headline */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5.5vw, 4.25rem)', fontWeight: 900, letterSpacing: '-0.025em', lineHeight: 1.08, color: 'var(--text-main)' }}>
              EXPERIENCE THE <br />
              <span className="gold-gradient-text">SHINE YOU DESERVE</span>
            </h1>
            <p style={{ fontSize: 'clamp(0.9375rem, 1.6vw, 1.1875rem)', color: 'var(--text-muted)', fontWeight: 500, lineHeight: 1.7 }}>
              Kingston's premier hand wash auto spa located at <strong style={{ color: 'var(--text-main)', fontWeight: 800 }}>36 Joseph St</strong>. Deep interior steam cleaning, paint correction, 
              <strong style={{ color: 'var(--gold-primary)', fontWeight: 800 }}> Bug Removal ($5)</strong> &amp; 
              <strong style={{ color: 'var(--cyan-glow)', fontWeight: 800 }}> High-Gloss Tire Shine ($10)</strong>.
            </p>
          </div>

          {/* Feature Chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            {[
              { icon: 'var(--gold-primary)', text: 'Inside & Out Hand Clean' },
              { icon: 'var(--cyan-glow)', text: 'Steam Carpet Extraction' },
              { icon: 'var(--gold-primary)', text: 'Starting at $100' },
            ].map((chip, i) => (
              <div 
                key={i} 
                className="spa-card"
                style={{ 
                  padding: '0.625rem 1rem', 
                  borderRadius: '0.75rem', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                }}
              >
                <CheckCircle2 style={{ width: '1rem', height: '1rem', color: chip.icon, flexShrink: 0 }} />
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-main)' }}>{chip.text}</span>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', paddingTop: '0.5rem' }}>
            <button onClick={onOpenBooking} className="gold-button" style={{ height: '3.25rem', padding: '0 1.75rem', fontSize: '0.875rem' }}>
              <span>Book Your Spa Session</span>
              <ChevronRight style={{ width: '1.125rem', height: '1.125rem', color: '#080a0f' }} />
            </button>

            <a href="#calculator" className="cyan-button" style={{ height: '3.25rem', padding: '0 1.75rem', fontSize: '0.875rem', textDecoration: 'none' }}>
              <Sparkles style={{ width: '1.125rem', height: '1.125rem', color: 'var(--cyan-glow)' }} />
              <span>Instant Cost Estimator</span>
            </a>
          </div>

          {/* Contact Quick Bar */}
          <div style={{ 
            paddingTop: '1.5rem', 
            marginTop: '0.5rem',
            borderTop: '1px solid var(--card-border)', 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '1rem' 
          }}>
            <a 
              href="tel:6479153530" 
              className="spa-card"
              style={{ 
                padding: '0.875rem 1.25rem', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.75rem', 
                textDecoration: 'none', 
                color: 'inherit',
                borderRadius: '1rem',
                border: '1px solid rgba(212,175,55,0.4)',
              }}
            >
              <div style={{ padding: '0.5rem', background: 'rgba(212,175,55,0.2)', color: 'var(--gold-primary)', borderRadius: '0.75rem' }}>
                <Phone style={{ width: '1rem', height: '1rem' }} />
              </div>
              <div>
                <span style={{ fontSize: '0.625rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 800, display: 'block' }}>Direct Bookings</span>
                <span style={{ fontSize: '0.9375rem', fontWeight: 900, color: 'var(--gold-primary)' }}>647-915-3530</span>
              </div>
            </a>

            <a 
              href="mailto:ktownautomobilespa@gmail.com" 
              className="spa-card"
              style={{ 
                padding: '0.875rem 1.25rem', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.75rem', 
                textDecoration: 'none', 
                color: 'inherit',
                borderRadius: '1rem',
                border: '1px solid rgba(0,210,255,0.4)',
              }}
            >
              <div style={{ padding: '0.5rem', background: 'rgba(0,210,255,0.2)', color: 'var(--cyan-glow)', borderRadius: '0.75rem' }}>
                <Mail style={{ width: '1rem', height: '1rem' }} />
              </div>
              <div>
                <span style={{ fontSize: '0.625rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 800, display: 'block' }}>Email Contact</span>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--cyan-glow)', overflow: 'hidden', textOverflow: 'ellipsis', display: 'block' }}>ktownautomobilespa@gmail.com</span>
              </div>
            </a>
          </div>

        </div>
      </div>

      {/* Floating Bottom Photo Banner Tag */}
      <div style={{
        position: 'absolute',
        bottom: '1.25rem',
        right: '2rem',
        background: 'var(--card-bg)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        padding: '0.5rem 1rem',
        borderRadius: '9999px',
        border: '1px solid rgba(212,175,55,0.4)',
        display: 'none',
        alignItems: 'center',
        gap: '0.5rem',
        fontSize: '0.6875rem',
        fontWeight: 700,
        color: 'var(--gold-primary)',
        zIndex: 10,
      }} className="photo-banner-tag">
        <Droplets style={{ width: '0.875rem', height: '0.875rem', color: 'var(--gold-primary)' }} />
        <span>Ktown Auto Spa • Premium Supercar Detailing</span>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .photo-banner-tag { display: flex !important; }
        }
      `}</style>
    </section>
  );
}
