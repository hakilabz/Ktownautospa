import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const FAQ_ITEMS = [
  {
    q: 'How much does car detailing cost in Kingston, Ontario at K-Town Auto Spa?',
    a: 'At K-Town Auto Spa (36 Joseph St, Kingston, ON), hand car washes start at $30 for sedans ($40 crossovers, $45 3-row SUVs, $55 vans). Interior & Exterior Combo washes start at $85, Interior Complete detailing starts at $150, and Complete Detailing Packages (Silver, Gold, and Diamond) range from $199 to $449 depending on vehicle size and package tier.',
  },
  {
    q: 'How much does ceramic coating cost in Kingston, and what brands do you install?',
    a: 'We are an authorized installer for both Nano-Brite and System X Ceramic Coatings. Entry-level Nano-Brite Pro (1-Year) starts at $449 and Nano-Brite Ultra (2-Year) starts at $649. System X CARFAX-registered ceramic coatings start at $749 for System X Crystal SS (2-Year), $949 for System X Pro (6-Year), $1,349 for System X Max (10-Year), and $1,549 for System X Max G+ (Lifetime Warranty). Every full ceramic coating package includes a 1-Stage Polish and Exterior Detail.',
  },
  {
    q: 'Is my ceramic coating registered on CARFAX Canada?',
    a: 'Yes. Every System X Ceramic Coating installed at K-Town Auto Spa (Crystal SS 2-Year, Pro 6-Year, Max 10-Year, Max G+ Lifetime, and Complete Protection Package) is officially registered with your vehicle’s VIN on CARFAX Canada as a verified permanent service record, protecting your resale and trade-in value.',
  },
  {
    q: 'What is the difference between the Silver, Gold, and Diamond Complete Detail packages?',
    a: 'All three Complete Detail packages include both interior and exterior detailing. The Silver Package ($199–$289) includes a full exterior hand wash, wheel cleaning, spray wax, interior wipe-down, vacuuming, and floor mat wash. The Gold Package ($279–$369) adds iron & tar paint decontamination, engine bay wash, door jamb cleaning, salt stain removal, and deep seat cleaning (fabric shampoo or leather conditioning). The Diamond Package ($369–$449) is our showroom restoration tier, adding clay bar paint treatment, 3-month ceramic sealant, full carpet shampooing, and roof liner cleaning.',
  },
  {
    q: 'Where is K-Town Auto Spa located and what are your hours?',
    a: 'K-Town Auto Spa is located at 36 Joseph St, Kingston, ON K7K 2H5 in a heated indoor detailing facility. We are open Monday through Friday from 9:00 AM to 6:00 PM, and Saturday from 12:00 PM to 6:00 PM (closed Sundays). You can book online 24/7 or call/WhatsApp 647-915-3530.',
  },
  {
    q: 'Can you remove winter road salt stains, pet hair, and smoke or cabin odors?',
    a: 'Yes. We use commercial hot-water extraction and steam sanitization to break down encrusted Ontario winter road salt ($49 standalone or included in Gold/Diamond packages), specialized rubber extraction tools for embedded pet hair ($49), and commercial ozone shock treatments ($99) that neutralize smoke, mildew, and organic odors inside the HVAC system and headliner.',
  },
  {
    q: 'What payment methods do you accept, and is there a deposit required?',
    a: 'We accept Interac e-Transfer (0% fee, sent to ktownautomobilespa@gmail.com with auto-deposit), Cash in Shop at drop-off (0% fee), and online Credit Card / Apple Pay / Google Pay via Stripe (256-bit encrypted, +3% card processing fee). All prices are subject to 13% Ontario HST.',
  },
  {
    q: 'Do you offer boat detailing and commercial fleet washing in Kingston?',
    a: 'Yes. We provide mobile slip-side marine and boat detailing across Kingston, Portsmouth Olympic Harbour, Collins Bay, and Gananoque marinas (from $25/ft for topside wash & wax and $45/ft for marine gelcoat compounding & System X Marine ceramic coating), as well as consolidated monthly billing for commercial, municipal, and dealership fleets.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section
      id="faq"
      className="band"
      itemScope
      itemType="https://schema.org/FAQPage"
      aria-labelledby="faq-heading"
    >
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 1rem' }}>
        <div className="section-head" style={{ marginBottom: '2.25rem', textAlign: 'center' }}>
          <p className="kicker" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
            <HelpCircle style={{ width: '0.95rem', height: '0.95rem' }} />
            <span>Frequently Asked Questions</span>
          </p>
          <h2 id="faq-heading">Straight Answers on Detailing, Ceramic Coating &amp; Pricing</h2>
          <p style={{ margin: '0 auto' }}>
            Everything you need to know about our Kingston indoor studio, System X CARFAX registration, and 2026 packages.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <article
                key={idx}
                className="frame"
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
                style={{
                  padding: '1.1rem 1.35rem',
                  cursor: 'pointer',
                  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                  borderColor: isOpen ? 'var(--gold)' : undefined,
                }}
                onClick={() => setOpenIndex(isOpen ? -1 : idx)}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '1rem',
                  }}
                >
                  <h3
                    itemProp="name"
                    style={{
                      margin: 0,
                      fontSize: 'clamp(1rem, 2.2vw, 1.12rem)',
                      fontWeight: 800,
                      color: 'var(--heading-color)',
                      lineHeight: 1.35,
                    }}
                  >
                    {item.q}
                  </h3>
                  <ChevronDown
                    style={{
                      width: '1.25rem',
                      height: '1.25rem',
                      color: 'var(--gold-primary)',
                      flexShrink: 0,
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s ease',
                    }}
                  />
                </div>

                <div
                  itemScope
                  itemProp="acceptedAnswer"
                  itemType="https://schema.org/Answer"
                  style={{
                    display: isOpen ? 'block' : 'none',
                    marginTop: '0.75rem',
                    paddingTop: '0.75rem',
                    borderTop: '1px dashed var(--surface-border)',
                  }}
                >
                  <p
                    itemProp="text"
                    style={{
                      margin: 0,
                      fontSize: '0.94rem',
                      lineHeight: 1.65,
                      color: 'var(--muted-color)',
                    }}
                  >
                    {item.a}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
