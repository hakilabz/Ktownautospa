import React from 'react';
import { Phone, MessageCircle, Mail, MapPin, Calendar, ShieldCheck } from 'lucide-react';

export default function LocationHours({ onOpenBooking }) {
  return (
    <section className="band band--deep" id="book">
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'start' }}>
          
          {/* Left Column: Contact & Hours */}
          <div>
            <h2 style={{ fontFamily: 'var(--display)', fontWeight: 800, textTransform: 'uppercase', fontSize: 'clamp(2.2rem, 5.6vw, 3.4rem)', lineHeight: 0.98, margin: '0 0 1rem', color: '#FFFFFF' }}>
              Book your car in
            </h2>
            <p style={{ color: '#CFDDEE', fontSize: '1.08rem', margin: '0 0 1.8rem', maxWidth: '40ch', lineHeight: 1.6 }}>
              Call, WhatsApp or text — we answer all three, evenings and weekends included. Phone is the fastest way to lock in your preferred date and time.
            </p>

            {/* Big Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2rem' }}>
              <a href="tel:+16479153530" className="btn btn--gold" style={{ minHeight: '64px', fontSize: '1.2rem', width: '100%' }}>
                <Phone style={{ width: '1.4rem', height: '1.4rem' }} />
                <span>Call 647-915-3530</span>
              </a>

              <a 
                href="https://wa.me/16479153530" 
                target="_blank" 
                rel="noopener" 
                className="btn btn--wa"
                style={{ minHeight: '56px', fontSize: '1.05rem', width: '100%' }}
              >
                <MessageCircle style={{ width: '1.3rem', height: '1.3rem' }} />
                <span>Message us on WhatsApp</span>
              </a>

              <a href="sms:+16479153530" className="btn btn--cream" style={{ minHeight: '52px', fontSize: '1rem', width: '100%' }}>
                <span>Or send a quick text</span>
              </a>
            </div>

            {/* Shop Hours Table */}
            <table className="hours" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '1.02rem', marginBottom: '1.5rem' }}>
              <caption style={{ textAlign: 'left', fontFamily: 'var(--mono)', fontSize: '0.82rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--gold-lt)', paddingBottom: '0.8rem' }}>
                Shop hours — for drop-off &amp; pickup
              </caption>
              <tbody>
                <tr>
                  <th scope="row" style={{ padding: '0.65rem 0', borderBottom: '1px solid rgba(240,213,144,.25)', textAlign: 'left', fontWeight: 500, color: '#D8E5F4' }}>Monday to Friday</th>
                  <td style={{ padding: '0.65rem 0', borderBottom: '1px solid rgba(240,213,144,.25)', textAlign: 'right', fontFamily: 'var(--mono)', color: '#FFFFFF' }}>8:00am – 6:00pm</td>
                </tr>
                <tr>
                  <th scope="row" style={{ padding: '0.65rem 0', borderBottom: '1px solid rgba(240,213,144,.25)', textAlign: 'left', fontWeight: 500, color: '#D8E5F4' }}>Saturday</th>
                  <td style={{ padding: '0.65rem 0', borderBottom: '1px solid rgba(240,213,144,.25)', textAlign: 'right', fontFamily: 'var(--mono)', color: '#FFFFFF' }}>9:00am – 4:00pm</td>
                </tr>
                <tr>
                  <th scope="row" style={{ padding: '0.65rem 0', borderBottom: '1px solid rgba(240,213,144,.25)', textAlign: 'left', fontWeight: 500, color: '#D8E5F4' }}>Sunday</th>
                  <td style={{ padding: '0.65rem 0', borderBottom: '1px solid rgba(240,213,144,.25)', textAlign: 'right', fontFamily: 'var(--mono)', color: 'var(--gold-lt)' }}>Closed</td>
                </tr>
              </tbody>
            </table>

            {/* Location Address */}
            <div style={{ color: '#CFDDEE', marginTop: '1.5rem' }}>
              <strong style={{ color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.15rem', marginBottom: '0.3rem' }}>
                <MapPin style={{ width: '1.25rem', height: '1.25rem', color: 'var(--gold-lt)' }} />
                <span>36 Joseph St, Kingston, ON K7K 2H5</span>
              </strong>
              <p style={{ margin: 0, fontSize: '0.94rem' }}>
                Just off Montreal Street in the north end. Free customer parking right at the door.
              </p>
            </div>
          </div>

          {/* Right Column: Online Booking Card */}
          <div>
            <div className="frame" style={{
              background: 'var(--surface-card)', color: 'var(--heading-color)',
              boxShadow: '0 20px 50px rgba(0,0,0,0.35)',
            }}>
              <p className="kicker" style={{ marginBottom: '0.5rem' }}>Instant online booking</p>
              <h3 style={{ fontFamily: 'var(--display)', fontSize: '1.85rem', fontWeight: 800, color: 'var(--heading-color)', textTransform: 'uppercase', margin: '0 0 0.8rem' }}>
                Reserve your appointment
              </h3>
              <p style={{ margin: '0 0 1.5rem', color: 'var(--muted-color)', fontSize: '0.96rem', lineHeight: 1.6 }}>
                Select your package, date, and vehicle details online. Includes automatic Google Calendar sync, zero deposit required upfront, and direct notification dispatch to our shop team.
              </p>

              <button 
                onClick={onOpenBooking} 
                className="btn btn--gold" 
                style={{ width: '100%', minHeight: '60px', fontSize: '1.1rem', marginBottom: '1rem' }}
              >
                <Calendar style={{ width: '1.25rem', height: '1.25rem' }} />
                <span>Open Booking Form</span>
              </button>

              <a 
                href="mailto:ktownautomobilespa@gmail.com" 
                className="btn btn--outline" 
                style={{ width: '100%', minHeight: '48px', fontSize: '0.92rem' }}
              >
                <Mail style={{ width: '1rem', height: '1rem' }} />
                <span>Email: ktownautomobilespa@gmail.com</span>
              </a>

              <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px dashed var(--surface-border)', display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.78rem', color: 'var(--muted-color)' }}>
                <ShieldCheck style={{ width: '1.1rem', height: '1.1rem', color: 'var(--gold-primary)', flexShrink: 0 }} />
                <span>No payment required now · Pay after your car is inspected and finished</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
