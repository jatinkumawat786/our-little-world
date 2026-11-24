import React from 'react';
import { Heart, Music, Sparkles } from 'lucide-react';
import { useLove } from '../context/LoveContext';

export default function WelcomeGate() {
  const { entered, enterWorld } = useLove();
  if (entered) return null;

  return (
    <div className="welcome-gate" role="dialog" aria-modal="true" aria-label="Welcome to Our Little World">
      <div className="welcome-card">
        <img
          src="/media/photos/nikki-pink-saree.webp"
          alt="Niharika smiling in pink"
          className="welcome-photo"
        />
        <span className="eyebrow">
          <Sparkles size={13} /> 25.10.2026 — 25.11.2026
        </span>
        <h1 className="font-display" style={{ fontSize: '2.5rem', marginTop: '14px', lineHeight: 1.08 }}>
          For My Nikki <span className="gradient-text">♡</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '12px', fontSize: '0.96rem' }}>
          Happy One-Month Anniversary, Niharika. I put together a quiet little corner of the internet just for us —
          our memories, your favourite things, and everything my heart wanted to tell you.
        </p>

        <button
          type="button"
          className="btn-pink"
          style={{ width: '100%', marginTop: '24px', padding: '15px 24px', fontSize: '1rem' }}
          onClick={enterWorld}
        >
          <Heart size={18} fill="currentColor" /> Open Our Little World
        </button>

        <p
          style={{
            marginTop: '14px',
            fontSize: '0.78rem',
            color: 'var(--text-muted)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
          }}
        >
          <Music size={13} /> Gently plays our soft background melody
        </p>
      </div>
    </div>
  );
}
