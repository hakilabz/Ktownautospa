import React, { useState, useEffect } from 'react';
import {
  Car,
  Sparkles,
  ShieldCheck,
  Check,
  Clock,
  ArrowRight,
  Plus,
  ShoppingBag,
  Award,
  Layers,
  Droplets,
  Star,
  CheckCircle2,
} from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function QuoteBuilder({ onProceedToBooking }) {
  const { cart, addToCart, removeFromCart, setIsCartOpen, subtotal } = useCart();

  // Vehicle selector state
  const [selectedVehicle, setSelectedVehicle] = useState('c-sedan'); // 'c-sedan' | 'c-cross' | 'c-suv' | 'c-van'
  const [activeTab, setActiveTab] = useState('wash'); // 'wash' | 'polish' | 'coat' | 'interior' | 'addons'

  // Listen for navigation events from other sections (e.g. Coating section click)
  useEffect(() => {
    const handleTabChange = (e) => {
      if (e.detail?.tab) {
        setActiveTab(e.detail.tab);
        const el = document.getElementById('packages');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    window.addEventListener('select-quote-tab', handleTabChange);
    return () => window.removeEventListener('select-quote-tab', handleTabChange);
  }, []);

  const vehicles = [
    { id: 'c-sedan', label: 'Sedan / Coupe', sub: 'Standard 4-door / 2-door', icon: Car },
    { id: 'c-cross', label: 'Crossover', sub: '5-Seat Compact SUV', icon: Car },
    { id: 'c-suv', label: 'Large SUV / Truck', sub: '3-Row 7-Seat / Pickup', icon: Car },
    { id: 'c-van', label: 'Van / Minivan', sub: 'Passenger & Cargo Van', icon: Car },
  ];

  const tabs = [
    { id: 'wash', label: 'Wash & Detailing', icon: Droplets, count: 5 },
    { id: 'polish', label: 'Polish & Paint Correction', icon: Sparkles, count: 4 },
    { id: 'coat', label: 'Ceramic Coatings', icon: ShieldCheck, badge: 'All 9 Packages', count: 9 },
    { id: 'interior', label: 'Interior & Glass Protection', icon: Layers, count: 9 },
    { id: 'addons', label: 'A La Carte Add-ons', icon: Plus, count: 7 },
  ];

  // 1. Wash & Detailing Services
  const washPackages = [
    {
      id: 'hand-car-wash',
      title: 'Hand Car Wash',
      desc: 'pH-neutral wash & wax soap, door jambs wiped, wheels & tires cleaned, microfiber blown dry with zero swirls.',
      duration: 'Approx. 45 mins',
      prices: { 'c-sedan': 30, 'c-cross': 40, 'c-suv': 45, 'c-van': 50 },
      features: ['Hand wash & wax soap', 'Wheels & wheel wells cleaned', 'Tire rinse & door jamb wipe', 'Blown dry with plush microfiber'],
    },
    {
      id: 'interior-refresh',
      title: 'Interior Refresh',
      desc: 'Doors, jambs, panels and dashboard wiped down, full blowout and vacuum, rubber mats washed or carpet mats dry-cleaned.',
      duration: 'Approx. 1 hr',
      prices: { 'c-sedan': 70, 'c-cross': 85, 'c-suv': 95, 'c-van': 105 },
      features: ['Air compressor blowout of all crevices', 'High-suction full cabin vacuum', 'Dash, console & door panels wiped', 'Rubber or carpet mats deep washed'],
    },
    {
      id: 'medium-package',
      title: 'Medium Package (Most Popular)',
      badge: 'Popular',
      desc: 'The complete inside & outside refresh. Full interior vacuum, glass, mats, jambs, and exterior hand wash.',
      duration: 'Approx. 2 hrs',
      prices: { 'c-sedan': 100, 'c-cross': 130, 'c-suv': 150, 'c-van': 160 },
      features: ['Exterior hand wash & spray sealant', 'Interior blowout & complete vacuum', 'Glass streak-free cleaning inside/out', 'Door jambs & rubber mat washing'],
    },
    {
      id: 'interior-complete',
      title: 'Interior Complete (Steam Extraction)',
      desc: '305°F commercial steam extraction through the entire cabin. Seats and carpets shampooed, vinyl & leather cleaned and dressed.',
      duration: 'Approx. 3 hrs',
      prices: { 'c-sedan': 175, 'c-cross': 199, 'c-suv': 229, 'c-van': 249 },
      features: ['305°F thermal steam extraction', 'Seats & carpets scrubbed & shampooed', 'Leather deep-cleaned & conditioned', 'Stains & salt crust breakdown'],
    },
    {
      id: 'full-detail',
      title: 'Full Detail (Complete Transformation)',
      badge: 'Best Value',
      desc: 'Medium Package plus summer mats steamed, carpets & seats hot-water extracted, engine bay wiped, and paint sealant applied.',
      duration: 'Approx. 4 hrs',
      prices: { 'c-sedan': 200, 'c-cross': 230, 'c-suv': 250, 'c-van': 270 },
      features: ['Exterior hand wash + protective spray sealant', 'Complete 305°F steam extraction inside', 'All seats, carpets & mats scrubbed', 'Leather conditioning & plastic UV dressing'],
    },
  ];

  // 2. Polish & Paint Correction
  const polishPackages = [
    {
      id: 'wash-machine-wax',
      title: 'Wash & Machine Wax',
      desc: 'Exterior decon wash plus machine application of synthetic carnauba polymer sealant. Provides deep gloss for up to 6 months.',
      duration: 'Approx. 2 hrs',
      prices: { 'c-sedan': 120, 'c-cross': 140, 'c-suv': 160, 'c-van': 180 },
      features: ['Dual-action machine application', '6-month hydrophobic sealant barrier', 'No aggressive abrasives', 'Enhances clear coat reflectivity'],
    },
    {
      id: 'gloss-enhancement',
      title: 'Gloss Enhancement',
      desc: 'Fine clay bar treatment plus one-step all-in-one polish. Removes light haze and surface oxidation for enhanced gloss.',
      duration: 'Approx. 3 hrs',
      prices: { 'c-sedan': 200, 'c-cross': 230, 'c-suv': 260, 'c-van': 290 },
      features: ['Clay bar chemical & mechanical decon', 'All-in-one micro-fine polish', 'Removes 30–40% light wash marks', 'Seals paint with polymer wax'],
    },
    {
      id: '1-step-correction',
      title: '1-Step Paint Correction',
      desc: 'Dedicated machine compound/polish step with paint depth gauge inspection. Permanently eliminates 50–70% of swirls and scratches.',
      duration: 'Approx. 6 hrs',
      prices: { 'c-sedan': 350, 'c-cross': 400, 'c-suv': 450, 'c-van': 500 },
      features: ['Digital paint depth measurement', '50–70% permanent swirl defect removal', 'Pad & compound matched to clear coat', 'IPA panel prep solvent wipe included'],
    },
    {
      id: '2-step-correction',
      title: '2-Step Paint Correction (Showroom Mirror)',
      desc: 'Heavy compound cut followed by jeweled finishing polish. Eliminates 80–90% of scratches, heavy oxidation, and hazing.',
      duration: 'Approx. 11 hrs',
      prices: { 'c-sedan': 650, 'c-cross': 750, 'c-suv': 850, 'c-van': 950 },
      features: ['Heavy cut compounding stage', 'Ultra-fine mirror finish jeweling stage', '80–90% defect removal rate', 'Essential prep before multi-year ceramic'],
    },
  ];

  // 3. ALL 9 Ceramic Coating Packages
  const ceramicPackages = [
    {
      id: 'nanobrite-rejuvenate',
      title: 'Nano-Brite Rejuvenate (1 Year)',
      desc: 'Budget-friendly genuine ceramic protection. Includes decon wash, 1-step machine polish, and 1 layer of 9H ceramic coating.',
      duration: 'Approx. 5 hrs',
      prices: { 'c-sedan': 449, 'c-cross': 499, 'c-suv': 549, 'c-van': 599 },
      warranty: '1 Year Protection',
      features: ['Iron decon + clay bar prep', '1-step machine paint polish included', '1 layer 9H Nano-Brite ceramic', 'Super-slick hydrophobic water beading'],
    },
    {
      id: 'nanobrite-ultra',
      title: 'Nano-Brite Ultra (3 Year)',
      desc: 'Multi-year ceramic shield. Complete decontamination, 1-step paint correction, and 2 layers of durable ceramic protection.',
      duration: 'Approx. 6 hrs',
      prices: { 'c-sedan': 649, 'c-cross': 749, 'c-suv': 849, 'c-van': 899 },
      warranty: '3 Year Protection',
      features: ['Full chemical & mechanical decontamination', '1-step machine gloss enhancement', 'Ultra hydrophobic contact angle', 'Shields against road salt & winter grime'],
    },
    {
      id: 'nanobrite-evo',
      title: 'Nano-Brite EVO Graphene (7 Year)',
      badge: 'Graphene Matrix',
      desc: 'Advanced graphene-infused ceramic coating with reduced water-spotting and extreme heat/chemical resistance.',
      duration: 'Approx. 10 hrs',
      prices: { 'c-sedan': 1199, 'c-cross': 1299, 'c-suv': 1399, 'c-van': 1499 },
      warranty: '7 Year Protection',
      features: ['Graphene ceramic nanoplatelet formulation', '2-step machine correction included', 'High contact angle water sheeting', 'Resistant to bird droppings & road brine'],
    },
    {
      id: 'systemx-crystal',
      title: 'System X Crystal+ (2 Year CARFAX)',
      badge: 'CARFAX Verified',
      isCarfax: true,
      desc: 'Accredited installation logged directly to your vehicle’s CARFAX Canada report. Full decon, 1-step correction, and paint + glass coating.',
      duration: 'Approx. 8 hrs',
      prices: { 'c-sedan': 949, 'c-cross': 1049, 'c-suv': 1149, 'c-van': 1249 },
      warranty: '2 Year Factory Warranty · CARFAX Canada',
      features: ['Official CARFAX Canada warranty registration', '1-step paint correction included', 'Paint & exterior glass coated', 'Self-cleaning gloss barrier'],
    },
    {
      id: 'systemx-pro',
      title: 'System X Pro+ (6 Year CARFAX)',
      badge: 'Flagship 6-Year',
      isCarfax: true,
      desc: 'Heavy-duty 9H ceramic shield. Includes 2-step paint correction, paint coating, glass coating, and wheel face coating.',
      duration: 'Approx. 11 hrs',
      prices: { 'c-sedan': 1299, 'c-cross': 1449, 'c-suv': 1599, 'c-van': 1749 },
      warranty: '6 Year Factory Warranty · CARFAX Canada',
      features: ['6-year factory warranty on CARFAX report', '2-step full paint correction included', 'Paint, windshield/glass & wheel faces coated', 'Withstands corrosive Kingston winter brine'],
    },
    {
      id: 'systemx-maxg',
      title: 'System X Max G+ (10 Year Graphene CARFAX)',
      badge: '10-Year Graphene',
      isCarfax: true,
      desc: 'Top-tier graphene ceramic system. Unmatched depth, extreme scratch resistance, slickness, and 10-year registered CARFAX warranty.',
      duration: 'Approx. 12 hrs',
      prices: { 'c-sedan': 1699, 'c-cross': 1849, 'c-suv': 1999, 'c-van': 2149 },
      warranty: '10 Year Factory Warranty · CARFAX Canada',
      features: ['10-year registered CARFAX Canada warranty', '2-step mirror jeweling correction included', 'Thicker protective matrix (30% more solids)', 'Coating on paint, glass, and wheels'],
    },
    {
      id: 'systemx-diamond',
      title: 'System X Diamond SS (Lifetime CARFAX)',
      badge: 'Lifetime Protection',
      isCarfax: true,
      desc: 'The pinnacle of surface science. Lifetime registered CARFAX protection, maximum hardness, and permanent glossy hydrophobic layer.',
      duration: 'Approx. 13 hrs',
      prices: { 'c-sedan': 1799, 'c-cross': 1949, 'c-suv': 2099, 'c-van': 2249 },
      warranty: 'Lifetime Factory Warranty · CARFAX Canada',
      features: ['Lifetime factory warranty logged to CARFAX', 'Multi-layer 9H ceramic application', 'Full 2-step compound & jeweling prep', 'Complete exterior package (Paint, Glass, Wheels)'],
    },
    {
      id: 'ceramic-maint-wash',
      title: 'Ceramic Maintenance Wash (Single Visit)',
      desc: 'Specialized pH-neutral wash formulated for coated vehicles. Decontaminates coating pores and restores maximum hydrophobic beading.',
      duration: 'Approx. 1 hr',
      prices: { 'c-sedan': 55, 'c-cross': 65, 'c-suv': 75, 'c-van': 85 },
      features: ['Ceramic-safe shampoo & foam cannon', 'Chemical topper boost application', 'Microfiber air dry to prevent marring', 'Preserves factory coating warranty'],
    },
    {
      id: 'maint-plan',
      title: 'Ceramic Maintenance Plan (Monthly Subscription)',
      desc: 'One ceramic maintenance visit every month. Keeps your coating in peak condition, renews hydrophobics, and provides priority booking.',
      duration: 'Monthly',
      prices: { 'c-sedan': 45, 'c-cross': 55, 'c-suv': 65, 'c-van': 75 },
      features: ['Monthly maintenance decontamination wash', 'Hydrophobic booster applied every visit', 'Priority booking schedule', 'Cancel or pause anytime'],
    },
  ];

  // 4. Interior & Glass Protection
  const interiorPackages = [
    {
      id: 'systemx-lvp',
      title: 'System X LVP (Leather, Vinyl & Plastic)',
      desc: '3-year warranty against spills, blue-jean dye transfer, and sun fading. Registered to vehicle CARFAX Canada report.',
      withDetail: 229,
      standalone: 389,
      badge: 'CARFAX Verified',
      isCarfax: true,
    },
    {
      id: 'systemx-textile',
      title: 'System X Textile (Fabric & Carpet)',
      desc: '2-year barrier against liquid spills, coffee, winter salt, and food stains. Registered to vehicle CARFAX Canada report.',
      withDetail: 149,
      standalone: 259,
      badge: 'CARFAX Verified',
      isCarfax: true,
    },
    {
      id: 'systemx-lvp-textile',
      title: 'System X LVP + Textile Complete Interior',
      desc: 'Full cabin ceramic protection covering leather, fabric, carpets, and dashboard. CARFAX Canada registered warranty.',
      withDetail: 325,
      standalone: 499,
      badge: 'Complete Interior CARFAX',
      isCarfax: true,
    },
    {
      id: 'nanobrite-leather',
      title: 'Nano-Brite Leather Guard',
      desc: '8–12 month hydrophobic barrier for leather seating and steering wheels. Repels liquids and prevents cracking.',
      withDetail: 99,
      standalone: 170,
    },
    {
      id: 'nanobrite-fabric',
      title: 'Nano-Brite Fabric Guard',
      desc: '8–12 month liquid repellent shield for fabric seats and carpets. Spills bead up for quick wipe-away.',
      withDetail: 89,
      standalone: 150,
    },
    {
      id: 'nanobrite-leather-fabric',
      title: 'Nano-Brite Leather + Fabric Complete Interior',
      desc: 'Best-value complete interior ceramic bundle for daily drivers. Repels water, grease, and pet accidents.',
      withDetail: 175,
      standalone: 279,
    },
    {
      id: 'systemx-glass',
      title: 'System X Glass+ (Windshield & Windows)',
      desc: 'Up to 2-year hydrophobic rain-repellent coating. Water sheets off above 50 km/h, dramatically enhancing night vision.',
      withDetail: 125,
      standalone: 165,
    },
    {
      id: 'systemx-wheel',
      title: 'System X Wheel+ (Ceramic Wheel Coating)',
      desc: 'High-temperature wheel face and barrel ceramic shield. Corrosive brake dust washes off with just water.',
      withDetail: 249,
      standalone: 329,
    },
    {
      id: 'systemx-revive',
      title: 'System X Revive (Trim Restoration & Coating)',
      desc: 'Restores faded black exterior plastics to factory-fresh darkness and protects against future UV bleaching.',
      withDetail: 89,
      standalone: 129,
    },
  ];

  // 5. A La Carte Add-ons
  const addonList = [
    { id: 'engine-bay', title: 'Engine Bay Cleaning & Dressing', price: 40, desc: 'Degreased, detailed, and dressed with satin UV protectant.' },
    { id: 'tire-shine', title: 'Premium Tire Shine & Sealant', price: 10, desc: 'Long-lasting no-sling silicone-free satin black finish.' },
    { id: 'summer-mats', title: 'Summer Mats Deep Shampoo Wash', price: 20, desc: 'Hot water scrub and vacuum extraction for fabric summer floor mats.' },
    { id: 'headlights', title: 'Headlight Restoration (Pair)', price: 60, desc: 'Wet-sanded, compounded, and UV sealed to remove yellow hazing.' },
    { id: 'clay-bar', title: 'Clay Bar Paint Decontamination', price: 60, desc: 'Removes industrial fallout, rail dust, and rough surface grit.' },
    { id: 'odour', title: 'Ozone Odour & Bacteria Treatment', price: 50, desc: 'Kills smoke, mildew, and pet odours at the molecular level.' },
    { id: 'pet-hair', title: 'Excess Pet Hair / Extra Dirty Surcharge', price: 50, desc: 'Extra labor time for heavily soiled interiors, mud, or thick dog fur.' },
  ];

  // Helpers
  const handleAddService = (title, price, subtitle = '', serviceId = 'custom') => {
    addToCart(
      {
        serviceId,
        title,
        vehicleType: selectedVehicle,
        basePrice: price,
        subtitle,
      },
      true
    );
  };

  const isItemInCart = (title) => {
    return cart.some((c) => c.title === title && c.vehicleType === selectedVehicle);
  };

  return (
    <section id="packages" className="band" style={{ paddingTop: '2.5rem', scrollMarginTop: '80px' }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 1rem' }}>
        
        {/* Section Heading */}
        <div className="section-head" style={{ marginBottom: '2.5rem' }}>
          <p className="kicker">Kingston Auto Spa &middot; Complete Service Catalog</p>
          <h2>Interactive Quote Builder &amp; Pricing</h2>
          <p>
            Choose your vehicle type below to see exact prices across all detailing packages, System X &amp; Nano-Brite ceramic coatings, and specialized add-ons.
          </p>
        </div>

        {/* Step 1: Vehicle Selector Banner */}
        <div
          style={{
            background: 'var(--surface-card, #0d1b2e)',
            border: '2px solid var(--surface-border-gold, #C9A03C)',
            borderRadius: '16px',
            padding: '1.25rem',
            marginBottom: '2rem',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.25)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: '0.82rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--gold-primary)' }}>
              1. Select Vehicle Size (Updates All Prices Below)
            </span>
            <span style={{ fontSize: '0.78rem', color: 'var(--muted-color)' }}>
              Kingston shop drop-off &middot; 36 Joseph St
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem' }}>
            {vehicles.map((v) => {
              const isSelected = selectedVehicle === v.id;
              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setSelectedVehicle(v.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.85rem',
                    padding: '0.9rem 1rem',
                    borderRadius: '12px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    background: isSelected
                      ? 'linear-gradient(135deg, rgba(201, 160, 60, 0.25) 0%, rgba(201, 160, 60, 0.1) 100%)'
                      : 'var(--chip-inactive-bg, rgba(255, 255, 255, 0.05))',
                    border: `2px solid ${isSelected ? 'var(--gold, #C9A03C)' : 'var(--surface-border, rgba(255, 255, 255, 0.1))'}`,
                    color: isSelected ? 'var(--heading-color, #FFFFFF)' : 'var(--text-main)',
                    boxShadow: isSelected ? '0 4px 18px rgba(201, 160, 60, 0.25)' : 'none',
                  }}
                >
                  <div
                    style={{
                      width: '2.5rem',
                      height: '2.5rem',
                      borderRadius: '10px',
                      background: isSelected ? 'var(--gold, #C9A03C)' : 'rgba(255, 255, 255, 0.08)',
                      color: isSelected ? '#0A1E42' : 'var(--gold-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <v.icon style={{ width: '1.3rem', height: '1.3rem' }} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.95rem', color: isSelected ? 'var(--gold-primary)' : 'inherit' }}>
                      {v.label}
                    </div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--muted-color)', marginTop: '0.1rem' }}>
                      {v.sub}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Category Tabs */}
        <div
          style={{
            display: 'flex',
            gap: '0.5rem',
            overflowX: 'auto',
            paddingBottom: '0.5rem',
            marginBottom: '2rem',
            scrollbarWidth: 'none',
          }}
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.55rem',
                  padding: '0.75rem 1.25rem',
                  borderRadius: '999px',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  fontSize: '0.88rem',
                  fontWeight: 800,
                  transition: 'all 0.2s ease',
                  background: isActive ? 'var(--gold, #C9A03C)' : 'var(--surface-card, #0d1b2e)',
                  color: isActive ? '#0A1E42' : 'var(--heading-color)',
                  border: `1.5px solid ${isActive ? 'var(--gold, #C9A03C)' : 'var(--surface-border)'}`,
                  boxShadow: isActive ? '0 4px 15px rgba(201, 160, 60, 0.3)' : 'none',
                }}
              >
                <tab.icon style={{ width: '1.05rem', height: '1.05rem' }} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    style={{
                      background: isActive ? '#0A1E42' : 'var(--gold, #C9A03C)',
                      color: isActive ? 'var(--gold, #C9A03C)' : '#0A1E42',
                      fontSize: '0.66rem',
                      fontWeight: 900,
                      padding: '0.15rem 0.45rem',
                      borderRadius: '999px',
                    }}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Catalog Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          
          {/* TAB 1: Wash & Detailing */}
          {activeTab === 'wash' &&
            washPackages.map((pkg) => {
              const price = pkg.prices[selectedVehicle];
              const inCart = isItemInCart(pkg.title);
              return (
                <div key={pkg.id} className="frame" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
                      <span className="card-badge">{pkg.duration}</span>
                      {pkg.badge && (
                        <span style={{ fontFamily: 'var(--mono)', fontSize: '0.72rem', fontWeight: 800, color: 'var(--gold-primary)', background: 'rgba(201, 160, 60, 0.15)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                          ★ {pkg.badge}
                        </span>
                      )}
                    </div>

                    <h3 style={{ fontFamily: 'var(--display)', fontSize: '1.6rem', fontWeight: 800, textTransform: 'uppercase', margin: '0 0 0.5rem', color: 'var(--heading-color)' }}>
                      {pkg.title}
                    </h3>

                    <p style={{ fontSize: '0.88rem', color: 'var(--muted-color)', lineHeight: 1.5, margin: '0 0 1rem' }}>
                      {pkg.desc}
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', marginBottom: '1.25rem' }}>
                      {pkg.features.map((feat, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: 'var(--text-main)' }}>
                          <CheckCircle2 style={{ width: '0.95rem', height: '0.95rem', color: 'var(--gold-primary)', flexShrink: 0 }} />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ borderTop: '1px dashed var(--surface-border)', paddingTop: '1rem', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                    <div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--muted-color)', display: 'block' }}>Vehicle Price:</span>
                      <div style={{ fontFamily: 'var(--display)', fontSize: '1.85rem', fontWeight: 900, color: 'var(--gold-primary)' }}>
                        ${price} <span style={{ fontSize: '0.74rem', color: 'var(--muted-color)' }}>CAD</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleAddService(pkg.title, price, pkg.duration, pkg.id)}
                      className={inCart ? 'btn btn--navy' : 'btn btn--gold'}
                      style={{ minHeight: '42px', padding: '0 1.25rem', fontSize: '0.86rem' }}
                    >
                      {inCart ? 'Added ✓' : '+ Add to Cart'}
                    </button>
                  </div>
                </div>
              );
            })}

          {/* TAB 2: Polish & Paint Correction */}
          {activeTab === 'polish' &&
            polishPackages.map((pkg) => {
              const price = pkg.prices[selectedVehicle];
              const inCart = isItemInCart(pkg.title);
              return (
                <div key={pkg.id} className="frame" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
                      <span className="card-badge">{pkg.duration}</span>
                      {pkg.badge && (
                        <span style={{ fontFamily: 'var(--mono)', fontSize: '0.72rem', fontWeight: 800, color: 'var(--gold-primary)', background: 'rgba(201, 160, 60, 0.15)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                          ★ {pkg.badge}
                        </span>
                      )}
                    </div>

                    <h3 style={{ fontFamily: 'var(--display)', fontSize: '1.6rem', fontWeight: 800, textTransform: 'uppercase', margin: '0 0 0.5rem', color: 'var(--heading-color)' }}>
                      {pkg.title}
                    </h3>

                    <p style={{ fontSize: '0.88rem', color: 'var(--muted-color)', lineHeight: 1.5, margin: '0 0 1rem' }}>
                      {pkg.desc}
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', marginBottom: '1.25rem' }}>
                      {pkg.features.map((feat, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: 'var(--text-main)' }}>
                          <CheckCircle2 style={{ width: '0.95rem', height: '0.95rem', color: 'var(--gold-primary)', flexShrink: 0 }} />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ borderTop: '1px dashed var(--surface-border)', paddingTop: '1rem', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                    <div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--muted-color)', display: 'block' }}>Vehicle Price:</span>
                      <div style={{ fontFamily: 'var(--display)', fontSize: '1.85rem', fontWeight: 900, color: 'var(--gold-primary)' }}>
                        ${price} <span style={{ fontSize: '0.74rem', color: 'var(--muted-color)' }}>CAD</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleAddService(pkg.title, price, pkg.duration, pkg.id)}
                      className={inCart ? 'btn btn--navy' : 'btn btn--gold'}
                      style={{ minHeight: '42px', padding: '0 1.25rem', fontSize: '0.86rem' }}
                    >
                      {inCart ? 'Added ✓' : '+ Add to Cart'}
                    </button>
                  </div>
                </div>
              );
            })}

          {/* TAB 3: Ceramic Coating Packages (ALL 9) */}
          {activeTab === 'coat' &&
            ceramicPackages.map((pkg) => {
              const price = pkg.prices[selectedVehicle];
              const inCart = isItemInCart(pkg.title);
              return (
                <div
                  key={pkg.id}
                  className="frame"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    border: pkg.isCarfax ? '2px solid var(--surface-border-gold)' : undefined,
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
                      <span className="card-badge">{pkg.duration}</span>
                      {pkg.isCarfax ? (
                        <span className="cf-pill" style={{ margin: 0 }}>CARFAX Canada</span>
                      ) : pkg.badge ? (
                        <span style={{ fontFamily: 'var(--mono)', fontSize: '0.72rem', fontWeight: 800, color: 'var(--gold-primary)', background: 'rgba(201, 160, 60, 0.15)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                          {pkg.badge}
                        </span>
                      ) : null}
                    </div>

                    <h3 style={{ fontFamily: 'var(--display)', fontSize: '1.55rem', fontWeight: 800, textTransform: 'uppercase', margin: '0 0 0.5rem', color: 'var(--heading-color)' }}>
                      {pkg.title}
                    </h3>

                    {pkg.warranty && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--gold-primary)', fontWeight: 700, fontSize: '0.82rem', marginBottom: '0.65rem' }}>
                        <Award style={{ width: '1rem', height: '1rem' }} />
                        <span>{pkg.warranty}</span>
                      </div>
                    )}

                    <p style={{ fontSize: '0.88rem', color: 'var(--muted-color)', lineHeight: 1.5, margin: '0 0 1rem' }}>
                      {pkg.desc}
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', marginBottom: '1.25rem' }}>
                      {pkg.features.map((feat, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: 'var(--text-main)' }}>
                          <CheckCircle2 style={{ width: '0.95rem', height: '0.95rem', color: 'var(--gold-primary)', flexShrink: 0 }} />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ borderTop: '1px dashed var(--surface-border)', paddingTop: '1rem', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                    <div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--muted-color)', display: 'block' }}>Vehicle Price:</span>
                      <div style={{ fontFamily: 'var(--display)', fontSize: '1.85rem', fontWeight: 900, color: 'var(--gold-primary)' }}>
                        ${price} <span style={{ fontSize: '0.74rem', color: 'var(--muted-color)' }}>CAD</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleAddService(pkg.title, price, pkg.duration, pkg.id)}
                      className={inCart ? 'btn btn--navy' : 'btn btn--gold'}
                      style={{ minHeight: '42px', padding: '0 1.25rem', fontSize: '0.86rem' }}
                    >
                      {inCart ? 'Added ✓' : '+ Add to Cart'}
                    </button>
                  </div>
                </div>
              );
            })}

          {/* TAB 4: Interior & Glass Protection */}
          {activeTab === 'interior' &&
            interiorPackages.map((pkg) => {
              const inCartWithDetail = isItemInCart(`${pkg.title} (With Detail)`);
              const inCartStandalone = isItemInCart(`${pkg.title} (Standalone)`);
              return (
                <div key={pkg.id} className="frame" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
                      <span className="card-badge">Ceramic Coating</span>
                      {pkg.isCarfax && <span className="cf-pill" style={{ margin: 0 }}>CARFAX Registered</span>}
                    </div>

                    <h3 style={{ fontFamily: 'var(--display)', fontSize: '1.5rem', fontWeight: 800, textTransform: 'uppercase', margin: '0 0 0.5rem', color: 'var(--heading-color)' }}>
                      {pkg.title}
                    </h3>

                    <p style={{ fontSize: '0.88rem', color: 'var(--muted-color)', lineHeight: 1.5, margin: '0 0 1.25rem' }}>
                      {pkg.desc}
                    </p>
                  </div>

                  <div style={{ borderTop: '1px dashed var(--surface-border)', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <span style={{ fontSize: '0.74rem', color: 'var(--muted-color)', display: 'block' }}>Add with any detail:</span>
                        <b style={{ fontFamily: 'var(--display)', fontSize: '1.4rem', color: 'var(--water-dk)' }}>${pkg.withDetail} CAD</b>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleAddService(`${pkg.title} (With Detail)`, pkg.withDetail, 'Applied with detail package', pkg.id)}
                        className={inCartWithDetail ? 'btn btn--navy' : 'btn btn--outline'}
                        style={{ minHeight: '36px', padding: '0 0.85rem', fontSize: '0.78rem' }}
                      >
                        {inCartWithDetail ? 'Added ✓' : '+ Add with Detail'}
                      </button>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--surface-border)', paddingTop: '0.6rem' }}>
                      <div>
                        <span style={{ fontSize: '0.74rem', color: 'var(--muted-color)', display: 'block' }}>Standalone visit:</span>
                        <b style={{ fontFamily: 'var(--display)', fontSize: '1.4rem', color: 'var(--gold-primary)' }}>${pkg.standalone} CAD</b>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleAddService(`${pkg.title} (Standalone)`, pkg.standalone, 'Standalone preparation included', pkg.id)}
                        className={inCartStandalone ? 'btn btn--navy' : 'btn btn--gold'}
                        style={{ minHeight: '36px', padding: '0 0.85rem', fontSize: '0.78rem' }}
                      >
                        {inCartStandalone ? 'Added ✓' : '+ Add Standalone'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

          {/* TAB 5: Add-ons & Extras */}
          {activeTab === 'addons' &&
            addonList.map((addon) => {
              const inCart = isItemInCart(addon.title);
              return (
                <div key={addon.id} className="frame" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <span className="card-badge">Custom Add-on</span>
                    <h3 style={{ fontFamily: 'var(--display)', fontSize: '1.5rem', fontWeight: 800, textTransform: 'uppercase', margin: '0.5rem 0', color: 'var(--heading-color)' }}>
                      {addon.title}
                    </h3>
                    <p style={{ fontSize: '0.88rem', color: 'var(--muted-color)', lineHeight: 1.5, margin: '0 0 1.25rem' }}>
                      {addon.desc}
                    </p>
                  </div>

                  <div style={{ borderTop: '1px dashed var(--surface-border)', paddingTop: '1rem', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                    <div style={{ fontFamily: 'var(--display)', fontSize: '1.75rem', fontWeight: 900, color: 'var(--gold-primary)' }}>
                      ${addon.price} <span style={{ fontSize: '0.74rem', color: 'var(--muted-color)' }}>CAD</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleAddService(addon.title, addon.price, 'Individual specialty add-on', addon.id)}
                      className={inCart ? 'btn btn--navy' : 'btn btn--gold'}
                      style={{ minHeight: '40px', padding: '0 1.15rem', fontSize: '0.84rem' }}
                    >
                      {inCart ? 'Added ✓' : '+ Add Service'}
                    </button>
                  </div>
                </div>
              );
            })}

        </div>

        {/* Live Quote Bottom Floating Action Strip */}
        {cart.length > 0 && (
          <div
            style={{
              position: 'sticky',
              bottom: '1rem',
              zIndex: 50,
              background: 'linear-gradient(135deg, #0A1E42 0%, #12305F 100%)',
              border: '2px solid var(--gold, #C9A03C)',
              borderRadius: '16px',
              padding: '1.15rem 1.5rem',
              boxShadow: '0 15px 35px rgba(0, 0, 0, 0.45)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem',
              color: '#FFFFFF',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div
                style={{
                  width: '3rem',
                  height: '3rem',
                  borderRadius: '12px',
                  background: 'var(--gold, #C9A03C)',
                  color: '#0A1E42',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 900,
                  fontSize: '1.2rem',
                }}
              >
                {cart.length}
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--gold-lt, #F0D590)' }}>
                  Selected Vehicle: {vehicles.find((v) => v.id === selectedVehicle)?.label}
                </div>
                <div style={{ fontSize: '1.25rem', fontWeight: 900 }}>
                  Estimated Subtotal: <span style={{ color: 'var(--gold-lt)' }}>${subtotal.toFixed(2)} CAD</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="btn btn--outline"
                style={{ borderColor: 'rgba(255, 255, 255, 0.3)', color: '#FFFFFF', minHeight: '44px' }}
              >
                <ShoppingBag style={{ width: '1rem', height: '1rem' }} />
                <span>View Cart</span>
              </button>

              <button
                type="button"
                onClick={() => onProceedToBooking()}
                className="btn btn--gold"
                style={{ minHeight: '44px', padding: '0 1.5rem', fontWeight: 900 }}
              >
                <span>Proceed to Booking</span>
                <ArrowRight style={{ width: '1.1rem', height: '1.1rem' }} />
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
