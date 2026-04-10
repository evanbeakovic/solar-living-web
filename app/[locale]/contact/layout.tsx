import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Solar Living | Umag, Istria',
  description:
    'Get in touch with Solar Living. Reach us via WhatsApp or email for booking inquiries or property management partnerships.',
  robots: 'index, follow',
  alternates: { canonical: 'https://solarliving.hr/contact' },
  openGraph: {
    title: 'Contact Solar Living | Umag, Istria',
    description:
      'Get in touch with Solar Living. Reach us via WhatsApp or email for booking inquiries or property management partnerships.',
    url: 'https://solarliving.hr/contact',
    siteName: 'Solar Living',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
