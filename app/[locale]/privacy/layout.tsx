import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy & Cookie Policy | Solar Living',
  description:
    'Privacy and cookie policy for Solar Living — boutique property management and holiday apartments in Umag, Istria, Croatia.',
  robots: 'index, follow',
  alternates: { canonical: 'https://solarliving.hr/privacy' },
  openGraph: {
    title: 'Privacy & Cookie Policy | Solar Living',
    description:
      'Privacy and cookie policy for Solar Living — boutique property management and holiday apartments in Umag, Istria, Croatia.',
    url: 'https://solarliving.hr/privacy',
    siteName: 'Solar Living',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
