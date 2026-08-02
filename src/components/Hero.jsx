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
          linear-gradient(to right, #080a0f 0%, rgba(8,10,15,0.92) 40%, rgba(8,10,15,0.55) 75%, rgba(8,10,15,0.8) 100%),
          linear-gradient(to bottom, rgba(8,10,15,0.7) 0%, transparent 40%, var(--bg-page) 100%),
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
            <div className="pulse-glow" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(8,10,15,0.85)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid rgba(234,179,8,0.4)', padding: '0.5rem 1rem', borderRadius: '9999px' }}>
              <ShieldCheck style={{ width: '1rem', height: '1rem', color: '#facc15', flexShrink: 0 }} />
              <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#fde047' }}>
                100% Hand Wash Only • No Pressure Washer Used
              </span>
            </div>
          </div>

          {/* Headline */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5.5vw, 4.25rem)', fontWeight: 900, letterSpacing: '-0.025em', lineHeight: 1.08, color: '#ffffff', textShadow: '0 4px 20px rgba(0,0,0,0.8)' }}>
              EXPERIENCE THE <br />
              <span className="gold-gradient-text">SHINE YOU DESERVE</span>
            </h1>
            <p style={{ fontSize: 'clamp(0.9375rem, 1.6vw, 1.1875rem)', color: '#e2e8f0', fontWeight: 400, lineHeight: 1.7, textShadow: '0 2px 10px rgba(0,0,0,0.9)' }}>
              Kingston's premier hand wash auto spa located at <strong style={{ color: '#ffffff', fontWeight: 700 }}>36 Joseph St</strong>. Deep interior steam cleaning, paint correction, 
              <strong style={{ color: '#facc15', fontWeight: 700 }}> Bug Removal ($5)</strong> &amp; 
              <strong style={{ color: '#00D2FF', fontWeight: 700 }}> High-Gloss Tire Shine ($10)</strong>.
            </p>
          </div>

          {/* Feature Chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            {[
              { icon: '#facc15', text: 'Inside & Out Hand Clean' },
              { icon: '#00D2FF', text: 'Steam Carpet Extraction' },
              { icon: '#facc15', text: 'Starting at $100' },
            ].map((chip, i) => (
              <div 
                key={i} 
                style={{ 
                  padding: '0.625rem 1rem', 
                  borderRadius: '0.75rem', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem',
                  background: 'rgba(8,10,15,0.85)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.12)',
                }}
              >
                <CheckCircle2 style={{ width: '1rem', height: '1rem', color: chip.icon, flexShrink: 0 }} />
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#f8fafc' }}>{chip.text}</span>
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
              <Sparkles style={{ width: '1.125rem', height: '1.125rem', color: '#00D2FF' }} />
              <span>Instant Cost Estimator</span>
            </a>
          </div>

          {/* Contact Quick Bar */}
          <div style={{ 
            paddingTop: '1.5rem', 
            marginTop: '0.5rem',
            borderTop: '1px solid rgba(255,255,255,0.12)', 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '1rem' 
          }}>
            <a 
              href="tel:6479153530" 
              style={{ 
                padding: '0.875rem 1.25rem', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.75rem', 
                textDecoration: 'none', 
                color: 'inherit',
                background: 'rgba(8,10,15,0.85)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                borderRadius: '1rem',
                border: '1px solid rgba(234,179,8,0.3)',
              }}
            >
              <div style={{ padding: '0.5rem', background: 'rgba(234,179,8,0.2)', color: '#facc15', borderRadius: '0.75rem' }}>
                <Phone style={{ width: '1rem', height: '1rem' }} />
              </div>
              <div>
                <span style={{ fontSize: '0.625rem', textTransform: 'uppercase', color: '#94a3b8', fontWeight: 800, display: 'block' }}>Direct Bookings</span>
                <span style={{ fontSize: '0.9375rem', fontWeight: 900, color: '#facc15' }}>647-915-3530</span>
              </div>
            </a>

            <a 
              href="mailto:ktownautomobilespa@gmail.com" 
              style={{ 
                padding: '0.875rem 1.25rem', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.75rem', 
                textDecoration: 'none', 
                color: 'inherit',
                background: 'rgba(8,10,15,0.85)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                borderRadius: '1rem',
                border: '1px solid rgba(0,210,255,0.3)',
              }}
            >
              <div style={{ padding: '0.5rem', background: 'rgba(0,210,255,0.2)', color: '#00D2FF', borderRadius: '0.75rem' }}>
                <Mail style={{ width: '1rem', height: '1rem' }} />
              </div>
              <div>
                <span style={{ fontSize: '0.625rem', textTransform: 'uppercase', color: '#94a3b8', fontWeight: 800, display: 'block' }}>Email Contact</span>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#67e8f9', overflow: 'hidden', textOverflow: 'ellipsis', display: 'block' }}>ktownautomobilespa@gmail.com</span>
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
        background: 'rgba(8,10,15,0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        padding: '0.5rem 1rem',
        borderRadius: '9999px',
        border: '1px solid rgba(234,179,8,0.3)',
        display: 'none',
        alignItems: 'center',
        gap: '0.5rem',
        fontSize: '0.6875rem',
        fontWeight: 700,
        color: '#fde047',
        zIndex: 10,
      }} className="photo-banner-tag">
        <Droplets style={{ width: '0.875rem', height: '0.875rem', color: '#facc15' }} />
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
