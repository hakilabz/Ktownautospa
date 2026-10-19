import React, { useState, useEffect } from 'react';
import {
  Car,
  Truck,
  Bus,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  Plus,
  ShoppingBag,
  Award,
  Layers,
  Droplets,
  CheckCircle2,
  Check,
  Info,
  X,
  Calendar,
  Flame,
  Clock,
  ChevronRight,
  Wind,
  Sun,
  Wrench,
  Disc,
  CloudRain
} from 'lucide-react';
import { useCart, VEHICLE_OPTIONS } from '../context/CartContext';

export default function QuoteBuilder({ onProceedToBooking }) {
  const {
    selectedVehicle,
    setSelectedVehicle,
    cart,
    addToCart,
    commitAddToCart,
    removeFromCart,
    setIsCartOpen,
    subtotal,
    hstTax,
    grandTotal,
    overlapAlert,
    setOverlapAlert,
    getInclusionStatus,
  } = useCart();

  // Active Category: 'packages' (Silver/Gold/Diamond) | 'washes' (Express/Wash/Interior) | 'coating' (Ceramic & Polish)
  const [activeCategory, setActiveCategory] = useState('packages');
  const [addWashToInteriorComplete, setAddWashToInteriorComplete] = useState(false);

  // Listen for navigation events from other sections (e.g. from CoatingSection)
  useEffect(() => {
    const handleTabChange = (e) => {
      if (e.detail?.tab) {
        if (e.detail.tab === 'coat' || e.detail.tab === 'polish') {
          setActiveCategory('coating');
        } else if (e.detail.tab === 'wash' || e.detail.tab === 'interior') {
          setActiveCategory('washes');
        } else {
          setActiveCategory('packages');
        }
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
    {
      id: 'c-sedan',
      label: 'Sedan / Coupe',
      examples: 'Civic, Model 3, Corolla, Camry, Elantra',
      type: 'sedan',
    },
    {
      id: 'c-cross',
      label: 'Small SUV / Crossover',
      examples: 'RAV4, CR-V, Model Y, CX-5, Tucson, Q5',
      type: 'crossover',
    },
    {
      id: 'c-suv',
      label: 'Large SUV / Truck',
      examples: 'F-150, RAM 1500, Silverado, Highlander',
      type: 'truck',
    },
    {
      id: 'c-van',
      label: 'XL / 7-Seater / Van',
      examples: 'Suburban, Escalade, Sienna, 3-Row, Odyssey',
      type: 'van',
    },
  ];

  const activeVehicle = vehicles.find((v) => v.id === selectedVehicle) || vehicles[0];

  // Helper to check if a service is in cart
  const isServiceSelected = (serviceId) => {
    return cart.some((item) => item.serviceId === serviceId);
  };

  // Helper to toggle a package
  const handleToggleService = (service) => {
    const existing = cart.find((item) => item.serviceId === service.id);
    if (existing) {
      removeFromCart(existing.id);
    } else {
      addToCart({
        serviceId: service.id,
        title: service.title,
        vehicleType: selectedVehicle,
        basePrice: service.prices[selectedVehicle],
        subtitle: service.duration,
        isCarfax: Boolean(service.isCarfax),
        carfaxNote: service.carfaxNote || '',
        addons: service.defaultAddons || [],
      }, false);
    }
  };

  // 1. COMPLETE IN & OUT DETAIL PACKAGES (Silver, Gold, Diamond)
  const detailPackages = [
    {
      id: 'medium-package',
      badge: 'Essential Refresh',
      title: 'Silver Package',
      tagline: 'Exterior hand wash + thorough interior vacuum & wipe-down',
      duration: 'Approx. 2.0 – 2.5 hrs',
      prices: { 'c-sedan': 180, 'c-cross': 200, 'c-suv': 220, 'c-van': 260 },
      isPopular: false,
      features: [
        'Two-bucket pH-neutral snow foam hand wash',
        'Wheel faces & tire cleaning + satin dressing',
        'Complete interior vacuum (seats, carpets, trunk)',
        'Dashboard, console, door panels wiped down',
        'Interior & exterior crystal-clear glass',
        'Rubber mats washed or carpet mats blown out',
        'Door jambs and sills wiped clean',
      ],
      notIncluded: [
        'Hot-water shampoo carpet & seat extraction',
        'Road salt stain neutralization',
        'Commercial 305°F dry steam sanitization',
      ],
    },
    {
      id: 'full-detail',
      badge: 'STUDIO SIGNATURE',
      title: 'Gold Package',
      tagline: 'Deep sanitization, hot-water seat shampoo & road salt removal',
      duration: 'Approx. 3.5 – 4.5 hrs',
      prices: { 'c-sedan': 220, 'c-cross': 250, 'c-suv': 270, 'c-van': 300 },
      isPopular: true,
      features: [
        'Everything in the Silver Package',
        '305°F dry steam sanitation through whole cabin',
        'Deep hot-water carpet & fabric seat shampoo extraction',
        'Ontario winter road salt stain neutralization',
        'Leather upholstery deep cleaned & conditioned',
        'Summer & winter floor mats deep shampooed',
        'Iron fallout exterior chemical decontamination',
        'Hydrophobic spray paint sealant applied',
      ],
      notIncluded: [
        'Clay bar paint decontamination',
        'Engine bay steam degreasing',
      ],
    },
    {
      id: 'diamond-package',
      badge: 'FULL RESTORATION',
      title: 'Diamond Package',
      tagline: 'Showroom restoration inside & out with 6-month ceramic protection',
      duration: 'Approx. 5.0 – 6.5 hrs',
      prices: { 'c-sedan': 320, 'c-cross': 350, 'c-suv': 375, 'c-van': 400 },
      isPopular: false,
      features: [
        'Everything in the Gold Package',
        'Clay bar paint mechanical decontamination',
        'Machine paint gloss enhancement polish & wax',
        'Engine bay steam degreased & satin UV dressed',
        'Headliner spot treatment & seat belt steam',
        'Deep pet hair & embedded sand extraction',
        '6-Month hydrophobic ceramic paint sealant',
        'Windshield exterior rain repellent coating',
      ],
      notIncluded: [],
    },
  ];

  // 2. EXPRESS & WASH ONLY
  const washServices = [
    {
      id: 'hand-car-wash',
      title: 'Precision Hand Car Wash',
      desc: 'pH-neutral snow foam, two-bucket hand wash, wheels degreased, tires dressed, blown dry.',
      duration: 'Approx. 45 mins',
      prices: { 'c-sedan': 30, 'c-cross': 40, 'c-suv': 45, 'c-van': 50 },
      highlights: ['Two-bucket grit guard', 'Zero swirl marks', 'Wheel & tire dressing'],
    },
    {
      id: 'deluxe-wash-wax',
      title: 'Deluxe Hand Wash & Spray Wax',
      desc: 'Hand wash plus bug & tar removal, wheel barrels brushed, and polymer spray wax protection.',
      duration: 'Approx. 1 hr',
      prices: { 'c-sedan': 55, 'c-cross': 65, 'c-suv': 70, 'c-van': 75 },
      highlights: ['Bug & tar solvent prep', 'Wheel barrels cleaned', 'Polymer spray wax'],
    },
    {
      id: 'interior-refresh',
      title: 'Interior Refresh (Quick Tidy)',
      desc: 'Doors, jambs, panels & dash wiped down, full blow-out and vacuum, mats washed. No steam.',
      duration: 'Approx. 1 hr',
      prices: { 'c-sedan': 70, 'c-cross': 85, 'c-suv': 95, 'c-van': 105 },
      highlights: ['Full cabin vacuum', 'Dash & panels wiped', 'Glass cleaned'],
    },
    {
      id: 'interior-complete',
      title: 'Interior Complete Shampoo & Steam',
      desc: '305°F steam extraction, seats & carpets shampooed, vinyl & leather cleaned. Exterior wash optional.',
      duration: 'Approx. 3 hrs',
      prices: { 'c-sedan': 175, 'c-cross': 199, 'c-suv': 229, 'c-van': 249 },
      highlights: ['305°F hospital steam', 'Carpet & seat extraction', 'Interior only (add wash +$30)'],
      canAddWash: true,
    },
  ];

  // 3. CERAMIC COATING & CORRECTION PACKAGES (CARFAX Canada)
  const ceramicServices = [
    {
      id: '1-step-correction',
      title: '1-Stage Paint Enhancement Polish',
      badge: 'Defect Removal: 60%',
      desc: 'Machine polishing to remove light swirls, oxidation, and hazy clear coat. Includes clay prep & sealant.',
      duration: 'Approx. 5–6 hrs',
      prices: { 'c-sedan': 350, 'c-cross': 400, 'c-suv': 450, 'c-van': 500 },
      isCarfax: false,
      includedList: ['Hand wash & iron decon', 'Clay bar treatment', '1-stage dual action polish', '6-month paint sealant'],
    },
    {
      id: '2-step-correction',
      title: '2-Stage Heavy Compound & Polish',
      badge: 'Defect Removal: 85–95%',
      desc: 'Heavy rotary/dual-action compound stage followed by fine jeweling polish. Removes deep scratches & swirls.',
      duration: 'Approx. 9–11 hrs',
      prices: { 'c-sedan': 650, 'c-cross': 750, 'c-suv': 850, 'c-van': 950 },
      isCarfax: false,
      includedList: ['Full decon & clay bar', 'Rotary heavy compound', 'Finishing jeweling polish', 'Synthetic ceramic sealant'],
    },
    {
      id: 'nanobrite-rejuvenate',
      title: 'Nano-Brite 1-Year Ceramic Coating',
      badge: '1-YEAR WARRANTY',
      desc: 'Includes exterior wash, clay bar, 1-stage machine polish, and 1 layer of Nano-Brite 9H ceramic coating.',
      duration: 'Approx. 6 hrs',
      prices: { 'c-sedan': 449, 'c-cross': 499, 'c-suv': 549, 'c-van': 599 },
      isCarfax: false,
      includedList: ['Decon wash & clay bar', '1-stage machine polish', '1-year hydrophobic barrier', 'High gloss mirror shine'],
    },
    {
      id: 'nanobrite-ultra',
      title: 'Nano-Brite Ultra 3-Year Ceramic',
      badge: '3-YEAR WARRANTY',
      desc: 'Includes exterior wash, clay bar, 1-stage polish, and 3-year Nano-Brite ceramic coating.',
      duration: 'Approx. 7 hrs',
      prices: { 'c-sedan': 649, 'c-cross': 749, 'c-suv': 849, 'c-van': 899 },
      isCarfax: false,
      includedList: ['Decon wash & clay bar', '1-stage machine polish', '3-year ceramic protection', 'Self-cleaning hydrophobics'],
    },
    {
      id: 'systemx-crystal',
      title: 'System X Crystal+ Ceramic Coating',
      badge: '2-YEAR CARFAX CANADA',
      desc: 'Authorized System X ceramic coating. Documented and officially recorded to your VIN on CARFAX Canada.',
      duration: 'Approx. 8 hrs',
      prices: { 'c-sedan': 949, 'c-cross': 1049, 'c-suv': 1149, 'c-van': 1249 },
      isCarfax: true,
      carfaxNote: 'Permanently recorded on your CARFAX Canada Vehicle History Report',
      includedList: ['1-stage paint correction', 'Paint & windshield ceramic', 'Registered 2-Yr Warranty', 'CARFAX Canada Service Entry'],
    },
    {
      id: 'systemx-pro',
      title: 'System X Pro+ 9H Ceramic Coating',
      badge: '6-YEAR CARFAX CANADA',
      desc: 'Heavy-duty 9H aerospace ceramic coating covering paint, windshield, and wheel faces with CARFAX record.',
      duration: 'Approx. 11 hrs',
      prices: { 'c-sedan': 1299, 'c-cross': 1449, 'c-suv': 1599, 'c-van': 1749 },
      isCarfax: true,
      carfaxNote: 'Permanently recorded on your CARFAX Canada Vehicle History Report',
      includedList: ['2-stage paint correction', 'Paint, glass & wheel coating', 'Registered 6-Yr Warranty', 'CARFAX Canada Service Entry'],
    },
    {
      id: 'systemx-maxg',
      title: 'System X Max G+ Lifetime Ceramic',
      badge: '10-YEAR CARFAX CANADA',
      desc: 'The thickest 9H+ ceramic coating on the market. Lifetime warranty for Kingston driving conditions.',
      duration: '2 Full Days in Bay',
      prices: { 'c-sedan': 1699, 'c-cross': 1849, 'c-suv': 1999, 'c-van': 2149 },
      isCarfax: true,
      carfaxNote: 'Permanently recorded on your CARFAX Canada Vehicle History Report',
      includedList: ['Multi-stage paint correction', 'Full body, glass, trim & wheels', '10-Yr / Lifetime Warranty', 'CARFAX Canada Service Entry'],
    },
  ];

  // Helper to render crisp SVG icons for add-ons (no emoji slop)
  const renderAddonIcon = (id) => {
    const iconStyle = { width: '1.15rem', height: '1.15rem', color: 'var(--gold-primary)' };
    switch (id) {
      case 'odour': return <Wind style={iconStyle} />;
      case 'headlights': return <Sun style={iconStyle} />;
      case 'engine-bay': return <Wrench style={iconStyle} />;
      case 'pet-hair': return <Sparkles style={iconStyle} />;
      case 'salt-stain': return <Droplets style={iconStyle} />;
      case 'tire-shine': return <Disc style={iconStyle} />;
      case 'systemx-glass': return <CloudRain style={iconStyle} />;
      case 'systemx-wheel': return <ShieldCheck style={iconStyle} />;
      default: return <Sparkles style={iconStyle} />;
    }
  };

  // 4. ADD-ONS WITH SMART OVERLAP DETECTION
  const addOnList = [
    {
      id: 'odour',
      title: 'Ozone & Odor Elimination',
      price: 50,
      desc: 'Neutralizes smoke, dog smell, mildew & organic cabin odors.',
    },
    {
      id: 'headlights',
      title: 'Headlight Restoration (Pair)',
      price: 60,
      desc: 'Wet sand, compound & ceramic UV barrier to clear cloudy lenses.',
    },
    {
      id: 'engine-bay',
      title: 'Engine Bay Detailing',
      price: 40,
      desc: 'Degrease, steam clean, and satin dress engine bay plastics.',
      freeIn: ['diamond-package'],
    },
    {
      id: 'pet-hair',
      title: 'Pet Hair & Sand Extraction',
      price: 50,
      desc: 'Specialized rubber squeegee and deep vacuum for pet fur.',
      freeIn: ['diamond-package'],
    },
    {
      id: 'salt-stain',
      title: 'Winter Road Salt Removal',
      price: 50,
      desc: 'Enzyme neutralization and heated extraction for salt crusts.',
      freeIn: ['full-detail', 'diamond-package'],
    },
    {
      id: 'tire-shine',
      title: 'High-Gloss Tire Sidewall Dressing',
      price: 10,
      desc: 'No-sling satin silicone protection for all 4 tires.',
      freeIn: ['medium-package', 'full-detail', 'diamond-package'],
    },
    {
      id: 'systemx-glass',
      title: 'Windshield Hydrophobic Ceramic',
      price: 125,
      desc: 'Extreme water repellency in heavy rain. Improves visibility.',
      freeIn: ['systemx-crystal', 'systemx-pro', 'systemx-maxg'],
    },
    {
      id: 'systemx-wheel',
      title: 'Wheel Faces Ceramic Coating',
      price: 249,
      desc: 'Shields wheels from hot corrosive brake dust and road salt.',
      freeIn: ['systemx-pro', 'systemx-maxg'],
    },
  ];

  // Check if an addon is already included in an active package
  const isAddonFreeInActiveCart = (addon) => {
    if (!addon.freeIn) return false;
    return cart.some((item) => addon.freeIn.includes(item.serviceId));
  };

  const handleToggleAddon = (addon) => {
    // If it's already included free, notify user
    if (isAddonFreeInActiveCart(addon)) {
      setOverlapAlert({
        type: 'already_included',
        title: 'Already Included Free!',
        message: `${addon.title} is already included in your selected package at no extra charge. You will not be charged twice.`,
      });
      return;
    }

    const existing = cart.find((item) => item.serviceId === addon.id);
    if (existing) {
      removeFromCart(existing.id);
    } else {
      addToCart({
        serviceId: addon.id,
        title: addon.title,
        vehicleType: selectedVehicle,
        basePrice: addon.price,
        subtitle: 'Add-on Treatment',
      }, false);
    }
  };

  return (
    <section className="quote-builder-wrapper" id="packages" style={{ maxWidth: '1240px', margin: '0 auto', padding: '1rem' }}>
      
      {/* Header */}
      <div 
        style={{ 
          textAlign: 'center', 
          marginBottom: '2rem', 
          padding: '1rem 1rem 0.5rem', 
        }}
      >
        <h1 style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.4rem)', fontWeight: 900, color: 'var(--heading-color)', margin: '0 0 0.4rem' }}>
          Services &amp; Instant Quote Builder
        </h1>
        <p style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--muted-color)', fontSize: '0.95rem', lineHeight: 1.5 }}>
          Select your vehicle size below to update all package prices, choose treatments, and book online.
        </p>
      </div>

      {/* STEP 1: VEHICLE SIZE SELECTOR CARDS */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--heading-color)', margin: 0 }}>
            1. Select Vehicle Size
          </h2>
          <span style={{ fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--gold-primary)' }}>
            Selected: <strong>{activeVehicle.label}</strong>
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))', gap: '1rem' }}>
          {vehicles.map((v) => {
            const isSelected = selectedVehicle === v.id;
            return (
              <button
                key={v.id}
                type="button"
                onClick={() => setSelectedVehicle(v.id)}
                style={{
                  padding: '1.25rem 1rem',
                  borderRadius: '12px',
                  background: isSelected ? 'linear-gradient(180deg, rgba(201, 160, 60, 0.16) 0%, var(--surface-card) 100%)' : 'var(--surface-card)',
                  border: isSelected ? '2px solid var(--gold)' : '1px solid var(--surface-border)',
                  boxShadow: isSelected ? '0 6px 20px rgba(201, 160, 60, 0.2)' : 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s ease',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.4rem',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '8px',
                      background: isSelected ? 'var(--gold)' : 'rgba(201, 160, 60, 0.12)',
                      color: isSelected ? '#0A1E42' : 'var(--gold-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {v.type === 'truck' ? (
                      <Truck style={{ width: '1.25rem', height: '1.25rem' }} />
                    ) : v.type === 'van' ? (
                      <Bus style={{ width: '1.25rem', height: '1.25rem' }} />
                    ) : (
                      <Car style={{ width: '1.25rem', height: '1.25rem' }} />
                    )}
                  </div>
                  {isSelected ? (
                    <span 
                      style={{ 
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        background: 'rgba(201, 160, 60, 0.18)', 
                        color: 'var(--gold-primary)', 
                        fontSize: '0.72rem', 
                        fontWeight: 800, 
                        fontFamily: 'var(--mono)',
                        padding: '0.2rem 0.55rem', 
                        borderRadius: '4px',
                        border: '1px solid var(--gold)'
                      }}
                    >
                      <Check style={{ width: '0.75rem', height: '0.75rem' }} />
                      SELECTED
                    </span>
                  ) : (
                    <span style={{ fontSize: '0.72rem', fontFamily: 'var(--mono)', color: 'var(--muted-color)', fontWeight: 600 }}>
                      SELECT
                    </span>
                  )}
                </div>
                <strong style={{ fontSize: '1.05rem', color: isSelected ? 'var(--gold-primary)' : 'var(--heading-color)', fontWeight: 800 }}>
                  {v.label}
                </strong>
                <span style={{ fontSize: '0.78rem', color: 'var(--muted-color)', lineHeight: 1.4 }}>
                  {v.examples}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* STEP 2: CATEGORY SELECTOR PILLS */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--heading-color)', margin: 0 }}>
            Step 2: Choose Service Type
          </h3>
          <span style={{ fontSize: '0.82rem', color: 'var(--muted-color)' }}>
            Click to view packages in that category
          </span>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={() => setActiveCategory('packages')}
            style={{
              flex: '1 1 200px',
              padding: '0.85rem 1.25rem',
              borderRadius: '10px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              fontSize: '0.95rem',
              fontWeight: 800,
              background: activeCategory === 'packages' ? 'var(--gold)' : 'var(--surface-card)',
              color: activeCategory === 'packages' ? '#0A1E42' : 'var(--heading-color)',
              border: activeCategory === 'packages' ? '2px solid var(--gold)' : '1px solid var(--surface-border)',
              transition: 'all 0.2s ease',
            }}
          >
            <Sparkles style={{ width: '1.1rem', height: '1.1rem' }} />
            <span>Complete Detail Packages</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveCategory('washes')}
            style={{
              flex: '1 1 200px',
              padding: '0.85rem 1.25rem',
              borderRadius: '10px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              fontSize: '0.95rem',
              fontWeight: 800,
              background: activeCategory === 'washes' ? 'var(--gold)' : 'var(--surface-card)',
              color: activeCategory === 'washes' ? '#0A1E42' : 'var(--heading-color)',
              border: activeCategory === 'washes' ? '2px solid var(--gold)' : '1px solid var(--surface-border)',
              transition: 'all 0.2s ease',
            }}
          >
            <Droplets style={{ width: '1.1rem', height: '1.1rem' }} />
            <span>Express &amp; Maintenance Washes</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveCategory('coating')}
            style={{
              flex: '1 1 200px',
              padding: '0.85rem 1.25rem',
              borderRadius: '10px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              fontSize: '0.95rem',
              fontWeight: 800,
              background: activeCategory === 'coating' ? 'var(--gold)' : 'var(--surface-card)',
              color: activeCategory === 'coating' ? '#0A1E42' : 'var(--heading-color)',
              border: activeCategory === 'coating' ? '2px solid var(--gold)' : '1px solid var(--surface-border)',
              transition: 'all 0.2s ease',
            }}
          >
            <ShieldCheck style={{ width: '1.1rem', height: '1.1rem' }} />
            <span>Ceramic Coating &amp; Paint Correction</span>
          </button>
        </div>
      </div>

      {/* VIEW A: COMPLETE IN & OUT DETAIL PACKAGES (3-TIER COMPARISON) */}
      {activeCategory === 'packages' && (
        <div style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '1.5rem', alignItems: 'stretch' }}>
            {detailPackages.map((pkg) => {
              const price = pkg.prices[selectedVehicle];
              const isSelected = isServiceSelected(pkg.id);

              return (
                <div
                  key={pkg.id}
                  style={{
                    background: pkg.isPopular 
                      ? 'linear-gradient(180deg, rgba(201, 160, 60, 0.12) 0%, var(--surface-card) 100%)' 
                      : 'var(--surface-card)',
                    borderRadius: '16px',
                    border: isSelected 
                      ? '2.5px solid var(--gold)' 
                      : pkg.isPopular 
                        ? '2px solid var(--gold)' 
                        : '1px solid var(--surface-border)',
                    boxShadow: isSelected || pkg.isPopular 
                      ? '0 10px 35px rgba(201, 160, 60, 0.18)' 
                      : 'none',
                    padding: '2rem 1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div>
                    {/* Badge */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                      <span 
                        style={{
                          fontSize: '0.74rem',
                          fontFamily: 'var(--mono)',
                          fontWeight: 900,
                          padding: '0.25rem 0.65rem',
                          borderRadius: '6px',
                          background: pkg.isPopular ? 'var(--gold)' : 'var(--chip-inactive-bg)',
                          color: pkg.isPopular ? '#0A1E42' : 'var(--gold-primary)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.04em',
                        }}
                      >
                        {pkg.badge}
                      </span>
                      <span style={{ fontSize: '0.78rem', color: 'var(--muted-color)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <Clock style={{ width: '0.8rem', height: '0.8rem' }} />
                        {pkg.duration}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1.7rem', fontWeight: 900, color: 'var(--heading-color)', margin: '0 0 0.35rem' }}>
                      {pkg.title}
                    </h3>

                    <p style={{ fontSize: '0.88rem', color: 'var(--muted-color)', margin: '0 0 1.25rem', lineHeight: 1.5 }}>
                      {pkg.tagline}
                    </p>

                    {/* Price Block */}
                    <div style={{ background: 'var(--bg-page)', padding: '1rem', borderRadius: '10px', border: '1px solid var(--surface-border)', marginBottom: '1.5rem' }}>
                      <div style={{ fontSize: '0.74rem', fontFamily: 'var(--mono)', color: 'var(--muted-color)', textTransform: 'uppercase' }}>
                        Exact Price for {activeVehicle.label}:
                      </div>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem', marginTop: '0.2rem' }}>
                        <span style={{ fontFamily: 'var(--display)', fontSize: '2.4rem', fontWeight: 900, color: 'var(--gold-primary)', lineHeight: 1 }}>
                          ${price}
                        </span>
                        <span style={{ fontSize: '0.84rem', color: 'var(--muted-color)', fontFamily: 'var(--mono)' }}>
                          CAD + HST
                        </span>
                      </div>
                    </div>

                    {/* Checklist */}
                    <div style={{ marginBottom: '1.5rem' }}>
                      <div style={{ fontSize: '0.8rem', fontFamily: 'var(--mono)', color: 'var(--gold-primary)', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                        What is Included:
                      </div>
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                        {pkg.features.map((feat, idx) => (
                          <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.86rem', color: 'var(--text-main)', lineHeight: 1.4 }}>
                            <CheckCircle2 style={{ width: '1rem', height: '1rem', color: '#10B981', flexShrink: 0, marginTop: '2px' }} />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Selection Button */}
                  <div style={{ paddingTop: '1.25rem', borderTop: '1px solid var(--surface-border)' }}>
                    <button
                      type="button"
                      onClick={() => handleToggleService(pkg)}
                      style={{
                        width: '100%',
                        minHeight: '48px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: 800,
                        fontSize: '0.94rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        transition: 'all 0.2s ease',
                        background: isSelected 
                          ? '#10B981' 
                          : pkg.isPopular 
                            ? 'var(--gold)' 
                            : 'var(--chip-inactive-bg)',
                        color: isSelected 
                          ? '#FFFFFF' 
                          : pkg.isPopular 
                            ? '#0A1E42' 
                            : 'var(--heading-color)',
                        border: isSelected 
                          ? '2px solid #10B981' 
                          : pkg.isPopular 
                            ? '2px solid var(--gold)' 
                            : '1px solid var(--surface-border)',
                      }}
                    >
                      {isSelected ? (
                        <>
                          <Check style={{ width: '1.1rem', height: '1.1rem' }} />
                          <span>✓ Selected for {activeVehicle.label}</span>
                        </>
                      ) : (
                        <>
                          <Plus style={{ width: '1rem', height: '1rem' }} />
                          <span>Select {pkg.title} (${price})</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW B: EXPRESS & WASH ONLY */}
      {activeCategory === 'washes' && (
        <div style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 270px), 1fr))', gap: '1.25rem' }}>
            {washServices.map((svc) => {
              const price = svc.prices[selectedVehicle];
              const isSelected = isServiceSelected(svc.id);

              return (
                <div
                  key={svc.id}
                  style={{
                    background: 'var(--surface-card)',
                    border: isSelected ? '2px solid var(--gold)' : '1px solid var(--surface-border)',
                    borderRadius: '12px',
                    padding: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
                      <span style={{ fontFamily: 'var(--mono)', fontSize: '0.78rem', color: 'var(--muted-color)' }}>
                        {svc.duration}
                      </span>
                    </div>

                    <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--heading-color)', margin: '0 0 0.4rem' }}>
                      {svc.title}
                    </h4>

                    <p style={{ fontSize: '0.86rem', color: 'var(--muted-color)', lineHeight: 1.5, margin: '0 0 1rem' }}>
                      {svc.desc}
                    </p>

                    <div style={{ marginBottom: '1.25rem' }}>
                      <span style={{ fontFamily: 'var(--display)', fontSize: '1.8rem', fontWeight: 900, color: 'var(--gold-primary)' }}>
                        ${price} CAD
                      </span>
                    </div>

                    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      {svc.highlights.map((h, idx) => (
                        <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.82rem', color: 'var(--text-main)' }}>
                          <CheckCircle2 style={{ width: '0.85rem', height: '0.85rem', color: 'var(--gold-primary)', flexShrink: 0 }} />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleToggleService(svc)}
                    style={{
                      width: '100%',
                      minHeight: '42px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontWeight: 800,
                      fontSize: '0.88rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.4rem',
                      background: isSelected ? '#10B981' : 'var(--chip-inactive-bg)',
                      color: isSelected ? '#FFFFFF' : 'var(--heading-color)',
                      border: isSelected ? '1px solid #10B981' : '1px solid var(--surface-border)',
                    }}
                  >
                    {isSelected ? '✓ Added to Cart' : `+ Add for ${activeVehicle.label} ($${price})`}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW C: CERAMIC COATING & PAINT CORRECTION (CARFAX CANADA) */}
      {activeCategory === 'coating' && (
        <div style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '1.5rem' }}>
            {ceramicServices.map((svc) => {
              const price = svc.prices[selectedVehicle];
              const isSelected = isServiceSelected(svc.id);

              return (
                <div
                  key={svc.id}
                  style={{
                    background: svc.isCarfax 
                      ? 'linear-gradient(180deg, rgba(59, 130, 246, 0.08) 0%, var(--surface-card) 100%)' 
                      : 'var(--surface-card)',
                    border: isSelected 
                      ? '2.5px solid var(--gold)' 
                      : svc.isCarfax 
                        ? '1.5px solid rgba(59, 130, 246, 0.4)' 
                        : '1px solid var(--surface-border)',
                    borderRadius: '14px',
                    padding: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
                      <span 
                        style={{ 
                          fontSize: '0.72rem', 
                          fontFamily: 'var(--mono)', 
                          fontWeight: 800, 
                          padding: '0.2rem 0.5rem', 
                          borderRadius: '4px',
                          background: svc.isCarfax ? '#0A1E42' : 'var(--chip-inactive-bg)',
                          color: svc.isCarfax ? '#60A5FA' : 'var(--gold-primary)',
                          border: svc.isCarfax ? '1px solid #3B82F6' : '1px solid var(--surface-border)',
                        }}
                      >
                        {svc.badge}
                      </span>
                      <span style={{ fontSize: '0.76rem', color: 'var(--muted-color)' }}>
                        {svc.duration}
                      </span>
                    </div>

                    <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--heading-color)', margin: '0 0 0.4rem' }}>
                      {svc.title}
                    </h4>

                    <p style={{ fontSize: '0.84rem', color: 'var(--muted-color)', lineHeight: 1.5, margin: '0 0 1rem' }}>
                      {svc.desc}
                    </p>

                    <div style={{ marginBottom: '1.25rem' }}>
                      <span style={{ fontFamily: 'var(--display)', fontSize: '2rem', fontWeight: 900, color: 'var(--gold-primary)' }}>
                        ${price} CAD
                      </span>
                    </div>

                    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      {svc.includedList.map((item, idx) => (
                        <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.82rem', color: 'var(--text-main)' }}>
                          <CheckCircle2 style={{ width: '0.85rem', height: '0.85rem', color: '#10B981', flexShrink: 0 }} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleToggleService(svc)}
                    style={{
                      width: '100%',
                      minHeight: '44px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontWeight: 800,
                      fontSize: '0.88rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.4rem',
                      background: isSelected ? '#10B981' : svc.isCarfax ? 'var(--gold)' : 'var(--chip-inactive-bg)',
                      color: isSelected ? '#FFFFFF' : svc.isCarfax ? '#0A1E42' : 'var(--heading-color)',
                      border: isSelected ? '1px solid #10B981' : '1px solid var(--surface-border)',
                    }}
                  >
                    {isSelected ? '✓ Added to Cart' : `Select for ${activeVehicle.label} ($${price})`}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* STEP 3: OPTIONAL ADD-ONS (1-CLICK INTERACTIVE TILES) */}
      <div style={{ marginBottom: '3rem' }}>
        <div style={{ marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--heading-color)', margin: '0 0 0.3rem' }}>
            Step 3: Add-Ons &amp; Specialized Treatments (Optional)
          </h3>
          <p style={{ margin: 0, fontSize: '0.86rem', color: 'var(--muted-color)' }}>
            Our smart system automatically alerts you if any treatment is already included free with your package.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))', gap: '1rem' }}>
          {addOnList.map((addon) => {
            const isFree = isAddonFreeInActiveCart(addon);
            const isSelected = isServiceSelected(addon.id);

            return (
              <div
                key={addon.id}
                onClick={() => handleToggleAddon(addon)}
                style={{
                  background: isFree 
                    ? 'rgba(16, 185, 129, 0.08)' 
                    : isSelected 
                      ? 'rgba(201, 160, 60, 0.12)' 
                      : 'var(--surface-card)',
                  border: isFree 
                    ? '1.5px solid #10B981' 
                    : isSelected 
                      ? '1.5px solid var(--gold)' 
                      : '1px solid var(--surface-border)',
                  borderRadius: '12px',
                  padding: '1.1rem',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'all 0.18s ease',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '6px',
                        background: isFree ? 'rgba(16, 185, 129, 0.15)' : 'rgba(201, 160, 60, 0.12)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {renderAddonIcon(addon.id)}
                    </div>
                    {isFree ? (
                      <span style={{ fontSize: '0.7rem', color: '#10B981', fontWeight: 800, background: 'rgba(16, 185, 129, 0.18)', padding: '0.15rem 0.45rem', borderRadius: '4px' }}>
                        ✓ INCLUDED FREE
                      </span>
                    ) : (
                      <span style={{ fontFamily: 'var(--mono)', fontSize: '0.86rem', fontWeight: 800, color: 'var(--gold-primary)' }}>
                        +${addon.price} CAD
                      </span>
                    )}
                  </div>

                  <strong style={{ display: 'block', fontSize: '0.94rem', color: 'var(--heading-color)', marginBottom: '0.25rem' }}>
                    {addon.title}
                  </strong>
                  <span style={{ fontSize: '0.8rem', color: 'var(--muted-color)', lineHeight: 1.4, display: 'block' }}>
                    {addon.desc}
                  </span>
                </div>

                <div style={{ marginTop: '0.9rem', paddingTop: '0.65rem', borderTop: '1px dashed var(--surface-border)', textAlign: 'right' }}>
                  {isFree ? (
                    <span style={{ fontSize: '0.78rem', color: '#10B981', fontWeight: 700 }}>
                      Covered by Your Package
                    </span>
                  ) : isSelected ? (
                    <span style={{ fontSize: '0.78rem', color: 'var(--gold-primary)', fontWeight: 800 }}>
                      ✓ Added (Click to remove)
                    </span>
                  ) : (
                    <span style={{ fontSize: '0.78rem', color: 'var(--muted-color)', fontWeight: 600 }}>
                      + Add Treatment
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* LIVE FLOATING / STICKY ORDER SUMMARY BAR */}
      <div 
        style={{ 
          background: 'var(--surface-card)', 
          border: '2px solid var(--gold)', 
          borderRadius: '16px', 
          padding: '1.5rem',
          boxShadow: '0 12px 40px rgba(0,0,0,0.18)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.25rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ background: 'rgba(201, 160, 60, 0.15)', padding: '0.75rem', borderRadius: '10px', color: 'var(--gold-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ShoppingBag style={{ width: '1.5rem', height: '1.5rem' }} />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.8rem', fontFamily: 'var(--mono)', color: 'var(--gold-primary)', textTransform: 'uppercase', fontWeight: 800 }}>
                {activeVehicle.label} &middot; {cart.length} {cart.length === 1 ? 'Service' : 'Services'} Selected
              </span>
            </div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--heading-color)', marginTop: '0.15rem' }}>
              {cart.length > 0 
                ? cart.map((i) => i.title).join(' + ')
                : 'No package selected yet — click any package above to choose'}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.75rem', fontFamily: 'var(--mono)', color: 'var(--muted-color)', textTransform: 'uppercase' }}>
              Subtotal: ${subtotal.toFixed(2)} CAD + HST (${hstTax.toFixed(2)})
            </div>
            <div style={{ fontFamily: 'var(--display)', fontSize: '2rem', fontWeight: 900, color: 'var(--gold-primary)', lineHeight: 1 }}>
              ${grandTotal.toFixed(2)} CAD
            </div>
          </div>

          <button
            type="button"
            onClick={onProceedToBooking}
            className="btn btn--gold"
            style={{ minHeight: '52px', padding: '0 1.75rem', fontSize: '1rem', fontWeight: 900 }}
          >
            <Calendar style={{ width: '1.1rem', height: '1.1rem' }} />
            <span>Book Appointment &amp; Choose Time</span>
          </button>
        </div>
      </div>

      {/* OVERLAP MODAL (Smart Overlap Protection) */}
      {overlapAlert && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(5, 16, 35, 0.85)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1100,
            padding: '1rem',
          }}
        >
          <div
            style={{
              background: 'var(--surface-card)',
              border: '2px solid var(--gold)',
              borderRadius: '16px',
              maxWidth: '500px',
              width: '100%',
              padding: '2rem',
              position: 'relative',
              boxShadow: '0 15px 50px rgba(0,0,0,0.5)',
            }}
          >
            <button
              type="button"
              onClick={() => setOverlapAlert(null)}
              aria-label="Close alert"
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'transparent',
                border: 'none',
                color: 'var(--muted-color)',
                cursor: 'pointer',
              }}
            >
              <X style={{ width: '1.35rem', height: '1.35rem' }} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1rem' }}>
              <div
                style={{
                  width: '3.2rem',
                  height: '3.2rem',
                  borderRadius: '12px',
                  background: 'rgba(16, 185, 129, 0.16)',
                  border: '1.5px solid #10B981',
                  color: '#10B981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <ShieldCheck style={{ width: '1.75rem', height: '1.75rem' }} />
              </div>
              <div>
                <span style={{ fontFamily: 'var(--mono)', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#10B981', fontWeight: 800 }}>
                  Smart Overlap Protection
                </span>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0, color: 'var(--heading-color)' }}>
                  {overlapAlert.title}
                </h3>
              </div>
            </div>

            <p style={{ fontSize: '0.92rem', color: 'var(--heading-color)', lineHeight: 1.55, margin: '0 0 1.5rem' }}>
              {overlapAlert.message}
            </p>

            <button
              type="button"
              onClick={() => setOverlapAlert(null)}
              className="btn btn--gold"
              style={{ width: '100%', minHeight: '44px', fontWeight: 800 }}
            >
              Got It — Thanks for Saving Me Money!
            </button>
          </div>
        </div>
      )}

    </section>
  );
}
