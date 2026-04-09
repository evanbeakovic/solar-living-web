'use client';

import { useState } from 'react';

const features = [
  {
    title: 'Professional Photography',
    description: 'We photograph your property to the highest standard to attract premium guests.',
  },
  {
    title: 'Listing Management',
    description: 'We manage your listings across all major platforms including Airbnb, Booking.com, and direct bookings.',
  },
  {
    title: 'Guest Communication',
    description: 'We handle all guest inquiries, check-ins, check-outs, and support — 24/7.',
  },
  {
    title: 'Cleaning & Maintenance',
    description: 'Professional cleaning after every stay, regular inspections, and prompt maintenance.',
  },
  {
    title: 'Dynamic Pricing',
    description: 'We optimize your nightly rates to maximize occupancy and revenue year-round.',
  },
  {
    title: 'Monthly Reporting',
    description: 'Transparent monthly reports so you always know how your property is performing.',
  },
];

const steps = [
  {
    number: '01',
    title: 'Free Consultation',
    description: 'We meet to understand your property, your goals, and answer any questions.',
  },
  {
    number: '02',
    title: 'Property Assessment',
    description: 'We visit and assess your property, provide recommendations, and agree on terms.',
  },
  {
    number: '03',
    title: 'We Handle Everything',
    description: 'Photography, listings, guest management, cleaning — all taken care of.',
  },
  {
    number: '04',
    title: 'You Earn & Relax',
    description: 'Receive monthly payments and transparent reports. That\'s it.',
  },
];

