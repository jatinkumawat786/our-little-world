import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Heart, Sparkles, X, RefreshCw } from 'lucide-react';
import { useLove } from '../context/LoveContext';
import { MISS_ME_NOTES, SPECIAL_REASONS_POPUP } from '../data/storyData';

export default function LoveModals() {
  const {
    specialOpen,
    setSpecialOpen,
    specialIndex,
    setSpecialIndex,
    missMeOpen,
    setMissMeOpen,
    missMeIndex,
    setMissMeIndex,
    missCount,
    triggerBurst,
  } = useLove();

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') {
        setSpecialOpen(false);
        setMissMeOpen(false);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [setSpecialOpen, setMissMeOpen]);

  const currentMiss = MISS_ME_NOTES[missMeIndex];
  const currentSpecial = SPECIAL_REASONS_POPUP[specialIndex];

  if (!specialOpen && !missMeOpen) return null;

  return createPortal(
    <>
      {specialOpen && (
        <div className="modal-backdrop" onClick={() => setSpecialOpen(false)}>
          <div
            className="modal-panel"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Do you know how special you are"
          >
            <button
              type="button"
              className="modal-close"
              aria-label="Close modal"
              onClick={(e) => {
                e.stopPropagation();
                setSpecialOpen(false);
              }}
            >
              <X size={18} />
            </button>
            <span className="eyebrow">
              <Sparkles size={13} /> Do You Know How Special You Are?
            </span>
            <h3 className="font-display" style={{ fontSize: '2.1rem', marginTop: '14px', lineHeight: 1.15 }}>
              My Miss Nihu <span className="gradient-text">♡</span>
            </h3>
            <p
              style={{
                marginTop: '14px',
                fontSize: '1.08rem',
                color: 'var(--white-warm)',
                lineHeight: 1.7,
              }}
            >
              “{currentSpecial}”
            </p>
            <p style={{ marginTop: '14px', fontSize: '0.88rem', color: 'var(--pink-blush)' }}>
              My favourite person, my favourite feeling, my Nihu. 🖤
            </p>
            <div style={{ display: 'flex', gap: '10px', marginTop: '24px', flexWrap: 'wrap' }}>
              <button
                type="button"
                className="btn-pink"
                onClick={() => {
                  setSpecialIndex((prev) => (prev + 1) % SPECIAL_REASONS_POPUP.length);
                  triggerBurst(14);
                }}
              >
                <RefreshCw size={15} /> Tell Me Another
              </button>
              <button type="button" className="btn-ghost" onClick={() => setSpecialOpen(false)}>
                Save in Heart
              </button>
            </div>
          </div>
        </div>
      )}

      {missMeOpen && (
        <div className="modal-backdrop" onClick={() => setMissMeOpen(false)}>
          <div
            className="modal-panel"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Whenever you miss me"
          >
            <button
              type="button"
              className="modal-close"
              aria-label="Close modal"
              onClick={(e) => {
                e.stopPropagation();
                setMissMeOpen(false);
              }}
            >
              <X size={18} />
            </button>
            <span className="eyebrow">
              <Heart size={13} fill="currentColor" /> {currentMiss.mood}
            </span>
            <h3 className="font-display" style={{ fontSize: '2.1rem', marginTop: '14px', lineHeight: 1.15 }}>
              {currentMiss.title}
            </h3>
            <p
              style={{
                marginTop: '14px',
                fontSize: '1.04rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.72,
              }}
            >
              {currentMiss.message}
            </p>
            <p style={{ marginTop: '16px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Virtual hugs sent whenever you missed me:{' '}
              <strong style={{ color: 'var(--pink-blush)' }}>{missCount}</strong>
            </p>
            <div style={{ display: 'flex', gap: '10px', marginTop: '22px', flexWrap: 'wrap' }}>
              <button
                type="button"
                className="btn-pink"
                onClick={() => {
                  setMissMeIndex((prev) => (prev + 1) % MISS_ME_NOTES.length);
                  triggerBurst(12);
                }}
              >
                <Heart size={15} fill="currentColor" /> Another Warm Note
              </button>
              <button type="button" className="btn-ghost" onClick={() => setMissMeOpen(false)}>
                Sending Love Back
              </button>
            </div>
          </div>
        </div>
      )}
    </>,
    document.body
  );
}
