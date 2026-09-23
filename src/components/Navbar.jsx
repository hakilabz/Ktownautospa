import React, { useState, useEffect } from 'react';
import { Phone, Calendar, Moon, Sun, ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Navbar({ onOpenBooking, theme, onToggleTheme }) {
  const { cartCount, subtotal, setIsCartOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isLight = theme !== 'dark';

  const primaryLinks = [
    { href: '#packages', label: 'Rates & Packages' },
    { href: '#coating', label: 'Ceramic Coating' },
    { href: '#fleets', label: 'Fleet Service' },
    { href: '#boats', label: 'Boats' },
    { href: '#shop', label: 'Why Us' },
    { href: '#reviews', label: 'Reviews' },
    { href: '#book', label: 'Location' },
  ];

  const allSectionLinks = [
    { href: '#packages', label: 'Rates & Packages' },
    { href: '#coating', label: 'Ceramic Coating' },
    { href: '#fleets', label: 'Fleet & Commercial' },
    { href: '#boats', label: 'Boats & Marine' },
    { href: '#shop', label: 'Why a Shop' },
    { href: '#credentials', label: 'Credentials & Certs' },
    { href: '#work', label: 'Our Work Gallery' },
    { href: '#process', label: 'System X 5-Step Process' },
    { href: '#why', label: 'Coating Facts' },
    { href: '#carfax', label: 'CARFAX Canada Records' },
    { href: '#how', label: 'How It Works' },
    { href: '#reviews', label: 'Customer Reviews' },
    { href: '#book', label: 'Hours & Location' },
  ];

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 60,
        background: 'var(--header-bg)',
        borderBottom: '1px solid var(--header-border)',
        boxShadow: scrolled ? '0 4px 20px rgba(10, 30, 66, 0.18)' : '0 2px 10px rgba(12, 34, 71, 0.05)',
        transition: 'background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.25s ease',
      }}
    >
      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0.45rem 1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem' }}>
          
          {/* Brand Logo */}
          <a href="#" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flexShrink: 0 }}>
            <img
              src="/logo.png"
              alt="Ktown Auto Spa"
              style={{
                height: 'clamp(2.4rem, 4.5vw, 3.2rem)',
                width: 'auto',
                objectFit: 'contain',
                display: 'block',
              }}
            />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="desktop-nav" aria-label="Main Navigation" style={{ display: 'none', alignItems: 'center', gap: '0.2rem' }}>
            {primaryLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                style={{
                  color: 'var(--heading-color)',
                  textDecoration: 'none',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  padding: '0.4rem 0.65rem',
                  borderRadius: '6px',
                  transition: 'all 0.18s ease',
                  letterSpacing: '0.01em',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--gold-primary)';
                  e.currentTarget.style.background = 'rgba(201, 160, 60, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--heading-color)';
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Header Action Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
            
            {/* Theme Toggle Button */}
            <button
              onClick={onToggleTheme}
              title={`Switch to ${isLight ? 'Dark' : 'Light'} Mode`}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '2.3rem',
                height: '2.3rem',
                borderRadius: '8px',
                background: 'var(--chip-inactive-bg)',
                border: '1px solid var(--surface-border-gold)',
                color: 'var(--gold-primary)',
                cursor: 'pointer',
                transition: 'all 0.2s',
                flexShrink: 0,
              }}
            >
              {isLight ? <Moon style={{ width: '1rem', height: '1rem', color: 'var(--navy-deep)' }} /> : <Sun style={{ width: '1rem', height: '1rem', color: '#F0D590' }} />}
            </button>

            {/* Cart Button with Count Badge */}
            <button
              onClick={() => setIsCartOpen(true)}
              title="View Cart & Detailing Services"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                minHeight: '38px',
                padding: '0 0.75rem',
                borderRadius: '8px',
                background: cartCount > 0 ? 'rgba(201, 160, 60, 0.15)' : 'var(--chip-inactive-bg)',
                border: `1px solid ${cartCount > 0 ? 'var(--gold)' : 'var(--surface-border)'}`,
                color: 'var(--heading-color)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                flexShrink: 0,
              }}
            >
              <ShoppingBag style={{ width: '1rem', height: '1rem', color: 'var(--gold-primary)' }} />
              {cartCount > 0 && (
                <>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: '0.78rem', fontWeight: 800, color: 'var(--gold-primary)' }}>
                    ${subtotal.toFixed(0)}
                  </span>
                  <span
                    style={{
                      background: 'var(--gold)',
                      color: '#0A1E42',
                      fontSize: '0.7rem',
                      fontWeight: 900,
                      borderRadius: '4px',
                      padding: '0.1rem 0.35rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {cartCount}
                  </span>
                </>
              )}
            </button>

            {/* Phone Call CTA */}
            <a
              href="tel:+16479153530"
              className="btn btn--cream nav-phone-btn"
              style={{ minHeight: '38px', padding: '0 0.95rem', fontSize: '0.85rem' }}
            >
              <Phone style={{ width: '0.85rem', height: '0.85rem' }} />
              <span>647-915-3530</span>
            </a>

            {/* Book Online CTA */}
            <button
              onClick={onOpenBooking}
              className="btn btn--gold nav-book-btn"
              style={{ minHeight: '38px', padding: '0 1rem', fontSize: '0.85rem' }}
            >
              <Calendar style={{ width: '0.85rem', height: '0.85rem' }} />
              <span>Book Online</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                color: 'var(--header-text)',
                padding: '0.35rem',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
              className="mobile-hamburger"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X style={{ width: '1.6rem', height: '1.6rem' }} /> : <Menu style={{ width: '1.6rem', height: '1.6rem' }} />}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile & Tablet Full Menu Drawer */}
      {mobileMenuOpen && (
        <div style={{ background: 'var(--surface-card)', borderBottom: '2px solid var(--gold)', padding: '1.25rem 1.25rem', boxShadow: '0 10px 30px rgba(0,0,0,0.25)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.6rem', marginBottom: '1.25rem' }}>
            {allSectionLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  color: 'var(--heading-color)',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  padding: '0.4rem 0.5rem',
                  borderRadius: '6px',
                  borderBottom: '1px dashed var(--surface-border)',
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', borderTop: '1px solid var(--surface-border)', paddingTop: '0.9rem' }}>
            {cartCount > 0 && (
              <button
                onClick={() => { setMobileMenuOpen(false); setIsCartOpen(true); }}
                className="btn btn--gold"
                style={{ width: '100%', minHeight: '44px' }}
              >
                <ShoppingBag style={{ width: '1rem', height: '1rem' }} />
                <span>View Cart ({cartCount}) &middot; ${subtotal.toFixed(0)} CAD</span>
              </button>
            )}
            <a href="tel:+16479153530" className="btn btn--cream" style={{ width: '100%', minHeight: '44px' }}>
              <Phone style={{ width: '1rem', height: '1rem' }} />
              <span>Call 647-915-3530</span>
            </a>
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenBooking(); }}
              className="btn btn--gold"
              style={{ width: '100%', minHeight: '44px' }}
            >
              <Calendar style={{ width: '1rem', height: '1rem' }} />
              <span>Book Appointment</span>
            </button>
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 992px) {
          .desktop-nav { display: flex !important; }
          .mobile-hamburger { display: none !important; }
        }
        @media (max-width: 768px) {
          .nav-phone-btn { display: none !important; }
        }
        @media (max-width: 480px) {
          .nav-book-btn { display: none !important; }
        }
      `}</style>
    </header>
  );
}
