// Server-side Rate Card & Pricing Engine for Ktown Auto Spa (2026)
// Single source of truth for pricing validation

export const RATE_CARD = {
  washAndDetail: {
    'hand-car-wash': {
      title: 'Hand Car Wash',
      desc: 'Wash & wax soap, windows, blown dry',
      duration: 'Approx. 45 mins',
      prices: { 'c-sedan': 30, 'c-cross': 40, 'c-suv': 45, 'c-van': 50 },
    },
    'interior-refresh': {
      title: 'Interior Refresh',
      desc: 'Doors, jambs, panels and dashboard wiped down, full blow-out and vacuum, rubber mats washed or carpet mats dry-cleaned.',
      duration: 'Approx. 1 hr',
      prices: { 'c-sedan': 70, 'c-cross': 85, 'c-suv': 95, 'c-van': 105 },
    },
    'medium-package': {
      title: 'Medium Package',
      desc: 'Interior vacuum & glass, mats, jambs, hand wash',
      duration: 'Approx. 2 hrs',
      prices: { 'c-sedan': 100, 'c-cross': 130, 'c-suv': 150, 'c-van': 160 },
    },
    'interior-complete': {
      title: 'Interior Complete (interior only)',
      desc: '305°F steam extraction through the whole car, seats and carpets shampooed, vinyl and trim cleaned and dressed.',
      duration: 'Approx. 3 hrs',
      prices: { 'c-sedan': 175, 'c-cross': 199, 'c-suv': 229, 'c-van': 249 },
    },
    'full-detail': {
      title: 'Full Detail',
      desc: 'Medium Package plus summer mats steamed, carpets & seats scrubbed',
      duration: 'Approx. 4 hrs',
      prices: { 'c-sedan': 200, 'c-cross': 230, 'c-suv': 250, 'c-van': 270 },
    },
  },

  polishAndProtect: {
    'wash-machine-wax': {
      title: 'Wash & Machine Wax',
      desc: 'No abrasives. Gloss and protection for around 6 months',
      duration: 'Approx. 2 hrs',
      prices: { 'c-sedan': 120, 'c-cross': 140, 'c-suv': 160, 'c-van': 180 },
    },
    'gloss-enhancement': {
      title: 'Gloss Enhancement',
      desc: 'Clay plus one-step all-in-one polish. Reduces light swirls',
      duration: 'Approx. 3 hrs',
      prices: { 'c-sedan': 200, 'c-cross': 230, 'c-suv': 260, 'c-van': 290 },
    },
    '1-step-correction': {
      title: '1-Step Paint Correction',
      desc: 'Machine polish and sealant. Removes 50–70% of defects',
      duration: 'Approx. 6 hrs',
      prices: { 'c-sedan': 350, 'c-cross': 400, 'c-suv': 450, 'c-van': 500 },
    },
    '2-step-correction': {
      title: '2-Step Paint Correction',
      desc: 'Compound and polish. Removes 80–90% of defects',
      duration: 'Approx. 11 hrs',
      prices: { 'c-sedan': 650, 'c-cross': 750, 'c-suv': 850, 'c-van': 950 },
    },
  },

  ceramicCoating: {
    'nanobrite-rejuvenate': {
      title: 'Nano-Brite Rejuvenate (1 Year)',
      desc: 'Decon + 1-step correction + 1 layer',
      duration: 'Approx. 5 hrs',
      prices: { 'c-sedan': 449, 'c-cross': 499, 'c-suv': 549, 'c-van': 599 },
    },
    'nanobrite-ultra': {
      title: 'Nano-Brite Ultra (3 Year)',
      desc: 'Decon + 1-step correction + 1 layer',
      duration: 'Approx. 6 hrs',
      prices: { 'c-sedan': 649, 'c-cross': 749, 'c-suv': 849, 'c-van': 899 },
    },
    'nanobrite-evo': {
      title: 'Nano-Brite EVO Graphene (7 Year)',
      desc: 'Graphene coating. Decon + 2-step correction + top coat',
      duration: 'Approx. 10 hrs',
      prices: { 'c-sedan': 1199, 'c-cross': 1299, 'c-suv': 1399, 'c-van': 1499 },
    },
    'systemx-crystal': {
      title: 'System X Crystal+ (2 Year CARFAX)',
      desc: '1-step correction + paint and glass coating',
      duration: 'Approx. 8 hrs',
      prices: { 'c-sedan': 949, 'c-cross': 1049, 'c-suv': 1149, 'c-van': 1249 },
    },
    'systemx-pro': {
      title: 'System X Pro+ (6 Year CARFAX)',
      desc: '2-step correction + paint, glass and wheel coatings',
      duration: 'Approx. 11 hrs',
      prices: { 'c-sedan': 1299, 'c-cross': 1449, 'c-suv': 1599, 'c-van': 1749 },
    },
    'systemx-maxg': {
      title: 'System X Max G+ (10 Year CARFAX)',
      desc: 'Graphene. 2-step correction + paint, glass and wheel coatings',
      duration: 'Approx. 12 hrs',
      prices: { 'c-sedan': 1699, 'c-cross': 1849, 'c-suv': 1999, 'c-van': 2149 },
    },
    'systemx-diamond': {
      title: 'System X Diamond SS (Lifetime CARFAX)',
      desc: '2-step correction + paint, glass and wheel coatings',
      duration: 'Approx. 13 hrs',
      prices: { 'c-sedan': 1799, 'c-cross': 1949, 'c-suv': 2099, 'c-van': 2249 },
    },
    'ceramic-maint-wash': {
      title: 'Ceramic Maintenance Wash',
      desc: 'Single visit. Recommended every 6–8 weeks',
      duration: 'Approx. 1 hr',
      prices: { 'c-sedan': 55, 'c-cross': 65, 'c-suv': 75, 'c-van': 85 },
    },
    'maint-plan': {
      title: 'Ceramic Maintenance Plan (Billed Monthly)',
      desc: 'One wash every month. Cancel anytime. Priority booking',
      duration: 'Monthly',
      prices: { 'c-sedan': 45, 'c-cross': 55, 'c-suv': 65, 'c-van': 75 },
    },
  },

  interiorAndGlass: {
    'systemx-lvp': {
      title: 'System X LVP (Leather, Vinyl & Plastic)',
      desc: '3-year warranty against spills and stains. CARFAX registered',
      withDetailPrice: 229,
      standalonePrice: 389,
    },
    'systemx-textile': {
      title: 'System X Textile (Fabric & Carpet)',
      desc: '2-year stain protection. CARFAX registered',
      withDetailPrice: 149,
      standalonePrice: 259,
    },
    'systemx-lvp-textile': {
      title: 'System X LVP + Textile Complete Interior',
      desc: 'Full interior coated, warranted and CARFAX registered',
      withDetailPrice: 325,
      standalonePrice: 499,
    },
    'nanobrite-leather': {
      title: 'Nano-Brite Leather Guard',
      desc: '8–12 month protection. No warranty registration',
      withDetailPrice: 99,
      standalonePrice: 170,
    },
    'nanobrite-fabric': {
      title: 'Nano-Brite Fabric Guard',
      desc: '8–12 month protection. No warranty registration',
      withDetailPrice: 89,
      standalonePrice: 150,
    },
    'nanobrite-leather-fabric': {
      title: 'Nano-Brite Leather + Fabric Complete Interior',
      desc: '8–12 month protection. Best-value interior package',
      withDetailPrice: 175,
      standalonePrice: 279,
    },
    'systemx-glass': {
      title: 'System X Glass+ (Windshield & Windows)',
      desc: 'Up to 2 years. Improves wet-weather visibility',
      withDetailPrice: 125,
      standalonePrice: 165,
    },
    'systemx-wheel': {
      title: 'System X Wheel+ (Wheel Coating)',
      desc: 'Brake dust resistant. Wheels removed for full coverage',
      withDetailPrice: 249,
      standalonePrice: 329,
    },
    'systemx-revive': {
      title: 'System X Revive (Trim Restoration)',
      desc: 'Restores faded exterior plastic and trim',
      withDetailPrice: 89,
      standalonePrice: 129,
    },
  },

  addons: {
    'engine-bay': { title: 'Engine Bay Cleaning', price: 40 },
    'tire-shine': { title: 'Tire Shine', price: 10 },
    'summer-mats': { title: 'Summer Mats Shampoo Wash', price: 20 },
    'headlights': { title: 'Headlight Restoration (pair)', price: 60 },
    'clay-bar': { title: 'Clay Bar Decontamination', price: 60 },
    'odour': { title: 'Odour Treatment', price: 50 },
    'pet-hair': { title: 'Pet Hair Removal / Extra Dirty Surcharge', price: 50 },
  },
};

