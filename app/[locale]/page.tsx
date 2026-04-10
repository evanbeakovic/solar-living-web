import type { Metadata } from 'next';
import Image from 'next/image';
import { MapPin } from 'lucide-react';
import { Link } from '@/navigation';
import ReviewsCarousel from '@/components/ReviewsCarousel';
import ParallaxHero from '@/components/ParallaxHero';

export const metadata: Metadata = {
  title: 'Solar Living | Premium Apartments in Umag, Istria',
  description:
    'Discover handpicked holiday apartments in Umag, Istria. Sea views, sunset terraces, and exceptional service. Book directly with Solar Living.',
  robots: 'index, follow',
  alternates: { canonical: 'https://solarliving.hr' },
  openGraph: {
    title: 'Solar Living | Premium Apartments in Umag, Istria',
    description:
      'Discover handpicked holiday apartments in Umag, Istria. Sea views, sunset terraces, and exceptional service. Book directly with Solar Living.',
    url: 'https://solarliving.hr',
    siteName: 'Solar Living',
    type: 'website',
    images: [{ url: 'https://solarliving.hr/images/umag-1-main.jpg' }],
  },
  twitter: { card: 'summary_large_image' },
};

const homeJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LodgingBusiness',
  name: 'Solar Living',
  description:
    'Boutique property management and holiday apartment rentals in Umag, Istria, Croatia. Premium sea-view apartments with exceptional guest service.',
  url: 'https://solarliving.hr',
  logo: 'https://solarliving.hr/solar-logo-white.png',
  image: 'https://solarliving.hr/images/umag-1-main.jpg',
  telephone: '+385915483354',
  email: 'solarliving.info@gmail.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Ul. 8. ožujka 1A',
    addressLocality: 'Umag',
    addressCountry: 'HR',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 45.4327,
    longitude: 13.521,
  },
  areaServed: 'Umag, Istria, Croatia',
  priceRange: '€€€',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '9.9',
    bestRating: '10',
    worstRating: '1',
    reviewCount: '12',
  },
  sameAs: ['https://www.instagram.com/solarliving_', 'https://solarcreative.hr'],
};


