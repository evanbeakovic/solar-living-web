import { Link } from '@/navigation';
import Image from 'next/image';

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/apartments', label: 'Apartments' },
  { href: '/owners', label: 'Owners' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/faq', label: 'FAQ' },
  { href: '/privacy', label: 'Privacy Policy' },
];

export default function Footer() {
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
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                    style={{ color: '#c8c8c8' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div className="space-y-4">
            <h3 className="font-sans text-xs uppercase tracking-widest" style={{ color: '#b0b0b0' }}>
              Contact
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
          © 2025 BE CAPITAL, obrt za poslovanje nekretninama, vl. Evan Beaković | OIB: 30760238873 | All rights reserved
        </div>
      </div>
    </footer>
  );
}
