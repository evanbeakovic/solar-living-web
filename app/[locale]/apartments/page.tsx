'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { MapPin } from 'lucide-react';
import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';

// ─── Data ──────────────────────────────────────────────────────────────────

type Review = {
  name: string;
  country: string;
  platform: string;
  rating: number;
  max: number;
  text: string;
};

type Apartment = {
  id: number;
  name: string;
  description: string;
  guests: number;
  bedrooms: number;
  type: string;
  location: string;
  amenities: string[];
  image: string | null;
  available: boolean;
  mapSrc?: string;
  mapLink?: string;
  badge?: string;
  reviews?: Review[];
};

// ─── Constants ─────────────────────────────────────────────────────────────

const cardGradient = 'linear-gradient(135deg, #1a3a4a 0%, #86cae7 50%, #edd98f 100%)';

// ─── Types ─────────────────────────────────────────────────────────────────

type FormState = {
  name: string;
  email: string;
  phone: string;
  checkin: string;
  checkout: string;
  guests: string;
  message: string;
};

const emptyForm: FormState = {
  name: '',
  email: '',
  phone: '',
  checkin: '',
  checkout: '',
  guests: '1',
  message: '',
};

// ─── Helpers ───────────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TFunc = (key: string, values?: Record<string, any>) => string;

function today() {
  return new Date().toISOString().split('T')[0];
}

function minCheckout(checkin: string) {
  if (!checkin) return today();
  const d = new Date(checkin);
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
}

function buildWhatsApp(apt: Apartment, form: FormState, t: TFunc) {
  const lines = [
    t('whatsapp.greeting', { name: apt.name }),
    t('whatsapp.checkin', { date: form.checkin }),
    t('whatsapp.checkout', { date: form.checkout }),
    t('whatsapp.guests', { count: form.guests }),
    t('whatsapp.name', { name: form.name }),
    t('whatsapp.phone', { phone: form.phone }),
    t('whatsapp.email', { email: form.email }),
    form.message ? t('whatsapp.message', { text: form.message }) : '',
  ]
    .filter(Boolean)
    .join('\n');
  return `https://wa.me/385915483354?text=${encodeURIComponent(lines)}`;
}

function buildMailto(apt: Apartment, form: FormState, t: TFunc) {
  const subject = encodeURIComponent(t('email.subject', { name: apt.name }));
  const body = encodeURIComponent(
    t('email.body', {
      name: apt.name,
      checkin: form.checkin,
      checkout: form.checkout,
      guests: form.guests,
      guestName: form.name,
      phone: form.phone,
      email: form.email,
      message: form.message,
    })
  );
  return `mailto:solarliving.info@gmail.com?subject=${subject}&body=${body}`;
}

function validateForm(form: FormState, maxGuests: number, t: TFunc): string | null {
  if (!form.name.trim()) return t('validation.nameRequired');
  if (!form.email.trim()) return t('validation.emailRequired');
  if (!form.phone.trim()) return t('validation.phoneRequired');
  if (!form.checkin) return t('validation.checkinRequired');
  if (!form.checkout) return t('validation.checkoutRequired');
  if (form.checkout <= form.checkin) return t('validation.checkoutAfterCheckin');
  const g = parseInt(form.guests, 10);
  if (isNaN(g) || g < 1) return t('validation.guestsInvalid');
  if (g > maxGuests) return t('validation.guestsExceeded', { max: maxGuests });
  return null;
}

// ─── Apartment Card ────────────────────────────────────────────────────────

