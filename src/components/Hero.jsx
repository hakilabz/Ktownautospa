import React from 'react';
import { Phone, Calendar, ArrowRight, ShieldCheck, Sparkles, MessageCircle } from 'lucide-react';

export default function Hero({ onOpenBooking }) {
  return (
    <section 
      id="hero"
      style={{
        position: 'relative',
        color: '#FFFFFF',
        padding: 'clamp(3.5rem, 8vw, 6.5rem) 0 clamp(5.5rem, 9vw, 7.5rem)',
        backgroundImage: `
          linear-gradient(96deg, rgba(10, 30, 66, 0.96) 0%, rgba(10, 30, 66, 0.88) 45%, rgba(18, 48, 95, 0.6) 100%),
          url('/hero-car.jpg')
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'center right',
        backgroundColor: 'var(--navy-deep)',
        overflow: 'hidden',
      }}
    >
      {/* Decorative Floating Bubbles SVG */}
      <svg 
        viewBox="0 0 1200 600" 
        preserveAspectRatio="xMaxYMid slice" 
        style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', opacity: 0.45 }}
        aria-hidden="true"
      >
        <g fill="none" stroke="#7FC4EE" strokeWidth="2">
          <circle cx="980" cy="120" r="26" />
          <circle cx="1060" cy="200" r="15" />
          <circle cx="900" cy="230" r="11" />
          <circle cx="1120" cy="110" r="19" />
          <circle cx="1010" cy="330" r="22" />
          <circle cx="1140" cy="300" r="12" />
          <circle cx="860" cy="90" r="9" />
          <circle cx="1085" cy="420" r="17" />
        </g>
        <g fill="#8FCEF2" opacity="0.3">
          <circle cx="980" cy="120" r="26" />
          <circle cx="1010" cy="330" r="22" />
          <circle cx="1120" cy="110" r="19" />
        </g>
      </svg>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem', position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: '47rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* Eyebrow */}
          <p style={{
            fontFamily: 'var(--mono)', fontSize: '0.85rem',
            letterSpacing: '0.16em', textTransform: 'uppercase',
            color: 'var(--gold-lt)', margin: 0, fontWeight: 700,
          }}>
            Kingston · Amherstview · Loyalist Township
          </p>

          {/* Main Headline */}
          <h1 style={{
            fontFamily: 'var(--display)', fontWeight: 800,
            fontSize: 'clamp(2.9rem, 7.5vw, 4.8rem)', lineHeight: 0.95,
            textTransform: 'uppercase', margin: 0,
            textShadow: '0 2px 22px rgba(0,0,0,0.6)',
          }}>
            Experience the <span style={{ color: 'var(--gold-lt)' }}>shine</span> you deserve
          </h1>

          {/* Lede Subtitle */}
          <p style={{
            fontSize: 'clamp(1.05rem, 2.2vw, 1.25rem)',
            color: '#E4EDF7', maxWidth: '46ch', margin: 0,
            lineHeight: 1.6, textShadow: '0 1px 12px rgba(0,0,0,0.5)',
          }}>
            Hand car wash from $30, full detailing from $200, ceramic coating from $449. 
            Authorized System X and Nano-Brite ceramic coating installer, Auto-Brite certified. 
            36 Joseph St, Kingston.
          </p>

          {/* Primary Action Buttons */}
          <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap', paddingTop: '0.5rem' }}>
            <a href="tel:+16479153530" className="btn btn--gold">
              <Phone style={{ width: '1.1rem', height: '1.1rem' }} />
              <span>Call 647-915-3530</span>
            </a>

            <a href="#packages" className="btn btn--cream">
              <span>See Packages &amp; Prices</span>
              <ArrowRight style={{ width: '1rem', height: '1rem' }} />
            </a>

            <button onClick={onOpenBooking} className="btn btn--navy">
              <Calendar style={{ width: '1.1rem', height: '1.1rem' }} />
              <span>Book Appointment</span>
            </button>
          </div>

          {/* Signature CARFAX Highlight Box */}
          <div style={{
            display: 'flex', gap: '1.2rem', alignItems: 'center',
            background: 'rgba(255, 255, 255, 0.96)', color: 'var(--ink)',
            border: '2px solid var(--gold)', borderRadius: '12px',
            padding: '1rem 1.25rem', marginTop: '0.75rem',
            boxShadow: '0 12px 34px rgba(0,0,0,0.35)',
          }} className="carfax-card">
            <div style={{ flexShrink: 0, width: '140px', background: '#111827', padding: '0.5rem 0.75rem', borderRadius: '8px', textAlign: 'center' }}>
              <span style={{ color: '#FFFFFF', fontWeight: 900, fontSize: '1.15rem', letterSpacing: '0.05em', display: 'block' }}>CARFAX</span>
              <span style={{ color: '#60A5FA', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Canada</span>
            </div>
            <div>
              <strong style={{ display: 'block', color: 'var(--navy-deep)', fontSize: '1.02rem', lineHeight: 1.35, marginBottom: '0.2rem' }}>
                Every System X coating we install is registered on your CARFAX Canada report.
              </strong>
              <span style={{ display: 'block', color: 'var(--slate)', fontSize: '0.92rem', lineHeight: 1.45 }}>
                It shows up as a documented service record on your vehicle history — proof for the next buyer that the coating is genuine.
              </span>
            </div>
          </div>

          {/* Quick WhatsApp Note */}
          <p style={{
            fontFamily: 'var(--mono)', fontSize: '0.88rem',
            color: '#B9CCE4', margin: '0.5rem 0 0 0',
            display: 'flex', alignItems: 'center', gap: '0.5rem',
          }}>
            <MessageCircle style={{ width: '1.15rem', height: '1.15rem', color: '#25D366' }} />
            <span>
              Prefer WhatsApp? Send us a photo of your car on <a href="https://wa.me/16479153530" target="_blank" rel="noopener" style={{ color: '#25D366', fontWeight: 700, textDecoration: 'underline' }}>647-915-3530</a>.
            </span>
          </p>

        </div>
      </div>

      {/* Decorative Wave Transition connecting to next section */}
      <svg 
        viewBox="0 0 1440 110" 
        preserveAspectRatio="none" 
        style={{
          position: 'absolute', left: 0, right: 0, bottom: '-1px',
          zIndex: 3, width: '100%', height: 'auto', display: 'block', pointerEvents: 'none',
        }} 
        aria-hidden="true"
      >
        <path d="M0,60 C180,110 320,10 520,45 C700,76 820,120 1000,72 C1160,30 1300,58 1440,40 L1440,110 L0,110 Z" fill="#D6ECFA" opacity="0.5" />
        <path d="M0,78 C200,116 340,40 540,66 C740,92 860,124 1040,90 C1200,60 1320,80 1440,66 L1440,110 L0,110 Z" fill="var(--bg-page)" />
      </svg>
    </section>
  );
}
