import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import PriceCalculator from './components/PriceCalculator';
import Gallery from './components/Gallery';
import Footer from './components/Footer';
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

  const handleSelectPackageFromServices = (pkgName) => {
    setQuoteData({
      pkgName,
      vehicleLabel: 'Sedan',
      total: pkgName === 'Full Detail' ? 200 : 100,
    });
    setIsBookingOpen(true);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-page)', color: 'var(--text-main)', transition: 'background-color 0.3s ease, color 0.3s ease' }}>
      
      <Navbar 
        onOpenBooking={() => handleOpenBooking()} 
        theme={theme} 
        onToggleTheme={toggleTheme} 
      />
      
      <Hero onOpenBooking={() => handleOpenBooking()} />
      <Services onSelectPackage={handleSelectPackageFromServices} />
      <PriceCalculator onProceedToBooking={handleOpenBooking} />
      <Gallery />
      <Footer onOpenBooking={() => handleOpenBooking()} />

      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
        quoteData={quoteData}
      />

    </div>
  );
}