export const VEHICLES = {
  'c-sedan': 'Sedan',
  'c-cross': 'Crossover (5 seat)',
  'c-suv': 'SUV (3rd row)',
  'c-van': 'Van',
};

// Calculate validated cart totals on server side
export function calculateOrderTotals(cartItems = []) {
  let subtotal = 0;
  const validatedItems = [];

  for (const item of cartItems) {
    let itemPrice = 0;
    const vType = item.vehicleType || 'c-sedan';

    // Find service definition
    let serviceDef = null;
    for (const group of [RATE_CARD.washAndDetail, RATE_CARD.polishAndProtect, RATE_CARD.ceramicCoating]) {
      if (group[item.serviceId]) {
        serviceDef = group[item.serviceId];
        break;
      }
    }

    if (serviceDef) {
      itemPrice = serviceDef.prices[vType] || serviceDef.prices['c-sedan'] || 0;
    } else if (RATE_CARD.interiorAndGlass[item.serviceId]) {
      const intDef = RATE_CARD.interiorAndGlass[item.serviceId];
      itemPrice = item.isStandalone ? intDef.standalonePrice : intDef.withDetailPrice;
      serviceDef = intDef;
    } else if (typeof item.basePrice === 'number') {
      itemPrice = Math.max(0, item.basePrice);
    } else if (typeof item.price === 'number') {
      // Custom / custom quote fallback
      itemPrice = Math.max(0, item.price);
    }

    // Add selected add-ons for this item
    let addonsTotal = 0;
    const validatedAddons = [];
    if (Array.isArray(item.addons)) {
      for (const addon of item.addons) {
        const addonId = typeof addon === 'string' ? addon : (addon?.id || '');
        if (RATE_CARD.addons[addonId]) {
          const add = RATE_CARD.addons[addonId];
          addonsTotal += add.price;
          validatedAddons.push({ id: addonId, title: add.title, price: add.price });
        } else if (addon && typeof addon.price === 'number') {
          addonsTotal += addon.price;
          validatedAddons.push({ id: addon.id || 'custom-addon', title: addon.title || addon.name || 'Add-on', price: addon.price });
        }
      }
    }

    const totalItemPrice = itemPrice + addonsTotal;
    subtotal += totalItemPrice;

    validatedItems.push({
      serviceId: item.serviceId || 'custom',
      title: item.title || (serviceDef ? serviceDef.title : 'Custom Detailing Service'),
      vehicleType: vType,
      vehicleLabel: VEHICLES[vType] || 'Sedan',
      basePrice: itemPrice,
      addons: validatedAddons,
      addonsTotal,
      totalPrice: totalItemPrice,
    });
  }

  // 13% Ontario HST for Kingston, Ontario
  const hstTax = Math.round(subtotal * 0.13 * 100) / 100;
  const grandTotal = Math.round((subtotal + hstTax) * 100) / 100;
  const amountInCents = Math.round(grandTotal * 100);

  return {
    items: validatedItems,
    subtotal,
    hstRate: 0.13,
    hstTax,
    grandTotal,
    amountInCents,
  };
}
