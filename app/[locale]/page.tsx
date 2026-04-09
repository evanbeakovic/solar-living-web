import { Link } from '@/navigation';

const cardGradient = 'linear-gradient(135deg, #1a3a4a 0%, #86cae7 50%, #edd98f 100%)';

export default function HomePage() {
  return (
    <>
      {/* ─── SECTION 1: HERO ─────────────────────────────────────────────── */}
      <section
        className="relative h-screen flex flex-col items-center justify-center text-center px-6"
        style={{ backgroundColor: '#474748' }}
      >
        {/* TODO: replace background with hero photo */}

        {/* Label */}
        <p className="font-sans text-xs uppercase tracking-widest mb-6 text-[#86cae7]">
          Umag, Croatia
        </p>

        {/* H1 */}
        <h1 className="font-serif text-6xl md:text-8xl leading-tight mb-7 max-w-5xl text-white">
          Your <em>Perfect</em> Stay in Istria
        </h1>

        {/* Subheading */}
        <p className="font-sans text-base md:text-lg mb-12 max-w-xl tracking-wide text-[#c8c8c8]">
          Handpicked apartments. Exceptional service. Unforgettable memories.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <Link
            href="/apartments"
            className="font-sans font-semibold text-sm uppercase tracking-widest px-8 py-4 transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#edd98f', color: '#474748' }}
          >
            Browse Apartments
          </Link>
          <Link
            href="/owners"
            className="font-sans font-semibold text-sm uppercase tracking-widest px-8 py-4 transition-colors hover:border-white text-white"
            style={{ border: '1px solid rgba(255,255,255,0.3)' }}
          >
            For Property Owners
          </Link>
        </div>

        {/* Thin line scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-20 h-px" style={{ backgroundColor: 'rgba(255,255,255,0.3)' }} />
      </section>

      {/* ─── SECTION 2: FEATURED APARTMENTS ─────────────────────────────── */}
      <section className="py-24 md:py-32 px-6" style={{ backgroundColor: '#474748' }}>
        <div className="max-w-5xl mx-auto">
          {/* Left-aligned header row */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-16 gap-4">
            <div>
              <p className="font-sans text-xs uppercase tracking-widest text-[#86cae7] mb-4">
                Our Collection
              </p>
              <h2 className="font-serif text-4xl md:text-5xl text-white">
                Our Apartments
              </h2>
            </div>
            <p className="font-sans text-sm text-[#c8c8c8] md:text-right md:max-w-xs">
              Every property is personally selected and meticulously maintained.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 1 */}
            <div
              className="overflow-hidden flex flex-col"
              style={{ backgroundColor: '#d8d8d8', border: '1px solid rgba(0,0,0,0.08)' }}
            >
              {/* TODO: replace with apartment photo */}
              <div className="h-64 flex items-center justify-center relative" style={{ background: cardGradient }}>
                <span
                  className="font-serif text-2xl tracking-widest"
                  style={{ color: 'rgba(255,255,255,0.15)' }}
                >
                  SOLAR LIVING
                </span>
              </div>
              <div className="p-6 space-y-4 flex flex-col flex-1">
                <p className="font-sans text-xs uppercase tracking-widest text-[#2a2a2a]">
                  Umag, Croatia
                </p>
                <h3 className="font-serif text-xl font-normal text-[#1a1a1a]">
                  Solar Apartment Umag I
                </h3>
                <p className="font-sans text-xs text-[#444444] tracking-wide">
                  4 guests · 2 bedrooms · Umag Old Town
                </p>
                <div className="mt-auto pt-2">
                  <Link
                    href="/apartments"
                    className="inline-block font-sans font-semibold text-xs uppercase tracking-widest px-4 py-2 text-[#1a1a1a] transition-colors hover:bg-[#1a1a1a] hover:text-white"
                    style={{ border: '1px solid #1a1a1a' }}
                  >
                    View &amp; Book
                  </Link>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div
              className="overflow-hidden flex flex-col"
              style={{ backgroundColor: '#d8d8d8', border: '1px solid rgba(0,0,0,0.08)' }}
            >
              {/* TODO: replace with apartment photo */}
              <div className="h-64 flex items-center justify-center relative" style={{ background: cardGradient }}>
                <span
                  className="font-serif text-2xl tracking-widest"
                  style={{ color: 'rgba(255,255,255,0.15)' }}
                >
                  SOLAR LIVING
                </span>
              </div>
              <div className="p-6 space-y-4 flex flex-col flex-1">
                <p className="font-sans text-xs uppercase tracking-widest text-[#2a2a2a]">
                  Umag, Croatia
                </p>
                <h3 className="font-serif text-xl font-normal text-[#1a1a1a]">
                  Solar Apartment Umag II
                </h3>
                <p className="font-sans text-xs text-[#444444] tracking-wide">
                  2 guests · Studio · Umag Seafront
                </p>
                <div className="mt-auto pt-2">
                  <Link
                    href="/apartments"
                    className="inline-block font-sans font-semibold text-xs uppercase tracking-widest px-4 py-2 text-[#1a1a1a] transition-colors hover:bg-[#1a1a1a] hover:text-white"
                    style={{ border: '1px solid #1a1a1a' }}
                  >
                    View &amp; Book
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* View all link */}
          <div className="text-center mt-12">
            <Link
              href="/apartments"
              className="font-sans text-xs uppercase tracking-widest transition-opacity hover:opacity-70 text-[#86cae7]"
            >
              View All Apartments →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── SECTION 3: WHY SOLAR LIVING ─────────────────────────────────── */}
      <section className="py-24 md:py-32 px-6" style={{ backgroundColor: '#525253' }}>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-16 md:gap-24 items-start">
          {/* Left — quote */}
          <div className="md:w-1/2">
            <blockquote className="font-serif text-2xl md:text-3xl italic leading-relaxed text-white">
              &ldquo;We don&apos;t just hand you the keys — we make sure every detail is taken care of, so you can simply enjoy.&rdquo;
            </blockquote>
            <p className="mt-6 font-sans text-xs uppercase tracking-widest text-[#b0b0b0]">
              — Solar Living Team
            </p>
          </div>

          {/* Right — features */}
          <div className="md:w-1/2 space-y-8">
            {[
              { title: 'Curated Properties',  body: 'Every apartment is handpicked and held to the highest standards.' },
              { title: '5-Star Service',      body: "From check-in to check-out, we're always here for you." },
              { title: 'Fully Equipped',      body: 'Everything you need for a perfect stay, already there waiting.' },
              { title: 'Top-Rated',           body: 'Our guests consistently leave 5-star reviews across all platforms.' },
            ].map(({ title, body }) => (
              <div
                key={title}
                className="pl-5 border-l-2"
                style={{ borderColor: '#edd98f' }}
              >
                <h4 className="font-sans font-semibold text-sm mb-1 text-white">{title}</h4>
                <p className="font-sans text-sm leading-relaxed text-[#c8c8c8]">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 4: OWNERS CTA BANNER ────────────────────────────────── */}
      <section className="py-24 md:py-32 px-6" style={{ backgroundColor: '#525253' }}>
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <p className="font-sans text-xs uppercase tracking-widest text-[#edd98f]">
            Property Owners
          </p>
          <h2 className="font-serif text-5xl md:text-6xl leading-tight text-white">
            Own a Property in Istria?
          </h2>
          <p className="font-sans text-base leading-relaxed max-w-xl mx-auto text-[#c8c8c8]">
            Join our portfolio and enjoy full management, guaranteed care, and outstanding results. We handle everything.
          </p>
          <Link
            href="/owners"
            className="inline-block font-sans font-semibold text-sm uppercase tracking-widest px-8 py-4 transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#edd98f', color: '#474748' }}
          >
            Get in Touch
          </Link>
        </div>
      </section>

      {/* ─── SECTION 5: LOCATION TEASER ──────────────────────────────────── */}
      <section
        className="py-24 md:py-32 px-6"
        style={{
          backgroundColor: '#474748',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <p className="font-sans text-xs uppercase tracking-widest text-[#86cae7]">
            Where We Are
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-white">
            Umag, Istria
          </h2>
          <p className="font-sans text-base leading-relaxed text-[#c8c8c8]">
            Nestled on the northwestern tip of Istria, Umag is a charming medieval town with crystal-clear Adriatic waters, world-class gastronomy, and a laid-back Mediterranean atmosphere. The perfect destination for a truly restorative holiday.
          </p>
        </div>
      </section>
    </>
  );
}
