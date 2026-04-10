'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { MapPin } from 'lucide-react';
import { Link } from '@/navigation';

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

const apartments: Apartment[] = [
  {
    id: 1,
    name: "Elaine's View",
    description:
      'First row to the sea. Panoramic views of the Adriatic, sunsets & Umag Old Town.',
    guests: 6,
    bedrooms: 3,
    type: 'Apartment',
    location: 'Umag Old Town',
    amenities: ['Air conditioning', 'Wi-Fi', 'Fully equipped kitchen', 'Smart TV', 'Washing machine', 'Sea view'],
    image: '/images/umag-1-main.jpg',
    available: true,
    mapSrc: 'https://maps.google.com/maps?q=Ul.+8.+ožujka+1A,+Umag,+Croatia&output=embed',
    mapLink: "https://www.google.com/maps/search/Apartment+Elaine%27s+View+Umag",
    badge: '9.9 · Booking.com  |  5.0 · Airbnb',
    reviews: [
      { name: 'Tania', country: 'Canada', platform: 'Airbnb', rating: 5, max: 5, text: 'The apartment was clean and comfortable with balcony views of evening sunsets over the Adriatic and the old town of Umag. Umag is a perfect spot to enjoy Istria — including day trips into Italy. Weather was perfect, interesting history and gorgeous scenery.' },
      { name: 'Stephan', country: 'Germany', platform: 'Airbnb', rating: 5, max: 5, text: 'We were received very kindly and personally. A big, well laid out apartment overlooking the sea. There is a balcony to the sea side, but also to the side — very practical. We found it very quiet.' },
      { name: 'Jana', country: 'Czech Republic', platform: 'Booking.com', rating: 10, max: 10, text: 'Perfect accommodation. A premium apartment with a stunning sea view. Right in front of the building is a city beach with easy sea access and very few people. Very friendly and professional communication with the host. We will definitely return.' },
    ],
  },
  {
    id: 2,
    name: "Stella's Garden",
    description:
      "Ground-floor living in Umag's finest new building, with a private Mediterranean garden.",
    guests: 6,
    bedrooms: 2,
    type: 'Apartment',
    location: 'Umag',
    amenities: ['Air conditioning', 'Wi-Fi', 'Fully equipped kitchen', 'Smart TV', 'Private terrace', 'Garden'],
    image: '/images/umag-2-main.jpg',
    available: true,
    mapSrc: 'https://maps.google.com/maps?q=Ulica+154.+brigada+HV+7,+Umag,+Croatia&output=embed',
    mapLink: 'https://www.google.com/maps/search/Ulica+154+brigada+HV+7+Umag',
    badge: '9.8 · Booking.com  |  5.0 · Airbnb',
    reviews: [
      { name: 'Peter', country: 'Slovakia', platform: 'Airbnb', rating: 5, max: 5, text: 'Everything was sparkling clean and very modern — you almost felt like we were the first guests. Extremely friendly host, always immediately available for questions with very quick answers.' },
      { name: 'Jehona', country: 'Slovenia', platform: 'Booking.com', rating: 10, max: 10, text: 'Everything is excellent — better than a 5-star hotel. I recommend it to everyone. I have never seen something like this. The owner was very kind and showed us everything.' },
      { name: 'Maciej', country: 'Poland', platform: 'Booking.com', rating: 9, max: 10, text: 'Highly recommended. Spacious ground-floor apartment with comfortable beds, a well-equipped kitchen, air conditioning, and two bathrooms. Large terrace with assigned parking. 2 minutes by car to shopping centers, 4-5 minutes to the nearest beach.' },
    ],
  },
  {
    id: 3,
    name: 'Solar Apartment Umag III',
    description:
      'A stunning new addition to our portfolio — details coming soon. Contact us to be the first to know when this property becomes available.',
    guests: 4,
    bedrooms: 2,
    type: 'Apartment',
    location: 'Umag',
    amenities: [],
    image: null,
    available: false,
  },
  {
    id: 4,
    name: 'Solar Apartment Umag IV',
    description:
      'An exceptional property currently being prepared for our portfolio. Reach out to learn more.',
    guests: 6,
    bedrooms: 3,
    type: 'Villa',
    location: 'Umag area',
    amenities: [],
    image: null,
    available: false,
  },
];

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

