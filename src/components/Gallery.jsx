import React, { useState } from 'react';
import { Sparkles, ArrowLeftRight, Disc, Bug, Flame } from 'lucide-react';

export default function Gallery() {
  const [sliderPos, setSliderPos] = useState(50);

  const galleryItems = [
    {
      title: 'High-Gloss Tire & Rim Shine',
      desc: 'Brake dust removal & $10 deep silicone shine coat restoration.',
      tag: 'Tire Shine - $10',
      icon: <Disc style={{ width: '1.25rem', height: '1.25rem', color: 'var(--cyan-glow)' }} />,
    },
    {
      title: 'Front Bumper Bug & Tar Removal',
      desc: 'Enzyme solvent dissolves highway bugs without paint swirl scratches.',
      tag: 'Bug Removal - $5',
      icon: <Bug style={{ width: '1.25rem', height: '1.25rem', color: 'var(--gold-primary)' }} />,
    },
    {
      title: 'Deep Carpet & Seat Steam Clean',
      desc: 'Hot thermal steam extraction removes salt, mud, pet hair & food stains.',
      tag: 'Full Detail Feature',
      icon: <Flame style={{ width: '1.25rem', height: '1.25rem', color: '#f59e0b' }} />,
    },
  ];

  return (
    <section style={{ padding: '6rem 0', background: 'var(--section-alt-bg)', position: 'relative' }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1rem' }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '48rem', margin: '0 auto 4rem auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(212,175,55,0.12)', border: '1px solid rgba(212,175,55,0.4)', padding: '0.5rem 1rem', borderRadius: '9999px', marginBottom: '1rem' }}>
            <Sparkles style={{ width: '1rem', height: '1rem', color: 'var(--gold-primary)' }} />
            <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--gold-primary)' }}>
              Proven Results &amp; Craftsmanship
            </span>
          </div>
          <h2 style={{ fontSize: 'clamp(1.875rem, 4vw, 3rem)', fontWeight: 900, color: 'var(--text-main)', letterSpacing: '-0.025em' }}>
            BEFORE &amp; AFTER <span className="gold-gradient-text">TRANSFORMATIONS</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginTop: '1rem' }}>
            Drag the slider below to witness the mirror-finish shine produced by Ktown Auto Spa.
          </p>
        </div>

        {/* Interactive Before / After Photo Slider */}
        <div className="spa-card-gold" style={{ maxWidth: '64rem', margin: '0 auto 3rem auto', overflow: 'hidden', padding: '1rem' }}>
          <div style={{ position: 'relative', height: '420px', borderRadius: '1rem', overflow: 'hidden', userSelect: 'none', background: '#020617', border: '1px solid var(--card-border)' }}>
            
            {/* AFTER: Clean Car Photo (Full Container) */}
            <div style={{ position: 'absolute', inset: 0 }}>
              <img 
                src="/car-after.jpg" 
                alt="After Detailing - Clean Glossy Car"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
              <div style={{
                position: 'absolute', bottom: '1.25rem', right: '1.25rem',
                background: 'rgba(8,10,15,0.88)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
                padding: '0.5rem 1rem', borderRadius: '9999px', border: '1px solid rgba(212,175,55,0.5)',
                fontSize: '0.75rem', fontWeight: 900, color: '#fde047', textTransform: 'uppercase',
                display: 'flex', alignItems: 'center', gap: '0.5rem',
              }}>
                <Sparkles style={{ width: '0.875rem', height: '0.875rem', color: '#facc15' }} />
                <span>AFTER: KTOWN AUTO SPA SHINE ✨</span>
              </div>
            </div>

            {/* BEFORE: Dirty Car Photo (Clipped by sliderPos %) */}
            <div style={{
              position: 'absolute', top: 0, bottom: 0, left: 0,
              width: `${sliderPos}%`, overflow: 'hidden', borderRight: '3px solid #facc15',
            }}>
              <img 
                src="/car-before.jpg" 
                alt="Before Detailing - Muddy Dirty Car"
                style={{
                  width: '100%', height: '100%', objectFit: 'cover', display: 'block',
                  minWidth: '64rem',
                }}
              />
              <div style={{
                position: 'absolute', bottom: '1.25rem', left: '1.25rem',
                background: 'rgba(8,10,15,0.88)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
                padding: '0.5rem 1rem', borderRadius: '9999px', border: '1px solid rgba(239,68,68,0.5)',
                fontSize: '0.75rem', fontWeight: 900, color: '#fca5a5', textTransform: 'uppercase',
                whiteSpace: 'nowrap',
              }}>
                <span>BEFORE: MUD, BUGS &amp; ROAD DIRT 🚗💦</span>
              </div>
            </div>

            {/* Slider Handle */}
            <div style={{
              position: 'absolute', top: 0, bottom: 0, left: `${sliderPos}%`,
              width: '4px', background: '#facc15', cursor: 'ew-resize',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transform: 'translateX(-50%)', zIndex: 10,
              boxShadow: '0 0 12px rgba(250,204,21,0.8)',
            }}>
              <div style={{
                width: '2.5rem', height: '2.5rem', background: '#facc15', color: '#080a0f',
                borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 16px rgba(0,0,0,0.6)', border: '2px solid #080a0f',
              }}>
                <ArrowLeftRight style={{ width: '1.125rem', height: '1.125rem' }} />
              </div>
            </div>

            {/* Range Slider Overlay */}
            <input
              type="range"
              min="2"
              max="98"
              value={sliderPos}
              onChange={(e) => setSliderPos(e.target.value)}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0, cursor: 'ew-resize', zIndex: 20 }}
            />
          </div>

          <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            <span>← Slide left to reveal BEFORE muddy condition</span>
            <span style={{ color: 'var(--gold-primary)', fontWeight: 800 }}>Slide Position: {sliderPos}%</span>
            <span>Slide right to reveal AFTER spa mirror shine →</span>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="matrix-grid-3col">
          {galleryItems.map((item, idx) => (
            <div key={idx} className="spa-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ padding: '0.625rem', background: 'var(--input-bg)', borderRadius: '0.75rem', border: '1px solid var(--card-border)' }}>
                  {item.icon}
                </div>
                <span style={{ background: 'rgba(212,175,55,0.15)', color: 'var(--gold-primary)', border: '1px solid rgba(212,175,55,0.4)', fontSize: '0.625rem', fontWeight: 800, padding: '0.25rem 0.625rem', borderRadius: '9999px', textTransform: 'uppercase' }}>
                  {item.tag}
                </span>
              </div>
              <h4 style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--text-main)' }}>{item.title}</h4>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{item.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
