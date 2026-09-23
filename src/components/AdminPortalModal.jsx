import React, { useState, useEffect } from 'react';
import {
  X,
  Lock,
  Phone,
  Mail,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  ExternalLink,
  Car,
  ShieldCheck,
} from 'lucide-react';

export default function AdminPortalModal({ isOpen, onClose }) {
  const [pin, setPin] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [data, setData] = useState({ stats: null, confirmed: [], failedAttempts: [] });
  const [activeTab, setActiveTab] = useState('confirmed'); // 'confirmed' | 'failed'

  // Check saved session PIN
  useEffect(() => {
    const savedPin = sessionStorage.getItem('ktown_admin_pin');
    if (savedPin) {
      setPin(savedPin);
      fetchData(savedPin);
    }
  }, [isOpen]);

  const fetchData = async (pinToUse) => {
    setLoading(true);
    setErrorMsg('');
    try {
      const res = await fetch('/api/admin/reservations', {
        headers: {
          'x-admin-pin': pinToUse,
        },
      });

      if (!res.ok) {
        if (res.status === 401) {
          throw new Error('Invalid Owner PIN. Please try again.');
        }
        throw new Error('Failed to load reservations data');
      }

      const json = await res.json();
      setData(json);
      setIsAuthenticated(true);
      sessionStorage.setItem('ktown_admin_pin', pinToUse);
    } catch (err) {
      setErrorMsg(err.message || 'Authentication failed');
      setIsAuthenticated(false);
      sessionStorage.removeItem('ktown_admin_pin');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!pin.trim()) return;
    fetchData(pin.trim());
  };

  const handleLogout = () => {
    sessionStorage.removeItem('ktown_admin_pin');
    setIsAuthenticated(false);
    setPin('');
    setData({ stats: null, confirmed: [], failedAttempts: [] });
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: 'rgba(5, 12, 26, 0.88)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '850px',
          maxHeight: '90vh',
          background: 'var(--surface-bg, #0d1b2e)',
          border: '1.5px solid var(--gold, #c9a03c)',
          borderRadius: '16px',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          color: '#e2e8f0',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '1.25rem 1.5rem',
            background: 'rgba(10, 26, 48, 0.95)',
            borderBottom: '1px solid rgba(201, 160, 60, 0.3)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'rgba(201, 160, 60, 0.15)',
                border: '1px solid var(--gold, #c9a03c)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--gold, #c9a03c)',
              }}
            >
              <ShieldCheck style={{ width: '18px', height: '18px' }} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0, color: '#f8fafc', letterSpacing: '0.5px' }}>
                Ktown Auto Spa &middot; Owner Portal
              </h2>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                Confidential bookings, Stripe payments &amp; lost lead recovery
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {isAuthenticated && (
              <>
                <button
                  onClick={() => fetchData(pin)}
                  disabled={loading}
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#e2e8f0',
                    borderRadius: '6px',
                    padding: '0.35rem 0.65rem',
                    fontSize: '0.78rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                  }}
                  title="Refresh bookings"
                >
                  <RefreshCw style={{ width: '13px', height: '13px', animation: loading ? 'spin 1s linear infinite' : 'none' }} />
                  <span>Refresh</span>
                </button>

                <button
                  onClick={handleLogout}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#94a3b8',
                    fontSize: '0.78rem',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                  }}
                >
                  Logout
                </button>
              </>
            )}

            <button
              onClick={onClose}
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: 'none',
                color: '#cbd5e1',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <X style={{ width: '18px', height: '18px' }} />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
          {!isAuthenticated ? (
            /* PIN Login Form */
            <form onSubmit={handleLogin} style={{ maxWidth: '340px', margin: '2rem auto', textAlign: 'center' }}>
              <div
                style={{
                  width: '54px',
                  height: '54px',
                  margin: '0 auto 1.25rem',
                  borderRadius: '50%',
                  background: 'rgba(201, 160, 60, 0.15)',
                  border: '1.5px solid var(--gold, #c9a03c)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--gold, #c9a03c)',
                }}
              >
                <Lock style={{ width: '24px', height: '24px' }} />
              </div>

              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: '0 0 0.5rem', color: '#f8fafc' }}>
                Owner Security Access
              </h3>
              <p style={{ fontSize: '0.82rem', color: '#94a3b8', margin: '0 0 1.25rem' }}>
                Enter your Owner PIN to access real-time bookings, Stripe transactions, and failed payment logs.
              </p>

              <input
                type="password"
                placeholder="Enter PIN (e.g. ktown2026)"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                autoFocus
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  background: 'rgba(15, 23, 42, 0.8)',
                  border: '1.5px solid rgba(201, 160, 60, 0.4)',
                  borderRadius: '8px',
                  color: '#f8fafc',
                  fontSize: '1rem',
                  textAlign: 'center',
                  letterSpacing: '2px',
                  marginBottom: '1rem',
                  outline: 'none',
                }}
              />

              {errorMsg && (
                <div style={{ color: '#f87171', fontSize: '0.82rem', marginBottom: '1rem', background: 'rgba(239, 68, 68, 0.1)', padding: '0.5rem', borderRadius: '6px' }}>
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  background: 'var(--gold, #c9a03c)',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#0a1e42',
                  fontWeight: 800,
                  fontSize: '0.92rem',
                  cursor: 'pointer',
                }}
              >
                {loading ? 'Authenticating...' : 'Unlock Portal'}
              </button>
            </form>
          ) : (
            /* Authenticated Portal Dashboard */
            <div>
              {/* Stats Overview */}
              {data.stats && (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
                    gap: '0.75rem',
                    marginBottom: '1.5rem',
                  }}
                >
                  <div style={{ background: 'rgba(15, 23, 42, 0.7)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '1rem' }}>
                    <span style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total Bookings</span>
                    <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#f8fafc', marginTop: '0.2rem' }}>
                      {data.stats.totalBookings}
                    </div>
                  </div>

                  <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '10px', padding: '1rem' }}>
                    <span style={{ fontSize: '0.72rem', color: '#34d399', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Stripe Paid Total</span>
                    <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#34d399', marginTop: '0.2rem' }}>
                      ${data.stats.totalRevenue.toFixed(2)} <span style={{ fontSize: '0.75rem' }}>CAD</span>
                    </div>
                  </div>

                  <div style={{ background: 'rgba(201, 160, 60, 0.1)', border: '1px solid rgba(201, 160, 60, 0.3)', borderRadius: '10px', padding: '1rem' }}>
                    <span style={{ fontSize: '0.72rem', color: '#fbbf24', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Pending at Drop-off</span>
                    <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#fbbf24', marginTop: '0.2rem' }}>
                      ${data.stats.pendingRevenue.toFixed(2)} <span style={{ fontSize: '0.75rem' }}>CAD</span>
                    </div>
                  </div>

                  <div style={{ background: data.stats.failedAttemptsCount > 0 ? 'rgba(239, 68, 68, 0.12)' : 'rgba(15, 23, 42, 0.7)', border: data.stats.failedAttemptsCount > 0 ? '1px solid rgba(239, 68, 68, 0.4)' : '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '1rem' }}>
                    <span style={{ fontSize: '0.72rem', color: data.stats.failedAttemptsCount > 0 ? '#f87171' : '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Failed / Incomplete Leads</span>
                    <div style={{ fontSize: '1.6rem', fontWeight: 900, color: data.stats.failedAttemptsCount > 0 ? '#f87171' : '#f8fafc', marginTop: '0.2rem' }}>
                      {data.stats.failedAttemptsCount}
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Tabs */}
              <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '0.75rem', marginBottom: '1.25rem' }}>
                <button
                  onClick={() => setActiveTab('confirmed')}
                  style={{
                    padding: '0.5rem 1rem',
                    background: activeTab === 'confirmed' ? 'var(--gold, #c9a03c)' : 'rgba(255, 255, 255, 0.05)',
                    color: activeTab === 'confirmed' ? '#0a1e42' : '#cbd5e1',
                    fontWeight: 700,
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                  }}
                >
                  Confirmed Bookings ({data.confirmed.length})
                </button>

                <button
                  onClick={() => setActiveTab('failed')}
                  style={{
                    padding: '0.5rem 1rem',
                    background: activeTab === 'failed' ? '#ef4444' : 'rgba(255, 255, 255, 0.05)',
                    color: '#ffffff',
                    fontWeight: 700,
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                  }}
                >
                  <AlertTriangle style={{ width: '14px', height: '14px' }} />
                  <span>Failed / Abandoned Leads ({data.failedAttempts.length})</span>
                </button>

                <a
                  href="https://dashboard.stripe.com/payments"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    marginLeft: 'auto',
                    padding: '0.5rem 0.85rem',
                    background: 'rgba(99, 102, 241, 0.15)',
                    border: '1px solid rgba(99, 102, 241, 0.3)',
                    color: '#a5b4fc',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                  }}
                >
                  <span>Open Stripe Dashboard</span>
                  <ExternalLink style={{ width: '13px', height: '13px' }} />
                </a>
              </div>

              {/* Tab 1: Confirmed Bookings */}
              {activeTab === 'confirmed' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {data.confirmed.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '2.5rem', color: '#94a3b8' }}>
                      No confirmed bookings found yet.
                    </div>
                  ) : (
                    data.confirmed.map((resv) => (
                      <div
                        key={resv.id}
                        style={{
                          background: 'rgba(15, 23, 42, 0.65)',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                          borderRadius: '10px',
                          padding: '1rem',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.5rem',
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
                          <div>
                            <span style={{ fontFamily: 'var(--mono, monospace)', fontWeight: 800, color: 'var(--gold, #c9a03c)', fontSize: '0.85rem' }}>
                              {resv.id}
                            </span>
                            <h4 style={{ margin: '0.15rem 0', fontSize: '1rem', fontWeight: 800, color: '#f8fafc' }}>
                              {resv.customer?.name}
                            </h4>
                          </div>

                          <div style={{ textAlign: 'right' }}>
                            <span
                              style={{
                                display: 'inline-block',
                                padding: '3px 8px',
                                borderRadius: '9999px',
                                fontSize: '0.72rem',
                                fontWeight: 800,
                                background: resv.payment?.status === 'paid' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.2)',
                                color: resv.payment?.status === 'paid' ? '#34d399' : '#fbbf24',
                                border: resv.payment?.status === 'paid' ? '1px solid #10b981' : '1px solid #f59e0b',
                              }}
                            >
                              {resv.payment?.status === 'paid' ? 'PAID WITH STRIPE' : 'PAY AT DROP-OFF'}
                            </span>
                            <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#f8fafc', marginTop: '0.2rem' }}>
                              ${resv.pricing?.grandTotal?.toFixed(2)} <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>CAD</span>
                            </div>
                          </div>
                        </div>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', fontSize: '0.82rem', color: '#cbd5e1' }}>
                          <a href={`tel:${resv.customer?.phone}`} style={{ color: '#38bdf8', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                            <Phone style={{ width: '13px', height: '13px' }} />
                            <span>{resv.customer?.phone}</span>
                          </a>

                          <a href={`mailto:${resv.customer?.email}`} style={{ color: '#38bdf8', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                            <Mail style={{ width: '13px', height: '13px' }} />
                            <span>{resv.customer?.email}</span>
                          </a>

                          <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#e2e8f0' }}>
                            <Car style={{ width: '13px', height: '13px', color: 'var(--gold, #c9a03c)' }} />
                            <span>{resv.customer?.vehicleYear} {resv.customer?.vehicleMake} {resv.customer?.vehicleModel}</span>
                          </span>

                          <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#e2e8f0' }}>
                            <Calendar style={{ width: '13px', height: '13px', color: 'var(--gold, #c9a03c)' }} />
                            <span>{resv.appointment?.date} ({resv.appointment?.slot})</span>
                          </span>
                        </div>

                        <div style={{ fontSize: '0.78rem', color: '#94a3b8', borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '0.4rem', marginTop: '0.2rem' }}>
                          <strong>Services:</strong> {resv.items?.map(i => `${i.title} (${i.vehicleLabel})`).join(', ')}
                          {resv.customer?.notes && <span style={{ display: 'block', color: '#fbbf24', marginTop: '2px' }}>Note: {resv.customer.notes}</span>}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* Tab 2: Failed / Abandoned Leads */}
              {activeTab === 'failed' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {data.failedAttempts.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '2.5rem', color: '#94a3b8' }}>
                      <CheckCircle2 style={{ width: '32px', height: '32px', color: '#10b981', margin: '0 auto 0.5rem' }} />
                      <div>Zero failed payment attempts recorded. Every checkout is converting smoothly!</div>
                    </div>
                  ) : (
                    data.failedAttempts.map((fail) => (
                      <div
                        key={fail.id}
                        style={{
                          background: 'rgba(239, 68, 68, 0.06)',
                          border: '1.5px solid rgba(239, 68, 68, 0.3)',
                          borderRadius: '10px',
                          padding: '1rem',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.5rem',
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
                          <div>
                            <span style={{ fontSize: '0.75rem', color: '#f87171', fontWeight: 800, textTransform: 'uppercase' }}>
                              ⚠️ Payment Not Completed
                            </span>
                            <h4 style={{ margin: '0.15rem 0', fontSize: '1rem', fontWeight: 800, color: '#f8fafc' }}>
                              {fail.customer?.name}
                            </h4>
                          </div>

                          <div style={{ textAlign: 'right' }}>
                            <span style={{ fontSize: '1.15rem', fontWeight: 900, color: '#f87171' }}>
                              ${fail.pricing?.grandTotal?.toFixed(2)} CAD
                            </span>
                            <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                              {new Date(fail.attemptedAt).toLocaleString('en-CA', { timeZone: 'America/Toronto' })}
                            </div>
                          </div>
                        </div>

                        {/* Customer contact buttons to rescue booking */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', alignItems: 'center' }}>
                          {fail.customer?.phone && fail.customer?.phone !== 'No phone' && (
                            <a
                              href={`tel:${fail.customer.phone}`}
                              style={{
                                background: '#10b981',
                                color: '#ffffff',
                                textDecoration: 'none',
                                padding: '0.35rem 0.75rem',
                                borderRadius: '6px',
                                fontSize: '0.78rem',
                                fontWeight: 700,
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.35rem',
                              }}
                            >
                              <Phone style={{ width: '12px', height: '12px' }} />
                              <span>Call {fail.customer.phone} to Rescue Booking</span>
                            </a>
                          )}

                          {fail.customer?.email && fail.customer?.email !== 'No email' && (
                            <a
                              href={`mailto:${fail.customer.email}?subject=Your Ktown Auto Spa Detailing Appointment&body=Hi ${fail.customer.name}, we noticed your online booking wasn't completed. We have your spot reserved—would you like to confirm and pay at drop-off in our shop?`}
                              style={{
                                background: 'rgba(255, 255, 255, 0.1)',
                                color: '#cbd5e1',
                                textDecoration: 'none',
                                padding: '0.35rem 0.65rem',
                                borderRadius: '6px',
                                fontSize: '0.78rem',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.35rem',
                              }}
                            >
                              <Mail style={{ width: '12px', height: '12px' }} />
                              <span>Email Customer</span>
                            </a>
                          )}
                        </div>

                        <div style={{ fontSize: '0.78rem', color: '#fca5a5', background: 'rgba(0,0,0,0.2)', padding: '0.4rem 0.6rem', borderRadius: '6px' }}>
                          <strong>Reason for failure:</strong> {fail.failureReason}
                        </div>

                        <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                          Vehicle: {fail.customer?.vehicleYear} {fail.customer?.vehicleMake} {fail.customer?.vehicleModel} &middot; Services: {fail.items?.map(i => i.title).join(', ')}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
