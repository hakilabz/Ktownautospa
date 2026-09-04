import React from 'react';

export default function HowItWorks() {
  const steps = [
    {
      num: '1',
      title: 'Book a time',
      desc: 'Call, text, or WhatsApp 647-915-3530. A live person answers — not a robotic phone tree — and we reply evenings and weekends too.',
    },
    {
      num: '2',
      title: 'Drop the car off',
      desc: 'We walk around your vehicle with you first and confirm the final price before any work begins. Surcharges are raised upfront, never on the bill.',
    },
    {
      num: '3',
      title: 'Pick it up clean',
      desc: 'We text you as soon as it’s finished. Inspect every angle and cabin corner with us before any payment is collected.',
    },
  ];

  return (
    <section className="band" id="how">
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
        
        <div className="section-head" style={{ marginBottom: '2.5rem' }}>
          <p className="kicker">How it works</p>
          <h2>Three steps. That’s the whole thing.</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {steps.map((s) => (
            <div 
              key={s.num} 
              className="frame"
              style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}
            >
              <div style={{
                display: 'grid', placeItems: 'center', width: '50px', height: '50px',
                borderRadius: '50%', background: 'linear-gradient(180deg, var(--gold-lt), var(--gold))',
                border: '2px solid var(--navy-deep)', color: 'var(--navy-deep)',
                fontFamily: 'var(--display)', fontWeight: 800, fontSize: '1.75rem',
                marginBottom: '0.6rem',
              }}>
                {s.num}
              </div>

              <h3 style={{ fontSize: '1.3rem', margin: 0, fontWeight: 800, color: 'var(--navy-deep)' }}>
                {s.title}
              </h3>

              <p style={{ margin: 0, color: 'var(--slate)', fontSize: '0.96rem', lineHeight: 1.6 }}>
                {s.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
