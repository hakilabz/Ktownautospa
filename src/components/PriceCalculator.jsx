import React, { useState, useMemo } from 'react';
import { Calculator, Sparkles, Clock, ArrowRight, Bug, Disc } from 'lucide-react';

export default function PriceCalculator({ onProceedToBooking }) {
  const [vehicle, setVehicle] = useState('sedan');
  const [pkg, setPkg] = useState('medium');
  const [addons, setAddons] = useState(['bug-removal', 'tire-shine']);

  const toggleAddon = (id) => {
    setAddons(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const calculation = useMemo(() => {
    let base = 0;
    let pkgName = 'Medium Package';
    let duration = 'Approx. 2 hrs';

    if (pkg === 'external') {
      base = 30; pkgName = 'External Wash Only'; duration = 'Approx. 45 mins';
    } else if (pkg === 'medium') {
      pkgName = 'Medium Package'; duration = 'Approx. 2 hrs';
      if (vehicle === 'sedan') base = 100;
      else if (vehicle === 'suv-crossover') base = 120;
      else if (vehicle === 'suv-van') base = 150;
    } else if (pkg === 'full') {
      pkgName = 'Full Detail Package'; duration = 'Approx. 4 hrs';
      if (vehicle === 'sedan') base = 200;
      else if (vehicle === 'suv-crossover') base = 220;
      else if (vehicle === 'suv-van') base = 250;
    }

    let addonTotal = 0;
    const itemizedAddons = [];
    if (addons.includes('bug-removal')) { addonTotal += 5; itemizedAddons.push({ name: 'Bug Removal', price: 5 }); }
    if (addons.includes('tire-shine')) { addonTotal += 10; itemizedAddons.push({ name: 'High-Gloss Tire Shine', price: 10 }); }
    if (addons.includes('summer-mats')) { addonTotal += 20; itemizedAddons.push({ name: 'Summer Mats Shampoo', price: 20 }); }
    if (addons.includes('heavy-surcharge')) { addonTotal += 50; itemizedAddons.push({ name: 'Kids/Pets/Work Surcharge', price: 50 }); }

    let vehicleLabel = 'Sedan';
    if (vehicle === 'suv-crossover') vehicleLabel = 'SUV Crossover (5 Seats)';
    if (vehicle === 'suv-van') vehicleLabel = 'SUV / Van (3rd Row)';

    return { base, addonTotal, total: base + addonTotal, pkgName, duration, vehicleLabel, itemizedAddons };
  }, [vehicle, pkg, addons]);

  const chipStyle = (active, danger = false) => ({
    cursor: 'pointer', padding: '0.875rem', borderRadius: '1rem', textAlign: 'left',
    transition: 'all 0.2s',
    background: active ? (danger ? 'rgba(239,68,68,0.15)' : 'rgba(212,175,55,0.15)') : 'var(--card-bg)',
    border: `1.5px solid ${active ? (danger ? '#ef4444' : 'var(--gold-primary)') : 'var(--card-border)'}`,
    color: active ? 'var(--text-main)' : 'var(--text-muted)', fontWeight: active ? 800 : 500,
  });

  return (
    <section id="calculator" style={{ padding: '6rem 0', background: 'var(--bg-page)', position: 'relative' }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1rem' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '48rem', margin: '0 auto 4rem auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(212,175,55,0.12)', border: '1px solid rgba(212,175,55,0.4)', padding: '0.5rem 1rem', borderRadius: '9999px', marginBottom: '1rem' }}>
            <Calculator style={{ width: '1rem', height: '1rem', color: 'var(--gold-primary)' }} />
            <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--gold-primary)' }}>
              Interactive Price Estimator
            </span>
          </div>
          <h2 style={{ fontSize: 'clamp(1.875rem, 4vw, 3rem)', fontWeight: 900, color: 'var(--text-main)', letterSpacing: '-0.025em' }}>
            CUSTOM <span className="gold-gradient-text">QUOTE BUILDER</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginTop: '1rem' }}>
            Select your vehicle, service level, and add-ons to generate your instant estimated total.
          </p>
        </div>

        <div className="calculator-grid-2col">
          
          {/* Builder Controls */}
          <div className="spa-card">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              
              {/* Step 1 */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--gold-primary)' }}>1. Select Vehicle Type</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.75rem' }}>
                  {[
                    { id: 'sedan', label: 'Sedan', icon: '🚗' },
                    { id: 'suv-crossover', label: 'SUV Crossover (5-Seat)', icon: '🚙' },
                    { id: 'suv-van', label: 'SUV / Van (3rd Row)', icon: '🚐' },
                  ].map((v) => (
                    <button key={v.id} onClick={() => setVehicle(v.id)} style={chipStyle(vehicle === v.id)}>
                      <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{v.icon}</div>
                      <div style={{ fontSize: '0.75rem', fontWeight: 700 }}>{v.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2 */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--gold-primary)' }}>2. Select Detailing Package</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.75rem' }}>
                  {[
                    { id: 'medium', label: 'Medium Package', price: vehicle === 'sedan' ? '$100' : vehicle === 'suv-crossover' ? '$120' : '$150' },
                    { id: 'full', label: 'Full Detail', price: vehicle === 'sedan' ? '$200' : vehicle === 'suv-crossover' ? '$220' : '$250' },
                    { id: 'external', label: 'External Only', price: '$30' },
                  ].map((p) => (
                    <button key={p.id} onClick={() => setPkg(p.id)} style={chipStyle(pkg === p.id)}>
                      <div style={{ fontSize: '0.75rem', fontWeight: 700 }}>{p.label}</div>
                      <div style={{ fontSize: '1.125rem', fontWeight: 900, color: 'var(--gold-primary)', marginTop: '0.25rem' }}>{p.price}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3 */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--gold-primary)' }}>3. Choose Optional Add-ons</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
                  <div onClick={() => toggleAddon('bug-removal')} style={{ ...chipStyle(addons.includes('bug-removal')), display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                      <Bug style={{ width: '1rem', height: '1rem', color: 'var(--gold-primary)' }} />
                      <div>
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, display: 'block' }}>Bug Removal ⭐</span>
                        <span style={{ fontSize: '0.625rem', color: 'var(--text-muted)' }}>Front bumper dissolve</span>
                      </div>
                    </div>
                    <span style={{ fontSize: '0.875rem', fontWeight: 900, color: 'var(--gold-primary)' }}>$5</span>
                  </div>

                  <div onClick={() => toggleAddon('tire-shine')} style={{ ...chipStyle(addons.includes('tire-shine')), display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                      <Disc style={{ width: '1rem', height: '1rem', color: 'var(--cyan-glow)' }} />
                      <div>
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, display: 'block' }}>Tire Shine ⭐</span>
                        <span style={{ fontSize: '0.625rem', color: 'var(--text-muted)' }}>High-gloss silicone coat</span>
                      </div>
                    </div>
                    <span style={{ fontSize: '0.875rem', fontWeight: 900, color: 'var(--cyan-glow)' }}>$10</span>
                  </div>

                  <div onClick={() => toggleAddon('summer-mats')} style={{ ...chipStyle(addons.includes('summer-mats')), display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.75rem' }}>Summer Mats Shampoo</span>
                    <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--gold-primary)' }}>$20</span>
                  </div>

                  <div onClick={() => toggleAddon('heavy-surcharge')} style={{ ...chipStyle(addons.includes('heavy-surcharge'), true), display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.75rem' }}>Kids/Pets/Work Surcharge</span>
                    <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#ef4444' }}>+$50</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Receipt Card */}
          <div className="spa-card-gold" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ borderBottom: '1px solid rgba(212,175,55,0.3)', paddingBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--cyan-glow)' }}>Live Quote Summary</span>
                <h3 className="gold-gradient-text" style={{ fontSize: '1.25rem', fontWeight: 900, marginTop: '0.25rem' }}>KTOWN ESTIMATE RECEIPT</h3>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', color: 'var(--gold-primary)', fontWeight: 700, background: 'rgba(212,175,55,0.12)', padding: '0.25rem 0.625rem', borderRadius: '9999px', border: '1px solid rgba(212,175,55,0.3)' }}>
                <Clock style={{ width: '0.875rem', height: '0.875rem' }} />
                <span>{calculation.duration}</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', padding: '0.25rem 0', borderBottom: '1px solid var(--card-border)' }}>
                <span>Vehicle Class:</span>
                <strong style={{ color: 'var(--text-main)' }}>{calculation.vehicleLabel}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', padding: '0.25rem 0', borderBottom: '1px solid var(--card-border)' }}>
                <span>Base Package ({calculation.pkgName}):</span>
                <strong style={{ color: 'var(--gold-primary)', fontWeight: 800 }}>${calculation.base}</strong>
              </div>
              {calculation.itemizedAddons.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', paddingTop: '0.25rem' }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.625rem', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>Selected Add-ons:</span>
                  {calculation.itemizedAddons.map((item, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', paddingLeft: '0.5rem', fontSize: '0.6875rem' }}>
                      <span>+ {item.name}</span>
                      <span style={{ color: 'var(--cyan-glow)', fontWeight: 700 }}>+${item.price}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div style={{ background: 'var(--input-bg)', padding: '1.25rem', borderRadius: '1rem', border: '1.5px solid rgba(212,175,55,0.4)', textAlign: 'center' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block' }}>Estimated Total Price</span>
              <div className="gold-gradient-text" style={{ fontSize: '2.25rem', fontWeight: 900, letterSpacing: '-0.025em' }}>
                ${calculation.total} <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 400 }}>CAD</span>
              </div>
              <span style={{ fontSize: '0.625rem', color: '#10b981', fontWeight: 700, display: 'block' }}>
                ✓ No payment required now • Pay after spa completion
              </span>
            </div>

            <button onClick={() => onProceedToBooking(calculation)} className="gold-button" style={{ width: '100%' }}>
              <span>Book Appointment For ${calculation.total}</span>
              <ArrowRight style={{ width: '1rem', height: '1rem', color: '#080a0f' }} />
            </button>

            <p style={{ fontSize: '0.6875rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              Questions? Call <a href="tel:6479153530" style={{ color: 'var(--gold-primary)', textDecoration: 'underline', fontWeight: 700 }}>647-915-3530</a> or email <a href="mailto:ktownautomobilespa@gmail.com" style={{ color: 'var(--cyan-glow)', textDecoration: 'underline' }}>ktownautomobilespa@gmail.com</a>
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