function today() {
  return new Date().toISOString().split('T')[0];
}

function minCheckout(checkin: string) {
  if (!checkin) return today();
  const d = new Date(checkin);
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
}

function buildWhatsApp(apt: Apartment, form: FormState) {
  const lines = [
    `Hi! I'd like to book ${apt.name}`,
    `Check-in: ${form.checkin}`,
    `Check-out: ${form.checkout}`,
    `Guests: ${form.guests}`,
    `Name: ${form.name}`,
    `Phone: ${form.phone}`,
    `Email: ${form.email}`,
    form.message ? `Message: ${form.message}` : '',
  ]
    .filter(Boolean)
    .join('\n');
  return `https://wa.me/385915483354?text=${encodeURIComponent(lines)}`;
}

function buildMailto(apt: Apartment, form: FormState) {
  const subject = encodeURIComponent(`Booking Inquiry – ${apt.name}`);
  const body = encodeURIComponent(
    `Hi Solar Living team,\n\nI'd like to inquire about booking ${apt.name}.\n\nCheck-in: ${form.checkin}\nCheck-out: ${form.checkout}\nGuests: ${form.guests}\nName: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\n\nMessage: ${form.message}`
  );
  return `mailto:solarliving.info@gmail.com?subject=${subject}&body=${body}`;
}

function validateForm(form: FormState, maxGuests: number): string | null {
  if (!form.name.trim()) return 'Please enter your full name.';
  if (!form.email.trim()) return 'Please enter your email address.';
  if (!form.phone.trim()) return 'Please enter your phone number.';
  if (!form.checkin) return 'Please select a check-in date.';
  if (!form.checkout) return 'Please select a check-out date.';
  if (form.checkout <= form.checkin) return 'Check-out must be after check-in.';
  const g = parseInt(form.guests, 10);
  if (isNaN(g) || g < 1) return 'Please enter a valid number of guests.';
  if (g > maxGuests) return `This apartment fits a maximum of ${maxGuests} guests.`;
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
            Coming Soon
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
                Umag, Croatia
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
                Umag, Croatia
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
              Check Availability &amp; Book
            </button>
          ) : (
            <button
              disabled
              className="w-full font-sans font-semibold text-xs uppercase tracking-widest py-3 cursor-not-allowed text-[#999999]"
              style={{ border: '1px solid #999999' }}
            >
              Coming Soon
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
    const err = validateForm(form, apt.guests);
    if (err) { setError(err); return; }
    window.open(buildWhatsApp(apt, form), '_blank');
  }

  function handleEmail() {
    const err = validateForm(form, apt.guests);
    if (err) { setError(err); return; }
    window.open(buildMailto(apt, form), '_blank');
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
          aria-label="Close"
        >
          ×
        </button>

        {/* Header */}
        <h2 className="font-serif text-2xl mb-1 text-white">
          Book {apt.name}
        </h2>
        <p className="font-sans text-sm mb-7 text-[#c8c8c8]">
          Fill in your details and we&apos;ll get back to you to confirm availability.
        </p>

        {/* Form */}
        <div className="space-y-4">
          <div>
            <label className="block font-sans text-xs uppercase tracking-widest mb-1.5 text-[#c8c8c8]">Full Name *</label>
            <input type="text" className={inputClass} style={inputStyle} placeholder="Jane Smith" value={form.name} onChange={set('name')} required />
          </div>

          <div>
            <label className="block font-sans text-xs uppercase tracking-widest mb-1.5 text-[#c8c8c8]">Email *</label>
            <input type="email" className={inputClass} style={inputStyle} placeholder="jane@example.com" value={form.email} onChange={set('email')} required />
          </div>

          <div>
            <label className="block font-sans text-xs uppercase tracking-widest mb-1.5 text-[#c8c8c8]">Phone Number *</label>
            <input type="text" className={inputClass} style={inputStyle} placeholder="+44 7700 900000" value={form.phone} onChange={set('phone')} required />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-sans text-xs uppercase tracking-widest mb-1.5 text-[#c8c8c8]">Check-in *</label>
              <input type="date" className={inputClass} style={inputStyle} min={today()} value={form.checkin} onChange={set('checkin')} required />
            </div>
            <div>
              <label className="block font-sans text-xs uppercase tracking-widest mb-1.5 text-[#c8c8c8]">Check-out *</label>
              <input type="date" className={inputClass} style={inputStyle} min={minCheckout(form.checkin)} value={form.checkout} onChange={set('checkout')} required />
            </div>
          </div>

          <div>
            <label className="block font-sans text-xs uppercase tracking-widest mb-1.5 text-[#c8c8c8]">
              Guests * <span className="normal-case tracking-normal text-[#999999]">(max {apt.guests})</span>
            </label>
            <input type="number" className={inputClass} style={inputStyle} min={1} max={apt.guests} value={form.guests} onChange={set('guests')} required />
          </div>

          <div>
            <label className="block font-sans text-xs uppercase tracking-widest mb-1.5 text-[#c8c8c8]">
              Message <span className="normal-case tracking-normal text-[#999999]">(optional)</span>
            </label>
            <textarea
              className={`${inputClass} resize-none`}
              style={inputStyle}
              rows={3}
              placeholder="Any special requests or questions?"
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
            Send via WhatsApp
          </button>
          <button
            onClick={handleEmail}
            className="flex-1 font-sans font-semibold text-xs uppercase tracking-widest py-3 transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#edd98f', color: '#474748' }}
          >
            Send via Email
          </button>
        </div>

        <p className="mt-4 font-sans text-xs text-center text-[#c8c8c8]">
          We typically respond within a few hours.
        </p>
      </div>
    </div>
  );
}

