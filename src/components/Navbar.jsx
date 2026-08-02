import React, { useState, useEffect } from 'react';
import { Phone, Calendar, Menu, X, Mail, Sun, Moon } from 'lucide-react';

export default function Navbar({ onOpenBooking, theme, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isLight = theme === 'light';

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      transition: 'all 0.3s ease',
      background: scrolled ? 'var(--header-bg-scrolled)' : 'var(--header-bg)',
      backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
      borderBottom: scrolled ? '1px solid rgba(212,175,55,0.4)' : '1px solid var(--card-border)',
      padding: scrolled ? '0.75rem 0' : '1rem 0',
      boxShadow: scrolled ? '0 10px 40px rgba(0,0,0,0.15)' : 'none',
    }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem' }}>
          
          {/* Left Group: Logo + Desktop Navigation Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
            <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', color: 'inherit', flexShrink: 0 }}>
              <img src="/logo.png" alt="Ktown Auto Spa" style={{ height: '3.25rem', width: 'auto', objectFit: 'contain', filter: isLight ? 'none' : 'drop-shadow(0 2px 8px rgba(0,0,0,0.6))' }} />
            </a>

            {/* Desktop Navigation Links */}
            <nav style={{ display: 'none', alignItems: 'center', gap: '2rem' }} className="desktop-nav">
              <a href="#packages" style={{ color: 'var(--text-main)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.05em', textDecoration: 'none', whiteSpace: 'nowrap' }}>Packages</a>
              <a href="#calculator" style={{ color: 'var(--text-main)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.05em', textDecoration: 'none', whiteSpace: 'nowrap' }}>Quote Builder &amp; Pricing</a>
              <a href="#contact" style={{ color: 'var(--text-main)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.05em', textDecoration: 'none', whiteSpace: 'nowrap' }}>Contact</a>
            </nav>
          </div>

          {/* Desktop Phone, Theme Toggle & CTA */}
          <div style={{ display: 'none', alignItems: 'center', gap: '0.875rem', flexShrink: 0, marginLeft: 'auto' }} className="desktop-cta">
            
            {/* Theme Switcher Button */}
            <button
              onClick={onToggleTheme}
              title={`Switch to ${isLight ? 'Dark' : 'Light'} Mode`}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: '2.5rem', height: '2.5rem', borderRadius: '50%',
                background: isLight ? '#e2e8f0' : 'rgba(15,23,42,0.9)',
                border: '1px solid rgba(212,175,55,0.4)',
                color: isLight ? '#d4af37' : '#facc15',
                cursor: 'pointer', transition: 'all 0.2s ease',
              }}
            >
              {isLight ? <Moon style={{ width: '1.125rem', height: '1.125rem' }} /> : <Sun style={{ width: '1.125rem', height: '1.125rem' }} />}
            </button>

            <a 
              href="tel:6479153530" 
              style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-main)',
                background: 'var(--card-bg)', border: '1px solid var(--card-border)',
                padding: '0.625rem 1rem', borderRadius: '9999px', textDecoration: 'none',
              }}
            >
              <Phone style={{ width: '0.875rem', height: '0.875rem', color: '#facc15' }} />
              <span>647-915-3530</span>
            </a>

            <button onClick={onOpenBooking} className="gold-button" style={{ height: '2.5rem', padding: '0 1.25rem', fontSize: '0.75rem' }}>
              <Calendar style={{ width: '1rem', height: '1rem', color: '#080a0f' }} />
              <span>Book Spa Session</span>
            </button>
          </div>

          {/* Mobile Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} className="mobile-controls">
            
            {/* Mobile Theme Switcher */}
            <button
              onClick={onToggleTheme}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: '2.25rem', height: '2.25rem', borderRadius: '50%',
                background: isLight ? '#e2e8f0' : 'rgba(15,23,42,0.9)',
                border: '1px solid rgba(212,175,55,0.4)',
                color: isLight ? '#d4af37' : '#facc15',
                cursor: 'pointer',
              }}
            >
              {isLight ? <Moon style={{ width: '1rem', height: '1rem' }} /> : <Sun style={{ width: '1rem', height: '1rem' }} />}
            </button>

            <button onClick={onOpenBooking} className="gold-button" style={{ height: '2.25rem', padding: '0 0.875rem', fontSize: '0.6875rem' }}>
              Book
            </button>

            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{ color: 'var(--text-main)', padding: '0.375rem', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              {mobileMenuOpen ? <X style={{ width: '1.5rem', height: '1.5rem' }} /> : <Menu style={{ width: '1.5rem', height: '1.5rem' }} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div style={{ background: 'var(--header-bg-scrolled)', borderBottom: '1px solid rgba(234,179,8,0.3)', padding: '1rem 1.5rem 1.5rem' }} className="mobile-drawer">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <a href="#packages" onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--text-main)', fontSize: '0.875rem', fontWeight: 600, textDecoration: 'none', padding: '0.25rem 0' }}>
              Packages &amp; Features
            </a>
            <a href="#calculator" onClick={() => setMobileMenuOpen(false)} style={{ color: '#facc15', fontSize: '0.875rem', fontWeight: 700, textDecoration: 'none', padding: '0.25rem 0' }}>
              Quote Builder &amp; Pricing
            </a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--text-main)', fontSize: '0.875rem', fontWeight: 600, textDecoration: 'none', padding: '0.25rem 0' }}>
              Contact &amp; Location
            </a>
          </div>
          
          <div style={{ paddingTop: '0.75rem', marginTop: '0.75rem', borderTop: '1px solid var(--card-border)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <a 
              href="tel:6479153530" 
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                width: '100%', fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-main)',
                background: 'var(--card-bg)', border: '1px solid var(--card-border)',
                padding: '0.75rem', borderRadius: '0.75rem', textDecoration: 'none',
              }}
            >
              <Phone style={{ width: '1rem', height: '1rem', color: '#facc15' }} />
              <span>Call 647-915-3530</span>
            </a>
            <a 
              href="mailto:ktownautomobilespa@gmail.com" 
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                width: '100%', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)',
                padding: '0.5rem', textDecoration: 'none',
              }}
            >
              <Mail style={{ width: '0.875rem', height: '0.875rem', color: 'var(--cyan-glow)' }} />
              <span>ktownautomobilespa@gmail.com</span>
            </a>
          </div>
        </div>
      )}

      {/* CSS for responsive show/hide */}
      <style>{`
        .desktop-nav { display: none !important; }
        .desktop-cta { display: none !important; }
        .mobile-controls { display: flex !important; }
        @media (min-width: 1024px) {
          .desktop-nav { display: flex !important; }
          .desktop-cta { display: flex !important; }
          .mobile-controls { display: none !important; }
          .mobile-drawer { display: none !important; }
        }
      `}</style>
    </header>
  );
}
