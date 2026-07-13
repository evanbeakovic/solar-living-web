'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { HOME_OVERLAY_BG } from '@/lib/homeTheme';

const DESKTOP_FRAME_COUNT = 314;
const MOBILE_FRAME_COUNT = 314;
const MD_BREAKPOINT = 768;
const MAX_DPR = 2;

function frameSrc(index: number, isMobile: boolean) {
  const n = String(index).padStart(3, '0');
  return isMobile
    ? `/hero-frames/mobile/frame-mobile-${n}.jpg`
    : `/hero-frames/desktop/frame-${n}.jpg`;
}

/**
 * Fixed, full-viewport <canvas> that scrubs through a pre-rendered frame
 * sequence in sync with Home page scroll progress (Apple product-page
 * style), plus the single flat-gray tint overlay that sits above it. Home-
 * only — mounted directly by the Home page, unmounts on route change like
 * everything else in app/[locale]/template.tsx.
 *
 * Both elements are portaled to <body>: position: fixed here would
 * otherwise resolve against the .page-enter route wrapper (see
 * template.tsx) during its ~350ms enter transform, instead of the viewport
 * — same reason the booking modal in accommodation/page.tsx is portaled.
 * Painted behind normal content via negative z-index rather than DOM
 * order, since the portal appends after Navbar/main/Footer in the tree —
 * the overlay sits between the canvas (z: -10) and normal content (z:
 * auto) at z: -5. Every Home-page section/Navbar/Footer background is
 * fully transparent, so this is the only gray layer that ever paints —
 * no compounding opacity stacks.
 */