export default function OwnersPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    type: '',
    message: '',
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function buildWhatsAppUrl() {
    const text = [
      `Hi! I'd like to discuss property management.`,
      `Name: ${form.name}`,
      `Property: ${form.address}`,
      `Type: ${form.type}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone}`,
      form.message ? `Message: ${form.message}` : '',
    ]
      .filter(Boolean)
      .join('\n');
    return `https://wa.me/385915483354?text=${encodeURIComponent(text)}`;
  }

  function buildMailtoUrl() {
    const body = [
      `Hi Solar Living,`,
      ``,
      `Name: ${form.name}`,
      `Property: ${form.address}`,
      `Type: ${form.type}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone}`,
      form.message ? `\nMessage: ${form.message}` : '',
    ]
      .filter((line) => line !== undefined)
      .join('\n');
    return `mailto:solarliving.info@gmail.com?subject=${encodeURIComponent('Property Management Inquiry')}&body=${encodeURIComponent(body)}`;
  }

  const inputClass =
    'bg-[#474748] border border-[rgba(255,255,255,0.15)] text-white placeholder-[#888888] rounded-none px-4 py-3 w-full focus:border-[#86cae7] outline-none font-sans text-sm';
  const labelClass = 'block font-sans text-xs uppercase tracking-widest mb-1' ;

  return (
    <>
      {/* ─── SECTION 1: HERO ─────────────────────────────────────────────── */}
      <section
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-6"
        style={{ backgroundColor: '#474748' }}
      >
        <p className="font-sans text-xs uppercase tracking-widest mb-6 text-[#86cae7]">
          For Property Owners
        </p>
        <h1 className="font-serif text-5xl md:text-6xl leading-tight mb-7 max-w-3xl text-white">
          Let Us Take Care of Everything.
        </h1>
        <p className="font-sans text-base md:text-lg mb-10 max-w-xl tracking-wide text-[#c8c8c8]">
          Solar Living handles every aspect of your property — so you earn more, stress less, and never worry about a thing.
        </p>
        <a
          href="#contact"
          className="font-sans font-semibold text-sm uppercase tracking-widest px-8 py-4 transition-opacity hover:opacity-90 mb-4"
          style={{ backgroundColor: '#edd98f', color: '#474748' }}
        >
          Get a Free Consultation
        </a>
        <p className="font-sans text-xs text-[#888888]">
          No commitment required. We&apos;ll get back to you within 24 hours.
        </p>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-20 h-px" style={{ backgroundColor: 'rgba(255,255,255,0.3)' }} />
      </section>

      {/* ─── SECTION 2: WHAT WE OFFER ────────────────────────────────────── */}
      <section className="py-24 md:py-32 px-6" style={{ backgroundColor: '#525253' }}>
        <div className="max-w-5xl mx-auto">
          <div className="mb-16">
            <p className="font-sans text-xs uppercase tracking-widest text-[#86cae7] mb-4">
              What We Offer
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-white">
              Full Management. Zero Headaches.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="py-8 px-6"
              >
                <h3 className="font-sans font-semibold text-sm text-white mb-2">
                  {feature.title}
                </h3>
                <p className="font-sans text-sm text-[#c8c8c8] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 3: THE SOLAR LIVING PROMISE ─────────────────────────── */}
      <section className="py-32 px-6" style={{ backgroundColor: '#3e3e3f' }}>
        <div className="max-w-4xl mx-auto text-center">
          <blockquote className="font-serif text-3xl md:text-4xl lg:text-5xl italic leading-relaxed text-white mb-8">
            &ldquo;We treat every property as if it were our own — with the same care, attention, and pride.&rdquo;
          </blockquote>
          <p className="font-sans text-sm uppercase tracking-widest text-[#c8c8c8]">
            — Evan Beaković, Founder
          </p>
        </div>
      </section>

      {/* ─── SECTION 4: HOW IT WORKS ─────────────────────────────────────── */}
      <section className="py-24 md:py-32 px-6" style={{ backgroundColor: '#474748' }}>
        <div className="max-w-5xl mx-auto">
          <div className="mb-16">
            <p className="font-sans text-xs uppercase tracking-widest text-[#86cae7] mb-4">
              The Process
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-white">
              Getting Started is Simple.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4">
            {steps.map((step, i) => (
              <div
                key={step.number}
                className="py-8 pr-8"
                style={{
                  borderRight: i < steps.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                  paddingLeft: i > 0 ? '2rem' : '0',
                }}
              >
                <p className="font-serif text-2xl mb-4" style={{ color: '#edd98f' }}>
                  {step.number}
                </p>
                <h3 className="font-sans font-semibold text-sm text-white mb-2">
                  {step.title}
                </h3>
                <p className="font-sans text-sm text-[#c8c8c8] leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 5: CONTACT FORM ─────────────────────────────────────── */}
      <section id="contact" className="py-24 md:py-32 px-6" style={{ backgroundColor: '#525253' }}>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">

          {/* Left column */}
          <div className="space-y-6">
            <div>
              <p className="font-sans text-xs uppercase tracking-widest text-[#86cae7] mb-4">
                Get in Touch
              </p>
              <h2 className="font-serif text-4xl text-white mb-4">
                Ready to Partner With Us?
              </h2>
              <p className="font-sans text-[#c8c8c8] text-sm leading-relaxed">
                Fill in the form and we&apos;ll be in touch within 24 hours. Or reach us directly:
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <a
                href="https://wa.me/385915483354"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 font-sans text-sm text-white hover:text-[#86cae7] transition-colors"
              >
                <span className="text-[#86cae7] text-base">↗</span>
                WhatsApp: +385 91 548 3354
              </a>
              <a
                href="mailto:solarliving.info@gmail.com"
                className="flex items-center gap-3 font-sans text-sm text-white hover:text-[#86cae7] transition-colors"
              >
                <span className="text-[#86cae7] text-base">↗</span>
                solarliving.info@gmail.com
              </a>
            </div>
          </div>

          {/* Right column — form */}
          <div className="space-y-5">
            <div>
              <label className={labelClass} style={{ color: '#c8c8c8' }}>
                Full Name <span style={{ color: '#86cae7' }}>*</span>
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your full name"
                required
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass} style={{ color: '#c8c8c8' }}>
                Email <span style={{ color: '#86cae7' }}>*</span>
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass} style={{ color: '#c8c8c8' }}>
                Phone <span style={{ color: '#86cae7' }}>*</span>
              </label>
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+385 ..."
                required
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass} style={{ color: '#c8c8c8' }}>
                Property Address / Location <span style={{ color: '#86cae7' }}>*</span>
              </label>
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Street, city, or area"
                required
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass} style={{ color: '#c8c8c8' }}>
                Property Type <span style={{ color: '#86cae7' }}>*</span>
              </label>
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                required
                className={inputClass}
                style={{ appearance: 'none', cursor: 'pointer' }}
              >
                <option value="" disabled>Select type…</option>
                <option value="Apartment">Apartment</option>
                <option value="Studio">Studio</option>
                <option value="Villa">Villa</option>
                <option value="House">House</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className={labelClass} style={{ color: '#c8c8c8' }}>
                Message <span style={{ color: '#888888' }}>(optional)</span>
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Tell us about your property and what you're looking for."
                rows={4}
                className={inputClass}
                style={{ resize: 'vertical' }}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-xs uppercase tracking-widest px-6 py-3 text-white text-center flex-1 transition-opacity hover:opacity-90"
                style={{ backgroundColor: '#4a8c7a' }}
              >
                Send via WhatsApp
              </a>
              <a
                href={buildMailtoUrl()}
                className="font-sans font-semibold text-xs uppercase tracking-widest px-6 py-3 text-center flex-1 transition-opacity hover:opacity-90"
                style={{ backgroundColor: '#edd98f', color: '#474748' }}
              >
                Send via Email
              </a>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
