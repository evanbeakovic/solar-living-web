'use client';

import { useState, useEffect } from 'react';
import { Link } from '@/navigation';

// ─── Data ──────────────────────────────────────────────────────────────────

type Apartment = {
  id: number;
  name: string;
  description: string;
  guests: number;
  bedrooms: number;
  type: string;
  location: string;
  amenities: string[];
  image: null;
  available: boolean;
};

const apartments: Apartment[] = [
  {
    id: 1,
    name: 'Solar Apartment Umag I',
    description:
      'Elegant 2-bedroom apartment in the heart of Umag, steps from the sea. Fully equipped with premium amenities, tasteful décor, and everything you need for a perfect Istrian holiday.',
    guests: 4,
    bedrooms: 2,
    type: 'Apartment',
    location: 'Umag Old Town',
    amenities: ['Air conditioning', 'Wi-Fi', 'Fully equipped kitchen', 'Smart TV', 'Washing machine', 'Sea view'],
    image: null, // TODO: replace with real image
    available: true,
  },
  {
    id: 2,
    name: 'Solar Apartment Umag II',
    description:
      'Modern studio with stunning sea views and premium amenities. Perfectly designed for couples seeking a luxurious and intimate escape on the Istrian coast.',
    guests: 2,
    bedrooms: 0,
    type: 'Studio',
    location: 'Umag Seafront',
    amenities: ['Air conditioning', 'Wi-Fi', 'Kitchenette', 'Smart TV', 'Sea view', 'Balcony'],
    image: null,
    available: true,
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
}: {
  apt: Apartment;
  onBook: (apt: Apartment) => void;
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
      className="overflow-hidden flex flex-col"
      style={{ backgroundColor: '#d8d8d8', border: '1px solid rgba(0,0,0,0.08)' }}
    >
      {/* Image area */}
      {apt.available ? (
        // TODO: replace with next/image
        <div className="h-72 flex items-center justify-center" style={{ background: cardGradient }}>
          <span
            className="font-serif text-2xl tracking-widest"
            style={{ color: 'rgba(255,255,255,0.15)' }}
          >
            SOLAR LIVING
          </span>
        </div>
      ) : (
        <div className="h-72 flex items-center justify-center" style={{ background: cardGradient }}>
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
            <p className="font-sans text-xs uppercase tracking-widest text-[#2a2a2a] mb-1">
              Umag, Croatia
            </p>
            <h3 className="font-serif text-xl font-normal text-[#1a1a1a]">
              {apt.name}
            </h3>
          </div>
          <span className="font-sans text-xs uppercase tracking-widest shrink-0 pt-0.5 text-[#2a2a2a]">
            {apt.type}
          </span>
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
            className="flex-1 font-sans font-semibold text-xs uppercase tracking-widest py-3 bg-green-700 text-white hover:bg-green-800 transition-colors"
          >
            Send via WhatsApp
          </button>
          <button
            onClick={handleEmail}
            className="flex-1 font-sans font-semibold text-xs uppercase tracking-widest py-3 transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#86cae7', color: '#474748' }}
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

// ─── Page ──────────────────────────────────────────────────────────────────

export default function ApartmentsPage() {
  const [selected, setSelected] = useState<Apartment | null>(null);

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
          Select a property, choose your dates, and send us an inquiry. We&apos;ll confirm
          availability and handle the rest.
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
            <p className="font-sans text-sm text-[#c8c8c8] md:text-right md:max-w-xs">
              Select a property below and send us your inquiry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {apartments.map((apt) => (
              <ApartmentCard key={apt.id} apt={apt} onBook={setSelected} />
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 3: BOTTOM CTA ───────────────────────────────────────── */}
      <section className="py-24 px-6 text-center" style={{ backgroundColor: '#525253' }}>
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="font-serif text-3xl md:text-4xl text-white">
            Not sure which apartment is right for you?
          </h2>
          <p className="font-sans text-base leading-relaxed text-[#c8c8c8]">
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

      {/* ── INQUIRY MODAL ───────────────────────────────────────────────── */}
      {selected && (
        <InquiryModal apt={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
