import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Heart,
  Sparkles,
  BookOpen,
  Image as ImageIcon,
  Gift,
  Mail,
  ArrowRight,
  ChevronRight,
  CalendarHeart,
} from 'lucide-react';
import { COUPLE_INFO, SPECIAL_LINES } from '../data/storyData';
import { useLove } from '../context/LoveContext';

function computeTimeStats(nowMs) {
  const startMs = new Date(COUPLE_INFO.officialStartDate).getTime();
  const helloMs = new Date(COUPLE_INFO.firstHelloDate).getTime();

  const diff = Math.max(0, nowMs - startMs);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);

  const talkingDays = Math.max(1, Math.floor((nowMs - helloMs) / 86400000));

  // Next month-versary (next 25th at 1:51 AM)
  const now = new Date(nowMs);
  let nextMonth = new Date(now.getFullYear(), now.getMonth(), 25, 1, 51, 0);
  if (nowMs >= nextMonth.getTime()) {
    nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 25, 1, 51, 0);
  }
  const nextDiffMs = Math.max(0, nextMonth.getTime() - nowMs);
  const hoursToNextMonth = Math.ceil(nextDiffMs / 3600000);
  const daysToNextMonth = Math.ceil(nextDiffMs / 86400000);
  const nextMonthLabel =
    nextDiffMs < 86400000
      ? hoursToNextMonth <= 1
        ? 'Tonight · 1:51 AM'
        : `In ${hoursToNextMonth} Hours`
      : daysToNextMonth === 1
        ? 'In 1 Day'
        : `In ${daysToNextMonth} Days`;

  // First year anniversary: 25 Oct 2027
  let oneYear = new Date('2027-10-25T01:51:00+05:30').getTime();
  if (nowMs > oneYear) {
    oneYear = new Date(now.getFullYear() + 1, 9, 25, 1, 51, 0).getTime();
  }
  const daysToOneYear = Math.max(0, Math.ceil((oneYear - nowMs) / 86400000));

  return {
    days,
    hours,
    minutes,
    seconds,
    talkingDays,
    nextMonthLabel,
    daysToOneYear,
  };
}

const CHAPTERS = [
  {
    to: '/our-story',
    icon: BookOpen,
    title: 'Our Story',
    desc: 'From a random Instagram request and a simple "Hey" on 9 Oct to 1:51 AM on 25 Oct & our temple meet.',
  },
  {
    to: '/about-nikki',
    icon: Sparkles,
    title: 'About Nikki',
    desc: 'Everything I adore about Miss Nihu — her black aesthetic, drawing, Judge dreams & street-food cravings.',
  },
  {
    to: '/gallery',
    icon: ImageIcon,
    title: 'Photo Diary',
    desc: 'My favourite photos of you — every traditional glow, soft pink smile, kohl eyes & candid selfie.',
  },
  {
    to: '/memories',
    icon: Gift,
    title: 'Memories & Choco Box',
    desc: 'Our 1|11|26 Dairy Milk keepsake, Diwali wishes, an interactive chocolate box & our future bucket list.',
  },
  {
    to: '/letter',
    icon: Mail,
    title: 'A Letter for Nihu',
    desc: 'Break the wax seal and open my 1-month anniversary letter written straight from the heart.',
  },
  {
    to: '/memories#bucket-list',
    icon: CalendarHeart,
    title: 'Future Memories',
    desc: 'Dream trips, endless food dates, and every chapter still waiting for us ahead.',
  },
];

