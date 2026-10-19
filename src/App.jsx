import React, { useState, useEffect, Suspense, lazy } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { RouterProvider, useRouter } from './context/RouterContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppChat from './components/WhatsAppChat';
import FloatingMobileCart from './components/FloatingMobileCart';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import AdminPortalModal from './components/AdminPortalModal';

// Code-split Lazy-loaded Multi-Page Views
const HomePage = lazy(() => import('./pages/HomePage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const CeramicCoatingPage = lazy(() => import('./pages/CeramicCoatingPage'));
const FleetMarinePage = lazy(() => import('./pages/FleetMarinePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ReviewsPage = lazy(() => import('./pages/ReviewsPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

function PageLoadingSpinner() {
  return (
    <div style={{ minHeight: '65vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem', color: 'var(--gold-primary)' }}>
      <div 
        style={{ 
          width: '40px', 
          height: '40px', 
          border: '3px solid rgba(201, 160, 60, 0.2)', 
          borderTopColor: 'var(--gold)', 
          borderRadius: '50%', 
          animation: 'spin 0.8s linear infinite' 
        }} 
      />
      <span style={{ fontFamily: 'var(--mono)', fontSize: '0.85rem', color: 'var(--muted-color)', letterSpacing: '0.05em' }}>
        Loading K-Town Auto Spa...
      </span>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

function MainApp() {
  const { cart, addToCart, proceedToCheckout, setIsCartOpen } = useCart();
  const { currentRoute, navigate } = useRouter();
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

  // Render the active page component
  const renderCurrentPage = () => {
    switch (currentRoute) {
      case 'services':
        return <ServicesPage onOpenBooking={() => handleOpenBooking()} />;
      case 'ceramic-coating':
        return <CeramicCoatingPage onOpenBooking={() => handleOpenBooking()} />;
      case 'fleets-marine':
        return <FleetMarinePage onOpenBooking={() => handleOpenBooking()} />;
      case 'about':
        return <AboutPage onOpenBooking={() => handleOpenBooking()} />;
      case 'reviews':
        return <ReviewsPage onOpenBooking={() => handleOpenBooking()} />;
      case 'contact':
        return <ContactPage onOpenBooking={() => handleOpenBooking()} />;
      case 'home':
      default:
        return <HomePage onOpenBooking={() => handleOpenBooking()} />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-page)', color: 'var(--text-main)', transition: 'background-color 0.3s ease, color 0.3s ease' }}>
      
      {/* Header & Sticky Navigation */}
      <Navbar 
        onOpenBooking={() => handleOpenBooking()} 
        theme={theme} 
        onToggleTheme={toggleTheme} 
      />
      
      {/* Dynamic Multi-Page Router Outlet with Suspense */}
      <main id="main" className="site-main-content">
        <Suspense fallback={<PageLoadingSpinner />}>
          {renderCurrentPage()}
        </Suspense>
      </main>

      {/* Global Footer */}
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
    <RouterProvider>
      <CartProvider>
        <MainApp />
      </CartProvider>
    </RouterProvider>
  );
}
