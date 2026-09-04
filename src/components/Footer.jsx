import React from 'react';
import { Phone, Mail, MapPin, MessageCircle, ShieldCheck } from 'lucide-react';

export default function Footer({ onOpenBooking }) {
  return (
    <footer 
      style={{
        background: 'var(--navy-deep)',
        color: '#9DB4CF',
        padding: '2.5rem 0',
        fontSize: '0.94rem',
        borderTop: '3px solid var(--gold)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            <p style={{ margin: 0, color: '#E4EDF7', fontWeight: 600 }}>
              &copy; {new Date().getFullYear()} Ktown Auto Spa &middot; 36 Joseph St, Kingston, Ontario
            </p>
            <span style={{ fontSize: '0.84rem', color: '#9DB4CF' }}>
              Serving Kingston, Amherstview, Loyalist Township, Bath, Odessa &amp; Napanee
            </span>
          </div>

          <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', alignItems: 'center', fontFamily: 'var(--mono)', fontSize: '0.86rem' }}>
            <a href="tel:+16479153530" style={{ color: 'var(--gold-pale)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Phone style={{ width: '0.9rem', height: '0.9rem' }} />
              <span>647-915-3530</span>
            </a>
            
            <a href="https://wa.me/16479153530" target="_blank" rel="noopener" style={{ color: '#25D366', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <MessageCircle style={{ width: '0.9rem', height: '0.9rem' }} />
              <span>WhatsApp</span>
            </a>

            <a href="mailto:ktownautomobilespa@gmail.com" style={{ color: 'var(--gold-pale)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Mail style={{ width: '0.9rem', height: '0.9rem' }} />
              <span>Email Us</span>
            </a>

            <button 
              onClick={onOpenBooking} 
              style={{
                background: 'rgba(255,255,255,0.08)', color: 'var(--gold-lt)',
                border: '1px solid var(--gold)', borderRadius: '999px',
                padding: '0.3rem 0.85rem', cursor: 'pointer', fontFamily: 'var(--body)', fontWeight: 700,
              }}
            >
              Book Online
            </button>
          </div>

        </div>
      </div>
    </footer>
  );
}
