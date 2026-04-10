import type { Metadata } from 'next';
import React from 'react';
import { Link } from '@/navigation';

export const metadata: Metadata = {
  title: 'About Solar Living | Boutique Property Management, Umag',
  description:
    'Solar Living is a boutique property management company based in Umag, Istria, part of the Solar Group. We manage premium holiday apartments with care.',
  robots: 'index, follow',
  alternates: { canonical: 'https://solarliving.hr/about' },
  openGraph: {
    title: 'About Solar Living | Boutique Property Management, Umag',
    description:
      'Solar Living is a boutique property management company based in Umag, Istria, part of the Solar Group. We manage premium holiday apartments with care.',
    url: 'https://solarliving.hr/about',
    siteName: 'Solar Living',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Evan Beaković',
  jobTitle: 'Founder',
  worksFor: {
    '@type': 'Organization',
    name: 'Solar Living',
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Umag',
    addressCountry: 'HR',
  },
};

const values: { title: string; description: React.ReactNode }[] = [
  {
    title: 'Uncompromising Quality',
    description:
      'Every property in our portfolio is handpicked. We say no to properties that don\'t meet our standards, because our guests deserve the best, every time.',
  },
  {
    title: 'Genuine Hospitality',
    description: <>We don&apos;t just hand over keys. We make<br />sure every guest has everything they need<br />before they even ask. The little details<br />are what make a stay unforgettable.</>,
  },
  {
    title: 'Owner Partnership',
    description: <>We treat every property as if it<br />were our own. Owners trust us<br />with something valuable, and we<br />take that responsibility seriously.</>,
  },
];

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      {/* ─── SECTION 1: HERO ─────────────────────────────────────────────── */}
      <section
        className="py-32 px-6 flex flex-col items-center justify-center text-center"
        style={{ backgroundColor: '#474748' }}
      >
        <p className="font-sans text-xs uppercase tracking-widest mb-6 text-[#86cae7]">
          Our Story
        </p>
        <h1 className="font-serif text-5xl md:text-6xl leading-tight mb-7 text-white">
          More Than Property Management.
        </h1>
        <p className="font-sans text-lg text-[#c8c8c8] max-w-2xl mx-auto text-center leading-relaxed">
          We started Solar Living because we believed Istria deserved better.<br />A boutique approach to hospitality that puts guests and owners first.
        </p>
      </section>

      {/* ─── SECTION 2: OUR STORY ────────────────────────────────────────── */}
      <section className="py-24 px-6" style={{ backgroundColor: '#525253' }}>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-stretch gap-16">

          {/* Left column */}
          <div className="md:w-1/2 space-y-6">
            <div>
              <p className="font-sans text-xs uppercase tracking-widest text-[#86cae7] mb-4">
                Who We Are
              </p>
              <h2 className="font-serif text-3xl text-white mb-6">
                A Boutique Company<br />with High Standards.
              </h2>
            </div>
            <p className="font-sans text-[#c8c8c8] text-base leading-relaxed">
              Solar Living is a boutique property management company based in Umag, on the beautiful northwestern coast of Istria, Croatia. We manage a carefully selected portfolio of premium apartments and villas, properties we personally vet, prepare, and maintain to the highest standard.
            </p>
            <p className="font-sans text-[#c8c8c8] text-base leading-relaxed">
              We are part of the Solar Group, alongside Solar Creative, our marketing agency. This means every property in our portfolio benefits not just from management expertise, but from professional photography, branding, and digital marketing that most property managers simply don&apos;t offer.
            </p>
            <p className="font-sans text-[#c8c8c8] text-base leading-relaxed">
              Our mission is simple: exceptional experiences for guests, absolute peace of mind for owners, and properties that consistently earn top-rated reviews.
            </p>
          </div>

          {/* Right column — placeholder */}
          <div className="md:w-1/2">
            <div className="h-full min-h-[300px] flex items-center justify-center" style={{ backgroundColor: '#3e3e3f' }}>
              <span className="font-sans text-sm" style={{ color: '#666666' }}>
                {`/* TODO: add team photo or property photo */`}
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* ─── SECTION 3: OUR VALUES ───────────────────────────────────────── */}
      <section className="py-24 px-6" style={{ backgroundColor: '#474748' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-sans text-xs uppercase tracking-widest text-[#86cae7] mb-4">
              What Drives Us
            </p>
            <h2 className="font-serif text-4xl text-white">
              Our Values
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {values.map((value) => (
              <div key={value.title}>
                <div className="w-12 h-px mb-6" style={{ backgroundColor: '#edd98f' }} />
                <h3 className="font-sans font-semibold text-white text-lg mb-3">
                  {value.title}
                </h3>
                <p className="font-sans text-[#c8c8c8] text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 4: THE SOLAR GROUP ──────────────────────────────────── */}
      <section className="py-24 px-6" style={{ backgroundColor: '#3e3e3f' }}>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-16 md:gap-24 items-start">

          {/* Left column */}
          <div className="md:w-1/2 space-y-6">
            <div>
              <p className="font-sans text-xs uppercase tracking-widest text-[#86cae7] mb-4">
                Part of Something Bigger
              </p>
              <h2 className="font-serif text-4xl text-white mb-4">
                The Solar Group
              </h2>
            </div>
            <p className="font-sans text-[#c8c8c8] text-base leading-relaxed">
              Solar Living is proud to be part of the Solar Group, a family of companies united by a commitment to quality, creativity, and service. Our sister company, Solar Creative, is a full-service marketing agency that supports our properties with professional photography, social media, and brand strategy.
            </p>
            <a
              href="https://solarcreative.hr"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block font-sans text-sm uppercase tracking-widest text-[#86cae7] hover:text-white transition-colors"
            >
              Visit Solar Creative →
            </a>
          </div>

          {/* Right column — stats */}
          <div className="md:w-1/2">
            <div>
              <p className="font-serif text-4xl mb-3" style={{ color: '#edd98f' }}>
                Est. 2024
              </p>
              <p className="font-sans text-[#c8c8c8] text-sm leading-relaxed">
                Solar Living was founded with a vision to bring boutique-level service to Istrian property management.
              </p>
            </div>
            <div
              className="mt-8 pt-8"
              style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
            >
              <p className="font-serif text-4xl mb-3" style={{ color: '#edd98f' }}>
                Umag, Istria
              </p>
              <p className="font-sans text-[#c8c8c8] text-sm leading-relaxed">
                Based on the northwestern tip of Istria, steps from the Adriatic Sea.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ─── SECTION 5: CTA ──────────────────────────────────────────────── */}
      <section className="py-24 px-6 text-center" style={{ backgroundColor: '#474748' }}>
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="font-serif text-4xl text-white">
            Ready to experience Solar Living?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <Link
              href="/apartments"
              className="font-sans font-semibold text-sm uppercase tracking-widest px-8 py-4 transition-opacity hover:opacity-90"
              style={{ backgroundColor: '#86cae7', color: '#474748' }}
            >
              Browse Apartments
            </Link>
            <Link
              href="/owners"
              className="font-sans text-sm uppercase tracking-widest px-8 py-4 text-white transition-colors hover:border-white"
              style={{ border: '1px solid rgba(255,255,255,0.3)' }}
            >
              Partner With Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
