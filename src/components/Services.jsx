import React from 'react';
import { Check, Sparkles, Clock, Shield, Flame, Car } from 'lucide-react';

export default function Services({ onSelectPackage }) {
  return (
    <section id="packages" style={{ padding: '6rem 0', background: 'rgba(15,23,42,0.4)', position: 'relative' }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1rem' }}>
        
        {/* Title */}
        <div style={{ textAlign: 'center', maxWidth: '48rem', margin: '0 auto 4rem auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(234,179,8,0.1)', border: '1px solid rgba(234,179,8,0.3)', padding: '0.5rem 1rem', borderRadius: '9999px', marginBottom: '1rem' }}>
            <Sparkles style={{ width: '1rem', height: '1rem', color: '#facc15' }} />
            <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#fde047' }}>
              Hand Wash &amp; Auto Spa Packages
            </span>
          </div>
          <h2 style={{ fontSize: 'clamp(1.875rem, 4vw, 3rem)', fontWeight: 900, color: 'white', letterSpacing: '-0.025em' }}>
            SELECT YOUR <span className="gold-gradient-text">DETAILED EXPERIENCE</span>
          </h2>
          <p style={{ color: '#cbd5e1', fontSize: '1rem', lineHeight: 1.6, marginTop: '1rem' }}>
            Every package is meticulously executed by hand. We use ultra-soft microfibers, premium foam suds, 
            and deep carpet steam extraction. <strong style={{ color: '#facc15', fontWeight: 700 }}>No pressure washers used</strong> to protect your paint.
          </p>
        </div>

        {/* 2 Package Cards Grid */}
        <div className="services-grid-2col" style={{ alignItems: 'stretch' }}>
          
          {/* MEDIUM PACKAGE CARD */}
          <div className="spa-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '2rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              
              {/* Header */}
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '1.5rem' }}>
                <div>
                  <span style={{ background: 'rgba(234,179,8,0.2)', color: '#fde047', border: '1px solid rgba(234,179,8,0.3)', fontSize: '0.6875rem', fontWeight: 800, padding: '0.25rem 0.75rem', borderRadius: '9999px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Popular Essential
                  </span>
                  <h3 style={{ fontSize: '1.875rem', fontWeight: 900, color: 'white', marginTop: '0.75rem' }}>
                    MEDIUM PACKAGE
                  </h3>
                  <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem' }}>Complete interior vacuum &amp; hand exterior wash</p>
                </div>
                <div>
                  <div style={{ fontSize: '2.25rem', fontWeight: 900, color: '#facc15' }}>
                    $100 <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 400 }}>/ Sedan</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', color: '#22d3ee', marginTop: '0.25rem', fontWeight: 700 }}>
                    <Clock style={{ width: '1rem', height: '1rem' }} />
                    <span>Approx. 2 hrs job</span>
                  </div>
                </div>
              </div>

              {/* Features */}
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.875rem', color: '#cbd5e1' }}>
                {[
                  { title: 'Inside & Outside Cleaning', desc: 'Full multi-stage hand wash' },
                  { title: 'Full Interior Detail', desc: 'Glass Wipe Down & Thorough Vacuum' },
                  { title: 'Rubber Mats Shampoo Washed', desc: 'Deep scrubbed & air dried' },
                  { title: 'Summer Mats', desc: 'High-pressure Air Blown & Vacuumed' },
                  { title: 'All Doors & Door Jambs Wiped', desc: 'Cleaned & degreased' },
                  { title: 'Exterior Body & Tire Hand Wash', desc: 'NO PRESSURE WASHER USED', highlight: true },
                ].map((f, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <div style={{ padding: '0.25rem', borderRadius: '50%', background: 'rgba(234,179,8,0.2)', color: '#facc15', flexShrink: 0, marginTop: '2px' }}>
                      <Check style={{ width: '1rem', height: '1rem' }} />
                    </div>
                    <span>
                      <strong style={{ color: 'white', fontWeight: 700 }}>{f.title}</strong>: {f.desc}
                      {f.highlight && <span style={{ color: '#facc15', fontWeight: 800, marginLeft: '0.25rem' }}>⭐</span>}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => onSelectPackage('Medium Package')}
              style={{
                width: '100%', background: 'rgba(15,23,42,1)', color: '#facc15',
                border: '1px solid rgba(234,179,8,0.4)', fontWeight: 900,
                padding: '1rem', borderRadius: '1rem', cursor: 'pointer',
                fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
              }}
            >
              <span>Select Medium Package</span>
              <Car style={{ width: '1rem', height: '1rem' }} />
            </button>
          </div>

          {/* FULL DETAIL CARD */}
          <div className="spa-card-gold" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '2rem', position: 'relative' }}>
            
            <div style={{
              position: 'absolute', top: '-1rem', right: '2rem',
              background: 'linear-gradient(to right, #facc15, #f59e0b)', color: '#080a0f',
              fontWeight: 900, fontSize: '0.75rem', padding: '0.375rem 1rem',
              borderRadius: '9999px', textTransform: 'uppercase', letterSpacing: '0.1em',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              display: 'flex', alignItems: 'center', gap: '0.25rem',
            }}>
              <Flame style={{ width: '1rem', height: '1rem', fill: '#080a0f' }} />
              <span>Signature Treatment</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              
              {/* Header */}
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', borderBottom: '1px solid rgba(234,179,8,0.3)', paddingBottom: '1.5rem' }}>
                <div>
                  <span style={{ background: 'rgba(0,210,255,0.2)', color: '#67e8f9', border: '1px solid rgba(0,210,255,0.4)', fontSize: '0.6875rem', fontWeight: 800, padding: '0.25rem 0.75rem', borderRadius: '9999px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Complete Restoration
                  </span>
                  <h3 className="gold-gradient-text" style={{ fontSize: '1.875rem', fontWeight: 900, marginTop: '0.75rem' }}>
                    FULL DETAIL
                  </h3>
                  <p style={{ fontSize: '0.75rem', color: '#cbd5e1', marginTop: '0.25rem' }}>Deep steam carpet cleaning &amp; total interior restoration</p>
                </div>
                <div>
                  <div style={{ fontSize: '2.25rem', fontWeight: 900, color: '#facc15' }}>
                    $200 <span style={{ fontSize: '0.75rem', color: '#cbd5e1', fontWeight: 400 }}>/ Sedan</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', color: '#22d3ee', marginTop: '0.25rem', fontWeight: 700 }}>
                    <Clock style={{ width: '1rem', height: '1rem' }} />
                    <span>Approx. 4 hrs job</span>
                  </div>
                </div>
              </div>

              {/* Plus Badge */}
              <div style={{ background: 'rgba(234,179,8,0.1)', border: '1px solid rgba(234,179,8,0.3)', padding: '1rem', borderRadius: '1rem', fontSize: '0.75rem', fontWeight: 800, color: '#fde047', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Sparkles style={{ width: '1rem', height: '1rem', color: '#facc15', flexShrink: 0 }} />
                <span>Includes ALL features from Medium Package PLUS:</span>
              </div>

              {/* Features */}
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.875rem', color: '#e2e8f0' }}>
                {[
                  { title: 'Summer Mats Shampoo Washed & Steamed', desc: 'Hot thermal extraction of stains, salt & odors.' },
                  { title: 'Non-removable Carpets & Seats', desc: 'Scrubbed & hot steam sanitized for an ultra-fresh ride.' },
                  { title: 'Cabin Sanitize & Deodorize', desc: 'Zero chemical residue, hypoallergenic interior treatment.' },
                ].map((f, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <div style={{ padding: '0.25rem', borderRadius: '50%', background: 'rgba(0,210,255,0.2)', color: '#22d3ee', flexShrink: 0, marginTop: '2px' }}>
                      <Check style={{ width: '1rem', height: '1rem' }} />
                    </div>
                    <span>
                      <strong style={{ color: 'white', fontWeight: 700 }}>{f.title}</strong>: {f.desc}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <button onClick={() => onSelectPackage('Full Detail')} className="gold-button" style={{ width: '100%', height: '3.5rem' }}>
              <span>Book Full Detail Experience</span>
              <Sparkles style={{ width: '1rem', height: '1rem', color: '#080a0f' }} />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
