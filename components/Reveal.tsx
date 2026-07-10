'use client';

import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';

/**
 * Scroll reveal: fade + 28px rise as the element enters the viewport.
 *
 * Server HTML renders fully visible — the hidden state (.reveal-init) is only
 * added from an effect after hydration, so crawlers and no-JS visitors never
 * see opacity:0 content. Respects prefers-reduced-motion by never hiding at
 * all. Once the transition settles, the reveal classes are removed so the
 * lingering transition can't interfere with hover effects in later phases.
 */

// One IntersectionObserver shared by every <Reveal/> on the page. Each element
// fires once, is unobserved immediately, and the observer is disconnected when
// the last element has revealed.
let observer: IntersectionObserver | null = null;
const pending = new Map<Element, () => void>();

function observe(el: Element, onReveal: () => void) {
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const cb = pending.get(entry.target);
          unobserve(entry.target);
          cb?.();
        }
      },
      // Fire when the element clears the bottom ~12% of the viewport
      { rootMargin: '0px 0px -12% 0px' }
    );
  }
  pending.set(el, onReveal);
  observer.observe(el);
}

function unobserve(el: Element) {
  if (!pending.delete(el)) return;
  observer?.unobserve(el);
  if (pending.size === 0) {
    observer?.disconnect();
    observer = null;
  }
}

const REVEAL_DURATION_MS = 700;
const MAX_STAGGER_MS = 400;

export default function Reveal({
  children,
  className,
  delay = 0,
  group = false,
  effect = 'rise',
}: {
  children: ReactNode;
  className?: string;
  /** Extra transition-delay in ms (single reveals only). */
  delay?: number;
  /** Stagger direct children 100ms apart (capped at the 5th child) instead of moving the block as one. */
  group?: boolean;
  /** 'rise' fades + rises; 'settle' scales a photo from 1.08 to rest (frame needs overflow-hidden). */
  effect?: 'rise' | 'settle';
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let timer: number | undefined;
    el.classList.add('reveal-init');
    observe(el, () => {
      el.classList.add('reveal-in');
      timer = window.setTimeout(() => {
        el.classList.remove('reveal-init', 'reveal-in');
      }, REVEAL_DURATION_MS + MAX_STAGGER_MS + delay + 200);
    });

    return () => {
      unobserve(el);
      window.clearTimeout(timer);
    };
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`${group ? 'reveal-group' : effect === 'settle' ? 'reveal-settle' : 'reveal'}${className ? ` ${className}` : ''}`}
      style={delay ? ({ '--reveal-delay': `${delay}ms` } as CSSProperties) : undefined}
    >
      {children}
    </div>
  );
}
