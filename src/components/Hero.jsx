import React from 'react';
import { Phone, Calendar, ArrowRight, MessageCircle } from 'lucide-react';
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
          
          {/* Eyebrow */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            <span className="hero-kicker-badge">
              Kingston &middot; Amherstview &middot; Loyalist
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="hero-main-title">
            Hand Car Wash, Detailing &amp;{' '}
            <span style={{ color: 'var(--gold-lt)' }}>Ceramic Coating</span>
          </h1>

          {/* Lede Subtitle */}
          <p className="hero-main-lede">
            Scratch-free hand wash from $30, complete detailing from $180, authorized System X ceramic coating from $449. Heated indoor studio at 36 Joseph St, Kingston.
          </p>

          {/* Primary Action Buttons */}
          <div className="hero-actions-row">
            <a href="tel:+16479153530" className="btn btn--gold">
              <Phone style={{ width: '1rem', height: '1rem', flexShrink: 0 }} />
              <span>Call 647-915-3530</span>
            </a>

            <button 
              type="button" 
              onClick={() => navigate('/services')} 
              className="btn btn--cream"
            >
              <span>View Packages &amp; Rates</span>
              <ArrowRight style={{ width: '0.95rem', height: '0.95rem', flexShrink: 0 }} />
            </button>

            <button type="button" onClick={onOpenBooking} className="btn btn--navy">
              <Calendar style={{ width: '1rem', height: '1rem', flexShrink: 0 }} />
              <span>Book Appointment</span>
            </button>
          </div>

          {/* Signature CARFAX Highlight Box */}
          <div 
            className="hero-carfax-box"
            onClick={() => navigate('/ceramic-coating')}
            style={{ cursor: 'pointer' }}
            title="Click to learn about our CARFAX Canada registered coatings"
          >
            <div className="hero-carfax-logo-tile">
              <span style={{ color: '#FFFFFF', fontWeight: 900, fontSize: '1.05rem', letterSpacing: '0.05em', display: 'block', lineHeight: 1 }}>
                CARFAX
              </span>
              <span style={{ color: '#60A5FA', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                Canada
              </span>
            </div>
            <div style={{ flex: '1 1 240px', minWidth: 0 }}>
              <strong style={{ display: 'block', color: 'var(--navy-deep)', fontSize: '0.95rem', lineHeight: 1.35, marginBottom: '0.15rem' }}>
                Every System X coating we install is registered on your CARFAX Canada report.
              </strong>
              <span style={{ display: 'block', color: 'var(--slate)', fontSize: '0.86rem', lineHeight: 1.4 }}>
                Documented permanent service record on your vehicle history — verifiable resale proof.
              </span>
            </div>
          </div>

          {/* Quick WhatsApp Note */}
          <p className="hero-whatsapp-line">
            <MessageCircle style={{ width: '1rem', height: '1rem', color: '#25D366', flexShrink: 0 }} />
            <span>
              Prefer WhatsApp? Send us car photos on{' '}
              <a
                href="https://wa.me/16479153530"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#25D366', fontWeight: 700, textDecoration: 'underline' }}
              >
                647-915-3530
              </a>
              .
            </span>
          </p>

        </div>
      </div>
    </section>
  );
}
