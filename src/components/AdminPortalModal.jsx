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
  Tag,
  Clock,
  Trash2,
  Plus,
  Send,
  Banknote,
  Edit2,
  Ban,
  Check,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

export default function AdminPortalModal({ isOpen, onClose }) {
  const [pin, setPin] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [actionLoadingId, setActionLoadingId] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [toastMsg, setToastMsg] = useState('');
  const [data, setData] = useState({ stats: null, confirmed: [], failedAttempts: [], cancelled: [] });
  const [coupons, setCoupons] = useState([]);
  
  // Navigation Tabs: 'confirmed' | 'calendar' | 'coupons' | 'failed'
  const [activeTab, setActiveTab] = useState('confirmed');
  const [bookingFilter, setBookingFilter] = useState('all'); // 'all' | 'pending_etransfer' | 'pending_cash' | 'paid' | 'cancelled'

  // Reschedule state
  const [reschedulingBooking, setReschedulingBooking] = useState(null);
  const [rescheduleDate, setRescheduleDate] = useState('');
  const [rescheduleSlot, setRescheduleSlot] = useState('9:00 AM');

  // Coupon form state
  const [newCoupon, setNewCoupon] = useState({
    code: '',
    type: 'percent',
    value: '',
    maxDiscountCap: '',
    maxRedemptions: '',
  });
  const [couponSubmitting, setCouponSubmitting] = useState(false);
  const [couponError, setCouponError] = useState('');

  // Selected date for Calendar view
  const [selectedCalendarDate, setSelectedCalendarDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    if (d.getDay() === 0) d.setDate(d.getDate() + 1);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  });

  // Check saved session PIN
  useEffect(() => {
    const savedPin = sessionStorage.getItem('ktown_admin_pin');
    if (savedPin) {
      setPin(savedPin);
      fetchData(savedPin);
      fetchCoupons(savedPin);
    }
  }, [isOpen]);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 4000);
  };

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

  const fetchCoupons = async (pinToUse) => {
    try {
      const res = await fetch('/api/admin/coupons', {
        headers: { 'x-admin-pin': pinToUse },
      });
      if (res.ok) {
        const json = await res.json();
        setCoupons(json.coupons || []);
      }
    } catch (err) {
      console.warn('Coupons fetch note:', err.message);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!pin.trim()) return;
    fetchData(pin.trim());
    fetchCoupons(pin.trim());
  };

  const handleLogout = () => {
    sessionStorage.removeItem('ktown_admin_pin');
    setIsAuthenticated(false);
    setPin('');
    setData({ stats: null, confirmed: [], failedAttempts: [], cancelled: [] });
    setCoupons([]);
  };

  // Action: Mark Money Received (e-Transfer)
  const handleMarkEtransferReceived = async (resvId) => {
    setActionLoadingId(resvId);
    try {
      const res = await fetch(`/api/admin/reservations/${resvId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-pin': pin,
        },
        body: JSON.stringify({ action: 'mark_etransfer_paid' }),
      });
      if (!res.ok) throw new Error('Failed to update payment status');
      showToast(`✓ Marked e-Transfer received for reservation ${resvId}!`);
      await fetchData(pin);
    } catch (err) {
      alert(err.message || 'Action failed');
    } finally {
      setActionLoadingId(null);
    }
  };

  // Action: Mark Cash Received
  const handleMarkCashReceived = async (resvId) => {
    setActionLoadingId(resvId);
    try {
      const res = await fetch(`/api/admin/reservations/${resvId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-pin': pin,
        },
        body: JSON.stringify({ action: 'mark_cash_paid' }),
      });
      if (!res.ok) throw new Error('Failed to update payment status');
      showToast(`✓ Marked Cash received for reservation ${resvId}!`);
      await fetchData(pin);
    } catch (err) {
      alert(err.message || 'Action failed');
    } finally {
      setActionLoadingId(null);
    }
  };

  // Action: Reschedule
  const handleSaveReschedule = async (e) => {
    e.preventDefault();
    if (!reschedulingBooking || !rescheduleDate || !rescheduleSlot) return;
    setActionLoadingId(reschedulingBooking.id);
    try {
      const res = await fetch(`/api/admin/reservations/${reschedulingBooking.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-pin': pin,
        },
        body: JSON.stringify({
          action: 'reschedule',
          date: rescheduleDate,
          slot: rescheduleSlot,
        }),
      });
      if (!res.ok) throw new Error('Failed to reschedule appointment');
      showToast(`✓ Rescheduled ${reschedulingBooking.id} to ${rescheduleDate} (${rescheduleSlot})`);
      setReschedulingBooking(null);
      await fetchData(pin);
    } catch (err) {
      alert(err.message || 'Reschedule failed');
    } finally {
      setActionLoadingId(null);
    }
  };

  // Action: Cancel Booking
  const handleCancelBooking = async (resvId) => {
    const reason = window.prompt('Reason for cancelling this reservation (optional):', 'Customer requested or schedule conflict');
    if (reason === null) return; // user cancelled prompt

    setActionLoadingId(resvId);
    try {
      const res = await fetch(`/api/admin/reservations/${resvId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-pin': pin,
        },
        body: JSON.stringify({ action: 'cancel', reason }),
      });
      if (!res.ok) throw new Error('Failed to cancel reservation');
      showToast(`Reservation ${resvId} cancelled.`);
      await fetchData(pin);
    } catch (err) {
      alert(err.message || 'Cancel failed');
    } finally {
      setActionLoadingId(null);
    }
  };

  // Coupon CRUD: Create
  const handleCreateCoupon = async (e) => {
    e.preventDefault();
    setCouponError('');
    if (!newCoupon.code.trim()) {
      setCouponError('Please enter a coupon code.');
      return;
    }
    if (!newCoupon.value || Number(newCoupon.value) <= 0) {
      setCouponError('Please enter a discount value greater than 0.');
      return;
    }

    setCouponSubmitting(true);
    try {
      const res = await fetch('/api/admin/coupons', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-pin': pin,
        },
        body: JSON.stringify(newCoupon),
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || 'Failed to create coupon');
      }

      setCoupons(json.coupons || []);
      setNewCoupon({
        code: '',
        type: 'percent',
        value: '',
        maxDiscountCap: '',
        maxRedemptions: '',
      });
      showToast(`✓ Coupon '${json.coupon?.code}' created successfully!`);
    } catch (err) {
      setCouponError(err.message || 'Failed to create coupon');
    } finally {
      setCouponSubmitting(false);
    }
  };

  // Coupon CRUD: Delete
  const handleDeleteCoupon = async (code) => {
    if (!window.confirm(`Delete coupon '${code}'? Customers will no longer be able to use it.`)) return;
    try {
      const res = await fetch(`/api/admin/coupons/${encodeURIComponent(code)}`, {
        method: 'DELETE',
        headers: { 'x-admin-pin': pin },
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed to delete coupon');
      setCoupons(json.coupons || []);
      showToast(`Coupon '${code}' removed.`);
    } catch (err) {
      alert(err.message || 'Failed to delete coupon');
    }
  };

  // Filter confirmed bookings list
  const filteredBookings = (data.confirmed || []).filter((r) => {
    if (bookingFilter === 'all') return true;
    if (bookingFilter === 'paid') return r.payment?.status === 'paid';
    if (bookingFilter === 'pending_etransfer') {
      return (r.payment?.method === 'etransfer' || r.payment?.status === 'pending_etransfer') && r.payment?.status !== 'paid';
    }
    if (bookingFilter === 'pending_cash') {
      return (r.payment?.method === 'cash' || r.payment?.status === 'pending_cash' || r.payment?.method === 'pay_at_dropoff') && r.payment?.status !== 'paid';
    }
    return true;
  });

  // Unique dates in confirmed bookings for calendar
  const bookingDates = Array.from(new Set((data.confirmed || []).map(r => r.appointment?.date).filter(Boolean))).sort();

  // Hourly slots array for calendar
  const calendarHours = [
    '9:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '1:00 PM',
    '2:00 PM',
    '3:00 PM',
    '4:00 PM',
    '5:00 PM',
    '6:00 PM',
  ];

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: 'rgba(5, 12, 26, 0.92)',
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
          maxWidth: '920px',
          maxHeight: '92vh',
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
            padding: '1.15rem 1.5rem',
            background: 'rgba(10, 26, 48, 0.98)',
            borderBottom: '1px solid rgba(201, 160, 60, 0.3)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '8px',
                background: 'rgba(201, 160, 60, 0.15)',
                border: '1px solid var(--gold, #c9a03c)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--gold, #c9a03c)',
              }}
            >
              <ShieldCheck style={{ width: '20px', height: '20px' }} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.18rem', fontWeight: 800, margin: 0, color: '#f8fafc', letterSpacing: '0.5px' }}>
                Ktown Auto Spa &middot; Owner Command Center
              </h2>
              <span style={{ fontSize: '0.74rem', color: '#94a3b8' }}>
                Track e-Transfer &amp; Cash payments, schedule calendar, and manage coupons
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {isAuthenticated && (
              <>
                <button
                  onClick={() => {
                    fetchData(pin);
                    fetchCoupons(pin);
                  }}
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
                  title="Refresh data"
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

        {/* Floating Notification Toast */}
        {toastMsg && (
          <div
            style={{
              background: '#10B981',
              color: '#ffffff',
              padding: '0.55rem 1rem',
              fontSize: '0.82rem',
              fontWeight: 800,
              textAlign: 'center',
              boxShadow: '0 4px 12px rgba(16, 185, 129, 0.4)',
            }}
          >
            {toastMsg}
          </div>
        )}

        {/* Content Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem 1.5rem' }}>
          {!isAuthenticated ? (
            /* PIN Login Form */
            <form onSubmit={handleLogin} style={{ maxWidth: '340px', margin: '2.5rem auto', textAlign: 'center' }}>
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
                Enter your Owner PIN to manage bookings, track payments, view schedule, and configure coupons.
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
                {loading ? 'Authenticating...' : 'Unlock Command Center'}
              </button>
            </form>
          ) : (
            /* Authenticated Portal Dashboard */
            <div>
              {/* Financial & Status KPI Cards */}
              {data.stats && (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                    gap: '0.75rem',
                    marginBottom: '1.25rem',
                  }}
                >
                  <div style={{ background: 'rgba(15, 23, 42, 0.7)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '0.85rem' }}>
                    <span style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total Bookings</span>
                    <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#f8fafc', marginTop: '0.15rem' }}>
                      {data.stats.totalBookings}
                    </div>
                  </div>

                  <div style={{ background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.35)', borderRadius: '10px', padding: '0.85rem' }}>
                    <span style={{ fontSize: '0.7rem', color: '#34d399', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total Paid Revenue</span>
                    <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#34d399', marginTop: '0.15rem' }}>
                      ${data.stats.totalRevenue.toFixed(2)} <span style={{ fontSize: '0.7rem' }}>CAD</span>
                    </div>
                    <span style={{ fontSize: '0.68rem', color: '#94a3b8' }}>
                      {data.stats.paidCount} paid ({data.stats.stripePaidCount || 0} Stripe, {data.stats.etransferPaidCount || 0} e-Transfer, {data.stats.cashPaidCount || 0} Cash)
                    </span>
                  </div>

                  <div style={{ background: 'rgba(201, 160, 60, 0.1)', border: '1px solid rgba(201, 160, 60, 0.3)', borderRadius: '10px', padding: '0.85rem' }}>
                    <span style={{ fontSize: '0.7rem', color: '#fbbf24', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Pending Payments</span>
                    <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#fbbf24', marginTop: '0.15rem' }}>
                      ${data.stats.pendingRevenue.toFixed(2)} <span style={{ fontSize: '0.7rem' }}>CAD</span>
                    </div>
                    <span style={{ fontSize: '0.68rem', color: '#94a3b8' }}>
                      {data.stats.etransferPendingCount || 0} e-Transfer &middot; {data.stats.cashPendingCount || 0} Cash
                    </span>
                  </div>

                  <div style={{ background: data.stats.failedAttemptsCount > 0 ? 'rgba(239, 68, 68, 0.12)' : 'rgba(15, 23, 42, 0.7)', border: data.stats.failedAttemptsCount > 0 ? '1px solid rgba(239, 68, 68, 0.4)' : '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '0.85rem' }}>
                    <span style={{ fontSize: '0.7rem', color: data.stats.failedAttemptsCount > 0 ? '#f87171' : '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Lost / Incomplete Leads</span>
                    <div style={{ fontSize: '1.5rem', fontWeight: 900, color: data.stats.failedAttemptsCount > 0 ? '#f87171' : '#f8fafc', marginTop: '0.15rem' }}>
                      {data.stats.failedAttemptsCount}
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Tabs */}
              <div style={{ display: 'flex', gap: '0.45rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '0.75rem', marginBottom: '1.25rem', overflowX: 'auto' }}>
                <button
                  onClick={() => setActiveTab('confirmed')}
                  style={{
                    padding: '0.5rem 0.85rem',
                    background: activeTab === 'confirmed' ? 'var(--gold, #c9a03c)' : 'rgba(255, 255, 255, 0.05)',
                    color: activeTab === 'confirmed' ? '#0a1e42' : '#cbd5e1',
                    fontWeight: 700,
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '0.82rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <span>All Bookings ({data.confirmed.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('calendar')}
                  style={{
                    padding: '0.5rem 0.85rem',
                    background: activeTab === 'calendar' ? 'var(--gold, #c9a03c)' : 'rgba(255, 255, 255, 0.05)',
                    color: activeTab === 'calendar' ? '#0a1e42' : '#cbd5e1',
                    fontWeight: 700,
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '0.82rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <Calendar style={{ width: '13px', height: '13px' }} />
                  <span>Calendar Schedule</span>
                </button>

                <button
                  onClick={() => setActiveTab('coupons')}
                  style={{
                    padding: '0.5rem 0.85rem',
                    background: activeTab === 'coupons' ? 'var(--gold, #c9a03c)' : 'rgba(255, 255, 255, 0.05)',
                    color: activeTab === 'coupons' ? '#0a1e42' : '#cbd5e1',
                    fontWeight: 700,
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '0.82rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <Tag style={{ width: '13px', height: '13px' }} />
                  <span>Coupon Manager ({coupons.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('failed')}
                  style={{
                    padding: '0.5rem 0.85rem',
                    background: activeTab === 'failed' ? '#ef4444' : 'rgba(255, 255, 255, 0.05)',
                    color: '#ffffff',
                    fontWeight: 700,
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '0.82rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <AlertTriangle style={{ width: '13px', height: '13px' }} />
                  <span>Lost Leads ({data.failedAttempts.length})</span>
                </button>

                <a
                  href="https://dashboard.stripe.com/payments"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    marginLeft: 'auto',
                    padding: '0.45rem 0.75rem',
                    background: 'rgba(99, 102, 241, 0.15)',
                    border: '1px solid rgba(99, 102, 241, 0.3)',
                    color: '#a5b4fc',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <span>Stripe Dashboard</span>
                  <ExternalLink style={{ width: '12px', height: '12px' }} />
                </a>
              </div>

              {/* TAB 1: ALL CONFIRMED BOOKINGS */}
              {activeTab === 'confirmed' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {/* Filter chips */}
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.4rem' }}>
                    {[
                      { id: 'all', label: 'All Bookings' },
                      { id: 'pending_etransfer', label: 'Pending e-Transfer' },
                      { id: 'pending_cash', label: 'Pending Cash' },
                      { id: 'paid', label: 'Fully Paid' },
                    ].map(f => (
                      <button
                        key={f.id}
                        onClick={() => setBookingFilter(f.id)}
                        style={{
                          padding: '0.3rem 0.65rem',
                          borderRadius: '6px',
                          border: bookingFilter === f.id ? '1px solid var(--gold, #c9a03c)' : '1px solid rgba(255,255,255,0.1)',
                          background: bookingFilter === f.id ? 'rgba(201, 160, 60, 0.2)' : 'transparent',
                          color: bookingFilter === f.id ? 'var(--gold, #c9a03c)' : '#cbd5e1',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                        }}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>

                  {filteredBookings.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '2.5rem', color: '#94a3b8' }}>
                      No bookings match this filter.
                    </div>
                  ) : (
                    filteredBookings.map((resv) => {
                      const isPaid = resv.payment?.status === 'paid';
                      const isEtransfer = resv.payment?.method === 'etransfer' || resv.payment?.status === 'pending_etransfer';
                      const isCash = resv.payment?.method === 'cash' || resv.payment?.status === 'pending_cash' || resv.payment?.method === 'pay_at_dropoff';
                      const isLoadingThis = actionLoadingId === resv.id;

                      return (
                        <div
                          key={resv.id}
                          style={{
                            background: 'rgba(15, 23, 42, 0.65)',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            borderRadius: '10px',
                            padding: '1rem',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.65rem',
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
                              {resv.couponCode && (
                                <span style={{ fontSize: '0.72rem', background: 'rgba(16, 185, 129, 0.15)', color: '#10B981', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '1px 6px', borderRadius: '4px', fontWeight: 700 }}>
                                  Promo: {resv.couponCode} (-${resv.pricing?.discountAmount?.toFixed(2) || '0.00'})
                                </span>
                              )}
                            </div>

                            <div style={{ textAlign: 'right' }}>
                              <span
                                style={{
                                  display: 'inline-block',
                                  padding: '3px 8px',
                                  borderRadius: '9999px',
                                  fontSize: '0.72rem',
                                  fontWeight: 800,
                                  background: isPaid
                                    ? 'rgba(16, 185, 129, 0.2)'
                                    : isEtransfer
                                    ? 'rgba(245, 158, 11, 0.2)'
                                    : 'rgba(59, 130, 246, 0.2)',
                                  color: isPaid ? '#34d399' : isEtransfer ? '#fbbf24' : '#60A5FA',
                                  border: isPaid
                                    ? '1px solid #10b981'
                                    : isEtransfer
                                    ? '1px solid #f59e0b'
                                    : '1px solid #3b82f6',
                                }}
                              >
                                {isPaid
                                  ? `PAID (${(resv.payment?.receivedVia || resv.payment?.method || 'STRIPE').toUpperCase()})`
                                  : isEtransfer
                                  ? 'PENDING E-TRANSFER'
                                  : 'PAY CASH AT DROP-OFF'}
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

                          <div style={{ fontSize: '0.78rem', color: '#94a3b8', borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '0.4rem' }}>
                            <strong>Services:</strong> {resv.items?.map(i => `${i.title} (${i.vehicleLabel})`).join(', ')}
                            {resv.customer?.notes && <span style={{ display: 'block', color: '#fbbf24', marginTop: '2px' }}>Note: {resv.customer.notes}</span>}
                          </div>

                          {/* Quick Actions Bar */}
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center', paddingTop: '0.4rem', borderTop: '1px dashed rgba(255, 255, 255, 0.08)' }}>
                            {/* Option 1: Mark Money Received (e-Transfer) */}
                            {!isPaid && isEtransfer && (
                              <button
                                onClick={() => handleMarkEtransferReceived(resv.id)}
                                disabled={isLoadingThis}
                                style={{
                                  background: '#10B981',
                                  color: '#0A1E42',
                                  border: 'none',
                                  borderRadius: '6px',
                                  padding: '0.35rem 0.75rem',
                                  fontSize: '0.78rem',
                                  fontWeight: 800,
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '0.35rem',
                                }}
                              >
                                <Check style={{ width: '13px', height: '13px' }} />
                                <span>{isLoadingThis ? 'Updating...' : '✓ Mark Money Received (e-Transfer)'}</span>
                              </button>
                            )}

                            {/* Option 2: Mark Cash Received */}
                            {!isPaid && isCash && (
                              <button
                                onClick={() => handleMarkCashReceived(resv.id)}
                                disabled={isLoadingThis}
                                style={{
                                  background: '#3B82F6',
                                  color: '#ffffff',
                                  border: 'none',
                                  borderRadius: '6px',
                                  padding: '0.35rem 0.75rem',
                                  fontSize: '0.78rem',
                                  fontWeight: 800,
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '0.35rem',
                                }}
                              >
                                <Check style={{ width: '13px', height: '13px' }} />
                                <span>{isLoadingThis ? 'Updating...' : '✓ Mark Cash Received'}</span>
                              </button>
                            )}

                            {/* Reschedule Button */}
                            <button
                              onClick={() => {
                                setReschedulingBooking(resv);
                                setRescheduleDate(resv.appointment?.date || '');
                                setRescheduleSlot(resv.appointment?.slot || '9:00 AM');
                              }}
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
                                gap: '0.3rem',
                              }}
                            >
                              <Edit2 style={{ width: '12px', height: '12px' }} />
                              <span>Reschedule</span>
                            </button>

                            {/* Cancel Booking */}
                            <button
                              onClick={() => handleCancelBooking(resv.id)}
                              style={{
                                background: 'transparent',
                                border: '1px solid rgba(239, 68, 68, 0.3)',
                                color: '#f87171',
                                borderRadius: '6px',
                                padding: '0.35rem 0.65rem',
                                fontSize: '0.76rem',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.3rem',
                                marginLeft: 'auto',
                              }}
                            >
                              <Ban style={{ width: '12px', height: '12px' }} />
                              <span>Cancel</span>
                            </button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              )}

              {/* TAB 2: CALENDAR SCHEDULE VIEW */}
              {activeTab === 'calendar' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {/* Date Selector Strip */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(15, 23, 42, 0.8)', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <Calendar style={{ width: '16px', height: '16px', color: 'var(--gold, #c9a03c)' }} />
                      <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>Inspect Schedule For Date:</span>
                    </div>

                    <input
                      type="date"
                      value={selectedCalendarDate}
                      onChange={(e) => setSelectedCalendarDate(e.target.value)}
                      style={{
                        padding: '0.4rem 0.75rem',
                        background: '#0a1628',
                        border: '1px solid rgba(201, 160, 60, 0.4)',
                        borderRadius: '6px',
                        color: '#f8fafc',
                        fontSize: '0.85rem',
                        outline: 'none',
                      }}
                    />
                  </div>

                  {/* Active Booking Dates Quick Chips */}
                  {bookingDates.length > 0 && (
                    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Dates with active appointments:</span>
                      {bookingDates.map(dateStr => (
                        <button
                          key={dateStr}
                          onClick={() => setSelectedCalendarDate(dateStr)}
                          style={{
                            padding: '0.25rem 0.55rem',
                            borderRadius: '4px',
                            background: selectedCalendarDate === dateStr ? 'var(--gold, #c9a03c)' : 'rgba(255, 255, 255, 0.08)',
                            color: selectedCalendarDate === dateStr ? '#0a1e42' : '#cbd5e1',
                            border: 'none',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                          }}
                        >
                          {dateStr}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Timeline / Hourly slots for selected date */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    {calendarHours.map(slot => {
                      const slotBookings = (data.confirmed || []).filter(
                        r => r.appointment?.date === selectedCalendarDate && r.appointment?.slot?.includes(slot)
                      );

                      return (
                        <div
                          key={slot}
                          style={{
                            background: slotBookings.length > 0 ? 'rgba(201, 160, 60, 0.07)' : 'rgba(15, 23, 42, 0.5)',
                            border: slotBookings.length > 0 ? '1.5px solid rgba(201, 160, 60, 0.35)' : '1px solid rgba(255, 255, 255, 0.05)',
                            borderRadius: '8px',
                            padding: '0.75rem 1rem',
                            display: 'flex',
                            gap: '1rem',
                            alignItems: slotBookings.length > 0 ? 'flex-start' : 'center',
                          }}
                        >
                          <div style={{ width: '85px', flexShrink: 0, fontFamily: 'var(--mono, monospace)', fontSize: '0.85rem', fontWeight: 800, color: slotBookings.length > 0 ? 'var(--gold, #c9a03c)' : '#64748b' }}>
                            {slot}
                          </div>

                          <div style={{ flex: 1 }}>
                            {slotBookings.length === 0 ? (
                              <span style={{ fontSize: '0.78rem', color: '#475569', fontStyle: 'italic' }}>
                                Bay Available / Open Slot
                              </span>
                            ) : (
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                {slotBookings.map(sb => (
                                  <div
                                    key={sb.id}
                                    style={{
                                      background: 'rgba(10, 26, 48, 0.9)',
                                      border: '1px solid rgba(201, 160, 60, 0.25)',
                                      borderRadius: '6px',
                                      padding: '0.65rem 0.85rem',
                                      display: 'flex',
                                      justifyContent: 'space-between',
                                      alignItems: 'center',
                                      flexWrap: 'wrap',
                                      gap: '0.5rem',
                                    }}
                                  >
                                    <div>
                                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <strong style={{ fontSize: '0.9rem', color: '#f8fafc' }}>{sb.customer?.name}</strong>
                                        <span style={{ fontSize: '0.72rem', color: 'var(--gold, #c9a03c)' }}>({sb.customer?.vehicleYear} {sb.customer?.vehicleMake} {sb.customer?.vehicleModel})</span>
                                      </div>
                                      <span style={{ fontSize: '0.76rem', color: '#94a3b8' }}>
                                        {sb.items?.map(i => i.title).join(', ')} &middot; <a href={`tel:${sb.customer?.phone}`} style={{ color: '#38bdf8' }}>{sb.customer?.phone}</a>
                                      </span>
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                      <span
                                        style={{
                                          fontSize: '0.72rem',
                                          fontWeight: 800,
                                          padding: '2px 7px',
                                          borderRadius: '4px',
                                          background: sb.payment?.status === 'paid' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.2)',
                                          color: sb.payment?.status === 'paid' ? '#34d399' : '#fbbf24',
                                        }}
                                      >
                                        ${sb.pricing?.grandTotal?.toFixed(2)} {sb.payment?.status === 'paid' ? 'PAID' : 'PENDING'}
                                      </span>

                                      {sb.payment?.status !== 'paid' && (
                                        <button
                                          onClick={() => sb.payment?.method === 'etransfer' ? handleMarkEtransferReceived(sb.id) : handleMarkCashReceived(sb.id)}
                                          style={{
                                            padding: '0.25rem 0.5rem',
                                            background: '#10B981',
                                            color: '#0A1E42',
                                            border: 'none',
                                            borderRadius: '4px',
                                            fontSize: '0.72rem',
                                            fontWeight: 800,
                                            cursor: 'pointer',
                                          }}
                                        >
                                          Mark Paid
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 3: COUPON MANAGER */}
              {activeTab === 'coupons' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {/* Coupon Creation Card */}
                  <div style={{ background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(201, 160, 60, 0.3)', borderRadius: '12px', padding: '1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.85rem' }}>
                      <Tag style={{ width: '16px', height: '16px', color: 'var(--gold, #c9a03c)' }} />
                      <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: '#f8fafc' }}>Create New Promo / Coupon Code</h4>
                    </div>

                    <form onSubmit={handleCreateCoupon} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem' }}>
                        <div>
                          <label style={{ fontSize: '0.74rem', color: '#94a3b8', display: 'block', marginBottom: '0.25rem' }}>Coupon Code *</label>
                          <input
                            type="text"
                            placeholder="e.g. SPRING20"
                            value={newCoupon.code}
                            onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value.toUpperCase() })}
                            style={{ width: '100%', padding: '0.45rem 0.75rem', background: '#0a1628', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', color: '#ffffff', fontSize: '0.85rem', textTransform: 'uppercase' }}
                          />
                        </div>

                        <div>
                          <label style={{ fontSize: '0.74rem', color: '#94a3b8', display: 'block', marginBottom: '0.25rem' }}>Discount Type *</label>
                          <select
                            value={newCoupon.type}
                            onChange={(e) => setNewCoupon({ ...newCoupon, type: e.target.value })}
                            style={{ width: '100%', padding: '0.45rem 0.75rem', background: '#0a1628', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', color: '#ffffff', fontSize: '0.85rem' }}
                          >
                            <option value="percent">% Percentage Off</option>
                            <option value="fixed">$ CAD Fixed Dollar Off</option>
                          </select>
                        </div>

                        <div>
                          <label style={{ fontSize: '0.74rem', color: '#94a3b8', display: 'block', marginBottom: '0.25rem' }}>Value ({newCoupon.type === 'percent' ? '%' : '$ CAD'}) *</label>
                          <input
                            type="number"
                            min="1"
                            placeholder={newCoupon.type === 'percent' ? '15' : '30'}
                            value={newCoupon.value}
                            onChange={(e) => setNewCoupon({ ...newCoupon, value: e.target.value })}
                            style={{ width: '100%', padding: '0.45rem 0.75rem', background: '#0a1628', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', color: '#ffffff', fontSize: '0.85rem' }}
                          />
                        </div>

                        <div>
                          <label style={{ fontSize: '0.74rem', color: '#94a3b8', display: 'block', marginBottom: '0.25rem' }}>Max Discount Cap ($ CAD)</label>
                          <input
                            type="number"
                            min="1"
                            placeholder="Optional (e.g. 50)"
                            value={newCoupon.maxDiscountCap}
                            onChange={(e) => setNewCoupon({ ...newCoupon, maxDiscountCap: e.target.value })}
                            style={{ width: '100%', padding: '0.45rem 0.75rem', background: '#0a1628', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', color: '#ffffff', fontSize: '0.85rem' }}
                          />
                        </div>

                        <div>
                          <label style={{ fontSize: '0.74rem', color: '#94a3b8', display: 'block', marginBottom: '0.25rem' }}>Usage Limit (# Redemptions)</label>
                          <input
                            type="number"
                            min="1"
                            placeholder="Optional (e.g. 20)"
                            value={newCoupon.maxRedemptions}
                            onChange={(e) => setNewCoupon({ ...newCoupon, maxRedemptions: e.target.value })}
                            style={{ width: '100%', padding: '0.45rem 0.75rem', background: '#0a1628', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', color: '#ffffff', fontSize: '0.85rem' }}
                          />
                        </div>
                      </div>

                      {couponError && (
                        <div style={{ color: '#f87171', fontSize: '0.78rem' }}>{couponError}</div>
                      )}

                      <button
                        type="submit"
                        disabled={couponSubmitting}
                        style={{
                          alignSelf: 'flex-start',
                          padding: '0.5rem 1.25rem',
                          background: 'var(--gold, #c9a03c)',
                          color: '#0a1e42',
                          fontWeight: 800,
                          fontSize: '0.85rem',
                          borderRadius: '6px',
                          border: 'none',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.4rem',
                          marginTop: '0.35rem',
                        }}
                      >
                        <Plus style={{ width: '14px', height: '14px' }} />
                        <span>{couponSubmitting ? 'Creating...' : 'Create & Activate Coupon'}</span>
                      </button>
                    </form>
                  </div>

                  {/* Active Coupons List */}
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#f8fafc', marginBottom: '0.75rem' }}>
                      Active Coupons ({coupons.length})
                    </h4>

                    {coupons.length === 0 ? (
                      <div style={{ textAlign: 'center', padding: '2rem', color: '#94a3b8', background: 'rgba(15, 23, 42, 0.4)', borderRadius: '8px' }}>
                        No coupons created yet. Create one above to offer discounts to VIP customers or seasonal promotions.
                      </div>
                    ) : (
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '0.75rem' }}>
                        {coupons.map((c) => (
                          <div
                            key={c.code}
                            style={{
                              background: 'rgba(15, 23, 42, 0.7)',
                              border: '1px solid rgba(255, 255, 255, 0.1)',
                              borderRadius: '10px',
                              padding: '1rem',
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'flex-start',
                            }}
                          >
                            <div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                                <span style={{ fontFamily: 'var(--mono, monospace)', fontWeight: 900, color: 'var(--gold, #c9a03c)', fontSize: '1rem' }}>
                                  {c.code}
                                </span>
                                <span style={{ fontSize: '0.7rem', padding: '2px 6px', borderRadius: '4px', background: 'rgba(16, 185, 129, 0.15)', color: '#10B981', fontWeight: 800 }}>
                                  {c.type === 'percent' ? `${c.value}% OFF` : `$${c.value} CAD OFF`}
                                </span>
                              </div>

                              <div style={{ fontSize: '0.76rem', color: '#94a3b8', display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
                                <div>&bull; Max Cap: <strong>{c.maxDiscountCap ? `$${c.maxDiscountCap} CAD` : 'Uncapped'}</strong></div>
                                <div>&bull; Usage: <strong>{c.usedCount || 0} / {c.maxRedemptions || 'Unlimited'}</strong> redeemed</div>
                              </div>
                            </div>

                            <button
                              onClick={() => handleDeleteCoupon(c.code)}
                              style={{
                                background: 'transparent',
                                border: 'none',
                                color: '#f87171',
                                cursor: 'pointer',
                                padding: '0.3rem',
                              }}
                              title="Delete coupon"
                            >
                              <Trash2 style={{ width: '15px', height: '15px' }} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 4: FAILED / ABANDONED LEADS */}
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

        {/* Reschedule Modal Popup */}
        {reschedulingBooking && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 100000,
              background: 'rgba(0, 0, 0, 0.7)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1rem',
            }}
          >
            <div
              style={{
                width: '100%',
                maxWidth: '440px',
                background: '#0d1b2e',
                border: '1.5px solid var(--gold, #c9a03c)',
                borderRadius: '12px',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: '#f8fafc' }}>
                  Reschedule Appointment
                </h4>
                <button
                  onClick={() => setReschedulingBooking(null)}
                  style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
                >
                  <X style={{ width: '18px', height: '18px' }} />
                </button>
              </div>

              <div style={{ fontSize: '0.82rem', color: '#cbd5e1' }}>
                Customer: <strong>{reschedulingBooking.customer?.name}</strong> ({reschedulingBooking.id})
              </div>

              <form onSubmit={handleSaveReschedule} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div>
                  <label style={{ fontSize: '0.76rem', color: '#94a3b8', display: 'block', marginBottom: '0.25rem' }}>
                    New Appointment Date *
                  </label>
                  <input
                    type="date"
                    value={rescheduleDate}
                    onChange={(e) => setRescheduleDate(e.target.value)}
                    required
                    style={{ width: '100%', padding: '0.5rem', background: '#0a1628', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', color: '#ffffff' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.76rem', color: '#94a3b8', display: 'block', marginBottom: '0.25rem' }}>
                    New Time Slot *
                  </label>
                  <select
                    value={rescheduleSlot}
                    onChange={(e) => setRescheduleSlot(e.target.value)}
                    style={{ width: '100%', padding: '0.5rem', background: '#0a1628', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', color: '#ffffff' }}
                  >
                    {calendarHours.map(h => (
                      <option key={h} value={h}>{h}</option>
                    ))}
                  </select>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                  <button
                    type="button"
                    onClick={() => setReschedulingBooking(null)}
                    style={{ padding: '0.45rem 0.85rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', color: '#cbd5e1', cursor: 'pointer' }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{ padding: '0.45rem 1rem', background: 'var(--gold, #c9a03c)', color: '#0a1e42', border: 'none', borderRadius: '6px', fontWeight: 800, cursor: 'pointer' }}
                  >
                    Confirm Reschedule
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
