import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Heart,
  BookOpen,
  Sparkles,
  Image as ImageIcon,
  Gift,
  Mail,
  Home,
  Play,
  Pause,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { useLove } from '../context/LoveContext';
import FloatingHearts from './FloatingHearts';
import CelebrationBurst from './CelebrationBurst';
import WelcomeGate from './WelcomeGate';
import LoveModals from './LoveModals';

const NAV_ITEMS = [
  { to: '/', label: 'Home', short: 'Home', icon: Home },
  { to: '/our-story', label: 'Our Story', short: 'Story', icon: BookOpen },
  { to: '/about-nikki', label: 'About Nikki', short: 'Nikki', icon: Sparkles },
  { to: '/gallery', label: 'Photo Diary', short: 'Photos', icon: ImageIcon },
  { to: '/memories', label: 'Memories & Choco', short: 'Memories', icon: Gift },
  { to: '/letter', label: 'Love Letter', short: 'Letter', icon: Mail },
];

export default function Layout({ children }) {
  const { isPlaying, audioMuted, toggleMusic, toggleMute, openMissMeModal } = useLove();

  return (
    <div className="app-shell">
      <FloatingHearts />
      <CelebrationBurst />
      <WelcomeGate />
      <LoveModals />

      <header className="top-nav">
        <div className="container top-nav-inner">
          <NavLink to="/" className="brand-mark">
            <span className="brand-heart">
              <Heart size={16} fill="currentColor" />
            </span>
            <div>
              <div className="brand-text-main">OUR LITTLE WORLD</div>
              <div className="brand-text-sub">Vashu × Niharika · 25.10.2026</div>
            </div>
          </NavLink>

          <nav className="desktop-links" aria-label="Main navigation">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) => `nav-pill${isActive ? ' active' : ''}`}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="nav-actions">
            <button
              type="button"
              className="nav-miss-btn"
              aria-label="Click whenever you miss me"
              onClick={openMissMeModal}
            >
              <Heart size={14} fill="currentColor" />
              <span>Miss Me?</span>
            </button>
          </div>
        </div>
      </header>

      <main className="main-content">{children}</main>

      <footer className="site-footer">
        <div className="container">
          <p className="font-display" style={{ fontSize: '1.5rem', color: 'var(--white-warm)' }}>
            OUR LITTLE WORLD <span style={{ color: 'var(--pink-vivid)' }}>♡</span>
          </p>
          <p style={{ color: 'var(--pink-blush)', fontSize: '0.88rem', marginTop: '6px' }}>
            Vashu × Niharika (Nikki) · Keep choosing each other, every single day.
          </p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginTop: '8px' }}>
            Since 25 October 2026 · 1:51 AM 🖤
          </p>
        </div>
      </footer>

      {/* Floating Persistent Music Player */}
      <div className="music-dock" role="region" aria-label="Background music player">
        <button
          type="button"
          className="music-play-btn"
          onClick={toggleMusic}
          aria-label={isPlaying ? 'Pause music' : 'Play music'}
        >
          {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
        </button>

        <div className="music-meta">
          <span className="music-title">1:51 AM Melody</span>
          <span className="music-sub">{isPlaying ? 'Playing softly…' : 'Tap to play'}</span>
        </div>

        <div className={`eq-bars${isPlaying && !audioMuted ? ' playing' : ''}`} aria-hidden="true">
          <span className="eq-bar" />
          <span className="eq-bar" />
          <span className="eq-bar" />
        </div>

        <button
          type="button"
          onClick={toggleMute}
          aria-label={audioMuted ? 'Unmute music' : 'Mute music'}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--pink-blush)',
            cursor: 'pointer',
            display: 'grid',
            placeItems: 'center',
            padding: '4px',
          }}
        >
          {audioMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="mobile-dock" aria-label="Mobile navigation">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) => `mobile-dock-link${isActive ? ' active' : ''}`}
            >
              <Icon size={17} />
              <span>{item.short}</span>
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
}
