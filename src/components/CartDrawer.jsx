import React, { useEffect } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Car } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartDrawer() {
  const {
    cart,
    cartCount,
    subtotal,
    hstTax,
    grandTotal,
    isCartOpen,
    setIsCartOpen,
    addToCart,
    removeFromCart,
    clearCart,
    proceedToCheckout,
  } = useCart();

  // Lock body scroll and listen for escape key when drawer is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.classList.add('modal-open');
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          setIsCartOpen(false);
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.classList.remove('modal-open');
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isCartOpen, setIsCartOpen]);

  if (!isCartOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        display: 'flex',
        justifyContent: 'flex-end',
        background: 'rgba(5, 17, 36, 0.72)',
        backdropFilter: 'blur(5px)',
        transition: 'opacity 0.25s ease',
      }}
      onClick={() => setIsCartOpen(false)}
    >
      <div
        style={{
          width: 'min(480px, 100vw)',
          height: '100%',
          background: 'var(--bg-page)',
          borderLeft: '2px solid var(--gold-dk)',
          boxShadow: '-8px 0 32px rgba(10, 30, 66, 0.4)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 101,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div
          style={{
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid var(--surface-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'var(--header-bg)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div
              style={{
                width: '2.4rem',
                height: '2.4rem',
                minWidth: '2.4rem',
                minHeight: '2.4rem',
                flexShrink: 0,
                borderRadius: '8px',
                background: 'linear-gradient(180deg, var(--gold-lt), var(--gold))',
                color: '#0A1E42',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 900,
              }}
            >
              <ShoppingBag style={{ width: '1.2rem', height: '1.2rem' }} />
            </div>
            <div>
              <h3
                style={{
                  fontFamily: 'var(--display)',
                  fontSize: '1.45rem',
                  fontWeight: 800,
                  margin: 0,
                  textTransform: 'uppercase',
                  color: 'var(--heading-color)',
                  lineHeight: 1.1,
                }}
              >
                Your Spa Services
              </h3>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '0.76rem', color: 'var(--muted-color)' }}>
                {cartCount} {cartCount === 1 ? 'service' : 'services'} selected
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            aria-label="Close cart"
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--muted-color)',
              cursor: 'pointer',
              padding: '0.4rem',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <X style={{ width: '1.5rem', height: '1.5rem' }} />
          </button>
        </div>

        {/* Drawer Body / Cart Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', margin: 'auto 0', padding: '1.5rem 0.5rem' }}>
              <div
                style={{
                  width: '4.2rem',
                  height: '4.2rem',
                  minWidth: '4.2rem',
                  minHeight: '4.2rem',
                  flexShrink: 0,
                  borderRadius: '12px',
                  background: 'var(--chip-inactive-bg)',
                  border: '1.5px dashed var(--gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.25rem',
                  color: 'var(--gold-primary)',
                }}
              >
                <ShoppingBag style={{ width: '2rem', height: '2rem', opacity: 0.7 }} />
              </div>
              <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--heading-color)', margin: '0 0 0.5rem' }}>
                Your cart is empty
              </h4>
              <p style={{ color: 'var(--muted-color)', fontSize: '0.92rem', lineHeight: 1.5, maxWidth: '28ch', margin: '0 auto 1.2rem' }}>
                Select any package or coating from our 2026 Rate Card to book your appointment.
              </p>
              
              {/* Popular quick add packages */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', maxWidth: '300px', margin: '0 auto 1.5rem', textAlign: 'left' }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: '0.72rem', color: 'var(--gold-primary)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
                  Quick Add Popular Services:
                </span>
                <button
                  type="button"
                  onClick={() => addToCart({ title: 'Medium Package', vehicleType: 'c-sedan', basePrice: 100, subtitle: 'Interior vacuum & glass, mats, jambs, hand wash' }, false)}
                  className="btn btn--outline"
                  style={{ minHeight: '38px', fontSize: '0.84rem', justifyContent: 'space-between', padding: '0 0.9rem' }}
                >
                  <span>Medium Package (Sedan)</span>
                  <b>$100</b>
                </button>
                <button
                  type="button"
                  onClick={() => addToCart({ title: 'Full Detail', vehicleType: 'c-sedan', basePrice: 200, subtitle: 'Medium Package + summer mats steamed, carpets & seats scrubbed' }, false)}
                  className="btn btn--outline"
                  style={{ minHeight: '38px', fontSize: '0.84rem', justifyContent: 'space-between', padding: '0 0.9rem' }}
                >
                  <span>Full Detail (Sedan)</span>
                  <b>$200</b>
                </button>
                <button
                  type="button"
                  onClick={() => addToCart({ title: 'Hand Car Wash', vehicleType: 'c-sedan', basePrice: 30, subtitle: 'Wash & wax soap, windows, blown dry' }, false)}
                  className="btn btn--outline"
                  style={{ minHeight: '38px', fontSize: '0.84rem', justifyContent: 'space-between', padding: '0 0.9rem' }}
                >
                  <span>Hand Car Wash (Sedan)</span>
                  <b>$30</b>
                </button>
              </div>

              <button
                onClick={() => {
                  setIsCartOpen(false);
                  const pkgEl = document.getElementById('packages');
                  if (pkgEl) pkgEl.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn btn--gold"
                style={{ minHeight: '44px', padding: '0 1.4rem', fontSize: '0.88rem' }}
              >
                Explore Full Rate Card
              </button>
            </div>
          ) : (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--gold-primary)', fontWeight: 700 }}>
                  Selected Treatments
                </span>
                <button
                  onClick={clearCart}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--muted-color)',
                    fontSize: '0.76rem',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    fontFamily: 'var(--mono)',
                  }}
                >
                  Clear all
                </button>
              </div>

              {cart.map((item) => {
                const addonsSum = (item.addons || []).reduce((acc, a) => acc + (a.price || 0), 0);
                const itemTotal = (item.basePrice || 0) + addonsSum;

                return (
                  <div
                    key={item.id}
                    style={{
                      background: 'var(--surface-card)',
                      border: '1.5px solid var(--surface-border)',
                      borderRadius: '12px',
                      padding: '1.1rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.75rem',
                      boxShadow: '0 4px 14px rgba(0,0,0,0.06)',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.75rem' }}>
                      <div>
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.3rem',
                            background: 'var(--chip-inactive-bg)',
                            color: 'var(--gold-primary)',
                            border: '1px solid var(--surface-border-gold)',
                            borderRadius: '6px',
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            padding: '0.15rem 0.55rem',
                            marginBottom: '0.35rem',
                          }}
                        >
                          <Car style={{ width: '0.75rem', height: '0.75rem' }} />
                          {item.vehicleLabel}
                        </span>
                        <h4
                          style={{
                            fontFamily: 'var(--display)',
                            fontSize: '1.25rem',
                            fontWeight: 800,
                            margin: 0,
                            color: 'var(--heading-color)',
                            lineHeight: 1.15,
                          }}
                        >
                          {item.title}
                        </h4>
                        {item.subtitle && (
                          <span style={{ fontSize: '0.78rem', color: 'var(--muted-color)' }}>
                            {item.subtitle}
                          </span>
                        )}
                      </div>

                      <div style={{ textAlign: 'right', flexShrink: 0 }}>
                        <div
                          style={{
                            fontFamily: 'var(--display)',
                            fontSize: '1.45rem',
                            fontWeight: 800,
                            color: 'var(--water-dk)',
                            lineHeight: 1,
                          }}
                        >
                          ${itemTotal}
                        </div>
                        <span style={{ fontSize: '0.68rem', color: 'var(--muted-color)' }}>CAD</span>
                      </div>
                    </div>

                    {/* Add-ons list if any */}
                    {item.addons && item.addons.length > 0 && (
                      <div
                        style={{
                          background: 'rgba(62, 155, 218, 0.08)',
                          borderRadius: '8px',
                          padding: '0.5rem 0.75rem',
                          border: '1px solid rgba(62, 155, 218, 0.2)',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.3rem',
                        }}
                      >
                        <span style={{ fontSize: '0.7rem', color: 'var(--water-dk)', fontWeight: 800, textTransform: 'uppercase' }}>
                          Included Add-ons:
                        </span>
                        {item.addons.map((a, i) => (
                          <div
                            key={i}
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              fontSize: '0.78rem',
                              color: 'var(--text-main)',
                            }}
                          >
                            <span>+ {a.title}</span>
                            <span style={{ fontWeight: 700, color: 'var(--water-dk)' }}>+${a.price}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Bottom actions */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '0.4rem', borderTop: '1px dashed var(--surface-border)' }}>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: '#EF4444',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.3rem',
                          fontSize: '0.78rem',
                          fontWeight: 600,
                        }}
                      >
                        <Trash2 style={{ width: '0.9rem', height: '0.9rem' }} />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>

        {/* Drawer Footer / Financial Summary */}
        {cart.length > 0 && (
          <div
            style={{
              padding: '1.25rem 1.5rem max(1.25rem, env(safe-area-inset-bottom))',
              borderTop: '2px solid var(--surface-border-gold)',
              background: 'var(--header-bg)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.85rem',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--muted-color)' }}>
                <span>Subtotal:</span>
                <strong style={{ color: 'var(--text-main)' }}>${subtotal.toFixed(2)} CAD</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--muted-color)' }}>
                <span>Ontario HST (13%):</span>
                <strong style={{ color: 'var(--text-main)' }}>${hstTax.toFixed(2)} CAD</strong>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  paddingTop: '0.6rem',
                  borderTop: '1px solid var(--surface-border)',
                }}
              >
                <div>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: '0.74rem', textTransform: 'uppercase', color: 'var(--gold-primary)', fontWeight: 800 }}>
                    Estimated Total
                  </span>
                  <span style={{ display: 'block', fontSize: '0.72rem', color: 'var(--muted-color)' }}>
                    All prices confirmed before service begins
                  </span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div
                    style={{
                      fontFamily: 'var(--display)',
                      fontSize: '2rem',
                      fontWeight: 900,
                      color: 'var(--gold-primary)',
                      lineHeight: 1,
                    }}
                  >
                    ${grandTotal.toFixed(2)}
                  </div>
                  <span style={{ fontSize: '0.7rem', color: 'var(--muted-color)', fontWeight: 600 }}>CAD</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => proceedToCheckout()}
              className="btn btn--gold"
              style={{ width: '100%', minHeight: '52px', fontSize: '1rem', fontWeight: 800 }}
            >
              <span>Proceed to Checkout</span>
              <ArrowRight style={{ width: '1.1rem', height: '1.1rem' }} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', color: 'var(--muted-color)', fontSize: '0.74rem' }}>
              <ShieldCheck style={{ width: '0.9rem', height: '0.9rem', color: '#10B981' }} />
              <span>Credit Card (Stripe) or Pay at Drop-off at 36 Joseph St</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
