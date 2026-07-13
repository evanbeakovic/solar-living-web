'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const MD_BREAKPOINT = 768;
const MAX_DPR = 2;

// Extra height (px) added to the canvas/overlay beyond the visible
// viewport, split evenly above and below, so an iOS Safari toolbar show/
// hide transition never reveals a gray gap before the next resize event
// catches up. 180 covers the combined top+bottom chrome delta on current
// iPhones (URL bar + bottom tab bar), which can exceed 100px on its own.
const VERTICAL_OVERSCAN_PX = 180;

export type ScrollFrameBackgroundProps = {
  /** Frames live at `${basePath}/desktop/frame-XXX.jpg` and `${basePath}/mobile/frame-mobile-XXX.jpg`, 1-indexed, zero-padded to 3 digits. */
  basePath: string;
  desktopFrameCount: number;
  mobileFrameCount: number;
  /** Full CSS color for the flat tint painted over the frames, e.g. 'rgba(71, 71, 72, 0.7)'. */
  overlayColor: string;
  /**
   * 0.5 = centered crop (default). Bias mobile's horizontal anchor toward
   * an off-center subject that a centered cover-fit crop would clip — see
   * Home's 0.62 (its footage's sun sits at ~68% across the frame).
   */
  mobileHorizontalAnchor?: number;
  /**
   * Scopes scrub progress AND visibility to this element's own rendered
   * height instead of the whole document: progress reaches 1 — and the
   * canvas/overlay hide entirely via display:none, stopping all further
   * updates — once the element's bottom edge has scrolled entirely past
   * the viewport's top (i.e. none of the tracked element is on screen any
   * more). Whatever comes after it in the DOM then renders with zero
   * interference, on its own unchanged background.
   * Omit for the original whole-document behavior (background spans every
   * section of the page, as on Home).
   */
  scrollRangeRef?: React.RefObject<HTMLElement>;
};

function frameSrc(basePath: string, index: number, isMobile: boolean) {
  const n = String(index).padStart(3, '0');
  return isMobile ? `${basePath}/mobile/frame-mobile-${n}.jpg` : `${basePath}/desktop/frame-${n}.jpg`;
}

// iOS Safari's layout viewport (window.innerWidth/innerHeight) is pinned
// near the toolbar-COLLAPSED size and stays stable across toolbar
// transitions; window.visualViewport reports the smaller, currently-VISIBLE
// area, which shrinks whenever the toolbar expands. Sizing our coverage to
// the visualViewport (the smaller value) is backwards — it guarantees a gap
// the moment the toolbar collapses and reveals more of the page than we
// sized for. Taking the max of both gives an element that's always at
// least as large as the true maximum visible area.
//
// visualViewport.offsetTop/offsetLeft report how far the visual viewport's
// origin has scrolled away from the layout viewport's origin (relevant
// during toolbar animation, not just pinch-zoom/keyboard) — position: fixed
// is supposed to stay anchored to the layout viewport regardless, but iOS
// Safari has a documented history of drifting from that during toolbar
// transitions, so we fold the offset into our own positioning rather than
// trust a bare `top: 0` to track it.
function getViewportMetrics() {
  const vv = window.visualViewport;
  return {
    width: Math.max(window.innerWidth, vv ? vv.width : 0),
    height: Math.max(window.innerHeight, vv ? vv.height : 0),
    offsetTop: vv ? vv.offsetTop : 0,
    offsetLeft: vv ? vv.offsetLeft : 0,
  };
}

