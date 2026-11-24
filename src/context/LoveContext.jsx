import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react';
import { MISS_ME_NOTES, SPECIAL_REASONS_POPUP } from '../data/storyData';

const LoveContext = createContext(null);

export function LoveProvider({ children }) {
  const audioRef = useRef(null);
  const [entered, setEntered] = useState(() => {
    try {
      return sessionStorage.getItem('olw_entered') === '1';
    } catch {
      return false;
    }
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioMuted, setAudioMuted] = useState(false);

  // Modals & Interactive states
  const [specialOpen, setSpecialOpen] = useState(false);
  const [specialIndex, setSpecialIndex] = useState(0);

  const [missMeOpen, setMissMeOpen] = useState(false);
  const [missMeIndex, setMissMeIndex] = useState(0);
  const [missCount, setMissCount] = useState(() => {
    try {
      return Number(localStorage.getItem('olw_miss_count') || 0);
    } catch {
      return 0;
    }
  });

  // Celebration particles
  const [bursts, setBursts] = useState([]);

  const triggerBurst = useCallback((count = 20) => {
    const id = Date.now() + Math.random();
    const symbols = ['💗', '💖', '🌸', '🖤', '✨', '💕'];
    const particles = Array.from({ length: count }, (_, i) => {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.4;
      const dist = 90 + Math.random() * 200;
      return {
        key: `${id}-${i}`,
        symbol: symbols[i % symbols.length],
        tx: `${Math.cos(angle) * dist}px`,
        ty: `${Math.sin(angle) * dist - 60}px`,
        rot: `${Math.round((Math.random() - 0.5) * 320)}deg`,
      };
    });
    setBursts((prev) => [...prev, { id, particles }]);
    setTimeout(() => {
      setBursts((prev) => prev.filter((b) => b.id !== id));
    }, 1700);
  }, []);

  useEffect(() => {
    const audio = new Audio('/media/our-little-world.wav');
    audio.loop = true;
    audio.volume = 0.55;
    audio.preload = 'auto';
    audioRef.current = audio;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);

    return () => {
      audio.pause();
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
    };
  }, []);

  const startMusic = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      audio.muted = false;
      setAudioMuted(false);
      await audio.play();
    } catch {
      // Browser prevented unmuted autoplay without interaction
    }
  }, []);

  const pauseMusic = useCallback(() => {
    const audio = audioRef.current;
    if (audio && !audio.paused) {
      audio.pause();
    }
  }, []);

  const toggleMusic = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      await startMusic();
    } else {
      audio.pause();
    }
  }, [startMusic]);

  const toggleMute = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setAudioMuted(audio.muted);
  }, []);

  const enterWorld = useCallback(async () => {
    setEntered(true);
    try {
      sessionStorage.setItem('olw_entered', '1');
    } catch {
      // ignore storage failure
    }
    triggerBurst(22);
    await startMusic();
  }, [startMusic, triggerBurst]);

  const openSpecialModal = useCallback(() => {
    setSpecialIndex((prev) => (prev + 1) % SPECIAL_REASONS_POPUP.length);
    setSpecialOpen(true);
    triggerBurst(18);
  }, [triggerBurst]);

  const openMissMeModal = useCallback(() => {
    setMissMeIndex((prev) => (prev + 1) % MISS_ME_NOTES.length);
    setMissMeOpen(true);
    setMissCount((prev) => {
      const next = prev + 1;
      try {
        localStorage.setItem('olw_miss_count', String(next));
      } catch {
        // ignore
      }
      return next;
    });
    triggerBurst(14);
  }, [triggerBurst]);

  const value = {
    entered,
    enterWorld,
    isPlaying,
    audioMuted,
    toggleMusic,
    toggleMute,
    pauseMusic,
    startMusic,
    specialOpen,
    setSpecialOpen,
    specialIndex,
    setSpecialIndex,
    openSpecialModal,
    missMeOpen,
    setMissMeOpen,
    missMeIndex,
    setMissMeIndex,
    missCount,
    openMissMeModal,
    bursts,
    triggerBurst,
  };

  return <LoveContext.Provider value={value}>{children}</LoveContext.Provider>;
}

export function useLove() {
  const ctx = useContext(LoveContext);
  if (!ctx) throw new Error('useLove must be used inside LoveProvider');
  return ctx;
}
