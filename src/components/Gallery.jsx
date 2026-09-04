import React, { useState } from 'react';
import { Sparkles, ArrowLeftRight, Disc, Bug, Flame, Check } from 'lucide-react';

export default function Gallery() {
  const [sliderPos, setSliderPos] = useState(50);

  const workCards = [
    {
      title: 'High-Gloss Tire & Rim Shine',
      desc: 'Brake dust removal & $10 deep silicone shine barrier restoration.',
      tag: 'Tire Shine - $10',
      icon: <Disc style={{ width: '1.25rem', height: '1.25rem', color: 'var(--water)' }} />,
    },
    {
      title: 'Front Bumper Bug & Tar Decon',
      desc: 'Specialty enzyme solvent dissolves baked-on bugs without swirl scratches.',
      tag: 'Bug Removal - $5',
      icon: <Bug style={{ width: '1.25rem', height: '1.25rem', color: 'var(--gold-dk)' }} />,
    },
    {
      title: 'Thermal Carpet & Seat Steam Extraction',
      desc: 'Deep steam extraction pulls salt, winter brine, pet hair and coffee stains.',
      tag: 'Full Detail Feature',
      icon: <Flame style={{ width: '1.25rem', height: '1.25rem', color: '#E65100' }} />,
    },
  ];

  return (
    <section className="band" id="work">
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
        
        {/* Section Header */}
        <div className="section-head" style={{ marginBottom: '2.5rem' }}>
          <p className="kicker">Our work</p>
          <h2>Same car. Drag the slider.</h2>
          <p>
            This is what true multi-stage paint correction actually accomplishes. Swirl marks and oxidation are polished out of the clear coat, and the true optical depth and mirror gloss come back.
          </p>
        </div>

        {/* Interactive Comparison Slider */}
        <div 
          style={{
            position: 'relative',
            borderRadius: '12px',
            overflow: 'hidden',
            border: '2px solid var(--gold-dk)',
            boxShadow: '0 16px 40px rgba(12, 34, 71, 0.2)',
            aspectRatio: '16/9',
            maxHeight: '560px',
            userSelect: 'none',
          }}
        >
          {/* AFTER (Full background) */}
          <div 
            style={{
              position: 'absolute', inset: 0,
              backgroundImage: `url('/car-after.jpg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />

          {/* BEFORE (Clipped left side) */}
          <div 
            style={{
              position: 'absolute', inset: 0,
              backgroundImage: `url('/car-before.jpg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              clipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
            }}
          />

          {/* Tags */}
          <div style={{
            position: 'absolute', bottom: '1rem', left: '1rem', zIndex: 10,
            fontFamily: 'var(--mono)', fontSize: '0.8rem', letterSpacing: '0.12em',
            textTransform: 'uppercase', padding: '0.42rem 0.9rem', borderRadius: '999px',
            background: 'rgba(10, 30, 66, 0.92)', color: '#FFFFFF',
          }}>
            Before: Mud &amp; Swirls
          </div>

          <div style={{
            position: 'absolute', bottom: '1rem', right: '1rem', zIndex: 10,
            fontFamily: 'var(--mono)', fontSize: '0.8rem', letterSpacing: '0.12em',
            textTransform: 'uppercase', padding: '0.42rem 0.9rem', borderRadius: '999px',
            background: 'linear-gradient(180deg, var(--gold-lt), var(--gold))',
            color: 'var(--navy-deep)', fontWeight: 800,
          }}>
            After: Ktown Spa Mirror Shine
          </div>

          {/* Divider Line */}
          <div 
            style={{
              position: 'absolute', top: 0, bottom: 0,
              left: `${sliderPos}%`, width: '3px',
              background: 'var(--gold-lt)',
              transform: 'translateX(-50%)',
              pointerEvents: 'none', zIndex: 15,
            }}
          />

          {/* Drag Knob Handle */}
          <div 
            style={{
              position: 'absolute', top: '50%',
              left: `${sliderPos}%`,
              transform: 'translate(-50%, -50%)',
              width: '56px', height: '56px', borderRadius: '50%',
              background: 'linear-gradient(180deg, var(--gold-lt), var(--gold))',
              border: '3px solid var(--navy-deep)',
              pointerEvents: 'none', zIndex: 20,
              display: 'grid', placeItems: 'center',
              boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
              color: 'var(--navy-deep)',
            }}
          >
            <ArrowLeftRight style={{ width: '1.4rem', height: '1.4rem' }} />
          </div>

          {/* Range Slider Overlay */}
          <input
            type="range"
            min="5"
            max="95"
            value={sliderPos}
            onChange={(e) => setSliderPos(Number(e.target.value))}
            style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%',
              margin: 0, opacity: 0, cursor: 'ew-resize', zIndex: 25,
            }}
            aria-label="Drag slider left or right to compare before and after"
          />
        </div>

        {/* Feature Highlights Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginTop: '2.5rem' }}>
          {workCards.map((item, idx) => (
            <div key={idx} className="frame" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ padding: '0.5rem', background: 'var(--cream-2)', borderRadius: '8px', border: '1px solid var(--cream-3)' }}>
                  {item.icon}
                </div>
                <span style={{
                  background: 'var(--navy-deep)', color: 'var(--gold-lt)',
                  fontFamily: 'var(--mono)', fontSize: '0.74rem', fontWeight: 700,
                  padding: '0.25rem 0.65rem', borderRadius: '999px', textTransform: 'uppercase',
                }}>
                  {item.tag}
                </span>
              </div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--navy-deep)', margin: 0 }}>
                {item.title}
              </h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--slate)', margin: 0, lineHeight: 1.55 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
