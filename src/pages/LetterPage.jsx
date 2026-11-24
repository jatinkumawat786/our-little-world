import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MailOpen, Sparkles, Heart, ArrowLeft } from 'lucide-react';
import { LOVE_LETTER } from '../data/storyData';
import { useLove } from '../context/LoveContext';

export default function LetterPage() {
  const [opened, setOpened] = useState(false);
  const { openSpecialModal, openMissMeModal, triggerBurst } = useLove();

  const handleOpenEnvelope = () => {
    setOpened(true);
    triggerBurst(28);
  };

  return (
    <div className="page-enter">
      <section className="page-hero">
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="eyebrow">
            <MailOpen size={13} /> One-Month Anniversary Surprise
          </span>
          <h1 className="section-title" style={{ marginTop: '14px' }}>
            A Letter for <em>My Nihu</em>
          </h1>
          <p className="section-subtitle" style={{ margin: '10px auto 0' }}>
            Everything I hold quietly in my heart for you — written down so you can come back and read it whenever you
            smile or whenever you miss me.
          </p>
        </div>
      </section>

      <section style={{ paddingBottom: '36px' }}>
        <div className="container envelope-stage">
          {!opened ? (
            <div
              className="sealed-envelope"
              onClick={handleOpenEnvelope}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') handleOpenEnvelope();
              }}
            >
              <div className="wax-seal">V ♡ N</div>
              <span className="eyebrow">Sealed for Niharika</span>
              <h2 className="font-display" style={{ fontSize: '2.2rem', marginTop: '14px', color: 'var(--white-warm)' }}>
                Tap the Wax Seal to Open Your Letter
              </h2>
              <p style={{ color: 'var(--text-secondary)', maxWidth: '430px', margin: '10px auto 24px' }}>
                25.10.2026 → 25.11.2026 · A little piece of my heart, sealed only for Miss Nihu.
              </p>
              <span className="btn-pink">
                <Sparkles size={16} /> Break the Seal & Read
              </span>
            </div>
          ) : (
            <article className="paper-card letter-stationery">
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '10px',
                  paddingBottom: '18px',
                  marginBottom: '24px',
                  borderBottom: '1px solid rgba(255, 79, 147, 0.22)',
                }}
              >
                <span style={{ fontSize: '0.82rem', fontWeight: 600, letterSpacing: '0.1em', color: '#9c2559', textTransform: 'uppercase' }}>
                  {LOVE_LETTER.dateStamp}
                </span>
                <span className="font-hand" style={{ fontSize: '1.35rem', color: '#9c2559' }}>
                  Vashu ♡ Nikki
                </span>
              </div>

              <h2 className="font-display" style={{ fontSize: '2rem', color: '#2b1020', marginBottom: '20px' }}>
                {LOVE_LETTER.salutation}
              </h2>

              {LOVE_LETTER.paragraphs.map((p, i) => (
                <p key={i} className="letter-paragraph">
                  {p}
                </p>
              ))}

              <div className="letter-quote-box">{LOVE_LETTER.quote}</div>

              <p className="letter-paragraph" style={{ fontWeight: 500 }}>
                {LOVE_LETTER.closing}
              </p>

              <p
                className="font-hand"
                style={{
                  fontSize: '2rem',
                  color: '#a31b58',
                  whiteSpace: 'pre-line',
                  lineHeight: 1.2,
                  marginTop: '24px',
                }}
              >
                {LOVE_LETTER.signature}
              </p>
            </article>
          )}

          {/* Post-Letter Interactive Actions */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '12px',
              marginTop: '28px',
            }}
          >
            <button type="button" className="btn-pink" onClick={openSpecialModal}>
              <Sparkles size={16} /> Do You Know How Special You Are?
            </button>
            <button type="button" className="btn-ghost" onClick={openMissMeModal}>
              <Heart size={16} /> Click Whenever You Miss Me
            </button>
            <Link to="/" className="btn-ghost">
              <ArrowLeft size={16} /> Back to Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
