import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function FloatingMobileCart() {
  const { cartCount, subtotal, setIsCartOpen } = useCart();

  return (
    <aside
      className="mobile-floating-cart"
      style={{
        position: 'fixed',
        right: 'max(16px, env(safe-area-inset-right))',
        bottom: 'calc(max(16px, env(safe-area-inset-bottom)) + 68px)',
        zIndex: 95,
      }}
      aria-label="Mobile Shopping Cart"
    >
      <button
        onClick={() => setIsCartOpen(true)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.55rem',
          minHeight: '48px',
          padding: '0.5rem 1rem',
          borderRadius: '999px',
          background: cartCount > 0 ? 'linear-gradient(135deg, #12305F 0%, #0A1E42 100%)' : 'var(--surface-card, #0d1b2e)',
          border: '2px solid var(--gold, #C9A03C)',
          boxShadow: '0 8px 24px rgba(10, 30, 66, 0.45)',
          color: '#FFFFFF',
          cursor: 'pointer',
          fontWeight: 800,
          fontSize: '0.88rem',
          transition: 'transform 0.18s ease, box-shadow 0.18s ease',
        }}
      >
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <ShoppingBag style={{ width: '1.25rem', height: '1.25rem', color: 'var(--gold-lt, #F0D590)' }} />
          {cartCount > 0 && (
            <span
              style={{
                position: 'absolute',
                top: '-8px',
                right: '-8px',
                background: 'var(--gold, #C9A03C)',
                color: '#0A1E42',
                borderRadius: '999px',
                fontSize: '0.68rem',
                fontWeight: 900,
                width: '18px',
                height: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1.5px solid #0A1E42',
              }}
            >
              {cartCount}
            </span>
          )}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: 1.1 }}>
          <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--gold-lt, #F0D590)' }}>
            Cart
          </span>
          <span style={{ fontFamily: 'var(--mono)', fontSize: '0.86rem', fontWeight: 900, color: '#FFFFFF' }}>
            ${subtotal.toFixed(0)} CAD
          </span>
        </div>
      </button>
    </aside>
  );
}
