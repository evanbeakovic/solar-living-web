'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';

type Review = {
  apartment: string;
  name: string;
  country: string;
  platform: string;
  stars: number;
  rating: string | null;
  text: string;
};

const arrowBase: React.CSSProperties = {
  width: 40,
  height: 40,
  borderRadius: '50%',
  border: 'none',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#ffffff',
  fontSize: '1.1rem',
  flexShrink: 0,
};

export default function ReviewsCarousel() {
  const t = useTranslations('home.reviews');
  const reviews = t.raw('items') as Review[];
  const [offset, setOffset] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const update = (e: MediaQueryList | MediaQueryListEvent) => {
      setIsMobile(e.matches);
      setOffset(0);
    };
    update(mq);
    mq.addEventListener('change', update as (e: MediaQueryListEvent) => void);
    return () => mq.removeEventListener('change', update as (e: MediaQueryListEvent) => void);
  }, []);

  // 1 card per step on mobile, 3 visible on desktop
  const maxOffset = isMobile ? reviews.length - 1 : reviews.length - 3;

  function navigate(dir: 1 | -1) {
    if (animating) return;
    const next = offset + dir;
    if (next < 0 || next > maxOffset) return;
    setAnimating(true);
    setOffset(next);
    setTimeout(() => setAnimating(false), 350);
  }

  function navigateTo(i: number) {
    if (i === offset || animating) return;
    setAnimating(true);
    setOffset(i);
    setTimeout(() => setAnimating(false), 350);
  }

  // On mobile: card fills the visible container width (100% of flex-1 div = 100% of the track container).
  // translateX of 100% on the track div equals the track div's own width, which matches the container.
  // On desktop: 3 cards visible with 32px gaps between them.
  const cardWidth = isMobile ? '100%' : 'calc((100% - 64px) / 3)';
  const trackTransform = isMobile
    ? `translateX(calc(-${offset} * (100% + 32px)))`
    : `translateX(calc(-${offset} * ((100% - 64px) / 3 + 32px)))`;

  return (
    <div>
      <div className="flex items-center gap-4 md:gap-6">
        {/* Left arrow — only shown when not at first position */}
        {offset > 0 ? (
          <button
            onClick={() => navigate(-1)}
            disabled={animating}
            aria-label={t('prevAriaLabel')}
            className="carousel-arrow"
            style={arrowBase}
          >
            ←
          </button>
        ) : (
          <div style={{ width: 40, flexShrink: 0 }} />
        )}

        {/*
          overflow-hidden clips the track.
          Desktop: card width = calc((100% - 64px) / 3), shift per step = card + 32px gap.
          Mobile:  card width = 100% of this container, shift per step = 100% + 32px gap.
          In both cases 100% in translateX refers to the track div's own width,
          which equals this overflow-hidden container's width.
        */}
        <div
          className="flex-1 overflow-hidden"
          onTouchStart={(e) => {
            touchStartX.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            if (touchStartX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchStartX.current;
            touchStartX.current = null;
            if (Math.abs(dx) > 48) navigate(dx < 0 ? 1 : -1);
          }}
        >
          <div
            className="flex gap-8"
            style={{
              transform: trackTransform,
              transition: 'transform 350ms ease-in-out',
            }}
          >
            {reviews.map((r) => (
              <div
                key={r.name}
                style={{ width: cardWidth, flexShrink: 0 }}
              >
                <div
                  className="flex flex-col p-6 h-full"
                  style={{
                    minHeight: 380,
                    backgroundColor: '#d8d8d8',
                  }}
                >
                  <p className="font-sans text-xs uppercase tracking-widest mb-3" style={{ color: '#888888' }}>
                    {r.apartment}
                  </p>
                  <h3 className="font-serif text-lg font-normal mb-1" style={{ color: '#1a1a1a' }}>
                    {r.name}
                  </h3>
                  <p className="font-sans text-xs mb-3" style={{ color: '#444444' }}>
                    {r.country}
                  </p>
                  <p className="text-base mb-4" style={{ color: '#edd98f' }}>
                    {'★'.repeat(r.stars)}
                    {r.rating && <span className="font-sans text-xs ml-1" style={{ color: '#888888' }}>{r.rating}</span>}
                  </p>
                  <p className="font-serif italic text-sm leading-relaxed" style={{ color: '#333333' }}>
                    &ldquo;{r.text}&rdquo;
                  </p>
                  <p className="font-sans text-xs uppercase tracking-widest mt-auto pt-4" style={{ color: '#888888' }}>
                    {r.platform}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right arrow — only shown when not at last position */}
        {offset < maxOffset ? (
          <button
            onClick={() => navigate(1)}
            disabled={animating}
            aria-label={t('nextAriaLabel')}
            className="carousel-arrow"
            style={arrowBase}
          >
            →
          </button>
        ) : (
          <div style={{ width: 40, flexShrink: 0 }} />
        )}
      </div>

      {/* Dot indicators — 3 dots on desktop (3 positions), 5 dots on mobile (5 positions).
          The button provides a 24px hit area; the visual dot stays 8px. */}
      <div className="flex justify-center mt-8">
        {Array.from({ length: maxOffset + 1 }).map((_, i) => (
          <button
            key={i}
            onClick={() => navigateTo(i)}
            aria-label={t('goToPosition', { position: i + 1 })}
            style={{
              padding: 8,
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
            }}
          >
            <span
              style={{
                display: 'block',
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: i === offset ? '#edd98f' : 'rgba(255,255,255,0.3)',
                transition: 'background 0.2s',
              }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
