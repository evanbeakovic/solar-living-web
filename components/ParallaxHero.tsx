'use client';

import { useEffect } from 'react';

/**
 * Renders nothing — attaches a passive scroll listener that applies a
 * translateY parallax and an opacity fade to the hero content element
 * (#hero-parallax-content).
 *
 * - Content rises at 85% of scroll speed (factor 0.15) on md+ screens for a
 *   subtle depth sensation; the translate is disabled below md, where scroll
 *   listeners are the flakiest performance case and the effect is barely
 *   visible anyway.
 * - Content fades to 0 over the first 60% of the viewport height so the hero
 *   visibly hands off to the next section (all screen sizes — opacity only).
 * - Under prefers-reduced-motion the listener is never attached at all.
 *
 * When the hero background photo lands (see the TODO in the home page hero),
 * hook its layer in here with a ~0.4 factor + slow scale for true depth.
 */
export default function ParallaxHero() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const mdQuery = window.matchMedia('(min-width: 768px)');
    let rafId: number;
    let pastHero = false;

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const el = document.getElementById('hero-parallax-content');
        if (!el) return;
        const y = window.scrollY;
        // Once fully past the hero the content is invisible (opacity 0) —
        // pin the final state once and skip style writes for the rest of
        // the page instead of re-writing them every frame.
        if (y >= window.innerHeight) {
          if (!pastHero) {
            pastHero = true;
            el.style.opacity = '0';
          }
          return;
        }
        pastHero = false;
        el.style.transform = mdQuery.matches ? `translateY(${y * 0.15}px)` : '';
        const fade = Math.min(y / (window.innerHeight * 0.6), 1);
        el.style.opacity = String(1 - fade);
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
      const el = document.getElementById('hero-parallax-content');
      if (el) {
        el.style.transform = '';
        el.style.opacity = '';
      }
    };
  }, []);

  return null;
}
