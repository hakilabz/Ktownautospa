import React from 'react';
import { Check } from 'lucide-react';

export default function WhyShop() {
  const reasons = [
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
                <div style={{ marginTop: '2px', background: 'var(--cream-2)', border: '1px solid var(--gold-dk)', borderRadius: '50%', padding: '3px', display: 'flex' }}>
                  <Check style={{ width: '1.1rem', height: '1.1rem', color: 'var(--gold-dk)' }} />
                </div>
                <div>
                  <strong style={{ display: 'block', color: 'var(--navy-deep)', fontSize: '1.08rem', marginBottom: '0.2rem' }}>
                    {item.title}
                  </strong>
                  <span style={{ display: 'block', color: 'var(--slate)', fontSize: '0.96rem', lineHeight: 1.55 }}>
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
