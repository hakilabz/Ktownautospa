import React from 'react';
import { Phone, Mail, MessageCircle, MapPin, Clock, Calendar, ArrowRight } from 'lucide-react';
import { useRouter } from '../context/RouterContext';

export default function Footer({ onOpenBooking }) {
  const { navigate } = useRouter();

  const handleNav = (e, path) => {
    e.preventDefault();
    navigate(path);
  };

  return (
    <footer 
      style={{
        background: 'var(--navy-deep)',
        color: '#9DB4CF',
        padding: '3.5rem 0 2rem',
        fontSize: '0.94rem',
        borderTop: '3px solid var(--gold)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
        
        {/* Main Footer Columns */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '2.5rem', marginBottom: '2.5rem' }}>
          
          {/* Col 1: Brand & About */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.85rem' }}>
              <img src="/logo.png" alt="Ktown Auto Spa" style={{ height: '2.6rem', width: 'auto' }} />
            </div>
            <p style={{ fontSize: '0.88rem', color: '#B0C4DE', lineHeight: 1.6, margin: '0 0 1.25rem' }}>
              Kingston’s dedicated indoor detailing studio. Specializing in two-bucket scratch-free hand washes, multi-stage paint correction, and CARFAX-registered System X ceramic coatings in heated bays at 36 Joseph St.
            </p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(201, 160, 60, 0.15)', padding: '0.3rem 0.65rem', borderRadius: '6px', border: '1px solid var(--gold)' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--gold-lt)', fontWeight: 800, fontFamily: 'var(--mono)' }}>
                ⭐ 4.9 Rating &middot; Auto-Brite Certified
              </span>
            </div>
          </div>

          {/* Col 2: Site Pages */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '1rem', fontWeight: 800, margin: '0 0 1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Site Pages
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.88rem' }}>
              <li>
                <a href="/" onClick={(e) => handleNav(e, '/')} style={{ color: '#B0C4DE', textDecoration: 'none', transition: 'color 0.2s' }}>
                  Home
                </a>
              </li>
              <li>
                <a href="/services" onClick={(e) => handleNav(e, '/services')} style={{ color: '#B0C4DE', textDecoration: 'none', transition: 'color 0.2s' }}>
                  Services &amp; Quote Builder
                </a>
              </li>
              <li>
                <a href="/ceramic-coating" onClick={(e) => handleNav(e, '/ceramic-coating')} style={{ color: '#B0C4DE', textDecoration: 'none', transition: 'color 0.2s' }}>
                  System X Ceramic Coating
                </a>
              </li>
              <li>
                <a href="/fleets-marine" onClick={(e) => handleNav(e, '/fleets-marine')} style={{ color: '#B0C4DE', textDecoration: 'none', transition: 'color 0.2s' }}>
                  Fleet &amp; Marine Detailing
                </a>
              </li>
              <li>
                <a href="/about" onClick={(e) => handleNav(e, '/about')} style={{ color: '#B0C4DE', textDecoration: 'none', transition: 'color 0.2s' }}>
                  Why an Indoor Shop
                </a>
              </li>
              <li>
                <a href="/reviews" onClick={(e) => handleNav(e, '/reviews')} style={{ color: '#B0C4DE', textDecoration: 'none', transition: 'color 0.2s' }}>
                  Customer Reviews &amp; Logs
                </a>
              </li>
              <li>
                <a href="/contact" onClick={(e) => handleNav(e, '/contact')} style={{ color: '#B0C4DE', textDecoration: 'none', transition: 'color 0.2s' }}>
                  Location, Hours &amp; FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Popular Services */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '1rem', fontWeight: 800, margin: '0 0 1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Popular Services
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.88rem' }}>
              <li>
                <a href="/services" onClick={(e) => handleNav(e, '/services')} style={{ color: '#B0C4DE', textDecoration: 'none' }}>
                  Hand Car Wash (from $30)
                </a>
              </li>
              <li>
                <a href="/services" onClick={(e) => handleNav(e, '/services')} style={{ color: '#B0C4DE', textDecoration: 'none' }}>
                  Silver Package (from $180)
                </a>
              </li>
              <li>
                <a href="/services" onClick={(e) => handleNav(e, '/services')} style={{ color: '#B0C4DE', textDecoration: 'none' }}>
                  Gold Deep Clean Detail (from $220)
                </a>
              </li>
              <li>
                <a href="/services" onClick={(e) => handleNav(e, '/services')} style={{ color: '#B0C4DE', textDecoration: 'none' }}>
                  Diamond Restoration Detail (from $320)
                </a>
              </li>
              <li>
                <a href="/ceramic-coating" onClick={(e) => handleNav(e, '/ceramic-coating')} style={{ color: '#B0C4DE', textDecoration: 'none' }}>
                  1 &amp; 2-Stage Paint Correction
                </a>
              </li>
              <li>
                <a href="/ceramic-coating" onClick={(e) => handleNav(e, '/ceramic-coating')} style={{ color: '#B0C4DE', textDecoration: 'none' }}>
                  System X CARFAX Coating (from $749)
                </a>
              </li>
              <li>
                <a href="/fleets-marine" onClick={(e) => handleNav(e, '/fleets-marine')} style={{ color: '#B0C4DE', textDecoration: 'none' }}>
                  Mobile Boat &amp; Marina Wash ($25/ft)
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Shop Location & Contact */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '1rem', fontWeight: 800, margin: '0 0 1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Shop &amp; Contact
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.88rem', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                <MapPin style={{ width: '1rem', height: '1rem', color: 'var(--gold-lt)', flexShrink: 0, marginTop: '2px' }} />
                <span>36 Joseph St, Kingston, ON K7K 2H5</span>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                <Clock style={{ width: '1rem', height: '1rem', color: 'var(--gold-lt)', flexShrink: 0, marginTop: '2px' }} />
                <span>Mon – Sat: 8:00 AM – 5:00 PM (Closed Sun)</span>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <Phone style={{ width: '1rem', height: '1rem', color: 'var(--gold-lt)', flexShrink: 0 }} />
                <a href="tel:+16479153530" style={{ color: 'var(--gold-lt)', textDecoration: 'none', fontWeight: 700 }}>
                  647-915-3530
                </a>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <MessageCircle style={{ width: '1rem', height: '1rem', color: '#25D366', flexShrink: 0 }} />
                <a href="https://wa.me/16479153530" target="_blank" rel="noopener noreferrer" style={{ color: '#25D366', textDecoration: 'none', fontWeight: 700 }}>
                  WhatsApp Chat
                </a>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <Mail style={{ width: '1rem', height: '1rem', color: 'var(--gold-lt)', flexShrink: 0 }} />
                <a href="mailto:ktownautomobilespa@gmail.com" style={{ color: '#B0C4DE', textDecoration: 'none' }}>
                  ktownautomobilespa@gmail.com
                </a>
              </div>
            </div>

            <button 
              onClick={onOpenBooking} 
              className="btn btn--gold"
              style={{ width: '100%', minHeight: '38px', fontSize: '0.85rem', justifyContent: 'center' }}
            >
              <Calendar style={{ width: '0.85rem', height: '0.85rem' }} />
              <span>Book Appointment Online</span>
            </button>
          </div>

        </div>

        {/* Bottom Strip */}
        <div style={{ paddingTop: '1.75rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', fontSize: '0.84rem' }}>
          <div>
            &copy; {new Date().getFullYear()} Ktown Auto Spa &middot; Serving Kingston, Amherstview, Loyalist Township, Bath, Odessa &amp; Napanee.
          </div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: '0.78rem', color: '#7E95B3' }}>
            Crafted by <a href="https://hakilabz.ai" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold-lt)', textDecoration: 'none', fontWeight: 600 }}>HakiLabZ</a>..Proudly serving Canadian businesses
          </div>
        </div>

      </div>
    </footer>
  );
}
