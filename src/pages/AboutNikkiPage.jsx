import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Palette, Scale, Heart, Utensils, Sparkles, ArrowRight } from 'lucide-react';
import { NIKKI_FAVOURITES, REASONS_I_LOVE_YOU } from '../data/storyData';

const REASON_FILTERS = ['All', 'Heart', 'Beauty', 'Us', 'Pride', 'Rituals', 'Forever'];

export default function AboutNikkiPage() {
  const [selectedFood, setSelectedFood] = useState(0);
  const [reasonFilter, setReasonFilter] = useState('All');

  const filteredReasons =
    reasonFilter === 'All'
      ? REASONS_I_LOVE_YOU
      : REASONS_I_LOVE_YOU.filter((r) => r.category === reasonFilter);

  const activeFood = NIKKI_FAVOURITES.foods[selectedFood];

  return (
    <div className="page-enter">
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">
            <Sparkles size={13} /> Little Things About Her
          </span>
          <h1 className="section-title" style={{ marginTop: '14px' }}>
            Niharika · <em>Nikki</em> · Miss Nihu 🧸
          </h1>
          <p className="section-subtitle" style={{ marginTop: '10px' }}>
            Every little detail that makes you my favourite human — from your black outfits and curly hair to your big
            courtroom dreams.
          </p>
        </div>
      </section>

      <section>
        <div className="container">
          {/* Top Profile Grid */}
          <div className="profile-hero-grid">
            <div className="polaroid" style={{ transform: 'rotate(-1.2deg)' }}>
              <img
                src="/media/photos/nikki-rose-suit-smile.webp"
                alt="Niharika smiling softly"
                style={{ aspectRatio: '4 / 5' }}
              />
              <div className="polaroid-caption">Beautiful, sweet & endlessly mine ♡</div>
            </div>

            <div className="facts-grid">
              <div className="velvet-card fact-tile">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--pink-blush)' }}>
                  <Heart size={18} fill="currentColor" />
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    Her Favourite Colour
                  </span>
                </div>
                <h2 className="font-display" style={{ fontSize: '1.85rem' }}>
                  {NIKKI_FAVOURITES.colour.name}
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  {NIKKI_FAVOURITES.colour.note}
                </p>
                <img
                  src={NIKKI_FAVOURITES.colour.photo}
                  alt="Nikki wearing black and silver jhumkas"
                  style={{
                    width: '100%',
                    height: '130px',
                    objectFit: 'cover',
                    objectPosition: 'center 25%',
                    borderRadius: '12px',
                    marginTop: '8px',
                  }}
                />
              </div>

              <div className="velvet-card fact-tile">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--pink-blush)' }}>
                  <Scale size={18} />
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    Her Big Ambition
                  </span>
                </div>
                <h2 className="font-display" style={{ fontSize: '1.85rem' }}>
                  {NIKKI_FAVOURITES.dream.name}
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.65 }}>
                  {NIKKI_FAVOURITES.dream.note}
                </p>
                <div
                  style={{
                    marginTop: 'auto',
                    padding: '10px 14px',
                    borderRadius: '12px',
                    background: 'rgba(255, 79, 147, 0.1)',
                    border: '1px solid rgba(255, 130, 180, 0.25)',
                    fontSize: '0.83rem',
                    color: 'var(--pink-soft)',
                  }}
                >
                  Honourable Judge Niharika — my forever pride.
                </div>
              </div>

              <div className="velvet-card fact-tile">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--pink-blush)' }}>
                  <Palette size={18} />
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    Her Hobby
                  </span>
                </div>
                <h2 className="font-display" style={{ fontSize: '1.85rem' }}>
                  {NIKKI_FAVOURITES.hobby.name}
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
                  {NIKKI_FAVOURITES.hobby.note}
                </p>
              </div>

              <div className="velvet-card fact-tile">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--pink-blush)' }}>
                  <Sparkles size={18} />
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    Cute Habits & Us
                  </span>
                </div>
                <h2 className="font-display" style={{ fontSize: '1.85rem' }}>
                  Sweetly Obsessed 💕
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                  Daily Good Morning & Good Night texts, sharing every little thing — aur haan, you’re super possessive
                  & obsessed with me, and I’m even more possessive & obsessed with you.
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Food Menu */}
          <div className="velvet-card food-menu-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
              <div>
                <span className="eyebrow">
                  <Utensils size={13} /> Nikki’s Food Cravings Menu
                </span>
                <h2 className="font-display" style={{ fontSize: '2.2rem', marginTop: '10px' }}>
                  Everything That Makes Her Happy 🍽️
                </h2>
              </div>
              <p style={{ color: 'var(--pink-blush)', fontSize: '0.9rem', alignSelf: 'flex-end' }}>
                Tap a dish to see our date plan
              </p>
            </div>

            <div className="food-grid">
              {NIKKI_FAVOURITES.foods.map((food, idx) => (
                <button
                  key={food.name}
                  type="button"
                  className={`food-item${selectedFood === idx ? ' active' : ''}`}
                  onClick={() => setSelectedFood(idx)}
                >
                  <div style={{ fontSize: '1.6rem', marginBottom: '6px' }}>{food.emoji}</div>
                  <div style={{ fontWeight: 600, fontSize: '0.96rem', color: 'var(--white-warm)' }}>{food.name}</div>
                </button>
              ))}
            </div>

            <div
              style={{
                marginTop: '18px',
                padding: '18px 20px',
                borderRadius: '16px',
                background: 'rgba(255, 79, 147, 0.1)',
                border: '1px solid rgba(255, 130, 180, 0.28)',
              }}
            >
              <strong style={{ color: 'var(--pink-blush)' }}>
                {activeFood.emoji} {activeFood.name}:
              </strong>{' '}
              <span style={{ color: 'var(--text-primary)' }}>{activeFood.vibe}</span>
            </div>
          </div>

          {/* Reasons I Love You */}
          <div>
            <span className="eyebrow">
              <Heart size={13} fill="currentColor" /> Reasons I Love You
            </span>
            <h2 className="section-title" style={{ marginTop: '12px', fontSize: 'clamp(1.9rem, 3.6vw, 2.7rem)' }}>
              A Few Things I Never Want You to Forget
            </h2>

            <div className="filter-bar" style={{ marginTop: '18px' }}>
              {REASON_FILTERS.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`filter-chip${reasonFilter === cat ? ' active' : ''}`}
                  onClick={() => setReasonFilter(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="reasons-grid">
              {filteredReasons.map((item) => (
                <div key={item.title} className="velvet-card reason-card">
                  <span style={{ fontSize: '0.72rem', color: 'var(--pink-blush)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    {item.category}
                  </span>
                  <h3 className="font-display" style={{ fontSize: '1.55rem', marginTop: '6px', color: 'var(--white-warm)' }}>
                    {item.title}
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', marginTop: '8px', fontSize: '0.92rem' }}>{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '36px', flexWrap: 'wrap' }}>
            <Link to="/gallery" className="btn-pink">
              Browse Your Photo Diary <ArrowRight size={16} />
            </Link>
            <Link to="/letter" className="btn-ghost">
              Read Your Love Letter
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
