import React from 'react';
import { Star } from 'lucide-react';

export default function ReviewsSection() {
  const reviews = [
    {
      stars: 5,
      quote: 'Very helpful and excellent work. Thank you! Gleaming after 5 years of neglect.',
      author: 'Subaru Crosstrek · written in the shop',
    },
    {
      stars: 5,
      quote: 'I had an amazing experience! Best car wash in town!',
      author: 'Kia Seltos · written in the shop',
    },
    {
      stars: 5,
      quote: 'Amazing and spot on! Sparkle everywhere, great job! Very satisfied.',
      author: 'Hyundai Sonata · written in the shop',
    },
    {
      stars: 5,
      quote: 'Looks excellent. Was a hard job, very dirty — they did well.',
      author: 'Ford Truck · written in the shop',
    },
    {
      stars: 5,
      quote: 'Nicely thorough; greatly appreciate the weekend service effort.',
      author: 'Buick Allure · written in the shop',
    },
    {
      stars: 4,
      quote: 'Very kind. A few spots needed more attention, overall good service.',
      author: 'Honda Odyssey · written in the shop',
    },
    {
      stars: 5,
      quote: 'Excellent job, will use again.',
      author: 'Ford Edge · written in the shop',
    },
    {
      stars: 5,
      quote: 'Great job! Very efficient in getting the job done.',
      author: 'Toyota RAV4 · written in the shop',
    },
    {
      stars: 5,
      quote: 'Merci pour le service.',
      author: 'Kia Sorento · written in the shop',
    },
    {
      stars: 5,
      quote: 'Great. Looks brand new!',
      author: 'Hyundai Santa Fe · written in the shop',
    },
    {
      stars: 5,
      quote: 'Terrific job. Thanks!',
      author: 'Honda CR-V · written in the shop',
    },
    {
      stars: 5,
      quote: 'Excellent! Great job on tough salt stains.',
      author: 'Toyota Sienna · written in the shop',
    },
    {
      stars: 5,
      quote: 'Awesome work!!',
      author: 'Toyota Highlander · written in the shop',
    },
    {
      stars: 5,
      quote: 'A very nice job.',
      author: 'Chevy Trailblazer · written in the shop',
    },
    {
      stars: 5,
      quote: 'Great job, mirror finish on black paint.',
      author: 'Mitsubishi RVR · written in the shop',
    },
    {
      stars: 5,
      quote: 'Thanks for the quick turnaround!',
      author: 'Kia Sportage · written in the shop',
    },
  ];

  return (
    <section className="band band--tint" id="reviews">
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
        
        {/* Section Heading */}
        <div className="section-head" style={{ marginBottom: '2rem' }}>
          <p className="kicker">What people say</p>
          <h2>Before we had a website, we had a clipboard</h2>
          <p>
            These are the actual reviews our first customers wrote down at vehicle pickup. Plenty of our Kingston neighbours don't leave online reviews, so their handwritten words are our proudest record.
          </p>
        </div>

        {/* Tally Stats */}
        <div style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
            <span style={{ fontFamily: 'var(--display)', fontWeight: 800, fontSize: '2.8rem', lineHeight: 1, color: 'var(--navy-deep)' }}>16</span>
            <span style={{ fontFamily: 'var(--mono)', fontSize: '0.82rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--gold-dk)' }}>Handwritten Reviews</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
            <span style={{ fontFamily: 'var(--display)', fontWeight: 800, fontSize: '2.8rem', lineHeight: 1, color: 'var(--navy-deep)' }}>15</span>
            <span style={{ fontFamily: 'var(--mono)', fontSize: '0.82rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--gold-dk)' }}>Gave Five Stars</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
            <span style={{ fontFamily: 'var(--display)', fontWeight: 800, fontSize: '2.8rem', lineHeight: 1, color: 'var(--navy-deep)' }}>4.9</span>
            <span style={{ fontFamily: 'var(--mono)', fontSize: '0.82rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--gold-dk)' }}>Average Out of 5</span>
          </div>
        </div>

        {/* Reviews Quote Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.25rem' }}>
          {reviews.map((r, idx) => (
            <div 
              key={idx} 
              className="frame"
              style={{
                padding: '1.4rem 1.25rem',
                display: 'flex', flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ display: 'flex', gap: '0.15rem', color: 'var(--gold)', marginBottom: '0.6rem' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      style={{ 
                        width: '1.1rem', height: '1.1rem', 
                        fill: i < r.stars ? 'var(--gold)' : 'none',
                        color: i < r.stars ? 'var(--gold)' : 'var(--cream-3)',
                      }} 
                    />
                  ))}
                </div>
                <blockquote style={{ margin: '0 0 0.8rem', fontSize: '0.98rem', color: 'var(--slate)', lineHeight: 1.5, fontStyle: 'italic' }}>
                  "{r.quote}"
                </blockquote>
              </div>

              <div style={{ fontFamily: 'var(--mono)', fontSize: '0.8rem', color: 'var(--gold-dk)', paddingTop: '0.5rem', borderTop: '1px dashed var(--cream-3)' }}>
                {r.author}
              </div>
            </div>
          ))}
        </div>

        <p style={{ fontFamily: 'var(--mono)', fontSize: '0.8rem', color: 'var(--slate)', marginTop: '1.5rem' }}>
          * Vehicle make &amp; model recorded instead of full client name, exactly as logged in our shop clipboard.
        </p>

      </div>
    </section>
  );
}
