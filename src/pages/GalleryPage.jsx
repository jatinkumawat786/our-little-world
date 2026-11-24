import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Image as ImageIcon, Heart, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GALLERY_PHOTOS } from '../data/storyData';

const CATEGORIES = ['All', 'Pink & Rose', 'Traditional', 'Close-ups', 'Cute & Candid', 'Keepsakes'];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIdx, setLightboxIdx] = useState(null);
  const [likedIds, setLikedIds] = useState(() => {
    try {
      const saved = localStorage.getItem('olw_liked_photos');
      return saved ? JSON.parse(saved) : ['pink-saree', 'first-meet-card'];
    } catch {
      return ['pink-saree', 'first-meet-card'];
    }
  });

  const visiblePhotos =
    activeCategory === 'All'
      ? GALLERY_PHOTOS
      : GALLERY_PHOTOS.filter((p) => p.category === activeCategory);

  const toggleLike = (e, id) => {
    e.stopPropagation();
    setLikedIds((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem('olw_liked_photos', JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  useEffect(() => {
    if (lightboxIdx === null) return undefined;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setLightboxIdx(null);
      if (e.key === 'ArrowRight') {
        setLightboxIdx((prev) => (prev + 1) % visiblePhotos.length);
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIdx((prev) => (prev - 1 + visiblePhotos.length) % visiblePhotos.length);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightboxIdx, visiblePhotos.length]);

  const activePhoto = lightboxIdx !== null ? visiblePhotos[lightboxIdx] : null;

  return (
    <div className="page-enter">
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">
            <ImageIcon size={13} /> Our Photo Diary
          </span>
          <h1 className="section-title" style={{ marginTop: '14px' }}>
            Every Shade of <em>My Nikki</em>
          </h1>
          <p className="section-subtitle" style={{ marginTop: '10px' }}>
            Your smiles, your traditional drapes, those dark kohl eyes, and every little memory saved in one place. Tap
            any picture to open it up close.
          </p>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="filter-bar" role="tablist" aria-label="Filter photos by mood">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={activeCategory === cat}
                className={`filter-chip${activeCategory === cat ? ' active' : ''}`}
                onClick={() => {
                  setActiveCategory(cat);
                  setLightboxIdx(null);
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="masonry-grid">
            {visiblePhotos.map((photo, idx) => {
              const isLiked = likedIds.includes(photo.id);
              return (
                <article
                  key={photo.id}
                  className="masonry-item"
                  onClick={() => setLightboxIdx(idx)}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') setLightboxIdx(idx);
                  }}
                >
                  <img src={photo.src} alt={photo.caption} loading="lazy" decoding="async" />
                  <div className="masonry-overlay">
                    <p className="masonry-caption">{photo.caption}</p>
                    <div className="masonry-meta">
                      <span>{photo.category}</span>
                      <button
                        type="button"
                        onClick={(e) => toggleLike(e, photo.id)}
                        aria-label={isLiked ? 'Unlike photo' : 'Like photo'}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: isLiked ? 'var(--pink-vivid)' : 'var(--text-muted)',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                        }}
                      >
                        <Heart size={15} fill={isLiked ? 'currentColor' : 'none'} />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Lightbox rendered in body portal above sticky header */}
      {activePhoto &&
        createPortal(
          <div
            className="lightbox-backdrop"
            role="dialog"
            aria-modal="true"
            aria-label="Photo lightbox"
            onClick={() => setLightboxIdx(null)}
          >
            <button
              type="button"
              className="lightbox-close"
              aria-label="Close lightbox"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIdx(null);
              }}
            >
              <X size={20} />
            </button>

            <button
              type="button"
              className="lightbox-nav prev"
              aria-label="Previous photo"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIdx((prev) => (prev - 1 + visiblePhotos.length) % visiblePhotos.length);
              }}
            >
              <ChevronLeft size={22} />
            </button>

            <div className="lightbox-shell" onClick={(e) => e.stopPropagation()}>
              <img src={activePhoto.src} alt={activePhoto.caption} className="lightbox-img" />
              <p className="font-display" style={{ fontSize: '1.55rem', color: 'var(--white-warm)', textAlign: 'center' }}>
                {activePhoto.caption}
              </p>
              <span style={{ fontSize: '0.82rem', color: 'var(--pink-blush)' }}>
                {activePhoto.category} · {lightboxIdx + 1} / {visiblePhotos.length}
              </span>
            </div>

            <button
              type="button"
              className="lightbox-nav next"
              aria-label="Next photo"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIdx((prev) => (prev + 1) % visiblePhotos.length);
              }}
            >
              <ChevronRight size={22} />
            </button>
          </div>,
          document.body
        )}
    </div>
  );
}
