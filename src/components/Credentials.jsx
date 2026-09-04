import React from 'react';
import { ShieldCheck, Award, Star, FileText } from 'lucide-react';

export default function Credentials() {
  const certs = [
    {
      icon: <ShieldCheck style={{ width: '1.4rem', height: '1.4rem', color: '#0A1E42' }} />,
      title: 'Authorized System X Installer',
      desc: 'Only accredited studios can apply commercial-grade System X and register the warranty in your name.',
    },
    {
      icon: <Award style={{ width: '1.4rem', height: '1.4rem', color: '#0A1E42' }} />,
      title: 'Nano-Brite Certified Installer',
      desc: 'Certified on Nano-Brite ceramic products, providing a budget-friendly coating alongside premium lines.',
    },
    {
      icon: <Star style={{ width: '1.4rem', height: '1.4rem', color: '#0A1E42' }} />,
      title: 'Auto-Brite Certified Detailer',
      desc: 'Formal detailing certification plus specialized one-on-one multi-stage paint correction mastery.',
    },
    {
      icon: <FileText style={{ width: '1.4rem', height: '1.4rem', color: '#0A1E42' }} />,
      title: 'Registered on CARFAX Canada',
      desc: 'System X coatings are logged onto your vehicle’s official history report for verifiable resale value.',
    },
  ];

  const brandTiles = [
    {
      brand: 'AUTO-BRITE',
      label: 'Certified Detailer',
      tag: 'Professional Detailing Supplies',
    },
    {
      brand: 'NANO-BRITE',
      label: 'Certified Installer',
      tag: 'Ceramic Coating System',
      dark: true,
    },
    {
      brand: 'SYSTEM X',
      label: 'Accredited Center',
      tag: 'Ceramic Protection · USA',
      dark: true,
      gold: true,
    },
    {
      brand: 'CARFAX Canada',
      label: 'Coatings Registered',
      tag: 'Vehicle History Reports',
    },
  ];

  return (
    <section className="band" id="credentials">
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
        
        <div className="frame">
          {/* Credentials 4-Col Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
            {certs.map((c, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{
                  flexShrink: 0, width: '46px', height: '46px', borderRadius: '10px',
                  display: 'grid', placeItems: 'center',
                  background: 'linear-gradient(180deg, var(--gold-lt), var(--gold))',
                  border: '1px solid var(--gold-dk)',
                }}>
                  {c.icon}
                </div>
                <div>
                  <strong style={{ display: 'block', fontSize: '1.04rem', color: 'var(--heading-color)', marginBottom: '0.2rem' }}>
                    {c.title}
                  </strong>
                  <span style={{ display: 'block', color: 'var(--muted-color)', fontSize: '0.92rem', lineHeight: 1.5 }}>
                    {c.desc}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* 4 Brand Tiles */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
            {brandTiles.map((tile, idx) => (
              <div 
                key={idx}
                style={{
                  borderRadius: '12px',
                  border: '2px solid var(--surface-border-gold)',
                  padding: '1.6rem 1.2rem',
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center',
                  textAlign: 'center', minHeight: '150px',
                  background: tile.dark ? (tile.gold ? '#1A1A1C' : 'linear-gradient(180deg, #16386C, #0A1E42)') : 'var(--surface-card)',
                  color: tile.dark ? (tile.gold ? '#F0D590' : '#FFFFFF') : 'var(--heading-color)',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                }}
              >
                <div style={{ fontFamily: 'var(--display)', fontSize: '1.8rem', fontWeight: 900, letterSpacing: '0.04em', lineHeight: 1, marginBottom: '0.4rem' }}>
                  {tile.brand}
                </div>
                <b style={{ fontFamily: 'var(--mono)', fontSize: '0.76rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: tile.dark ? 'var(--gold-lt)' : 'var(--gold-primary)', display: 'block', marginBottom: '0.2rem' }}>
                  {tile.label}
                </b>
                <span style={{ fontSize: '0.78rem', color: tile.dark ? '#A9C4E2' : 'var(--muted-color)', opacity: 0.9 }}>
                  {tile.tag}
                </span>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
