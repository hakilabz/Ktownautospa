import React, { useEffect } from 'react';
import { ArrowLeft, Sparkles, ShieldCheck, CheckCircle2, Phone, Calendar } from 'lucide-react';
import QuoteBuilder from '../components/QuoteBuilder';
import { useRouter } from '../context/RouterContext';

export default function ServicesPage({ onOpenBooking }) {
  const { navigate } = useRouter();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="services-page" style={{ paddingTop: '5.5rem', minHeight: '100vh' }}>
      
      {/* Page Hero Banner */}
      <section style={{ background: 'var(--surface-card)', borderBottom: '1px solid var(--surface-border)', padding: '2.5rem 1rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          <button
            type="button"
            onClick={() => navigate('/')}
            className="btn btn--cream"
            style={{ marginBottom: '1.25rem', fontSize: '0.82rem', padding: '0.35rem 0.75rem' }}
          >
            <ArrowLeft style={{ width: '0.85rem', height: '0.85rem' }} />
            <span>Back to Home</span>
          </button>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span className="hero-kicker-badge" style={{ background: 'rgba(201, 160, 60, 0.15)', color: 'var(--gold-primary)' }}>
                  Interactive Pricing &middot; 2026 Official Rate Card
                </span>
              </div>
              <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 900, color: 'var(--heading-color)', margin: '0 0 0.5rem' }}>
                Services &amp; Instant Quote Builder
              </h1>
              <p style={{ maxWidth: '750px', color: 'var(--muted-color)', fontSize: '1.05rem', margin: 0, lineHeight: 1.55 }}>
                Select your vehicle size once at the top to customize any wash, complete detail, or ceramic coating. Our smart calculator automatically removes redundant charges when packages include add-on services.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <a href="tel:+16479153530" className="btn btn--cream" style={{ minHeight: '42px', fontSize: '0.88rem' }}>
                <Phone style={{ width: '0.9rem', height: '0.9rem' }} />
                <span>647-915-3530</span>
              </a>
              <button onClick={onOpenBooking} className="btn btn--gold" style={{ minHeight: '42px', fontSize: '0.88rem' }}>
                <Calendar style={{ width: '0.9rem', height: '0.9rem' }} />
                <span>Fast Booking</span>
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Main Quote Builder Component */}
      <main style={{ padding: '1rem 0 4rem' }}>
        <QuoteBuilder onProceedToBooking={onOpenBooking} />
      </main>

    </div>
  );
}