/**
 * Fixed, full-viewport <canvas> that scrubs through a pre-rendered frame
 * sequence in sync with page scroll progress (Apple product-page style),
 * plus a single flat-gray tint overlay that sits above it. Shared by Home
 * (whole-document progress, no scrollRangeRef, always visible) and the
 * Accommodation hero/collection (progress + visibility scoped to
 * scrollRangeRef's own height, hidden entirely once scrolled past it).
 *
 * Both elements are portaled to <body>: position: fixed here would
 * otherwise resolve against the .page-enter route wrapper (see
 * template.tsx) during its ~350ms enter transform, instead of the viewport
 * — same reason modals in this codebase are portaled.
 * Painted behind normal content via negative z-index rather than DOM
 * order, since the portal appends after Navbar/main/Footer in the tree —
 * the overlay sits between the canvas (z: -10) and normal content (z:
 * auto) at z: -5. Every section this background is meant to show behind
 * must have a fully transparent background of its own, or its opaque box
 * will simply paint over this — see the neutralized <body> background
 * below for why that's true even of ordinary non-positioned boxes.
 */
export default function ScrollFrameBackground({
  basePath,
  desktopFrameCount,
  mobileFrameCount,
  overlayColor,
  mobileHorizontalAnchor = 0.5,
  scrollRangeRef,
}: ScrollFrameBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    // Runs only once `mounted` flips true and the portaled elements have
    // actually rendered — on the initial pass the refs are still null
    // (this effect fires in the same commit that returned null), and with
    // an empty deps array it would never get a second chance to attach.
    if (!mounted) return;
    const canvas = canvasRef.current;
    const overlay = overlayRef.current;
    if (!canvas || !overlay) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // <body> carries its own opaque #474748 (see app/[locale]/layout.tsx,
    // shared by every page) as an ordinary in-flow box. Per CSS painting
    // order, negative z-index children (this canvas, z: -10) paint *before*
    // their stacking context's in-flow non-positioned descendants — and
    // since <body> doesn't establish its own stacking context, its own
    // background box is exactly such a descendant. So it paints over the
    // canvas regardless of DOM nesting. Neutralized while this component is
    // mounted and restored on unmount, same pattern as ParallaxHero's
    // imperative style overrides on #hero-parallax-content. Safe to share
    // across pages: only one instance of this component is ever mounted at
    // a time (each page mounts its own on route change), and every page
    // that uses it keeps its own sections transparent for the same reason.
    const prevBodyBg = document.body.style.backgroundColor;
    document.body.style.backgroundColor = 'transparent';

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mdQuery = window.matchMedia(`(min-width: ${MD_BREAKPOINT}px)`);
    const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);

    let images: HTMLImageElement[] = [];
    let loaded: boolean[] = [];
    let frameCount = 0;
    let isMobile = false;
    let currentTarget = 1; // float scroll-progress position in frame space [1, frameCount]
    let lastDrawnA = -1;
    let lastDrawnB = -1;
    let lastDrawnWeight = -1;
    let hidden = false;
    let scrollRafId = 0;
    let resizeRafId = 0;
    let generation = 0; // bumped on breakpoint change / unmount to invalidate in-flight onload callbacks

    // Sizes the canvas's CSS box, its drawing buffer, and the overlay div
    // all together from the true maximum viewport extent, with a vertical
    // overscan buffer and an offsetTop/offsetLeft correction so neither ever
    // falls short or drifts out of alignment during a toolbar transition.
    // Assigning canvas .width/.height clears its drawing buffer even to the
    // same value, so every call needs a redraw — callers reset lastDrawn*.
    function syncSizes() {
      const { width, height, offsetTop, offsetLeft } = getViewportMetrics();
      const displayHeight = height + VERTICAL_OVERSCAN_PX;
      const topOffset = offsetTop - VERTICAL_OVERSCAN_PX / 2;
      const leftOffset = offsetLeft;

      canvas!.style.top = `${topOffset}px`;
      canvas!.style.left = `${leftOffset}px`;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${displayHeight}px`;
      canvas!.width = Math.round(width * dpr);
      canvas!.height = Math.round(displayHeight * dpr);

      overlay!.style.top = `${topOffset}px`;
      overlay!.style.left = `${leftOffset}px`;
      overlay!.style.width = `${width}px`;
      overlay!.style.height = `${displayHeight}px`;
    }

    function setHidden(next: boolean) {
      if (next === hidden) return;
      hidden = next;
      canvas!.style.display = next ? 'none' : '';
      overlay!.style.display = next ? 'none' : '';
    }

    // Scoped mode only: the scrollY at which scrollRangeRef's own bottom
    // edge has scrolled entirely past the viewport's TOP — i.e. the exact
    // point where none of the tracked element is on screen any more.
    // Progress reaches 1 here, and scrolling any further hides the canvas/
    // overlay entirely — everything after them in the DOM renders on its
    // own unchanged background from that point on.
    //
    // This must NOT subtract viewport height (an earlier version did,
    // computing "the tracked element's bottom reaches the viewport's own
    // bottom edge" instead). That formula only matches "fully scrolled
    // past" when the tracked element is roughly one viewport tall. Here it
    // spans hero + the entire "Our Collection" grid — many viewport
    // heights — so subtracting viewport height hid the background a full
    // viewport-height early: right as the last two "Coming Soon" cards
    // filled the whole screen, confirmed by screenshot during debugging.
    // The fix is simply the element's raw document-space bottom edge, no
    // viewport-height adjustment.
    //
    // Recomputed on every scroll/resize (not cached) since it depends on
    // both the tracked element's layout height and the current viewport
    // height, either of which can change independently — a ResizeObserver
    // on the tracked element (attached below) additionally catches height
    // changes that happen without any scroll or window-resize event at all
    // (e.g. content changing after mount for reasons other than a
    // breakpoint change).
    //
    // Clamped to the page's own natural max scroll (documentHeight -
    // viewportHeight): if whatever comes after the tracked element (here,
    // the CTA + Footer) is itself shorter than one viewport, the page
    // simply can't be scrolled far enough for "bottom" to ever be reached
    // — the browser stops scrolling before the tracked element's bottom
    // edge clears the viewport's top, which would otherwise mean the
    // background never hides at all. Clamping guarantees it's gone by the
    // time the user reaches the true end of the page either way.
    function scopedMaxScroll(): number | null {
      if (!scrollRangeRef?.current) return null;
      const rect = scrollRangeRef.current.getBoundingClientRect();
      const bottom = rect.bottom + window.scrollY;
      const pageMaxScroll = document.documentElement.scrollHeight - window.innerHeight;
      return Math.max(0, Math.min(bottom, pageMaxScroll));
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
      // 0.5 (default) centers the crop; mobileHorizontalAnchor biases it
      // for footage with an off-center subject a centered crop would clip.
      const horizontalAnchor = isMobile ? mobileHorizontalAnchor : 0.5;
      const dx = (cw - dw) * horizontalAnchor;
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

    // Single source of truth for "where is scroll progress right now,
    // should we even be visible" — run from both the scroll and resize
    // paths so a resize that shifts the scoped boundary (viewport height
    // change, or the tracked element re-laying-out) re-evaluates hidden
    // state immediately rather than waiting for the next scroll event.
    function update() {
      const maxScroll = scopedMaxScroll();
      if (maxScroll !== null) {
        if (maxScroll <= 0 || window.scrollY >= maxScroll) {
          setHidden(true);
          return;
        }
        setHidden(false);
        const progress = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);
        currentTarget = Math.min(frameCount, Math.max(1, progress * (frameCount - 1) + 1));
        draw(currentTarget);
        return;
      }

      // Unscoped (Home): whole-document progress, always visible.
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? Math.min(Math.max(window.scrollY / scrollable, 0), 1) : 0;
      currentTarget = Math.min(frameCount, Math.max(1, progress * (frameCount - 1) + 1));
      draw(currentTarget);
    }

    function onScroll() {
      cancelAnimationFrame(scrollRafId);
      scrollRafId = requestAnimationFrame(update);
    }

    function onResize() {
      cancelAnimationFrame(resizeRafId);
      resizeRafId = requestAnimationFrame(() => {
        syncSizes();
        lastDrawnA = -1; // dimensions changed — force a redraw at the new size
        lastDrawnB = -1;
        lastDrawnWeight = -1;
        update();
      });
    }

    function setup() {
      const gen = ++generation;
      isMobile = !mdQuery.matches;
      syncSizes();
      lastDrawnA = -1;
      lastDrawnB = -1;
      lastDrawnWeight = -1;
      currentTarget = 1;

      if (reducedMotion) {
        // Single static midpoint frame — no scrubbing, no preloading the rest.
        const fullCount = isMobile ? mobileFrameCount : desktopFrameCount;
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
        img.src = frameSrc(basePath, staticIndex, isMobile);
        images[1] = img;
        // Scoped mode still needs an initial (and ongoing, via the scroll
        // listener attached below) visibility check even with no scrubbing
        // — e.g. a reload that restores a scroll position already past the
        // tracked range must hide immediately, not show a frozen frame.
        update();
        return;
      }

      frameCount = isMobile ? mobileFrameCount : desktopFrameCount;
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
        img.src = frameSrc(basePath, i, isMobile);
        images[i] = img;
      }

      update();
    }

    setup();
    window.addEventListener('resize', onResize, { passive: true });
    // visualViewport fires its own 'resize' (toolbar show/hide, pinch-zoom)
    // and 'scroll' (viewport offset changes, e.g. mid-toolbar-transition)
    // independently of window's 'resize' — iOS Safari doesn't reliably fire
    // the latter for every toolbar state change.
    window.visualViewport?.addEventListener('resize', onResize);
    window.visualViewport?.addEventListener('scroll', onResize);
    // Scoped mode needs the scroll listener even under reduced motion —
    // there's no frame scrubbing to do, but visibility still has to track
    // scroll position so the tracked range hides on schedule. Unscoped
    // (Home) keeps the original behavior: no listener at all when reduced
    // motion means nothing will ever change.
    if (!reducedMotion || scrollRangeRef) window.addEventListener('scroll', onScroll, { passive: true });
    mdQuery.addEventListener('change', setup);

    // Scoped mode only: catches the tracked element's own height changing
    // for reasons that fire neither a window 'resize' nor a 'scroll' event
    // (content changing after mount/hydration without a matching viewport
    // change) — window resize/visualViewport listeners above only cover
    // the viewport side of the scopedMaxScroll calculation, not this side.
    let resizeObserver: ResizeObserver | null = null;
    if (scrollRangeRef?.current) {
      resizeObserver = new ResizeObserver(onResize);
      resizeObserver.observe(scrollRangeRef.current);
    }

    return () => {
      generation++;
      resizeObserver?.disconnect();
      window.removeEventListener('resize', onResize);
      window.visualViewport?.removeEventListener('resize', onResize);
      window.visualViewport?.removeEventListener('scroll', onResize);
      window.removeEventListener('scroll', onScroll);
      mdQuery.removeEventListener('change', setup);
      cancelAnimationFrame(scrollRafId);
      cancelAnimationFrame(resizeRafId);
      document.body.style.backgroundColor = prevBodyBg;
    };
  }, [mounted, basePath, desktopFrameCount, mobileFrameCount, mobileHorizontalAnchor, scrollRangeRef]);

  if (!mounted) return null;

  return createPortal(
    <>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="scroll-frame-viewport-fallback fixed w-full pointer-events-none"
        style={{ top: 0, left: 0, zIndex: -10, backgroundColor: '#474748' }}
      />
      <div
        ref={overlayRef}
        aria-hidden="true"
        className="scroll-frame-viewport-fallback fixed w-full pointer-events-none"
        style={{ top: 0, left: 0, zIndex: -5, backgroundColor: overlayColor }}
      />
    </>,
    document.body
  );
}
