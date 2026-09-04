import React, { useState } from 'react';
import { Check } from 'lucide-react';

export default function RateCard({ onOpenBooking, onSelectPackage }) {
  const [activeTab, setActiveTab] = useState('wash');
  const [vehicleType, setVehicleType] = useState('c-sedan');

  const tabs = [
    { id: 'wash', label: 'Wash & detail', price: 'from $30' },
    { id: 'polish', label: 'Polish & protect', price: 'from $120' },
    { id: 'coat', label: 'Ceramic coating', price: 'from $449' },
    { id: 'int', label: 'Interior & glass', price: 'from $89' },
    { id: 'extra', label: 'Add-ons', price: 'from $10' },
  ];

  const vehicles = [
    { id: 'c-sedan', label: 'Sedan' },
    { id: 'c-cross', label: 'Crossover (5 seat)' },
    { id: 'c-suv', label: 'SUV (3rd row)' },
    { id: 'c-van', label: 'Van' },
  ];

  return (
    <section className="band band--tint" id="packages">
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
        
        {/* Section Heading */}
        <div className="section-head" style={{ marginBottom: '2rem' }}>
          <p className="kicker">2026 rate card</p>
          <h2>Every price, on the page</h2>
          <p>
            All prices in Canadian dollars plus HST. Appointment only. Prices can vary with the condition the vehicle arrives in, and we tell you before we start — never after.
          </p>
        </div>

        {/* Vehicle Picker Switcher */}
        <div className="vpick" role="group" aria-label="Show prices for vehicle type">
          <span className="vpick__lbl">Show vehicle:</span>
          <div className="vpick__btns">
            {vehicles.map((v) => (
              <button
                key={v.id}
                type="button"
                className={vehicleType === v.id ? 'is-on' : ''}
                onClick={() => setVehicleType(v.id)}
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Navigation List */}
        <div className="tablist" role="tablist" aria-label="Price categories">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={activeTab === tab.id}
              aria-controls={`panel-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span>{tab.label}</span>
              <small>{tab.price}</small>
            </button>
          ))}
        </div>

        {/* Tab 1: Wash & Detail */}
        {activeTab === 'wash' && (
          <div role="tabpanel" id="panel-wash" aria-labelledby="tab-wash">
            <p className="kicker">Wash &amp; detail</p>
            
            <div className="pricewrap">
              <table className="prices">
                <thead>
                  <tr>
                    <th scope="col">Service</th>
                    <th scope="col" style={{ display: vehicleType === 'c-sedan' || window.innerWidth > 860 ? 'table-cell' : 'none' }}>Sedan</th>
                    <th scope="col" style={{ display: vehicleType === 'c-cross' || window.innerWidth > 860 ? 'table-cell' : 'none' }}>Crossover<small>5 seat</small></th>
                    <th scope="col" style={{ display: vehicleType === 'c-suv' || window.innerWidth > 860 ? 'table-cell' : 'none' }}>SUV<small>3rd row</small></th>
                    <th scope="col" style={{ display: vehicleType === 'c-van' || window.innerWidth > 860 ? 'table-cell' : 'none' }}>Van</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">
                      Hand Car Wash
                      <small>Wash &amp; wax soap, windows, blown dry</small>
                    </th>
                    <td style={{ display: vehicleType === 'c-sedan' || window.innerWidth > 860 ? 'table-cell' : 'none' }}>$30</td>
                    <td style={{ display: vehicleType === 'c-cross' || window.innerWidth > 860 ? 'table-cell' : 'none' }}>$40</td>
                    <td style={{ display: vehicleType === 'c-suv' || window.innerWidth > 860 ? 'table-cell' : 'none' }}>$45</td>
                    <td style={{ display: vehicleType === 'c-van' || window.innerWidth > 860 ? 'table-cell' : 'none' }}>$50</td>
                  </tr>
                  <tr>
                    <th scope="row">
                      Medium Package
                      <small>Interior vacuum &amp; glass, mats, jambs, hand wash · approx 2 hrs</small>
                    </th>
                    <td style={{ display: vehicleType === 'c-sedan' || window.innerWidth > 860 ? 'table-cell' : 'none' }}>$100</td>
                    <td style={{ display: vehicleType === 'c-cross' || window.innerWidth > 860 ? 'table-cell' : 'none' }}>$130</td>
                    <td style={{ display: vehicleType === 'c-suv' || window.innerWidth > 860 ? 'table-cell' : 'none' }}>$150</td>
                    <td style={{ display: vehicleType === 'c-van' || window.innerWidth > 860 ? 'table-cell' : 'none' }}>$160</td>
                  </tr>
                  <tr>
                    <th scope="row">
                      Interior Complete
                      <small>Full steam &amp; shampoo, seats, carpets, shine or matte finish · approx 3 hrs</small>
                    </th>
                    <td style={{ display: vehicleType === 'c-sedan' || window.innerWidth > 860 ? 'table-cell' : 'none' }}>$175</td>
                    <td style={{ display: vehicleType === 'c-cross' || window.innerWidth > 860 ? 'table-cell' : 'none' }}>$199</td>
                    <td style={{ display: vehicleType === 'c-suv' || window.innerWidth > 860 ? 'table-cell' : 'none' }}>$229</td>
                    <td style={{ display: vehicleType === 'c-van' || window.innerWidth > 860 ? 'table-cell' : 'none' }}>$249</td>
                  </tr>
                  <tr>
                    <th scope="row">
                      Full Detail
                      <small>Medium Package plus summer mats steamed, carpets &amp; seats scrubbed · approx 4 hrs</small>
                    </th>
                    <td style={{ display: vehicleType === 'c-sedan' || window.innerWidth > 860 ? 'table-cell' : 'none' }}>$200</td>
                    <td style={{ display: vehicleType === 'c-cross' || window.innerWidth > 860 ? 'table-cell' : 'none' }}>$230</td>
                    <td style={{ display: vehicleType === 'c-suv' || window.innerWidth > 860 ? 'table-cell' : 'none' }}>$250</td>
                    <td style={{ display: vehicleType === 'c-van' || window.innerWidth > 860 ? 'table-cell' : 'none' }}>$270</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Signature Package Highlight Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginTop: '2.5rem' }}>
              
              {/* Medium Package */}
              <article className="frame" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ textAlign: 'center', marginTop: '-2.8rem', marginBottom: '1.4rem' }}>
                    <span className="capsule">Medium Package</span>
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '0.85rem' }}>
                    <li style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '0.75rem', fontWeight: 700, color: 'var(--heading-color)' }}>
                      <Check style={{ width: '1.25rem', height: '1.25rem', color: 'var(--gold-primary)', flexShrink: 0 }} />
                      <div>Inside &amp; outside cleaning</div>
                    </li>
                    <li style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '0.75rem', fontWeight: 700, color: 'var(--heading-color)' }}>
                      <Check style={{ width: '1.25rem', height: '1.25rem', color: 'var(--gold-primary)', flexShrink: 0 }} />
                      <div>
                        Full interior detail
                        <span style={{ display: 'block', fontWeight: 400, color: 'var(--muted-color)', fontSize: '0.92rem' }}>Glass wipe down and thorough vacuum</span>
                      </div>
                    </li>
                    <li style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '0.75rem', fontWeight: 700, color: 'var(--heading-color)' }}>
                      <Check style={{ width: '1.25rem', height: '1.25rem', color: 'var(--gold-primary)', flexShrink: 0 }} />
                      <div>Rubber mats shampoo washed</div>
                    </li>
                    <li style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '0.75rem', fontWeight: 700, color: 'var(--heading-color)' }}>
                      <Check style={{ width: '1.25rem', height: '1.25rem', color: 'var(--gold-primary)', flexShrink: 0 }} />
                      <div>All doors &amp; jambs wiped &amp; degreased</div>
                    </li>
                    <li style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '0.75rem', fontWeight: 700, color: 'var(--heading-color)' }}>
                      <Check style={{ width: '1.25rem', height: '1.25rem', color: 'var(--gold-primary)', flexShrink: 0 }} />
                      <div>
                        Exterior body &amp; tire hand wash
                        <span style={{ display: 'block', fontWeight: 400, color: 'var(--muted-color)', fontSize: '0.92rem' }}>No pressure washers — 100% paint safe hand washing</span>
                      </div>
                    </li>
                  </ul>
                </div>

                <div style={{ marginTop: '1.75rem', paddingTop: '1rem', borderTop: '1px dashed var(--surface-border)', textAlign: 'center' }}>
                  <p style={{ fontFamily: 'var(--mono)', fontSize: '0.92rem', color: 'var(--gold-primary)', fontWeight: 700, margin: '0 0 1rem' }}>
                    Approx. 2 hours · from $100
                  </p>
                  <button 
                    onClick={() => onSelectPackage ? onSelectPackage('Medium Package') : onOpenBooking()} 
                    className="btn btn--outline" 
                    style={{ width: '100%' }}
                  >
                    Select Medium Package
                  </button>
                </div>
              </article>

              {/* Full Detail */}
              <article className="frame" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ textAlign: 'center', marginTop: '-2.8rem', marginBottom: '1.4rem' }}>
                    <span className="capsule">Full Detail</span>
                  </div>
                  <p style={{ fontWeight: 800, color: 'var(--heading-color)', fontSize: '1.05rem', marginBottom: '1rem' }}>
                    Includes all features from Medium Package, plus:
                  </p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '0.85rem' }}>
                    <li style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '0.75rem', fontWeight: 700, color: 'var(--heading-color)' }}>
                      <Check style={{ width: '1.25rem', height: '1.25rem', color: 'var(--gold-primary)', flexShrink: 0 }} />
                      <div>
                        Summer mats shampoo washed &amp; steamed
                        <span style={{ display: 'block', fontWeight: 400, color: 'var(--muted-color)', fontSize: '0.92rem' }}>Hot thermal extraction of salt, mud, spills &amp; stains</span>
                      </div>
                    </li>
                    <li style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '0.75rem', fontWeight: 700, color: 'var(--heading-color)' }}>
                      <Check style={{ width: '1.25rem', height: '1.25rem', color: 'var(--gold-primary)', flexShrink: 0 }} />
                      <div>
                        Non-removable carpets &amp; seats
                        <span style={{ display: 'block', fontWeight: 400, color: 'var(--muted-color)', fontSize: '0.92rem' }}>Deep scrubbed and hot steam sanitized for an ultra-fresh cabin</span>
                      </div>
                    </li>
                    <li style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '0.75rem', fontWeight: 700, color: 'var(--heading-color)' }}>
                      <Check style={{ width: '1.25rem', height: '1.25rem', color: 'var(--gold-primary)', flexShrink: 0 }} />
                      <div>
                        Cabin sanitize &amp; deodorize
                        <span style={{ display: 'block', fontWeight: 400, color: 'var(--muted-color)', fontSize: '0.92rem' }}>Hypoallergenic clean, zero chemical perfume residue</span>
                      </div>
                    </li>
                  </ul>
                </div>

                <div style={{ marginTop: '1.75rem', paddingTop: '1rem', borderTop: '1px dashed var(--surface-border)', textAlign: 'center' }}>
                  <p style={{ fontFamily: 'var(--mono)', fontSize: '0.92rem', color: 'var(--gold-primary)', fontWeight: 700, margin: '0 0 1rem' }}>
                    Approx. 4 hours · from $200
                  </p>
                  <button 
                    onClick={() => onSelectPackage ? onSelectPackage('Full Detail') : onOpenBooking()} 
                    className="btn btn--gold" 
                    style={{ width: '100%' }}
                  >
                    Select Full Detail Experience
                  </button>
                </div>
              </article>

            </div>
          </div>
        )}

        {/* Tab 2: Polish & Protect */}
        {activeTab === 'polish' && (
          <div role="tabpanel" id="panel-polish" aria-labelledby="tab-polish">
            <p className="kicker">Polish &amp; protect</p>
            
            <div className="pricewrap">
              <table className="prices">
                <thead>
                  <tr>
                    <th scope="col">Service</th>
                    <th scope="col">Sedan</th>
                    <th scope="col">Crossover<small>5 seat</small></th>
                    <th scope="col">SUV<small>3rd row</small></th>
                    <th scope="col">Van</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">
                      Wash &amp; Machine Wax
                      <small>No abrasives. High gloss &amp; paint protection for ~6 months · approx 2 hrs</small>
                    </th>
                    <td>$120</td>
                    <td>$140</td>
                    <td>$160</td>
                    <td>$180</td>
                  </tr>
                  <tr>
                    <th scope="row">
                      Gloss Enhancement
                      <small>Clay bar decon + one-step all-in-one polish. Reduces light swirls · approx 3 hrs</small>
                    </th>
                    <td>$200</td>
                    <td>$230</td>
                    <td>$260</td>
                    <td>$290</td>
                  </tr>
                  <tr>
                    <th scope="row">
                      1-Step Paint Correction
                      <small>Machine polish and sealant. Eliminates 50–70% of clear coat defects · approx 6 hrs</small>
                    </th>
                    <td>$350</td>
                    <td>$400</td>
                    <td>$450</td>
                    <td>$500</td>
                  </tr>
                  <tr>
                    <th scope="row">
                      2-Step Paint Correction
                      <small>Heavy compound + fine polish. Removes 80–90% of scratches &amp; swirls · approx 11 hrs</small>
                    </th>
                    <td>$650</td>
                    <td>$750</td>
                    <td>$850</td>
                    <td>$950</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p style={{ fontFamily: 'var(--mono)', fontSize: '0.84rem', color: 'var(--muted-color)', margin: '1rem 0 0', lineHeight: 1.5 }}>
              * Deep scratches that catch a fingernail cannot be fully compounded out without repainting. We measure paint thickness with digital gauges before any machine correction begins.
            </p>
          </div>
        )}

        {/* Tab 3: Ceramic Coating */}
        {activeTab === 'coat' && (
          <div role="tabpanel" id="panel-coat" aria-labelledby="tab-coat">
            
            {/* System X Comparison Callout Box */}
            <div style={{ background: 'var(--surface-card)', border: '2px solid var(--surface-border-gold)', borderRadius: '12px', padding: '1.6rem 1.5rem', marginBottom: '2.2rem', boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'flex', gap: '1.4rem', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', marginBottom: '1.2rem' }}>
                <div>
                  <p className="kicker">Before you compare prices</p>
                  <h3 style={{ fontFamily: 'var(--display)', fontWeight: 800, textTransform: 'uppercase', fontSize: 'clamp(1.5rem, 3.6vw, 2rem)', margin: '0.3rem 0 0.5rem', color: 'var(--heading-color)' }}>
                    Why System X costs more than Nano-Brite
                  </h3>
                  <p style={{ margin: 0, color: 'var(--muted-color)', maxWidth: '52ch', fontSize: '0.95rem' }}>
                    Both are real ceramic coatings and both receive proper multi-stage paint correction first. The gap in price is what happens <strong>after</strong> we hand your keys back.
                  </p>
                </div>
                <div style={{ padding: '0.5rem 0.75rem', border: '1px solid var(--surface-border)', borderRadius: '8px', background: '#111827', color: '#FFFFFF', textAlign: 'center' }}>
                  <span style={{ fontWeight: 900, fontSize: '1.1rem', letterSpacing: '0.05em', display: 'block' }}>CARFAX</span>
                  <span style={{ color: '#60A5FA', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Canada Verified</span>
                </div>
              </div>

              <div className="pricewrap" style={{ margin: 0 }}>
                <table className="cmp">
                  <thead>
                    <tr>
                      <th scope="col">Feature</th>
                      <th scope="col">Nano-Brite</th>
                      <th scope="col" className="cmp__hi">System X Ceramic</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">On your CARFAX report</th>
                      <td><span className="no">No</span></td>
                      <td className="cmp__hi"><span className="yes">Yes</span> — logged as a verifiable service record</td>
                    </tr>
                    <tr>
                      <th scope="row">Warranty</th>
                      <td>1, 3 or 7 years</td>
                      <td className="cmp__hi">2 years to Lifetime, <strong>registered in your name</strong></td>
                    </tr>
                    <tr>
                      <th scope="row">Surfaces coated</th>
                      <td>Paintwork only</td>
                      <td className="cmp__hi">Paint &amp; glass on Crystal+; paint, glass <strong>and wheels</strong> on Pro+, Max G+ &amp; Diamond SS</td>
                    </tr>
                    <tr>
                      <th scope="row">Free pickup &amp; delivery</th>
                      <td>EVO Graphene only</td>
                      <td className="cmp__hi"><span className="yes">Yes</span> — every System X package qualifies</td>
                    </tr>
                    <tr>
                      <th scope="row">Best for</th>
                      <td>A daily driver you won't keep long. Solid protection, lower cost.</td>
                      <td className="cmp__hi">A car you plan to sell, lease return, or keep for years. Becomes part of the vehicle's history.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="kicker">Ceramic coating packages — includes wash, iron decon, clay bar, correction and coating</p>
            
            <div className="pricewrap">
              <table className="prices">
                <thead>
                  <tr>
                    <th scope="col">Service</th>
                    <th scope="col">Sedan</th>
                    <th scope="col">Crossover<small>5 seat</small></th>
                    <th scope="col">SUV<small>3rd row</small></th>
                    <th scope="col">Van</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">
                      Nano-Brite Rejuvenate <span style={{ color: 'var(--gold-primary)', fontWeight: 700 }}>1 year</span>
                      <small>Decon + 1-step correction + 1 layer · approx 5 hrs</small>
                    </th>
                    <td>$449</td>
                    <td>$499</td>
                    <td>$549</td>
                    <td>$599</td>
                  </tr>
                  <tr>
                    <th scope="row">
                      Nano-Brite Ultra <span style={{ color: 'var(--gold-primary)', fontWeight: 700 }}>3 year</span>
                      <small>Decon + 1-step correction + 1 layer · approx 6 hrs</small>
                    </th>
                    <td>$649</td>
                    <td>$749</td>
                    <td>$849</td>
                    <td>$899</td>
                  </tr>
                  <tr>
                    <th scope="row">
                      Nano-Brite EVO Graphene <span style={{ color: 'var(--gold-primary)', fontWeight: 700 }}>7 year</span>
                      <small>Graphene coating. Decon + 2-step correction + top coat · approx 10 hrs</small>
                    </th>
                    <td>$1199</td>
                    <td>$1299</td>
                    <td>$1399</td>
                    <td>$1499</td>
                  </tr>
                  <tr style={{ background: 'rgba(62, 155, 218, 0.12)' }}>
                    <th scope="row">
                      System X Crystal+ <span style={{ color: 'var(--heading-color)', fontWeight: 800 }}>2 year</span> <span className="cf-pill">CARFAX</span>
                      <small>1-step correction + paint and glass coating · approx 8 hrs</small>
                    </th>
                    <td>$949</td>
                    <td>$1049</td>
                    <td>$1149</td>
                    <td>$1249</td>
                  </tr>
                  <tr style={{ background: 'rgba(62, 155, 218, 0.12)' }}>
                    <th scope="row">
                      System X Pro+ <span style={{ color: 'var(--heading-color)', fontWeight: 800 }}>6 year</span> <span className="cf-pill">CARFAX</span>
                      <small>2-step correction + paint, glass and wheel coatings · approx 11 hrs</small>
                    </th>
                    <td>$1299</td>
                    <td>$1449</td>
                    <td>$1599</td>
                    <td>$1749</td>
                  </tr>
                  <tr style={{ background: 'rgba(62, 155, 218, 0.12)' }}>
                    <th scope="row">
                      System X Max G+ <span style={{ color: 'var(--heading-color)', fontWeight: 800 }}>10 year</span> <span className="cf-pill">CARFAX</span>
                      <small>Graphene. 2-step correction + paint, glass and wheel coatings · approx 12 hrs</small>
                    </th>
                    <td>$1699</td>
                    <td>$1849</td>
                    <td>$1999</td>
                    <td>$2149</td>
                  </tr>
                  <tr style={{ background: 'rgba(62, 155, 218, 0.12)' }}>
                    <th scope="row">
                      System X Diamond SS <span style={{ color: 'var(--gold-primary)', fontWeight: 900 }}>Lifetime</span> <span className="cf-pill">CARFAX</span>
                      <small>2-step correction + paint, glass and wheel coatings · approx 13 hrs</small>
                    </th>
                    <td>$1799</td>
                    <td>$1949</td>
                    <td>$2099</td>
                    <td>$2249</td>
                  </tr>
                  <tr>
                    <th scope="row">
                      Ceramic Maintenance Wash
                      <small>Single visit. Recommended every 6–8 weeks</small>
                    </th>
                    <td>$55</td>
                    <td>$65</td>
                    <td>$75</td>
                    <td>$85</td>
                  </tr>
                  <tr>
                    <th scope="row">
                      Maintenance Plan <span style={{ color: 'var(--water-dk)', fontWeight: 700 }}>billed monthly</span>
                      <small>One wash every month. Cancel anytime. Priority booking</small>
                    </th>
                    <td>$45</td>
                    <td>$55</td>
                    <td>$65</td>
                    <td>$75</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p style={{ fontFamily: 'var(--mono)', fontSize: '0.84rem', color: 'var(--muted-color)', margin: '1rem 0 0' }}>
              * Additional coating layer: $150. Every System X installation includes warranty registration on CARFAX Canada.
            </p>
          </div>
        )}

        {/* Tab 4: Interior & Glass Coatings */}
        {activeTab === 'int' && (
          <div role="tabpanel" id="panel-int" aria-labelledby="tab-int">
            <p className="kicker">Interior, glass, wheel &amp; trim coatings</p>
            
            <div className="pricewrap">
              <table className="prices">
                <thead>
                  <tr>
                    <th scope="col">Service</th>
                    <th scope="col">With a Detail</th>
                    <th scope="col">Standalone</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">
                      System X LVP <span style={{ color: 'var(--gold-primary)' }}>Leather, vinyl &amp; plastic</span>
                      <small>3-year warranty against spills and UV cracking. CARFAX registered</small>
                    </th>
                    <td>$229</td>
                    <td>$389</td>
                  </tr>
                  <tr>
                    <th scope="row">
                      System X Textile <span style={{ color: 'var(--gold-primary)' }}>Fabric &amp; carpet</span>
                      <small>2-year hydrophobic stain protection. CARFAX registered</small>
                    </th>
                    <td>$149</td>
                    <td>$259</td>
                  </tr>
                  <tr>
                    <th scope="row">
                      System X LVP + Textile <span style={{ color: 'var(--gold-primary)', fontWeight: 800 }}>Complete Interior</span>
                      <small>Full cabin coated, warranted and CARFAX registered</small>
                    </th>
                    <td>$325</td>
                    <td>$499</td>
                  </tr>
                  <tr>
                    <th scope="row">
                      Nano-Brite Leather Guard
                      <small>8–12 month leather protection</small>
                    </th>
                    <td>$99</td>
                    <td>$170</td>
                  </tr>
                  <tr>
                    <th scope="row">
                      Nano-Brite Fabric Guard
                      <small>8–12 month stain barrier</small>
                    </th>
                    <td>$89</td>
                    <td>$150</td>
                  </tr>
                  <tr>
                    <th scope="row">
                      Nano-Brite Leather + Fabric <span style={{ color: 'var(--gold-primary)' }}>Complete Interior</span>
                      <small>8–12 month protection. Our best-value interior package</small>
                    </th>
                    <td>$175</td>
                    <td>$279</td>
                  </tr>
                  <tr>
                    <th scope="row">
                      System X Glass+ <span style={{ color: 'var(--water-dk)' }}>Windshield &amp; windows</span>
                      <small>Up to 2 years. Drastically improves wet-weather driving visibility</small>
                    </th>
                    <td>$125</td>
                    <td>$165</td>
                  </tr>
                  <tr>
                    <th scope="row">
                      System X Wheel+ <span style={{ color: 'var(--water-dk)' }}>Wheel coating</span>
                      <small>Repels corrosive brake dust. Wheels removed for 100% barrel coverage</small>
                    </th>
                    <td>$249</td>
                    <td>$329</td>
                  </tr>
                  <tr>
                    <th scope="row">
                      System X Revive <span style={{ color: 'var(--gold-primary)' }}>Trim restoration</span>
                      <small>Restores faded oxidized exterior plastic &amp; rubber moldings</small>
                    </th>
                    <td>$89</td>
                    <td>$129</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p style={{ fontFamily: 'var(--mono)', fontSize: '0.84rem', color: 'var(--muted-color)', margin: '1rem 0 0' }}>
              * "With a detail" pricing applies when booked alongside any package. Standalone pricing includes the deep interior prep work required before application.
            </p>
          </div>
        )}

        {/* Tab 5: Add-ons & Surcharge */}
        {activeTab === 'extra' && (
          <div role="tabpanel" id="panel-extra" aria-labelledby="tab-extra">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginTop: '1.5rem' }}>
              
              {/* Add-ons list */}
              <div className="frame">
                <div style={{ marginTop: '-2.6rem', marginBottom: '1.2rem' }}>
                  <span className="capsule capsule--sm">Add-ons</span>
                </div>
                
                {[
                  { name: 'Engine Bay Cleaning', price: '$40' },
                  { name: 'High-Gloss Tire Shine', price: '$10' },
                  { name: 'Summer Mats Shampoo Wash', price: '$20' },
                  { name: 'Headlight Restoration (pair)', price: '$60' },
                  { name: 'Clay Bar Decontamination', price: '$60' },
                  { name: 'Thermal Odour / Smoke Treatment', price: '$50' },
                  { name: 'Pet Hair Extraction', price: '$50–$100' },
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '0.85rem 0', borderBottom: idx < 6 ? '1px dashed var(--surface-border)' : 'none' }}>
                    <strong style={{ fontSize: '1.05rem', color: 'var(--heading-color)' }}>{item.name}</strong>
                    <b style={{ fontFamily: 'var(--display)', fontSize: '1.75rem', color: 'var(--water-dk)' }}>{item.price}</b>
                  </div>
                ))}
              </div>

              {/* Surcharge Box */}
              <div className="frame frame--navy" style={{ textAlign: 'center' }}>
                <div style={{ marginTop: '-2.6rem', marginBottom: '1.2rem' }}>
                  <span className="capsule capsule--sm">Surcharge</span>
                </div>
                <p style={{ color: '#F0D590', fontWeight: 800, fontSize: '1.2rem', margin: 0 }}>
                  If it's extra dirty
                </p>
                <div style={{ fontFamily: 'var(--display)', fontWeight: 800, fontSize: '3.4rem', color: 'var(--gold-lt)', lineHeight: 1, margin: '0.8rem 0 0.4rem' }}>
                  +$50
                </div>
                <p style={{ color: '#D8E5F4', fontSize: '0.96rem', lineHeight: 1.6, maxWidth: '28rem', margin: '0 auto' }}>
                  Not automatic. Applies only when a vehicle needs significantly more time and labor than usual — excessive pet hair, sand, heavy mud, or work truck muck. Heavily soiled vehicles are always quoted transparently upon inspection before any work begins.
                </p>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