export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />
      <ParallaxHero />
      {/* ─── SECTION 1: HERO ─────────────────────────────────────────────── */}
      <section
        className="relative h-screen flex flex-col items-center justify-center text-center px-6"
        style={{ backgroundColor: '#474748' }}
      >
        {/* TODO: replace background with hero photo */}

        {/* Content wrapper — targeted by ParallaxHero for translateY effect */}
        <div
          id="hero-parallax-content"
          className="flex flex-col items-center"
          style={{ willChange: 'transform' }}
        >
          {/* Label */}
          <p className="font-sans text-xs uppercase tracking-widest mb-6 text-[#86cae7]">
            Umag, Croatia
          </p>

          {/* H1 */}
          <h1 className="font-serif text-4xl md:text-[5rem] leading-tight tracking-tight mb-7 md:whitespace-nowrap text-white">
            Your <em>Perfect</em> Stay in Istria
          </h1>

          {/* Subheading */}
          <p className="font-sans text-base md:text-lg mb-12 max-w-3xl tracking-wide text-[#c8c8c8]">
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
                Apartments
              </h2>
            </div>
            <p className="font-sans text-sm text-[#c8c8c8] md:text-right md:max-w-xs">
              Every property is personally selected<br />and meticulously maintained.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 1 */}
            <div
              className="flex flex-col"
              style={{ backgroundColor: '#d8d8d8', border: '1px solid rgba(0,0,0,0.08)' }}
            >
              <div className="h-64 relative overflow-hidden">
                <Image src="/images/umag-1-main.jpg" alt="Elaine's View" fill className="object-cover" />
              </div>
              <div className="p-6 space-y-4 flex flex-col flex-1">
                <a
                  href="https://www.google.com/maps/search/Apartment+Elaine%27s+View+Umag"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center gap-1 font-sans text-xs uppercase tracking-widest cursor-pointer"
                  style={{ color: '#888888' }}
                >
                  <MapPin size={14} style={{ color: '#86cae7', flexShrink: 0 }} />
                  Umag, Croatia
                  <div
                    className="absolute left-0 bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50"
                    style={{ width: '280px', backgroundColor: '#2a2a2a' }}
                  >
                    <iframe
                      src="https://maps.google.com/maps?q=Ul.+8.+ožujka+1A,+Umag,+Croatia&output=embed"
                      width="280"
                      height="180"
                      style={{ border: 0, display: 'block' }}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </a>
                <h3 className="font-serif text-xl font-normal text-[#1a1a1a]">
                  Elaine&apos;s View
                </h3>
                <p className="font-sans text-xs text-[#444444] tracking-wide">
                  6 guests · 3 bedrooms · Terrace &amp; balcony
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
              className="flex flex-col"
              style={{ backgroundColor: '#d8d8d8', border: '1px solid rgba(0,0,0,0.08)' }}
            >
              <div className="h-64 relative overflow-hidden">
                <Image src="/images/umag-2-main.jpg" alt="Stella's Garden" fill className="object-cover" />
              </div>
              <div className="p-6 space-y-4 flex flex-col flex-1">
                <a
                  href="https://www.google.com/maps/search/Ulica+154+brigada+HV+7+Umag"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center gap-1 font-sans text-xs uppercase tracking-widest cursor-pointer"
                  style={{ color: '#888888' }}
                >
                  <MapPin size={14} style={{ color: '#86cae7', flexShrink: 0 }} />
                  Umag, Croatia
                  <div
                    className="absolute left-0 bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50"
                    style={{ width: '280px', backgroundColor: '#2a2a2a' }}
                  >
                    <iframe
                      src="https://maps.google.com/maps?q=Ulica+154.+brigada+HV+7,+Umag,+Croatia&output=embed"
                      width="280"
                      height="180"
                      style={{ border: 0, display: 'block' }}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </a>
                <h3 className="font-serif text-xl font-normal text-[#1a1a1a]">
                  Stella&apos;s Garden
                </h3>
                <p className="font-sans text-xs text-[#444444] tracking-wide">
                  6 guests · 2 bedrooms · Private terrace &amp; garden
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

      {/* ─── SECTION 2B: GUEST REVIEWS ───────────────────────────────────── */}
      <section className="py-24 md:py-32 px-6 overflow-hidden" style={{ backgroundColor: '#474748' }}>
        <div className="max-w-4xl mx-auto">
          <div className="mb-16">
            <p className="font-sans text-xs uppercase tracking-widest text-[#86cae7] mb-4">
              Guest Reviews
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-white">
              What Our Guests Say
            </h2>
          </div>

          <ReviewsCarousel />
        </div>
      </section>

      {/* ─── SECTION 3: WHY SOLAR LIVING ─────────────────────────────────── */}
      <section className="py-24 md:py-32 px-6" style={{ backgroundColor: '#525253' }}>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-10 md:gap-14 items-start">
          {/* Left — quote */}
          <div className="md:w-1/2">
            <blockquote className="font-serif text-xl md:text-[1.6rem] italic leading-relaxed text-white">
              &ldquo;We don&apos;t just hand you the keys.<br />
              We make sure every detail is taken<br />
              care of, so you can simply enjoy.&rdquo;
            </blockquote>
            <p className="mt-6 font-sans text-xs uppercase tracking-widest text-[#b0b0b0]">
              Solar Living Team
            </p>
          </div>

          {/* Right — features */}
          <div className="md:w-1/2 space-y-8">
            {[
              { title: 'Curated Properties',  body: 'Every apartment is handpicked and held to the highest standard.' },
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

      {/* ─── SECTION 3B: AEO — WHO WE ARE ───────────────────────────────── */}
      <section className="py-24 md:py-32 px-6" style={{ backgroundColor: '#474748' }}>
        <div className="max-w-3xl mx-auto">
          <p className="font-sans text-xs uppercase tracking-widest mb-6" style={{ color: '#86cae7' }}>
            Who We Are
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-8">
            Boutique Property Management Agency
          </h2>
          <div className="space-y-5 font-sans text-base leading-relaxed text-justify" style={{ color: '#c8c8c8' }}>
            <p>
              Solar Living is a boutique holiday apartment management agency based in Umag, Istria, Croatia. We manage a curated portfolio of premium apartments for guests seeking exceptional accommodation on the Adriatic coast.
            </p>
            <p>Our current properties include:</p>
            <ul className="space-y-2">
              <li style={{ listStyleType: 'none' }}>
                <strong>Elaine&apos;s View</strong>, a spacious, first row to the sea located apartment with panoramic view of the Adriatic Sea, sunset, and Umag Old Town.
              </li>
              <li style={{ listStyleType: 'none' }}>
                <strong>Stella&apos;s Garden</strong>, a ground-floor apartment in Umag&apos;s finest new building, featuring a private Mediterranean garden with an olive tree.
              </li>
            </ul>
            <p>
              Both apartments are consistently rated 9.8 or above on Booking.com and 5.0/5 on Airbnb, reflecting our commitment to cleanliness, comfort, and exceptional guest service.
            </p>
            <p>
              For property owners, Solar Living offers a full management service covering professional photography, listing management across all major platforms, 24/7 guest communication, cleaning coordination, dynamic pricing, and monthly reporting.
            </p>
            <p>
              Solar Living is part of the Solar Group, alongside Solar Creative, a marketing agency based in Dubai.
            </p>
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
            Join our portfolio and enjoy full management, guaranteed care,<br />and outstanding results. We handle everything.
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
            Nestled on the northwestern tip of Istria, Umag is a charming medieval town<br />with crystal-clear Adriatic waters, world-class gastronomy, and a laid-back<br />Mediterranean atmosphere. The perfect destination for a truly restorative holiday.
          </p>
        </div>
      </section>
    </>
  );
}
