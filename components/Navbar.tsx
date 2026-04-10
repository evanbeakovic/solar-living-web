'use client';

import { useState, useEffect, useRef } from 'react';
import { useLocale } from 'next-intl';
import { useRouter, usePathname, Link } from '@/navigation';
import Image from 'next/image';

const locales = [
  { code: 'en', label: 'EN' },
  { code: 'hr', label: 'HR' },
  { code: 'de', label: 'DE' },
  { code: 'it', label: 'IT' },
  { code: 'ru', label: 'RU' },
  { code: 'hu', label: 'HU' },
];

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/apartments', label: 'Apartments' },
  { href: '/owners', label: 'Owners' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const prevScrollY = useRef(0);

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY;
      if (y < 10) {
        setVisible(true);
      } else if (y > prevScrollY.current) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      prevScrollY.current = y;
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function switchLocale(next: string) {
    router.replace(pathname, { locale: next });
    setLangOpen(false);
    setMobileOpen(false);
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${visible ? 'translate-y-0' : '-translate-y-full'}`}
      style={{ backgroundColor: '#474748' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between py-4">

          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center">
            <Image src="/solar-logo-white.png" alt="Solar Living" width={180} height={40} style={{ height: 'auto' }} priority />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => {
              const isActive =
                link.href === '/'
                  ? pathname === '/'
                  : pathname.includes(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-sans font-medium text-xs uppercase tracking-widest transition-colors outline-none ${
                    isActive
                      ? 'text-[#86cae7] hover:text-[#a8ddf0] active:text-[#86cae7] focus:text-[#86cae7]'
                      : 'text-[#d0d0d0] hover:text-white active:text-white focus:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            {/* Language switcher */}
            <div className="relative">
              <button
                onClick={() => setLangOpen((v) => !v)}
                className="flex items-center gap-1 font-sans font-medium text-xs uppercase tracking-widest text-[#d0d0d0] hover:text-white transition-colors focus:outline-none"
              >
                {locale.toUpperCase()}
                <ChevronDown className={`w-3 h-3 transition-transform ${langOpen ? 'rotate-180' : ''}`} />
              </button>
              {langOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setLangOpen(false)} />
                  <div
                    className="absolute right-0 mt-2 z-50 py-1 min-w-[64px]"
                    style={{ backgroundColor: '#525253', border: '1px solid rgba(255,255,255,0.1)' }}
                  >
                    {locales.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => switchLocale(l.code)}
                        className={`block w-full text-left px-3 py-1.5 font-sans text-xs uppercase tracking-widest transition-colors hover:text-white ${
                          l.code === locale ? 'font-semibold text-white' : 'text-[#d0d0d0]'
                        }`}
                      >
                        {l.label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-[#d0d0d0] hover:text-white transition-colors focus:outline-none text-xl leading-none font-sans"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile dropdown panel */}
      {mobileOpen && (
        <div
          className="md:hidden px-6 pb-6 pt-3 space-y-4"
          style={{ backgroundColor: '#474748', borderTop: '1px solid rgba(255,255,255,0.08)' }}
        >
          {navLinks.map((link) => {
            const isActive =
              link.href === '/'
                ? pathname === '/'
                : pathname.includes(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block font-sans font-medium text-xs uppercase tracking-widest transition-colors outline-none py-1.5 ${
                  isActive
                    ? 'text-[#86cae7] hover:text-[#a8ddf0] active:text-[#86cae7] focus:text-[#86cae7]'
                    : 'text-[#d0d0d0] hover:text-white active:text-white focus:text-white'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="pt-4 flex gap-4 flex-wrap" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            {locales.map((l) => (
              <button
                key={l.code}
                onClick={() => switchLocale(l.code)}
                className={`font-sans text-xs uppercase tracking-widest transition-colors hover:text-white ${
                  l.code === locale ? 'font-semibold text-white' : 'text-[#d0d0d0]'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  );
}
