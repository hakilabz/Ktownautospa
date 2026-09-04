import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X } from 'lucide-react';

export default function WhatsAppChat() {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    const handleClickOutside = (e) => {
      if (isOpen && panelRef.current && !panelRef.current.contains(e.target)) {
        // If clicking the button itself, don't double toggle
        if (!e.target.closest('#chatBtn')) {
          setIsOpen(false);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  const chatOptions = [
    {
      label: 'Get a price for my car',
      text: "Hi, I'd like a price for my car. It's a ",
    },
    {
      label: 'Book a wash or detail',
      text: "Hi, I'd like to book a wash or detail. When are you available?",
    },
    {
      label: 'Ask about ceramic coating',
      text: "Hi, I'm interested in ceramic coating. Can you tell me more?",
    },
    {
      label: 'Get a quote for my boat',
      text: "Hi, I'd like a quote for my boat. It's a ",
    },
    {
      label: 'Ask about fleet service',
      text: "Hi, I manage a fleet and I'd like to talk about scheduled service.",
    },
  ];

  return (
    <div className="chat">
      {/* Interactive Chat Popup Dialog */}
      {isOpen && (
        <div 
          ref={panelRef}
          className="chat__panel" 
          role="dialog" 
          aria-modal="false" 
          aria-labelledby="chatTitle"
        >
          <div className="chat__head">
            <MessageCircle style={{ width: '1.6rem', height: '1.6rem', color: '#25D366', flexShrink: 0 }} />
            <div>
              <strong id="chatTitle" style={{ display: 'block', fontSize: '1.02rem' }}>Ktown Auto Spa</strong>
              <span style={{ display: 'block', fontFamily: 'var(--mono)', fontSize: '0.74rem', color: '#A9C4E2' }}>
                Usually replies within the hour
              </span>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              style={{
                marginLeft: 'auto', background: 'none', border: 0,
                color: '#A9C4E2', cursor: 'pointer', padding: '0.2rem',
                borderRadius: '6px', display: 'flex',
              }}
              aria-label="Close chat"
            >
              <X style={{ width: '1.25rem', height: '1.25rem' }} />
            </button>
          </div>

          <div className="chat__body">
            <p style={{
              background: '#FFFFFF', border: '1px solid var(--cream-3)',
              borderRadius: '4px 14px 14px 14px', padding: '0.85rem 1rem',
              fontSize: '0.92rem', color: 'var(--slate)', margin: '0 0 1rem', lineHeight: 1.5,
            }}>
              Hi! Send us a message and we'll get right back to you. A quick photo of your car helps us quote you accurately.
            </p>

            <div style={{ display: 'grid', gap: '0.5rem' }}>
              {chatOptions.map((opt, idx) => (
                <a
                  key={idx}
                  href={`https://wa.me/16479153530?text=${encodeURIComponent(opt.text)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="chat__opt"
                  onClick={() => setIsOpen(false)}
                >
                  {opt.label}
                </a>
              ))}
            </div>

            <p style={{ margin: '1rem 0 0', fontFamily: 'var(--mono)', fontSize: '0.76rem', color: 'var(--slate)', textAlign: 'center' }}>
              We answer messages evenings and weekends too.
            </p>
            <p style={{ margin: '0.35rem 0 0', fontFamily: 'var(--mono)', fontSize: '0.7rem', color: '#8A97A8', textAlign: 'center' }}>
              Opens in WhatsApp. No WhatsApp? Call or text instead.
            </p>
          </div>
        </div>
      )}

      {/* Floating Chat Trigger Button */}
      <button 
        id="chatBtn"
        className="chat__btn" 
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <MessageCircle style={{ width: '1.5rem', height: '1.5rem', color: '#25D366', flexShrink: 0 }} />
        <span className="lbl">Chat with us</span>
      </button>
    </div>
  );
}
