import React from 'react';
import { Droplets, ShieldCheck, Sparkles, Layers, Award } from 'lucide-react';

export default function ProcessFlow() {
  const steps = [
    {
      num: '1',
      icon: <Droplets style={{ width: '2rem', height: '2rem', color: '#3E9BDA' }} />,
      title: 'Hand Wash',
      desc: 'By hand, never a pressure washer or abrasive brush. Removes all loose road grit so subsequent stages don’t grind particles into your clear coat.',
    },
    {
      num: '2',
      icon: <Layers style={{ width: '2rem', height: '2rem', color: '#3E9BDA' }} />,
      title: 'Surface Decontamination',
      desc: 'Synthetic clay and chemical iron-dissolving fallout removers pull out embedded industrial contaminants and rail dust that regular washing leaves behind.',
    },
    {
      num: '3',
      icon: <Sparkles style={{ width: '2rem', height: '2rem', color: '#3E9BDA' }} />,
      title: 'Paint Correction & Polish',
      desc: 'Precision rotary and dual-action machine polishing permanently eradicates swirl marks and hazing. We measure depth to preserve clear coat thickness.',
    },
    {
      num: '4',
      icon: <ShieldCheck style={{ width: '2rem', height: '2rem', color: '#3E9BDA' }} />,
      title: 'Panel Solvent Wipe',
      desc: 'Every painted panel is wiped with pure isopropyl alcohol / solvent solution to strip off residual polishing oils, ensuring direct ceramic molecular bonding.',
    },
    {
      num: '5',
      icon: <Award style={{ width: '2rem', height: '2rem', color: 'var(--gold-lt)' }} />,
      title: 'Exterior Paint Coating',
      desc: 'The ceramic coating is hand-leveled panel by panel. Once cured, we issue warranty documentation and log the service directly with CARFAX Canada.',
    },
  ];

  return (
    <section className="band band--deep" id="process">
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
        
        <div className="section-head" style={{ marginBottom: '3rem' }}>
          <p className="kicker">The System X process</p>
          <h2>Five steps, every coating, no shortcuts</h2>
          <p>
            This is the sequence System X requires of accredited installation centres. Skip any step and the ceramic nanostructures cannot bond to clear coat — which is why factory warranty is strictly tied to accredited installers.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '1.25rem' }}>
          {steps.map((step) => (
            <div 
              key={step.num}
              style={{
                position: 'relative',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(240, 213, 144, 0.35)',
                borderRadius: '12px',
                padding: '1.6rem 1.25rem 1.4rem',
              }}
            >
              {/* Number Badge */}
              <div style={{
                position: 'absolute', top: '-14px', left: '1.2rem',
                width: '32px', height: '32px', borderRadius: '50%',
                display: 'grid', placeItems: 'center',
                background: 'linear-gradient(180deg, var(--gold-lt), var(--gold))',
                color: 'var(--navy-deep)', border: '2px solid var(--navy-deep)',
                fontFamily: 'var(--display)', fontWeight: 800, fontSize: '1.15rem',
              }}>
                {step.num}
              </div>

              <div style={{ margin: '0.6rem 0 1rem' }}>
                {step.icon}
              </div>

              <h3 style={{
                fontFamily: 'var(--display)', fontWeight: 800,
                textTransform: 'uppercase', fontSize: '1.3rem',
                lineHeight: 1.1, margin: '0 0 0.55rem', color: 'var(--gold-lt)',
              }}>
                {step.title}
              </h3>

              <p style={{ margin: 0, color: '#C6D8EC', fontSize: '0.94rem', lineHeight: 1.55 }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
