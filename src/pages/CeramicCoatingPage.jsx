import React, { useEffect } from 'react';
import { ArrowLeft, ShieldCheck, Award, Calendar, Phone } from 'lucide-react';
import CoatingSection from '../components/CoatingSection';
import ProcessFlow from '../components/ProcessFlow';
import CarfaxRecord from '../components/CarfaxRecord';
import { useRouter } from '../context/RouterContext';

export default function CeramicCoatingPage({ onOpenBooking }) {
  const { navigate } = useRouter();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="coating-page" style={{ paddingTop: '5.5rem', minHeight: '100vh' }}>
      
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
                <span className="hero-kicker-badge" style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#60A5FA', borderColor: '#3B82F6' }}>
                  Authorized System X &middot; CARFAX Canada Partner
                </span>
              </div>
              <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 900, color: 'var(--heading-color)', margin: '0 0 0.5rem' }}>
                Ceramic Coating &amp; Paint Correction
              </h1>
              <p style={{ maxWidth: '780px', color: 'var(--muted-color)', fontSize: '1.05rem', margin: 0, lineHeight: 1.55 }}>
                Permanent 9H+ aerospace-grade ceramic protection applied in heated indoor bays with digital paint depth gauging. Every System X installation is registered to your vehicle's VIN on CARFAX Canada.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <a href="tel:+16479153530" className="btn btn--cream" style={{ minHeight: '42px', fontSize: '0.88rem' }}>
                <Phone style={{ width: '0.9rem', height: '0.9rem' }} />
                <span>647-915-3530</span>
              </a>
              <button onClick={onOpenBooking} className="btn btn--gold" style={{ minHeight: '42px', fontSize: '0.88rem' }}>
                <Calendar style={{ width: '0.9rem', height: '0.9rem' }} />
                <span>Book Coating Bay</span>
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Main Sections */}
      <main>
        {/* Coating Packages, Rate Comparison & FAQs */}
        <CoatingSection onOpenBooking={onOpenBooking} />

        {/* The 5-Step System X Application Flow */}
        <ProcessFlow />

        {/* Why CARFAX Canada Registration Adds Resale Value */}
        <CarfaxRecord />
      </main>

    </div>
  );
}
