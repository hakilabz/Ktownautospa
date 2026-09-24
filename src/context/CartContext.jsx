import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

const CartContext = createContext(null);

export const VEHICLE_OPTIONS = [
  { id: 'c-sedan', label: 'Sedan' },
  { id: 'c-cross', label: 'Crossover (5 seat)' },
  { id: 'c-suv', label: 'SUV (3rd row)' },
  { id: 'c-van', label: 'Van' },
];

export const ADDON_CATALOG = [
  { id: 'engine-bay', title: 'Engine Bay Cleaning', price: 40 },
  { id: 'tire-shine', title: 'Tire Shine', price: 10 },
  { id: 'spray-wax', title: 'Spray Wax (with any wash)', price: 25 },
  { id: 'summer-mats', title: 'Summer Mats Shampoo Wash', price: 20 },
  { id: 'headlights', title: 'Headlight Restoration (pair)', price: 60 },
  { id: 'clay-bar', title: 'Clay Bar Decontamination', price: 60 },
  { id: 'odour', title: 'Odour Treatment', price: 50 },
  { id: 'pet-hair', title: 'Pet Hair Removal', price: 50 },
  { id: 'extra-dirty', title: "If it's extra dirty (+$50 Surcharge)", price: 50 },
];

// Services that qualify the customer for "With a Detail" pricing on Interior, Glass, Wheel & Trim
export const QUALIFYING_DETAIL_OR_CERAMIC_IDS = new Set([
  'interior-refresh',
  'medium-package',
  'interior-complete',
  'full-detail',
  'gloss-enhancement',
  '1-step-correction',
  '2-step-correction',
  'nanobrite-rejuvenate',
  'nanobrite-ultra',
  'nanobrite-evo',
  'systemx-crystal',
  'systemx-pro',
  'systemx-maxg',
  'systemx-diamond',
]);

// Dual-price table for Interior, Glass, Wheel & Trim (Page 2 of 2026 Rate Card)
export const INTERIOR_GLASS_PRICES = {
  'systemx-lvp': {
    title: 'System X LVP — Leather, vinyl & plastic',
    withDetail: 229,
    standalone: 389,
    lifespan: 'Good for 3 Years (3-Year Warranty)',
    isCarfax: true,
    carfaxNote: 'Registered & added to your CARFAX Vehicle History Report',
  },
  'systemx-textile': {
    title: 'System X Textile — Fabric & carpet',
    withDetail: 149,
    standalone: 259,
    lifespan: 'Good for 2 Years (2-Year Stain Protection)',
    isCarfax: true,
    carfaxNote: 'Registered & added to your CARFAX Vehicle History Report',
  },
  'systemx-lvp-textile': {
    title: 'System X LVP + Textile — Complete interior',
    withDetail: 325,
    standalone: 499,
    lifespan: 'Full Interior Warranted (3-Yr Leather/Vinyl + 2-Yr Fabric)',
    isCarfax: true,
    carfaxNote: 'Registered & added to your CARFAX Vehicle History Report',
  },
  'nanobrite-leather': {
    title: 'Nano-Brite Leather Guard',
    withDetail: 99,
    standalone: 170,
    lifespan: 'Good for 8–12 Months Protection',
    isCarfax: false,
    carfaxNote: 'No warranty registration',
  },
  'nanobrite-fabric': {
    title: 'Nano-Brite Fabric Guard',
    withDetail: 89,
    standalone: 150,
    lifespan: 'Good for 8–12 Months Protection',
    isCarfax: false,
    carfaxNote: 'No warranty registration',
  },
  'nanobrite-leather-fabric': {
    title: 'Nano-Brite Leather + Fabric — Complete interior',
    withDetail: 175,
    standalone: 279,
    lifespan: 'Good for 8–12 Months Protection (Best-Value Interior)',
    isCarfax: false,
    carfaxNote: 'No warranty registration',
  },
  'systemx-glass': {
    title: 'System X Glass+ — Windshield & windows',
    withDetail: 125,
    standalone: 165,
    lifespan: 'Good for up to 2 Years',
    isCarfax: false,
  },
  'systemx-wheel': {
    title: 'System X Wheel+ — Wheel coating',
    withDetail: 249,
    standalone: 329,
    lifespan: 'Full Coverage (Wheels Removed)',
    isCarfax: false,
  },
  'systemx-revive': {
    title: 'System X Revive — Trim restoration',
    withDetail: 89,
    standalone: 129,
    lifespan: 'Restores Faded Exterior Plastic & Trim',
    isCarfax: false,
  },
};

