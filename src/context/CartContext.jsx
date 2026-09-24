import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

const CartContext = createContext(null);

export const VEHICLE_OPTIONS = [
  { id: 'c-sedan', label: 'Sedan' },
  { id: 'c-cross', label: 'Crossover (5 seat)' },
  { id: 'c-suv', label: 'SUV (3rd row)' },
  { id: 'c-van', label: 'Van' },
];

export const ADDON_CATALOG = [
  { id: 'tire-shine', title: 'Tire Shine', price: 10 },
  { id: 'summer-mats', title: 'Summer Mats Shampoo Wash', price: 20 },
  { id: 'engine-bay', title: 'Engine Bay Cleaning', price: 40 },
  { id: 'odour', title: 'Odour Treatment', price: 50 },
  { id: 'headlights', title: 'Headlight Restoration (pair)', price: 60 },
  { id: 'clay-bar', title: 'Clay Bar Decontamination', price: 60 },
  { id: 'pet-hair', title: 'If it\'s extra dirty (Kids/Pets/Work)', price: 50 },
];

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

  // Recalculate financial breakdown
  const {
    subtotal,
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

    for (const item of cart) {
      const addonsSum = (item.addons || []).reduce((acc, a) => acc + (a.price || 0), 0);
      const itemSingleTotal = (item.basePrice || 0) + addonsSum;
      const quantity = item.quantity || 1;
      sub += itemSingleTotal * quantity;
      count += quantity;
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
      discountAmount: discount,
      netSubtotal: net,
      hstTax: tax,
      cardFee: fee,
      grandTotalStandard: totalStd,
      grandTotalCard: totalCard,
      grandTotal: totalStd, // standard display (HST only)
      cartCount: count,
    };
  }, [cart, appliedCoupon]);

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

  const addToCart = (newItem, openDrawer = true) => {
    setCart((prevCart) => {
      const vehicleType = newItem.vehicleType || 'c-sedan';
      const vehicleOption = VEHICLE_OPTIONS.find(v => v.id === vehicleType) || VEHICLE_OPTIONS[0];

      const cartItem = {
        id: 'item_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
        serviceId: newItem.serviceId || 'custom',
        title: newItem.title || newItem.pkgName || 'Detailing Service',
        subtitle: newItem.subtitle || newItem.duration || '',
        category: newItem.category || 'detail',
        vehicleType,
        vehicleLabel: vehicleOption.label,
        basePrice: Number(newItem.basePrice || newItem.total || 0),
        addons: Array.isArray(newItem.addons) ? newItem.addons : [],
        quantity: 1,
      };

      return [...prevCart, cartItem];
    });

    if (openDrawer) {
      setIsCartOpen(true);
    }
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
        addToCart,
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
