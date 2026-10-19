import React from 'react';
import { Phone, Calendar, ArrowRight, MessageCircle, ShieldCheck } from 'lucide-react';
import { useRouter } from '../context/RouterContext';

export default function Hero({ onOpenBooking }) {
  const { navigate } = useRouter();

  return (
    <section id="hero" className="hero-bg-section">
      {/* Full-Bleed Background Image Layer */}
      <div className="hero-bg-media" aria-hidden="true">
        <img
          src="/hero-car.jpg"
          alt=""
          className="hero-bg-img"
          width="1280"
          height="720"
          fetchPriority="high"
          decoding="async"
        />
        <div className="hero-bg-overlay" />
      </div>

      <div className="hero-content-wrap">
        <div className="hero-content-inner">
          
          {/* Eyebrow / Studio Status */}
          <div>
            <span className="hero-kicker-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#10B981', display: 'inline-block', boxShadow: '0 0 6px #10B981' }} />
              Heated Indoor Studio &middot; 36 Joseph St, Kingston
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="hero-main-title">
            Precision Hand Wash, Interior Detailing &amp;{' '}
            <span style={{ color: 'var(--gold-lt)' }}>Ceramic Coating</span>
          </h1>

          {/* Lede Subtitle */}
          <p className="hero-main-lede">
            Scratch-free hand washes from $30, complete detailing packages from $180, and certified System X ceramic coatings registered directly to your CARFAX Canada vehicle record.
          </p>

          {/* Primary Action Group */}
          <div className="hero-actions-row">
            <button type="button" onClick={onOpenBooking} className="btn btn--gold">
              <Calendar style={{ width: '1rem', height: '1rem', flexShrink: 0 }} />
              <span>Book Appointment</span>
            </button>

            <button 
              type="button" 
              onClick={() => navigate('/services')} 
              className="btn btn--cream"
            >
              <span>Explore Services &amp; Rates</span>
              <ArrowRight style={{ width: '0.95rem', height: '0.95rem', flexShrink: 0 }} />
            </button>
          </div>

          {/* Direct Contact Prompt */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap', fontSize: '0.86rem', color: '#C0D4EC' }}>
            <a 
              href="tel:+16479153530" 
              style={{ color: '#FFFFFF', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700 }}
            >
              <Phone style={{ width: '0.88rem', height: '0.88rem', color: 'var(--gold-lt)' }} />
              <span>647-915-3530</span>
            </a>
            <span style={{ color: 'rgba(255, 255, 255, 0.25)' }}>&middot;</span>
            <a
              href="https://wa.me/16479153530"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#34D399', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600 }}
            >
              <MessageCircle style={{ width: '0.88rem', height: '0.88rem' }} />
              <span>WhatsApp car photos for quick quote</span>
            </a>
          </div>

          {/* Integrated CARFAX Accreditation Strip */}
          <div 
            onClick={() => navigate('/ceramic-coating')}
            style={{ 
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              background: 'rgba(7, 21, 46, 0.72)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: '1px solid rgba(240, 213, 144, 0.3)',
              borderRadius: '8px',
              padding: '0.5rem 0.85rem',
              marginTop: '0.25rem',
              width: 'fit-content',
              maxWidth: '100%',
              transition: 'border-color 0.2s ease, background 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--gold)';
              e.currentTarget.style.background = 'rgba(7, 21, 46, 0.88)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(240, 213, 144, 0.3)';
              e.currentTarget.style.background = 'rgba(7, 21, 46, 0.72)';
            }}
            title="Click to learn about CARFAX Canada documented ceramic coatings"
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              <span style={{ background: '#0F172A', color: '#FFFFFF', fontSize: '0.72rem', fontWeight: 900, letterSpacing: '0.06em', padding: '0.2rem 0.45rem', borderRadius: '4px', border: '1px solid #3B82F6', lineHeight: 1 }}>
                CARFAX <span style={{ color: '#60A5FA' }}>Canada</span>
              </span>
              <span style={{ fontSize: '0.82rem', color: '#E2ECF7', fontWeight: 600 }}>
                Every System X coating logged to your VIN on CARFAX &middot; Resale proof
              </span>
            </div>
            <ArrowRight style={{ width: '0.85rem', height: '0.85rem', color: 'var(--gold-lt)', flexShrink: 0 }} />
          </div>

        </div>
      </div>
    </section>
  );
}
