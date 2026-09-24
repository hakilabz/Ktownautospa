import React from 'react';
import { Anchor, Phone, MessageCircle, Waves } from 'lucide-react';

export default function BoatsSection() {
  return (
    <section className="band band--deep" id="boats">
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '2.5rem', alignItems: 'center' }}>
          
          <div>
            <p className="kicker">Boats &amp; marine</p>
            <h2 style={{ fontFamily: 'var(--display)', fontWeight: 800, textTransform: 'uppercase', fontSize: 'clamp(2.2rem, 5.4vw, 3.4rem)', lineHeight: 1, margin: '0.6rem 0 1rem', color: '#FFFFFF' }}>
              We come to your boat
            </h2>
            <p style={{ color: '#CFDDEE', fontSize: '1.08rem', margin: '0 0 1.4rem', maxWidth: '52ch', lineHeight: 1.6 }}>
              Hull and topside washing, and ceramic coating for the topsides, performed directly at your slip across Kingston marinas. You don't trailer anything anywhere — tell us which marina and we bring the water, power, and marine gear.
            </p>

            <ul style={{ listStyle: 'none', margin: '0 0 1.5rem', padding: 0, display: 'grid', gap: '0.85rem' }}>
              <li style={{ color: '#C6D8EC', paddingLeft: '1.1rem', borderLeft: '3px solid var(--gold)', lineHeight: 1.55 }}>
                <strong style={{ color: '#FFFFFF' }}>Wash at the marina.</strong> Topsides, deck, hardware, glass, and canvas. Lake scum, spider droppings, and waterline algae eradicated properly, not just rinsed off.
              </li>
              <li style={{ color: '#C6D8EC', paddingLeft: '1.1rem', borderLeft: '3px solid var(--gold)', lineHeight: 1.55 }}>
                <strong style={{ color: '#FFFFFF' }}>Topside ceramic coating.</strong> Marine gel-coat oxidizes and chalks rapidly under UV sun. A specialized marine ceramic coating locks in high gloss, repels scum, and cuts maintenance wash times in half.
              </li>
              <li style={{ color: '#C6D8EC', paddingLeft: '1.1rem', borderLeft: '3px solid var(--gold)', lineHeight: 1.55 }}>
                <strong style={{ color: '#FFFFFF' }}>System X Marine Line.</strong> Chemical formulas engineered explicitly for high-temperature UV exposure, gel-coat porosity, and saltwater/freshwater friction.
              </li>
            </ul>

            <div style={{ color: '#9FB8D4', fontFamily: 'var(--mono)', fontSize: '0.9rem', lineHeight: 1.55, margin: '0 0 1.5rem', borderLeft: '3px solid rgba(240,213,144,0.5)', paddingLeft: '1rem' }}>
              Marine projects are quoted individually based on length, hull type, and gel-coat condition. Call or WhatsApp with your boat’s length and 2–3 photos and we will reply with an estimate the same day.
            </div>

            <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
              <a href="tel:+16479153530" className="btn btn--gold">
                <Phone style={{ width: '1.1rem', height: '1.1rem' }} />
                <span>Call 647-915-3530</span>
              </a>
              <a 
                href="https://wa.me/16479153530?text=Hi%2C%20I%27d%20like%20a%20quote%20for%20my%20boat.%20It%27s%20a%20" 
                target="_blank" 
                rel="noopener" 
                className="btn btn--wa"
              >
                <MessageCircle style={{ width: '1.1rem', height: '1.1rem' }} />
                <span>WhatsApp a Photo of Your Boat</span>
              </a>
            </div>
          </div>

          {/* Marine Callout Box */}
          <div className="frame" style={{ background: 'linear-gradient(180deg, #16386C, #0A1E42)', borderColor: 'var(--gold)', color: '#FFFFFF' }}>
            <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
              <Waves style={{ width: '2.5rem', height: '2.5rem', color: '#7FC4EE', margin: '0 auto 0.5rem' }} />
              <h3 style={{ fontFamily: 'var(--display)', fontSize: '1.75rem', fontWeight: 800, color: '#FFFFFF', textTransform: 'uppercase', margin: 0 }}>
                Kingston Marinas Served
              </h3>
              <p style={{ color: '#A9C4E2', fontSize: '0.88rem', margin: '0.4rem 0 0' }}>
                Full mobile water &amp; generator setup brought to your dock
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 130px), 1fr))', gap: '0.75rem', marginBottom: '1.25rem' }}>
              {[
                'Portsmouth Olympic Harbour',
                'Kingston Marina',
                'Collins Bay Marina',
                'Confederation Basin Marina',
                'Rideau Marina',
                'Loyalist Cove Marina (Bath)',
              ].map((m, idx) => (
                <div key={idx} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(240,213,144,0.3)', borderRadius: '8px', padding: '0.6rem 0.8rem', fontSize: '0.8rem', color: '#E4EDF7', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <Anchor style={{ width: '0.85rem', height: '0.85rem', color: 'var(--gold-lt)', flexShrink: 0 }} />
                  <span>{m}</span>
                </div>
              ))}
            </div>

            <p style={{ fontFamily: 'var(--mono)', fontSize: '0.78rem', color: 'var(--gold-lt)', textAlign: 'center', margin: 0 }}>
              Fully Insured for Marina On-Site Operations
            </p>
          </div>

        </div>

        {/* Real Marina Detailing Photographic Proof */}
        <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid rgba(240,213,144,0.2)' }}>
          <p className="kicker" style={{ color: 'var(--gold-lt)', marginBottom: '0.5rem' }}>Slip-side results</p>
          <h3 style={{ fontFamily: 'var(--display)', fontSize: '1.8rem', fontWeight: 800, textTransform: 'uppercase', color: '#FFFFFF', margin: '0 0 1.2rem' }}>
            Cruiser Foredeck Scrub &amp; Gel-Coat Restoration
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '1.5rem' }}>
            <figure className="frame" style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(240,213,144,0.3)', padding: '0.85rem', margin: 0 }}>
              <div style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(240,213,144,0.3)', aspectRatio: '16/10', background: '#000' }}>
                <img 
                  src="/images/boat_foredeck_midwash.webp" 
                  alt="Foredeck of a cruiser mid-wash at a Kingston marina, brush and bucket on the deck" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <figcaption style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: '#CFDDEE', lineHeight: 1.45 }}>
                <strong style={{ color: '#FFFFFF', display: 'block', marginBottom: '0.2rem' }}>
                  Step 1: Deep Foam Decontamination
                </strong>
                Mid-wash scrub at Kingston marina dock — removing persistent lake scum, bird lime, and marine oxidation.
              </figcaption>
            </figure>

            <figure className="frame" style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(240,213,144,0.3)', padding: '0.85rem', margin: 0 }}>
              <div style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(240,213,144,0.3)', aspectRatio: '16/10', background: '#000' }}>
                <img 
                  src="/images/boat_foredeck_finished.webp" 
                  alt="The same foredeck finished, gel-coat clean and glossy" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <figcaption style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: '#CFDDEE', lineHeight: 1.45 }}>
                <strong style={{ color: 'var(--gold-lt)', display: 'block', marginBottom: '0.2rem' }}>
                  Step 2: Finished Gel-Coat Gloss
                </strong>
                Clean, slick, and protected with hydrophobic marine barrier that repels water stains and sun chalking.
              </figcaption>
            </figure>
          </div>
        </div>

      </div>
    </section>
  );
}
