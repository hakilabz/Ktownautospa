import React from 'react';
import { Check } from 'lucide-react';

export default function WhyShop() {
  const reasons = [
    {
      title: 'Hospital-grade steam cleaner',
      desc: 'Italian-made, 305°F dry steam with vacuum extraction. It sanitizes seats, carpets and vents without soaking them or leaving chemical residue — the class of machine Canadian hospitals use for disinfection. We don’t know of another detailer in Kingston running one.',
    },
    {
      title: 'Dust-controlled indoor bay',
      desc: 'Coatings cure without wind, pollen, airborne dirt or evening dew landing in wet product.',
    },
    {
      title: 'Professional inspection lighting',
      desc: 'Micro-swirls and fine scratch imperfections you cannot see in natural sunlight cannot be corrected.',
    },
    {
      title: 'Paint depth measured first',
      desc: 'Digital gauge readings ensure no aggressive compounding through thin or previously repainted clear coat.',
    },
    {
      title: 'Open Saturdays, heated year-round',
      desc: 'Eastern Ontario road salt season is exactly when your vehicle’s clear coat and undercarriage need us most.',
    },
    {
      title: 'Free pickup and delivery',
      desc: 'Included on every ceramic coating package from $949. We collect your car and return it mirror-finished.',
    },
  ];

  return (
    <section className="band" id="shop">
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
        
        <div className="section-head" style={{ marginBottom: '2rem' }}>
          <p className="kicker">Why a shop, not a driveway</p>
          <h2>Some of this can’t be done in a parking lot</h2>
        </div>

        <div className="frame">
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {reasons.map((item, idx) => (
              <li key={idx} style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '0.85rem', alignItems: 'flex-start' }}>
                <div className="check-badge">
                  <Check style={{ width: '13px', height: '13px', color: 'var(--gold-primary)' }} />
                </div>
                <div>
                  <strong style={{ display: 'block', color: 'var(--heading-color)', fontSize: '1.05rem', marginBottom: '0.2rem' }}>
                    {item.title}
                  </strong>
                  <span style={{ display: 'block', color: 'var(--muted-color)', fontSize: '0.94rem', lineHeight: 1.55 }}>
                    {item.desc}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
}