// ─── Reviews Modal ─────────────────────────────────────────────────────────

function ReviewsModal({ apt, onClose }: { apt: Apartment; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const scoreLabel = apt.id === 1
    ? '★ 9.9 / 10 · Booking.com  |  ★ 5 / 5 · Airbnb'
    : '★ 9.8 / 10 · Booking.com  |  ★ 5 / 5 · Airbnb';

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
            aria-label="Close"
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
  const [selected, setSelected] = useState<Apartment | null>(null);
  const [reviewsApt, setReviewsApt] = useState<Apartment | null>(null);

  return (
    <>
      {/* ── SECTION 1: PAGE HERO ────────────────────────────────────────── */}
      <section className="py-32 px-6 text-center" style={{ backgroundColor: '#474748' }}>
        <p className="font-sans text-xs uppercase tracking-widest mb-5 text-[#86cae7]">
          Our Properties
        </p>
        <h1 className="font-serif text-5xl md:text-6xl mb-6 leading-tight text-white">
          Find Your Perfect Apartment
        </h1>
        <p className="font-sans text-base max-w-xl mx-auto leading-relaxed tracking-wide text-[#c8c8c8]">
          Select a property, choose your dates, and send us an inquiry.<br />We&apos;ll confirm availability and handle the rest.
        </p>
      </section>

      {/* ── SECTION 2: APARTMENT LISTINGS ───────────────────────────────── */}
      <section className="py-24 px-6" style={{ backgroundColor: '#474748' }}>
        <div className="max-w-5xl mx-auto">
          {/* Left-aligned header row */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-16 gap-4">
            <div>
              <p className="font-sans text-xs uppercase tracking-widest text-[#86cae7] mb-4">
                Our Collection
              </p>
              <h2 className="font-serif text-4xl md:text-5xl text-white">
                All Apartments
              </h2>
            </div>
            <p className="font-sans text-sm text-[#c8c8c8] md:text-right">
              Select a property below and send us your inquiry.
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
            Not sure which apartment is right for you?
          </h2>
          <p className="font-sans text-base leading-relaxed text-[#c8c8c8] whitespace-nowrap">
            Get in touch and we&apos;ll help you find the perfect match for your group, dates, and budget.
          </p>
          <Link
            href="/contact"
            className="inline-block font-sans font-semibold text-xs uppercase tracking-widest px-8 py-4 text-white transition-colors hover:bg-white hover:text-[#2a2a2a]"
            style={{ border: '1px solid rgba(255,255,255,0.2)' }}
          >
            Contact Us
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
