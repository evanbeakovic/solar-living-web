'use client';

import { useState } from 'react';
import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';

export default function ContactPage() {
  const t = useTranslations('contact');

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    type: '',
    message: '',
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function buildWhatsAppUrl() {
    const text = [
      `Hi!`,
      `Name: ${form.name}`,
      `I am: ${form.type}`,
      `Email: ${form.email}`,
      form.phone ? `Phone: ${form.phone}` : '',
      ``,
      `Message: ${form.message}`,
    ]
      .filter((line) => line !== undefined)
      .join('\n');
    return `https://wa.me/385915483354?text=${encodeURIComponent(text)}`;
  }

  function buildMailtoUrl() {
    const body = [
      `Hi Solar Living,`,
      ``,
      `Name: ${form.name}`,
      `I am a: ${form.type}`,
      `Email: ${form.email}`,
      form.phone ? `Phone: ${form.phone}` : '',
      ``,
      `Message: ${form.message}`,
    ]
      .filter((line) => line !== undefined)
      .join('\n');
    return `mailto:solarliving.info@gmail.com?subject=${encodeURIComponent(`Inquiry from ${form.name}`)}&body=${encodeURIComponent(body)}`;
  }

  const inputClass =
    'bg-[#474748] border border-[rgba(255,255,255,0.15)] text-white placeholder-[#666666] rounded-none px-4 py-3 w-full focus:border-[#86cae7] outline-none font-sans text-sm';
  const labelClass = 'block font-sans text-xs uppercase tracking-widest mb-2 text-[#c8c8c8]';

  return (
    <>
      {/* ─── SECTION 1: HERO ─────────────────────────────────────────────── */}
      <section
        className="py-32 px-6 flex flex-col items-center justify-center text-center"
        style={{ backgroundColor: '#474748' }}
      >
        <p className="font-sans text-xs uppercase tracking-widest mb-6 text-[#86cae7]">
          {t('hero.label')}
        </p>
        <h1 className="font-serif text-5xl md:text-6xl leading-tight mb-7 text-white">
          {t('hero.heading')}
        </h1>
        <p className="font-sans text-base text-[#c8c8c8] mx-auto text-center leading-relaxed">
          {t('hero.subtext')}
        </p>
      </section>

      {/* ─── SECTION 2: CONTACT INFO + FORM ─────────────────────────────── */}
      <section className="py-24 px-6" style={{ backgroundColor: '#525253' }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16 md:gap-24">

          {/* Left column — contact details */}
          <div className="md:w-2/5">
            <p className="font-sans text-xs uppercase tracking-widest text-[#86cae7] mb-8">
              {t('details.label')}
            </p>

            <div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }} className="py-6">
              <p className="font-sans font-semibold text-white text-sm uppercase tracking-widest mb-2">
                {t('details.officeTitle')}
              </p>
              <p className="font-sans text-[#c8c8c8] text-sm">{t('details.addressLine1')}</p>
              <p className="font-sans text-[#c8c8c8] text-sm">{t('details.addressLine2')}</p>
            </div>

            <div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }} className="py-6">
              <p className="font-sans font-semibold text-white text-sm uppercase tracking-widest mb-2">
                {t('details.whatsappTitle')}
              </p>
              <a
                href="https://wa.me/385915483354"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-sm text-[#86cae7] hover:text-white transition-colors"
              >
                {t('details.whatsappNumber')}
              </a>
            </div>

            <div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }} className="py-6">
              <p className="font-sans font-semibold text-white text-sm uppercase tracking-widest mb-2">
                {t('details.emailTitle')}
              </p>
              <a
                href="mailto:solarliving.info@gmail.com"
                className="font-sans text-sm text-[#86cae7] hover:text-white transition-colors"
              >
                {t('details.emailAddress')}
              </a>
            </div>

            <div className="py-6">
              <p className="font-sans font-semibold text-white text-sm uppercase tracking-widest mb-2">
                {t('details.responseTitle')}
              </p>
              <p className="font-sans text-[#c8c8c8] text-sm leading-relaxed">
                {t('details.responseText')}
              </p>
            </div>

            <div className="mt-4 space-y-3" style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1.5rem' }}>
              <a
                href="https://www.instagram.com/solarliving_/"
                target="_blank"
                rel="noopener noreferrer"
                className="block font-sans text-sm text-[#c8c8c8] hover:text-white transition-colors"
              >
                {t('details.instagram')}
              </a>
              <a
                href="https://solarcreative.hr"
                target="_blank"
                rel="noopener noreferrer"
                className="block font-sans text-sm text-[#c8c8c8] hover:text-white transition-colors"
              >
                {t('details.solarCreative')}
              </a>
            </div>
          </div>

          {/* Right column — form */}
          <div className="md:w-3/5">
            <p className="font-sans text-xs uppercase tracking-widest text-[#86cae7] mb-8">
              {t('form.label')}
            </p>

            <div className="space-y-5">
              <div>
                <label className={labelClass}>
                  {t('form.labelName')} <span style={{ color: '#86cae7' }}>*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder={t('form.placeholderName')}
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>
                  {t('form.labelEmail')} <span style={{ color: '#86cae7' }}>*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder={t('form.placeholderEmail')}
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>
                  {t('form.labelPhone')} <span style={{ color: '#888888' }}>{t('form.phoneOptional')}</span>
                </label>
                <input
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder={t('form.placeholderPhone')}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>
                  {t('form.labelType')} <span style={{ color: '#86cae7' }}>*</span>
                </label>
                <select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  required
                  className={inputClass}
                  style={{ appearance: 'none', cursor: 'pointer' }}
                >
                  <option value="" disabled>{t('form.selectDefault')}</option>
                  <option value="Guest looking to book">{t('form.optionGuest')}</option>
                  <option value="Property owner">{t('form.optionOwner')}</option>
                  <option value="Other">{t('form.optionOther')}</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>
                  {t('form.labelMessage')} <span style={{ color: '#86cae7' }}>*</span>
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder={t('form.placeholderMessage')}
                  rows={5}
                  required
                  className={inputClass}
                  style={{ resize: 'vertical' }}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <a
                  href={buildWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-xs uppercase tracking-widest flex-1 py-4 text-white text-center transition-opacity hover:opacity-90"
                  style={{ backgroundColor: '#4a8c7a' }}
                >
                  {t('form.sendWhatsApp')}
                </a>
                <a
                  href={buildMailtoUrl()}
                  className="font-sans font-semibold text-xs uppercase tracking-widest flex-1 py-4 text-center transition-opacity hover:opacity-90"
                  style={{ backgroundColor: '#edd98f', color: '#474748' }}
                >
                  {t('form.sendEmail')}
                </a>
              </div>

              <p className="font-sans text-xs text-[#888888] text-center mt-3">
                {t('form.responseNote')}
              </p>
            </div>
          </div>

        </div>
        <p className="mt-12 text-center font-sans text-sm" style={{ color: '#888888' }}>
          {t('locationNote')}
        </p>
      </section>

      {/* ─── SECTION 3: BOTTOM CTA ───────────────────────────────────────── */}
      <section className="py-24 px-6 text-center" style={{ backgroundColor: '#525253' }}>
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="font-serif text-4xl text-white">
            {t('cta.heading')}
          </h2>
          <p className="font-sans text-[#c8c8c8] text-base leading-relaxed">
            {t('cta.body')}
          </p>
          <Link
            href="/apartments"
            className="inline-block font-sans font-semibold text-sm uppercase tracking-widest px-8 py-4 transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#86cae7', color: '#474748' }}
          >
            {t('cta.button')}
          </Link>
        </div>
      </section>
    </>
  );
}
