import React from 'react';
import { Phone, Calendar, ArrowRight, MessageCircle, ShieldCheck, Sparkles, MapPin } from 'lucide-react';

export default function Hero({ onOpenBooking }) {
  return (
    <section id="hero" className="hero-section">
      {/* Subtle Ambient Studio Backdrop */}
      <div className="hero-ambient-bg" aria-hidden="true" />

      <div className="hero-container">
        <div className="hero-layout">
          
          {/* Left Column: Headline, Value Proposition, CTAs & CARFAX */}
          <div className="hero-copy-col">
            {/* Eyebrow */}
            <div className="hero-eyebrow-row">
              <span className="hero-eyebrow-pill">
                <Sparkles style={{ width: '0.8rem', height: '0.8rem', flexShrink: 0 }} />
                <span>Kingston &middot; Amherstview &middot; Loyalist</span>
              </span>
              <span className="hero-eyebrow-sub">
                Heated Indoor Studio &middot; Open Saturdays
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="hero-headline">
              Hand Car Wash, Detailing &amp;{' '}
              <span className="hero-headline-accent">Ceramic Coating</span>
            </h1>

            {/* Lede Subtitle */}
            <p className="hero-lede">
              Hand car wash from <strong>$30</strong>, full detailing from <strong>$200</strong>, ceramic coating from <strong>$449</strong>.
              Authorized System X &amp; Nano-Brite installer, Auto-Brite certified.
              36 Joseph St, Kingston.
            </p>

            {/* Primary Action Buttons */}
            <div className="hero-cta-group">
              <a href="tel:+16479153530" className="btn btn--gold hero-btn">
                <Phone style={{ width: '1rem', height: '1rem', flexShrink: 0 }} />
                <span>Call 647-915-3530</span>
              </a>

              <a href="#packages" className="btn btn--cream hero-btn">
                <span>View Packages &amp; Rates</span>
                <ArrowRight style={{ width: '0.95rem', height: '0.95rem', flexShrink: 0 }} />
              </a>

              <button type="button" onClick={onOpenBooking} className="btn btn--navy hero-btn">
                <Calendar style={{ width: '1rem', height: '1rem', flexShrink: 0 }} />
                <span>Book Appointment</span>
              </button>
            </div>

            {/* Signature CARFAX Highlight Box */}
            <div className="hero-carfax-card">
              <div className="hero-carfax-badge">
                <span className="hero-carfax-logo">CARFAX</span>
                <span className="hero-carfax-country">Canada</span>
              </div>
              <div className="hero-carfax-copy">
                <strong>
                  Every System X coating we install is registered on your CARFAX Canada report.
                </strong>
                <span>
                  Documented permanent service record on your vehicle history — verifiable resale proof.
                </span>
              </div>
            </div>

            {/* Quick WhatsApp Note */}
            <p className="hero-wa-note">
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

          {/* Right / Mobile-Top Column: Responsive Full-Vehicle Showcase Image */}
          <div className="hero-visual-col">
            <div className="hero-image-card">
              <picture>
                <img
                  src="/hero-car.jpg"
                  alt="Luxury gold sports car receiving a foam hand wash and ceramic coating preparation inside Ktown Auto Spa's heated Kingston studio bay"
                  className="hero-showcase-img"
                  width="1280"
                  height="720"
                  fetchPriority="high"
                  decoding="async"
                />
              </picture>

              {/* Top-left floating credential pill */}
              <div className="hero-img-badge-top">
                <ShieldCheck style={{ width: '0.9rem', height: '0.9rem', color: '#F0D590', flexShrink: 0 }} />
                <span>System X &amp; Nano-Brite Accredited</span>
              </div>

              {/* Bottom gradient bar with studio info */}
              <div className="hero-img-caption-bar">
                <div className="hero-img-caption-item">
                  <MapPin style={{ width: '0.85rem', height: '0.85rem', color: '#F0D590', flexShrink: 0 }} />
                  <span>36 Joseph St, Kingston &middot; Heated Indoor Bays</span>
                </div>
                <span className="hero-img-rate-pill">Wash from $30 &middot; Detail from $200</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
