'use client';

import { useState } from 'react';

const reviews = [
  {
    apartment: "Elaine's View",
    name: 'Tania',
    country: 'Canada',
    platform: 'Airbnb',
    stars: 5,
    rating: null,
    text: '"Umag is a perfect spot to enjoy Istria — including day trips into Italy. The apartment was clean and comfortable with balcony views of evening sunsets over the Adriatic and the old town."',
  },
  {
    apartment: "Elaine's View",
    name: 'Stephan',
    country: 'Germany',
    platform: 'Airbnb',
    stars: 5,
    rating: null,
    text: '"We were received very kindly and personally. Always made to feel welcome. We found it very quiet and relaxing — exactly what we needed."',
  },
  {
    apartment: "Elaine's View",
    name: 'Jana',
    country: 'Czech Republic',
    platform: 'Booking.com',
    stars: 5,
    rating: '10/10',
    text: '"Very friendly and professional communication with the host. Right in front of the building is a city beach. We will definitely return."',
  },
  {
    apartment: "Stella's Garden",
    name: 'Peter',
    country: 'Slovakia',
    platform: 'Airbnb',
    stars: 5,
    rating: null,
    text: '"Extremely friendly host, always immediately available for questions with very quick answers. Everything was sparkling clean and very modern."',
  },
  {
    apartment: "Stella's Garden",
    name: 'Jehona',
    country: 'Slovenia',
    platform: 'Booking.com',
    stars: 5,
    rating: '10/10',
    text: '"Everything is excellent — better than a 5-star hotel. The owner was very kind and showed us everything. I recommend it to everyone."',
  },
];

// 5 cards total, 3 visible at a time → 3 positions (offset 0, 1, 2)
const MAX_OFFSET = reviews.length - 3; // 2

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
  transition: 'background 0.15s',
};

export default function ReviewsCarousel() {
  const [offset, setOffset] = useState(0);
  const [animating, setAnimating] = useState(false);

  function navigate(dir: 1 | -1) {
    if (animating) return;
    const next = offset + dir;
    if (next < 0 || next > MAX_OFFSET) return;
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

  return (
    <div>
      <div className="flex items-center gap-4 md:gap-6">
        {/* Left arrow — only shown when not at first position */}
        {offset > 0 ? (
          <button
            onClick={() => navigate(-1)}
            disabled={animating}
            aria-label="Previous"
            style={{ ...arrowBase, backgroundColor: 'rgba(255,255,255,0.1)' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(255,255,255,0.2)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(255,255,255,0.1)'; }}
          >
            ←
          </button>
        ) : (
          <div style={{ width: 40, flexShrink: 0 }} />
        )}

        {/*
          overflow-hidden clips the track; cards are sized to fit 3 exactly:
          card width = calc((100% - 64px) / 3)  (100% - two gap-8 gaps)
          shift per step = card_width + gap = calc((100% - 64px) / 3 + 32px)
          translateX 100% is relative to this container's own width (W),
          which equals the parent's width — same reference as the card widths.
        */}
        <div className="flex-1 overflow-hidden">
          <div
            className="flex gap-8"
            style={{
              transform: `translateX(calc(-${offset} * ((100% - 64px) / 3 + 32px)))`,
              transition: 'transform 350ms ease-in-out',
            }}
          >
            {reviews.map((r) => (
              <div
                key={r.name}
                style={{ width: 'calc((100% - 64px) / 3)', flexShrink: 0 }}
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
                    {r.text}
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
        {offset < MAX_OFFSET ? (
          <button
            onClick={() => navigate(1)}
            disabled={animating}
            aria-label="Next"
            style={{ ...arrowBase, backgroundColor: 'rgba(255,255,255,0.1)' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(255,255,255,0.2)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(255,255,255,0.1)'; }}
          >
            →
          </button>
        ) : (
          <div style={{ width: 40, flexShrink: 0 }} />
        )}
      </div>

      {/* Dot indicators — 3 dots for 3 positions */}
      <div className="flex justify-center gap-2 mt-8">
        {Array.from({ length: MAX_OFFSET + 1 }).map((_, i) => (
          <button
            key={i}
            onClick={() => navigateTo(i)}
            aria-label={`Go to position ${i + 1}`}
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              backgroundColor: i === offset ? '#edd98f' : 'rgba(255,255,255,0.3)',
              transition: 'background 0.2s',
            }}
          />
        ))}
      </div>
    </div>
  );
}
