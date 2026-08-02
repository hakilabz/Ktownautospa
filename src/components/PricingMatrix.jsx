import React from 'react';
import { Car, ShieldAlert } from 'lucide-react';

export default function PricingMatrix({ onSelectVehicleAndPackage }) {
  const matrixData = [
    {
      type: 'Sedan',
      icon: '🚗',
      description: 'Standard 2 to 4 door cars & compact coupes',
      mediumPrice: '$100',
      fullPrice: '$200',
      mediumVal: 100,
      fullVal: 200,
    },
    {
      type: 'SUV Crossover (5 seats)',
      icon: '🚙',
      description: 'Compact & Mid-size crossovers (5 passenger seats)',
      mediumPrice: '$120 - $130',
      fullPrice: '$220 - $230',
      note: 'depending on vehicle size',
      mediumVal: 120,
      fullVal: 220,
    },
    {
      type: 'SUV / Van (3rd row seats)',
      icon: '🚐',
      description: 'Full-size SUVs, Minivans & 3-row vehicles',
      mediumPrice: '$150',
      fullPrice: '$250',
      mediumVal: 150,
      fullVal: 250,
    },
  ];

  return (
    <section id="matrix" style={{ padding: '6rem 0', background: 'rgba(15,23,42,0.6)', position: 'relative' }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1rem' }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '48rem', margin: '0 auto 4rem auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(234,179,8,0.1)', border: '1px solid rgba(234,179,8,0.3)', padding: '0.5rem 1rem', borderRadius: '9999px', marginBottom: '1rem' }}>
            <Car style={{ width: '1rem', height: '1rem', color: '#facc15' }} />
            <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#fde047' }}>
              Transparent Vehicle Pricing Matrix
            </span>
          </div>
          <h2 style={{ fontSize: 'clamp(1.875rem, 4vw, 3rem)', fontWeight: 900, color: 'white', letterSpacing: '-0.025em' }}>
            PRICING BY <span className="gold-gradient-text">VEHICLE TYPE</span>
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '1rem', marginTop: '1rem', lineHeight: 1.6 }}>
            No hidden fees. Select your exact vehicle class below for instant transparent pricing.
          </p>
        </div>

        {/* Pricing Matrix Cards */}
        <div className="matrix-grid-3col" style={{ alignItems: 'stretch' }}>
          {matrixData.map((item, idx) => (
            <div 
              key={idx} 
              className="spa-card"
              style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '1.5rem' }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {/* Vehicle Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '1.25rem' }}>
                  <div style={{ fontSize: '2.5rem', padding: '0.75rem', background: 'rgba(15,23,42,1)', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.08)' }}>
                    {item.icon}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'white' }}>
                      {item.type}
                    </h3>
                    <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.125rem' }}>{item.description}</p>
                  </div>
                </div>

                {/* Package Options */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  
                  {/* Medium Package */}
                  <div style={{ background: 'rgba(15,23,42,0.9)', padding: '1rem', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#e2e8f0', display: 'block' }}>MEDIUM PACKAGE</span>
                      <span style={{ fontSize: '0.625rem', color: '#64748b' }}>~2 hrs full wash &amp; vacuum</span>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '1.25rem', fontWeight: 900, color: '#facc15' }}>{item.mediumPrice}</span>
                      {item.note && <span style={{ display: 'block', fontSize: '0.5625rem', color: '#64748b' }}>{item.note}</span>}
                    </div>
                  </div>

                  {/* Full Detail */}
                  <div style={{ background: 'linear-gradient(to right, rgba(234,179,8,0.1), rgba(15,23,42,1))', padding: '1rem', borderRadius: '1rem', border: '1px solid rgba(234,179,8,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <span style={{ fontSize: '0.75rem', fontWeight: 900, color: '#fde047', display: 'block' }}>FULL DETAIL</span>
                      <span style={{ fontSize: '0.625rem', color: '#67e8f9' }}>~4 hrs + carpet steam scrub</span>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span className="gold-gradient-text" style={{ fontSize: '1.25rem', fontWeight: 900 }}>{item.fullPrice}</span>
                      {item.note && <span style={{ display: 'block', fontSize: '0.5625rem', color: '#64748b' }}>{item.note}</span>}
                    </div>
                  </div>

                </div>
              </div>

              {/* Action */}
              <button
                onClick={() => onSelectVehicleAndPackage(item.type, 'Full Detail', item.fullVal)}
                style={{
                  width: '100%', background: 'rgba(15,23,42,1)', color: '#e2e8f0',
                  border: '1px solid rgba(255,255,255,0.08)', padding: '0.875rem',
                  borderRadius: '1rem', fontSize: '0.75rem', fontWeight: 900,
                  textTransform: 'uppercase', letterSpacing: '0.05em', cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                Select {item.type}
              </button>
            </div>
          ))}
        </div>

        {/* Surcharge Banner */}
        <div className="spa-card-gold" style={{ marginTop: '3rem', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ padding: '0.875rem', background: 'rgba(234,179,8,0.2)', color: '#facc15', borderRadius: '1rem', border: '1px solid rgba(234,179,8,0.4)', flexShrink: 0 }}>
              <ShieldAlert style={{ width: '2rem', height: '2rem' }} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ background: 'rgba(239,68,68,0.2)', color: '#fca5a5', border: '1px solid rgba(239,68,68,0.4)', fontSize: '0.625rem', fontWeight: 900, padding: '0.125rem 0.625rem', borderRadius: '9999px', textTransform: 'uppercase' }}>
                  Notice
                </span>
                <h4 style={{ fontSize: '1.125rem', fontWeight: 800, color: 'white' }}>Surcharge for Heavy Condition</h4>
              </div>
              <p style={{ fontSize: '0.875rem', color: '#cbd5e1', marginTop: '0.25rem' }}>
                Vehicles with extreme dirt, heavy pet hair, kids food spills, or work vehicles require extra labor:
              </p>
            </div>
          </div>

          <div style={{ flexShrink: 0, textAlign: 'center', background: '#020617', padding: '1rem 1.5rem', borderRadius: '1rem', border: '1px solid rgba(234,179,8,0.4)' }}>
            <span style={{ fontSize: '1.5rem', fontWeight: 900, color: '#facc15' }}>+ $50 EXTRA</span>
            <span style={{ display: 'block', fontSize: '0.625rem', textTransform: 'uppercase', color: '#64748b', fontWeight: 700, letterSpacing: '0.05em' }}>Kids • Pets • Work Vehicles</span>
          </div>
        </div>

      </div>
    </section>
  );
}
