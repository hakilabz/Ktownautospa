import React, { useState, useEffect } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import QuoteBuilder from './components/QuoteBuilder';
import WhyShop from './components/WhyShop';
import Credentials from './components/Credentials';
import Gallery from './components/Gallery';
import CoatingSection from './components/CoatingSection';
import ProcessFlow from './components/ProcessFlow';
import CarfaxRecord from './components/CarfaxRecord';
import FleetsSection from './components/FleetsSection';
import BoatsSection from './components/BoatsSection';
import HowItWorks from './components/HowItWorks';
import ReviewsSection from './components/ReviewsSection';
import LocationHours from './components/LocationHours';
import Footer from './components/Footer';
import WhatsAppChat from './components/WhatsAppChat';
import FloatingMobileCart from './components/FloatingMobileCart';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import AdminPortalModal from './components/AdminPortalModal';

function MainApp() {
  const { cart, addToCart, proceedToCheckout, setIsCartOpen } = useCart();
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('ktown_theme') || 'dark';
  });

  // Listen for #admin in URL to open Owner Portal
  useEffect(() => {
    const checkAdminHash = () => {
      if (window.location.hash === '#admin' || window.location.search.includes('admin=true')) {
        setIsAdminOpen(true);
      }
    };
    checkAdminHash();
    window.addEventListener('hashchange', checkAdminHash);
    return () => window.removeEventListener('hashchange', checkAdminHash);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('ktown_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleOpenBooking = (customQuote = null) => {
    if (customQuote) {
      // Came from custom price estimator
      const vType = customQuote.vehicle === 'crossover' ? 'c-cross' : 
                    customQuote.vehicle === 'suv' ? 'c-suv' : 
                    customQuote.vehicle === 'van' ? 'c-van' : 'c-sedan';
      addToCart({
        title: customQuote.pkgName || 'Detailing Package',
        vehicleType: vType,
        basePrice: customQuote.base,
        subtitle: customQuote.duration,
        addons: (customQuote.itemizedAddons || []).map(a => ({
          id: a.name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
          title: a.name,
          price: a.price,
        })),
      }, false);
      proceedToCheckout();
    } else if (cart.length > 0) {
      proceedToCheckout();
    } else {
      setIsCartOpen(true);
    }
  };

  const handleSelectPackage = (pkgName, vehicleType = 'c-sedan', price = null) => {
    let basePrice = price;
    if (!basePrice) {
      if (pkgName === 'Full Detail') basePrice = 200;
      else if (pkgName === 'Hand Car Wash') basePrice = 30;
      else if (pkgName === 'Interior Refresh') basePrice = 70;
      else if (pkgName === 'Interior Complete') basePrice = 175;
      else basePrice = 100;
    }
    addToCart({
      title: pkgName,
      vehicleType,
      basePrice,
    }, true);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-page)', color: 'var(--text-main)', transition: 'background-color 0.3s ease, color 0.3s ease' }}>
      
      {/* Header & Sticky Navigation */}
      <Navbar 
        onOpenBooking={() => handleOpenBooking()} 
        theme={theme} 
        onToggleTheme={toggleTheme} 
      />
      
      <main id="main" className="site-main-content">
        {/* Hero with CARFAX Canada Callout & Booking CTAs */}
        <Hero onOpenBooking={() => handleOpenBooking()} />

        {/* 2026 Unified Interactive Quote Builder & Complete Service Catalog */}
        <QuoteBuilder onProceedToBooking={() => handleOpenBooking()} />

        {/* Why a Shop, Not a Driveway */}
        <WhyShop />

        {/* Credentials & Authorized Brand Partner Tiles */}
        <Credentials />

        {/* Paint Protection, Ceramic Coating & Straight Answers */}
        <CoatingSection onOpenBooking={() => handleOpenBooking()} />

        {/* The 5-Step System X Process */}
        <ProcessFlow />

        {/* Why CARFAX Matters & Verified Report Mockup */}
        <CarfaxRecord />

        {/* Fleet & Commercial Programs */}
        <FleetsSection onOpenBooking={() => handleOpenBooking()} />

        {/* Our Work - Real Agency Vehicles Detailed in Our Bays */}
        <Gallery />

        {/* Boats & Marine Slip-Side Detailing */}
        <BoatsSection />

        {/* How It Works - 3-Step Walkthrough */}
        <HowItWorks />

        {/* Real Customer Reviews - The Handwritten Clipboard */}
        <ReviewsSection />

        {/* Shop Hours, Building Location & Reservation Portal */}
        <LocationHours onOpenBooking={() => handleOpenBooking()} />
      </main>

      {/* Footer with Contact Links & Copyright */}
      <Footer onOpenBooking={() => handleOpenBooking()} />

      {/* Floating Interactive WhatsApp Chat Widget */}
      <WhatsAppChat />

      {/* Mobile Floating Cart Button */}
      <FloatingMobileCart />

      {/* Slide-over Shopping Cart Drawer */}
      <CartDrawer />

      {/* Complete Reservation & Payment Modal (Stripe + Pay at Drop-off) */}
      <CheckoutModal />

      {/* Owner Admin Portal (PIN-protected for viewing revenue & failed leads) */}
      <AdminPortalModal
        isOpen={isAdminOpen}
        onClose={() => {
          setIsAdminOpen(false);
          if (window.location.hash === '#admin') {
            window.history.replaceState(null, '', window.location.pathname);
          }
        }}
      />

    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <MainApp />
    </CartProvider>
  );
}
