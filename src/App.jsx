import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { LoveProvider } from './context/LoveContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import OurStoryPage from './pages/OurStoryPage';
import AboutNikkiPage from './pages/AboutNikkiPage';
import GalleryPage from './pages/GalleryPage';
import MemoriesPage from './pages/MemoriesPage';
import LetterPage from './pages/LetterPage';

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const target = document.querySelector(hash);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <LoveProvider>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/our-story" element={<OurStoryPage />} />
            <Route path="/about-nikki" element={<AboutNikkiPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/memories" element={<MemoriesPage />} />
            <Route path="/letter" element={<LetterPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </Layout>
      </LoveProvider>
    </BrowserRouter>
  );
}
