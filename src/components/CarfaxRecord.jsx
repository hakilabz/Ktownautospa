import React from 'react';
import { ShieldCheck, FileCheck, CheckCircle2 } from 'lucide-react';

export default function CarfaxRecord() {
  return (
    <section className="band band--deep" id="carfax">
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', alignItems: 'center' }}>
          
          {/* Document Mockup */}
          <div style={{
            background: '#FFFFFF', borderRadius: '10px', overflow: 'hidden',
            boxShadow: '0 22px 54px rgba(5, 16, 35, 0.45)', color: 'var(--ink)',
            border: '2px solid var(--gold-dk)',
          }}>
            <div style={{
              background: 'var(--cream-2)', borderBottom: '1px solid var(--cream-3)',
              padding: '0.95rem 1.25rem', fontFamily: 'var(--mono)', fontSize: '0.78rem',
              letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--slate)',
              display: 'flex', justifyContent: 'space-between', gap: '1rem',
            }}>
              <span>CARFAX Vehicle History</span>
              <span>Service Records</span>
            </div>

            <div style={{ padding: '0.6rem 1.25rem 1.25rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '1rem', padding: '0.85rem 0', borderBottom: '1px solid var(--cream-2)', alignItems: 'start' }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: '0.85rem', color: 'var(--slate)', whiteSpace: 'nowrap' }}>12 Mar 2026</span>
                <p style={{ margin: 0, fontSize: '0.96rem', color: 'var(--slate)' }}>Oil and filter changed</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '1rem', padding: '0.85rem 0', borderBottom: '1px solid var(--cream-2)', alignItems: 'start' }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: '0.85rem', color: 'var(--slate)', whiteSpace: 'nowrap' }}>04 May 2026</span>
                <p style={{ margin: 0, fontSize: '0.96rem', color: 'var(--slate)' }}>Tires rotated &amp; balanced</p>
              </div>

              {/* Highlighted Ceramic Coating Line */}
              <div style={{
                background: 'var(--water-pale)', margin: '0 -1.25rem', padding: '0.95rem 1.25rem',
                borderLeft: '5px solid var(--water)', display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '1rem', alignItems: 'start',
              }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: '0.85rem', color: 'var(--navy-deep)', fontWeight: 700, whiteSpace: 'nowrap' }}>18 Jun 2026</span>
                <div>
                  <p style={{ margin: 0, fontSize: '1.02rem', fontWeight: 800, color: 'var(--navy-deep)' }}>
                    Ceramic Coating Applied
                  </p>
                  <span style={{ display: 'block', fontFamily: 'var(--mono)', fontSize: '0.81rem', color: 'var(--water-dk)', marginTop: '0.2rem' }}>
                    System X Pro+ · Ktown Auto Spa, Kingston ON
                  </span>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '1rem', padding: '0.85rem 0', alignItems: 'start' }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: '0.85rem', color: 'var(--slate)', whiteSpace: 'nowrap' }}>02 Aug 2026</span>
                <p style={{ margin: 0, fontSize: '0.96rem', color: 'var(--slate)' }}>Annual brake inspection completed</p>
              </div>
            </div>

            <div style={{ background: 'var(--cream)', borderTop: '1px solid var(--cream-3)', padding: '0.75rem 1.25rem', fontFamily: 'var(--mono)', fontSize: '0.75rem', color: 'var(--slate)' }}>
              Official record generated via System X Accredited Installer Portal
            </div>
          </div>

          {/* Explanation Text */}
          <div>
            <p className="kicker">Why this matters</p>
            <h2 style={{ fontFamily: 'var(--display)', fontWeight: 800, textTransform: 'uppercase', fontSize: 'clamp(2.1rem, 5vw, 3.2rem)', lineHeight: 1, margin: '0.5rem 0 1rem', color: '#FFFFFF' }}>
              Anyone can say their car is coated
            </h2>
            <p style={{ color: '#CFDDEE', fontSize: '1.06rem', lineHeight: 1.65, margin: '0 0 1.2rem' }}>
              Almost nobody can prove it. There's usually no receipt in the glovebox and no way for a future buyer to verify claims — so at resale it's just a verbal promise, and it's valued as such.
            </p>
            <p style={{ color: '#CFDDEE', fontSize: '1.06rem', lineHeight: 1.65, margin: '0 0 1.2rem' }}>
              System X revolutionized this. Because Ktown Auto Spa is an accredited installation center, we register your vehicle’s VIN and warranty directly into the database. 
              The application appears on your vehicle’s official <strong>CARFAX Canada history report</strong> as a permanent service record: date, product grade, and shop location.
            </p>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '0.86rem', color: '#9FB8D4', borderLeft: '3px solid rgba(240,213,144,0.5)', paddingLeft: '1rem', marginTop: '1.5rem', lineHeight: 1.6 }}>
              Straight answers on the fine print: CARFAX updates typically register within 14–30 business days. The multi-year and lifetime warranties apply when installed by an accredited shop and maintained with periodic rinses.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
