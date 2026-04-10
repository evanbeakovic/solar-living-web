'use client';

import { useEffect } from 'react';

/**
 * Renders nothing — attaches a passive scroll listener that applies a
 * translateY parallax to the hero content element (#hero-parallax-content).
 * Factor 0.15: content rises at 85% of scroll speed, lingering in view
 * slightly longer and creating a subtle depth sensation.
 */
export default function ParallaxHero() {
  useEffect(() => {
    let rafId: number;

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const y = window.scrollY;
        const el = document.getElementById('hero-parallax-content');
        if (el) el.style.transform = `translateY(${y * 0.15}px)`;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return null;
}
