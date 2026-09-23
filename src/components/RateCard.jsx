import React, { useState } from 'react';
import { Check, FileText, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

// Helper component for multi-vehicle rate rows
function RateTableRow({ title, titleExtra, subtitle, prices, onAdd, isCarfax }) {
  return (
    <tr style={isCarfax ? { background: 'rgba(62, 155, 218, 0.12)' } : undefined}>
      <th scope="row">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span>
            {title} {titleExtra} {isCarfax && <span className="cf-pill">CARFAX</span>}
          </span>
          <button
            type="button"
            onClick={() => onAdd(title, 'c-sedan', prices['c-sedan'], subtitle)}
            className="btn-add-table"
            title={`Quick Reserve ${title} (Sedan from $${prices['c-sedan']})`}
          >
            + Reserve
          </button>
        </div>
        <small>{subtitle}</small>
      </th>
      <td className="col-sedan">
        <button
          type="button"
          onClick={() => onAdd(title, 'c-sedan', prices['c-sedan'], subtitle)}
          className="price-cell-btn"
          title={`Reserve ${title} for Sedan ($${prices['c-sedan']})`}
        >
          ${prices['c-sedan']}
        </button>
      </td>
      <td className="col-cross">
        <button
          type="button"
          onClick={() => onAdd(title, 'c-cross', prices['c-cross'], subtitle)}
          className="price-cell-btn"
          title={`Reserve ${title} for Crossover ($${prices['c-cross']})`}
        >
          ${prices['c-cross']}
        </button>
      </td>
      <td className="col-suv">
        <button
          type="button"
          onClick={() => onAdd(title, 'c-suv', prices['c-suv'], subtitle)}
          className="price-cell-btn"
          title={`Reserve ${title} for SUV ($${prices['c-suv']})`}
        >
          ${prices['c-suv']}
        </button>
      </td>
      <td className="col-van">
        <button
          type="button"
          onClick={() => onAdd(title, 'c-van', prices['c-van'], subtitle)}
          className="price-cell-btn"
          title={`Reserve ${title} for Van ($${prices['c-van']})`}
        >
          ${prices['c-van']}
        </button>
      </td>
    </tr>
  );
}

export default function RateCard({ onOpenBooking }) {
  const { addToCart, setIsCartOpen } = useCart();
  const [activeTab, setActiveTab] = useState('wash');

  const tabs = [
    { id: 'wash', label: 'Wash & detail', price: 'from $30' },
    { id: 'polish', label: 'Polish & protect', price: 'from $120' },
    { id: 'coat', label: 'Ceramic coating', price: 'from $449' },
    { id: 'int', label: 'Interior & glass', price: 'from $89' },
    { id: 'extra', label: 'Add-ons', price: 'from $10' },
  ];

  const handleAddTierService = (title, vehicleType, price, subtitle = '') => {
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
        vehicleType: 'c-sedan',
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
        vehicleType: 'c-sedan',
        basePrice: price,
        subtitle: 'Add-on service',
      },
      true
    );
  };

  // Pricing catalogs for all vehicle tiers
  const washServices = [
    {
      title: 'Hand Car Wash',
      subtitle: 'Wash & wax soap, windows, blown dry',
      prices: { 'c-sedan': 30, 'c-cross': 40, 'c-suv': 45, 'c-van': 50 },
    },
    {
      title: 'Interior Refresh',
      subtitle: 'Doors, jambs, panels and dashboard wiped down, full blow-out and vacuum, rubber mats washed or carpet mats dry-cleaned. No steam, no scrubbing — the quick tidy-up · approx 1 hr',
      prices: { 'c-sedan': 70, 'c-cross': 85, 'c-suv': 95, 'c-van': 105 },
    },
    {
      title: 'Medium Package',
      subtitle: 'Interior vacuum & glass, mats, jambs, hand wash · approx 2 hrs',
      prices: { 'c-sedan': 100, 'c-cross': 130, 'c-suv': 150, 'c-van': 160 },
    },
    {
      title: 'Interior Complete',
      titleExtra: <small style={{ display: 'inline', fontWeight: 400 }}>(interior only)</small>,
      subtitle: 'Everything we do inside — 305°F steam extraction through the whole car, seats and carpets shampooed, vinyl and trim cleaned and dressed. The only thing it leaves out is the exterior wash — add a hand wash for $30 · approx 3 hrs',
      prices: { 'c-sedan': 175, 'c-cross': 199, 'c-suv': 229, 'c-van': 249 },
    },
    {
      title: 'Full Detail',
      subtitle: 'Medium Package plus summer mats steamed, carpets & seats scrubbed · approx 4 hrs',
      prices: { 'c-sedan': 200, 'c-cross': 230, 'c-suv': 250, 'c-van': 270 },
    },
  ];

  const polishServices = [
    {
      title: 'Wash & Machine Wax',
      subtitle: 'No abrasives. Gloss and protection for around 6 months · approx 2 hrs',
      prices: { 'c-sedan': 120, 'c-cross': 140, 'c-suv': 160, 'c-van': 180 },
    },
    {
      title: 'Gloss Enhancement',
      subtitle: 'Clay plus one-step all-in-one polish. Reduces light swirls · approx 3 hrs',
      prices: { 'c-sedan': 200, 'c-cross': 230, 'c-suv': 260, 'c-van': 290 },
    },
    {
      title: '1-Step Paint Correction',
      subtitle: 'Machine polish and sealant. Removes 50–70% of defects · approx 6 hrs',
      prices: { 'c-sedan': 350, 'c-cross': 400, 'c-suv': 450, 'c-van': 500 },
    },
    {
      title: '2-Step Paint Correction',
      subtitle: 'Compound and polish. Removes 80–90% of defects · approx 11 hrs',
      prices: { 'c-sedan': 650, 'c-cross': 750, 'c-suv': 850, 'c-van': 950 },
    },
  ];

  const coatServices = [
    {
      title: 'Nano-Brite Rejuvenate',
      titleExtra: <span style={{ color: 'var(--gold-primary)', fontWeight: 700 }}>1 year</span>,
      subtitle: 'Decon + 1-step correction + 1 layer · approx 5 hrs',
      prices: { 'c-sedan': 449, 'c-cross': 499, 'c-suv': 549, 'c-van': 599 },
    },
    {
      title: 'Nano-Brite Ultra',
      titleExtra: <span style={{ color: 'var(--gold-primary)', fontWeight: 700 }}>3 year</span>,
      subtitle: 'Decon + 1-step correction + 1 layer · approx 6 hrs',
      prices: { 'c-sedan': 649, 'c-cross': 749, 'c-suv': 849, 'c-van': 899 },
    },
    {
      title: 'Nano-Brite EVO Graphene',
      titleExtra: <span style={{ color: 'var(--gold-primary)', fontWeight: 700 }}>7 year</span>,
      subtitle: 'Graphene coating. Decon + 2-step correction + top coat · approx 10 hrs',
      prices: { 'c-sedan': 1199, 'c-cross': 1299, 'c-suv': 1399, 'c-van': 1499 },
    },
    {
      title: 'System X Crystal+',
      titleExtra: <span style={{ color: 'var(--heading-color)', fontWeight: 800 }}>2 year</span>,
      subtitle: '1-step correction + paint and glass coating · approx 8 hrs',
      prices: { 'c-sedan': 949, 'c-cross': 1049, 'c-suv': 1149, 'c-van': 1249 },
      isCarfax: true,
    },
    {
      title: 'System X Pro+',
      titleExtra: <span style={{ color: 'var(--heading-color)', fontWeight: 800 }}>6 year</span>,
      subtitle: '2-step correction + paint, glass and wheel coatings · approx 11 hrs',
      prices: { 'c-sedan': 1299, 'c-cross': 1449, 'c-suv': 1599, 'c-van': 1749 },
      isCarfax: true,
    },
    {
      title: 'System X Max G+',
      titleExtra: <span style={{ color: 'var(--heading-color)', fontWeight: 800 }}>10 year</span>,
      subtitle: 'Graphene. 2-step correction + paint, glass and wheel coatings · approx 12 hrs',
      prices: { 'c-sedan': 1699, 'c-cross': 1849, 'c-suv': 1999, 'c-van': 2149 },
      isCarfax: true,
    },
    {
      title: 'System X Diamond SS',
      titleExtra: <span style={{ color: 'var(--gold-primary)', fontWeight: 900 }}>Lifetime</span>,
      subtitle: '2-step correction + paint, glass and wheel coatings · approx 13 hrs',
      prices: { 'c-sedan': 1799, 'c-cross': 1949, 'c-suv': 2099, 'c-van': 2249 },
      isCarfax: true,
    },
    {
      title: 'Ceramic Maintenance Wash',
      subtitle: 'Single visit. Recommended every 6–8 weeks',
      prices: { 'c-sedan': 55, 'c-cross': 65, 'c-suv': 75, 'c-van': 85 },
    },
    {
      title: 'Maintenance Plan',
      titleExtra: <span style={{ color: 'var(--water-dk)', fontWeight: 700 }}>billed monthly</span>,
      subtitle: 'One wash every month. Cancel anytime. Priority booking',
      prices: { 'c-sedan': 45, 'c-cross': 55, 'c-suv': 65, 'c-van': 75 },
    },
  ];

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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <p className="kicker" style={{ margin: 0 }}>Wash &amp; detail</p>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '0.78rem', color: 'var(--muted-color)' }}>
                Tap any price to reserve for your vehicle &middot; Horizontal scroll on smaller screens
              </span>
            </div>
            
            <div className="pricewrap">
              <table className="prices">
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
                  {washServices.map((svc, idx) => (
                    <RateTableRow
                      key={idx}
                      title={svc.title}
                      titleExtra={svc.titleExtra}
                      subtitle={svc.subtitle}
                      prices={svc.prices}
                      onAdd={handleAddTierService}
                    />
                  ))}
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
                  <p style={{ fontFamily: 'var(--mono)', fontSize: '0.86rem', color: 'var(--gold-primary)', fontWeight: 700, margin: '0 0 0.75rem' }}>
                    Approx. 2 hours · Select vehicle to reserve:
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.45rem', marginBottom: '0.5rem' }}>
                    {[
                      { id: 'c-sedan', name: 'Sedan', price: 100 },
                      { id: 'c-cross', name: 'Cross', price: 130 },
                      { id: 'c-suv', name: 'SUV', price: 150 },
                      { id: 'c-van', name: 'Van', price: 160 },
                    ].map((tier) => (
                      <button
                        key={tier.id}
                        type="button"
                        onClick={() => handleAddTierService('Medium Package', tier.id, tier.price, 'Interior vacuum & glass, mats, jambs, hand wash')}
                        className="btn btn--outline"
                        style={{ padding: '0.55rem 0.2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: 1.2 }}
                        title={`Reserve Medium Package for ${tier.name} ($${tier.price})`}
                      >
                        <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', opacity: 0.85 }}>{tier.name}</span>
                        <strong style={{ fontSize: '1.05rem', color: 'var(--heading-color)', marginTop: '2px' }}>${tier.price}</strong>
                      </button>
                    ))}
                  </div>
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
                  <p style={{ fontFamily: 'var(--mono)', fontSize: '0.86rem', color: 'var(--gold-primary)', fontWeight: 700, margin: '0 0 0.75rem' }}>
                    Approx. 4 hours · Select vehicle to reserve:
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.45rem', marginBottom: '0.5rem' }}>
                    {[
                      { id: 'c-sedan', name: 'Sedan', price: 200 },
                      { id: 'c-cross', name: 'Cross', price: 230 },
                      { id: 'c-suv', name: 'SUV', price: 250 },
                      { id: 'c-van', name: 'Van', price: 270 },
                    ].map((tier) => (
                      <button
                        key={tier.id}
                        type="button"
                        onClick={() => handleAddTierService('Full Detail', tier.id, tier.price, 'Medium Package plus summer mats steamed, carpets & seats scrubbed')}
                        className="btn btn--gold"
                        style={{ padding: '0.55rem 0.2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: 1.2 }}
                        title={`Reserve Full Detail for ${tier.name} ($${tier.price})`}
                      >
                        <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', opacity: 0.9 }}>{tier.name}</span>
                        <strong style={{ fontSize: '1.05rem', color: '#0A1E42', marginTop: '2px' }}>${tier.price}</strong>
                      </button>
                    ))}
                  </div>
                </div>
              </article>

            </div>
          </div>
        )}

        {/* Tab 2: Polish & Protect */}
        {activeTab === 'polish' && (
          <div role="tabpanel" id="panel-polish" aria-labelledby="tab-polish">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <p className="kicker" style={{ margin: 0 }}>Polish &amp; protect</p>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '0.78rem', color: 'var(--muted-color)' }}>
                Tap any price to reserve for your vehicle &middot; Horizontal scroll on smaller screens
              </span>
            </div>
            
            <div className="pricewrap">
              <table className="prices">
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
                  {polishServices.map((svc, idx) => (
                    <RateTableRow
                      key={idx}
                      title={svc.title}
                      subtitle={svc.subtitle}
                      prices={svc.prices}
                      onAdd={handleAddTierService}
                    />
                  ))}
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
            <div style={{
              background: 'var(--water-pale)', border: '2px solid var(--water)',
              borderRadius: '10px', padding: '1rem 1.25rem', marginBottom: '1.5rem',
              color: 'var(--navy-deep)', fontWeight: 700, fontSize: '0.98rem',
            }}>
              You don't have to coat the whole car. Trim or fabric from $89, glass $125, wheels $249 &mdash; alone or with any detail. Full paint packages from $449.
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <p className="kicker" style={{ margin: 0 }}>Ceramic coating packages &mdash; includes wash, iron decon, clay bar, correction and coating</p>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '0.78rem', color: 'var(--muted-color)' }}>
                Tap any price to reserve for your vehicle &middot; Horizontal scroll on smaller screens
              </span>
            </div>
            
            <div className="pricewrap">
              <table className="prices">
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
                  {coatServices.map((svc, idx) => (
                    <RateTableRow
                      key={idx}
                      title={svc.title}
                      titleExtra={svc.titleExtra}
                      subtitle={svc.subtitle}
                      prices={svc.prices}
                      onAdd={handleAddTierService}
                      isCarfax={svc.isCarfax}
                    />
                  ))}
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
