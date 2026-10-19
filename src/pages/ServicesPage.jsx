import React, { useEffect } from 'react';
import QuoteBuilder from '../components/QuoteBuilder';

export default function ServicesPage({ onOpenBooking }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="services-page" style={{ paddingTop: '5rem', minHeight: '100vh', paddingBottom: '3rem' }}>
      <QuoteBuilder onProceedToBooking={onOpenBooking} />
    </div>
  );
}