export default function ScrollFrameBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    // Runs only once `mounted` flips true and the portaled <canvas> has
    // actually rendered — on the initial pass canvasRef.current is still
    // null (this effect fires in the same commit that returned null), and
    // with an empty deps array it would never get a second chance to attach.
    if (!mounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // <body> carries its own opaque #474748 (see app/[locale]/layout.tsx,
    // shared by every page) as an ordinary in-flow box. Per CSS painting
    // order, negative z-index children (this canvas, z: -10) paint *before*
    // their stacking context's in-flow non-positioned descendants — and
    // since <body> doesn't establish its own stacking context, its own
    // background box is exactly such a descendant. So it paints over the
    // canvas regardless of DOM nesting. Neutralized here (Home-only, since
    // this component is Home-only) and restored on unmount, same pattern as
    // ParallaxHero's imperative style overrides on #hero-parallax-content.
    const prevBodyBg = document.body.style.backgroundColor;
    document.body.style.backgroundColor = 'transparent';

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mdQuery = window.matchMedia(`(min-width: ${MD_BREAKPOINT}px)`);
    const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);

    let images: HTMLImageElement[] = [];
    let loaded: boolean[] = [];
    let frameCount = 0;
    let currentTarget = 1; // float scroll-progress position in frame space [1, frameCount]
    let lastDrawnA = -1;
    let lastDrawnB = -1;
    let lastDrawnWeight = -1;
    let scrollRafId = 0;
    let resizeRafId = 0;
    let generation = 0; // bumped on breakpoint change / unmount to invalidate in-flight onload callbacks

    function resizeCanvas() {
      // Assigning .width/.height clears the drawing buffer even to the same
      // value, so every resize needs a redraw — callers reset lastDrawn*.
      canvas!.width = Math.round(window.innerWidth * dpr);
      canvas!.height = Math.round(window.innerHeight * dpr);
    }

    // Nearest already-loaded frame to `target` (checked outward in both
    // directions), so scrubbing past a not-yet-fetched frame holds the
    // closest visual match instead of drawing nothing. Returns -1 if no
    // frame has loaded at all yet.
    function resolveLoaded(target: number) {
      if (loaded[target]) return target;
      let back = target - 1;
      let fwd = target + 1;
      while (back >= 1 || fwd <= frameCount) {
        if (back >= 1 && loaded[back]) return back;
        if (fwd <= frameCount && loaded[fwd]) return fwd;
        back--;
        fwd++;
      }
      return -1;
    }

    function drawFrameAtIndex(index: number, alpha: number) {
      const img = images[index];
      const cw = canvas!.width;
      const ch = canvas!.height;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      if (!iw || !ih) return false;

      const scale = Math.max(cw / iw, ch / ih);
      const dw = iw * scale;
      const dh = ih * scale;
      const dx = (cw - dw) / 2;
      const dy = (ch - dh) / 2;
      ctx!.globalAlpha = alpha;
      ctx!.drawImage(img, dx, dy, dw, dh);
      return true;
    }

    // Crossfades between the two frames straddling `position` (a float in
    // [1, frameCount]) — e.g. position 12.35 draws frame 12 opaque, then
    // frame 13 at 35% opacity on top, so the transition dissolves instead of
    // hard-cutting. Each side resolves its own nearest-loaded fallback
    // independently, so one side loading in ahead of the other never blocks
    // the blend.
    function draw(position: number) {
      const clamped = Math.min(Math.max(position, 1), frameCount);
      const frameA = Math.floor(clamped);
      const frameB = Math.min(frameA + 1, frameCount);
      const weight = clamped - frameA;

      if (frameA === lastDrawnA && frameB === lastDrawnB && weight === lastDrawnWeight) return;

      const resolvedA = resolveLoaded(frameA);
      const resolvedB = resolveLoaded(frameB);
      if (resolvedA === -1 && resolvedB === -1) return;

      lastDrawnA = frameA;
      lastDrawnB = frameB;
      lastDrawnWeight = weight;

      ctx!.globalAlpha = 1;
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

      const drewA = resolvedA !== -1 && drawFrameAtIndex(resolvedA, 1);
      if (resolvedB !== -1 && resolvedB !== resolvedA) {
        const alphaB = drewA ? weight : 1;
        if (alphaB > 0) drawFrameAtIndex(resolvedB, alphaB);
      }

      ctx!.globalAlpha = 1;
      // The CSS placeholder color is only a loading-state fallback for the
      // gap before the first frame paints — clear it once real frame data
      // is on the canvas so a future draw failure would show through as
      // transparent (revealing the page behind it) instead of silently
      // looking like this color was the intended background.
      if (canvas!.style.backgroundColor) canvas!.style.backgroundColor = '';
    }

    function onScroll() {
      cancelAnimationFrame(scrollRafId);
      scrollRafId = requestAnimationFrame(() => {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        const progress = scrollable > 0 ? Math.min(Math.max(window.scrollY / scrollable, 0), 1) : 0;
        currentTarget = Math.min(frameCount, Math.max(1, progress * (frameCount - 1) + 1));
        draw(currentTarget);
      });
    }

    function onResize() {
      cancelAnimationFrame(resizeRafId);
      resizeRafId = requestAnimationFrame(() => {
        resizeCanvas();
        lastDrawnA = -1; // dimensions changed — force a redraw at the new size
        lastDrawnB = -1;
        lastDrawnWeight = -1;
        draw(currentTarget);
      });
    }

    function setup() {
      const gen = ++generation;
      const isMobile = !mdQuery.matches;
      resizeCanvas();
      lastDrawnA = -1;
      lastDrawnB = -1;
      lastDrawnWeight = -1;
      currentTarget = 1;

      if (reducedMotion) {
        // Single static midpoint frame — no scrubbing, no preloading the rest.
        const fullCount = isMobile ? MOBILE_FRAME_COUNT : DESKTOP_FRAME_COUNT;
        const staticIndex = Math.ceil(fullCount / 2);
        frameCount = 1;
        images = [];
        loaded = [false, false];
        const img = new Image();
        img.decoding = 'async';
        img.onload = () => {
          if (gen !== generation) return;
          loaded[1] = true;
          draw(1);
        };
        img.src = frameSrc(staticIndex, isMobile);
        images[1] = img;
        return;
      }

      frameCount = isMobile ? MOBILE_FRAME_COUNT : DESKTOP_FRAME_COUNT;
      images = new Array(frameCount + 1);
      loaded = new Array(frameCount + 1).fill(false);

      for (let i = 1; i <= frameCount; i++) {
        const img = new Image();
        img.decoding = 'async';
        if (i === 1) {
          (img as HTMLImageElement & { fetchPriority?: string }).fetchPriority = 'high';
        }
        img.onload = () => {
          if (gen !== generation) return;
          loaded[i] = true;
          // Show frame 1 the moment it lands (fallback while the rest
          // load), and redraw if this frame is one of the current blend
          // pair (either side of the crossfade) that just became ready.
          const flooredTarget = Math.floor(currentTarget);
          const ceilTarget = Math.min(frameCount, flooredTarget + 1);
          if (lastDrawnA === -1 || i === flooredTarget || i === ceilTarget) draw(currentTarget);
        };
        img.src = frameSrc(i, isMobile);
        images[i] = img;
      }

      onScroll();
    }

    setup();
    window.addEventListener('resize', onResize, { passive: true });
    if (!reducedMotion) window.addEventListener('scroll', onScroll, { passive: true });
    mdQuery.addEventListener('change', setup);

    return () => {
      generation++;
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onScroll);
      mdQuery.removeEventListener('change', setup);
      cancelAnimationFrame(scrollRafId);
      cancelAnimationFrame(resizeRafId);
      document.body.style.backgroundColor = prevBodyBg;
    };
  }, [mounted]);

  if (!mounted) return null;

  return createPortal(
    <>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="fixed inset-0 h-screen w-screen pointer-events-none"
        style={{ zIndex: -10, backgroundColor: '#474748' }}
      />
      <div
        aria-hidden="true"
        className="fixed inset-0 h-screen w-screen pointer-events-none"
        style={{ zIndex: -5, backgroundColor: HOME_OVERLAY_BG }}
      />
    </>,
    document.body
  );
}
