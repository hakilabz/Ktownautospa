import React from 'react';
import { 
  ShieldCheck, 
  Star, 
  ArrowRight, 
  Calendar, 
  Phone, 
  Check, 
  Award, 
  Building2, 
  ExternalLink,
  Clock,
  MapPin,
  Sparkles,
  Droplets,
  Flame,
  CheckCircle2
} from 'lucide-react';
import Hero from '../components/Hero';
import ReviewsSection from '../components/ReviewsSection';
import { useRouter } from '../context/RouterContext';

export default function HomePage({ onOpenBooking }) {
  const { navigate } = useRouter();

  // 3 core detailing tiers (Silver, Gold, Diamond) with transparent features
  const coreTiers = [
    {
      id: 'silver',
      name: 'Silver Refresh',
      tag: 'ESSENTIAL CARE',
      price: 'From $180',
      duration: 'Approx. 2.0 – 2.5 hrs',
      desc: 'Formulated for regular maintenance. Restores interior cleanliness and exterior shine.',
      isPopular: false,
      features: [
        'Two-bucket pH-neutral snow foam hand wash',
        'Complete interior vacuum (seats, carpets, trunk)',
        'Dashboard, center console & door panels wiped clean',
        'Interior & exterior crystal-clear glass',
        'Rubber mats washed or carpet mats blown out',
        'Wheel faces & tire cleaning with satin dressing',
      ],
    },
    {
      id: 'gold',
      name: 'Gold Deep Clean',
      tag: 'STUDIO SIGNATURE',
      price: 'From $220',
      duration: 'Approx. 3.5 – 4.5 hrs',
      desc: 'Our most requested treatment. Deep pressurized steam extraction to remove winter road salt crusts.',
      isPopular: true,
      features: [
        'Everything included in Silver Refresh',
        'Commercial 305°F dry steam cabin sanitization',
        'Deep hot-water extraction for seats & carpets',
        'Ontario road salt stain neutralization & removal',
        'Leather upholstery deep cleaned & conditioned',
        'Exterior spray sealant for paint gloss & protection',
      ],
    },
    {
      id: 'diamond',
      name: 'Diamond Restoration',
      tag: 'FULL RESTORATION',
      price: 'From $320',
      duration: 'Approx. 5.0 – 6.5 hrs',
      desc: 'Showroom overhaul with single-stage machine gloss polish and 6-month ceramic protection.',
      isPopular: false,
      features: [
        'Everything included in Gold Deep Clean',
        'Clay bar paint mechanical decontamination',
        'Single-stage machine gloss enhancement polish',
        'Engine bay steam degreased & satin UV dressed',
        'Embedded pet hair & sand extraction',
        '6-Month hydrophobic ceramic paint sealant',
      ],
    },
  ];

  return (
    <div className="home-page-layout">
      
      {/* 1. Hero Section */}
      <Hero onOpenBooking={onOpenBooking} />

      {/* 2. Editorial Trust Bar */}
      <section 
        style={{ 
          background: 'var(--surface-card)', 
          borderBottom: '1px solid var(--surface-border)', 
          padding: '1.25rem 1rem' 
        }}
      >
        <div 
          style={{ 
            maxWidth: '1200px', 
            margin: '0 auto', 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))', 
            gap: '1.25rem',
            alignItems: 'center'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(201, 160, 60, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Star style={{ width: '1.1rem', height: '1.1rem', color: 'var(--gold-primary)', fill: 'var(--gold-primary)' }} />
            </div>
            <div>
              <strong style={{ display: 'block', fontSize: '0.88rem', color: 'var(--heading-color)', lineHeight: 1.25 }}>
                4.9 / 5.0 Star Rating
              </strong>
              <span style={{ fontSize: '0.78rem', color: 'var(--muted-color)' }}>
                16+ verified in-studio pickup slips
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(59, 130, 246, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <ShieldCheck style={{ width: '1.1rem', height: '1.1rem', color: '#3B82F6' }} />
            </div>
            <div>
              <strong style={{ display: 'block', fontSize: '0.88rem', color: 'var(--heading-color)', lineHeight: 1.25 }}>
                CARFAX Canada Partner
              </strong>
              <span style={{ fontSize: '0.78rem', color: 'var(--muted-color)' }}>
                Ceramic coatings logged to your VIN
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Building2 style={{ width: '1.1rem', height: '1.1rem', color: '#10B981' }} />
            </div>
            <div>
              <strong style={{ display: 'block', fontSize: '0.88rem', color: 'var(--heading-color)', lineHeight: 1.25 }}>
                Heated Indoor Bays
              </strong>
              <span style={{ fontSize: '0.78rem', color: 'var(--muted-color)' }}>
                36 Joseph St &middot; 20°C dust-free curing
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(245, 158, 11, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Award style={{ width: '1.1rem', height: '1.1rem', color: '#D97706' }} />
            </div>
            <div>
              <strong style={{ display: 'block', fontSize: '0.88rem', color: 'var(--heading-color)', lineHeight: 1.25 }}>
                Auto-Brite &amp; System X
              </strong>
              <span style={{ fontSize: '0.78rem', color: 'var(--muted-color)' }}>
                Certified professional chemistry
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Detailing Tiers */}
      <section style={{ padding: '4rem 1rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p className="kicker" style={{ margin: '0 0 0.4rem' }}>STUDIO PACKAGES</p>
            <h2 style={{ fontSize: 'clamp(1.9rem, 3.5vw, 2.6rem)', fontWeight: 900, color: 'var(--heading-color)', margin: '0 0 0.5rem' }}>
              Complete In &amp; Out Detailing
            </h2>
            <p style={{ color: 'var(--muted-color)', fontSize: '1rem', maxWidth: '620px', margin: '0 auto', lineHeight: 1.55 }}>
              Calibrated specifically for Kingston road salt, grime, and wear. All treatments performed in our climate-controlled bays at 36 Joseph St.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '1.75rem', marginBottom: '2.5rem' }}>
            {coreTiers.map((tier) => (
              <div
                key={tier.id}
                style={{
                  background: tier.isPopular 
                    ? 'linear-gradient(180deg, rgba(201, 160, 60, 0.12) 0%, var(--surface-card) 100%)' 
                    : 'var(--surface-card)',
                  border: tier.isPopular ? '2px solid var(--gold)' : '1px solid var(--surface-border)',
                  borderRadius: '14px',
                  padding: '2rem 1.6rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: tier.isPopular ? '0 10px 32px rgba(201, 160, 60, 0.16)' : 'none',
                  position: 'relative',
                }}
              >
                <div>
                  {/* Card Header & Tag */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                    <span 
                      style={{ 
                        fontSize: '0.72rem', 
                        fontFamily: 'var(--mono)', 
                        fontWeight: 800, 
                        letterSpacing: '0.08em',
                        padding: '0.22rem 0.6rem', 
                        borderRadius: '4px',
                        background: tier.isPopular ? 'var(--gold)' : 'var(--chip-inactive-bg)',
                        color: tier.isPopular ? '#0A1E42' : 'var(--gold-primary)',
                      }}
                    >
                      {tier.tag}
                    </span>
                    <span style={{ fontSize: '0.78rem', color: 'var(--muted-color)', fontFamily: 'var(--mono)', fontWeight: 600 }}>
                      {tier.duration}
                    </span>
                  </div>

                  {/* Title & Price */}
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--heading-color)', margin: '0 0 0.35rem' }}>
                    {tier.name}
                  </h3>
                  
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem', marginBottom: '0.85rem' }}>
                    <span style={{ fontFamily: 'var(--display)', fontSize: '2rem', fontWeight: 900, color: 'var(--gold-primary)', lineHeight: 1 }}>
                      {tier.price}
                    </span>
                    <span style={{ fontSize: '0.78rem', fontFamily: 'var(--mono)', color: 'var(--muted-color)', fontWeight: 600 }}>
                      CAD
                    </span>
                  </div>

                  <p style={{ fontSize: '0.88rem', color: 'var(--muted-color)', lineHeight: 1.5, margin: '0 0 1.5rem' }}>
                    {tier.desc}
                  </p>

                  {/* Feature Checklist */}
                  <div style={{ borderTop: '1px solid var(--surface-border)', paddingTop: '1.25rem', marginBottom: '1.75rem' }}>
                    <p style={{ fontSize: '0.75rem', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--heading-color)', fontWeight: 800, margin: '0 0 0.75rem' }}>
                      Included Treatments:
                    </p>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                      {tier.features.map((feature, fIdx) => (
                        <li key={fIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.86rem', color: 'var(--body-color)', lineHeight: 1.45 }}>
                          <span style={{ width: '18px', height: '18px', borderRadius: '4px', background: 'rgba(201, 160, 60, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                            <Check style={{ width: '11px', height: '11px', color: 'var(--gold-primary)' }} />
                          </span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div style={{ display: 'flex', gap: '0.65rem' }}>
                  <button
                    type="button"
                    onClick={() => navigate('/services')}
                    className="btn btn--cream"
                    style={{ flex: 1, minHeight: '40px', fontSize: '0.84rem', justifyContent: 'center' }}
                  >
                    <span>Customize</span>
                    <ArrowRight style={{ width: '0.8rem', height: '0.8rem' }} />
                  </button>
                  <button
                    type="button"
                    onClick={onOpenBooking}
                    className="btn btn--gold"
                    style={{ flex: 1, minHeight: '40px', fontSize: '0.84rem', justifyContent: 'center' }}
                  >
                    <Calendar style={{ width: '0.85rem', height: '0.85rem' }} />
                    <span>Book Tier</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Sub-Navigation Banners */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '1.25rem' }}>
            <div 
              onClick={() => navigate('/services')}
              style={{
                background: 'var(--surface-card)',
                border: '1px solid var(--surface-border)',
                borderRadius: '10px',
                padding: '1.25rem 1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--gold)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--surface-border)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div>
                <span style={{ fontSize: '0.72rem', fontFamily: 'var(--mono)', color: 'var(--gold-primary)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '0.2rem' }}>
                  Quick Wash Menu
                </span>
                <strong style={{ fontSize: '1.05rem', color: 'var(--heading-color)', display: 'block', marginBottom: '0.2rem' }}>
                  Express Hand Washes from $30
                </strong>
                <span style={{ fontSize: '0.82rem', color: 'var(--muted-color)' }}>
                  Scratch-free two-bucket exterior care. Walk-ins welcomed.
                </span>
              </div>
              <ArrowRight style={{ width: '1.1rem', height: '1.1rem', color: 'var(--gold-primary)', flexShrink: 0, marginLeft: '1rem' }} />
            </div>

            <div 
              onClick={() => navigate('/ceramic-coating')}
              style={{
                background: 'var(--surface-card)',
                border: '1px solid var(--surface-border)',
                borderRadius: '10px',
                padding: '1.25rem 1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--gold)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--surface-border)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div>
                <span style={{ fontSize: '0.72rem', fontFamily: 'var(--mono)', color: '#3B82F6', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '0.2rem' }}>
                  Permanent Paint Protection
                </span>
                <strong style={{ fontSize: '1.05rem', color: 'var(--heading-color)', display: 'block', marginBottom: '0.2rem' }}>
                  System X Ceramic Coatings from $449
                </strong>
                <span style={{ fontSize: '0.82rem', color: 'var(--muted-color)' }}>
                  Registered to your VIN on CARFAX Canada. Up to Lifetime Warranty.
                </span>
              </div>
              <ArrowRight style={{ width: '1.1rem', height: '1.1rem', color: '#3B82F6', flexShrink: 0, marginLeft: '1rem' }} />
            </div>
          </div>

        </div>
      </section>

      {/* 4. Verified Driver Reviews (Integrated In-Shop Logs & Sheets) */}
      <ReviewsSection isStandalone={false} defaultExpanded={false} />

      {/* 5. The Studio Advantage */}
      <section style={{ padding: '4rem 1rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p className="kicker" style={{ margin: '0 0 0.35rem' }}>FACILITY STANDARDS</p>
            <h2 style={{ fontSize: 'clamp(1.9rem, 3.5vw, 2.5rem)', fontWeight: 900, color: 'var(--heading-color)', margin: '0 0 0.4rem' }}>
              Why a Heated Indoor Studio Matters
            </h2>
            <p style={{ color: 'var(--muted-color)', fontSize: '0.96rem', maxWidth: '600px', margin: '0 auto', lineHeight: 1.55 }}>
              Environmental control separates professional detailing from driveways and automated car washes.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '1.75rem', marginBottom: '2.5rem' }}>
            
            <div style={{ background: 'var(--surface-card)', border: '1px solid var(--surface-border)', borderRadius: '12px', padding: '1.75rem' }}>
              <div style={{ background: 'rgba(201, 160, 60, 0.12)', width: '42px', height: '42px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem', color: 'var(--gold-primary)' }}>
                <Building2 style={{ width: '1.25rem', height: '1.25rem' }} />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--heading-color)', margin: '0 0 0.5rem' }}>
                Climate-Controlled 20°C Clean Bays
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--muted-color)', lineHeight: 1.6, margin: 0 }}>
                Sunlight bakes soap into clear coats, creating permanent mineral etchings, while outdoor winds blow abrasive grit onto wet microfiber drying towels. Our enclosed bays provide zero wind, filtered air, and stable temperatures for proper paint correction and ceramic curing.
              </p>
            </div>

            <div style={{ background: 'var(--surface-card)', border: '1px solid var(--surface-border)', borderRadius: '12px', padding: '1.75rem' }}>
              <div style={{ background: 'rgba(201, 160, 60, 0.12)', width: '42px', height: '42px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem', color: 'var(--gold-primary)' }}>
                <Flame style={{ width: '1.25rem', height: '1.25rem' }} />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--heading-color)', margin: '0 0 0.5rem' }}>
                305°F Thermal Steam &amp; Salt Extraction
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--muted-color)', lineHeight: 1.6, margin: 0 }}>
                Ontario winter road salt forms rock-hard calcium crusts deep in carpet fibers. A standard shop vac or cold water shampoo can't dissolve it and leaves floorboards damp. Our 305°F Italian dry steam melts salt crystals on contact without soaking your floorboards or wiring.
              </p>
            </div>

            <div style={{ background: 'var(--surface-card)', border: '1px solid var(--surface-border)', borderRadius: '12px', padding: '1.75rem' }}>
              <div style={{ background: 'rgba(201, 160, 60, 0.12)', width: '42px', height: '42px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem', color: 'var(--gold-primary)' }}>
                <ShieldCheck style={{ width: '1.25rem', height: '1.25rem' }} />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--heading-color)', margin: '0 0 0.5rem' }}>
                Official CARFAX Canada VIN Documentation
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--muted-color)', lineHeight: 1.6, margin: 0 }}>
                Every System X ceramic coating applied at Ktown Auto Spa is logged directly into your vehicle's CARFAX Canada permanent maintenance history. When you sell or trade in your car, buyers and dealerships see verified proof of professional paint protection.
              </p>
            </div>

          </div>

          <div style={{ textAlign: 'center' }}>
            <button
              type="button"
              onClick={() => navigate('/about')}
              className="btn btn--cream"
              style={{ fontSize: '0.88rem', padding: '0.55rem 1.4rem' }}
            >
              <span>Explore Our Shop Equipment &amp; Studio Standards &rarr;</span>
            </button>
          </div>

        </div>
      </section>

      {/* 6. Studio Visit & Booking Banner */}
      <section 
        style={{ 
          background: 'var(--surface-card)', 
          borderTop: '2px solid var(--gold)', 
          padding: '3rem 1rem' 
        }}
      >
        <div 
          style={{ 
            maxWidth: '1200px', 
            margin: '0 auto', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            flexWrap: 'wrap', 
            gap: '1.75rem' 
          }}
        >
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem' }}>
              <MapPin style={{ width: '0.9rem', height: '0.9rem', color: 'var(--gold-primary)' }} />
              <span style={{ fontSize: '0.78rem', fontFamily: 'var(--mono)', fontWeight: 800, color: 'var(--gold-primary)', textTransform: 'uppercase' }}>
                36 Joseph St, Kingston, ON K7K 2H5
              </span>
            </div>
            
            <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--heading-color)', margin: '0 0 0.4rem' }}>
              Visit K-Town Auto Spa
            </h3>
            
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', fontSize: '0.86rem', color: 'var(--muted-color)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Clock style={{ width: '0.9rem', height: '0.9rem', color: 'var(--gold-primary)' }} />
                Monday – Saturday: 8:00 AM – 5:00 PM
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Phone style={{ width: '0.9rem', height: '0.9rem', color: 'var(--gold-primary)' }} />
                <a href="tel:+16479153530" style={{ color: 'var(--heading-color)', textDecoration: 'none', fontWeight: 700 }}>
                  647-915-3530
                </a>
              </span>
            </div>

            <p style={{ fontSize: '0.8rem', color: 'var(--muted-color)', margin: '0.5rem 0 0', fontStyle: 'italic' }}>
              Walk-ins welcome for Express Hand Washes. Detailing packages and ceramic coatings by reservation.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <a
              href="https://maps.google.com/?q=36+Joseph+St,+Kingston,+ON+K7K+2H5"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--cream"
              style={{ minHeight: '44px', fontSize: '0.86rem' }}
            >
              <ExternalLink style={{ width: '0.85rem', height: '0.85rem' }} />
              <span>Get Directions</span>
            </a>

            <button
              type="button"
              onClick={onOpenBooking}
              className="btn btn--gold"
              style={{ minHeight: '44px', fontSize: '0.88rem' }}
            >
              <Calendar style={{ width: '0.95rem', height: '0.95rem' }} />
              <span>Book Appointment Online</span>
            </button>
          </div>

        </div>
      </section>

    </div>
  );
}
