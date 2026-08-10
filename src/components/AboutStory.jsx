import React from 'react';
import { ShieldCheck, HeartHandshake, Snowflake, Sparkles, Award, MapPin, CheckCircle2 } from 'lucide-react';

export default function AboutStory() {
  const serviceAreas = ['Kingston', 'Amherstview', 'Bath', 'Odessa', 'Napanee', 'Loyalist Township'];

  const pillars = [
    {
      icon: <Award style={{ width: '1.5rem', height: '1.5rem', color: 'var(--gold-primary)' }} />,
      title: 'Patience & Precision Over Volume',
      desc: 'Founded on unhurried, deliberate attention. Every vehicle enters our bay to be preserved as a fine finish, not merely rushed through a high-volume process.',
    },
    {
      icon: <ShieldCheck style={{ width: '1.5rem', height: '1.5rem', color: 'var(--cyan-glow)' }} />,
      title: 'Insured & Certified Standards',
      desc: 'Fully insured and certified automotive appearance specialists utilizing pH-neutral chemistry, dedicated wash media, and strict two-bucket methods.',
    },
    {
      icon: <Snowflake style={{ width: '1.5rem', height: '1.5rem', color: '#38bdf8' }} />,
      title: 'Eastern Ontario Salt & Climate Defense',
      desc: 'Specialized seasonal salt-stain remediation, brine neutralization, and undercarriage flushing tailored specifically to withstand severe Kingston winters.',
    },
  ];

  return (
    <section id="about" style={{ padding: '6rem 0', background: 'var(--bg-page)', position: 'relative', borderTop: '1px solid var(--card-border)' }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1rem' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '52rem', margin: '0 auto 4rem auto' }}>
          <div className="section-badge-pill">
            <HeartHandshake style={{ width: '1rem', height: '1rem', color: 'var(--gold-primary)' }} />
            <span className="section-badge-text">
              New Car Wash In Town • Support Local Kingston
            </span>
          </div>
          <h2 style={{ fontSize: 'clamp(1.875rem, 4vw, 3rem)', fontWeight: 900, color: 'var(--text-main)', letterSpacing: '-0.025em', lineHeight: 1.15 }}>
            THE DISCIPLINE OF <span className="gold-gradient-text">AUTOMOTIVE CRAFTSMANSHIP</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.0625rem', marginTop: '1.25rem', lineHeight: 1.7 }}>
            Ktown Auto Spa is a meticulous automotive appearance studio serving Kingston, Amherstview, and the surrounding communities of Loyalist Township. 
            We are a locally owned operation accountable to our neighbours, where our reputation rests entirely on the standard of work we return to your driveway.
          </p>
        </div>

        {/* 3 Core Pillars */}
        <div className="matrix-grid-3col" style={{ marginBottom: '3.5rem' }}>
          {pillars.map((item, idx) => (
            <div key={idx} className="spa-card-gold" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ padding: '0.75rem', background: 'var(--input-bg)', borderRadius: '1rem', border: '1px solid var(--card-border)', width: 'fit-content' }}>
                {item.icon}
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>{item.title}</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Deep Dive Story Cards (Interior Restorative & Exterior Refinement) */}
        <div className="services-grid-2col" style={{ gap: '2rem', marginBottom: '3.5rem' }}>
          
          {/* Restorative Interior Detail */}
          <div className="spa-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ padding: '0.5rem', background: 'rgba(212,175,55,0.15)', color: 'var(--gold-primary)', borderRadius: '0.75rem' }}>
                <Sparkles style={{ width: '1.25rem', height: '1.25rem' }} />
              </div>
              <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>Restorative Interior Decontamination</h4>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
              Our interior work is restorative in nature. Cabins are systematically decontaminated — carpets and upholstery extracted, leather conditioned, vents purged of embedded particulate, and hard surfaces returned to a <strong>factory-correct matte finish</strong> rather than an artificial gloss.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--gold-primary)', fontWeight: 700 }}>
              <span>✓ Pet Hair &amp; Salt Extraction</span>
              <span>•</span>
              <span>✓ Spill &amp; Odor Neutralization</span>
              <span>•</span>
              <span>✓ Non-Greasy Factory Finish</span>
            </div>
          </div>

          {/* Exterior Discipline & Ceramic Protection */}
          <div className="spa-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ padding: '0.5rem', background: 'rgba(2,132,199,0.15)', color: 'var(--cyan-glow)', borderRadius: '0.75rem' }}>
                <ShieldCheck style={{ width: '1.25rem', height: '1.25rem' }} />
              </div>
              <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>Exterior Refinement &amp; Paint Protection</h4>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
              We perform staged chemical decontamination, iron removal, machine polishing, and paint correction. Protection ranges from durable seasonal sealants to high-grade ceramic coatings that shield clear coat against UV oxidation, road salt, and harsh Eastern Ontario winter grit.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--cyan-glow)', fontWeight: 700 }}>
              <span>✓ pH-Neutral 2-Bucket Hand Wash</span>
              <span>•</span>
              <span>✓ Zero Brush Swirl Marks</span>
              <span>•</span>
              <span>✓ Ceramic Clear Protection</span>
            </div>
          </div>

        </div>

        {/* Local Service Area Banner */}
        <div className="spa-card-gold" style={{ textAlign: 'center', padding: '2.5rem 1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--gold-primary)', fontWeight: 800, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            <MapPin style={{ width: '1rem', height: '1rem' }} />
            <span>Serving Private Owners, Collectors, Fleets &amp; Resale Preparation</span>
          </div>
          <h3 style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)', fontWeight: 900, color: 'var(--text-main)' }}>
            PROUDLY SERVING KINGSTON &amp; SURROUNDING COMMUNITIES
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.75rem', marginTop: '0.5rem' }}>
            {serviceAreas.map((area, idx) => (
              <span key={idx} style={{ background: 'var(--input-bg)', border: '1px solid var(--card-border)', padding: '0.5rem 1rem', borderRadius: '9999px', fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-main)' }}>
                📍 {area}
              </span>
            ))}
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', maxWidth: '36rem', marginTop: '0.5rem' }}>
            Fully Insured &amp; Certified • Accountable Local Business • 100% Satisfaction Hand-Finished Guarantee
          </p>
        </div>

      </div>
    </section>
  );
}
