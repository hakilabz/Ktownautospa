import React, { useState, useEffect } from 'react';
import { Star, CheckCircle2, ZoomIn, X, ChevronDown, ChevronUp, FileText, Check } from 'lucide-react';

export default function ReviewsSection({ isStandalone = false, defaultExpanded = false }) {
  const [selectedSheet, setSelectedSheet] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [expanded, setExpanded] = useState(defaultExpanded);

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedSheet(null);
    };
    if (selectedSheet) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedSheet]);

  const sheets = [
    {
      src: '/images/review_sheet_18.webp',
      alt: 'Handwritten customer review sheet: six vehicles rated, five with five stars and one with four',
      title: 'Log Sheet #1 — Fleet & Passenger Vehicles',
      note: '6 vehicles logged · 5 five-star ratings',
      description: 'Physical clipboard sheet from vehicle pickups at 36 Joseph St. Includes Subaru Crosstrek, Hyundai Sonata, Buick Allure, Honda Odyssey, Chevy Trailblazer, and Kia Sportage.',
    },
    {
      src: '/images/review_sheet_19.webp',
      alt: 'Handwritten customer review sheet: three vehicles, all rated five stars',
      title: 'Log Sheet #2 — Commercial Deliveries & Family Vans',
      note: '3 vehicles logged · 100% 5-star feedback',
      description: 'Signed feedback from commercial deliveries and local drivers. Includes Ford Truck, Kia Sorento, and Toyota Sienna with road salt extraction.',
    },
    {
      src: '/images/review_sheet_20.webp',
      alt: 'Handwritten customer review sheet: seven vehicles rated five stars',
      title: 'Log Sheet #3 — Local Kingston Motorists',
      note: '7 vehicles logged · 100% 5-star feedback',
      description: 'Seven verified local motorists rating paint finishes and interior restorations. Includes Kia Seltos, Ford Edge, Toyota RAV4, Hyundai Santa Fe, Honda CR-V, Toyota Highlander, and Mitsubishi RVR.',
    },
  ];

  const reviews = [
    {
      id: 1,
      stars: 5,
      quote: 'Very helpful and excellent work. Thank you! Gleaming after 5 years of neglect.',
      vehicle: 'Subaru Crosstrek',
      category: 'suv',
      service: 'Gold Deep Clean & Salt Extraction',
      sheet: 'Log Sheet #1',
    },
    {
      id: 2,
      stars: 5,
      quote: 'I had an amazing experience! Best car wash in town!',
      vehicle: 'Kia Seltos',
      category: 'suv',
      service: 'Full In & Out Detail',
      sheet: 'Log Sheet #3',
    },
    {
      id: 3,
      stars: 5,
      quote: 'Amazing and spot on! Sparkle everywhere, great job! Very satisfied.',
      vehicle: 'Hyundai Sonata',
      category: 'sedan',
      service: 'Hand Wash & Interior Care',
      sheet: 'Log Sheet #1',
    },
    {
      id: 4,
      stars: 5,
      quote: 'Looks excellent. Was a hard job, very dirty — they did well.',
      vehicle: 'Ford Truck',
      category: 'truck',
      service: 'Heavy Duty Interior & Exterior',
      sheet: 'Log Sheet #2',
    },
    {
      id: 5,
      stars: 5,
      quote: 'Nicely thorough; greatly appreciate the weekend service effort.',
      vehicle: 'Buick Allure',
      category: 'sedan',
      service: 'Silver Refresh Detail',
      sheet: 'Log Sheet #1',
    },
    {
      id: 6,
      stars: 4,
      quote: 'Very kind. A few spots needed more attention, overall good service.',
      vehicle: 'Honda Odyssey',
      category: 'truck',
      service: 'Family Van Full Detail',
      sheet: 'Log Sheet #1',
    },
    {
      id: 7,
      stars: 5,
      quote: 'Excellent job, will use again.',
      vehicle: 'Ford Edge',
      category: 'suv',
      service: 'Gold Package Detail',
      sheet: 'Log Sheet #3',
    },
    {
      id: 8,
      stars: 5,
      quote: 'Great job! Very efficient in getting the job done.',
      vehicle: 'Toyota RAV4',
      category: 'suv',
      service: 'Winter Maintenance Wash',
      sheet: 'Log Sheet #3',
    },
    {
      id: 9,
      stars: 5,
      quote: 'Merci pour le service.',
      vehicle: 'Kia Sorento',
      category: 'suv',
      service: 'Express Hand Wash & Vacuum',
      sheet: 'Log Sheet #2',
    },
    {
      id: 10,
      stars: 5,
      quote: 'Great. Looks brand new!',
      vehicle: 'Hyundai Santa Fe',
      category: 'suv',
      service: 'Gold Deep Clean',
      sheet: 'Log Sheet #3',
    },
    {
      id: 11,
      stars: 5,
      quote: 'Terrific job. Thanks!',
      vehicle: 'Honda CR-V',
      category: 'suv',
      service: 'Silver In & Out Detail',
      sheet: 'Log Sheet #3',
    },
    {
      id: 12,
      stars: 5,
      quote: 'Excellent! Great job on tough salt stains.',
      vehicle: 'Toyota Sienna',
      category: 'truck',
      service: 'Road Salt Thermal Extraction',
      sheet: 'Log Sheet #2',
    },
    {
      id: 13,
      stars: 5,
      quote: 'Awesome work!!',
      vehicle: 'Toyota Highlander',
      category: 'suv',
      service: 'Diamond Restoration Detail',
      sheet: 'Log Sheet #3',
    },
    {
      id: 14,
      stars: 5,
      quote: 'A very nice job.',
      vehicle: 'Chevy Trailblazer',
      category: 'suv',
      service: 'Exterior Hand Wash & Decon',
      sheet: 'Log Sheet #1',
    },
    {
      id: 15,
      stars: 5,
      quote: 'Great job, mirror finish on black paint.',
      vehicle: 'Mitsubishi RVR',
      category: 'suv',
      service: 'Paint Correction & Ceramic Sealant',
      sheet: 'Log Sheet #3',
    },
    {
      id: 16,
      stars: 5,
      quote: 'Thanks for the quick turnaround!',
      vehicle: 'Kia Sportage',
      category: 'suv',
      service: 'Hand Wash & Wax',
      sheet: 'Log Sheet #1',
    },
  ];

  // Filter reviews
  const filteredReviews = reviews.filter((r) => {
    if (activeCategory === 'all') return true;
    return r.category === activeCategory;
  });

  // Limit displayed count unless expanded or standalone
  const displayLimit = (expanded || isStandalone || activeCategory !== 'all') ? filteredReviews.length : 6;
  const visibleReviews = filteredReviews.slice(0, displayLimit);

  return (
    <section className="band band--tint" id="reviews" style={{ borderTop: '1px solid var(--surface-border)', borderBottom: '1px solid var(--surface-border)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
        
        {/* Section Heading */}
        <div className="section-head" style={{ marginBottom: '2.5rem' }}>
          <p className="kicker">AUTHENTIC LOCAL EVIDENCE</p>
          <h2 style={{ fontSize: 'clamp(2rem, 3.8vw, 2.7rem)', fontWeight: 900, color: 'var(--heading-color)', margin: '0.4rem 0 0.6rem' }}>
            Before We Had a Website, We Had a Clipboard
          </h2>
          <p style={{ color: 'var(--muted-color)', fontSize: '1rem', maxWidth: '640px', lineHeight: 1.55 }}>
            These are the actual reviews our first Kingston customers wrote down with pen at vehicle pickup in our 36 Joseph St shop. No fake bot stars — 100% genuine local driver feedback.
          </p>
        </div>

        {/* Tally Stats Strip */}
        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', 
            gap: '1.25rem', 
            marginBottom: '2.5rem',
            background: 'var(--surface-card)',
            border: '1px solid var(--surface-border)',
            borderRadius: '12px',
            padding: '1.5rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.65rem' }}>
            <span style={{ fontFamily: 'var(--display)', fontWeight: 800, fontSize: '2.8rem', lineHeight: 1, color: 'var(--gold-primary)' }}>
              16
            </span>
            <div>
              <strong style={{ display: 'block', fontSize: '0.86rem', color: 'var(--heading-color)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Handwritten Logs
              </strong>
              <span style={{ fontSize: '0.78rem', color: 'var(--muted-color)' }}>
                Physical clipboard sheets
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.65rem' }}>
            <span style={{ fontFamily: 'var(--display)', fontWeight: 800, fontSize: '2.8rem', lineHeight: 1, color: 'var(--gold-primary)' }}>
              15
            </span>
            <div>
              <strong style={{ display: 'block', fontSize: '0.86rem', color: 'var(--heading-color)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Gave 5 Stars
              </strong>
              <span style={{ fontSize: '0.78rem', color: 'var(--muted-color)' }}>
                93.8% perfect rating
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.65rem' }}>
            <span style={{ fontFamily: 'var(--display)', fontWeight: 800, fontSize: '2.8rem', lineHeight: 1, color: 'var(--gold-primary)' }}>
              4.9
            </span>
            <div>
              <strong style={{ display: 'block', fontSize: '0.86rem', color: 'var(--heading-color)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Average Score
              </strong>
              <span style={{ fontSize: '0.78rem', color: 'var(--muted-color)' }}>
                Out of 5.0 scale
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <CheckCircle2 style={{ width: '1.25rem', height: '1.25rem', color: '#10B981' }} />
            </div>
            <div>
              <strong style={{ display: 'block', fontSize: '0.86rem', color: '#10B981', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                100% In-Shop Verified
              </strong>
              <span style={{ fontSize: '0.78rem', color: 'var(--muted-color)' }}>
                Signed at 36 Joseph St
              </span>
            </div>
          </div>
        </div>

        {/* Physical Clipboard Sheets Gallery */}
        <div style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span className="card-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                <FileText style={{ width: '0.8rem', height: '0.8rem' }} />
                <span>Physical Customer Log Sheets</span>
              </span>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '0.78rem', color: 'var(--muted-color)' }}>
                (Click any sheet to inspect handwriting)
              </span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '1.5rem' }}>
            {sheets.map((sheet, idx) => (
              <figure 
                key={idx} 
                onClick={() => setSelectedSheet(sheet)}
                className="frame" 
                style={{ 
                  padding: '0.85rem', 
                  margin: 0,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  position: 'relative',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--gold)';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(201, 160, 60, 0.18)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--surface-border)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--surface-border)', background: '#F8F6F0', aspectRatio: '4/3', position: 'relative' }}>
                  <img 
                    src={sheet.src} 
                    alt={sheet.alt} 
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                  <div 
                    style={{ 
                      position: 'absolute', 
                      bottom: '8px', 
                      right: '8px', 
                      background: 'rgba(10, 25, 54, 0.85)', 
                      backdropFilter: 'blur(4px)',
                      color: 'var(--gold-lt)', 
                      padding: '0.25rem 0.55rem', 
                      borderRadius: '6px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '4px',
                      fontSize: '0.72rem',
                      fontFamily: 'var(--mono)',
                      fontWeight: 700
                    }}
                  >
                    <ZoomIn style={{ width: '0.75rem', height: '0.75rem' }} />
                    <span>Zoom In</span>
                  </div>
                </div>
                <figcaption style={{ marginTop: '0.85rem' }}>
                  <strong style={{ display: 'block', fontSize: '0.94rem', color: 'var(--heading-color)', marginBottom: '0.2rem' }}>
                    {sheet.title}
                  </strong>
                  <span style={{ display: 'block', fontFamily: 'var(--mono)', fontSize: '0.8rem', color: 'var(--gold-primary)', fontWeight: 600 }}>
                    {sheet.note}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div style={{ marginBottom: '1.75rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {[
                { id: 'all', label: `All Reviews (${reviews.length})` },
                { id: 'suv', label: 'SUVs & Crossovers (11)' },
                { id: 'truck', label: 'Trucks & Vans (3)' },
                { id: 'sedan', label: 'Sedans & Coupes (2)' },
              ].map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategory(cat.id)}
                    style={{
                      background: isActive ? 'var(--gold)' : 'var(--surface-card)',
                      color: isActive ? '#0A1E42' : 'var(--heading-color)',
                      border: isActive ? '1px solid var(--gold-dk)' : '1px solid var(--surface-border)',
                      borderRadius: '8px',
                      padding: '0.45rem 0.9rem',
                      fontSize: '0.82rem',
                      fontFamily: 'var(--mono)',
                      fontWeight: isActive ? 800 : 600,
                      cursor: 'pointer',
                      transition: 'all 0.18s ease',
                    }}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            <span style={{ fontSize: '0.8rem', fontFamily: 'var(--mono)', color: 'var(--muted-color)' }}>
              Showing {visibleReviews.length} of {filteredReviews.length} verified logs
            </span>
          </div>
        </div>

        {/* Reviews Quote Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 310px), 1fr))', gap: '1.35rem' }}>
          {visibleReviews.map((r) => (
            <div 
              key={r.id} 
              className="frame"
              style={{
                background: 'var(--surface-card)',
                borderRadius: '12px',
                padding: '1.5rem',
                display: 'flex', 
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
              }}
            >
              <div>
                {/* Star Row & Log Sheet Badge */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                  <div style={{ display: 'flex', gap: '3px' }}>
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        style={{ 
                          width: '1rem', 
                          height: '1rem', 
                          fill: i < r.stars ? 'var(--gold-primary)' : 'none',
                          color: i < r.stars ? 'var(--gold-primary)' : 'var(--surface-border)',
                        }} 
                      />
                    ))}
                  </div>
                  <span style={{ fontSize: '0.72rem', fontFamily: 'var(--mono)', color: 'var(--muted-color)', fontWeight: 600 }}>
                    {r.sheet}
                  </span>
                </div>

                {/* Transcribed Quote */}
                <blockquote style={{ margin: '0 0 1.25rem', fontSize: '0.96rem', color: 'var(--heading-color)', lineHeight: 1.55, fontStyle: 'italic' }}>
                  &ldquo;{r.quote}&rdquo;
                </blockquote>
              </div>

              {/* Author & Verification Footprint */}
              <div style={{ borderTop: '1px dashed var(--surface-border)', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.4rem' }}>
                <div>
                  <strong style={{ display: 'block', fontSize: '0.88rem', color: 'var(--heading-color)' }}>
                    {r.vehicle}
                  </strong>
                  <span style={{ fontSize: '0.78rem', color: 'var(--gold-primary)', fontFamily: 'var(--mono)' }}>
                    {r.service}
                  </span>
                </div>
                <span style={{ fontSize: '0.72rem', color: '#10B981', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '3px', background: 'rgba(16, 185, 129, 0.1)', padding: '0.15rem 0.45rem', borderRadius: '4px' }}>
                  <Check style={{ width: '0.75rem', height: '0.75rem' }} />
                  Verified Slip
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Expand / Collapse Toggle Button (for Home Page Integration) */}
        {!isStandalone && activeCategory === 'all' && filteredReviews.length > 6 && (
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <button
              type="button"
              onClick={() => setExpanded(!expanded)}
              className="btn btn--cream"
              style={{ padding: '0.65rem 1.6rem', fontSize: '0.9rem' }}
            >
              {expanded ? (
                <>
                  <ChevronUp style={{ width: '1rem', height: '1rem' }} />
                  <span>Show Top 6 Highlights</span>
                </>
              ) : (
                <>
                  <ChevronDown style={{ width: '1rem', height: '1rem' }} />
                  <span>Show All 16 Verified Customer Logs ({reviews.length - 6} more)</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Privacy Note */}
        <p style={{ fontFamily: 'var(--mono)', fontSize: '0.78rem', color: 'var(--muted-color)', marginTop: '2rem', textAlign: 'center' }}>
          * Vehicle make &amp; model recorded instead of full client name to protect customer privacy, exactly as transcribed from our physical shop clipboard.
        </p>

      </div>

      {/* Lightbox Modal for High-Resolution Review Sheets */}
      {selectedSheet && (
        <div 
          onClick={() => setSelectedSheet(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'rgba(7, 21, 46, 0.92)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'var(--surface-card)',
              border: '2px solid var(--gold)',
              borderRadius: '16px',
              maxWidth: '820px',
              width: '100%',
              maxHeight: '92vh',
              overflowY: 'auto',
              padding: '1.5rem',
              boxShadow: '0 25px 60px rgba(0,0,0,0.6)',
              position: 'relative',
            }}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedSheet(null)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'rgba(201, 160, 60, 0.15)',
                border: '1px solid var(--gold)',
                color: 'var(--heading-color)',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
              title="Close (or press Esc)"
            >
              <X style={{ width: '1.1rem', height: '1.1rem' }} />
            </button>

            <h3 style={{ fontSize: '1.3rem', fontWeight: 900, color: 'var(--heading-color)', margin: '0 0 0.25rem', paddingRight: '2.5rem' }}>
              {selectedSheet.title}
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--gold-primary)', fontFamily: 'var(--mono)', margin: '0 0 1rem', fontWeight: 700 }}>
              {selectedSheet.note}
            </p>

            <div style={{ borderRadius: '10px', overflow: 'hidden', border: '1px solid var(--surface-border)', background: '#F8F6F0', marginBottom: '1rem' }}>
              <img
                src={selectedSheet.src}
                alt={selectedSheet.alt}
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>

            <p style={{ fontSize: '0.88rem', color: 'var(--muted-color)', lineHeight: 1.5, margin: 0 }}>
              {selectedSheet.description}
            </p>
          </div>
        </div>
      )}

    </section>
  );
}
