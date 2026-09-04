import React from 'react';
import { ShieldCheck, Check, AlertTriangle, Droplets, Sparkles } from 'lucide-react';

export default function CoatingSection({ onOpenBooking }) {
  return (
    <section className="band band--tint" id="coating">
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
        
        {/* Section Heading */}
        <div className="section-head" style={{ marginBottom: '2.5rem' }}>
          <p className="kicker">Paint protection</p>
          <h2>Correction &amp; ceramic coating</h2>
          <p>
            Beyond washing and detailing. These are quoted after we look at your paint, because the condition it starts in decides the work.
          </p>
        </div>

        {/* 3 Protection Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          
          {/* Paint Correction */}
          <article className="frame" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{
                background: '#0C0C0E', border: '2px solid var(--gold-dk)', borderRadius: '10px',
                padding: '1.25rem', marginBottom: '1.2rem', textAlign: 'center', color: '#FFFFFF',
              }}>
                <Sparkles style={{ width: '2rem', height: '2rem', color: 'var(--gold-lt)', margin: '0 auto 0.4rem' }} />
                <span style={{ fontFamily: 'var(--mono)', fontSize: '0.78rem', letterSpacing: '0.12em', color: 'var(--gold-lt)', textTransform: 'uppercase', display: 'block' }}>
                  System X Correct System
                </span>
                <span style={{ fontSize: '0.75rem', color: '#A9C4E2' }}>Heavy Cut · One-Step · Fine Polish</span>
              </div>

              <h3 style={{ fontFamily: 'var(--display)', fontWeight: 800, textTransform: 'uppercase', fontSize: '1.75rem', lineHeight: 1, margin: '0 0 0.65rem', color: 'var(--navy-deep)' }}>
                Paint Correction
              </h3>
              <p style={{ margin: '0 0 0.9rem', color: 'var(--slate)', fontSize: '0.94rem', lineHeight: 1.6 }}>
                Machine polishing that permanently removes swirl marks, wash scratches and oxidation from the clear coat. We run the System X Correct compound suite so we can precisely match the pad and abrasive aggressiveness to your vehicle’s factory paint thickness.
              </p>
              <p style={{ fontFamily: 'var(--mono)', fontSize: '0.84rem', color: 'var(--water-dk)', margin: '0 0 1rem' }}>
                1–2 days · Quoted after digital depth measurement
              </p>
            </div>

            <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px dashed var(--cream-3)', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
              <div>
                <b style={{ fontFamily: 'var(--display)', fontWeight: 800, fontSize: '1.75rem', color: 'var(--water-dk)' }}>from $350</b>
                <span style={{ fontFamily: 'var(--mono)', fontSize: '0.76rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--slate)', marginLeft: '0.4rem' }}>
                  1-step
                </span>
              </div>
              <button onClick={onOpenBooking} className="btn btn--outline" style={{ minHeight: '40px', padding: '0 1rem', fontSize: '0.85rem' }}>
                Inquire
              </button>
            </div>
          </article>

          {/* Nano-Brite Coating */}
          <article className="frame" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{
                background: 'linear-gradient(180deg, #16386C, #0A1E42)', border: '2px solid var(--gold)', borderRadius: '10px',
                padding: '1.25rem', marginBottom: '1.2rem', textAlign: 'center', color: '#FFFFFF',
              }}>
                <ShieldCheck style={{ width: '2rem', height: '2rem', color: '#3E9BDA', margin: '0 auto 0.4rem' }} />
                <span style={{ fontFamily: 'var(--mono)', fontSize: '0.78rem', letterSpacing: '0.12em', color: 'var(--gold-lt)', textTransform: 'uppercase', display: 'block' }}>
                  Nano-Brite Ceramic
                </span>
                <span style={{ fontSize: '0.75rem', color: '#A9C4E2' }}>1, 3 &amp; 7 Year Protection</span>
              </div>

              <h3 style={{ fontFamily: 'var(--display)', fontWeight: 800, textTransform: 'uppercase', fontSize: '1.75rem', lineHeight: 1, margin: '0 0 0.65rem', color: 'var(--navy-deep)' }}>
                Nano-Brite Coating
              </h3>
              <p style={{ margin: '0 0 0.9rem', color: 'var(--slate)', fontSize: '0.94rem', lineHeight: 1.6 }}>
                Our budget-friendly ceramic coating. Genuine ceramic protection, brilliant hydrophobics, and water beading at a lower entry price. An ideal sensible option for daily commuters or vehicles on a shorter lease ownership cycle.
              </p>
              <p style={{ fontFamily: 'var(--mono)', fontSize: '0.84rem', color: 'var(--water-dk)', margin: '0 0 1rem' }}>
                About 1 day · Entry-level ceramic protection
              </p>
            </div>

            <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px dashed var(--cream-3)', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
              <div>
                <b style={{ fontFamily: 'var(--display)', fontWeight: 800, fontSize: '1.75rem', color: 'var(--water-dk)' }}>from $449</b>
                <span style={{ fontFamily: 'var(--mono)', fontSize: '0.76rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--slate)', marginLeft: '0.4rem' }}>
                  1, 3 or 7 yr
                </span>
              </div>
              <button onClick={onOpenBooking} className="btn btn--outline" style={{ minHeight: '40px', padding: '0 1rem', fontSize: '0.85rem' }}>
                Inquire
              </button>
            </div>
          </article>

          {/* System X Ceramic Lead Card */}
          <article className="frame" style={{
            background: 'linear-gradient(180deg, #FFFFFF, var(--cream))',
            border: '2px solid var(--gold-dk)',
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            position: 'relative',
          }}>
            <div style={{
              position: 'absolute', top: '-14px', left: '1.5rem',
              background: 'var(--navy-deep)', color: 'var(--gold-lt)',
              fontFamily: 'var(--mono)', fontSize: '0.74rem', letterSpacing: '0.12em',
              textTransform: 'uppercase', padding: '0.35rem 0.85rem', borderRadius: '999px',
            }}>
              Registered on CARFAX Canada
            </div>

            <div>
              <div style={{
                background: '#1A1A1C', border: '2px solid var(--gold)', borderRadius: '10px',
                padding: '1.25rem', marginBottom: '1.2rem', marginTop: '0.5rem', textAlign: 'center', color: '#FFFFFF',
              }}>
                <ShieldCheck style={{ width: '2rem', height: '2rem', color: 'var(--gold-lt)', margin: '0 auto 0.4rem' }} />
                <span style={{ fontFamily: 'var(--mono)', fontSize: '0.78rem', letterSpacing: '0.12em', color: 'var(--gold-lt)', textTransform: 'uppercase', display: 'block' }}>
                  System X Premium Ceramic
                </span>
                <span style={{ fontSize: '0.75rem', color: '#A9C4E2' }}>Lifetime · Max G+ · Pro+ · Crystal+</span>
              </div>

              <h3 style={{ fontFamily: 'var(--display)', fontWeight: 800, textTransform: 'uppercase', fontSize: '1.75rem', lineHeight: 1, margin: '0 0 0.65rem', color: 'var(--navy-deep)' }}>
                System X Ceramic Coating
              </h3>
              <p style={{ margin: '0 0 0.9rem', color: 'var(--slate)', fontSize: '0.94rem', lineHeight: 1.6 }}>
                The gold standard in automotive surface science. System X bonds on a molecular level to clear coat, creating a sacrificial, ultra-glossy 9H ceramic shield. Salt, corrosive winter brine, and environmental fallout rinse off with ease.
              </p>
              <p style={{ margin: '0 0 0.9rem', color: 'var(--slate)', fontSize: '0.94rem', lineHeight: 1.6 }}>
                Packages include paint, glass, wheels, and complete interior leather/textile protection. <strong>Every install includes warranty registration logged on your vehicle’s CARFAX Canada report.</strong>
              </p>
              <p style={{ fontFamily: 'var(--mono)', fontSize: '0.84rem', color: 'var(--water-dk)', margin: '0 0 1rem' }}>
                Crystal+ (2yr) · Pro+ (6yr) · Max G+ (10yr) · Diamond SS (Lifetime)
              </p>
            </div>

            <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px dashed var(--cream-3)', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
              <div>
                <b style={{ fontFamily: 'var(--display)', fontWeight: 800, fontSize: '1.75rem', color: 'var(--water-dk)' }}>from $949</b>
                <span style={{ fontFamily: 'var(--mono)', fontSize: '0.76rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--slate)', marginLeft: '0.4rem' }}>
                  includes CARFAX
                </span>
              </div>
              <button onClick={onOpenBooking} className="btn btn--gold" style={{ minHeight: '40px', padding: '0 1.2rem', fontSize: '0.85rem' }}>
                Reserve
              </button>
            </div>
          </article>

        </div>

        {/* What a Ceramic Coating is, and What It Isn't (Two Column Facts) */}
        <div className="frame" id="why">
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <p className="kicker">Straight answers</p>
            <h3 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(1.7rem, 4vw, 2.3rem)', fontWeight: 800, textTransform: 'uppercase', color: 'var(--navy-deep)', margin: 0 }}>
              What a ceramic coating is, and what it isn't
            </h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            
            {/* Left Column */}
            <div style={{ display: 'grid', gap: '1.25rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '0.85rem' }}>
                <Check style={{ width: '1.2rem', height: '1.2rem', color: 'var(--gold-dk)', marginTop: '3px' }} />
                <div>
                  <strong style={{ color: 'var(--navy-deep)', display: 'block', marginBottom: '0.2rem' }}>It's a second clear coat, not a wax</strong>
                  <span style={{ color: 'var(--slate)', fontSize: '0.94rem', lineHeight: 1.55 }}>
                    A wax sits loosely on top and washes away in a few months. A ceramic coating bonds chemically to the paint and becomes part of the permanent surface.
                  </span>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '0.85rem' }}>
                <Check style={{ width: '1.2rem', height: '1.2rem', color: 'var(--gold-dk)', marginTop: '3px' }} />
                <div>
                  <strong style={{ color: 'var(--navy-deep)', display: 'block', marginBottom: '0.2rem' }}>It won't stop a shopping cart</strong>
                  <span style={{ color: 'var(--slate)', fontSize: '0.94rem', lineHeight: 1.55 }}>
                    It resists light wash swirls and road grit. It is not armor, and anyone who claims a coating prevents door dings or key scratches is overselling it.
                  </span>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '0.85rem' }}>
                <Check style={{ width: '1.2rem', height: '1.2rem', color: 'var(--gold-dk)', marginTop: '3px' }} />
                <div>
                  <strong style={{ color: 'var(--navy-deep)', display: 'block', marginBottom: '0.2rem' }}>The prep is most of the job</strong>
                  <span style={{ color: 'var(--slate)', fontSize: '0.94rem', lineHeight: 1.55 }}>
                    The coating seals in whatever is underneath. That's why multi-stage paint correction comes first — coating over swirl marks locks them in for years.
                  </span>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '0.85rem' }}>
                <Check style={{ width: '1.2rem', height: '1.2rem', color: 'var(--gold-dk)', marginTop: '3px' }} />
                <div>
                  <strong style={{ color: 'var(--navy-deep)', display: 'block', marginBottom: '0.2rem' }}>It needs a day or two to cure</strong>
                  <span style={{ color: 'var(--slate)', fontSize: '0.94rem', lineHeight: 1.55 }}>
                    Keep the vehicle out of rain and away from water hoses for the initial 24 to 48 hours after application while the nanostructures cure.
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div style={{ display: 'grid', gap: '1.25rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '0.85rem' }}>
                <Check style={{ width: '1.2rem', height: '1.2rem', color: 'var(--water)', marginTop: '3px' }} />
                <div>
                  <strong style={{ color: 'var(--navy-deep)', display: 'block', marginBottom: '0.2rem' }}>Wash it every couple of weeks</strong>
                  <span style={{ color: 'var(--slate)', fontSize: '0.94rem', lineHeight: 1.55 }}>
                    Mild pH-neutral soap, two buckets, top down so the dirtiest rocker panels come last. That's the entire maintenance routine.
                  </span>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '0.85rem' }}>
                <Check style={{ width: '1.2rem', height: '1.2rem', color: 'var(--water)', marginTop: '3px' }} />
                <div>
                  <strong style={{ color: 'var(--navy-deep)', display: 'block', marginBottom: '0.2rem' }}>Stay out of automatic brush washes</strong>
                  <span style={{ color: 'var(--slate)', fontSize: '0.94rem', lineHeight: 1.55 }}>
                    Spinning abrasive brush tunnels are what put swirl scratches there in the first place. Avoid harsh acid wheel cleaners as well.
                  </span>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '0.85rem' }}>
                <Check style={{ width: '1.2rem', height: '1.2rem', color: 'var(--water)', marginTop: '3px' }} />
                <div>
                  <strong style={{ color: 'var(--navy-deep)', display: 'block', marginBottom: '0.2rem' }}>Deal with bird droppings promptly</strong>
                  <span style={{ color: 'var(--slate)', fontSize: '0.94rem', lineHeight: 1.55 }}>
                    Soak with water and gently wipe with microfiber. Never scrape dry droppings, and avoid leaving acidic bird residue baking in hot sun.
                  </span>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '0.85rem' }}>
                <Check style={{ width: '1.2rem', height: '1.2rem', color: 'var(--water)', marginTop: '3px' }} />
                <div>
                  <strong style={{ color: 'var(--navy-deep)', display: 'block', marginBottom: '0.2rem' }}>Water beading means it's working</strong>
                  <span style={{ color: 'var(--slate)', fontSize: '0.94rem', lineHeight: 1.55 }}>
                    If water beads tightly and rolls off in spheres, the coating is healthy. If water starts sheeting flat, bring it in for our maintenance decontamination wash.
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
