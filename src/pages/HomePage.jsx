import React from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  Star, 
  ArrowRight, 
  Calendar, 
  Phone, 
  CheckCircle, 
  Award, 
  Building2, 
  Droplets,
  ExternalLink,
  MessageCircle,
  Clock,
  MapPin,
  Flame
} from 'lucide-react';
import Hero from '../components/Hero';
import { useRouter } from '../context/RouterContext';

export default function HomePage({ onOpenBooking }) {
  const { navigate } = useRouter();

  // 3 high-impact authentic reviews
  const featuredReviews = [
    {
      quote: 'Very helpful and excellent work. Thank you! Gleaming after 5 years of neglect.',
      vehicle: 'Subaru Crosstrek',
      badge: 'Gold Deep Clean',
    },
    {
      quote: 'Best car wash in town! Sparkle everywhere, mirror finish on black paint.',
      vehicle: 'Kia Seltos & Mitsubishi RVR',
      badge: 'Full Detail & Hand Wash',
    },
    {
      quote: 'Excellent! Great job on tough Ontario road salt stains. Seats and carpets look brand new.',
      vehicle: 'Toyota Sienna',
      badge: 'Winter Salt Extraction',
    },
  ];

  // 3 core detailing tiers (Silver, Gold, Diamond)
  const coreTiers = [
    {
      name: 'Silver Refresh',
      tag: 'Essential Care',
      price: 'From $180',
      desc: 'Hand wash, wheel & tire dressing, interior vacuum (seats, carpets, trunk), dash wipe-down, glass & rubber mats washed.',
      isPopular: false,
    },
    {
      name: 'Gold Deep Clean',
      tag: '⭐ Most Popular',
      price: 'From $220',
      desc: 'Everything in Silver + 305°F steam sanitation, hot-water carpet & seat shampoo extraction, winter salt removal, and spray sealant.',
      isPopular: true,
    },
    {
      name: 'Diamond Restoration',
      tag: 'Full Restoration',
      price: 'From $320',
      desc: 'Everything in Gold + clay bar decon, machine wax polish, engine bay degrease & dress, pet hair removal, and 6-month ceramic sealant.',
      isPopular: false,
    },
  ];

  return (
    <div className="home-page-layout">
      
      {/* 1. Hero */}
      <Hero onOpenBooking={onOpenBooking} />

      {/* 2. Compact Trust Strip */}
      <section style={{ background: 'var(--surface-card)', borderBottom: '1px solid var(--surface-border)', padding: '1rem 1rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap', gap: '1.25rem' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
            <Star style={{ width: '1.15rem', height: '1.15rem', color: 'var(--gold-primary)', fill: 'var(--gold-primary)' }} />
            <span style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--heading-color)' }}>
              4.9 / 5.0 Star Rated <span style={{ color: 'var(--muted-color)', fontWeight: 500 }}>(16+ Verified Logs)</span>
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
            <Building2 style={{ width: '1.15rem', height: '1.15rem', color: '#60A5FA' }} />
            <span style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--heading-color)' }}>
              Heated Indoor Bays <span style={{ color: 'var(--muted-color)', fontWeight: 500 }}>(36 Joseph St)</span>
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
            <ShieldCheck style={{ width: '1.15rem', height: '1.15rem', color: '#34D399' }} />
            <span style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--heading-color)' }}>
              CARFAX Canada Partner <span style={{ color: 'var(--muted-color)', fontWeight: 500 }}>(VIN Recorded)</span>
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
            <Award style={{ width: '1.15rem', height: '1.15rem', color: '#FBBF24' }} />
            <span style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--heading-color)' }}>
              Auto-Brite &amp; System X Certified
            </span>
          </div>

        </div>
      </section>

      {/* 3. Core Detailing Packages (Compact 3-Card Grid) */}
      <section style={{ padding: '3.5rem 1rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <p className="kicker" style={{ margin: '0 0 0.4rem' }}>Transparent Pricing</p>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.4rem)', fontWeight: 900, color: 'var(--heading-color)', margin: '0 0 0.4rem' }}>
              Choose Your Detailing Package
            </h2>
            <p style={{ color: 'var(--muted-color)', fontSize: '0.96rem', margin: 0 }}>
              Hand washes from $30, complete packages from $180, System X ceramic coating from $449.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
            {coreTiers.map((tier, idx) => (
              <div
                key={idx}
                style={{
                  background: tier.isPopular 
                    ? 'linear-gradient(180deg, rgba(201, 160, 60, 0.12) 0%, var(--surface-card) 100%)' 
                    : 'var(--surface-card)',
                  border: tier.isPopular ? '2px solid var(--gold)' : '1px solid var(--surface-border)',
                  borderRadius: '14px',
                  padding: '1.75rem 1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: tier.isPopular ? '0 8px 30px rgba(201, 160, 60, 0.14)' : 'none',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <span 
                      style={{ 
                        fontSize: '0.72rem', 
                        fontFamily: 'var(--mono)', 
                        fontWeight: 800, 
                        padding: '0.2rem 0.55rem', 
                        borderRadius: '4px',
                        background: tier.isPopular ? 'var(--gold)' : 'var(--chip-inactive-bg)',
                        color: tier.isPopular ? '#0A1E42' : 'var(--gold-primary)',
                      }}
                    >
                      {tier.tag}
                    </span>
                    <span style={{ fontFamily: 'var(--display)', fontSize: '1.6rem', fontWeight: 900, color: 'var(--gold-primary)' }}>
                      {tier.price} <span style={{ fontSize: '0.75rem', fontFamily: 'var(--mono)', color: 'var(--muted-color)', fontWeight: 500 }}>CAD</span>
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--heading-color)', margin: '0 0 0.5rem' }}>
                    {tier.name}
                  </h3>

                  <p style={{ fontSize: '0.88rem', color: 'var(--muted-color)', lineHeight: 1.5, margin: '0 0 1.25rem' }}>
                    {tier.desc}
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '0.6rem' }}>
                  <button
                    type="button"
                    onClick={() => navigate('/services')}
                    className="btn btn--cream"
                    style={{ flex: 1, minHeight: '38px', fontSize: '0.82rem', justifyContent: 'center' }}
                  >
                    <span>Customize</span>
                    <ArrowRight style={{ width: '0.8rem', height: '0.8rem' }} />
                  </button>
                  <button
                    type="button"
                    onClick={onOpenBooking}
                    className="btn btn--gold"
                    style={{ flex: 1, minHeight: '38px', fontSize: '0.82rem', justifyContent: 'center' }}
                  >
                    <Calendar style={{ width: '0.8rem', height: '0.8rem' }} />
                    <span>Book Now</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <button
              type="button"
              onClick={() => navigate('/services')}
              className="btn btn--outline"
              style={{ fontSize: '0.88rem', padding: '0.55rem 1.4rem' }}
            >
              <span>View Express Hand Washes &amp; Ceramic Coating Options &rarr;</span>
            </button>
          </div>

        </div>
      </section>

      {/* 4. Prominent Reviews Section (Compact & Authentic) */}
      <section style={{ background: 'var(--surface-card)', borderTop: '1px solid var(--surface-border)', borderBottom: '1px solid var(--surface-border)', padding: '3.5rem 1rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
            <div>
              <p className="kicker" style={{ margin: '0 0 0.35rem' }}>⭐ 4.9 / 5.0 Rating</p>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.3rem)', fontWeight: 900, color: 'var(--heading-color)', margin: 0 }}>
                What Kingston Drivers Say
              </h2>
            </div>
            <button
              type="button"
              onClick={() => navigate('/reviews')}
              className="btn btn--cream"
              style={{ fontSize: '0.84rem', padding: '0.4rem 0.9rem' }}
            >
              <span>View All 16 Handwritten Logs</span>
              <ArrowRight style={{ width: '0.85rem', height: '0.85rem' }} />
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '1.25rem' }}>
            {featuredReviews.map((r, idx) => (
              <div
                key={idx}
                style={{
                  background: 'var(--bg-page)',
                  border: '1px solid var(--surface-border)',
                  borderRadius: '12px',
                  padding: '1.35rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
                    <div style={{ display: 'flex', gap: '2px', color: 'var(--gold)' }}>
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} style={{ width: '0.95rem', height: '0.95rem', fill: 'var(--gold)', color: 'var(--gold)' }} />
                      ))}
                    </div>
                    <span style={{ fontSize: '0.72rem', fontFamily: 'var(--mono)', color: 'var(--gold-primary)', fontWeight: 700 }}>
                      {r.badge}
                    </span>
                  </div>

                  <blockquote style={{ margin: '0 0 1rem', fontSize: '0.94rem', color: 'var(--heading-color)', lineHeight: 1.5, fontStyle: 'italic' }}>
                    "{r.quote}"
                  </blockquote>
                </div>

                <div style={{ borderTop: '1px dashed var(--surface-border)', paddingTop: '0.65rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ fontSize: '0.85rem', color: 'var(--gold-primary)' }}>
                    {r.vehicle}
                  </strong>
                  <span style={{ fontSize: '0.75rem', color: '#10B981', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                    <CheckCircle style={{ width: '0.75rem', height: '0.75rem' }} />
                    Verified Pickup
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. Why Choose an Indoor Shop (3 Clear Pillars — Compact) */}
      <section style={{ padding: '3.5rem 1rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <p className="kicker" style={{ margin: '0 0 0.35rem' }}>Facility Advantage</p>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.3rem)', fontWeight: 900, color: 'var(--heading-color)', margin: '0 0 0.4rem' }}>
              Why a Heated Indoor Shop Matters
            </h2>
            <p style={{ color: 'var(--muted-color)', fontSize: '0.96rem', margin: 0 }}>
              Professional results that simply cannot be replicated in a driveway or parking lot.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
            
            <div style={{ background: 'var(--surface-card)', border: '1px solid var(--surface-border)', borderRadius: '12px', padding: '1.5rem' }}>
              <div style={{ background: 'rgba(59, 130, 246, 0.15)', width: '42px', height: '42px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', color: '#60A5FA' }}>
                <Building2 style={{ width: '1.25rem', height: '1.25rem' }} />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--heading-color)', margin: '0 0 0.4rem' }}>
                Climate-Controlled Bays
              </h3>
              <p style={{ fontSize: '0.86rem', color: 'var(--muted-color)', lineHeight: 1.55, margin: 0 }}>
                Stable 20°C temperature year-round ensures ceramic coatings cross-link and cure properly without windblown dust or rain ruining wet paint.
              </p>
            </div>

            <div style={{ background: 'var(--surface-card)', border: '1px solid var(--surface-border)', borderRadius: '12px', padding: '1.5rem' }}>
              <div style={{ background: 'rgba(230, 81, 0, 0.15)', width: '42px', height: '42px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', color: '#E65100' }}>
                <Flame style={{ width: '1.25rem', height: '1.25rem' }} />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--heading-color)', margin: '0 0 0.4rem' }}>
                305°F Thermal Steam Sanitization
              </h3>
              <p style={{ fontSize: '0.86rem', color: 'var(--muted-color)', lineHeight: 1.55, margin: 0 }}>
                Italian dry steam extraction dissolves hardened Ontario road salt crusts and sanitizes upholstery without soaking carpets or leaving toxic chemical odors.
              </p>
            </div>

            <div style={{ background: 'var(--surface-card)', border: '1px solid var(--surface-border)', borderRadius: '12px', padding: '1.5rem' }}>
              <div style={{ background: 'rgba(16, 185, 129, 0.15)', width: '42px', height: '42px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', color: '#10B981' }}>
                <ShieldCheck style={{ width: '1.25rem', height: '1.25rem' }} />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--heading-color)', margin: '0 0 0.4rem' }}>
                CARFAX Canada Registered
              </h3>
              <p style={{ fontSize: '0.86rem', color: 'var(--muted-color)', lineHeight: 1.55, margin: 0 }}>
                Every System X ceramic coating we apply is registered to your vehicle's VIN on CARFAX Canada, proving verified paint care for higher trade-in value.
              </p>
            </div>

          </div>

          <div style={{ textAlign: 'center' }}>
            <button
              type="button"
              onClick={() => navigate('/about')}
              className="btn btn--cream"
              style={{ fontSize: '0.86rem', padding: '0.5rem 1.25rem' }}
            >
              <span>Explore Our Shop Equipment &amp; Agency Vehicles &rarr;</span>
            </button>
          </div>

        </div>
      </section>

      {/* 6. Location, Hours & Direct Booking Banner (Compact) */}
      <section style={{ background: 'var(--surface-card)', borderTop: '2px solid var(--gold)', padding: '2.5rem 1rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
          
          <div>
            <span className="card-badge" style={{ marginBottom: '0.4rem' }}>36 Joseph St, Kingston</span>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--heading-color)', margin: '0 0 0.35rem' }}>
              Ready to Restore Your Car?
            </h3>
            <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', fontSize: '0.85rem', color: 'var(--muted-color)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Clock style={{ width: '0.9rem', height: '0.9rem', color: 'var(--gold-primary)' }} />
                Mon – Sat: 8:00 AM – 5:00 PM
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Phone style={{ width: '0.9rem', height: '0.9rem', color: 'var(--gold-primary)' }} />
                <a href="tel:+16479153530" style={{ color: 'var(--gold-primary)', textDecoration: 'none', fontWeight: 700 }}>647-915-3530</a>
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <a
              href="https://maps.google.com/?q=36+Joseph+St,+Kingston,+ON+K7K+2H5"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--cream"
              style={{ minHeight: '42px', fontSize: '0.85rem' }}
            >
              <ExternalLink style={{ width: '0.85rem', height: '0.85rem' }} />
              <span>Get Directions</span>
            </a>

            <button
              type="button"
              onClick={onOpenBooking}
              className="btn btn--gold"
              style={{ minHeight: '42px', fontSize: '0.88rem' }}
            >
              <Calendar style={{ width: '0.9rem', height: '0.9rem' }} />
              <span>Book Appointment Online</span>
            </button>
          </div>

        </div>
      </section>

    </div>
  );
}
