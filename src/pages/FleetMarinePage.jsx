import React, { useEffect } from 'react';
import { ArrowLeft, Building2, Anchor, Calendar, Phone } from 'lucide-react';
import FleetsSection from '../components/FleetsSection';
import BoatsSection from '../components/BoatsSection';
import { useRouter } from '../context/RouterContext';

export default function FleetMarinePage({ onOpenBooking }) {
  const { navigate } = useRouter();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="fleet-marine-page" style={{ paddingTop: '5.5rem', minHeight: '100vh' }}>
      
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
                <span className="hero-kicker-badge" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34D399', borderColor: '#10B981' }}>
                  Commercial Accounts &middot; Kingston Marinas
                </span>
              </div>
              <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 900, color: 'var(--heading-color)', margin: '0 0 0.5rem' }}>
                Commercial Fleet &amp; Marine Detailing
              </h1>
              <p style={{ maxWidth: '780px', color: 'var(--muted-color)', fontSize: '1.05rem', margin: 0, lineHeight: 1.55 }}>
                Volume fleet wash programs with Net-15/Net-30 invoicing for Kingston businesses, ministries, and dealerships, plus mobile dockside boat washing and gelcoat compounding at Eastern Ontario marinas.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <a href="tel:+16479153530" className="btn btn--cream" style={{ minHeight: '42px', fontSize: '0.88rem' }}>
                <Phone style={{ width: '0.9rem', height: '0.9rem' }} />
                <span>647-915-3530</span>
              </a>
              <button onClick={onOpenBooking} className="btn btn--gold" style={{ minHeight: '42px', fontSize: '0.88rem' }}>
                <Calendar style={{ width: '0.9rem', height: '0.9rem' }} />
                <span>Inquire About Accounts</span>
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Main Sections */}
      <main>
        {/* Fleet & Commercial Detailing */}
        <FleetsSection onOpenBooking={onOpenBooking} />

        {/* Marine & Boat Detailing */}
        <BoatsSection />
      </main>

    </div>
  );
}
