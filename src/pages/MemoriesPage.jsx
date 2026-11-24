import React, { useState } from 'react';
import { Gift, Sparkles, Check, Plus, RotateCcw, Film, Heart } from 'lucide-react';
import { CHOCOLATES, INITIAL_BUCKET_LIST } from '../data/storyData';
import { useLove } from '../context/LoveContext';

export default function MemoriesPage() {
  const { triggerBurst, pauseMusic } = useLove();
  const [openedChocos, setOpenedChocos] = useState([]);
  const [activeChocoNote, setActiveChocoNote] = useState(null);

  const [bucketList, setBucketList] = useState(() => {
    try {
      const saved = localStorage.getItem('olw_bucket_list');
      return saved ? JSON.parse(saved) : INITIAL_BUCKET_LIST;
    } catch {
      return INITIAL_BUCKET_LIST;
    }
  });
  const [newWish, setNewWish] = useState('');

  const saveBucket = (next) => {
    setBucketList(next);
    try {
      localStorage.setItem('olw_bucket_list', JSON.stringify(next));
    } catch {
      // ignore
    }
  };

  const handleOpenChocolate = (choco) => {
    if (!openedChocos.includes(choco.id)) {
      setOpenedChocos((prev) => [...prev, choco.id]);
      triggerBurst(12);
    }
    setActiveChocoNote(choco);
  };

  const toggleBucketItem = (id) => {
    const next = bucketList.map((item) => (item.id === id ? { ...item, done: !item.done } : item));
    saveBucket(next);
    triggerBurst(8);
  };

  const addWish = (e) => {
    e.preventDefault();
    const trimmed = newWish.trim();
    if (!trimmed) return;
    const next = [
      { id: `wish-${Date.now()}`, text: trimmed, tag: 'Our Wish', done: false },
      ...bucketList,
    ];
    saveBucket(next);
    setNewWish('');
    triggerBurst(10);
  };

  return (
    <div className="page-enter">
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">
            <Gift size={13} /> Little Memories & Surprises
          </span>
          <h1 className="section-title" style={{ marginTop: '14px' }}>
            Chocolates, <em>Keepsakes</em> & Future Dreams
          </h1>
          <p className="section-subtitle" style={{ marginTop: '10px' }}>
            Our real-life memories saved close, a virtual chocolate box waiting to be unwrapped, and every adventure
            still ahead of us.
          </p>
        </div>
      </section>

      <section>
        <div className="container">
          {/* Real-Life Keepsakes */}
          <div className="keepsakes-grid">
            <article className="velvet-card keepsake-card">
              <div className="keepsake-media">
                <img src="/media/photos/memory-first-meet-card.webp" alt="1/11/26 Dairy Milk keepsake card" />
              </div>
              <div className="keepsake-body">
                <span className="eyebrow">1 November 2026</span>
                <h2 className="font-display" style={{ fontSize: '1.6rem', marginTop: '10px' }}>
                  Our First Temple Meet (1 | 11 | 26)
                </h2>
                <p style={{ color: 'var(--text-secondary)', marginTop: '8px', fontSize: '0.91rem' }}>
                  Meeting you for the very first time in real life at the temple — and this handwritten Dairy Milk wrapper
                  card keeping that date forever.
                </p>
              </div>
            </article>

            <article className="velvet-card keepsake-card">
              <div className="keepsake-media">
                <img src="/media/photos/memory-chocolates.webp" alt="Chocolates gifted to Nikki" />
              </div>
              <div className="keepsake-body">
                <span className="eyebrow">Chocolate Memories</span>
                <h2 className="font-display" style={{ fontSize: '1.6rem', marginTop: '10px' }}>
                  Sweet Treats for My Nikki
                </h2>
                <p style={{ color: 'var(--text-secondary)', marginTop: '8px', fontSize: '0.91rem' }}>
                  Hide & Seek Milano, KitKat, Dairy Milk — gifting you your favourite chocolates and watching your eyes
                  light up is my favourite feeling.
                </p>
              </div>
            </article>

            <article className="velvet-card keepsake-card">
              <div className="keepsake-media" style={{ background: '#0b090c' }}>
                <img
                  src="/media/photos/memory-snap-22nov.webp"
                  alt="22 November 2026 snap"
                  style={{ objectPosition: 'center 55%' }}
                />
              </div>
              <div className="keepsake-body">
                <span className="eyebrow">22 November 2026</span>
                <h2 className="font-display" style={{ fontSize: '1.6rem', marginTop: '10px' }}>
                  Our Second Meet & Everyday Snaps
                </h2>
                <p style={{ color: 'var(--text-secondary)', marginTop: '8px', fontSize: '0.91rem' }}>
                  Meeting casually again on 22 Nov, sneaking smiles between busy study schedules, and always keeping
                  “Nihu” on my mind.
                </p>
              </div>
            </article>
          </div>

          {/* Interactive Virtual Chocolate Box */}
          <div className="velvet-card choco-box-shell">
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px', alignItems: 'center' }}>
              <div>
                <span className="eyebrow">🍫 Virtual Chocolate Box</span>
                <h2 className="font-display" style={{ fontSize: '2.2rem', marginTop: '10px' }}>
                  Unwrap Each Chocolate for a Hidden Note
                </h2>
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <span style={{ fontSize: '0.88rem', color: 'var(--pink-blush)' }}>
                  Unwrapped: <strong>{openedChocos.length} / {CHOCOLATES.length}</strong>
                </span>
                {openedChocos.length > 0 && (
                  <button
                    type="button"
                    className="btn-ghost"
                    style={{ padding: '7px 14px', fontSize: '0.8rem' }}
                    onClick={() => {
                      setOpenedChocos([]);
                      setActiveChocoNote(null);
                    }}
                  >
                    <RotateCcw size={13} /> Wrap Again
                  </button>
                )}
              </div>
            </div>

            <div className="choco-tray">
              {CHOCOLATES.map((ch) => {
                const isOpened = openedChocos.includes(ch.id);
                return (
                  <button
                    key={ch.id}
                    type="button"
                    className={`choco-piece${isOpened ? ' opened' : ''}`}
                    style={{
                      background: `linear-gradient(145deg, ${ch.color}, #150b14)`,
                    }}
                    onClick={() => handleOpenChocolate(ch)}
                  >
                    <span style={{ fontSize: '1.65rem' }}>{isOpened ? '💝' : '🍫'}</span>
                    <span style={{ fontWeight: 600, fontSize: '0.88rem', color: ch.accent }}>{ch.name}</span>
                    <span style={{ fontSize: '0.73rem', color: 'var(--text-secondary)' }}>
                      {isOpened ? 'Opened · Tap to read' : ch.flavor}
                    </span>
                  </button>
                );
              })}
            </div>

            {activeChocoNote && (
              <div
                style={{
                  marginTop: '18px',
                  padding: '20px 22px',
                  borderRadius: '18px',
                  background: 'rgba(255, 79, 147, 0.12)',
                  border: '1px solid rgba(255, 130, 180, 0.4)',
                }}
              >
                <div style={{ fontSize: '0.78rem', color: 'var(--pink-blush)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  {activeChocoNote.name} · {activeChocoNote.flavor}
                </div>
                <p className="font-display" style={{ fontSize: '1.5rem', marginTop: '6px', color: 'var(--white-warm)' }}>
                  “{activeChocoNote.message}”
                </p>
              </div>
            )}
          </div>

          {/* Handwritten Shayari & Reel Card */}
          <div className="velvet-card shayari-split">
            <div>
              <span className="eyebrow">
                <Film size={13} /> Saved Close to Heart
              </span>
              <h2 className="font-display" style={{ fontSize: '2rem', marginTop: '12px' }}>
                For This Life & Every Next One
              </h2>
              <p
                className="font-hindi"
                style={{
                  marginTop: '16px',
                  fontSize: '1.22rem',
                  lineHeight: 1.85,
                  color: 'var(--pink-soft)',
                  background: 'rgba(255, 79, 147, 0.08)',
                  padding: '18px 20px',
                  borderRadius: '16px',
                  borderLeft: '3px solid var(--pink-vivid)',
                }}
              >
                “मेरे मरते समय उसकी फोटो मेरे जेब में डाल देना,
                <br />
                भगवान को दिखाऊँगी कि अगले जन्म में यही चाहिए।”
              </p>
              <p style={{ color: 'var(--text-secondary)', marginTop: '12px', fontSize: '0.93rem' }}>
                Some feelings belong not just to one month, or one lifetime — they stay etched for every chapter yet to
                come.
              </p>
            </div>

            <div style={{ borderRadius: '18px', overflow: 'hidden', border: '1px solid rgba(255, 130, 180, 0.3)', background: '#09060b' }}>
              <video
                src="/media/shayari-reel.mp4"
                controls
                preload="none"
                playsInline
                onPlay={pauseMusic}
                style={{ width: '100%', maxHeight: '320px', objectFit: 'contain' }}
              />
            </div>
          </div>

          {/* Dream Bucket List & Future Memories */}
          <div id="bucket-list" className="velvet-card bucket-card">
            <span className="eyebrow">
              <Sparkles size={13} /> Our Dream Bucket List & Future Memories
            </span>
            <h2 className="font-display" style={{ fontSize: '2.2rem', marginTop: '12px' }}>
              Things We’re Going to Do Together
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '6px', fontSize: '0.94rem' }}>
              Check things off as we live them, or add your own wishes right here, Nikki.
            </p>

            <form className="bucket-form" onSubmit={addWish}>
              <input
                type="text"
                className="bucket-input"
                placeholder="Add a future date, city, or dream wish for us…"
                value={newWish}
                onChange={(e) => setNewWish(e.target.value)}
                maxLength={140}
              />
              <button type="submit" className="btn-pink">
                <Plus size={16} /> Add Dream
              </button>
            </form>

            <div className="bucket-list">
              {bucketList.map((item) => (
                <div
                  key={item.id}
                  className={`bucket-item${item.done ? ' done' : ''}`}
                  onClick={() => toggleBucketItem(item.id)}
                  role="checkbox"
                  aria-checked={item.done}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') toggleBucketItem(item.id);
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span
                      style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        border: '1.5px solid var(--pink-rose)',
                        background: item.done ? 'var(--pink-vivid)' : 'transparent',
                        color: '#160912',
                        display: 'grid',
                        placeItems: 'center',
                        flexShrink: 0,
                      }}
                    >
                      {item.done ? <Check size={14} strokeWidth={3} /> : <Heart size={11} />}
                    </span>
                    <span
                      style={{
                        textDecoration: item.done ? 'line-through' : 'none',
                        color: item.done ? 'var(--text-muted)' : 'var(--white-warm)',
                      }}
                    >
                      {item.text}
                    </span>
                  </div>
                  <span
                    style={{
                      fontSize: '0.72rem',
                      padding: '4px 10px',
                      borderRadius: '999px',
                      background: 'rgba(255, 79, 147, 0.14)',
                      color: 'var(--pink-blush)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {item.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