export default function HomePage() {
  const { openSpecialModal, openMissMeModal, triggerBurst } = useLove();
  const [nowMs, setNowMs] = useState(() => Date.now());
  const [quoteIdx, setQuoteIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setNowMs(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setQuoteIdx((prev) => (prev + 1) % SPECIAL_LINES.length);
    }, 6500);
    return () => clearInterval(id);
  }, []);

  const stats = computeTimeStats(nowMs);
  const activeQuote = SPECIAL_LINES[quoteIdx];

  return (
    <div className="page-enter">
      {/* HERO */}
      <section className="hero-section">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">
              <Heart size={13} fill="currentColor" /> One Month Anniversary · 25 Nov 2026
            </span>
            <h1 className="hero-title">
              OUR LITTLE <span className="gradient-text">WORLD</span> ♡
            </h1>
            <p className="hero-subtitle-line">{COUPLE_INFO.subtitle}</p>
            <p className="hero-copy">
              One month officially together, 47 days since our very first “Hey”, and already a thousand reasons why
              you’re my favourite part of every single day, Nikki.
            </p>

            <div className="hero-actions">
              <button type="button" className="btn-pink" onClick={openSpecialModal}>
                <Sparkles size={16} /> Do You Know How Special You Are?
              </button>
              <button type="button" className="btn-ghost" onClick={openMissMeModal}>
                <Heart size={16} /> Click Whenever You Miss Me
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <Link to="/letter" className="chapter-link" style={{ fontSize: '0.94rem' }}>
                Open your 1-month love letter <ArrowRight size={16} />
              </Link>
              <button
                type="button"
                onClick={() => triggerBurst(26)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  fontSize: '0.84rem',
                  textDecoration: 'underline',
                  textUnderlineOffset: '4px',
                }}
              >
                Tap for anniversary hearts ✨
              </button>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-glow-ring" aria-hidden="true" />
            <div className="hero-stamp">25 Oct · 1:51 AM 🖤</div>

            <div className="polaroid hero-polaroid-main">
              <img
                src="/media/photos/nikki-pink-saree.webp"
                alt="Niharika in soft pink saree"
                fetchPriority="high"
              />
              <div className="polaroid-caption">My prettiest view, my Nikki ♡</div>
            </div>

            <div className="polaroid hero-polaroid-mini">
              <img src="/media/photos/nikki-rose-suit-glance.webp" alt="Nikki smiling in rose suit" />
              <div className="polaroid-caption">Miss Nihu 🧸</div>
            </div>
          </div>
        </div>
      </section>

      {/* LIVE COUNTERS */}
      <section className="counters-section">
        <div className="container">
          <div className="velvet-card counter-panel">
            <div className="counter-header">
              <div>
                <span className="eyebrow">Every Second With You</span>
                <h2 className="section-title" style={{ marginTop: '10px', fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)' }}>
                  Counting from <em>1:51 AM</em> on 25 October
                </h2>
              </div>
              <p style={{ color: 'var(--pink-blush)', fontSize: '0.92rem' }}>
                Motto: <strong>{COUPLE_INFO.motto}</strong>
              </p>
            </div>

            <div className="live-clock-grid">
              <div className="clock-box">
                <div className="clock-value">{String(stats.days).padStart(2, '0')}</div>
                <div className="clock-label">Days Us</div>
              </div>
              <div className="clock-box">
                <div className="clock-value">{String(stats.hours).padStart(2, '0')}</div>
                <div className="clock-label">Hours</div>
              </div>
              <div className="clock-box">
                <div className="clock-value">{String(stats.minutes).padStart(2, '0')}</div>
                <div className="clock-label">Minutes</div>
              </div>
              <div className="clock-box">
                <div className="clock-value">{String(stats.seconds).padStart(2, '0')}</div>
                <div className="clock-label">Seconds</div>
              </div>
            </div>

            <div className="milestone-strip">
              <div className="milestone-pill">
                <span className="milestone-pill-label">Since First "Hey" (9 Oct)</span>
                <span className="milestone-pill-val">{stats.talkingDays} Days of Talking</span>
              </div>
              <div className="milestone-pill">
                <span className="milestone-pill-label">Next Month-versary (25th)</span>
                <span className="milestone-pill-val">{stats.nextMonthLabel}</span>
              </div>
              <div className="milestone-pill">
                <span className="milestone-pill-label">1-Year Milestone (25.10.27)</span>
                <span className="milestone-pill-val">
                  {stats.daysToOneYear === 1 ? '1 Day Ahead' : `${stats.daysToOneYear} Days Ahead`}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SPECIAL LINES SPOTLIGHT */}
      <section className="quote-section">
        <div className="container">
          <div className="velvet-card quote-stage">
            <span className="eyebrow">{activeQuote.tag}</span>
            <p className="quote-text">“{activeQuote.text}”</p>
            <button
              type="button"
              className="btn-ghost"
              onClick={() => setQuoteIdx((prev) => (prev + 1) % SPECIAL_LINES.length)}
            >
              Next Line <ChevronRight size={16} />
            </button>

            <div className="quote-dots" role="tablist" aria-label="Special quotes">
              {SPECIAL_LINES.map((line, i) => (
                <button
                  key={line.tag}
                  type="button"
                  role="tab"
                  aria-selected={i === quoteIdx}
                  aria-label={`Show quote ${i + 1}`}
                  className={`quote-dot${i === quoteIdx ? ' active' : ''}`}
                  onClick={() => setQuoteIdx(i)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CHAPTERS */}
      <section style={{ padding: '10px 0 40px' }}>
        <div className="container">
          <span className="eyebrow">Explore Our World</span>
          <h2 className="section-title" style={{ marginTop: '12px' }}>
            Every Page Holds a Piece of <em>Us</em>
          </h2>
          <p className="section-subtitle" style={{ marginTop: '8px' }}>
            Walk through each page slowly, Miss Nihu — every photo, note, and chocolate box was tucked in here for you.
          </p>

          <div className="chapters-grid">
            {CHAPTERS.map((ch) => {
              const Icon = ch.icon;
              return (
                <Link key={ch.title} to={ch.to} className="velvet-card chapter-card">
                  <div>
                    <div className="chapter-icon">
                      <Icon size={20} />
                    </div>
                    <h3 className="chapter-title" style={{ marginTop: '16px' }}>
                      {ch.title}
                    </h3>
                    <p className="chapter-desc" style={{ marginTop: '8px' }}>
                      {ch.desc}
                    </p>
                  </div>
                  <span className="chapter-link">
                    Open Page <ArrowRight size={15} />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
