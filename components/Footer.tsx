import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import Image from 'next/image';

const quickLinks = [
  { href: '/', key: 'linkHome' },
  { href: '/apartments', key: 'linkApartments' },
  { href: '/owners', key: 'linkOwners' },
  { href: '/about', key: 'linkAbout' },
  { href: '/contact', key: 'linkContact' },
  { href: '/faq', key: 'linkFaq' },
  { href: '/privacy', key: 'linkPrivacyPolicy' },
];

export default function Footer() {
  const t = useTranslations('footer');
  return (
    <footer
      className="text-white"
      style={{ backgroundColor: '#3e3e3f', borderTop: '1px solid rgba(255,255,255,0.08)' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Brand column */}
          <div className="space-y-4">
            <Image src="/solar-logo-white.png" alt="Solar Living" width={160} height={34} style={{ height: 'auto', display: 'block' }} />
          </div>

          {/* Quick Links column */}
          <div className="space-y-4">
            <h3 className="font-sans text-xs uppercase tracking-widest" style={{ color: '#b0b0b0' }}>
              {t('quickLinksHeading')}
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                    style={{ color: '#c8c8c8' }}
                  >
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div className="space-y-4">
            <h3 className="font-sans text-xs uppercase tracking-widest" style={{ color: '#b0b0b0' }}>
              {t('contactHeading')}
            </h3>
            <ul className="space-y-2.5 text-sm" style={{ color: '#c8c8c8' }}>
              <li>Ul. 8. ožujka 1A, Umag, Croatia</li>
              <li>
                <a
                  href="mailto:solarliving.info@gmail.com"
                  className="hover:text-white transition-colors"
                >
                  solarliving.info@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/385915483354"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  WhatsApp: +385 91 548 3354
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-6 text-xs text-center leading-relaxed"
          style={{ borderTop: '1px solid rgba(255,255,255,0.08)', color: '#999999' }}
        >
          {t('copyright')}
        </div>
      </div>
    </footer>
  );
}
