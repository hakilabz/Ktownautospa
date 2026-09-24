import React from 'react';
import { Disc, Bug, Flame, CheckCircle } from 'lucide-react';

export default function Gallery() {
  const comparisonCards = [
    {
      src: '/images/police_footwell_before_after.webp',
      alt: 'Police vehicle driver footwell, before and after: gravel and mud on the left, clean carpet and sill on the right',
      title: 'Police Patrol Unit — Driver Footwell',
      badge: 'Before & After',
      desc: 'Gravel, heavy road salt, and winter brine on the left · Hot thermal steam extraction, spotless carpet and sill on the right.',
    },
    {
      src: '/images/ministry_pickup_cab_clean.webp',
      alt: 'Ministry pickup truck cab, before and after: debris on the mats on the left, clean on the right',
      title: 'Ministry Crew Pickup — Cabin Deep Clean',
      badge: 'Before & After',
      desc: 'Accumulated job-site gravel and clay mud on the left · Sanitized and returned to factory-correct matte finish on the right.',
    },
  ];

  const fleetPhotos = [
    {
      src: '/images/police_suv_side_bay.webp',
      alt: 'Police SUV, side view, in the wash bay',
      caption: 'Police SUV in wash bay (side view)',
    },
    {
      src: '/images/ministry_pickup_exterior.webp',
      alt: 'Ministry pickup with cap, washed, parked outside the shop',
      caption: 'Ministry fleet truck washed & ready',
    },
    {
      src: '/images/police_suv_front_bay.webp',
      alt: 'Police SUV, front view, in the wash bay',
      caption: 'Police interceptor front inspection',
    },
    {
      src: '/images/ministry_pickup_interior_clean.webp',
      alt: 'Ministry pickup cab interior after cleaning',
      caption: 'Cabin sanitized & dust-purged',
    },
  ];

  const workCards = [
    {
      title: 'High-Gloss Tire & Rim Shine',
      desc: 'Brake dust removal & deep protective silicone shine barrier restoration.',
      tag: 'Tire Shine - $10',
      icon: <Disc style={{ width: '1.25rem', height: '1.25rem', color: 'var(--water)' }} />,
    },
    {
      title: 'Front Bumper Bug & Tar Decon',
      desc: 'Specialty enzyme solvent dissolves baked-on bugs without swirl scratches.',
      tag: 'Bug Removal - $5',
      icon: <Bug style={{ width: '1.25rem', height: '1.25rem', color: 'var(--gold-primary)' }} />,
    },
    {
      title: 'Thermal Carpet & Seat Steam Extraction',
      desc: '305°F dry steam extraction pulls salt, winter brine, pet hair, and coffee stains.',
      tag: 'Full Detail Feature',
      icon: <Flame style={{ width: '1.25rem', height: '1.25rem', color: '#E65100' }} />,
    },
  ];

  return (
    <section className="band band--tint" id="work">
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
        
        {/* Section Header */}
        <div className="section-head" style={{ marginBottom: '2.5rem' }}>
          <p className="kicker">Our work &middot; Recent fleet work</p>
          <h2>Real agency vehicles detailed in our bays</h2>
          <p>
            Actual police patrol interceptors, provincial ministries, and commercial work trucks detailed in our Kingston shop bays. 100% authentic before-and-after proof — zero stock photos or AI mockups.
          </p>
        </div>

        {/* 2 Comparison Before & After Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '1.5rem', marginBottom: '1.75rem' }}>
          {comparisonCards.map((card, idx) => (
            <figure key={idx} className="frame" style={{ padding: '1rem', margin: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                  <span className="card-badge" style={{ background: 'var(--gold-primary)', color: 'var(--navy-deep)', fontWeight: 800 }}>
                    {card.badge}
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontFamily: 'var(--mono)', fontSize: '0.74rem', color: 'var(--gold-primary)', fontWeight: 700 }}>
                    <CheckCircle style={{ width: '0.85rem', height: '0.85rem' }} />
                    Kingston Shop Bay
                  </span>
                </div>
                
                <div style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--surface-border)', aspectRatio: '16/10', background: '#000' }}>
                  <img 
                    src={card.src} 
                    alt={card.alt} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              </div>

              <figcaption style={{ marginTop: '0.9rem', fontSize: '0.92rem', color: 'var(--muted-color)', lineHeight: 1.5 }}>
                <strong style={{ color: 'var(--heading-color)', display: 'block', fontSize: '1.05rem', marginBottom: '0.25rem' }}>
                  {card.title}
                </strong>
                {card.desc}
              </figcaption>
            </figure>
          ))}
        </div>

        {/* 4-Photo Real Fleet Detail Strip */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          {fleetPhotos.map((photo, idx) => (
            <figure key={idx} className="frame" style={{ padding: '0.65rem', margin: 0 }}>
              <div style={{ borderRadius: '6px', overflow: 'hidden', border: '1px solid var(--surface-border)', aspectRatio: '4/3', background: '#000' }}>
                <img src={photo.src} alt={photo.alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <figcaption style={{ marginTop: '0.55rem', fontSize: '0.82rem', color: 'var(--muted-color)', textAlign: 'center', fontWeight: 600 }}>
                {photo.caption}
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Detail Specialties Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '1.25rem', marginTop: '2.5rem', marginBottom: '1.5rem' }}>
          {workCards.map((item, idx) => (
            <div key={idx} className="frame" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: '1.4rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ padding: '0.5rem', background: 'var(--chip-inactive-bg)', borderRadius: '8px', border: '1px solid var(--surface-border)' }}>
                  {item.icon}
                </div>
                <span className="card-badge" style={{ fontSize: '0.72rem', padding: '0.25rem 0.6rem' }}>
                  {item.tag}
                </span>
              </div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--heading-color)', margin: 0 }}>
                {item.title}
              </h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--muted-color)', margin: 0, lineHeight: 1.55 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        <p style={{ fontFamily: 'var(--mono)', fontSize: '0.78rem', color: 'var(--muted-color)', margin: 0, opacity: 0.85, textAlign: 'center' }}>
          * Fleet unit numbers, license plates, and official crests have been deliberately blurred to maintain agency privacy standards.
        </p>

      </div>
    </section>
  );
}
