import React from 'react';
import { Phone, Calendar, ArrowRight, MessageCircle } from 'lucide-react';

export default function Hero({ onOpenBooking }) {
  return (
    <section 
      id="hero"
      style={{
        position: 'relative',
        color: '#FFFFFF',
        padding: 'clamp(3rem, 6vw, 5rem) 0 clamp(3.5rem, 6vw, 5.5rem)',
        backgroundImage: `
          linear-gradient(96deg, rgba(10, 30, 66, 0.96) 0%, rgba(10, 30, 66, 0.88) 45%, rgba(18, 48, 95, 0.62) 100%),
          url('/hero-car.jpg')
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'center right',
        backgroundColor: 'var(--navy-deep)',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 1rem', position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: '48rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* Eyebrow */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{
              fontFamily: 'var(--mono)', fontSize: '0.8rem',
              letterSpacing: '0.14em', textTransform: 'uppercase',
              color: 'var(--gold-lt)', fontWeight: 800,
              background: 'rgba(201, 160, 60, 0.16)',
              border: '1px solid rgba(240, 213, 144, 0.35)',
              padding: '0.25rem 0.65rem', borderRadius: '4px',
            }}>
              Kingston · Amherstview · Loyalist
            </span>
          </div>

          {/* Main Headline */}
          <h1 style={{
            fontFamily: 'var(--display)', fontWeight: 800,
            fontSize: 'clamp(2.6rem, 6.5vw, 4.4rem)', lineHeight: 0.98,
            textTransform: 'uppercase', margin: 0,
            textShadow: '0 2px 20px rgba(0,0,0,0.5)',
          }}>
            Hand Car Wash, Detailing &amp; <span style={{ color: 'var(--gold-lt)' }}>Ceramic Coating</span>
          </h1>

          {/* Lede Subtitle */}
          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.18rem)',
            color: '#E4EDF7', maxWidth: '46ch', margin: 0,
            lineHeight: 1.6, textShadow: '0 1px 10px rgba(0,0,0,0.5)',
          }}>
            Hand car wash from $30, full detailing from $200, ceramic coating from $449. 
            Authorized System X &amp; Nano-Brite installer, Auto-Brite certified. 
            36 Joseph St, Kingston.
          </p>

          {/* Primary Action Buttons */}
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', paddingTop: '0.25rem' }}>
            <a href="tel:+16479153530" className="btn btn--gold">
              <Phone style={{ width: '1rem', height: '1rem' }} />
              <span>Call 647-915-3530</span>
            </a>

            <a href="#packages" className="btn btn--cream">
              <span>View Packages &amp; Rates</span>
              <ArrowRight style={{ width: '0.95rem', height: '0.95rem' }} />
            </a>

            <button onClick={onOpenBooking} className="btn btn--navy">
              <Calendar style={{ width: '1rem', height: '1rem' }} />
              <span>Book Appointment</span>
            </button>
          </div>

          {/* Signature CARFAX Highlight Box */}
          <div style={{
            display: 'flex', gap: '1rem', alignItems: 'center',
            background: 'rgba(255, 255, 255, 0.97)', color: 'var(--ink)',
            border: '1.5px solid var(--gold)', borderRadius: '10px',
            padding: '0.85rem 1.15rem', marginTop: '0.5rem',
            boxShadow: '0 8px 28px rgba(0,0,0,0.3)',
            flexWrap: 'wrap',
          }}>
            <div style={{ flexShrink: 0, width: '130px', background: '#111827', padding: '0.45rem 0.65rem', borderRadius: '6px', textAlign: 'center' }}>
              <span style={{ color: '#FFFFFF', fontWeight: 900, fontSize: '1.05rem', letterSpacing: '0.05em', display: 'block', lineHeight: 1 }}>CARFAX</span>
              <span style={{ color: '#60A5FA', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Canada</span>
            </div>
            <div style={{ flex: '1 1 280px' }}>
              <strong style={{ display: 'block', color: 'var(--navy-deep)', fontSize: '0.95rem', lineHeight: 1.35, marginBottom: '0.15rem' }}>
                Every System X coating we install is registered on your CARFAX Canada report.
              </strong>
              <span style={{ display: 'block', color: 'var(--slate)', fontSize: '0.86rem', lineHeight: 1.4 }}>
                Documented permanent service record on your vehicle history — verifiable resale proof.
              </span>
            </div>
          </div>

          {/* Quick WhatsApp Note */}
          <p style={{
            fontFamily: 'var(--mono)', fontSize: '0.84rem',
            color: '#C0D4EC', margin: 0,
            display: 'flex', alignItems: 'center', gap: '0.45rem',
          }}>
            <MessageCircle style={{ width: '1rem', height: '1rem', color: '#25D366' }} />
            <span>
              Prefer WhatsApp? Send us car photos on <a href="https://wa.me/16479153530" target="_blank" rel="noopener" style={{ color: '#25D366', fontWeight: 700, textDecoration: 'underline' }}>647-915-3530</a>.
            </span>
          </p>

        </div>
      </div>
    </section>
  );
}
