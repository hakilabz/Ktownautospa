import React from 'react';
import { Check, Phone, Mail } from 'lucide-react';

export default function FleetsSection({ onOpenBooking }) {
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

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', alignItems: 'start' }}>
          
          {/* What We Do For Fleets */}
          <div className="frame">
            <div style={{ marginTop: '-2.6rem', marginBottom: '1.2rem' }}>
              <span className="capsule capsule--sm">What we do for fleets</span>
            </div>

            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '1.2rem' }}>
              {fleetFeatures.map((item, idx) => (
                <li key={idx} style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '0.85rem' }}>
                  <div style={{ marginTop: '2px', background: 'var(--chip-inactive-bg)', border: '1px solid var(--surface-border-gold)', borderRadius: '50%', padding: '3px', display: 'flex' }}>
                    <Check style={{ width: '1.1rem', height: '1.1rem', color: 'var(--gold-primary)' }} />
                  </div>
                  <div>
                    <strong style={{ color: 'var(--heading-color)', display: 'block', fontSize: '1.05rem', marginBottom: '0.2rem' }}>
                      {item.title}
                    </strong>
                    <span style={{ color: 'var(--muted-color)', fontSize: '0.94rem', lineHeight: 1.55 }}>
                      {item.desc}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Paying For It - Fleet Cards */}
          <div className="frame frame--navy">
            <div style={{ marginTop: '-2.6rem', marginBottom: '1.2rem' }}>
              <span className="capsule capsule--sm">Commercial Invoicing</span>
            </div>

            <h3 style={{ fontFamily: 'var(--display)', fontWeight: 800, textTransform: 'uppercase', fontSize: '1.75rem', lineHeight: 1.1, margin: '0 0 0.8rem', color: 'var(--gold-lt)' }}>
              Fleet cards work here
            </h3>
            <p style={{ color: '#CFDDEE', fontSize: '0.96rem', lineHeight: 1.6, margin: '0 0 1.2rem' }}>
              Our terminal accepts fleet cards on the Visa and Mastercard commercial networks, plus corporate credit and debit. If your department or agency runs a specific internal card, call us and we will confirm setup before your first car arrives.
            </p>

            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem', display: 'grid', gap: '0.6rem' }}>
              <li style={{ color: '#C6D8EC', paddingLeft: '1rem', borderLeft: '3px solid var(--gold)', fontSize: '0.92rem' }}>
                Purchase order (PO) numbers logged on every single invoice
              </li>
              <li style={{ color: '#C6D8EC', paddingLeft: '1rem', borderLeft: '3px solid var(--gold)', fontSize: '0.92rem' }}>
                Consolidated monthly invoicing for scheduled fleet accounts
              </li>
              <li style={{ color: '#C6D8EC', paddingLeft: '1rem', borderLeft: '3px solid var(--gold)', fontSize: '0.92rem' }}>
                HST itemized on every digital receipt
              </li>
              <li style={{ color: '#C6D8EC', paddingLeft: '1rem', borderLeft: '3px solid var(--gold)', fontSize: '0.92rem' }}>
                Unit number and license plate stamped on each work order
              </li>
            </ul>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <a href="tel:+16479153530" className="btn btn--gold" style={{ minHeight: '48px', fontSize: '0.92rem' }}>
                <Phone style={{ width: '1rem', height: '1rem' }} />
                <span>Call About Fleet Service</span>
              </a>
              <a href="mailto:ktownautomobilespa@gmail.com?subject=Fleet%20service%20inquiry" className="btn btn--cream" style={{ minHeight: '48px', fontSize: '0.92rem' }}>
                <Mail style={{ width: '1rem', height: '1rem' }} />
                <span>Email Fleet Desk</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
