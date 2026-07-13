'use client';

import { useEffect } from 'react';

/**
 * Same rAF-throttled scroll-parallax technique as ParallaxHero
 * (#hero-parallax-content on the Home page): translateY(scrollY * factor) on
 * a normal in-flow, absolutely-positioned layer.
 *
 * The sign of `factor` is easy to get backwards, so to be explicit about the
 * physics: with no transform at all, an in-flow element's on-screen position
 * already moves upward by exactly `scrollY` px per px scrolled (that's just
 * normal document scrolling — 1x speed, no lag). Adding
 * `translateY(scrollY * factor)` shifts the element DOWN by that amount on
 * top of the natural upward drift, so its net upward speed becomes
 * `(1 - factor)x`:
 *   - factor 0        → moves at normal 1x speed (no lag, no boost)
 *   - factor in (0, 1) → moves SLOWER than normal (drifts/recedes — a "far"
 *                         background layer)
 *   - factor < 0       → moves FASTER than normal (rushes past — a "near"
 *                         foreground layer)
 * The foreground (cutout) needs a NEGATIVE factor to close the gap on and
 * rise over the heading as the user scrolls.
 *
 * BASE_SHIFT is a constant, scroll-independent term that sets the cutout's
 * REST position (scrollY 0) — a static composition choice (shows more
 * house/pool immediately on load), not motion, so unlike the scroll-driven
 * term below it applies everywhere: desktop, mobile, and under
 * prefers-reduced-motion.
 *
 * CUTOUT_ACCEL_CAP bounds how far the -0.9 rate is allowed to accumulate.
 * A hard `Math.min(y, CAP)` clamp (an earlier version of this component)
 * makes the cutout's velocity hold at 1.9x right up to the cap and then
 * instantly drop to a flat 1x — a real, measured discontinuity (verified:
 * -19px per 10px of scroll below the cap, -10px per 10px above it, with
 * nothing in between). The heading/subtext never change their own
 * behavior — they're plain in-flow text, always exactly 1x — but the
 * cutout suddenly locking to the same rate *right next to* a layer that
 * never changed reads as if the text had just switched behavior. The fix
 * belongs here, on the cutout's easing, not on the text. `softCap` below
 * approaches CUTOUT_ACCEL_CAP asymptotically (derivative e^(-y/CAP): 1 at
 * y=0, continuously decreasing, never discontinuous) instead of hitting it
 * and stopping, so the cutout's velocity tapers smoothly toward 1x rather
 * than snapping to it.
 *
 * These three numbers (BASE_SHIFT, CUTOUT_ACCEL_CAP, and the cutout's
 * rendered height in page.tsx, h-[150vh]) are one coherent set, sized
 * together against the hero's own height (min-h-[110vh] in page.tsx) — do
 * not change one without re-deriving the others:
 *   - The cutout's object-cover zoom scales directly with its rendered
 *     height, so that height can't just be inflated arbitrarily to buy
 *     safety margin — a much taller box (250vh, used in an earlier pass)
 *     reads as visibly over-zoomed versus the source photo's natural
 *     framing. It's kept close to the hero's own height (150vh vs. 110vh)
 *     to stay near that natural zoom level.
 *   - Given that modest height budget, BASE_SHIFT and the cap are sized
 *     down to match: required height ≈ heroHeight + |BASE_SHIFT| +
 *     |factor|·cap (the layer must never trail the sky layer's own
 *     natural bottom edge, which recedes at 1x with scroll — that's the
 *     full derivation for why "just cover the viewport" isn't enough on
 *     its own). At 110vh/-90/160 that's ≈110vh+90px+144px ≈ 137vh at a
 *     ~900px-tall viewport, comfortably under the 150vh actually used —
 *     softCap(y) only approaches CUTOUT_ACCEL_CAP in the limit and never
 *     reaches it for any finite y, so this stays a safe upper bound.
 *   - The hero's own natural bottom reaches the viewport bottom only
 *     ~10vh into the scroll (110vh hero − 100vh viewport), so "What We
 *     Offer" is already easing in at the bottom edge well before the cap
 *     (160px) is reached — that's Fix 2's point (sooner handoff) and is
 *     expected, not a bug; the height math above guarantees no seam
 *     appears in that overlap, and the heading/house crossover (near the
 *     top of the viewport) still finishes with room to spare before it.
 */
const BASE_SHIFT = -90;
const CUTOUT_FACTOR = -0.9;
const CUTOUT_ACCEL_CAP = 160;

// Asymptotically approaches CUTOUT_ACCEL_CAP — see the CUTOUT_ACCEL_CAP
// comment above for why this replaced a hard Math.min(y, CAP) clamp.
function softCap(y: number, cap: number): number {
  return cap * (1 - Math.exp(-y / cap));
}

export default function OwnersHeroParallax() {
  useEffect(() => {
    const cutout = document.getElementById('owners-hero-cutout');
    if (!cutout) return;

    const restTransform = `translateY(${BASE_SHIFT}px)`;
    cutout.style.transform = restTransform;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const mdQuery = window.matchMedia('(min-width: 768px)');
    let rafId: number;

    const apply = () => {
      if (!mdQuery.matches) {
        cutout.style.transform = restTransform;
        return;
      }
      const y = window.scrollY;
      const offset = BASE_SHIFT + CUTOUT_FACTOR * softCap(y, CUTOUT_ACCEL_CAP);
      cutout.style.transform = `translateY(${offset}px)`;
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(apply);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
      cutout.style.transform = restTransform;
    };
  }, []);

  return null;
}
