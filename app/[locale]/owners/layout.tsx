import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Property Management in Umag | Solar Living',
  description:
    'Full-service property management for apartment owners in Umag, Istria. Photography, listings, guest communication, cleaning, dynamic pricing and reporting.',
  robots: 'index, follow',
  alternates: { canonical: 'https://solarliving.hr/owners' },
  openGraph: {
    title: 'Property Management in Umag | Solar Living',
    description:
      'Full-service property management for apartment owners in Umag, Istria. Photography, listings, guest communication, cleaning, dynamic pricing and reporting.',
    url: 'https://solarliving.hr/owners',
    siteName: 'Solar Living',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
};

const ownersJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Property Management in Umag, Istria',
  provider: { '@type': 'Organization', name: 'Solar Living' },
  description:
    'Full-service holiday apartment management in Umag, Croatia. Includes professional photography, multi-platform listings, guest communication, cleaning coordination, dynamic pricing and monthly reporting.',
  areaServed: 'Umag, Istria, Croatia',
  serviceType: 'Holiday Property Management',
};

export default function OwnersLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ownersJsonLd) }}
      />
      {children}
    </>
  );
}
