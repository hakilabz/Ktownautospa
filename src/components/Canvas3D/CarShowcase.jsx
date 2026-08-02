import React from 'react';
import { Sparkles, ShieldCheck } from 'lucide-react';

export default function CarShowcase() {
  return (
    <div className="spa-card-gold" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      
      {/* Premium Car Photo Frame */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '380px',
        borderRadius: '1rem',
        overflow: 'hidden',
        background: '#020617',
        border: '1px solid rgba(255,255,255,0.08)',
      }}>
        <img 
          src="/hero-car.jpg" 
          alt="Ktown Auto Spa Premium Supercar Detailing"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
        
        {/* Subtle Dark Gradient Overlay for Depth */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(8,10,15,0.7) 0%, transparent 40%)',
          pointerEvents: 'none',
        }} />

        {/* Floating Badge */}
        <div style={{
          position: 'absolute',
          bottom: '1rem',
          left: '1rem',
          right: '1rem',
          background: 'rgba(8,10,15,0.85)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          padding: '0.75rem 1rem',
          borderRadius: '0.75rem',
          border: '1px solid rgba(234,179,8,0.3)',
          display: 'flex',
          alignItems: 'center',
          justify: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sparkles style={{ width: '1rem', height: '1rem', color: '#facc15', flexShrink: 0 }} />
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'white', letterSpacing: '0.025em' }}>
              Hand Wash Paint Protection &amp; Shine
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.625rem', color: '#67e8f9', fontWeight: 700, background: 'rgba(0,210,255,0.1)', padding: '0.25rem 0.625rem', borderRadius: '9999px', border: '1px solid rgba(0,210,255,0.3)' }}>
            <ShieldCheck style={{ width: '0.75rem', height: '0.75rem', color: '#00D2FF' }} />
            <span>100% Hand Wash</span>
          </div>
        </div>
      </div>

    </div>
  );
}
