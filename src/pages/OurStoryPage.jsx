import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircleHeart, Heart, ArrowRight, Sparkles } from 'lucide-react';
import { COUPLE_INFO, TIMELINE_EVENTS } from '../data/storyData';

export default function OurStoryPage() {
  return (
    <div className="page-enter">
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">
            <MessageCircleHeart size={13} /> Our Story
          </span>
          <h1 className="section-title" style={{ marginTop: '14px' }}>
            How a Random <em>“Hey”</em> Became My Favourite Person
          </h1>
          <p className="section-subtitle" style={{ marginTop: '10px' }}>
            From a random Instagram request on 9 October to 1:51 AM on 25 October — every step brought me closer to you.
          </p>
        </div>
      </section>

      <section>
        <div className="container">
          {/* Instagram Origin Card */}
          <div className="velvet-card origin-banner">
            <div>
              <span className="eyebrow">9 October 2026 · Instagram</span>
              <h2 className="font-display" style={{ fontSize: '2.1rem', marginTop: '12px', lineHeight: 1.15 }}>
                Where Everything Quietly Began
              </h2>
              <p style={{ color: 'var(--text-secondary)', marginTop: '12px', lineHeight: 1.75 }}>
                I sent a random request on Instagram without knowing how much that single notification was going to
                change my days. One simple <strong>“Hey”</strong> turned into hours of talking, sharing every small
                detail, and realizing slowly — <em>dheere-dheere</em> — that nobody else felt the way you did.
              </p>
              <p style={{ color: 'var(--pink-blush)', marginTop: '14px', fontSize: '0.94rem' }}>
                “From a random Hey on Instagram to becoming an important part of each other’s lives…”
              </p>
            </div>

            <div className="dm-bubble-stack" aria-label="Our first chat memory">
              <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', textAlign: 'center', marginBottom: '4px' }}>
                9 October · Instagram DM
              </div>
              <div className="dm-bubble vashu">Hey ✨</div>
              <div className="dm-bubble nikki">Hii!</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textAlign: 'center', margin: '6px 0 2px' }}>
                25 October · 1:51 AM
              </div>
              <div className="dm-bubble nikki">I love you… ❤️</div>
              <div className="dm-bubble vashu">I love you too, Niharika. More than I can even put into words 🖤</div>
            </div>
          </div>

          {/* Interactive Timeline */}
          <div style={{ marginBottom: '26px' }}>
            <span className="eyebrow">
              <Sparkles size={13} /> Our Memory Timeline
            </span>
            <h2 className="section-title" style={{ marginTop: '12px', fontSize: 'clamp(1.9rem, 3.6vw, 2.7rem)' }}>
              Every Chapter So Far
            </h2>
          </div>

          <div className="timeline-list">
            {TIMELINE_EVENTS.map((ev) => (
              <article key={ev.date} className="velvet-card timeline-item">
                <span className="timeline-dot" aria-hidden="true" />
                <div>
                  <span className="eyebrow">{ev.badge}</span>
                  <div style={{ fontSize: '0.84rem', color: 'var(--pink-blush)', marginTop: '10px', fontWeight: 600 }}>
                    {ev.date}
                  </div>
                  <h3 className="font-display" style={{ fontSize: '1.8rem', marginTop: '4px', lineHeight: 1.15 }}>
                    {ev.title}
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', marginTop: '10px', lineHeight: 1.7 }}>{ev.description}</p>
                  <p
                    style={{
                      color: 'var(--pink-soft)',
                      marginTop: '12px',
                      fontStyle: 'italic',
                      fontSize: '0.92rem',
                      borderLeft: '2px solid var(--pink-vivid)',
                      paddingLeft: '12px',
                    }}
                  >
                    {ev.detail}
                  </p>
                </div>

                <div className={`timeline-photo${ev.isChat ? ' chat' : ''}`}>
                  <img src={ev.photo} alt={ev.title} loading="lazy" decoding="async" />
                </div>
              </article>
            ))}
          </div>

          {/* About Us & Motto */}
          <div className="motto-grid">
            <div className="velvet-card motto-card">
              <span className="eyebrow">Our Motto</span>
              <h3 className="font-display" style={{ fontSize: '1.65rem', marginTop: '12px' }}>
                {COUPLE_INFO.motto}
              </h3>
              <p style={{ color: 'var(--text-secondary)', marginTop: '10px', fontSize: '0.93rem' }}>
                Even when we argue over little things, we never walk away — we listen, understand each other, and sort
                everything out together.
              </p>
            </div>

            <div className="velvet-card motto-card">
              <span className="eyebrow">How Deep This Is</span>
              <h3 className="font-display" style={{ fontSize: '1.65rem', marginTop: '12px' }}>
                Stronger Than Ever Before
              </h3>
              <p style={{ color: 'var(--text-secondary)', marginTop: '10px', fontSize: '0.93rem' }}>
                I genuinely love you, Nikki. I’ve never felt this strongly for anyone before, and I want us to grow
                together and make this last.
              </p>
            </div>

            <div className="velvet-card motto-card">
              <span className="eyebrow">Looking Ahead</span>
              <h3 className="font-display" style={{ fontSize: '1.65rem', marginTop: '12px' }}>
                My Future Life Partner
              </h3>
              <p style={{ color: 'var(--text-secondary)', marginTop: '10px', fontSize: '0.93rem' }}>
                I imagine my future with you — traveling the world, achieving our dreams side by side, and making
                lifetimes of memories.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '36px', flexWrap: 'wrap' }}>
            <Link to="/about-nikki" className="btn-pink">
              Everything About My Nikki <ArrowRight size={16} />
            </Link>
            <Link to="/memories" className="btn-ghost">
              <Heart size={16} /> See Our Memories & Chocolates
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
