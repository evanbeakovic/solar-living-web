import type { Metadata } from 'next';
import React from 'react';
import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';

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

export default function AboutPage() {
  const t = useTranslations('about');

  const values: { title: string; description: React.ReactNode }[] = [
    {
      title: t('values.quality.title'),
      description: t('values.quality.description'),
    },
    {
      title: t('values.hospitality.title'),
      description: (
        <>
          {t('values.hospitality.descLine1')}<br />
          {t('values.hospitality.descLine2')}<br />
          {t('values.hospitality.descLine3')}<br />
          {t('values.hospitality.descLine4')}
        </>
      ),
    },
    {
      title: t('values.partnership.title'),
      description: (
        <>
          {t('values.partnership.descLine1')}<br />
          {t('values.partnership.descLine2')}<br />
          {t('values.partnership.descLine3')}<br />
          {t('values.partnership.descLine4')}
        </>
      ),
    },
  ];

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
          {t('hero.label')}
        </p>
        <h1 className="font-serif text-5xl md:text-6xl leading-tight mb-7 text-white">
          {t('hero.heading')}
        </h1>
        <p className="font-sans text-lg text-[#c8c8c8] max-w-2xl mx-auto text-center leading-relaxed">
          {t('hero.subtextLine1')}<br />{t('hero.subtextLine2')}
        </p>
      </section>

      {/* ─── SECTION 2: OUR STORY ────────────────────────────────────────── */}
      <section className="py-24 px-6" style={{ backgroundColor: '#525253' }}>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-stretch gap-16">

          {/* Left column */}
          <div className="md:w-1/2 space-y-6">
            <div>
              <p className="font-sans text-xs uppercase tracking-widest text-[#86cae7] mb-4">
                {t('story.label')}
              </p>
              <h2 className="font-serif text-3xl text-white mb-6">
                {t('story.headingLine1')}<br />{t('story.headingLine2')}
              </h2>
            </div>
            <p className="font-sans text-[#c8c8c8] text-base leading-relaxed">
              {t('story.para1')}
            </p>
            <p className="font-sans text-[#c8c8c8] text-base leading-relaxed">
              {t('story.para2')}
            </p>
            <p className="font-sans text-[#c8c8c8] text-base leading-relaxed">
              {t('story.para3')}
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
              {t('values.label')}
            </p>
            <h2 className="font-serif text-4xl text-white">
              {t('values.heading')}
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
                {t('solarGroup.label')}
              </p>
              <h2 className="font-serif text-4xl text-white mb-4">
                {t('solarGroup.heading')}
              </h2>
            </div>
            <p className="font-sans text-[#c8c8c8] text-base leading-relaxed">
              {t('solarGroup.para')}
            </p>
            <a
              href="https://solarcreative.hr"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block font-sans text-sm uppercase tracking-widest text-[#86cae7] hover:text-white transition-colors"
            >
              {t('solarGroup.link')}
            </a>
          </div>

          {/* Right column — stats */}
          <div className="md:w-1/2">
            <div>
              <p className="font-serif text-4xl mb-3" style={{ color: '#edd98f' }}>
                {t('solarGroup.stat1Value')}
              </p>
              <p className="font-sans text-[#c8c8c8] text-sm leading-relaxed">
                {t('solarGroup.stat1Desc')}
              </p>
            </div>
            <div
              className="mt-8 pt-8"
              style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
            >
              <p className="font-serif text-4xl mb-3" style={{ color: '#edd98f' }}>
                {t('solarGroup.stat2Value')}
              </p>
              <p className="font-sans text-[#c8c8c8] text-sm leading-relaxed">
                {t('solarGroup.stat2Desc')}
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ─── SECTION 5: CTA ──────────────────────────────────────────────── */}
      <section className="py-24 px-6 text-center" style={{ backgroundColor: '#474748' }}>
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="font-serif text-4xl text-white">
            {t('cta.heading')}
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <Link
              href="/apartments"
              className="font-sans font-semibold text-sm uppercase tracking-widest px-8 py-4 transition-opacity hover:opacity-90"
              style={{ backgroundColor: '#86cae7', color: '#474748' }}
            >
              {t('cta.browseApartments')}
            </Link>
            <Link
              href="/owners"
              className="font-sans text-sm uppercase tracking-widest px-8 py-4 text-white transition-colors hover:border-white"
              style={{ border: '1px solid rgba(255,255,255,0.3)' }}
            >
              {t('cta.partnerWithUs')}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
