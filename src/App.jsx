import React, { useState } from 'react';
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
    <div style={{ minHeight: '100vh', background: '#080a0f', color: '#f1f5f9' }}>
      
      <Navbar onOpenBooking={() => handleOpenBooking()} />
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
