import React, { useState } from 'react';
import { Check, FileText, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function RateCard({ onOpenBooking, onSelectPackage }) {
  const { addToCart, setIsCartOpen } = useCart();
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

  const curVehicleLabel = vehicles.find((v) => v.id === vehicleType)?.label || 'Sedan';

  const handleAddTierService = (title, priceMap, subtitle = '') => {
    const price = priceMap[vehicleType] || priceMap['c-sedan'];
    addToCart(
      {
        title,
        vehicleType,
        basePrice: price,
        subtitle,
      },
      true
    );
  };

  const handleAddInteriorCoating = (title, price, isStandalone = false) => {
    addToCart(
      {
        title: `${title} (${isStandalone ? 'Standalone' : 'With Detail'})`,
        vehicleType,
        basePrice: price,
        subtitle: isStandalone ? 'Standalone prep included' : 'Applied with detailing package',
      },
      true
    );
  };

  const handleAddAddon = (title, price) => {
    addToCart(
      {
        title,
        vehicleType,
        basePrice: price,
        subtitle: 'Add-on service',
      },
      true
    );
  };

  // Pricing lookups for reactive buttons
  const washPrices = {
    wash: { 'c-sedan': 30, 'c-cross': 40, 'c-suv': 45, 'c-van': 50 },
    refresh: { 'c-sedan': 70, 'c-cross': 85, 'c-suv': 95, 'c-van': 105 },
    medium: { 'c-sedan': 100, 'c-cross': 130, 'c-suv': 150, 'c-van': 160 },
    interior: { 'c-sedan': 175, 'c-cross': 199, 'c-suv': 229, 'c-van': 249 },
    full: { 'c-sedan': 200, 'c-cross': 230, 'c-suv': 250, 'c-van': 270 },
  };

  const polishPrices = {
    wax: { 'c-sedan': 120, 'c-cross': 140, 'c-suv': 160, 'c-van': 180 },
    gloss: { 'c-sedan': 200, 'c-cross': 230, 'c-suv': 260, 'c-van': 290 },
    step1: { 'c-sedan': 350, 'c-cross': 400, 'c-suv': 450, 'c-van': 500 },
    step2: { 'c-sedan': 650, 'c-cross': 750, 'c-suv': 850, 'c-van': 950 },
  };

  const coatPrices = {
    rejuvenate: { 'c-sedan': 449, 'c-cross': 499, 'c-suv': 549, 'c-van': 599 },
    ultra: { 'c-sedan': 649, 'c-cross': 749, 'c-suv': 849, 'c-van': 899 },
    evo: { 'c-sedan': 1199, 'c-cross': 1299, 'c-suv': 1399, 'c-van': 1499 },
    crystal: { 'c-sedan': 949, 'c-cross': 1049, 'c-suv': 1149, 'c-van': 1249 },
    pro: { 'c-sedan': 1299, 'c-cross': 1449, 'c-suv': 1599, 'c-van': 1749 },
    maxg: { 'c-sedan': 1699, 'c-cross': 1849, 'c-suv': 1999, 'c-van': 2149 },
    diamond: { 'c-sedan': 1799, 'c-cross': 1949, 'c-suv': 2099, 'c-van': 2249 },
    maintWash: { 'c-sedan': 55, 'c-cross': 65, 'c-suv': 75, 'c-van': 85 },
    maintPlan: { 'c-sedan': 45, 'c-cross': 55, 'c-suv': 65, 'c-van': 75 },
  };

  return (
    <section className="band band--tint" id="packages">
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
        
        {/* Section Heading */}
        <div className="section-head" style={{ marginBottom: '2rem' }}>
          <p className="kicker">2026 rate card</p>
          <h2>Every price, on the page</h2>
          <p>
            All prices in CAD, plus HST &middot; Appointment only &middot; Final price confirmed at drop-off, never after.
          </p>
          <div style={{
            display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.4rem 0.8rem',
            fontFamily: 'var(--mono)', fontSize: '0.74rem', fontWeight: 700,
            color: 'var(--gold-primary)', letterSpacing: '0.06em', textTransform: 'uppercase',
            marginTop: '0.75rem',
          }}>
            <span>Authorized System X Installer</span>
            <span>&bull;</span>
            <span>Nano-Brite Certified</span>
            <span>&bull;</span>
            <span>Auto-Brite Certified</span>
            <span>&bull;</span>
            <span>CARFAX Registered</span>
          </div>
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
              <table className="prices" data-vehicle={vehicleType}>
                <thead>
                  <tr>
                    <th scope="col">Service</th>
                    <th scope="col" className="col-sedan">Sedan</th>
                    <th scope="col" className="col-cross">Crossover<small>5 seat</small></th>
                    <th scope="col" className="col-suv">SUV<small>3rd row</small></th>
                    <th scope="col" className="col-van">Van</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <span>Hand Car Wash</span>
                        <button
                          type="button"
                          onClick={() => handleAddTierService('Hand Car Wash', washPrices.wash, 'Wash & wax soap, windows, blown dry')}
                          className="btn-add-table"
                          title="Add Hand Car Wash to Cart"
                        >
                          + Reserve ${washPrices.wash[vehicleType]}
                        </button>
                      </div>
                      <small>Wash &amp; wax soap, windows, blown dry</small>
                    </th>
                    <td className="col-sedan">$30</td>
                    <td className="col-cross">$40</td>
                    <td className="col-suv">$45</td>
                    <td className="col-van">$50</td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <span>Interior Refresh</span>
                        <button
                          type="button"
                          onClick={() => handleAddTierService('Interior Refresh', washPrices.refresh, 'Full blow-out and vacuum · approx 1 hr')}
                          className="btn-add-table"
                          title="Add Interior Refresh to Cart"
                        >
                          + Reserve ${washPrices.refresh[vehicleType]}
                        </button>
                      </div>
                      <small>Doors, jambs, panels and dashboard wiped down, full blow-out and vacuum, rubber mats washed or carpet mats dry-cleaned. No steam, no scrubbing &mdash; the quick tidy-up &middot; approx 1 hr</small>
                    </th>
                    <td className="col-sedan">$70</td>
                    <td className="col-cross">$85</td>
                    <td className="col-suv">$95</td>
                    <td className="col-van">$105</td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <span>Medium Package</span>
                        <button
                          type="button"
                          onClick={() => handleAddTierService('Medium Package', washPrices.medium, 'Interior vacuum & glass, mats, jambs, hand wash · approx 2 hrs')}
                          className="btn-add-table"
                          title="Add Medium Package to Cart"
                        >
                          + Reserve ${washPrices.medium[vehicleType]}
                        </button>
                      </div>
                      <small>Interior vacuum &amp; glass, mats, jambs, hand wash &middot; approx 2 hrs</small>
                    </th>
                    <td className="col-sedan">$100</td>
                    <td className="col-cross">$130</td>
                    <td className="col-suv">$150</td>
                    <td className="col-van">$160</td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <span>Interior Complete <small style={{ display: 'inline', fontWeight: 400 }}>(interior only)</small></span>
                        <button
                          type="button"
                          onClick={() => handleAddTierService('Interior Complete', washPrices.interior, '305°F steam extraction, seats & carpets shampooed · approx 3 hrs')}
                          className="btn-add-table"
                          title="Add Interior Complete to Cart"
                        >
                          + Reserve ${washPrices.interior[vehicleType]}
                        </button>
                      </div>
                      <small>Everything we do inside &mdash; 305&deg;F steam extraction through the whole car, seats and carpets shampooed, vinyl and trim cleaned and dressed. The only thing it leaves out is the exterior wash &mdash; add a hand wash for $30 &middot; approx 3 hrs</small>
                    </th>
                    <td className="col-sedan">$175</td>
                    <td className="col-cross">$199</td>
                    <td className="col-suv">$229</td>
                    <td className="col-van">$249</td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <span>Full Detail</span>
                        <button
                          type="button"
                          onClick={() => handleAddTierService('Full Detail', washPrices.full, 'Medium Package + summer mats steamed, carpets & seats scrubbed · approx 4 hrs')}
                          className="btn-add-table"
                          title="Add Full Detail to Cart"
                        >
                          + Reserve ${washPrices.full[vehicleType]}
                        </button>
                      </div>
                      <small>Medium Package plus summer mats steamed, carpets &amp; seats scrubbed · approx 4 hrs</small>
                    </th>
                    <td className="col-sedan">$200</td>
                    <td className="col-cross">$230</td>
                    <td className="col-suv">$250</td>
                    <td className="col-van">$270</td>
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
                    Approx. 2 hours · ${washPrices.medium[vehicleType]} CAD ({curVehicleLabel})
                  </p>
                  <button 
                    onClick={() => handleAddTierService('Medium Package', washPrices.medium, 'Interior vacuum & glass, mats, jambs, hand wash')} 
                    className="btn btn--outline" 
                    style={{ width: '100%' }}
                  >
                    Select Medium Package (${washPrices.medium[vehicleType]})
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
                    Approx. 4 hours · ${washPrices.full[vehicleType]} CAD ({curVehicleLabel})
                  </p>
                  <button 
                    onClick={() => handleAddTierService('Full Detail', washPrices.full, 'Medium Package plus summer mats steamed, carpets & seats scrubbed')} 
                    className="btn btn--gold" 
                    style={{ width: '100%' }}
                  >
                    Select Full Detail Experience (${washPrices.full[vehicleType]})
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
              <table className="prices" data-vehicle={vehicleType}>
                <thead>
                  <tr>
                    <th scope="col">Service</th>
                    <th scope="col" className="col-sedan">Sedan</th>
                    <th scope="col" className="col-cross">Crossover<small>5 seat</small></th>
                    <th scope="col" className="col-suv">SUV<small>3rd row</small></th>
                    <th scope="col" className="col-van">Van</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <span>Wash &amp; Machine Wax</span>
                        <button
                          type="button"
                          onClick={() => handleAddTierService('Wash & Machine Wax', polishPrices.wax, 'Gloss and protection for ~6 months · approx 2 hrs')}
                          className="btn-add-table"
                        >
                          + Reserve ${polishPrices.wax[vehicleType]}
                        </button>
                      </div>
                      <small>No abrasives. Gloss and protection for around 6 months · approx 2 hrs</small>
                    </th>
                    <td className="col-sedan">$120</td>
                    <td className="col-cross">$140</td>
                    <td className="col-suv">$160</td>
                    <td className="col-van">$180</td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <span>Gloss Enhancement</span>
                        <button
                          type="button"
                          onClick={() => handleAddTierService('Gloss Enhancement', polishPrices.gloss, 'Clay + 1-step polish · approx 3 hrs')}
                          className="btn-add-table"
                        >
                          + Reserve ${polishPrices.gloss[vehicleType]}
                        </button>
                      </div>
                      <small>Clay plus one-step all-in-one polish. Reduces light swirls · approx 3 hrs</small>
                    </th>
                    <td className="col-sedan">$200</td>
                    <td className="col-cross">$230</td>
                    <td className="col-suv">$260</td>
                    <td className="col-van">$290</td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <span>1-Step Paint Correction</span>
                        <button
                          type="button"
                          onClick={() => handleAddTierService('1-Step Paint Correction', polishPrices.step1, 'Removes 50-70% of defects · approx 6 hrs')}
                          className="btn-add-table"
                        >
                          + Reserve ${polishPrices.step1[vehicleType]}
                        </button>
                      </div>
                      <small>Machine polish and sealant. Removes 50–70% of defects · approx 6 hrs</small>
                    </th>
                    <td className="col-sedan">$350</td>
                    <td className="col-cross">$400</td>
                    <td className="col-suv">$450</td>
                    <td className="col-van">$500</td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <span>2-Step Paint Correction</span>
                        <button
                          type="button"
                          onClick={() => handleAddTierService('2-Step Paint Correction', polishPrices.step2, 'Compound + polish. Removes 80-90% defects · approx 11 hrs')}
                          className="btn-add-table"
                        >
                          + Reserve ${polishPrices.step2[vehicleType]}
                        </button>
                      </div>
                      <small>Compound and polish. Removes 80–90% of defects · approx 11 hrs</small>
                    </th>
                    <td className="col-sedan">$650</td>
                    <td className="col-cross">$750</td>
                    <td className="col-suv">$850</td>
                    <td className="col-van">$950</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p style={{ fontFamily: 'var(--mono)', fontSize: '0.84rem', color: 'var(--muted-color)', margin: '1rem 0 0', lineHeight: 1.5 }}>
              * Deep scratches that catch a fingernail cannot be fully removed. We measure paint depth before any correction begins.
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

            {/* Trim/Fabric/Glass Callout Banner */}
            <div style={{
              background: 'linear-gradient(180deg, #16386C, #0A1E42)',
              border: '2px solid var(--gold)',
              borderRadius: '10px',
              padding: '0.9rem 1.25rem',
              marginBottom: '1.8rem',
              color: '#E4EDF7',
              fontSize: '0.95rem',
              textAlign: 'center',
              lineHeight: 1.5,
            }}>
              You don't have to coat the whole car. Trim or fabric from $89, glass $125, wheels $249 &mdash; alone or with any detail. Full paint packages from $449.
            </div>

            <p className="kicker">Ceramic coating packages &mdash; includes wash, iron decon, clay bar, correction and coating</p>
            
            <div className="pricewrap">
              <table className="prices" data-vehicle={vehicleType}>
                <thead>
                  <tr>
                    <th scope="col">Service</th>
                    <th scope="col" className="col-sedan">Sedan</th>
                    <th scope="col" className="col-cross">Crossover<small>5 seat</small></th>
                    <th scope="col" className="col-suv">SUV<small>3rd row</small></th>
                    <th scope="col" className="col-van">Van</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <span>Nano-Brite Rejuvenate <span style={{ color: 'var(--gold-primary)', fontWeight: 700 }}>1 year</span></span>
                        <button
                          type="button"
                          onClick={() => handleAddTierService('Nano-Brite Rejuvenate (1 Year)', coatPrices.rejuvenate, 'Decon + 1-step correction + 1 layer · approx 5 hrs')}
                          className="btn-add-table"
                        >
                          + Reserve ${coatPrices.rejuvenate[vehicleType]}
                        </button>
                      </div>
                      <small>Decon + 1-step correction + 1 layer · approx 5 hrs</small>
                    </th>
                    <td className="col-sedan">$449</td>
                    <td className="col-cross">$499</td>
                    <td className="col-suv">$549</td>
                    <td className="col-van">$599</td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <span>Nano-Brite Ultra <span style={{ color: 'var(--gold-primary)', fontWeight: 700 }}>3 year</span></span>
                        <button
                          type="button"
                          onClick={() => handleAddTierService('Nano-Brite Ultra (3 Year)', coatPrices.ultra, 'Decon + 1-step correction + 1 layer · approx 6 hrs')}
                          className="btn-add-table"
                        >
                          + Reserve ${coatPrices.ultra[vehicleType]}
                        </button>
                      </div>
                      <small>Decon + 1-step correction + 1 layer · approx 6 hrs</small>
                    </th>
                    <td className="col-sedan">$649</td>
                    <td className="col-cross">$749</td>
                    <td className="col-suv">$849</td>
                    <td className="col-van">$899</td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <span>Nano-Brite EVO Graphene <span style={{ color: 'var(--gold-primary)', fontWeight: 700 }}>7 year</span></span>
                        <button
                          type="button"
                          onClick={() => handleAddTierService('Nano-Brite EVO Graphene (7 Year)', coatPrices.evo, 'Graphene. Decon + 2-step correction + top coat · approx 10 hrs')}
                          className="btn-add-table"
                        >
                          + Reserve ${coatPrices.evo[vehicleType]}
                        </button>
                      </div>
                      <small>Graphene coating. Decon + 2-step correction + top coat · approx 10 hrs</small>
                    </th>
                    <td className="col-sedan">$1199</td>
                    <td className="col-cross">$1299</td>
                    <td className="col-suv">$1399</td>
                    <td className="col-van">$1499</td>
                  </tr>
                  <tr style={{ background: 'rgba(62, 155, 218, 0.12)' }}>
                    <th scope="row">
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <span>System X Crystal+ <span style={{ color: 'var(--heading-color)', fontWeight: 800 }}>2 year</span> <span className="cf-pill">CARFAX</span></span>
                        <button
                          type="button"
                          onClick={() => handleAddTierService('System X Crystal+ (2 Year CARFAX)', coatPrices.crystal, '1-step correction + paint and glass coating · approx 8 hrs')}
                          className="btn-add-table"
                        >
                          + Reserve ${coatPrices.crystal[vehicleType]}
                        </button>
                      </div>
                      <small>1-step correction + paint and glass coating · approx 8 hrs</small>
                    </th>
                    <td className="col-sedan">$949</td>
                    <td className="col-cross">$1049</td>
                    <td className="col-suv">$1149</td>
                    <td className="col-van">$1249</td>
                  </tr>
                  <tr style={{ background: 'rgba(62, 155, 218, 0.12)' }}>
                    <th scope="row">
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <span>System X Pro+ <span style={{ color: 'var(--heading-color)', fontWeight: 800 }}>6 year</span> <span className="cf-pill">CARFAX</span></span>
                        <button
                          type="button"
                          onClick={() => handleAddTierService('System X Pro+ (6 Year CARFAX)', coatPrices.pro, '2-step correction + paint, glass and wheel coatings · approx 11 hrs')}
                          className="btn-add-table"
                        >
                          + Reserve ${coatPrices.pro[vehicleType]}
                        </button>
                      </div>
                      <small>2-step correction + paint, glass and wheel coatings · approx 11 hrs</small>
                    </th>
                    <td className="col-sedan">$1299</td>
                    <td className="col-cross">$1449</td>
                    <td className="col-suv">$1599</td>
                    <td className="col-van">$1749</td>
                  </tr>
                  <tr style={{ background: 'rgba(62, 155, 218, 0.12)' }}>
                    <th scope="row">
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <span>System X Max G+ <span style={{ color: 'var(--heading-color)', fontWeight: 800 }}>10 year</span> <span className="cf-pill">CARFAX</span></span>
                        <button
                          type="button"
                          onClick={() => handleAddTierService('System X Max G+ (10 Year CARFAX)', coatPrices.maxg, 'Graphene. 2-step correction + paint, glass, wheel · approx 12 hrs')}
                          className="btn-add-table"
                        >
                          + Reserve ${coatPrices.maxg[vehicleType]}
                        </button>
                      </div>
                      <small>Graphene. 2-step correction + paint, glass and wheel coatings · approx 12 hrs</small>
                    </th>
                    <td className="col-sedan">$1699</td>
                    <td className="col-cross">$1849</td>
                    <td className="col-suv">$1999</td>
                    <td className="col-van">$2149</td>
                  </tr>
                  <tr style={{ background: 'rgba(62, 155, 218, 0.12)' }}>
                    <th scope="row">
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <span>System X Diamond SS <span style={{ color: 'var(--gold-primary)', fontWeight: 900 }}>Lifetime</span> <span className="cf-pill">CARFAX</span></span>
                        <button
                          type="button"
                          onClick={() => handleAddTierService('System X Diamond SS (Lifetime CARFAX)', coatPrices.diamond, '2-step correction + paint, glass, wheel coatings · approx 13 hrs')}
                          className="btn-add-table"
                        >
                          + Reserve ${coatPrices.diamond[vehicleType]}
                        </button>
                      </div>
                      <small>2-step correction + paint, glass and wheel coatings · approx 13 hrs</small>
                    </th>
                    <td className="col-sedan">$1799</td>
                    <td className="col-cross">$1949</td>
                    <td className="col-suv">$2099</td>
                    <td className="col-van">$2249</td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <span>Ceramic Maintenance Wash</span>
                        <button
                          type="button"
                          onClick={() => handleAddTierService('Ceramic Maintenance Wash', coatPrices.maintWash, 'Recommended every 6-8 weeks')}
                          className="btn-add-table"
                        >
                          + Reserve ${coatPrices.maintWash[vehicleType]}
                        </button>
                      </div>
                      <small>Single visit. Recommended every 6–8 weeks</small>
                    </th>
                    <td className="col-sedan">$55</td>
                    <td className="col-cross">$65</td>
                    <td className="col-suv">$75</td>
                    <td className="col-van">$85</td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <span>Maintenance Plan <span style={{ color: 'var(--water-dk)', fontWeight: 700 }}>billed monthly</span></span>
                        <button
                          type="button"
                          onClick={() => handleAddTierService('Maintenance Plan (Monthly)', coatPrices.maintPlan, 'One wash every month · Priority booking')}
                          className="btn-add-table"
                        >
                          + Reserve ${coatPrices.maintPlan[vehicleType]}
                        </button>
                      </div>
                      <small>One wash every month. Cancel anytime. Priority booking</small>
                    </th>
                    <td className="col-sedan">$45</td>
                    <td className="col-cross">$55</td>
                    <td className="col-suv">$65</td>
                    <td className="col-van">$75</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p style={{ fontFamily: 'var(--mono)', fontSize: '0.84rem', color: 'var(--muted-color)', margin: '1rem 0 0' }}>
              * Includes wash, iron decon, clay bar, correction and coating. Additional coating layer $150. Every System X coating is registered with CARFAX and appears on the vehicle history report.
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
                  {[
                    { name: 'System X LVP', sub: '3-year warranty against spills & UV cracking. CARFAX registered', tag: 'Leather, vinyl & plastic', withDetail: 229, standalone: 389 },
                    { name: 'System X Textile', sub: '2-year hydrophobic stain protection. CARFAX registered', tag: 'Fabric & carpet', withDetail: 149, standalone: 259 },
                    { name: 'System X LVP + Textile', sub: 'Full cabin coated, warranted and CARFAX registered', tag: 'Complete Interior', withDetail: 325, standalone: 499, highlight: true },
                    { name: 'Nano-Brite Leather Guard', sub: '8–12 month leather protection', tag: '', withDetail: 99, standalone: 170 },
                    { name: 'Nano-Brite Fabric Guard', sub: '8–12 month stain barrier', tag: '', withDetail: 89, standalone: 150 },
                    { name: 'Nano-Brite Leather + Fabric', sub: '8–12 month protection. Our best-value interior package', tag: 'Complete Interior', withDetail: 175, standalone: 279 },
                    { name: 'System X Glass+', sub: 'Up to 2 years. Drastically improves wet-weather driving visibility', tag: 'Windshield & windows', withDetail: 125, standalone: 165 },
                    { name: 'System X Wheel+', sub: 'Repels corrosive brake dust. Wheels removed for 100% barrel coverage', tag: 'Wheel coating', withDetail: 249, standalone: 329 },
                    { name: 'System X Revive', sub: 'Restores faded oxidized exterior plastic & rubber moldings', tag: 'Trim restoration', withDetail: 89, standalone: 129 },
                  ].map((item, idx) => (
                    <tr key={idx}>
                      <th scope="row">
                        {item.name} {item.tag && <span style={{ color: 'var(--gold-primary)', fontWeight: item.highlight ? 800 : 600 }}>{item.tag}</span>}
                        <small>{item.sub}</small>
                      </th>
                      <td>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
                          <span>${item.withDetail}</span>
                          <button
                            type="button"
                            onClick={() => handleAddInteriorCoating(item.name, item.withDetail, false)}
                            className="btn-add-table"
                            style={{ fontSize: '0.68rem', padding: '0.2rem 0.55rem' }}
                          >
                            + Add With Detail
                          </button>
                        </div>
                      </td>
                      <td>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
                          <span>${item.standalone}</span>
                          <button
                            type="button"
                            onClick={() => handleAddInteriorCoating(item.name, item.standalone, true)}
                            className="btn-add-table"
                            style={{ fontSize: '0.68rem', padding: '0.2rem 0.55rem' }}
                          >
                            + Add Standalone
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
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
                  { name: 'Engine Bay Cleaning', price: '$40', priceNum: 40 },
                  { name: 'Tire Shine', price: '$10', priceNum: 10 },
                  { name: 'Summer Mats Shampoo Wash', price: '$20', priceNum: 20 },
                  { name: 'Headlight Restoration (pair)', price: '$60', priceNum: 60 },
                  { name: 'Clay Bar Decontamination', price: '$60', priceNum: 60 },
                  { name: 'Odour Treatment', price: '$50', priceNum: 50 },
                  { name: 'Pet Hair Removal', price: '$50', priceNum: 50 },
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.85rem 0', borderBottom: idx < 6 ? '1px dashed var(--surface-border)' : 'none' }}>
                    <div>
                      <strong style={{ fontSize: '1.05rem', color: 'var(--heading-color)', display: 'block' }}>{item.name}</strong>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                      <b style={{ fontFamily: 'var(--display)', fontSize: '1.65rem', color: 'var(--water-dk)' }}>{item.price}</b>
                      <button
                        type="button"
                        onClick={() => handleAddAddon(item.name, item.priceNum)}
                        className="btn-add-table"
                      >
                        + Add
                      </button>
                    </div>
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
                <p style={{ color: '#D8E5F4', fontSize: '0.96rem', lineHeight: 1.6, maxWidth: '28rem', margin: '0 auto 1.25rem' }}>
                  Not automatic. It applies only when a vehicle needs a lot more work than usual — heavy mess from kids or pets, or a work vehicle. We look the car over with you and tell you before any work begins, never after.
                </p>
                <button
                  type="button"
                  onClick={() => handleAddAddon("If it's extra dirty (Kids/Pets/Work)", 50)}
                  className="btn btn--gold"
                  style={{ minHeight: '40px', padding: '0 1.25rem', fontSize: '0.88rem' }}
                >
                  + Add Surcharge ($50)
                </button>
              </div>

            </div>
          </div>
        )}

        {/* View or print rate card link and cart action */}
        <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px dashed var(--surface-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <a href="/rates.html" className="btn btn--outline" target="_blank" rel="noopener noreferrer">
            <FileText style={{ width: '1.1rem', height: '1.1rem' }} />
            <span>View or print the full rate card</span>
          </a>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button onClick={() => setIsCartOpen(true)} className="btn btn--outline">
              <ShoppingBag style={{ width: '1.1rem', height: '1.1rem' }} />
              <span>View Cart</span>
            </button>
            <button onClick={() => onOpenBooking()} className="btn btn--gold">
              <span>Book an appointment</span>
              <ArrowRight style={{ width: '1.1rem', height: '1.1rem' }} />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