// Comprehensive Package Inclusion & Overlap Map based on 2026 Official Rate Card
export const SERVICE_INCLUSIONS = {
  'medium-package': {
    title: 'Medium Package',
    includes: ['hand-car-wash', 'interior-refresh', 'interior-complete-wash'],
    reasons: {
      'hand-car-wash': 'Medium Package already includes a full exterior Hand Car Wash.',
      'interior-refresh': 'Medium Package already includes interior vacuum, glass, mats, and door jambs.',
      'interior-complete-wash': 'Medium Package already includes an exterior Hand Car Wash.',
    },
  },
  'interior-complete': {
    title: 'Interior Complete (interior only)',
    includes: ['interior-refresh', 'summer-mats'],
    reasons: {
      'interior-refresh': 'Interior Complete already covers everything inside (305°F steam extraction, shampooing, vacuum, jambs, and mats).',
      'summer-mats': 'Interior Complete already includes 305°F steam extraction and shampooing of all mats and carpets.',
    },
  },
  'full-detail': {
    title: 'Full Detail',
    includes: ['hand-car-wash', 'interior-refresh', 'medium-package', 'interior-complete', 'summer-mats', 'interior-complete-wash'],
    reasons: {
      'hand-car-wash': 'Full Detail includes the Medium Package, which already comes with a full exterior Hand Car Wash.',
      'interior-refresh': 'Full Detail already includes complete interior blow-out, vacuum, panels, jambs, and mats.',
      'medium-package': 'Full Detail already includes everything in the Medium Package plus steamed summer mats and scrubbed carpets & seats.',
      'interior-complete': 'Full Detail already includes full interior carpet & seat scrubbing, steamed mats, and exterior hand wash.',
      'summer-mats': 'Full Detail already includes "summer mats steamed, carpets & seats scrubbed" in the package price.',
      'interior-complete-wash': 'Full Detail already includes an exterior Hand Car Wash.',
    },
  },
  'gloss-enhancement': {
    title: 'Gloss Enhancement',
    includes: ['hand-car-wash', 'clay-bar', 'spray-wax', 'interior-complete-wash'],
    reasons: {
      'hand-car-wash': 'Gloss Enhancement includes an exterior wash before clay bar and polishing.',
      'clay-bar': 'Gloss Enhancement already includes full Clay Bar exterior decontamination ("Clay bar, then a one-step all-in-one polish").',
      'spray-wax': 'Gloss Enhancement is our complete wax package that cleans, polishes, and protects the paint—Spray Wax is already covered.',
      'interior-complete-wash': 'Gloss Enhancement already includes an exterior wash.',
    },
  },
  '1-step-correction': {
    title: '1-Step Paint Correction',
    includes: ['hand-car-wash', 'clay-bar', 'spray-wax', 'gloss-enhancement', 'interior-complete-wash'],
    reasons: {
      'hand-car-wash': '1-Step Paint Correction includes exterior wash and decontamination prep before polishing.',
      'clay-bar': '1-Step Paint Correction includes exterior decontamination (clay bar) before machine polishing.',
      'spray-wax': '1-Step Paint Correction includes a durable machine-applied paint sealant.',
      'gloss-enhancement': '1-Step Paint Correction removes 50–70% of defects and includes sealant, superseding Gloss Enhancement.',
      'interior-complete-wash': '1-Step Paint Correction already includes an exterior wash.',
    },
  },
  '2-step-correction': {
    title: '2-Step Paint Correction',
    includes: ['hand-car-wash', 'clay-bar', 'spray-wax', 'gloss-enhancement', '1-step-correction', 'interior-complete-wash'],
    reasons: {
      'hand-car-wash': '2-Step Paint Correction includes exterior wash and decontamination prep before compounding.',
      'clay-bar': '2-Step Paint Correction includes exterior decontamination (clay bar) before compounding and polishing.',
      'spray-wax': '2-Step Paint Correction includes paint sealant protection.',
      'gloss-enhancement': '2-Step Paint Correction removes 80–90% of defects, superseding Gloss Enhancement.',
      '1-step-correction': '2-Step Paint Correction includes both compound AND polish stages (80–90% defect removal), superseding 1-Step Paint Correction.',
      'interior-complete-wash': '2-Step Paint Correction already includes an exterior wash.',
    },
  },
  'nanobrite-rejuvenate': {
    title: 'Nano-Brite Rejuvenate (1 Year)',
    includes: ['hand-car-wash', 'clay-bar', 'spray-wax', 'gloss-enhancement', '1-step-correction', 'interior-complete-wash'],
    reasons: {
      'hand-car-wash': 'Every Ceramic Coating package includes a full exterior hand wash.',
      'clay-bar': 'Nano-Brite Rejuvenate includes full exterior decontamination (iron decon + clay bar).',
      'spray-wax': 'Nano-Brite Rejuvenate coats your paint with 1-year ceramic protection—Spray Wax is not needed.',
      'gloss-enhancement': 'Nano-Brite Rejuvenate already includes Decon + 1-Step Paint Correction + Ceramic Coating.',
      '1-step-correction': 'Nano-Brite Rejuvenate already includes 1-Step Paint Correction ("Decon + 1-step correction + 1 layer").',
      'interior-complete-wash': 'Nano-Brite Rejuvenate already includes an exterior hand wash.',
    },
  },
  'nanobrite-ultra': {
    title: 'Nano-Brite Ultra (3 Year)',
    includes: ['hand-car-wash', 'clay-bar', 'spray-wax', 'gloss-enhancement', '1-step-correction', 'interior-complete-wash'],
    reasons: {
      'hand-car-wash': 'Every Ceramic Coating package includes a full exterior hand wash.',
      'clay-bar': 'Nano-Brite Ultra includes full exterior decontamination (iron decon + clay bar).',
      'spray-wax': 'Nano-Brite Ultra coats your paint with 3-year ceramic protection—Spray Wax is not needed.',
      'gloss-enhancement': 'Nano-Brite Ultra already includes Decon + 1-Step Paint Correction + Ceramic Coating.',
      '1-step-correction': 'Nano-Brite Ultra already includes 1-Step Paint Correction ("Decon + 1-step correction + 1 layer").',
      'interior-complete-wash': 'Nano-Brite Ultra already includes an exterior hand wash.',
    },
  },
  'nanobrite-evo': {
    title: 'Nano-Brite EVO Graphene (7 Year)',
    includes: ['hand-car-wash', 'clay-bar', 'spray-wax', 'gloss-enhancement', '1-step-correction', '2-step-correction', 'interior-complete-wash'],
    reasons: {
      'hand-car-wash': 'Every Ceramic Coating package includes a full exterior hand wash.',
      'clay-bar': 'Nano-Brite EVO Graphene includes full exterior decontamination (iron decon + clay bar).',
      'spray-wax': 'Nano-Brite EVO Graphene provides 7-year graphene protection—Spray Wax is not needed.',
      'gloss-enhancement': 'Nano-Brite EVO Graphene already includes Decon + 2-Step Correction + Graphene Coating.',
      '1-step-correction': 'Nano-Brite EVO Graphene already includes a full 2-Step Paint Correction.',
      '2-step-correction': 'Nano-Brite EVO Graphene already includes 2-Step Paint Correction ("Decon + 2-step correction + top coat").',
      'interior-complete-wash': 'Nano-Brite EVO Graphene already includes an exterior hand wash.',
    },
  },
  'systemx-crystal': {
    title: 'System X Crystal+ (2 Year CARFAX)',
    includes: ['hand-car-wash', 'clay-bar', 'spray-wax', 'gloss-enhancement', '1-step-correction', 'systemx-glass', 'interior-complete-wash'],
    reasons: {
      'hand-car-wash': 'Every System X Ceramic package includes a full exterior hand wash.',
      'clay-bar': 'System X Crystal+ includes iron decon and clay bar decontamination.',
      'spray-wax': 'System X Crystal+ provides 2-year CARFAX-registered ceramic coating—Spray Wax is not needed.',
      'gloss-enhancement': 'System X Crystal+ already includes 1-Step Paint Correction + Ceramic Coating.',
      '1-step-correction': 'System X Crystal+ already includes 1-Step Paint Correction ("1-step correction + paint and glass coating").',
      'systemx-glass': 'System X Crystal+ already includes Windshield & Glass Coating in the package!',
      'interior-complete-wash': 'System X Crystal+ already includes an exterior hand wash.',
    },
  },
  'systemx-pro': {
    title: 'System X Pro+ (6 Year CARFAX)',
    includes: ['hand-car-wash', 'clay-bar', 'spray-wax', 'gloss-enhancement', '1-step-correction', '2-step-correction', 'systemx-glass', 'systemx-wheel', 'interior-complete-wash'],
    reasons: {
      'hand-car-wash': 'Every System X Ceramic package includes a full exterior hand wash.',
      'clay-bar': 'System X Pro+ includes iron decon and clay bar decontamination.',
      'spray-wax': 'System X Pro+ provides 6-year CARFAX-registered ceramic coating—Spray Wax is not needed.',
      'gloss-enhancement': 'System X Pro+ already includes 2-Step Paint Correction + Ceramic Coating.',
      '1-step-correction': 'System X Pro+ already includes full 2-Step Paint Correction.',
      '2-step-correction': 'System X Pro+ already includes 2-Step Paint Correction ("2-step correction + paint, glass and wheel coatings").',
      'systemx-glass': 'System X Pro+ already includes Windshield & Glass Coating in the package!',
      'systemx-wheel': 'System X Pro+ already includes Wheel Coating in the package!',
      'interior-complete-wash': 'System X Pro+ already includes an exterior hand wash.',
    },
  },
  'systemx-maxg': {
    title: 'System X Max G+ (10 Year CARFAX)',
    includes: ['hand-car-wash', 'clay-bar', 'spray-wax', 'gloss-enhancement', '1-step-correction', '2-step-correction', 'systemx-glass', 'systemx-wheel', 'interior-complete-wash'],
    reasons: {
      'hand-car-wash': 'Every System X Ceramic package includes a full exterior hand wash.',
      'clay-bar': 'System X Max G+ includes iron decon and clay bar decontamination.',
      'spray-wax': 'System X Max G+ provides 10-year CARFAX-registered graphene protection—Spray Wax is not needed.',
      'gloss-enhancement': 'System X Max G+ already includes 2-Step Paint Correction + Graphene Coating.',
      '1-step-correction': 'System X Max G+ already includes full 2-Step Paint Correction.',
      '2-step-correction': 'System X Max G+ already includes 2-Step Paint Correction ("Graphene. 2-step correction + paint, glass and wheel coatings").',
      'systemx-glass': 'System X Max G+ already includes Windshield & Glass Coating in the package!',
      'systemx-wheel': 'System X Max G+ already includes Wheel Coating in the package!',
      'interior-complete-wash': 'System X Max G+ already includes an exterior hand wash.',
    },
  },
  'systemx-diamond': {
    title: 'System X Diamond SS (Lifetime CARFAX)',
    includes: ['hand-car-wash', 'clay-bar', 'spray-wax', 'gloss-enhancement', '1-step-correction', '2-step-correction', 'systemx-glass', 'systemx-wheel', 'interior-complete-wash'],
    reasons: {
      'hand-car-wash': 'Every System X Ceramic package includes a full exterior hand wash.',
      'clay-bar': 'System X Diamond SS includes iron decon and clay bar decontamination.',
      'spray-wax': 'System X Diamond SS provides Lifetime CARFAX-registered ceramic protection—Spray Wax is not needed.',
      'gloss-enhancement': 'System X Diamond SS already includes 2-Step Paint Correction + Lifetime Coating.',
      '1-step-correction': 'System X Diamond SS already includes full 2-Step Paint Correction.',
      '2-step-correction': 'System X Diamond SS already includes 2-Step Paint Correction ("2-step correction + paint, glass and wheel coatings").',
      'systemx-glass': 'System X Diamond SS already includes Windshield & Glass Coating in the package!',
      'systemx-wheel': 'System X Diamond SS already includes Wheel Coating in the package!',
      'interior-complete-wash': 'System X Diamond SS already includes an exterior hand wash.',
    },
  },
  'systemx-lvp-textile': {
    title: 'System X LVP + Textile — Complete interior',
    includes: ['systemx-lvp', 'systemx-textile', 'nanobrite-leather', 'nanobrite-fabric', 'nanobrite-leather-fabric'],
    reasons: {
      'systemx-lvp': 'System X LVP + Textile Complete Interior already coats all leather, vinyl & plastic surfaces.',
      'systemx-textile': 'System X LVP + Textile Complete Interior already coats all fabric & carpet surfaces.',
      'nanobrite-leather': 'System X Complete Interior already protects all leather surfaces with a 3-year CARFAX warranty.',
      'nanobrite-fabric': 'System X Complete Interior already protects all fabric and carpet surfaces.',
      'nanobrite-leather-fabric': 'System X Complete Interior already covers the entire cabin.',
    },
  },
  'nanobrite-leather-fabric': {
    title: 'Nano-Brite Leather + Fabric — Complete interior',
    includes: ['nanobrite-leather', 'nanobrite-fabric'],
    reasons: {
      'nanobrite-leather': 'Nano-Brite Complete Interior already includes Leather Guard protection.',
      'nanobrite-fabric': 'Nano-Brite Complete Interior already includes Fabric Guard protection.',
    },
  },
};

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('ktown_cart_v1');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [appliedCoupon, setAppliedCoupon] = useState(() => {
    try {
      const saved = localStorage.getItem('ktown_coupon_v1');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [overlapAlert, setOverlapAlert] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('ktown_cart_v1', JSON.stringify(cart));
    } catch (err) {
      console.error('Failed to persist cart:', err);
    }
  }, [cart]);

  useEffect(() => {
    try {
      if (appliedCoupon) {
        localStorage.setItem('ktown_coupon_v1', JSON.stringify(appliedCoupon));
      } else {
        localStorage.removeItem('ktown_coupon_v1');
      }
    } catch (err) {
      console.error('Failed to persist coupon:', err);
    }
  }, [appliedCoupon]);

  // Does the current cart contain any Detail or Ceramic package that unlocks "With a Detail" pricing?
  const hasQualifyingDetail = useMemo(() => {
    return cart.some((item) => QUALIFYING_DETAIL_OR_CERAMIC_IDS.has(item.serviceId));
  }, [cart]);

  // Automatically synchronize Interior, Glass, Wheel & Trim prices when detail/ceramic packages are added or removed
  useEffect(() => {
    setCart((prevCart) => {
      const qualifies = prevCart.some((item) => QUALIFYING_DETAIL_OR_CERAMIC_IDS.has(item.serviceId));
      let changed = false;

      const updated = prevCart.map((item) => {
        const dualDef = INTERIOR_GLASS_PRICES[item.serviceId];
        if (!dualDef) return item;

        const targetPrice = qualifies ? dualDef.withDetail : dualDef.standalone;
        const targetSubtitle = qualifies
          ? 'Booked with Detail / Ceramic ("With a Detail" Rate)'
          : 'Standalone Visit (Includes Prep)';

        if (item.basePrice !== targetPrice || item.isStandalone !== !qualifies) {
          changed = true;
          return {
            ...item,
            title: dualDef.title,
            basePrice: targetPrice,
            isStandalone: !qualifies,
            subtitle: targetSubtitle,
          };
        }
        return item;
      });

      return changed ? updated : prevCart;
    });
  }, [hasQualifyingDetail]);

  // Recalculate financial breakdown
  const {
    subtotal,
    bundleSavings,
    discountAmount,
    netSubtotal,
    hstTax,
    cardFee,
    grandTotalStandard,
    grandTotalCard,
    grandTotal,
    cartCount,
  } = useMemo(() => {
    let sub = 0;
    let count = 0;
    let savingsFromWithDetail = 0;

    for (const item of cart) {
      const addonsSum = (item.addons || []).reduce((acc, a) => acc + (a.price || 0), 0);
      const itemSingleTotal = (item.basePrice || 0) + addonsSum;
      const quantity = item.quantity || 1;
      sub += itemSingleTotal * quantity;
      count += quantity;

      const dualDef = INTERIOR_GLASS_PRICES[item.serviceId];
      if (dualDef && hasQualifyingDetail) {
        savingsFromWithDetail += (dualDef.standalone - dualDef.withDetail) * quantity;
      }
    }

    let discount = 0;
    if (appliedCoupon && sub > 0) {
      if (appliedCoupon.type === 'percent') {
        discount = (sub * appliedCoupon.value) / 100;
      } else {
        discount = appliedCoupon.value;
      }
      if (appliedCoupon.maxDiscountCap && appliedCoupon.maxDiscountCap > 0) {
        discount = Math.min(discount, appliedCoupon.maxDiscountCap);
      }
      discount = Math.min(sub, Math.round(discount * 100) / 100);
    }

    const net = Math.max(0, sub - discount);
    const tax = Math.round(net * 0.13 * 100) / 100;
    const fee = Math.round(net * 0.03 * 100) / 100;
    const totalStd = Math.round((net + tax) * 100) / 100;
    const totalCard = Math.round((net + tax + fee) * 100) / 100;

    return {
      subtotal: sub,
      bundleSavings: savingsFromWithDetail,
      discountAmount: discount,
      netSubtotal: net,
      hstTax: tax,
      cardFee: fee,
      grandTotalStandard: totalStd,
      grandTotalCard: totalCard,
      grandTotal: totalStd,
      cartCount: count,
    };
  }, [cart, appliedCoupon, hasQualifyingDetail]);

  // Check if a serviceId is already included by any item currently in the cart
  const getInclusionStatus = (serviceId) => {
    for (const item of cart) {
      const inc = SERVICE_INCLUSIONS[item.serviceId];
      if (inc && inc.includes.includes(serviceId)) {
        return {
          isIncluded: true,
          parentItem: item,
          reason: inc.reasons[serviceId] || `Already included in ${item.title}.`,
        };
      }
    }
    return { isIncluded: false, parentItem: null, reason: null };
  };

  // Check if adding `serviceId` would make existing items in the cart redundant
  const getSupersededCartItems = (serviceId) => {
    const inc = SERVICE_INCLUSIONS[serviceId];
    if (!inc) return [];
    return cart.filter((item) => inc.includes.includes(item.serviceId));
  };

  const applyCoupon = async (code) => {
    if (!code || !code.trim()) {
      throw new Error('Please enter a coupon code.');
    }
    const res = await fetch(`/api/coupons/validate?code=${encodeURIComponent(code.trim())}&subtotal=${subtotal}`);
    const data = await res.json();
    if (!res.ok || !data.valid) {
      throw new Error(data.error || 'Invalid or expired coupon code.');
    }
    setAppliedCoupon(data.coupon);
    return data;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  // Raw add without overlap check (used when user confirms or when no overlap exists)
  const commitAddToCart = (newItem, openDrawer = true, removeIds = []) => {
    setCart((prevCart) => {
      const filtered = removeIds.length > 0
        ? prevCart.filter((i) => !removeIds.includes(i.id))
        : prevCart;

      const vehicleType = newItem.vehicleType || 'c-sedan';
      const vehicleOption = VEHICLE_OPTIONS.find((v) => v.id === vehicleType) || VEHICLE_OPTIONS[0];
      const qualifies =
        filtered.some((item) => QUALIFYING_DETAIL_OR_CERAMIC_IDS.has(item.serviceId)) ||
        QUALIFYING_DETAIL_OR_CERAMIC_IDS.has(newItem.serviceId);

      const dualDef = INTERIOR_GLASS_PRICES[newItem.serviceId];
      let finalPrice = Number(newItem.basePrice || newItem.total || 0);
      let finalSubtitle = newItem.subtitle || newItem.duration || '';
      let isStandalone = newItem.isStandalone;

      if (dualDef) {
        finalPrice = qualifies ? dualDef.withDetail : dualDef.standalone;
        isStandalone = !qualifies;
        finalSubtitle = qualifies
          ? 'Booked with Detail / Ceramic ("With a Detail" Rate)'
          : 'Standalone Visit (Includes Prep)';
      }

      const cartItem = {
        id: 'item_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
        serviceId: newItem.serviceId || 'custom',
        title: dualDef ? dualDef.title : (newItem.title || newItem.pkgName || 'Detailing Service'),
        subtitle: finalSubtitle,
        lifespan: dualDef ? dualDef.lifespan : (newItem.lifespan || ''),
        isCarfax: dualDef ? dualDef.isCarfax : Boolean(newItem.isCarfax),
        carfaxNote: dualDef ? dualDef.carfaxNote : (newItem.carfaxNote || ''),
        category: newItem.category || 'detail',
        vehicleType,
        vehicleLabel: vehicleOption.label,
        basePrice: finalPrice,
        isStandalone,
        addons: Array.isArray(newItem.addons) ? newItem.addons : [],
        quantity: 1,
      };

      return [...filtered, cartItem];
    });

    if (openDrawer) {
      setIsCartOpen(true);
    }
  };

  // Smart addToCart that checks for overlaps so customers never accidentally pay twice
  const addToCart = (newItem, openDrawer = true, bypassOverlapCheck = false) => {
    const sid = newItem.serviceId || 'custom';

    if (!bypassOverlapCheck && sid !== 'custom') {
      // Case 1: Exact same service is already in the cart for the same vehicle
      const exactDuplicate = cart.find(
        (c) => c.serviceId === sid && c.vehicleType === (newItem.vehicleType || 'c-sedan')
      );
      if (exactDuplicate) {
        setOverlapAlert({
          type: 'exact_duplicate',
          newItem,
          openDrawer,
          existingItem: exactDuplicate,
          title: 'Already in Your Cart',
          message: `${newItem.title} is already in your cart for your ${exactDuplicate.vehicleLabel}. Would you like to view your cart, or add another one for a second vehicle?`,
        });
        return false;
      }

      // Case 2: The item the user is trying to add is ALREADY INCLUDED in a package in their cart!
      const inclusion = getInclusionStatus(sid);
      if (inclusion.isIncluded) {
        setOverlapAlert({
          type: 'already_included',
          newItem,
          openDrawer,
          parentItem: inclusion.parentItem,
          reason: inclusion.reason,
          title: 'Already Included in Your Package!',
          message: inclusion.reason,
        });
        return false;
      }

      // Case 3: The user is adding a larger package that ALREADY INCLUDES smaller item(s) currently in their cart!
      const superseded = getSupersededCartItems(sid);
      if (superseded.length > 0) {
        const savedAmount = superseded.reduce((sum, item) => sum + (item.basePrice || 0), 0);
        const names = superseded.map((i) => i.title).join(', ');
        const reasonsList = superseded.map(
          (i) => SERVICE_INCLUSIONS[sid]?.reasons?.[i.serviceId] || `${newItem.title} already includes ${i.title}.`
        );
        setOverlapAlert({
          type: 'supersedes_existing',
          newItem,
          openDrawer,
          supersededItems: superseded,
          savedAmount,
          reasonsList,
          title: `Overlap Detected — Save $${savedAmount} CAD!`,
          message: `The ${newItem.title} you selected already includes ${names}. Would you like us to automatically remove ${names} from your cart so you don't pay for overlapping services?`,
        });
        return false;
      }
    }

    commitAddToCart(newItem, openDrawer);
    return true;
  };

  const removeFromCart = (itemId) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
  };

  const updateCartItemVehicle = (itemId, newVehicleType, newBasePrice) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id !== itemId) return item;
        const opt = VEHICLE_OPTIONS.find((v) => v.id === newVehicleType) || VEHICLE_OPTIONS[0];
        return {
          ...item,
          vehicleType: newVehicleType,
          vehicleLabel: opt.label,
          basePrice: newBasePrice !== undefined ? newBasePrice : item.basePrice,
        };
      })
    );
  };

  const toggleCartItemAddon = (itemId, addon) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id !== itemId) return item;
        const exists = (item.addons || []).some((a) => a.id === addon.id);
        const nextAddons = exists
          ? item.addons.filter((a) => a.id !== addon.id)
          : [...(item.addons || []), addon];
        return { ...item, addons: nextAddons };
      })
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const proceedToCheckout = (directItem = null) => {
    if (directItem) {
      addToCart(directItem, false);
    }
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        subtotal,
        bundleSavings,
        hasQualifyingDetail,
        discountAmount,
        netSubtotal,
        hstTax,
        cardFee,
        grandTotalStandard,
        grandTotalCard,
        grandTotal,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        overlapAlert,
        setOverlapAlert,
        getInclusionStatus,
        getSupersededCartItems,
        addToCart,
        commitAddToCart,
        removeFromCart,
        updateCartItemVehicle,
        toggleCartItemAddon,
        clearCart,
        proceedToCheckout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
