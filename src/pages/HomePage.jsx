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
  Flame, 
  Building2, 
  Droplets,
  Layers,
  ChevronRight,
  ExternalLink,
  MessageCircle,
  Clock,
  MapPin
} from 'lucide-react';
import Hero from '../components/Hero';
import { useRouter } from '../context/RouterContext';

export default function HomePage({ onOpenBooking }) {
  const { navigate } = useRouter();

  // Top featured reviews for the home page showcase
  const topReviews = [
    {
      stars: 5,
      quote: 'Very helpful and excellent work. Thank you! Gleaming after 5 years of neglect.',
      vehicle: 'Subaru Crosstrek',
      badge: 'Gold Deep Clean',
      author: 'Verified Kingston Motorist',
    },
    {
      stars: 5,
      quote: 'I had an amazing experience! Best car wash in town. Mirror finish on black paint.',
      vehicle: 'Kia Seltos & Mitsubishi RVR',
      badge: 'Full Detail & Hand Wash',
      author: 'Pickup Inspection Log',
    },
    {
      stars: 5,
      quote: 'Amazing and spot on! Sparkle everywhere, great job! Very satisfied.',
      vehicle: 'Hyundai Sonata',
      badge: 'Complete Interior & Steam',
      author: 'Verified Kingston Motorist',
    },
    {
      stars: 5,
      quote: 'Looks excellent. Was a hard job with heavy gravel and mud — they did well.',
      vehicle: 'Commercial Ford Truck',
      badge: 'Fleet Cabin Restoration',
      author: 'Commercial Fleet Driver',
    },
    {
      stars: 5,
      quote: 'Nicely thorough; greatly appreciate the weekend service effort and attention to detail.',
      vehicle: 'Buick Allure',
      badge: 'Weekend Full Detail',
      author: 'Pickup Inspection Log',
    },
    {
      stars: 5,
      quote: 'Excellent! Great job on tough Ontario road salt stains. Seats and carpets look brand new.',
      vehicle: 'Toyota Sienna',
      badge: 'Salt Stain Extraction',
      author: 'Verified Kingston Motorist',
    },
  ];

  const featuredServices = [
    {
      id: 'wash',
      tag: 'Express & Scratch-Free',
      title: 'Precision Hand Car Wash',
      price: 'From $30 CAD',
      desc: 'pH-neutral snow foam, two-bucket grit guard wash, wheel face & tire dressing, and plush microfibre drying. Zero spinning nylon brushes.',
      perks: ['pH-Neutral Snow Foam', 'Two-Bucket Hand Method', 'Wheels & Tire Dressing', 'Zero Swirl Marks'],
      route: '/services',
      hash: 'wash',
    },
    {
      id: 'packages',
      tag: 'Most Popular',
      highlight: true,
      title: 'Complete Detailing Packages',
      price: 'Silver $180 · Gold $220 · Diamond $320',
      desc: 'Deep interior vacuuming, 305°F hospital-grade steam sanitation, heated hot-water carpet extraction, road salt removal, and exterior hand wash.',
      perks: ['Carpet & Seat Extraction', 'Winter Road Salt Removal', 'Leather Deep Clean & UV Guard', 'Clay Bar Decontamination'],
      route: '/services',
      hash: 'packages',
    },
    {
      id: 'coating',
      tag: 'CARFAX Canada Partner',
      title: 'System X Ceramic Coating',
      price: 'From $449 CAD',
      desc: 'Aerospace-grade 9H+ permanent ceramic coating with machine paint correction. Officially registered to your vehicle VIN on CARFAX Canada.',
      perks: ['CARFAX Service Record', 'Extreme Hydrophobic Gloss', '1-Stage / 2-Stage Correction', '3 to 10-Yr Warranties'],
      route: '/ceramic-coating',
      hash: 'coating',
    },
    {
      id: 'fleet',
      tag: 'Commercial & Marinas',
      title: 'Fleet & Marine Detailing',
      price: 'Volume Rates & Custom Quotes',
      desc: 'Priority turnaround for police, corporate & dealership fleets. Mobile dockside boat washing and gelcoat compounding at Kingston marinas.',
      perks: ['Net-15 / Net-30 Invoicing', 'Dedicated Bay Scheduling', 'Mobile Marine Slip-Side', 'Gelcoat Oxidation Removal'],
      route: '/fleets-marine',
      hash: 'fleets',
    },
  ];

  return (
    <div className="home-page-layout">
      
      {/* 1. Hero Section */}
      <Hero onOpenBooking={onOpenBooking} />

      {/* 2. Trust Badges Strip */}
      <section style={{ background: 'var(--surface-card)', borderBottom: '1px solid var(--surface-border)', padding: '1.25rem 1rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{ background: 'rgba(201, 160, 60, 0.15)', padding: '0.55rem', borderRadius: '8px', color: 'var(--gold-primary)' }}>
              <Star style={{ width: '1.25rem', height: '1.25rem', fill: 'var(--gold-primary)' }} />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.98rem', color: 'var(--heading-color)' }}>4.9 / 5.0 Star Rated</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--muted-color)', fontFamily: 'var(--mono)' }}>16+ Verified Customer Logs</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{ background: 'rgba(59, 130, 246, 0.15)', padding: '0.55rem', borderRadius: '8px', color: '#60A5FA' }}>
              <Building2 style={{ width: '1.25rem', height: '1.25rem' }} />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.98rem', color: 'var(--heading-color)' }}>Heated Indoor Bays</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--muted-color)', fontFamily: 'var(--mono)' }}>36 Joseph St, Kingston, ON</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{ background: 'rgba(16, 185, 129, 0.15)', padding: '0.55rem', borderRadius: '8px', color: '#34D399' }}>
              <ShieldCheck style={{ width: '1.25rem', height: '1.25rem' }} />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.98rem', color: 'var(--heading-color)' }}>CARFAX Canada Verified</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--muted-color)', fontFamily: 'var(--mono)' }}>Official Service Record Entry</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{ background: 'rgba(245, 158, 11, 0.15)', padding: '0.55rem', borderRadius: '8px', color: '#FBBF24' }}>
              <Award style={{ width: '1.25rem', height: '1.25rem' }} />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.98rem', color: 'var(--heading-color)' }}>Auto-Brite Certified</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--muted-color)', fontFamily: 'var(--mono)' }}>System X &amp; Nano-Brite Installer</div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Featured Services Overview */}
      <section className="band" id="featured-services" style={{ padding: '4rem 1rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          <div className="section-head" style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
            <p className="kicker">Professional Care</p>
            <h2 style={{ fontSize: 'clamp(1.9rem, 3.5vw, 2.6rem)' }}>Our Core Detailing Services</h2>
            <p style={{ maxWidth: '680px', margin: '0.5rem auto 0', color: 'var(--muted-color)', fontSize: '1.02rem' }}>
              From maintenance hand washes to multi-stage paint correction and aerospace-grade ceramic coatings in heated indoor bays.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 270px), 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
            {featuredServices.map((svc) => (
              <div
                key={svc.id}
                className="frame"
                style={{
                  padding: '1.75rem 1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderRadius: '12px',
                  position: 'relative',
                  border: svc.highlight ? '2px solid var(--gold)' : '1px solid var(--surface-border)',
                  background: svc.highlight ? 'linear-gradient(180deg, rgba(201, 160, 60, 0.08) 0%, var(--surface-card) 100%)' : 'var(--surface-card)',
                  boxShadow: svc.highlight ? '0 8px 30px rgba(201, 160, 60, 0.15)' : 'none',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <span 
                      className="card-badge" 
                      style={{ 
                        background: svc.highlight ? 'var(--gold)' : 'var(--chip-inactive-bg)', 
                        color: svc.highlight ? '#0A1E42' : 'var(--gold-primary)',
                        fontWeight: 800,
                      }}
                    >
                      {svc.tag}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--heading-color)', margin: '0 0 0.5rem' }}>
                    {svc.title}
                  </h3>

                  <div style={{ fontFamily: 'var(--mono)', fontSize: '0.95rem', fontWeight: 800, color: 'var(--gold-primary)', marginBottom: '0.9rem' }}>
                    {svc.price}
                  </div>

                  <p style={{ fontSize: '0.9rem', color: 'var(--muted-color)', lineHeight: 1.55, margin: '0 0 1.25rem' }}>
                    {svc.desc}
                  </p>

                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {svc.perks.map((p, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-main)' }}>
                        <CheckCircle style={{ width: '0.9rem', height: '0.9rem', color: 'var(--gold-primary)', flexShrink: 0 }} />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', borderTop: '1px solid var(--surface-border)', paddingTop: '1.25rem' }}>
                  <button
                    type="button"
                    onClick={() => navigate(svc.route, svc.hash)}
                    className="btn btn--cream"
                    style={{ width: '100%', minHeight: '40px', fontSize: '0.86rem', justifyContent: 'center' }}
                  >
                    <span>View Details &amp; Customizer</span>
                    <ArrowRight style={{ width: '0.85rem', height: '0.85rem' }} />
                  </button>
                  <button
                    type="button"
                    onClick={onOpenBooking}
                    className="btn btn--gold"
                    style={{ width: '100%', minHeight: '40px', fontSize: '0.86rem', justifyContent: 'center' }}
                  >
                    <Calendar style={{ width: '0.85rem', height: '0.85rem' }} />
                    <span>Book Service</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <button
              type="button"
              onClick={() => navigate('/services')}
              className="btn btn--gold"
              style={{ minHeight: '48px', padding: '0 2rem', fontSize: '1rem', fontWeight: 800 }}
            >
              <span>Explore Complete 2026 Rate Card &amp; Instant Quote Builder</span>
              <ArrowRight style={{ width: '1.1rem', height: '1.1rem' }} />
            </button>
          </div>

        </div>
      </section>

      {/* 4. REVIEWS & TESTIMONIALS SECTION (Prominently featured per user request) */}
      <section className="band band--tint" id="reviews" style={{ padding: '4.5rem 1rem', borderTop: '1px solid var(--surface-border)', borderBottom: '1px solid var(--surface-border)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          <div className="section-head" style={{ marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span className="hero-kicker-badge" style={{ background: 'rgba(201, 160, 60, 0.15)', color: 'var(--gold-primary)', borderColor: 'var(--gold)' }}>
                ⭐ 100% Verified Customer Feedback
              </span>
            </div>
            <h2 style={{ fontSize: 'clamp(1.9rem, 3.5vw, 2.6rem)' }}>What Kingston Motorists Say About Us</h2>
            <p style={{ maxWidth: '720px', color: 'var(--muted-color)', fontSize: '1.02rem', lineHeight: 1.6 }}>
              Real handwritten feedback collected on our shop clipboard right when customers pick up their vehicles at 36 Joseph St. Honest, unfiltered words from everyday Kingston drivers.
            </p>
          </div>

          {/* Stats Bar */}
          <div 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '2.5rem', 
              flexWrap: 'wrap', 
              background: 'var(--surface-card)', 
              padding: '1.25rem 1.75rem', 
              borderRadius: '12px', 
              border: '1px solid var(--surface-border)', 
              marginBottom: '2.5rem' 
            }}
          >
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem' }}>
              <span style={{ fontFamily: 'var(--display)', fontSize: '2.8rem', fontWeight: 900, color: 'var(--heading-color)', lineHeight: 1 }}>
                4.9
              </span>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', gap: '2px', color: 'var(--gold)' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} style={{ width: '1rem', height: '1rem', fill: 'var(--gold)', color: 'var(--gold)' }} />
                  ))}
                </div>
                <span style={{ fontFamily: 'var(--mono)', fontSize: '0.78rem', color: 'var(--muted-color)' }}>
                  Average Rating
                </span>
              </div>
            </div>

            <div style={{ height: '36px', width: '1px', background: 'var(--surface-border)', display: 'none' }} className="stats-divider" />

            <div>
              <div style={{ fontWeight: 800, fontSize: '1.15rem', color: 'var(--heading-color)' }}>16 Verified Log Sheets</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--gold-primary)', fontFamily: 'var(--mono)' }}>15 Five-Star Ratings</div>
            </div>

            <div>
              <div style={{ fontWeight: 800, fontSize: '1.15rem', color: 'var(--heading-color)' }}>Zero Swirl Guarantee</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--gold-primary)', fontFamily: 'var(--mono)' }}>Hand Wash &amp; Heated Steam Only</div>
            </div>

            <div style={{ marginLeft: 'auto' }}>
              <button
                type="button"
                onClick={() => navigate('/reviews')}
                className="btn btn--cream"
                style={{ fontSize: '0.86rem', padding: '0.45rem 1rem' }}
              >
                <span>View All Clipboard Logs</span>
                <ChevronRight style={{ width: '0.9rem', height: '0.9rem' }} />
              </button>
            </div>
          </div>

          {/* Reviews Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
            {topReviews.map((r, idx) => (
              <div
                key={idx}
                className="frame"
                style={{
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderRadius: '12px',
                  background: 'var(--surface-card)',
                  border: '1px solid var(--surface-border)',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.04)',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <div style={{ display: 'flex', gap: '3px', color: 'var(--gold)' }}>
                      {[...Array(r.stars)].map((_, i) => (
                        <Star key={i} style={{ width: '1rem', height: '1rem', fill: 'var(--gold)', color: 'var(--gold)' }} />
                      ))}
                    </div>
                    <span 
                      style={{ 
                        fontSize: '0.72rem', 
                        fontFamily: 'var(--mono)', 
                        padding: '0.2rem 0.5rem', 
                        borderRadius: '4px', 
                        background: 'rgba(201, 160, 60, 0.12)', 
                        color: 'var(--gold-primary)',
                        fontWeight: 700,
                      }}
                    >
                      {r.badge}
                    </span>
                  </div>

                  <blockquote style={{ margin: '0 0 1rem', fontSize: '0.98rem', color: 'var(--heading-color)', lineHeight: 1.55, fontStyle: 'italic' }}>
                    "{r.quote}"
                  </blockquote>
                </div>

                <div style={{ borderTop: '1px dashed var(--surface-border)', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.88rem', color: 'var(--gold-primary)' }}>
                      {r.vehicle}
                    </strong>
                    <span style={{ fontSize: '0.75rem', color: 'var(--muted-color)', fontFamily: 'var(--mono)' }}>
                      {r.author}
                    </span>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: '#10B981', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                    <CheckCircle style={{ width: '0.75rem', height: '0.75rem' }} />
                    Verified
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Physical Clipboard Photos Preview */}
          <div style={{ background: 'var(--surface-card)', border: '1px solid var(--surface-border)', borderRadius: '12px', padding: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', alignItems: 'center' }}>
            <div>
              <span className="card-badge" style={{ marginBottom: '0.5rem' }}>Authentic Proof</span>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--heading-color)', margin: '0 0 0.4rem' }}>
                Signed Customer Pickup Slips
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--muted-color)', margin: '0 0 1rem', lineHeight: 1.5 }}>
                Before we built our online booking system, every pickup was logged with pen and paper right in our shop.
              </p>
              <button
                type="button"
                onClick={() => navigate('/reviews')}
                className="btn btn--gold"
                style={{ fontSize: '0.85rem', padding: '0.45rem 1rem' }}
              >
                <span>Inspect All 3 Physical Sheets</span>
                <ArrowRight style={{ width: '0.9rem', height: '0.9rem' }} />
              </button>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
              <img 
                src="/images/review_sheet_18.webp" 
                alt="Physical customer review sheet 1" 
                style={{ width: '130px', height: '95px', objectFit: 'cover', borderRadius: '6px', border: '1px solid var(--surface-border)' }} 
              />
              <img 
                src="/images/review_sheet_19.webp" 
                alt="Physical customer review sheet 2" 
                style={{ width: '130px', height: '95px', objectFit: 'cover', borderRadius: '6px', border: '1px solid var(--surface-border)' }} 
              />
              <img 
                src="/images/review_sheet_20.webp" 
                alt="Physical customer review sheet 3" 
                style={{ width: '130px', height: '95px', objectFit: 'cover', borderRadius: '6px', border: '1px solid var(--surface-border)' }} 
              />
            </div>
          </div>

        </div>
      </section>

      {/* 5. Why Choose an Indoor Shop (Compact & Persuasive) */}
      <section className="band" id="why-shop" style={{ padding: '4.5rem 1rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: '3rem', alignItems: 'center' }}>
            <div>
              <p className="kicker">Why a Shop, Not a Driveway</p>
              <h2 style={{ fontSize: 'clamp(1.9rem, 3.5vw, 2.5rem)', lineHeight: 1.25, margin: '0 0 1rem' }}>
                Some detailing simply cannot be done in a parking lot.
              </h2>
              <p style={{ color: 'var(--muted-color)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Ceramic coatings require clean, climate-controlled curing at 20°C. In an outdoor driveway, windborne sand and tree pollen contaminate wet coatings, while high humidity ruins paint bond. At 36 Joseph St, your car receives professional indoor treatment year-round.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <div className="check-badge" style={{ marginTop: '3px' }}>
                    <CheckCircle style={{ width: '14px', height: '14px', color: 'var(--gold-primary)' }} />
                  </div>
                  <div>
                    <strong style={{ display: 'block', color: 'var(--heading-color)', fontSize: '0.98rem' }}>
                      Hospital-Grade 305°F Steam Sanitation
                    </strong>
                    <span style={{ fontSize: '0.86rem', color: 'var(--muted-color)' }}>
                      Italian-made thermal extraction sanitizes seats and dissolves deep winter salt without leaving chemical odors.
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <div className="check-badge" style={{ marginTop: '3px' }}>
                    <CheckCircle style={{ width: '14px', height: '14px', color: 'var(--gold-primary)' }} />
                  </div>
                  <div>
                    <strong style={{ display: 'block', color: 'var(--heading-color)', fontSize: '0.98rem' }}>
                      High-CRI LED Paint Inspection Lighting
                    </strong>
                    <span style={{ fontSize: '0.86rem', color: 'var(--muted-color)' }}>
                      Swirl marks and clear-coat defects invisible in daylight are precisely revealed and corrected.
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <div className="check-badge" style={{ marginTop: '3px' }}>
                    <CheckCircle style={{ width: '14px', height: '14px', color: 'var(--gold-primary)' }} />
                  </div>
                  <div>
                    <strong style={{ display: 'block', color: 'var(--heading-color)', fontSize: '0.98rem' }}>
                      Digital Ultrasonic Paint Depth Gauging
                    </strong>
                    <span style={{ fontSize: '0.86rem', color: 'var(--muted-color)' }}>
                      We measure clear-coat thickness before spinning a machine polisher to protect factory paint.
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => navigate('/about')}
                className="btn btn--cream"
                style={{ fontSize: '0.92rem', padding: '0.65rem 1.25rem' }}
              >
                <span>Read More About Our Kingston Studio</span>
                <ArrowRight style={{ width: '0.9rem', height: '0.9rem' }} />
              </button>
            </div>

            {/* Visual Box with CARFAX Canada Callout */}
            <div 
              style={{ 
                background: 'var(--surface-card)', 
                border: '1px solid var(--surface-border)', 
                borderRadius: '16px', 
                padding: '2rem',
                boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div style={{ background: '#0A1E42', padding: '0.6rem 0.9rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <span style={{ color: '#fff', fontWeight: 900, fontSize: '1.1rem', letterSpacing: '0.05em' }}>CARFAX</span>
                  <span style={{ color: '#60A5FA', fontSize: '0.65rem', display: 'block', fontWeight: 800, textTransform: 'uppercase' }}>Canada</span>
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: 'var(--heading-color)' }}>
                    Verifiable Vehicle Value Protection
                  </h4>
                  <span style={{ fontSize: '0.8rem', color: 'var(--gold-primary)', fontFamily: 'var(--mono)' }}>
                    Permanent Service Record Integration
                  </span>
                </div>
              </div>

              <p style={{ fontSize: '0.92rem', color: 'var(--muted-color)', lineHeight: 1.55, marginBottom: '1.5rem' }}>
                Every System X ceramic coating package we install is officially registered to your vehicle's VIN on CARFAX Canada. Future buyers and dealerships can verify your paint protection was performed by an authorized facility.
              </p>

              <div style={{ background: 'var(--bg-page)', borderRadius: '10px', padding: '1rem', border: '1px solid var(--surface-border)', marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '0.78rem', fontFamily: 'var(--mono)', color: 'var(--gold-primary)', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                  Sample CARFAX Service Entry:
                </div>
                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--heading-color)', marginBottom: '0.2rem' }}>
                  ✓ System X Pro 9H Ceramic Coating Installed
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--muted-color)' }}>
                  Installed by K-Town Auto Spa (36 Joseph St, Kingston) · 5-Year Registered Warranty
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={() => navigate('/ceramic-coating')}
                  className="btn btn--gold"
                  style={{ flex: '1 1 180px', minHeight: '40px', fontSize: '0.85rem', justifyContent: 'center' }}
                >
                  <span>Explore Ceramic Coatings</span>
                  <ArrowRight style={{ width: '0.85rem', height: '0.85rem' }} />
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 6. Real Work Gallery Highlights */}
      <section className="band band--tint" id="work-preview" style={{ padding: '4.5rem 1rem', borderTop: '1px solid var(--surface-border)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
            <div>
              <p className="kicker">Real Vehicles · Real Bays</p>
              <h2 style={{ fontSize: 'clamp(1.9rem, 3.5vw, 2.5rem)', margin: 0 }}>
                Recent Work From Our Kingston Bays
              </h2>
            </div>
            <button
              type="button"
              onClick={() => navigate('/about', 'work')}
              className="btn btn--cream"
              style={{ fontSize: '0.88rem' }}
            >
              <span>See Full Gallery &amp; Ministry Fleet Proof</span>
              <ArrowRight style={{ width: '0.9rem', height: '0.9rem' }} />
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
            
            {/* Police Footwell Before & After */}
            <div className="frame" style={{ padding: '0.85rem', borderRadius: '12px', background: 'var(--surface-card)' }}>
              <div style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden', aspectRatio: '16/10' }}>
                <img 
                  src="/images/police_footwell_before_after.webp" 
                  alt="Patrol vehicle driver footwell before and after salt extraction"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <span className="card-badge" style={{ position: 'absolute', top: '10px', left: '10px', background: 'var(--gold-primary)', color: '#0A1E42' }}>
                  Before &amp; After
                </span>
              </div>
              <div style={{ marginTop: '0.85rem' }}>
                <strong style={{ display: 'block', fontSize: '1rem', color: 'var(--heading-color)', marginBottom: '0.2rem' }}>
                  Police Patrol Unit — Driver Footwell
                </strong>
                <span style={{ fontSize: '0.84rem', color: 'var(--muted-color)', lineHeight: 1.4, display: 'block' }}>
                  Heavy winter brine &amp; road salt dissolved and extracted with 305°F steam.
                </span>
              </div>
            </div>

            {/* Ministry Crew Pickup */}
            <div className="frame" style={{ padding: '0.85rem', borderRadius: '12px', background: 'var(--surface-card)' }}>
              <div style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden', aspectRatio: '16/10' }}>
                <img 
                  src="/images/ministry_pickup_cab_clean.webp" 
                  alt="Ministry pickup truck cab interior deep clean"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <span className="card-badge" style={{ position: 'absolute', top: '10px', left: '10px', background: 'var(--gold-primary)', color: '#0A1E42' }}>
                  Before &amp; After
                </span>
              </div>
              <div style={{ marginTop: '0.85rem' }}>
                <strong style={{ display: 'block', fontSize: '1rem', color: 'var(--heading-color)', marginBottom: '0.2rem' }}>
                  Ministry Crew Pickup — Cabin Deep Clean
                </strong>
                <span style={{ fontSize: '0.84rem', color: 'var(--muted-color)', lineHeight: 1.4, display: 'block' }}>
                  Job-site clay and gravel sanitized and restored to factory-matte finish.
                </span>
              </div>
            </div>

            {/* Wash Bay Action */}
            <div className="frame" style={{ padding: '0.85rem', borderRadius: '12px', background: 'var(--surface-card)' }}>
              <div style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden', aspectRatio: '16/10' }}>
                <img 
                  src="/images/police_suv_side_bay.webp" 
                  alt="Patrol SUV in wash bay"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <span className="card-badge" style={{ position: 'absolute', top: '10px', left: '10px', background: 'rgba(0,0,0,0.7)', color: '#fff' }}>
                  Wash Bay
                </span>
              </div>
              <div style={{ marginTop: '0.85rem' }}>
                <strong style={{ display: 'block', fontSize: '1rem', color: 'var(--heading-color)', marginBottom: '0.2rem' }}>
                  Heated Indoor Wash Bay
                </strong>
                <span style={{ fontSize: '0.84rem', color: 'var(--muted-color)', lineHeight: 1.4, display: 'block' }}>
                  Dedicated touchless pre-rinse, wheel wells, and pH-neutral snow foam bath.
                </span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 7. Fast FAQs & Location / Hours Callout */}
      <section className="band" id="contact-preview" style={{ padding: '4.5rem 1rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: '2.5rem' }}>
            
            {/* Quick Location & Hours Card */}
            <div 
              style={{ 
                background: 'var(--surface-card)', 
                border: '2px solid var(--gold)', 
                borderRadius: '16px', 
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <span className="card-badge" style={{ marginBottom: '0.75rem' }}>Visit Our Studio</span>
                <h3 style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--heading-color)', margin: '0 0 1rem' }}>
                  K-Town Auto Spa
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <MapPin style={{ width: '1.2rem', height: '1.2rem', color: 'var(--gold-primary)', flexShrink: 0, marginTop: '3px' }} />
                    <div>
                      <strong style={{ display: 'block', color: 'var(--heading-color)', fontSize: '1rem' }}>
                        36 Joseph St, Kingston, ON K7K 2H5
                      </strong>
                      <span style={{ fontSize: '0.84rem', color: 'var(--muted-color)' }}>
                        Heated indoor bays · Convenient central Kingston drop-off
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <Clock style={{ width: '1.2rem', height: '1.2rem', color: 'var(--gold-primary)', flexShrink: 0, marginTop: '3px' }} />
                    <div>
                      <strong style={{ display: 'block', color: 'var(--heading-color)', fontSize: '1rem' }}>
                        Monday – Saturday: 8:00 AM – 5:00 PM
                      </strong>
                      <span style={{ fontSize: '0.84rem', color: 'var(--muted-color)' }}>
                        Sunday: Closed for deep facility maintenance
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <Phone style={{ width: '1.2rem', height: '1.2rem', color: 'var(--gold-primary)', flexShrink: 0, marginTop: '3px' }} />
                    <div>
                      <strong style={{ display: 'block', color: 'var(--heading-color)', fontSize: '1rem' }}>
                        647-915-3530
                      </strong>
                      <span style={{ fontSize: '0.84rem', color: 'var(--muted-color)' }}>
                        Call, text, or WhatsApp photos for an instant estimate
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={onOpenBooking}
                  className="btn btn--gold"
                  style={{ flex: '1 1 160px', minHeight: '44px', justifyContent: 'center' }}
                >
                  <Calendar style={{ width: '1rem', height: '1rem' }} />
                  <span>Book Appointment</span>
                </button>
                <a
                  href="https://maps.google.com/?q=36+Joseph+St,+Kingston,+ON+K7K+2H5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--cream"
                  style={{ flex: '1 1 140px', minHeight: '44px', justifyContent: 'center' }}
                >
                  <ExternalLink style={{ width: '0.9rem', height: '0.9rem' }} />
                  <span>Directions</span>
                </a>
              </div>
            </div>

            {/* Quick Top Questions */}
            <div>
              <p className="kicker">Got Questions?</p>
              <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--heading-color)', margin: '0 0 1.25rem' }}>
                Frequently Asked
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', marginBottom: '1.5rem' }}>
                <div style={{ background: 'var(--surface-card)', border: '1px solid var(--surface-border)', borderRadius: '10px', padding: '1rem' }}>
                  <h4 style={{ margin: '0 0 0.4rem', fontSize: '0.96rem', color: 'var(--heading-color)', fontWeight: 700 }}>
                    How long does a full detail take?
                  </h4>
                  <p style={{ margin: 0, fontSize: '0.86rem', color: 'var(--muted-color)', lineHeight: 1.5 }}>
                    Silver takes 2.5–3.5 hours, Gold takes 3.5–5 hours, and Diamond takes 5–7 hours. Ceramic coatings require 24 hours including cure time.
                  </p>
                </div>

                <div style={{ background: 'var(--surface-card)', border: '1px solid var(--surface-border)', borderRadius: '10px', padding: '1rem' }}>
                  <h4 style={{ margin: '0 0 0.4rem', fontSize: '0.96rem', color: 'var(--heading-color)', fontWeight: 700 }}>
                    Can you remove heavy white Ontario winter road salt?
                  </h4>
                  <p style={{ margin: 0, fontSize: '0.86rem', color: 'var(--muted-color)', lineHeight: 1.5 }}>
                    Yes! We use heated neutralizing solution and 305°F hot-water extraction to dissolve hardened crusts without damaging carpet fibers.
                  </p>
                </div>

                <div style={{ background: 'var(--surface-card)', border: '1px solid var(--surface-border)', borderRadius: '10px', padding: '1rem' }}>
                  <h4 style={{ margin: '0 0 0.4rem', fontSize: '0.96rem', color: 'var(--heading-color)', fontWeight: 700 }}>
                    What payment methods do you accept?
                  </h4>
                  <p style={{ margin: 0, fontSize: '0.86rem', color: 'var(--muted-color)', lineHeight: 1.5 }}>
                    Interac e-Transfer (0% fee), Cash in Shop (0% fee), and all major Credit/Debit cards via Stripe (3% fee).
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => navigate('/contact', 'faq')}
                className="btn btn--cream"
                style={{ fontSize: '0.88rem' }}
              >
                <span>Read Full Detailing FAQ</span>
                <ArrowRight style={{ width: '0.9rem', height: '0.9rem' }} />
              </button>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
