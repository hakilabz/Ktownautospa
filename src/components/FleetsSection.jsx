import React from 'react';
import { Check, Phone, Mail } from 'lucide-react';

export default function FleetsSection() {
  const fleetFeatures = [
    {
      title: 'Scheduled Washes',
      desc: 'Weekly, bi-weekly or monthly cycles. Guaranteed turnaround so vehicles return to road patrol or work sites on time.',
    },
    {
      title: 'Driver Compartment Cleaning',
      desc: 'Front cabin, dash, touchscreens, glass and seats kept hygienic for officers and operators who spend 10+ hours a shift in the vehicle.',
    },
    {
      title: 'Turn-In & Resale Prep',
      desc: 'Full detailing, carpet steam extraction, and machine polish before lease return or auction to prevent costly condition deductions.',
    },
    {
      title: 'Commercial Volume Pricing',
      desc: 'Accounts with five or more active fleet vehicles qualify for dedicated commercial pricing schedules. Invoiced transparently.',
    },
    {
      title: 'Work Trucks Welcome',
      desc: 'Drywall dust, heavy clay mud, concrete splatter, gravel slurry. We look after construction and trade trucks every week.',
    },
  ];

  return (
    <section className="band" id="fleets">
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
        
        {/* Section Heading */}
        <div className="section-head" style={{ marginBottom: '2.5rem' }}>
          <p className="kicker">Fleet &amp; commercial</p>
          <h2>Fleet vehicles, without the paperwork headache</h2>
          <p>
            We proudly service police patrol units, provincial ministries, healthcare fleets, and construction trucks across Kingston. Here is how our commercial program works.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '1.5rem', alignItems: 'stretch' }}>
          
          {/* What We Do For Fleets */}
          <div className="frame" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <h3 style={{ margin: 0, fontFamily: 'var(--display)', fontSize: '1.45rem', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--heading-color)' }}>
                  Fleet Capabilities
                </h3>
                <span className="card-badge">Commercial Care</span>
              </div>

              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '1.1rem' }}>
                {fleetFeatures.map((item, idx) => (
                  <li key={idx} style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '0.85rem', alignItems: 'start' }}>
                    <div className="check-badge">
                      <Check style={{ width: '13px', height: '13px', color: 'var(--gold-primary)' }} />
                    </div>
                    <div>
                      <strong style={{ color: 'var(--heading-color)', display: 'block', fontSize: '1.02rem', marginBottom: '0.2rem' }}>
                        {item.title}
                      </strong>
                      <span style={{ color: 'var(--muted-color)', fontSize: '0.92rem', lineHeight: 1.55 }}>
                        {item.desc}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Paying For It - Fleet Cards */}
          <div className="frame frame--navy" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <h3 style={{ margin: 0, fontFamily: 'var(--display)', fontSize: '1.45rem', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--gold-lt)' }}>
                  Fleet Payment
                </h3>
                <span className="card-badge" style={{ background: 'rgba(240, 213, 144, 0.2)', color: 'var(--gold-lt)', borderColor: 'var(--gold)' }}>
                  Direct Billing
                </span>
              </div>

              <h4 style={{ fontFamily: 'var(--display)', fontWeight: 800, textTransform: 'uppercase', fontSize: '1.6rem', lineHeight: 1.15, margin: '0 0 0.8rem', color: '#FFFFFF' }}>
                Fleet cards work here
              </h4>
              <p style={{ color: '#CFDDEE', fontSize: '0.94rem', lineHeight: 1.6, margin: '0 0 1.25rem' }}>
                Our terminal accepts fleet cards on the Visa and Mastercard commercial networks, plus corporate credit and debit. If your department or agency runs a specific internal card, call us and we will confirm setup before your first car arrives.
              </p>

              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem', display: 'grid', gap: '0.65rem' }}>
                <li style={{ color: '#C6D8EC', paddingLeft: '1rem', borderLeft: '3px solid var(--gold)', fontSize: '0.9rem', lineHeight: 1.45 }}>
                  Purchase order (PO) numbers logged on every single invoice
                </li>
                <li style={{ color: '#C6D8EC', paddingLeft: '1rem', borderLeft: '3px solid var(--gold)', fontSize: '0.9rem', lineHeight: 1.45 }}>
                  Consolidated monthly invoicing for scheduled fleet accounts
                </li>
                <li style={{ color: '#C6D8EC', paddingLeft: '1rem', borderLeft: '3px solid var(--gold)', fontSize: '0.9rem', lineHeight: 1.45 }}>
                  HST itemized on every digital receipt
                </li>
                <li style={{ color: '#C6D8EC', paddingLeft: '1rem', borderLeft: '3px solid var(--gold)', fontSize: '0.9rem', lineHeight: 1.45 }}>
                  Unit number and license plate stamped on each work order
                </li>
              </ul>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', borderTop: '1px dashed rgba(240, 213, 144, 0.25)', paddingTop: '1.25rem' }}>
              <a href="tel:+16479153530" className="btn btn--gold" style={{ minHeight: '46px', fontSize: '0.9rem' }}>
                <Phone style={{ width: '1rem', height: '1rem' }} />
                <span>Call About Fleet Service</span>
              </a>
              <a href="mailto:ktownautomobilespa@gmail.com?subject=Fleet%20service%20inquiry" className="btn btn--cream" style={{ minHeight: '46px', fontSize: '0.9rem' }}>
                <Mail style={{ width: '1rem', height: '1rem' }} />
                <span>Email Fleet Desk</span>
              </a>
            </div>
          </div>

        </div>

        {/* Recent Fleet Work Photographic Proof */}
        <div style={{ marginTop: '3.5rem' }}>
          <div style={{ marginBottom: '1.2rem' }}>
            <p className="kicker" style={{ margin: '0 0 0.4rem' }}>Recent fleet work</p>
            <h3 style={{ fontFamily: 'var(--display)', fontSize: '1.8rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--heading-color)', margin: 0 }}>
              Real agency vehicles detailed in our bays
            </h3>
          </div>

          {/* 2 Comparison Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
            <figure className="frame" style={{ padding: '0.85rem', margin: 0, overflow: 'hidden' }}>
              <div style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--surface-border)', aspectRatio: '16/10', background: '#000' }}>
                <img 
                  src="/images/police_footwell_before_after.webp" 
                  alt="Police vehicle driver footwell, before and after: gravel and mud on the left, clean carpet and sill on the right" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <figcaption style={{ marginTop: '0.8rem', fontSize: '0.88rem', color: 'var(--muted-color)', lineHeight: 1.45 }}>
                <strong style={{ color: 'var(--heading-color)', display: 'block', marginBottom: '0.2rem' }}>
                  Police Patrol Unit — Driver Footwell
                </strong>
                Gravel, heavy road salt, and mud on the left &middot; Hot steam extraction, clean carpet and sill on the right.
              </figcaption>
            </figure>

            <figure className="frame" style={{ padding: '0.85rem', margin: 0, overflow: 'hidden' }}>
              <div style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--surface-border)', aspectRatio: '16/10', background: '#000' }}>
                <img 
                  src="/images/ministry_pickup_cab_clean.webp" 
                  alt="Ministry pickup truck cab, before and after: debris on the mats on the left, clean on the right" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <figcaption style={{ marginTop: '0.8rem', fontSize: '0.88rem', color: 'var(--muted-color)', lineHeight: 1.45 }}>
                <strong style={{ color: 'var(--heading-color)', display: 'block', marginBottom: '0.2rem' }}>
                  Ministry Crew Pickup — Cabin Deep Clean
                </strong>
                Accumulated job-site debris and field mud on the left &middot; Returned to a factory-correct matte finish on the right.
              </figcaption>
            </figure>
          </div>

          {/* 4-Photo Fleet Strip */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1.2rem' }}>
            {[
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
            ].map((photo, idx) => (
              <figure key={idx} className="frame" style={{ padding: '0.6rem', margin: 0 }}>
                <div style={{ borderRadius: '6px', overflow: 'hidden', border: '1px solid var(--surface-border)', aspectRatio: '4/3', background: '#000' }}>
                  <img src={photo.src} alt={photo.alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <figcaption style={{ marginTop: '0.5rem', fontSize: '0.78rem', color: 'var(--muted-color)', textAlign: 'center', fontWeight: 600 }}>
                  {photo.caption}
                </figcaption>
              </figure>
            ))}
          </div>

          <p style={{ fontFamily: 'var(--mono)', fontSize: '0.78rem', color: 'var(--muted-color)', margin: 0, opacity: 0.85 }}>
            * Fleet unit numbers, license plates, and official crests have been deliberately blurred to maintain agency privacy standards.
          </p>
        </div>

      </div>
    </section>
  );
}
