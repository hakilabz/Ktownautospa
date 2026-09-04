import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import RateCard from './components/RateCard';
import PriceCalculator from './components/PriceCalculator';
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
import BookingModal from './components/BookingModal';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [quoteData, setQuoteData] = useState(null);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('ktown_theme') || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('ktown_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleOpenBooking = (customQuote = null) => {
    if (customQuote) setQuoteData(customQuote);
    setIsBookingOpen(true);
  };

  const handleSelectPackage = (pkgName) => {
    let total = 100;
    if (pkgName === 'Full Detail') total = 200;
    else if (pkgName === 'Hand Car Wash') total = 30;
    else if (pkgName === 'Interior Complete') total = 175;

    setQuoteData({
      pkgName,
      vehicleLabel: 'Sedan',
      total,
    });
    setIsBookingOpen(true);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-page)', color: 'var(--text-main)', transition: 'background-color 0.3s ease, color 0.3s ease' }}>
      
      {/* Header & Sticky Navigation */}
      <Navbar 
        onOpenBooking={() => handleOpenBooking()} 
        theme={theme} 
        onToggleTheme={toggleTheme} 
      />
      
      <main id="main">
        {/* Hero with CARFAX Canada Callout & WhatsApp quick photo note */}
        <Hero onOpenBooking={() => handleOpenBooking()} />

        {/* 2026 Complete Rate Card with Tabs & Vehicle Picker */}
        <RateCard 
          onOpenBooking={() => handleOpenBooking()} 
          onSelectPackage={handleSelectPackage} 
        />

        {/* Custom Quote Builder & Interactive Price Estimator */}
        <PriceCalculator onProceedToBooking={handleOpenBooking} />

        {/* Why a Shop, Not a Driveway */}
        <WhyShop />

        {/* Credentials & Authorized Brand Partner Tiles */}
        <Credentials />

        {/* Our Work - Before & After Interactive Slider */}
        <Gallery />

        {/* Paint Protection, Ceramic Coating & Straight Answers */}
        <CoatingSection onOpenBooking={() => handleOpenBooking()} />

        {/* The 5-Step System X Process */}
        <ProcessFlow />

        {/* Why CARFAX Matters & Verified Report Mockup */}
        <CarfaxRecord />

        {/* Fleet & Commercial Programs */}
        <FleetsSection onOpenBooking={() => handleOpenBooking()} />

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

      {/* Interactive Booking Modal with Google Calendar Sync & Email Dispatch */}
      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
        quoteData={quoteData}
      />

    </div>
  );
}
