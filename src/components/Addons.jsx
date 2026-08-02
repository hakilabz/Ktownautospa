import React from 'react';
import { Sparkles, Bug, Disc, Droplets, Sun, AlertTriangle } from 'lucide-react';

export default function Addons({ onAddonToggle, selectedAddons = [] }) {
  const addonsList = [
    {
      id: 'bug-removal',
      name: 'Bug Removal',
      price: 5,
      priceDisplay: '$5',
      icon: <Bug className="w-6 h-6 text-yellow-400" />,
      description: 'Specialized enzyme solvent dissolves dried bugs & tar from front bumper, grille & hood without scratching paint.',
      highlight: true,
      tag: 'NEW FEATURED ADD-ON',
    },
    {
      id: 'tire-shine',
      name: 'High-Gloss Tire Shine',
      price: 10,
      priceDisplay: '$10',
      icon: <Disc className="w-6 h-6 text-cyan-400" />,
      description: 'Ultra-gloss silicone wheel coat that protects rubber, restores deep jet-black finish, and repels brake dust.',
      highlight: true,
      tag: 'POPULAR ADD-ON',
    },
    {
      id: 'external-wash',
      name: 'External Wash Only',
      price: 30,
      priceDisplay: '$30',
      icon: <Droplets className="w-6 h-6 text-blue-400" />,
      description: 'Hand Car Wash, Windows Shimmied & Air Blown Dry (Exterior body & glass focus).',
      highlight: false,
    },
    {
      id: 'summer-mats',
      name: 'Summer Mats Shampoo Wash',
      price: 20,
      priceDisplay: '$20',
      icon: <Sun className="w-6 h-6 text-amber-400" />,
      description: 'Dedicated deep foam scrub & hot water rinse for summer floor mats.',
      highlight: false,
    },
    {
      id: 'heavy-surcharge',
      name: 'Kids, Pets or Work Surcharge',
      price: 50,
      priceDisplay: '+$50',
      icon: <AlertTriangle className="w-6 h-6 text-red-400" />,
      description: 'For vehicles with excessive pet hair, sand, food spills, or heavy work dirt.',
      highlight: false,
    },
  ];

  return (
    <section id="addons" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '48rem', margin: '0 auto 4rem auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(0,210,255,0.1)', border: '1px solid rgba(0,210,255,0.3)', padding: '0.5rem 1rem', borderRadius: '9999px', marginBottom: '1rem' }}>
            <Sparkles style={{ width: '1rem', height: '1rem', color: '#00D2FF' }} />
            <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#67e8f9' }}>
              Customize Your Spa Treatment
            </span>
          </div>
          <h2 style={{ fontSize: 'clamp(1.875rem, 4vw, 3rem)', fontWeight: 900, color: 'white', letterSpacing: '-0.025em' }}>
            ADDITIONAL SERVICES &amp; <span className="gold-gradient-text">EXTRAS</span>
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '1rem', marginTop: '1rem' }}>
            Enhance any package with our high-demand specialty treatments.
          </p>
        </div>

        {/* Addons Grid */}
        <div className="addons-grid-3col">
          {addonsList.map((addon) => {
            const isSelected = selectedAddons.includes(addon.id);

            return (
              <div
                key={addon.id}
                onClick={() => onAddonToggle(addon.id)}
                className={addon.highlight ? 'spa-card-gold' : 'spa-card'}
                style={{
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                  ...(isSelected ? { outline: '2px solid #facc15', outlineOffset: '-2px', background: 'rgba(234,179,8,0.1)' } : {}),
                }}
              >
                {/* Tag Badge */}
                {addon.tag && (
                  <span style={{
                    position: 'absolute', top: '-0.75rem', left: '1.5rem',
                    background: '#eab308', color: '#080a0f', fontWeight: 900,
                    fontSize: '0.625rem', padding: '0.25rem 0.75rem', borderRadius: '9999px',
                    textTransform: 'uppercase', letterSpacing: '0.05em',
                  }}>
                    {addon.tag}
                  </span>
                )}

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', paddingTop: addon.tag ? '0.5rem' : '0' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                    <div style={{ padding: '0.75rem', background: 'rgba(15,23,42,0.9)', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.08)' }}>
                      {addon.icon}
                    </div>
                    <span className={addon.highlight ? 'gold-gradient-text' : ''} style={{ fontSize: '1.5rem', fontWeight: 900, color: addon.highlight ? undefined : '#facc15' }}>
                      {addon.priceDisplay}
                    </span>
                  </div>

                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'white' }}>{addon.name}</h3>
                    <p style={{ fontSize: '0.75rem', color: '#cbd5e1', marginTop: '0.5rem', lineHeight: 1.6 }}>{addon.description}</p>
                  </div>
                </div>

                {/* Toggle Chip */}
                <div style={{ paddingTop: '1.5rem' }}>
                  <div style={{
                    width: '100%', padding: '0.625rem 0', borderRadius: '0.75rem',
                    fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase',
                    letterSpacing: '0.05em', textAlign: 'center',
                    background: isSelected ? '#facc15' : 'rgba(15,23,42,1)',
                    color: isSelected ? '#080a0f' : '#cbd5e1',
                    border: isSelected ? 'none' : '1px solid rgba(255,255,255,0.08)',
                  }}>
                    {isSelected ? '✓ Added to Custom Quote' : '+ Add to Service'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
