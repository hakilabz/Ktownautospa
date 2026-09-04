import React, { useState, useMemo } from 'react';
import { Clock, ArrowRight, Bug, Disc } from 'lucide-react';

export default function PriceCalculator({ onProceedToBooking }) {
  const [vehicle, setVehicle] = useState('sedan');
  const [pkg, setPkg] = useState('medium');
  const [addons, setAddons] = useState(['tire-shine', 'bug-removal']);

  const toggleAddon = (id) => {
    setAddons(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const calculation = useMemo(() => {
    let base = 0;
    let pkgName = 'Medium Package';
    let duration = 'Approx. 2 hrs';

    if (pkg === 'wash') {
      pkgName = 'Hand Car Wash'; duration = 'Approx. 45 mins';
      if (vehicle === 'sedan') base = 30;
      else if (vehicle === 'crossover') base = 40;
      else if (vehicle === 'suv') base = 45;
      else if (vehicle === 'van') base = 50;
    } else if (pkg === 'medium') {
      pkgName = 'Medium Package'; duration = 'Approx. 2 hrs';
      if (vehicle === 'sedan') base = 100;
      else if (vehicle === 'crossover') base = 130;
      else if (vehicle === 'suv') base = 150;
      else if (vehicle === 'van') base = 160;
    } else if (pkg === 'interior') {
      pkgName = 'Interior Complete'; duration = 'Approx. 3 hrs';
      if (vehicle === 'sedan') base = 175;
      else if (vehicle === 'crossover') base = 199;
      else if (vehicle === 'suv') base = 229;
      else if (vehicle === 'van') base = 249;
    } else if (pkg === 'full') {
      pkgName = 'Full Detail'; duration = 'Approx. 4 hrs';
      if (vehicle === 'sedan') base = 200;
      else if (vehicle === 'crossover') base = 230;
      else if (vehicle === 'suv') base = 250;
      else if (vehicle === 'van') base = 270;
    }

    let addonTotal = 0;
    const itemizedAddons = [];
    if (addons.includes('tire-shine')) { addonTotal += 10; itemizedAddons.push({ name: 'High-Gloss Tire Shine', price: 10 }); }
    if (addons.includes('bug-removal')) { addonTotal += 5; itemizedAddons.push({ name: 'Bug & Tar Removal', price: 5 }); }
    if (addons.includes('summer-mats')) { addonTotal += 20; itemizedAddons.push({ name: 'Summer Mats Shampoo', price: 20 }); }
    if (addons.includes('engine-bay')) { addonTotal += 40; itemizedAddons.push({ name: 'Engine Bay Cleaning', price: 40 }); }
    if (addons.includes('odour')) { addonTotal += 50; itemizedAddons.push({ name: 'Thermal Odour Treatment', price: 50 }); }
    if (addons.includes('headlights')) { addonTotal += 60; itemizedAddons.push({ name: 'Headlight Restoration', price: 60 }); }
    if (addons.includes('clay-bar')) { addonTotal += 60; itemizedAddons.push({ name: 'Clay Bar Decon', price: 60 }); }
    if (addons.includes('pet-hair')) { addonTotal += 50; itemizedAddons.push({ name: 'Pet Hair Surcharge', price: 50 }); }

    let vehicleLabel = 'Sedan';
    if (vehicle === 'crossover') vehicleLabel = 'Crossover (5 Seats)';
    if (vehicle === 'suv') vehicleLabel = 'SUV (3rd Row)';
    if (vehicle === 'van') vehicleLabel = 'Van';

    return { base, addonTotal, total: base + addonTotal, pkgName, duration, vehicleLabel, itemizedAddons };
  }, [vehicle, pkg, addons]);

  const chipStyle = (active, danger = false) => ({
    cursor: 'pointer', padding: '0.85rem', borderRadius: '12px', textAlign: 'left',
    transition: 'all 0.18s ease',
    background: active ? (danger ? 'rgba(239,68,68,0.18)' : 'linear-gradient(180deg, var(--gold-lt), var(--gold))') : 'var(--chip-inactive-bg)',
    border: `2px solid ${active ? (danger ? '#EF4444' : 'var(--gold-dk)') : 'var(--chip-inactive-border)'}`,
    color: active ? (danger ? '#EF4444' : '#0A1E42') : 'var(--chip-inactive-text)',
    fontWeight: active ? 800 : 500,
  });

  return (
    <section id="calculator" className="band">
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
        
        {/* Header */}
        <div className="section-head" style={{ marginBottom: '2.5rem' }}>
          <p className="kicker">Interactive Price Estimator</p>
          <h2>Custom Quote Builder</h2>
          <p>
            Select your vehicle size, detailing service level, and optional add-ons to calculate your instant estimated total with zero surprises.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', alignItems: 'start' }}>
          
          {/* Builder Controls Frame */}
          <div className="frame">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
              
              {/* Step 1: Vehicle Size */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <label style={{ fontFamily: 'var(--mono)', fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--gold-primary)' }}>
                  1. Select Vehicle Size
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.6rem' }}>
                  {[
                    { id: 'sedan', label: 'Sedan', icon: '🚗' },
                    { id: 'crossover', label: 'Crossover (5-Seat)', icon: '🚙' },
                    { id: 'suv', label: 'SUV (3rd Row)', icon: '🚐' },
                    { id: 'van', label: 'Passenger Van', icon: '🚐' },
                  ].map((v) => (
                    <button key={v.id} type="button" onClick={() => setVehicle(v.id)} style={chipStyle(vehicle === v.id)}>
                      <div style={{ fontSize: '1.4rem', marginBottom: '0.2rem' }}>{v.icon}</div>
                      <div style={{ fontSize: '0.85rem' }}>{v.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Package Level */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <label style={{ fontFamily: 'var(--mono)', fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--gold-primary)' }}>
                  2. Select Detailing Level
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.6rem' }}>
                  {[
                    { id: 'wash', label: 'Hand Wash', price: vehicle === 'sedan' ? '$30' : vehicle === 'crossover' ? '$40' : vehicle === 'suv' ? '$45' : '$50' },
                    { id: 'medium', label: 'Medium Package', price: vehicle === 'sedan' ? '$100' : vehicle === 'crossover' ? '$130' : vehicle === 'suv' ? '$150' : '$160' },
                    { id: 'interior', label: 'Interior Complete', price: vehicle === 'sedan' ? '$175' : vehicle === 'crossover' ? '$199' : vehicle === 'suv' ? '$229' : '$249' },
                    { id: 'full', label: 'Full Detail', price: vehicle === 'sedan' ? '$200' : vehicle === 'crossover' ? '$230' : vehicle === 'suv' ? '$250' : '$270' },
                  ].map((p) => (
                    <button key={p.id} type="button" onClick={() => setPkg(p.id)} style={chipStyle(pkg === p.id)}>
                      <div style={{ fontSize: '0.82rem' }}>{p.label}</div>
                      <div style={{ fontFamily: 'var(--display)', fontSize: '1.25rem', fontWeight: 800, marginTop: '0.2rem' }}>{p.price}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Add-ons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <label style={{ fontFamily: 'var(--mono)', fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--gold-primary)' }}>
                  3. Select Optional Treatments &amp; Add-ons
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.6rem' }}>
                  <div onClick={() => toggleAddon('tire-shine')} style={{ ...chipStyle(addons.includes('tire-shine')), display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Disc style={{ width: '1rem', height: '1rem', color: 'var(--water)' }} />
                      <span style={{ fontSize: '0.82rem' }}>Tire Shine ⭐</span>
                    </div>
                    <b style={{ fontSize: '0.95rem' }}>$10</b>
                  </div>

                  <div onClick={() => toggleAddon('bug-removal')} style={{ ...chipStyle(addons.includes('bug-removal')), display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Bug style={{ width: '1rem', height: '1rem', color: 'var(--gold-primary)' }} />
                      <span style={{ fontSize: '0.82rem' }}>Bug Removal ⭐</span>
                    </div>
                    <b style={{ fontSize: '0.95rem' }}>$5</b>
                  </div>

                  <div onClick={() => toggleAddon('summer-mats')} style={{ ...chipStyle(addons.includes('summer-mats')), display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.82rem' }}>Summer Mats Shampoo</span>
                    <b style={{ fontSize: '0.95rem' }}>$20</b>
                  </div>

                  <div onClick={() => toggleAddon('engine-bay')} style={{ ...chipStyle(addons.includes('engine-bay')), display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.82rem' }}>Engine Bay Cleaning</span>
                    <b style={{ fontSize: '0.95rem' }}>$40</b>
                  </div>

                  <div onClick={() => toggleAddon('odour')} style={{ ...chipStyle(addons.includes('odour')), display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.82rem' }}>Thermal Odour Treatment</span>
                    <b style={{ fontSize: '0.95rem' }}>$50</b>
                  </div>

                  <div onClick={() => toggleAddon('pet-hair')} style={{ ...chipStyle(addons.includes('pet-hair'), true), display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.82rem' }}>Pet Hair / Heavy Work</span>
                    <b style={{ fontSize: '0.95rem', color: '#EF4444' }}>+$50</b>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Live Receipt Card */}
          <div className="frame frame--navy" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ borderBottom: '1px solid rgba(240,213,144,0.3)', paddingBottom: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontFamily: 'var(--mono)', fontSize: '0.74rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#7FC4EE' }}>
                  Live Quote Summary
                </span>
                <h3 style={{ fontFamily: 'var(--display)', fontSize: '1.45rem', fontWeight: 800, margin: '0.2rem 0 0', color: 'var(--gold-lt)' }}>
                  ESTIMATE RECEIPT
                </h3>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.76rem', color: 'var(--gold-lt)', background: 'rgba(0,0,0,0.3)', padding: '0.3rem 0.7rem', borderRadius: '999px', border: '1px solid rgba(240,213,144,0.3)' }}>
                <Clock style={{ width: '0.85rem', height: '0.85rem' }} />
                <span>{calculation.duration}</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.88rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#C6D8EC', paddingBottom: '0.4rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <span>Vehicle Class:</span>
                <strong style={{ color: '#FFFFFF' }}>{calculation.vehicleLabel}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#C6D8EC', paddingBottom: '0.4rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <span>Base ({calculation.pkgName}):</span>
                <strong style={{ color: 'var(--gold-lt)' }}>${calculation.base}</strong>
              </div>
              {calculation.itemizedAddons.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', paddingTop: '0.2rem' }}>
                  <span style={{ color: '#7FC4EE', fontFamily: 'var(--mono)', fontSize: '0.72rem', textTransform: 'uppercase' }}>Selected Add-ons:</span>
                  {calculation.itemizedAddons.map((item, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', color: '#E4EDF7', paddingLeft: '0.5rem', fontSize: '0.82rem' }}>
                      <span>+ {item.name}</span>
                      <span style={{ color: '#7FC4EE', fontWeight: 700 }}>+${item.price}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Total Estimated Cost Box */}
            <div style={{ background: '#051124', padding: '1.4rem 1rem', borderRadius: '12px', border: '2px solid var(--gold)', textAlign: 'center' }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '0.75rem', color: '#A9C4E2', letterSpacing: '0.12em', textTransform: 'uppercase', display: 'block', marginBottom: '0.3rem' }}>
                Estimated Total Price
              </span>
              <div style={{ fontFamily: 'var(--display)', fontSize: '3rem', fontWeight: 800, color: 'var(--gold-lt)', lineHeight: 1 }}>
                ${calculation.total} <span style={{ fontSize: '0.9rem', color: '#A9C4E2', fontWeight: 400 }}>CAD</span>
              </div>
              <span style={{ fontSize: '0.78rem', color: '#34D399', fontWeight: 600, display: 'block', marginTop: '0.5rem' }}>
                ✓ No payment required now • Pay after vehicle inspection
              </span>
            </div>

            <button 
              onClick={() => onProceedToBooking(calculation)} 
              className="btn btn--gold" 
              style={{ width: '100%', minHeight: '56px' }}
            >
              <span>Book Appointment For ${calculation.total}</span>
              <ArrowRight style={{ width: '1.1rem', height: '1.1rem' }} />
            </button>

            <p style={{ fontSize: '0.78rem', textAlign: 'center', color: '#A9C4E2', margin: 0 }}>
              Questions? Call <a href="tel:6479153530" style={{ color: 'var(--gold-lt)', textDecoration: 'underline', fontWeight: 700 }}>647-915-3530</a> or email <a href="mailto:ktownautomobilespa@gmail.com" style={{ color: '#7FC4EE', textDecoration: 'underline' }}>ktownautomobilespa@gmail.com</a>
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
