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
  CheckCircle2,
  Info,
  X,
  LayoutGrid,
  FileCheck2,
} from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function QuoteBuilder({ onProceedToBooking }) {
  const {
    cart,
    addToCart,
    commitAddToCart,
    setIsCartOpen,
    subtotal,
    bundleSavings,
    hasQualifyingDetail,
    overlapAlert,
    setOverlapAlert,
    getInclusionStatus,
  } = useCart();

  // Vehicle selector state
  const [selectedVehicle, setSelectedVehicle] = useState('c-sedan'); // 'c-sedan' | 'c-cross' | 'c-suv' | 'c-van'
  const [activeTab, setActiveTab] = useState('wash'); // 'wash' | 'polish' | 'coat' | 'interior' | 'addons' | 'all'
  const [addWashWithInteriorComplete, setAddWashWithInteriorComplete] = useState(false);

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
    { id: 'c-sedan', label: 'Sedan', shortLabel: 'Sedan', sub: '2-Door Coupe or 4-Door Sedan' },
    { id: 'c-cross', label: 'Crossover (5 seat)', shortLabel: 'Crossover (5 seat)', sub: '5-Seat Compact SUV' },
    { id: 'c-suv', label: 'SUV (3rd row)', shortLabel: 'SUV (3rd row)', sub: '3rd Row / 7-Seat / Pickup' },
    { id: 'c-van', label: 'Van', shortLabel: 'Van', sub: 'Minivan, Passenger or Cargo Van' },
  ];

  const tabs = [
    { id: 'wash', label: 'Wash & Detail', icon: Droplets, count: 5 },
    { id: 'polish', label: 'Polish & Protect', icon: Sparkles, count: 3 },
    { id: 'coat', label: 'Ceramic Coating', icon: ShieldCheck, badge: '9 Packages', count: 9 },
    { id: 'interior', label: 'Interior, Glass, Wheel & Trim', icon: Layers, count: 9 },
    { id: 'addons', label: 'Add-Ons & Surcharge', icon: Plus, count: 9 },
    { id: 'all', label: 'Full Rate Card View', icon: LayoutGrid },
  ];

  // ============================================================================
  // PAGE 1 OF 2: WASH, DETAIL & POLISH (2026 Official Rate Card)
  // ============================================================================
  const washPackages = [
    {
      id: 'hand-car-wash',
      title: 'Hand Car Wash',
      desc: 'Wash & wax soap, windows, blown dry',
      duration: 'Approx. 45 mins',
      prices: { 'c-sedan': 30, 'c-cross': 40, 'c-suv': 45, 'c-van': 50 },
      includedBadges: ['Wash & Wax Soap', 'Exterior Windows', 'Blown Dry'],
    },
    {
      id: 'interior-refresh',
      title: 'Interior Refresh',
      desc: 'Doors, jambs, panels and dashboard wiped down, full blow-out and vacuum, rubber mats washed or carpet mats dry-cleaned. No steam, no scrubbing — the quick tidy-up · approx 1 hr',
      duration: 'Approx. 1 hr',
      prices: { 'c-sedan': 70, 'c-cross': 85, 'c-suv': 95, 'c-van': 105 },
      includedBadges: ['Quick Tidy-Up (No Steam/Scrubbing)', 'Full Blow-Out & Vacuum', 'Doors, Jambs, Panels & Dash Wiped', 'Rubber Mats Washed / Carpet Mats Dry-Cleaned'],
    },
    {
      id: 'medium-package',
      title: 'Medium Package',
      badge: 'Most Popular',
      desc: 'Interior vacuum & glass, mats, jambs, hand wash · approx 2 hrs',
      duration: 'Approx. 2 hrs',
      prices: { 'c-sedan': 100, 'c-cross': 130, 'c-suv': 150, 'c-van': 160 },
      includesWash: true,
      includedBadges: ['✓ Hand Car Wash Included', 'Interior Vacuum & Glass', 'Mats & Door Jambs'],
    },
    {
      id: 'interior-complete',
      title: 'Interior Complete (interior only)',
      desc: 'Everything we do inside — 305°F steam extraction through the whole car, seats and carpets shampooed, vinyl and trim cleaned and dressed. The only thing it leaves out is the exterior wash — add a hand wash for $30 · approx 3 hrs',
      duration: 'Approx. 3 hrs',
      prices: { 'c-sedan': 175, 'c-cross': 199, 'c-suv': 229, 'c-van': 249 },
      includedBadges: ['305°F Steam Extraction (Whole Car)', 'Seats & Carpets Shampooed', 'Vinyl & Trim Cleaned & Dressed', 'Interior Only (Add Hand Wash for $30)'],
      canAddFlatWash: true,
    },
    {
      id: 'full-detail',
      title: 'Full Detail',
      badge: 'Complete Inside & Out',
      desc: 'Medium Package plus summer mats steamed, carpets & seats scrubbed · approx 4 hrs',
      duration: 'Approx. 4 hrs',
      prices: { 'c-sedan': 200, 'c-cross': 230, 'c-suv': 250, 'c-van': 270 },
      includesWash: true,
      includedBadges: [
        '✓ Hand Car Wash Included',
        '✓ Everything in Medium Package',
        '✓ Summer Mats Steamed',
        '✓ Carpets & Seats Scrubbed',
      ],
    },
  ];

  const polishPackages = [
    {
      id: 'gloss-enhancement',
      title: 'Gloss Enhancement',
      badge: 'Our Wax Package',
      desc: 'Our wax package. Clay bar, then a one-step all-in-one polish that cleans, polishes and protects the paint and takes out light swirls · approx 3 hrs',
      duration: 'Approx. 3 hrs',
      prices: { 'c-sedan': 200, 'c-cross': 230, 'c-suv': 260, 'c-van': 290 },
      includesWash: true,
      includedBadges: ['✓ Exterior Wash Included', '✓ Clay Bar Decon Included', '1-Step All-In-One Polish & Wax', 'Takes Out Light Swirls'],
    },
    {
      id: '1-step-correction',
      title: '1-Step Paint Correction',
      desc: 'Machine polish and sealant. Removes 50–70% of defects · approx 6 hrs',
      duration: 'Approx. 6 hrs',
      prices: { 'c-sedan': 350, 'c-cross': 400, 'c-suv': 450, 'c-van': 500 },
      includesWash: true,
      includedBadges: ['✓ Wash & Decon Prep Included', 'Removes 50–70% of Defects', 'Machine Polish & Sealant', 'Paint Depth Measured First'],
    },
    {
      id: '2-step-correction',
      title: '2-Step Paint Correction',
      badge: '80–90% Defect Removal',
      desc: 'Compound and polish. Removes 80–90% of defects · approx 11 hrs',
      duration: 'Approx. 11 hrs',
      prices: { 'c-sedan': 650, 'c-cross': 750, 'c-suv': 850, 'c-van': 950 },
      includesWash: true,
      includedBadges: ['✓ Wash & Decon Prep Included', 'Compound & Polish Stages', 'Removes 80–90% of Defects', 'Paint Depth Measured First'],
    },
  ];

  // ============================================================================
  // PAGE 2 OF 2: CERAMIC COATING & PROTECTION (2026 Official Rate Card)
  // ============================================================================
  const ceramicPackages = [
    {
      id: 'nanobrite-rejuvenate',
      title: 'Nano-Brite Rejuvenate',
      warrantyBadge: '1 YEAR',
      lifespanText: 'Good for 1 Full Year of Protection',
      carfaxExplanation: 'Entry 1-Year Ceramic Protection (No CARFAX registration)',
      desc: 'Decon + 1-step correction + 1 layer · approx 5 hrs',
      duration: 'Approx. 5 hrs',
      prices: { 'c-sedan': 449, 'c-cross': 499, 'c-suv': 549, 'c-van': 599 },
      includesWash: true,
      isCarfax: false,
      includedBadges: [
        '✓ Hand Car Wash Included',
        '✓ Iron Decon & Clay Bar',
        '✓ 1-Step Paint Correction',
        '1 Layer Ceramic Coating',
      ],
    },
    {
      id: 'nanobrite-ultra',
      title: 'Nano-Brite Ultra',
      warrantyBadge: '3 YEAR',
      lifespanText: 'Good for 3 Full Years of Protection',
      carfaxExplanation: '3-Year Ceramic Protection (No CARFAX registration)',
      desc: 'Decon + 1-step correction + 1 layer · approx 6 hrs',
      duration: 'Approx. 6 hrs',
      prices: { 'c-sedan': 649, 'c-cross': 749, 'c-suv': 849, 'c-van': 899 },
      includesWash: true,
      isCarfax: false,
      includedBadges: [
        '✓ Hand Car Wash Included',
        '✓ Iron Decon & Clay Bar',
        '✓ 1-Step Paint Correction',
        '1 Layer 3-Year Ceramic Coating',
      ],
    },
    {
      id: 'nanobrite-evo',
      title: 'Nano-Brite EVO Graphene',
      warrantyBadge: '7 YEAR',
      lifespanText: 'Good for 7 Full Years of Graphene Protection',
      carfaxExplanation: '7-Year Graphene Coating + Top Coat (No CARFAX registration)',
      desc: 'Graphene coating. Decon + 2-step correction + top coat · approx 10 hrs',
      duration: 'Approx. 10 hrs',
      prices: { 'c-sedan': 1199, 'c-cross': 1299, 'c-suv': 1399, 'c-van': 1499 },
      includesWash: true,
      isCarfax: false,
      freePickup: true,
      includedBadges: [
        '✓ Hand Car Wash Included',
        '✓ Iron Decon & Clay Bar',
        '✓ 2-Step Paint Correction',
        'Graphene Coating + Top Coat',
        '🚚 Free Pickup & Delivery',
      ],
    },
    {
      id: 'systemx-crystal',
      title: 'System X Crystal+',
      warrantyBadge: '2 YEAR',
      lifespanText: 'Good for 2 Full Years of Protection',
      isCarfax: true,
      carfaxExplanation: 'Registered with CARFAX — Added to your vehicle history report!',
      desc: '1-step correction + paint and glass coating · approx 8 hrs',
      duration: 'Approx. 8 hrs',
      prices: { 'c-sedan': 949, 'c-cross': 1049, 'c-suv': 1149, 'c-van': 1249 },
      includesWash: true,
      freePickup: true,
      includedBadges: [
        '✓ Hand Wash, Iron Decon & Clay Bar',
        '✓ 1-Step Paint Correction',
        '✓ Paint Coating + Glass Coating Included',
        '🚚 Free Pickup & Delivery',
      ],
    },
    {
      id: 'systemx-pro',
      title: 'System X Pro+',
      warrantyBadge: '6 YEAR',
      lifespanText: 'Good for 6 Full Years of Protection',
      isCarfax: true,
      carfaxExplanation: 'Registered with CARFAX — Added to your vehicle history report!',
      desc: '2-step correction + paint, glass and wheel coatings · approx 11 hrs',
      duration: 'Approx. 11 hrs',
      prices: { 'c-sedan': 1299, 'c-cross': 1449, 'c-suv': 1599, 'c-van': 1749 },
      includesWash: true,
      freePickup: true,
      includedBadges: [
        '✓ Hand Wash, Iron Decon & Clay Bar',
        '✓ 2-Step Paint Correction',
        '✓ Paint + Glass + Wheel Coatings Included',
        '🚚 Free Pickup & Delivery',
      ],
    },
    {
      id: 'systemx-maxg',
      title: 'System X Max G+',
      warrantyBadge: '10 YEAR',
      lifespanText: 'Good for 10 Full Years of Graphene Protection',
      isCarfax: true,
      carfaxExplanation: 'Registered with CARFAX — Added to your vehicle history report!',
      desc: 'Graphene. 2-step correction + paint, glass and wheel coatings · approx 12 hrs',
      duration: 'Approx. 12 hrs',
      prices: { 'c-sedan': 1699, 'c-cross': 1849, 'c-suv': 1999, 'c-van': 2149 },
      includesWash: true,
      freePickup: true,
      includedBadges: [
        '✓ Hand Wash, Iron Decon & Clay Bar',
        '✓ 2-Step Paint Correction',
        '✓ Graphene Paint + Glass + Wheel Coatings',
        '🚚 Free Pickup & Delivery',
      ],
    },
    {
      id: 'systemx-diamond',
      title: 'System X Diamond SS',
      warrantyBadge: 'LIFETIME',
      lifespanText: 'Good for a Lifetime of Protection',
      isCarfax: true,
      carfaxExplanation: 'Lifetime Warranty Registered with CARFAX — Added to your vehicle history report!',
      desc: '2-step correction + paint, glass and wheel coatings · approx 13 hrs',
      duration: 'Approx. 13 hrs',
      prices: { 'c-sedan': 1799, 'c-cross': 1949, 'c-suv': 2099, 'c-van': 2249 },
      includesWash: true,
      freePickup: true,
      includedBadges: [
        '✓ Hand Wash, Iron Decon & Clay Bar',
        '✓ 2-Step Paint Correction',
        '✓ Lifetime Paint + Glass + Wheel Coatings',
        '🚚 Free Pickup & Delivery',
      ],
    },
    {
      id: 'ceramic-maint-wash',
      title: 'Ceramic Maintenance Wash',
      warrantyBadge: 'EVERY 6–8 WEEKS',
      lifespanText: 'Single Visit · Recommended Every 6–8 Weeks',
      desc: 'Single visit. Recommended every 6–8 weeks',
      duration: 'Approx. 1 hr',
      prices: { 'c-sedan': 55, 'c-cross': 65, 'c-suv': 75, 'c-van': 85 },
      isMaintenance: true,
      includedBadges: ['Single Visit Maintenance Wash', 'Recommended Every 6–8 Weeks', 'Keeps Ceramic Beading Strong'],
    },
    {
      id: 'maint-plan',
      title: 'Maintenance Plan',
      warrantyBadge: 'BILLED MONTHLY',
      lifespanText: 'One Wash Every Month · Cancel Anytime',
      desc: 'One wash every month. Cancel anytime. Priority booking',
      duration: 'Monthly Plan',
      prices: { 'c-sedan': 45, 'c-cross': 55, 'c-suv': 65, 'c-van': 75 },
      isMaintenance: true,
      includedBadges: ['One Wash Every Month', 'Priority Booking', 'Cancel Anytime'],
    },
  ];

  // ============================================================================
  // INTERIOR, GLASS, WHEEL & TRIM (Page 2 of 2)
  // ============================================================================
  const interiorPackages = [
    {
      id: 'systemx-lvp',
      title: 'System X LVP — Leather, vinyl & plastic',
      warrantyPill: '3-YEAR WARRANTY',
      lifespanText: 'Good for 3 Years against spills and stains',
      carfaxText: 'CARFAX Registered — Added to your vehicle history report',
      desc: '3-year warranty against spills and stains. CARFAX registered',
      withDetail: 229,
      standalone: 389,
      isCarfax: true,
    },
    {
      id: 'systemx-textile',
      title: 'System X Textile — Fabric & carpet',
      warrantyPill: '2-YEAR PROTECTION',
      lifespanText: 'Good for 2 Years of stain protection',
      carfaxText: 'CARFAX Registered — Added to your vehicle history report',
      desc: '2-year stain protection. CARFAX registered',
      withDetail: 149,
      standalone: 259,
      isCarfax: true,
    },
    {
      id: 'systemx-lvp-textile',
      title: 'System X LVP + Textile — Complete interior',
      warrantyPill: 'COMPLETE INTERIOR WARRANTED',
      lifespanText: 'Full Interior Coated & Warranted (3-Yr LVP / 2-Yr Textile)',
      carfaxText: 'CARFAX Registered — Added to your vehicle history report',
      desc: 'Full interior coated, warranted and CARFAX registered',
      withDetail: 325,
      standalone: 499,
      isCarfax: true,
    },
    {
      id: 'nanobrite-leather',
      title: 'Nano-Brite Leather Guard',
      warrantyPill: '8–12 MONTHS',
      lifespanText: 'Good for 8–12 Months Protection',
      carfaxText: 'No warranty / CARFAX registration',
      desc: '8–12 month protection. No warranty registration',
      withDetail: 99,
      standalone: 170,
      isCarfax: false,
    },
    {
      id: 'nanobrite-fabric',
      title: 'Nano-Brite Fabric Guard',
      warrantyPill: '8–12 MONTHS',
      lifespanText: 'Good for 8–12 Months Protection',
      carfaxText: 'No warranty / CARFAX registration',
      desc: '8–12 month protection. No warranty registration',
      withDetail: 89,
      standalone: 150,
      isCarfax: false,
    },
    {
      id: 'nanobrite-leather-fabric',
      title: 'Nano-Brite Leather + Fabric — Complete interior',
      warrantyPill: '8–12 MONTHS · BEST VALUE',
      lifespanText: 'Good for 8–12 Months Protection · Our Best-Value Interior Package',
      carfaxText: 'No warranty / CARFAX registration',
      desc: '8–12 month protection. Our best-value interior package',
      withDetail: 175,
      standalone: 279,
      isCarfax: false,
    },
    {
      id: 'systemx-glass',
      title: 'System X Glass+ — Windshield & windows',
      warrantyPill: 'UP TO 2 YEARS',
      lifespanText: 'Good for up to 2 Years · Improves wet-weather visibility',
      desc: 'Up to 2 years. Improves wet-weather visibility',
      withDetail: 125,
      standalone: 165,
      isCarfax: false,
    },
    {
      id: 'systemx-wheel',
      title: 'System X Wheel+ — Wheel coating',
      warrantyPill: 'FULL WHEEL COVERAGE',
      lifespanText: 'Brake Dust Resistant · Wheels Removed for Full Coverage',
      desc: 'Brake dust resistant. Wheels removed for full coverage',
      withDetail: 249,
      standalone: 329,
      isCarfax: false,
    },
    {
      id: 'systemx-revive',
      title: 'System X Revive — Trim restoration',
      warrantyPill: 'TRIM RESTORATION',
      lifespanText: 'Restores Faded Exterior Plastic & Trim',
      desc: 'Restores faded exterior plastic and trim',
      withDetail: 89,
      standalone: 129,
      isCarfax: false,
    },
  ];

  // ============================================================================
  // ADD-ONS & SURCHARGE (Page 1 of 2)
  // ============================================================================
  const addonList = [
    {
      id: 'engine-bay',
      title: 'Engine Bay Cleaning',
      price: 40,
      desc: 'Safe degreasing, low-pressure rinse, and satin UV dressing under the hood.',
    },
    {
      id: 'tire-shine',
      title: 'Tire Shine',
      price: 10,
      desc: 'No-sling satin tire conditioning and sidewall dressing.',
    },
    {
      id: 'spray-wax',
      title: 'Spray Wax (with any wash)',
      price: 25,
      desc: 'Hydrophobic gloss enhancer and paint sealant applied during your wash.',
    },
    {
      id: 'summer-mats',
      title: 'Summer Mats Shampoo Wash',
      price: 20,
      desc: 'Deep scrub and hot steam extraction for carpet floor mats (already included in Full Detail).',
    },
    {
      id: 'headlights',
      title: 'Headlight Restoration (pair)',
      price: 60,
      desc: 'Multi-stage wet sand, machine compound, and ceramic UV seal on both headlights.',
    },
    {
      id: 'clay-bar',
      title: 'Clay Bar Decontamination',
      price: 60,
      desc: 'Exterior mechanical decontamination to remove bonded grit and tar (included in Gloss Enhancement & Ceramic packages).',
    },
    {
      id: 'odour',
      title: 'Odour Treatment',
      price: 50,
      desc: 'Neutralizes stubborn smoke, pet, mildew, and food odours inside the cabin.',
    },
    {
      id: 'pet-hair',
      title: 'Pet Hair Removal',
      price: 50,
      priceDisplay: '$50–$100',
      desc: 'Dedicated extraction of embedded pet fur from carpets and upholstery ($50–$100 confirmed at drop-off).',
    },
  ];

  // Helpers
  const handleAddService = (
    title,
    price,
    subtitle = '',
    serviceId = 'custom',
    extraAddons = [],
    lifespan = '',
    isCarfax = false,
    carfaxNote = ''
  ) => {
    addToCart(
      {
        serviceId,
        title,
        vehicleType: selectedVehicle,
        basePrice: price,
        subtitle,
        addons: extraAddons,
        lifespan,
        isCarfax,
        carfaxNote,
      },
      true
    );
  };

  const isServiceInCart = (serviceId) => {
    return cart.some((c) => c.serviceId === serviceId && c.vehicleType === selectedVehicle);
  };

  // Render 4-column mini vehicle rate bar on each card (Sedan | Crossover | SUV | Van)
  const renderVehiclePriceGrid = (prices, extraFlat = 0) => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '0.35rem',
        marginBottom: '0.85rem',
        background: 'rgba(0, 0, 0, 0.15)',
        padding: '0.4rem',
        borderRadius: '8px',
        border: '1px solid var(--surface-border)',
      }}
    >
      {[
        { id: 'c-sedan', name: 'SEDAN', sub: '' },
        { id: 'c-cross', name: 'CROSSOVER', sub: '5 seat' },
        { id: 'c-suv', name: 'SUV', sub: '3rd row' },
        { id: 'c-van', name: 'VAN', sub: '' },
      ].map((col) => {
        const isSel = selectedVehicle === col.id;
        const val = prices[col.id] + extraFlat;
        return (
          <button
            key={col.id}
            type="button"
            onClick={() => setSelectedVehicle(col.id)}
            style={{
              background: isSel ? 'rgba(201, 160, 60, 0.22)' : 'transparent',
              border: isSel ? '1.5px solid var(--gold, #C9A03C)' : '1px solid transparent',
              borderRadius: '6px',
              padding: '0.3rem 0.2rem',
              cursor: 'pointer',
              textAlign: 'center',
              color: isSel ? 'var(--gold-primary)' : 'var(--muted-color)',
              transition: 'all 0.15s ease',
            }}
          >
            <div style={{ fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.04em', lineHeight: 1.1 }}>
              {col.name}
              {col.sub && <span style={{ display: 'block', fontSize: '0.54rem', fontWeight: 600, opacity: 0.85 }}>{col.sub}</span>}
            </div>
            <div style={{ fontFamily: 'var(--display)', fontSize: '1.05rem', fontWeight: 900, color: isSel ? 'var(--heading-color)' : 'inherit', marginTop: '0.1rem' }}>
              ${val}
            </div>
          </button>
        );
      })}
    </div>
  );

  const renderWashAndDetailSection = () => (
    <div style={{ marginBottom: '2.5rem' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.5rem',
          padding: '0.85rem 1.25rem',
          background: 'linear-gradient(90deg, #0A1E42, #153263)',
          borderRadius: '12px',
          borderLeft: '4px solid var(--gold, #C9A03C)',
          marginBottom: '1.25rem',
          color: '#FFFFFF',
        }}
      >
        <div>
          <h3 style={{ fontFamily: 'var(--display)', fontSize: '1.4rem', fontWeight: 800, margin: 0, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Wash &amp; Detail
          </h3>
          <span style={{ fontSize: '0.8rem', color: '#A9C4E2' }}>
            Medium Package &amp; Full Detail include an exterior Hand Car Wash. Interior Complete is interior-only (add a hand wash for $30).
          </span>
        </div>
        <span style={{ fontFamily: 'var(--mono)', fontSize: '0.76rem', color: 'var(--gold-lt)', fontWeight: 700 }}>
          Active Vehicle: {vehicles.find((v) => v.id === selectedVehicle)?.label}
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(330px, 1fr))', gap: '1.35rem' }}>
        {washPackages.map((pkg) => {
          const price = pkg.prices[selectedVehicle];
          const inCart = isServiceInCart(pkg.id);
          const inclusion = getInclusionStatus(pkg.id);
          const extraWash = pkg.canAddFlatWash && addWashWithInteriorComplete ? 30 : 0;

          return (
            <div
              key={pkg.id}
              className="frame"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: inclusion.isIncluded
                  ? '2px dashed rgba(16, 185, 129, 0.55)'
                  : pkg.badge
                  ? '2px solid var(--surface-border-gold)'
                  : undefined,
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem', marginBottom: '0.65rem', flexWrap: 'wrap' }}>
                  <span className="card-badge">{pkg.duration}</span>
                  {inclusion.isIncluded ? (
                    <span
                      style={{
                        fontFamily: 'var(--mono)',
                        fontSize: '0.7rem',
                        fontWeight: 800,
                        color: '#10B981',
                        background: 'rgba(16, 185, 129, 0.14)',
                        border: '1px solid rgba(16, 185, 129, 0.4)',
                        padding: '0.2rem 0.55rem',
                        borderRadius: '999px',
                      }}
                    >
                      ✓ Included in {inclusion.parentItem?.title}
                    </span>
                  ) : pkg.badge ? (
                    <span
                      style={{
                        fontFamily: 'var(--mono)',
                        fontSize: '0.72rem',
                        fontWeight: 800,
                        color: 'var(--gold-primary)',
                        background: 'rgba(201, 160, 60, 0.15)',
                        padding: '0.2rem 0.55rem',
                        borderRadius: '4px',
                      }}
                    >
                      ★ {pkg.badge}
                    </span>
                  ) : null}
                </div>

                <h4 style={{ fontFamily: 'var(--display)', fontSize: '1.55rem', fontWeight: 800, textTransform: 'uppercase', margin: '0 0 0.4rem', color: 'var(--heading-color)' }}>
                  {pkg.title}
                </h4>

                <p style={{ fontSize: '0.86rem', color: 'var(--muted-color)', lineHeight: 1.5, margin: '0 0 0.9rem' }}>
                  {pkg.desc}
                </p>

                {/* What's Included Pills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '0.9rem' }}>
                  {pkg.includedBadges.map((b, i) => (
                    <span
                      key={i}
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        padding: '0.2rem 0.55rem',
                        borderRadius: '6px',
                        background: b.startsWith('✓') ? 'rgba(16, 185, 129, 0.14)' : 'var(--chip-inactive-bg)',
                        color: b.startsWith('✓') ? '#10B981' : 'var(--text-main)',
                        border: b.startsWith('✓') ? '1px solid rgba(16, 185, 129, 0.35)' : '1px solid var(--surface-border)',
                      }}
                    >
                      {b}
                    </span>
                  ))}
                </div>

                {/* Special Add-on Checkbox for Interior Complete ("add a hand wash for $30") */}
                {pkg.canAddFlatWash && (
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.55rem',
                      padding: '0.6rem 0.75rem',
                      borderRadius: '8px',
                      background: addWashWithInteriorComplete ? 'rgba(201, 160, 60, 0.16)' : 'rgba(255, 255, 255, 0.04)',
                      border: `1.5px solid ${addWashWithInteriorComplete ? 'var(--gold)' : 'var(--surface-border)'}`,
                      cursor: 'pointer',
                      marginBottom: '0.9rem',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      color: 'var(--heading-color)',
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={addWashWithInteriorComplete}
                      onChange={(e) => setAddWashWithInteriorComplete(e.target.checked)}
                      style={{ accentColor: 'var(--gold)', width: '16px', height: '16px' }}
                    />
                    <span>+ Add a Hand Car Wash for $30 (Rate Card Special)</span>
                  </label>
                )}
              </div>

              <div>
                {renderVehiclePriceGrid(pkg.prices, extraWash)}

                <div style={{ borderTop: '1px dashed var(--surface-border)', paddingTop: '0.85rem', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ fontSize: '0.72rem', color: 'var(--muted-color)', display: 'block' }}>
                      {vehicles.find((v) => v.id === selectedVehicle)?.label}:
                    </span>
                    <div style={{ fontFamily: 'var(--display)', fontSize: '1.85rem', fontWeight: 900, color: 'var(--gold-primary)' }}>
                      ${price + extraWash} <span style={{ fontSize: '0.74rem', color: 'var(--muted-color)' }}>CAD</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const extra =
                        pkg.canAddFlatWash && addWashWithInteriorComplete
                          ? [{ id: 'interior-complete-wash', title: 'Add-on Hand Car Wash (with Interior Complete)', price: 30 }]
                          : [];
                      handleAddService(pkg.title, price, pkg.desc, pkg.id, extra);
                    }}
                    className={inCart || inclusion.isIncluded ? 'btn btn--navy' : 'btn btn--gold'}
                    style={{ minHeight: '42px', padding: '0 1.15rem', fontSize: '0.84rem' }}
                  >
                    {inCart ? 'In Cart ✓' : inclusion.isIncluded ? 'Already Included ✓' : '+ Add to Cart'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderPolishSection = () => (
    <div style={{ marginBottom: '2.5rem' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.5rem',
          padding: '0.85rem 1.25rem',
          background: 'linear-gradient(90deg, #0A1E42, #153263)',
          borderRadius: '12px',
          borderLeft: '4px solid var(--gold, #C9A03C)',
          marginBottom: '1rem',
          color: '#FFFFFF',
        }}
      >
        <div>
          <h3 style={{ fontFamily: 'var(--display)', fontSize: '1.4rem', fontWeight: 800, margin: 0, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Polish &amp; Protect
          </h3>
          <span style={{ fontSize: '0.8rem', color: '#A9C4E2' }}>
            Deep scratches that catch a fingernail cannot be fully removed. We measure paint depth before any correction begins.
          </span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(330px, 1fr))', gap: '1.35rem' }}>
        {polishPackages.map((pkg) => {
          const price = pkg.prices[selectedVehicle];
          const inCart = isServiceInCart(pkg.id);
          const inclusion = getInclusionStatus(pkg.id);

          return (
            <div
              key={pkg.id}
              className="frame"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: inclusion.isIncluded ? '2px dashed rgba(16, 185, 129, 0.55)' : undefined,
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem', marginBottom: '0.65rem', flexWrap: 'wrap' }}>
                  <span className="card-badge">{pkg.duration}</span>
                  {inclusion.isIncluded ? (
                    <span
                      style={{
                        fontFamily: 'var(--mono)',
                        fontSize: '0.7rem',
                        fontWeight: 800,
                        color: '#10B981',
                        background: 'rgba(16, 185, 129, 0.14)',
                        border: '1px solid rgba(16, 185, 129, 0.4)',
                        padding: '0.2rem 0.55rem',
                        borderRadius: '999px',
                      }}
                    >
                      ✓ Included in {inclusion.parentItem?.title}
                    </span>
                  ) : pkg.badge ? (
                    <span style={{ fontFamily: 'var(--mono)', fontSize: '0.72rem', fontWeight: 800, color: 'var(--gold-primary)', background: 'rgba(201, 160, 60, 0.15)', padding: '0.2rem 0.55rem', borderRadius: '4px' }}>
                      {pkg.badge}
                    </span>
                  ) : null}
                </div>

                <h4 style={{ fontFamily: 'var(--display)', fontSize: '1.55rem', fontWeight: 800, textTransform: 'uppercase', margin: '0 0 0.4rem', color: 'var(--heading-color)' }}>
                  {pkg.title}
                </h4>

                <p style={{ fontSize: '0.86rem', color: 'var(--muted-color)', lineHeight: 1.5, margin: '0 0 0.9rem' }}>
                  {pkg.desc}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1rem' }}>
                  {pkg.includedBadges.map((b, i) => (
                    <span
                      key={i}
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        padding: '0.2rem 0.55rem',
                        borderRadius: '6px',
                        background: b.startsWith('✓') ? 'rgba(16, 185, 129, 0.14)' : 'var(--chip-inactive-bg)',
                        color: b.startsWith('✓') ? '#10B981' : 'var(--text-main)',
                        border: b.startsWith('✓') ? '1px solid rgba(16, 185, 129, 0.35)' : '1px solid var(--surface-border)',
                      }}
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                {renderVehiclePriceGrid(pkg.prices)}

                <div style={{ borderTop: '1px dashed var(--surface-border)', paddingTop: '0.85rem', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ fontSize: '0.72rem', color: 'var(--muted-color)', display: 'block' }}>
                      {vehicles.find((v) => v.id === selectedVehicle)?.label}:
                    </span>
                    <div style={{ fontFamily: 'var(--display)', fontSize: '1.85rem', fontWeight: 900, color: 'var(--gold-primary)' }}>
                      ${price} <span style={{ fontSize: '0.74rem', color: 'var(--muted-color)' }}>CAD</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleAddService(pkg.title, price, pkg.desc, pkg.id)}
                    className={inCart || inclusion.isIncluded ? 'btn btn--navy' : 'btn btn--gold'}
                    style={{ minHeight: '42px', padding: '0 1.15rem', fontSize: '0.84rem' }}
                  >
                    {inCart ? 'In Cart ✓' : inclusion.isIncluded ? 'Already Included ✓' : '+ Add to Cart'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderCeramicSection = () => (
    <div style={{ marginBottom: '2.5rem' }}>
      {/* Rate Card Top Callout Banner */}
      <div
        style={{
          padding: '0.85rem 1.15rem',
          borderRadius: '10px',
          background: 'rgba(201, 160, 60, 0.12)',
          border: '1.5px solid var(--gold, #C9A03C)',
          marginBottom: '1rem',
          fontSize: '0.88rem',
          color: 'var(--heading-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.5rem',
        }}
      >
        <div>
          <strong>You don&apos;t have to coat the whole car.</strong> Trim or fabric from $89, glass $125, wheels $249 — alone or with any detail. Full paint packages from $449.
        </div>
        <button
          type="button"
          onClick={() => setActiveTab('interior')}
          style={{
            background: 'transparent',
            border: '1px solid var(--gold)',
            color: 'var(--gold-primary)',
            borderRadius: '6px',
            padding: '0.25rem 0.65rem',
            fontSize: '0.76rem',
            fontWeight: 800,
            cursor: 'pointer',
          }}
        >
          View Trim, Fabric, Glass &amp; Wheels &rarr;
        </button>
      </div>

      {/* Section Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.5rem',
          padding: '0.85rem 1.25rem',
          background: 'linear-gradient(90deg, #0A1E42, #153263)',
          borderRadius: '12px',
          borderLeft: '4px solid var(--gold, #C9A03C)',
          marginBottom: '1.25rem',
          color: '#FFFFFF',
        }}
      >
        <div>
          <h3 style={{ fontFamily: 'var(--display)', fontSize: '1.4rem', fontWeight: 800, margin: 0, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Ceramic Coating Packages
          </h3>
          <span style={{ fontSize: '0.82rem', color: 'var(--gold-lt)', fontWeight: 700 }}>
            Includes wash, iron decon, clay bar, paint correction &amp; coating
          </span>
        </div>
        <span style={{ fontSize: '0.76rem', color: '#A9C4E2' }}>
          📋 Every System X coating is registered with CARFAX &amp; appears on your vehicle history report
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(330px, 1fr))', gap: '1.35rem' }}>
        {ceramicPackages.map((pkg) => {
          const price = pkg.prices[selectedVehicle];
          const inCart = isServiceInCart(pkg.id);

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
                {/* Top Row: Duration + Rate Card Pills (e.g. 1 YEAR, 2 YEAR + CARFAX) */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.4rem', marginBottom: '0.65rem', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
                    {/* Blue Lifespan Pill exactly like the Rate Card */}
                    <span
                      style={{
                        fontFamily: 'var(--mono)',
                        fontSize: '0.74rem',
                        fontWeight: 900,
                        padding: '0.22rem 0.65rem',
                        borderRadius: '999px',
                        background: 'rgba(62, 155, 218, 0.22)',
                        color: '#38BDF8',
                        border: '1.5px solid rgba(56, 189, 248, 0.5)',
                        letterSpacing: '0.05em',
                      }}
                    >
                      {pkg.warrantyBadge}
                    </span>

                    {/* Black CARFAX Pill exactly like the Rate Card */}
                    {pkg.isCarfax && (
                      <span
                        style={{
                          fontFamily: 'var(--mono)',
                          fontSize: '0.72rem',
                          fontWeight: 900,
                          padding: '0.22rem 0.65rem',
                          borderRadius: '999px',
                          background: '#111113',
                          color: '#FFFFFF',
                          border: '1.5px solid var(--gold, #C9A03C)',
                          letterSpacing: '0.06em',
                        }}
                      >
                        CARFAX
                      </span>
                    )}
                  </div>
                  <span className="card-badge">{pkg.duration}</span>
                </div>

                <h4 style={{ fontFamily: 'var(--display)', fontSize: '1.55rem', fontWeight: 800, textTransform: 'uppercase', margin: '0 0 0.35rem', color: 'var(--heading-color)' }}>
                  {pkg.title}
                </h4>

                <p style={{ fontSize: '0.86rem', color: 'var(--muted-color)', lineHeight: 1.5, margin: '0 0 0.75rem' }}>
                  {pkg.desc}
                </p>

                {/* Explicit Lifespan & CARFAX Explanation Banner */}
                <div
                  style={{
                    padding: '0.6rem 0.75rem',
                    borderRadius: '8px',
                    marginBottom: '0.85rem',
                    background: pkg.isCarfax ? 'rgba(201, 160, 60, 0.13)' : 'rgba(62, 155, 218, 0.1)',
                    border: `1px solid ${pkg.isCarfax ? 'var(--surface-border-gold)' : 'rgba(62, 155, 218, 0.3)'}`,
                    fontSize: '0.78rem',
                  }}
                >
                  <div style={{ fontWeight: 800, color: pkg.isCarfax ? 'var(--gold-primary)' : 'var(--water-dk)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Award style={{ width: '0.95rem', height: '0.95rem', flexShrink: 0 }} />
                    <span>⏱️ {pkg.lifespanText}</span>
                  </div>
                  {pkg.carfaxExplanation && (
                    <div
                      style={{
                        marginTop: '0.25rem',
                        color: pkg.isCarfax ? '#10B981' : 'var(--muted-color)',
                        fontWeight: pkg.isCarfax ? 700 : 500,
                        fontSize: '0.75rem',
                      }}
                    >
                      {pkg.isCarfax ? '📋 ' : ''}
                      {pkg.carfaxExplanation}
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '0.9rem' }}>
                  {pkg.includedBadges.map((b, i) => (
                    <span
                      key={i}
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        padding: '0.2rem 0.55rem',
                        borderRadius: '6px',
                        background: b.startsWith('✓')
                          ? 'rgba(16, 185, 129, 0.14)'
                          : b.startsWith('🚚')
                          ? 'rgba(201, 160, 60, 0.16)'
                          : 'var(--chip-inactive-bg)',
                        color: b.startsWith('✓')
                          ? '#10B981'
                          : b.startsWith('🚚')
                          ? 'var(--gold-primary)'
                          : 'var(--text-main)',
                        border: b.startsWith('✓')
                          ? '1px solid rgba(16, 185, 129, 0.35)'
                          : b.startsWith('🚚')
                          ? '1px solid var(--surface-border-gold)'
                          : '1px solid var(--surface-border)',
                      }}
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                {renderVehiclePriceGrid(pkg.prices)}

                <div style={{ borderTop: '1px dashed var(--surface-border)', paddingTop: '0.85rem', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ fontSize: '0.72rem', color: 'var(--muted-color)', display: 'block' }}>
                      {vehicles.find((v) => v.id === selectedVehicle)?.label}:
                    </span>
                    <div style={{ fontFamily: 'var(--display)', fontSize: '1.85rem', fontWeight: 900, color: 'var(--gold-primary)' }}>
                      ${price} <span style={{ fontSize: '0.74rem', color: 'var(--muted-color)' }}>CAD</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      handleAddService(
                        `${pkg.title} (${pkg.warrantyBadge})`,
                        price,
                        pkg.desc,
                        pkg.id,
                        [],
                        pkg.lifespanText,
                        pkg.isCarfax,
                        pkg.carfaxExplanation
                      )
                    }
                    className={inCart ? 'btn btn--navy' : 'btn btn--gold'}
                    style={{ minHeight: '42px', padding: '0 1.15rem', fontSize: '0.84rem' }}
                  >
                    {inCart ? 'In Cart ✓' : '+ Add to Cart'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Ceramic Footer Note & Additional Coating Layer ($150) */}
      <div
        style={{
          marginTop: '1.15rem',
          padding: '0.9rem 1.2rem',
          borderRadius: '10px',
          background: 'var(--surface-card)',
          border: '1px solid var(--surface-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem',
          fontSize: '0.82rem',
          color: 'var(--muted-color)',
        }}
      >
        <div>
          Includes wash, iron decon, clay bar, correction and coating. <strong>Additional coating layer $150.</strong> Every System X coating is registered with CARFAX and appears on the vehicle history report.
        </div>
        <button
          type="button"
          onClick={() => handleAddService('Additional Ceramic Coating Layer', 150, 'Extra layer of ceramic protection', 'extra-coating-layer')}
          className="btn btn--outline"
          style={{ minHeight: '36px', padding: '0 0.9rem', fontSize: '0.78rem' }}
        >
          + Add Extra Coating Layer ($150)
        </button>
      </div>
    </div>
  );

  const renderInteriorGlassSection = () => (
    <div style={{ marginBottom: '2.5rem' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.5rem',
          padding: '0.85rem 1.25rem',
          background: 'linear-gradient(90deg, #0A1E42, #153263)',
          borderRadius: '12px',
          borderLeft: '4px solid var(--gold, #C9A03C)',
          marginBottom: '1rem',
          color: '#FFFFFF',
        }}
      >
        <div>
          <h3 style={{ fontFamily: 'var(--display)', fontSize: '1.4rem', fontWeight: 800, margin: 0, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Interior, Glass, Wheel &amp; Trim
          </h3>
          <span style={{ fontSize: '0.8rem', color: '#A9C4E2' }}>
            &ldquo;With a detail&rdquo; pricing applies when booked alongside any detail or ceramic package. Standalone pricing includes the interior preparation that has to happen first.
          </span>
        </div>
      </div>

      {/* Live Bundle Status Banner */}
      <div
        style={{
          padding: '0.8rem 1.15rem',
          borderRadius: '10px',
          marginBottom: '1.25rem',
          background: hasQualifyingDetail ? 'rgba(16, 185, 129, 0.12)' : 'rgba(62, 155, 218, 0.1)',
          border: `1.5px solid ${hasQualifyingDetail ? '#10B981' : 'rgba(62, 155, 218, 0.35)'}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.5rem',
          fontSize: '0.84rem',
        }}
      >
        {hasQualifyingDetail ? (
          <div style={{ color: '#10B981', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <CheckCircle2 style={{ width: '1.1rem', height: '1.1rem', flexShrink: 0 }} />
            <span>
              &ldquo;With a Detail&rdquo; Bundle Pricing Unlocked! Because you have a Detail or Ceramic package in your cart, you automatically get the lower rate below.
            </span>
          </div>
        ) : (
          <div style={{ color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Info style={{ width: '1.1rem', height: '1.1rem', color: 'var(--water)', flexShrink: 0 }} />
            <span>
              Booking standalone? Full prep is included. Or add any <strong>Detail / Ceramic Package</strong> to your cart to automatically unlock the discounted <strong>&ldquo;With a Detail&rdquo;</strong> price!
            </span>
          </div>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(330px, 1fr))', gap: '1.35rem' }}>
        {interiorPackages.map((pkg) => {
          const inCart = cart.some((c) => c.serviceId === pkg.id);
          const inclusion = getInclusionStatus(pkg.id);
          const activePrice = hasQualifyingDetail ? pkg.withDetail : pkg.standalone;
          const savings = pkg.standalone - pkg.withDetail;

          return (
            <div
              key={pkg.id}
              className="frame"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: inclusion.isIncluded
                  ? '2px dashed rgba(16, 185, 129, 0.55)'
                  : pkg.isCarfax
                  ? '2px solid var(--surface-border-gold)'
                  : undefined,
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.4rem', marginBottom: '0.65rem', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
                    <span
                      style={{
                        fontFamily: 'var(--mono)',
                        fontSize: '0.7rem',
                        fontWeight: 900,
                        padding: '0.2rem 0.6rem',
                        borderRadius: '999px',
                        background: 'rgba(62, 155, 218, 0.2)',
                        color: '#38BDF8',
                        border: '1px solid rgba(56, 189, 248, 0.45)',
                      }}
                    >
                      {pkg.warrantyPill}
                    </span>

                    {pkg.isCarfax && (
                      <span
                        style={{
                          fontFamily: 'var(--mono)',
                          fontSize: '0.7rem',
                          fontWeight: 900,
                          padding: '0.2rem 0.6rem',
                          borderRadius: '999px',
                          background: '#111113',
                          color: '#FFFFFF',
                          border: '1.5px solid var(--gold, #C9A03C)',
                        }}
                      >
                        CARFAX
                      </span>
                    )}
                  </div>

                  {inclusion.isIncluded ? (
                    <span
                      style={{
                        fontFamily: 'var(--mono)',
                        fontSize: '0.68rem',
                        fontWeight: 800,
                        color: '#10B981',
                        background: 'rgba(16, 185, 129, 0.14)',
                        border: '1px solid rgba(16, 185, 129, 0.4)',
                        padding: '0.18rem 0.5rem',
                        borderRadius: '999px',
                      }}
                    >
                      ✓ Included in {inclusion.parentItem?.title}
                    </span>
                  ) : (
                    <span className="card-badge">Save ${savings} With Detail</span>
                  )}
                </div>

                <h4 style={{ fontFamily: 'var(--display)', fontSize: '1.45rem', fontWeight: 800, textTransform: 'uppercase', margin: '0 0 0.35rem', color: 'var(--heading-color)' }}>
                  {pkg.title}
                </h4>

                <p style={{ fontSize: '0.86rem', color: 'var(--muted-color)', lineHeight: 1.5, margin: '0 0 0.75rem' }}>
                  {pkg.desc}
                </p>

                {/* Lifespan & CARFAX Box */}
                <div
                  style={{
                    padding: '0.55rem 0.75rem',
                    borderRadius: '8px',
                    marginBottom: '0.9rem',
                    background: pkg.isCarfax ? 'rgba(201, 160, 60, 0.12)' : 'rgba(255, 255, 255, 0.04)',
                    border: `1px solid ${pkg.isCarfax ? 'var(--surface-border-gold)' : 'var(--surface-border)'}`,
                    fontSize: '0.76rem',
                  }}
                >
                  <div style={{ fontWeight: 800, color: pkg.isCarfax ? 'var(--gold-primary)' : 'var(--heading-color)' }}>
                    ⏱️ {pkg.lifespanText}
                  </div>
                  {pkg.carfaxText && (
                    <div
                      style={{
                        marginTop: '0.2rem',
                        color: pkg.isCarfax ? '#10B981' : 'var(--muted-color)',
                        fontWeight: pkg.isCarfax ? 700 : 500,
                      }}
                    >
                      {pkg.isCarfax ? '📋 ' : ''}
                      {pkg.carfaxText}
                    </div>
                  )}
                </div>
              </div>

              <div style={{ borderTop: '1px dashed var(--surface-border)', paddingTop: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
                  <div
                    style={{
                      padding: '0.55rem 0.7rem',
                      borderRadius: '8px',
                      background: hasQualifyingDetail ? 'rgba(16, 185, 129, 0.14)' : 'var(--chip-inactive-bg)',
                      border: `1.5px solid ${hasQualifyingDetail ? '#10B981' : 'var(--surface-border)'}`,
                    }}
                  >
                    <span style={{ fontSize: '0.68rem', textTransform: 'uppercase', fontWeight: 800, color: hasQualifyingDetail ? '#10B981' : 'var(--muted-color)', display: 'block' }}>
                      With a Detail {hasQualifyingDetail && '✓'}
                    </span>
                    <strong style={{ fontFamily: 'var(--display)', fontSize: '1.45rem', color: hasQualifyingDetail ? '#10B981' : 'var(--heading-color)' }}>
                      ${pkg.withDetail} <small style={{ fontSize: '0.68rem' }}>CAD</small>
                    </strong>
                  </div>

                  <div
                    style={{
                      padding: '0.55rem 0.7rem',
                      borderRadius: '8px',
                      background: !hasQualifyingDetail ? 'rgba(201, 160, 60, 0.14)' : 'var(--chip-inactive-bg)',
                      border: `1.5px solid ${!hasQualifyingDetail ? 'var(--gold)' : 'var(--surface-border)'}`,
                    }}
                  >
                    <span style={{ fontSize: '0.68rem', textTransform: 'uppercase', fontWeight: 800, color: !hasQualifyingDetail ? 'var(--gold-primary)' : 'var(--muted-color)', display: 'block' }}>
                      Standalone {!hasQualifyingDetail && '✓'}
                    </span>
                    <strong style={{ fontFamily: 'var(--display)', fontSize: '1.45rem', color: !hasQualifyingDetail ? 'var(--gold-primary)' : 'var(--muted-color)' }}>
                      ${pkg.standalone} <small style={{ fontSize: '0.68rem' }}>CAD</small>
                    </strong>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    handleAddService(
                      pkg.title,
                      activePrice,
                      hasQualifyingDetail ? 'Booked with Detail / Ceramic ("With a Detail" Rate)' : 'Standalone Visit (Includes Prep)',
                      pkg.id,
                      [],
                      pkg.lifespanText,
                      pkg.isCarfax,
                      pkg.carfaxText
                    )
                  }
                  className={inCart || inclusion.isIncluded ? 'btn btn--navy' : 'btn btn--gold'}
                  style={{ width: '100%', minHeight: '40px', fontSize: '0.84rem' }}
                >
                  {inCart
                    ? 'In Cart ✓'
                    : inclusion.isIncluded
                    ? `Included in ${inclusion.parentItem?.title} ✓`
                    : `+ Add (${hasQualifyingDetail ? `With Detail $${pkg.withDetail}` : `Standalone $${pkg.standalone}`})`}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderAddonsSection = () => (
    <div style={{ marginBottom: '2.5rem' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.5rem',
          padding: '0.85rem 1.25rem',
          background: 'linear-gradient(90deg, #0A1E42, #153263)',
          borderRadius: '12px',
          borderLeft: '4px solid var(--gold, #C9A03C)',
          marginBottom: '1.25rem',
          color: '#FFFFFF',
        }}
      >
        <div>
          <h3 style={{ fontFamily: 'var(--display)', fontSize: '1.4rem', fontWeight: 800, margin: 0, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Add-Ons &amp; Surcharge
          </h3>
          <span style={{ fontSize: '0.8rem', color: '#A9C4E2' }}>
            Overlapping add-ons (such as Clay Bar or Summer Mats) will automatically alert you if already included in your selected package.
          </span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.2rem', marginBottom: '1.5rem' }}>
        {addonList.map((addon) => {
          const inCart = cart.some((c) => c.serviceId === addon.id);
          const inclusion = getInclusionStatus(addon.id);

          return (
            <div
              key={addon.id}
              className="frame"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: inclusion.isIncluded ? '2px dashed rgba(16, 185, 129, 0.55)' : undefined,
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                  <span className="card-badge">Add-On</span>
                  {inclusion.isIncluded && (
                    <span
                      style={{
                        fontFamily: 'var(--mono)',
                        fontSize: '0.68rem',
                        fontWeight: 800,
                        color: '#10B981',
                        background: 'rgba(16, 185, 129, 0.14)',
                        border: '1px solid rgba(16, 185, 129, 0.4)',
                        padding: '0.15rem 0.5rem',
                        borderRadius: '999px',
                      }}
                    >
                      ✓ Included in {inclusion.parentItem?.title}
                    </span>
                  )}
                </div>

                <h4 style={{ fontFamily: 'var(--display)', fontSize: '1.4rem', fontWeight: 800, textTransform: 'uppercase', margin: '0.25rem 0 0.4rem', color: 'var(--heading-color)' }}>
                  {addon.title}
                </h4>
                <p style={{ fontSize: '0.84rem', color: 'var(--muted-color)', lineHeight: 1.5, margin: '0 0 1rem' }}>
                  {addon.desc}
                </p>
              </div>

              <div style={{ borderTop: '1px dashed var(--surface-border)', paddingTop: '0.85rem', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                <div style={{ fontFamily: 'var(--display)', fontSize: '1.7rem', fontWeight: 900, color: 'var(--gold-primary)' }}>
                  {addon.priceDisplay || `$${addon.price}`} <span style={{ fontSize: '0.72rem', color: 'var(--muted-color)' }}>CAD</span>
                </div>

                <button
                  type="button"
                  onClick={() => handleAddService(addon.title, addon.price, addon.desc, addon.id)}
                  className={inCart || inclusion.isIncluded ? 'btn btn--navy' : 'btn btn--gold'}
                  style={{ minHeight: '38px', padding: '0 1rem', fontSize: '0.82rem' }}
                >
                  {inCart ? 'In Cart ✓' : inclusion.isIncluded ? 'Already Included ✓' : '+ Add'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Surcharge Card (Verbatim from Page 1 of 2026 Rate Card) */}
      <div
        style={{
          background: 'linear-gradient(135deg, #0A1E42 0%, #0d2552 100%)',
          border: '2px solid var(--gold, #C9A03C)',
          borderRadius: '14px',
          padding: '1.5rem',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1.25rem',
        }}
      >
        <div style={{ maxWidth: '720px' }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--gold-lt)', fontWeight: 800 }}>
            Surcharge &middot; If It&apos;s Extra Dirty
          </span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', margin: '0.35rem 0' }}>
            <span style={{ fontFamily: 'var(--display)', fontSize: '2.4rem', fontWeight: 900, color: 'var(--gold-lt)', lineHeight: 1 }}>
              +$50
            </span>
            <strong style={{ fontSize: '1.1rem' }}>If it&apos;s extra dirty</strong>
          </div>
          <p style={{ fontSize: '0.88rem', color: '#D1E2F5', lineHeight: 1.55, margin: 0 }}>
            Not automatic. It applies only when a vehicle needs a lot more work than usual — heavy mess from kids or pets, or a work vehicle. We look the car over with you and tell you before any work begins, never after.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            handleAddService(
              'Extra Dirty Vehicle Surcharge (+$50)',
              50,
              'Heavy mess from kids or pets, or a work vehicle',
              'extra-dirty'
            )
          }
          className={cart.some((c) => c.serviceId === 'extra-dirty') ? 'btn btn--navy' : 'btn btn--gold'}
          style={{ minHeight: '44px', padding: '0 1.25rem', fontSize: '0.86rem', flexShrink: 0 }}
        >
          {cart.some((c) => c.serviceId === 'extra-dirty') ? 'Added ✓' : '+ Pre-Select +$50 Surcharge'}
        </button>
      </div>
    </div>
  );

  return (
    <section id="packages" className="band" style={{ paddingTop: '2.5rem', scrollMarginTop: '80px' }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 1rem' }}>
        
        {/* Official 2026 Rate Card Header */}
        <div className="section-head" style={{ marginBottom: '2rem' }}>
          <p className="kicker">2026 Rate Card &middot; Ktown Auto Spa</p>
          <h2>Wash, Detail, Polish &amp; Ceramic Protection</h2>
          <p style={{ marginBottom: '1rem' }}>
            All prices in CAD, plus HST &middot; Appointment only &middot; Final price confirmed at drop-off, never after
          </p>

          {/* Official Certification Pills from Rate Card */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.5rem' }}>
            {[
              'AUTHORIZED SYSTEM X INSTALLER',
              'NANO-BRITE CERTIFIED',
              'AUTO-BRITE CERTIFIED',
              'CARFAX REGISTERED',
            ].map((cert) => (
              <span
                key={cert}
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: '0.7rem',
                  fontWeight: 800,
                  letterSpacing: '0.06em',
                  padding: '0.3rem 0.75rem',
                  borderRadius: '999px',
                  background: 'rgba(201, 160, 60, 0.16)',
                  border: '1px solid var(--gold, #C9A03C)',
                  color: 'var(--gold-primary)',
                }}
              >
                {cert}
              </span>
            ))}
          </div>
        </div>

        {/* Step 1: Vehicle Size Selector */}
        <div
          style={{
            background: 'var(--surface-card, #0d1b2e)',
            border: '2px solid var(--surface-border-gold, #C9A03C)',
            borderRadius: '16px',
            padding: '1.25rem',
            marginBottom: '1.75rem',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.25)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: '0.82rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--gold-primary)' }}>
              1. Select Your Vehicle Size (Updates All Rates Instantly)
            </span>
            <span style={{ fontSize: '0.78rem', color: 'var(--muted-color)' }}>
              🛡️ Smart Overlap Protection Active — We prevent paying twice for included services
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
                    <Car style={{ width: '1.3rem', height: '1.3rem' }} />
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
                  gap: '0.5rem',
                  padding: '0.75rem 1.15rem',
                  borderRadius: '999px',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  fontSize: '0.86rem',
                  fontWeight: 800,
                  transition: 'all 0.2s ease',
                  background: isActive ? 'var(--gold, #C9A03C)' : 'var(--surface-card, #0d1b2e)',
                  color: isActive ? '#0A1E42' : 'var(--heading-color)',
                  border: `1.5px solid ${isActive ? 'var(--gold, #C9A03C)' : 'var(--surface-border)'}`,
                  boxShadow: isActive ? '0 4px 15px rgba(201, 160, 60, 0.3)' : 'none',
                }}
              >
                <tab.icon style={{ width: '1rem', height: '1rem' }} />
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

        {/* Render Active Category or Full Rate Card View */}
        {(activeTab === 'wash' || activeTab === 'all') && renderWashAndDetailSection()}
        {(activeTab === 'polish' || activeTab === 'all') && renderPolishSection()}
        {(activeTab === 'coat' || activeTab === 'all') && renderCeramicSection()}
        {(activeTab === 'interior' || activeTab === 'all') && renderInteriorGlassSection()}
        {(activeTab === 'addons' || activeTab === 'all') && renderAddonsSection()}

        {/* Rate Card: WHY A SHOP, NOT A DRIVEWAY (Verbatim from Page 1 of 2026 Rate Card) */}
        <div
          style={{
            marginTop: '1.5rem',
            marginBottom: '1.5rem',
            padding: '1.5rem',
            borderRadius: '16px',
            background: 'var(--surface-card, #0d1b2e)',
            border: '1.5px solid var(--surface-border)',
          }}
        >
          <h3
            style={{
              fontFamily: 'var(--display)',
              fontSize: '1.45rem',
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              color: 'var(--heading-color)',
              margin: '0 0 1.25rem',
            }}
          >
            Why a Shop, Not a Driveway
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '1.25rem' }}>
            {[
              {
                title: 'Hospital-grade steam cleaner',
                desc: 'Italian-made, 305°F dry steam with vacuum extraction. It sanitizes seats, carpets and vents without soaking them or leaving chemical residue — the class of machine Canadian hospitals use for disinfection. We don’t know of another detailer in Kingston running one.',
              },
              {
                title: 'Dust-controlled indoor bay',
                desc: 'Coatings cure without wind, pollen or dew landing in wet product.',
              },
              {
                title: 'Professional inspection lighting',
                desc: 'Swirls you cannot see cannot be corrected.',
              },
              {
                title: 'Paint depth measured first',
                desc: 'No compounding through thin or previously repainted clear coat.',
              },
              {
                title: 'Open Saturdays, heated year-round',
                desc: 'Salt season is exactly when your paint needs us most.',
              },
              {
                title: 'Free pickup and delivery',
                desc: 'On every ceramic coating package from $949. We collect your car and bring it back.',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  borderLeft: '3px solid var(--gold, #C9A03C)',
                  paddingLeft: '0.85rem',
                }}
              >
                <strong style={{ display: 'block', fontSize: '0.95rem', color: 'var(--heading-color)', marginBottom: '0.2rem' }}>
                  {item.title}
                </strong>
                <span style={{ fontSize: '0.82rem', color: 'var(--muted-color)', lineHeight: 1.5, display: 'block' }}>
                  {item.desc}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Rate Card Bottom Contact & Appointment Bar (Verbatim from Page 1 & Page 2) */}
        <div
          style={{
            background: '#0A1E42',
            border: '1.5px solid var(--gold, #C9A03C)',
            borderRadius: '14px',
            padding: '1.15rem 1.5rem',
            marginBottom: '2rem',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div style={{ fontFamily: 'var(--display)', fontSize: '1.5rem', fontWeight: 900, color: 'var(--gold-lt)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Book Your Appointment
          </div>
          <div style={{ textAlign: 'right', fontSize: '0.84rem', lineHeight: 1.5, color: '#E2E8F0' }}>
            <div>
              <strong>647-915-3530 (call, text or WhatsApp)</strong> &middot; ktownautomobilespa@gmail.com
            </div>
            <div style={{ color: '#A9C4E2', fontSize: '0.8rem' }}>
              36 Joseph St, Kingston ON K7K 2H5 &middot; ktownautospa.ca &middot; Open Saturdays
            </div>
          </div>
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
                  {bundleSavings > 0 && ` · Saved $${bundleSavings} with Detail Bundle!`}
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

      {/* ============================================================================
          SMART OVERLAP PROTECTION POP-UP MODAL
          Prevents customers from accidentally paying twice for included services!
      ============================================================================ */}
      {overlapAlert && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'rgba(5, 17, 36, 0.82)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
          }}
          onClick={() => setOverlapAlert(null)}
        >
          <div
            style={{
              maxWidth: '500px',
              width: '100%',
              background: 'var(--surface-card, #0d1b2e)',
              border: '2px solid var(--gold, #C9A03C)',
              borderRadius: '18px',
              padding: '1.75rem',
              boxShadow: '0 24px 60px rgba(0, 0, 0, 0.65)',
              color: 'var(--text-main)',
              position: 'relative',
            }}
            onClick={(e) => e.stopPropagation()}
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
                <h3 style={{ fontFamily: 'var(--display)', fontSize: '1.55rem', fontWeight: 800, margin: 0, color: 'var(--heading-color)', textTransform: 'uppercase' }}>
                  {overlapAlert.title}
                </h3>
              </div>
            </div>

            <div
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid var(--surface-border)',
                borderRadius: '12px',
                padding: '1rem 1.15rem',
                marginBottom: '1.35rem',
                fontSize: '0.94rem',
                lineHeight: 1.55,
                color: 'var(--heading-color)',
              }}
            >
              <p style={{ margin: 0 }}>{overlapAlert.message}</p>

              {overlapAlert.type === 'already_included' && overlapAlert.parentItem && (
                <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px dashed var(--surface-border)', fontSize: '0.82rem', color: '#10B981', fontWeight: 700 }}>
                  ✓ Covered by: {overlapAlert.parentItem.title} ({overlapAlert.parentItem.vehicleLabel})
                </div>
              )}

              {overlapAlert.type === 'supersedes_existing' && overlapAlert.reasonsList && (
                <ul style={{ margin: '0.75rem 0 0', paddingLeft: '1.2rem', fontSize: '0.82rem', color: '#10B981' }}>
                  {overlapAlert.reasonsList.map((r, idx) => (
                    <li key={idx} style={{ marginBottom: '0.25rem' }}>{r}</li>
                  ))}
                </ul>
              )}
            </div>

            {/* Modal Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {overlapAlert.type === 'already_included' && (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setOverlapAlert(null);
                      setIsCartOpen(true);
                    }}
                    className="btn btn--gold"
                    style={{ width: '100%', minHeight: '46px', fontWeight: 800, fontSize: '0.92rem' }}
                  >
                    Got It — Don&apos;t Charge Me Twice!
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const { newItem, openDrawer } = overlapAlert;
                      setOverlapAlert(null);
                      commitAddToCart(newItem, openDrawer);
                    }}
                    className="btn btn--outline"
                    style={{ width: '100%', minHeight: '40px', fontSize: '0.8rem' }}
                  >
                    Add Anyway (For a 2nd Vehicle)
                  </button>
                </>
              )}

              {overlapAlert.type === 'supersedes_existing' && (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      const { newItem, openDrawer, supersededItems } = overlapAlert;
                      const removeIds = supersededItems.map((i) => i.id);
                      setOverlapAlert(null);
                      commitAddToCart(newItem, openDrawer, removeIds);
                    }}
                    className="btn btn--gold"
                    style={{ width: '100%', minHeight: '46px', fontWeight: 800, fontSize: '0.92rem' }}
                  >
                    Replace &amp; Save ${overlapAlert.savedAmount} CAD (Recommended)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const { newItem, openDrawer } = overlapAlert;
                      setOverlapAlert(null);
                      commitAddToCart(newItem, openDrawer);
                    }}
                    className="btn btn--outline"
                    style={{ width: '100%', minHeight: '40px', fontSize: '0.8rem' }}
                  >
                    Keep Both (Booking for Multiple Vehicles)
                  </button>
                </>
              )}

              {overlapAlert.type === 'exact_duplicate' && (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setOverlapAlert(null);
                      setIsCartOpen(true);
                    }}
                    className="btn btn--gold"
                    style={{ width: '100%', minHeight: '46px', fontWeight: 800, fontSize: '0.92rem' }}
                  >
                    View My Cart
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const { newItem, openDrawer } = overlapAlert;
                      setOverlapAlert(null);
                      commitAddToCart(newItem, openDrawer);
                    }}
                    className="btn btn--outline"
                    style={{ width: '100%', minHeight: '40px', fontSize: '0.8rem' }}
                  >
                    Add a 2nd One (For Another Vehicle)
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
