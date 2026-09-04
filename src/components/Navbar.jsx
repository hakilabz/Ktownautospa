import React, { useState, useEffect } from 'react';
import { Phone, Calendar, Menu, X, Moon, Sun } from 'lucide-react';

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

  const isLight = theme !== 'dark';

  const navLinks = [
    { href: '#packages', label: 'Prices' },
    { href: '#shop', label: 'Why a shop' },
    { href: '#credentials', label: 'Credentials' },
    { href: '#work', label: 'Our work' },
    { href: '#coating', label: 'Ceramic coating' },
    { href: '#fleets', label: 'Fleets' },
    { href: '#boats', label: 'Boats' },
    { href: '#process', label: 'The process' },
    { href: '#why', label: 'Coating facts' },
    { href: '#carfax', label: 'Why CARFAX' },
    { href: '#how', label: 'How it works' },
    { href: '#reviews', label: 'Reviews' },
    { href: '#book', label: 'Hours & location' },
  ];

  return (
    <header style={{
      position: 'sticky', top: 0, left: 0, right: 0, zIndex: 60,
      background: 'var(--header-bg)', borderBottom: '1px solid var(--header-border)',
      boxShadow: '0 2px 14px rgba(12,34,71,.08)',
      transition: 'background-color 0.3s ease, border-color 0.3s ease',
    }}>
      {/* Top Header Bar */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0.55rem 1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
          
          {/* Brand Logo */}
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
            <img src="/logo.png" alt="Ktown Auto Spa" style={{ height: '3.4rem', width: 'auto', objectFit: 'contain' }} />
          </a>

          {/* Topbar Meta (Desktop) */}
          <div style={{ display: 'none', flexDirection: 'column', fontFamily: 'var(--mono)', fontSize: '0.82rem', color: 'var(--muted-color)', lineHeight: 1.5, textAlign: 'right', marginLeft: 'auto', marginRight: '1.25rem' }} className="desktop-meta">
            <span style={{ color: 'var(--text-main)' }}>36 Joseph St, Kingston ON</span>
            <a href="mailto:ktownautomobilespa@gmail.com" style={{ color: 'var(--muted-color)', textDecoration: 'none' }}>ktownautomobilespa@gmail.com</a>
            <span>ktownautospa.ca</span>
          </div>

          {/* Header Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            
            {/* Theme Toggle Button */}
            <button
              onClick={onToggleTheme}
              title={`Switch to ${isLight ? 'Dark' : 'Light'} Mode`}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: '2.5rem', height: '2.5rem', borderRadius: '50%',
                background: 'var(--chip-inactive-bg)', border: '1.5px solid var(--gold)',
                color: 'var(--gold-primary)', cursor: 'pointer', transition: 'all 0.2s',
              }}
            >
              {isLight ? <Moon style={{ width: '1.1rem', height: '1.1rem', color: 'var(--navy-deep)' }} /> : <Sun style={{ width: '1.1rem', height: '1.1rem', color: '#F0D590' }} />}
            </button>

            {/* Direct Phone CTA */}
            <a 
              href="tel:+16479153530" 
              className="btn btn--gold"
              style={{ minHeight: '46px', padding: '0 1.2rem', fontSize: '0.95rem' }}
            >
              <Phone style={{ width: '1rem', height: '1rem' }} />
              <span>647-915-3530</span>
            </a>

            {/* Book Online CTA */}
            <button 
              onClick={onOpenBooking} 
              className="btn btn--navy"
              style={{ minHeight: '46px', padding: '0 1.2rem', fontSize: '0.95rem' }}
            >
              <Calendar style={{ width: '1rem', height: '1rem' }} />
              <span>Book Online</span>
            </button>

            {/* Mobile Drawer Hamburger */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{ color: 'var(--header-text)', padding: '0.35rem', background: 'none', border: 'none', cursor: 'pointer', display: 'flex' }}
              className="mobile-hamburger"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X style={{ width: '1.75rem', height: '1.75rem' }} /> : <Menu style={{ width: '1.75rem', height: '1.75rem' }} />}
            </button>

          </div>

        </div>
      </div>

      {/* Secondary Main Navigation Ribbon */}
      <nav style={{ background: 'var(--navy-deep)', borderBottom: '3px solid var(--gold)', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }} aria-label="Main Navigation">
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 0.5rem' }}>
          <ul style={{ display: 'flex', gap: '0.2rem', listStyle: 'none', margin: 0, padding: 0, whiteSpace: 'nowrap', overflowX: 'auto', scrollbarWidth: 'none' }}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a 
                  href={link.href}
                  style={{
                    display: 'block', padding: '0.65rem 0.95rem',
                    color: 'var(--gold-pale)', textDecoration: 'none',
                    fontWeight: 600, fontSize: '0.92rem',
                    borderBottom: '3px solid transparent',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#FFFFFF';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                    e.currentTarget.style.borderBottomColor = 'var(--gold)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--gold-pale)';
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.borderBottomColor = 'transparent';
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div style={{ background: 'var(--surface-card)', borderBottom: '2px solid var(--gold)', padding: '1.25rem 1.5rem', boxShadow: '0 10px 30px rgba(0,0,0,0.25)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.25rem' }}>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  color: 'var(--heading-color)', textDecoration: 'none',
                  fontSize: '0.92rem', fontWeight: 700, padding: '0.4rem 0',
                  borderBottom: '1px dashed var(--surface-border)',
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', borderTop: '1px solid var(--surface-border)', paddingTop: '0.9rem' }}>
            <a href="tel:+16479153530" className="btn btn--gold" style={{ width: '100%', minHeight: '48px' }}>
              <Phone style={{ width: '1rem', height: '1rem' }} />
              <span>Call 647-915-3530</span>
            </a>
            <button onClick={() => { setMobileMenuOpen(false); onOpenBooking(); }} className="btn btn--navy" style={{ width: '100%', minHeight: '48px' }}>
              <Calendar style={{ width: '1rem', height: '1rem' }} />
              <span>Book Online Session</span>
            </button>
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 1080px) {
          .desktop-meta { display: flex !important; }
        }
        @media (min-width: 900px) {
          .mobile-hamburger { display: none !important; }
        }
      `}</style>
    </header>
  );
}