function ApartmentCard({
  apt,
  onBook,
  onShowReviews,
}: {
  apt: Apartment;
  onBook: (apt: Apartment) => void;
  onShowReviews: (apt: Apartment) => void;
}) {
  const t = useTranslations('apartments');

  const infoLine = apt.available
    ? [
        `${apt.guests} guests`,
        apt.bedrooms > 0 ? `${apt.bedrooms} bedrooms` : 'Studio',
        apt.location,
      ].join(' · ')
    : null;

  const amenityLine =
    apt.amenities.length > 0 ? apt.amenities.join(' · ') : null;

  return (
    <div
      className="flex flex-col"
      style={{ backgroundColor: '#d8d8d8', border: '1px solid rgba(0,0,0,0.08)' }}
    >
      {/* Image area */}
      {apt.available ? (
        <div className="h-72 relative overflow-hidden">
          <Image src={apt.image!} alt={apt.name} fill className="object-cover" />
        </div>
      ) : (
        <div className="h-72 flex items-center justify-center overflow-hidden" style={{ background: cardGradient }}>
          <span
            className="font-sans font-semibold text-xs uppercase tracking-widest px-4 py-2"
            style={{ border: '1px solid #edd98f', color: '#edd98f' }}
          >
            {t('card.comingSoon')}
          </span>
        </div>
      )}

      {/* Body */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            {apt.mapSrc ? (
              <a
                href={apt.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center gap-1 font-sans text-xs uppercase tracking-widest mb-1 cursor-pointer"
                style={{ color: '#888888' }}
              >
                <MapPin size={14} style={{ color: '#86cae7', flexShrink: 0 }} />
                {t('card.location')}
                <div
                  className="absolute left-0 bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50"
                  style={{ width: '280px', backgroundColor: '#2a2a2a' }}
                >
                  <iframe
                    src={apt.mapSrc}
                    width="280"
                    height="180"
                    style={{ border: 0, display: 'block' }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </a>
            ) : (
              <p className="flex items-center gap-1 font-sans text-xs uppercase tracking-widest mb-1" style={{ color: '#888888' }}>
                <MapPin size={14} style={{ color: '#86cae7', flexShrink: 0 }} />
                {t('card.location')}
              </p>
            )}
            <h3 className="font-serif text-xl font-normal text-[#1a1a1a]">
              {apt.name}
            </h3>
          </div>
          {apt.badge ? (
            <button
              onClick={() => onShowReviews(apt)}
              className="shrink-0 pt-0.5 font-sans text-xs leading-snug text-right transition-opacity hover:opacity-70 cursor-pointer"
              style={{ color: '#888888' }}
            >
              <span style={{ color: '#edd98f' }}>★</span>{' '}
              {apt.badge}
            </button>
          ) : (
            <span className="font-sans text-xs uppercase tracking-widest shrink-0 pt-0.5 text-[#2a2a2a]">
              {apt.type}
            </span>
          )}
        </div>

        <p className="font-serif text-sm leading-relaxed text-[#333333]">
          {apt.description}
        </p>

        {amenityLine && (
          <p className="mt-4 font-sans text-xs leading-relaxed text-[#444444]">
            {amenityLine}
          </p>
        )}

        {infoLine && (
          <p className="mt-3 font-sans text-xs tracking-wide text-[#444444]">
            {infoLine}
          </p>
        )}

        <div className="mt-auto pt-6">
          {apt.available ? (
            <button
              onClick={() => onBook(apt)}
              className="w-full font-sans font-semibold text-xs uppercase tracking-widest py-3 text-[#1a1a1a] transition-colors hover:bg-[#1a1a1a] hover:text-white"
              style={{ border: '1px solid #1a1a1a' }}
            >
              {t('card.bookButton')}
            </button>
          ) : (
            <button
              disabled
              className="w-full font-sans font-semibold text-xs uppercase tracking-widest py-3 cursor-not-allowed text-[#999999]"
              style={{ border: '1px solid #999999' }}
            >
              {t('card.comingSoon')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Inquiry Modal ─────────────────────────────────────────────────────────

function InquiryModal({
  apt,
  onClose,
}: {
  apt: Apartment;
  onClose: () => void;
}) {
  const t = useTranslations('apartments');
  const [form, setForm] = useState<FormState>({ ...emptyForm, guests: '1' });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  function set(field: keyof FormState) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      setError(null);
    };
  }

  function handleWhatsApp() {
    const err = validateForm(form, apt.guests, t);
    if (err) { setError(err); return; }
    window.open(buildWhatsApp(apt, form, t), '_blank');
  }

  function handleEmail() {
    const err = validateForm(form, apt.guests, t);
    if (err) { setError(err); return; }
    window.open(buildMailto(apt, form, t), '_blank');
  }

  const inputClass =
    'w-full font-sans text-sm text-white placeholder-[#555555] px-4 py-3 focus:outline-none focus:border-[#86cae7] transition-colors';

  const inputStyle = {
    backgroundColor: '#474748',
    border: '1px solid rgba(255,255,255,0.15)',
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="p-8 max-w-lg w-full relative max-h-[90vh] overflow-y-auto"
        style={{ backgroundColor: '#525253', border: '1px solid rgba(255,255,255,0.1)' }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-xl leading-none font-sans text-[#c8c8c8] hover:text-white transition-colors"
          aria-label={t('modal.ariaClose')}
        >
          ×
        </button>

        {/* Header */}
        <h2 className="font-serif text-2xl mb-1 text-white">
          {t('modal.bookHeading', { name: apt.name })}
        </h2>
        <p className="font-sans text-sm mb-7 text-[#c8c8c8]">
          {t('modal.subheading')}
        </p>

        {/* Form */}
        <div className="space-y-4">
          <div>
            <label className="block font-sans text-xs uppercase tracking-widest mb-1.5 text-[#c8c8c8]">{t('modal.labelName')}</label>
            <input type="text" className={inputClass} style={inputStyle} placeholder={t('modal.placeholderName')} value={form.name} onChange={set('name')} required />
          </div>

          <div>
            <label className="block font-sans text-xs uppercase tracking-widest mb-1.5 text-[#c8c8c8]">{t('modal.labelEmail')}</label>
            <input type="email" className={inputClass} style={inputStyle} placeholder={t('modal.placeholderEmail')} value={form.email} onChange={set('email')} required />
          </div>

          <div>
            <label className="block font-sans text-xs uppercase tracking-widest mb-1.5 text-[#c8c8c8]">{t('modal.labelPhone')}</label>
            <input type="text" className={inputClass} style={inputStyle} placeholder={t('modal.placeholderPhone')} value={form.phone} onChange={set('phone')} required />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-sans text-xs uppercase tracking-widest mb-1.5 text-[#c8c8c8]">{t('modal.labelCheckin')}</label>
              <input type="date" className={inputClass} style={inputStyle} min={today()} value={form.checkin} onChange={set('checkin')} required />
            </div>
            <div>
              <label className="block font-sans text-xs uppercase tracking-widest mb-1.5 text-[#c8c8c8]">{t('modal.labelCheckout')}</label>
              <input type="date" className={inputClass} style={inputStyle} min={minCheckout(form.checkin)} value={form.checkout} onChange={set('checkout')} required />
            </div>
          </div>

          <div>
            <label className="block font-sans text-xs uppercase tracking-widest mb-1.5 text-[#c8c8c8]">
              {t('modal.labelGuests')} <span className="normal-case tracking-normal text-[#999999]">{t('modal.guestsMax', { max: apt.guests })}</span>
            </label>
            <input type="number" className={inputClass} style={inputStyle} min={1} max={apt.guests} value={form.guests} onChange={set('guests')} required />
          </div>

          <div>
            <label className="block font-sans text-xs uppercase tracking-widest mb-1.5 text-[#c8c8c8]">
              {t('modal.labelMessage')} <span className="normal-case tracking-normal text-[#999999]">{t('modal.messageOptional')}</span>
            </label>
            <textarea
              className={`${inputClass} resize-none`}
              style={inputStyle}
              rows={3}
              placeholder={t('modal.placeholderMessage')}
              value={form.message}
              onChange={set('message')}
            />
          </div>
        </div>

        {error && (
          <p className="mt-3 font-sans text-xs text-red-400">{error}</p>
        )}

        {/* Actions */}
        <div className="flex gap-3 mt-7">
          <button
            onClick={handleWhatsApp}
            className="flex-1 font-sans font-semibold text-xs uppercase tracking-widest py-3 text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#4a8c7a' }}
          >
            {t('modal.sendWhatsApp')}
          </button>
          <button
            onClick={handleEmail}
            className="flex-1 font-sans font-semibold text-xs uppercase tracking-widest py-3 transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#edd98f', color: '#474748' }}
          >
            {t('modal.sendEmail')}
          </button>
        </div>

        <p className="mt-4 font-sans text-xs text-center text-[#c8c8c8]">
          {t('modal.responseNote')}
        </p>
      </div>
    </div>
  );
}

// ─── Reviews Modal ─────────────────────────────────────────────────────────

function ReviewsModal({ apt, onClose }: { apt: Apartment; onClose: () => void }) {
  const t = useTranslations('apartments');

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const scoreLabel = apt.id === 1
    ? t('reviewsModal.scoreApt1')
    : t('reviewsModal.scoreApt2');

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto"
        style={{ backgroundColor: '#474748' }}
      >
        {/* Header */}
        <div className="px-8 pt-8 pb-6">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-xl leading-none font-sans text-[#c8c8c8] hover:text-white transition-colors"
            aria-label={t('reviewsModal.ariaClose')}
          >
            ×
          </button>
          <h2 className="font-serif text-2xl text-white mb-1">{apt.name}</h2>
          <p className="font-sans text-xs" style={{ color: '#edd98f' }}>{scoreLabel}</p>
          <div className="mt-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }} />
        </div>

        {/* Reviews */}
        <div className="px-8 pb-8 space-y-4">
          {(apt.reviews ?? []).map((r) => (
            <div
              key={r.name}
              className="p-5"
              style={{ backgroundColor: '#525253', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="font-sans font-semibold text-sm text-white">{r.name}</span>
                  <span className="font-sans text-xs ml-2" style={{ color: '#888888' }}>{r.country}</span>
                </div>
                <span className="font-sans text-xs" style={{ color: '#888888' }}>{r.platform}</span>
              </div>
              <p className="font-sans text-xs mb-3" style={{ color: '#edd98f' }}>
                {'★'.repeat(Math.min(r.rating, 5))}
                {r.max === 10 && <span className="ml-1">{r.rating}/10</span>}
              </p>
              <p className="font-sans text-sm leading-relaxed" style={{ color: '#c8c8c8' }}>
                &ldquo;{r.text}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────

export default function ApartmentsPage() {
  const t = useTranslations('apartments');
  const [selected, setSelected] = useState<Apartment | null>(null);
  const [reviewsApt, setReviewsApt] = useState<Apartment | null>(null);

  const apartments: Apartment[] = [
    {
      id: 1,
      name: t('data.apt1.name'),
      description: t('data.apt1.description'),
      guests: 6,
      bedrooms: 3,
      type: 'Apartment',
      location: t('data.apt1.location'),
      amenities: t.raw('data.apt1.amenities') as string[],
      image: '/images/umag-1-main.jpg',
      available: true,
      mapSrc: 'https://maps.google.com/maps?q=Ul.+8.+ožujka+1A,+Umag,+Croatia&output=embed',
      mapLink: "https://www.google.com/maps/search/Apartment+Elaine%27s+View+Umag",
      badge: t('data.apt1.badge'),
      reviews: t.raw('data.apt1.reviews') as Review[],
    },
    {
      id: 2,
      name: t('data.apt2.name'),
      description: t('data.apt2.description'),
      guests: 6,
      bedrooms: 2,
      type: 'Apartment',
      location: t('data.apt2.location'),
      amenities: t.raw('data.apt2.amenities') as string[],
      image: '/images/umag-2-main.jpg',
      available: true,
      mapSrc: 'https://maps.google.com/maps?q=Ulica+154.+brigada+HV+7,+Umag,+Croatia&output=embed',
      mapLink: 'https://www.google.com/maps/search/Ulica+154+brigada+HV+7+Umag',
      badge: t('data.apt2.badge'),
      reviews: t.raw('data.apt2.reviews') as Review[],
    },
    {
      id: 3,
      name: t('data.apt3.name'),
      description: t('data.apt3.description'),
      guests: 4,
      bedrooms: 2,
      type: 'Apartment',
      location: t('data.apt3.location'),
      amenities: [],
      image: null,
      available: false,
    },
    {
      id: 4,
      name: t('data.apt4.name'),
      description: t('data.apt4.description'),
      guests: 6,
      bedrooms: 3,
      type: 'Villa',
      location: t('data.apt4.location'),
      amenities: [],
      image: null,
      available: false,
    },
  ];

  return (
    <>
      {/* ── SECTION 1: PAGE HERO ────────────────────────────────────────── */}
      <section className="py-32 px-6 text-center" style={{ backgroundColor: '#474748' }}>
        <p className="font-sans text-xs uppercase tracking-widest mb-5 text-[#86cae7]">
          {t('hero.label')}
        </p>
        <h1 className="font-serif text-5xl md:text-6xl mb-6 leading-tight text-white">
          {t('hero.heading')}
        </h1>
        <p className="font-sans text-base max-w-xl mx-auto leading-relaxed tracking-wide text-[#c8c8c8]">
          {t('hero.subtext')}<br />{t('hero.subtextLine2')}
        </p>
      </section>

      {/* ── SECTION 2: APARTMENT LISTINGS ───────────────────────────────── */}
      <section className="py-24 px-6" style={{ backgroundColor: '#474748' }}>
        <div className="max-w-5xl mx-auto">
          {/* Left-aligned header row */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-16 gap-4">
            <div>
              <p className="font-sans text-xs uppercase tracking-widest text-[#86cae7] mb-4">
                {t('listings.label')}
              </p>
              <h2 className="font-serif text-4xl md:text-5xl text-white">
                {t('listings.heading')}
              </h2>
            </div>
            <p className="font-sans text-sm text-[#c8c8c8] md:text-right">
              {t('listings.subtext')}
            </p>
          </div>

          {/* Available apartments */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {apartments.filter((a) => a.available).map((apt) => (
              <ApartmentCard key={apt.id} apt={apt} onBook={setSelected} onShowReviews={setReviewsApt} />
            ))}
          </div>
        </div>
      </section>

      {/* ── COMING SOON APARTMENTS ──────────────────────────────────────── */}
      <section className="py-24 px-6" style={{ backgroundColor: '#474748' }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {apartments.filter((a) => !a.available).map((apt) => (
              <ApartmentCard key={apt.id} apt={apt} onBook={setSelected} onShowReviews={setReviewsApt} />
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 3: BOTTOM CTA ───────────────────────────────────────── */}
      <section className="py-24 px-6 text-center" style={{ backgroundColor: '#525253' }}>
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="font-serif text-2xl md:text-3xl text-white">
            {t('cta.heading')}
          </h2>
          <p className="font-sans text-base leading-relaxed text-[#c8c8c8] text-center">
            {t('cta.body')}
          </p>
          <Link
            href="/contact"
            className="inline-block font-sans font-semibold text-xs uppercase tracking-widest px-8 py-4 text-white transition-colors hover:bg-white hover:text-[#2a2a2a]"
            style={{ border: '1px solid rgba(255,255,255,0.2)' }}
          >
            {t('cta.button')}
          </Link>
        </div>
      </section>

      {/* ── REVIEWS MODAL ───────────────────────────────────────────────── */}
      {reviewsApt && (
        <ReviewsModal apt={reviewsApt} onClose={() => setReviewsApt(null)} />
      )}

      {/* ── INQUIRY MODAL ───────────────────────────────────────────────── */}
      {selected && (
        <InquiryModal apt={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
