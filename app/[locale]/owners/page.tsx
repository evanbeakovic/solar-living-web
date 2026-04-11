'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function OwnersPage() {
  const t = useTranslations('owners');

  const features: { title: string; description: React.ReactNode }[] = [
    {
      title: t('features.photography.title'),
      description: <>{t('features.photography.descLine1')}<br />{t('features.photography.descLine2')}</>,
    },
    {
      title: t('features.listing.title'),
      description: <>{t('features.listing.descLine1')}<br />{t('features.listing.descLine2')}</>,
    },
    {
      title: t('features.communication.title'),
      description: <>{t('features.communication.descLine1')}<br />{t('features.communication.descLine2')}</>,
    },
    {
      title: t('features.cleaning.title'),
      description: <>{t('features.cleaning.descLine1')}<br />{t('features.cleaning.descLine2')}</>,
    },
    {
      title: t('features.pricing.title'),
      description: <>{t('features.pricing.descLine1')}<br />{t('features.pricing.descLine2')}</>,
    },
    {
      title: t('features.reporting.title'),
      description: <>{t('features.reporting.descLine1')}<br />{t('features.reporting.descLine2')}</>,
    },
  ];

  const steps: { number: string; title: string; description: React.ReactNode }[] = [
    {
      number: t('steps.step1.number'),
      title: t('steps.step1.title'),
      description: <>{t('steps.step1.descLine1')}<br />{t('steps.step1.descLine2')}<br />{t('steps.step1.descLine3')}</>,
    },
    {
      number: t('steps.step2.number'),
      title: t('steps.step2.title'),
      description: <>{t('steps.step2.descLine1')}<br />{t('steps.step2.descLine2')}<br />{t('steps.step2.descLine3')}</>,
    },
    {
      number: t('steps.step3.number'),
      title: t('steps.step3.title'),
      description: <>{t('steps.step3.descLine1')}<br />{t('steps.step3.descLine2')}<br />{t('steps.step3.descLine3')}</>,
    },
    {
      number: t('steps.step4.number'),
      title: t('steps.step4.title'),
      description: t('steps.step4.desc'),
    },
  ];

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
      t('whatsapp.greeting'),
      t('whatsapp.name', { name: form.name }),
      t('whatsapp.property', { address: form.address }),
      t('whatsapp.type', { type: form.type }),
      t('whatsapp.email', { email: form.email }),
      t('whatsapp.phone', { phone: form.phone }),
      form.message ? t('whatsapp.message', { message: form.message }) : '',
    ]
      .filter(Boolean)
      .join('\n');
    return `https://wa.me/385915483354?text=${encodeURIComponent(text)}`;
  }

  function buildMailtoUrl() {
    const body = [
      t('email.greeting'),
      ``,
      t('email.name', { name: form.name }),
      t('email.property', { address: form.address }),
      t('email.type', { type: form.type }),
      t('email.email', { email: form.email }),
      t('email.phone', { phone: form.phone }),
      form.message ? `\n${t('email.message', { message: form.message })}` : '',
    ]
      .filter((line) => line !== undefined)
      .join('\n');
    return `mailto:solarliving.info@gmail.com?subject=${encodeURIComponent(t('email.subject'))}&body=${encodeURIComponent(body)}`;
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
          {t('hero.label')}
        </p>
        <h1 className="font-serif text-4xl md:text-5xl leading-tight mb-7 max-w-3xl text-white">
          {t('hero.heading')}
        </h1>
        <p className="font-sans text-base md:text-lg mb-10 max-w-xl tracking-wide text-[#c8c8c8]">
          {t('hero.subtextLine1')}<br />{t('hero.subtextLine2')}
        </p>
        <a
          href="#contact"
          className="font-sans font-semibold text-sm uppercase tracking-widest px-8 py-4 transition-opacity hover:opacity-90 mb-4"
          style={{ backgroundColor: '#edd98f', color: '#474748' }}
        >
          {t('hero.cta')}
        </a>
        <p className="font-sans text-xs text-[#888888]">
          {t('hero.note')}
        </p>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-20 h-px" style={{ backgroundColor: 'rgba(255,255,255,0.3)' }} />
      </section>

      {/* ─── SECTION 2: WHAT WE OFFER ────────────────────────────────────── */}
      <section className="py-24 md:py-32 px-6" style={{ backgroundColor: '#525253' }}>
        <div className="max-w-5xl mx-auto">
          <div className="mb-16">
            <p className="font-sans text-xs uppercase tracking-widest text-[#86cae7] mb-4">
              {t('offer.label')}
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-white">
              {t('offer.heading')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="overflow-hidden"
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
            &ldquo;{t('promise.quote')}&rdquo;
          </blockquote>
          <p className="font-sans text-sm uppercase tracking-widest text-[#c8c8c8]">
            {t('promise.attribution')}
          </p>
        </div>
      </section>

      {/* ─── SECTION 4: HOW IT WORKS ─────────────────────────────────────── */}
      <section className="py-24 md:py-32 px-6" style={{ backgroundColor: '#474748' }}>
        <div className="max-w-5xl mx-auto">
          <div className="mb-16">
            <p className="font-sans text-xs uppercase tracking-widest text-[#86cae7] mb-4">
              {t('process.label')}
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-white">
              {t('process.heading')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4">
            {steps.map((step, i) => (
              <div
                key={step.number}
                className={`py-8 pr-8${i > 0 ? ' md:pl-8' : ''}`}
                style={{
                  borderRight: i < steps.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none',
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
                {t('contact.label')}
              </p>
              <h2 className="font-serif text-4xl text-white mb-4">
                {t('contact.heading')}
              </h2>
              <p className="font-sans text-[#c8c8c8] text-sm leading-relaxed">
                {t('contact.bodyLine1')}<br />{t('contact.bodyLine2')}
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
                {t('contact.whatsappLink')}
              </a>
              <a
                href="mailto:solarliving.info@gmail.com"
                className="flex items-center gap-3 font-sans text-sm text-white hover:text-[#86cae7] transition-colors"
              >
                <span className="text-[#86cae7] text-base">↗</span>
                {t('contact.emailLink')}
              </a>
            </div>
          </div>

          {/* Right column — form */}
          <div className="space-y-5">
            <div>
              <label className={labelClass} style={{ color: '#c8c8c8' }}>
                {t('contact.labelName')} <span style={{ color: '#86cae7' }}>*</span>
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder={t('contact.placeholderName')}
                required
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass} style={{ color: '#c8c8c8' }}>
                {t('contact.labelEmail')} <span style={{ color: '#86cae7' }}>*</span>
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder={t('contact.placeholderEmail')}
                required
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass} style={{ color: '#c8c8c8' }}>
                {t('contact.labelPhone')} <span style={{ color: '#86cae7' }}>*</span>
              </label>
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder={t('contact.placeholderPhone')}
                required
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass} style={{ color: '#c8c8c8' }}>
                {t('contact.labelAddress')} <span style={{ color: '#86cae7' }}>*</span>
              </label>
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder={t('contact.placeholderAddress')}
                required
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass} style={{ color: '#c8c8c8' }}>
                {t('contact.labelType')} <span style={{ color: '#86cae7' }}>*</span>
              </label>
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                required
                className={inputClass}
                style={{ appearance: 'none', cursor: 'pointer' }}
              >
                <option value="" disabled>{t('contact.selectDefault')}</option>
                <option value="Apartment">{t('contact.optionApartment')}</option>
                <option value="Studio">{t('contact.optionStudio')}</option>
                <option value="Villa">{t('contact.optionVilla')}</option>
                <option value="House">{t('contact.optionHouse')}</option>
                <option value="Other">{t('contact.optionOther')}</option>
              </select>
            </div>

            <div>
              <label className={labelClass} style={{ color: '#c8c8c8' }}>
                {t('contact.labelMessage')} <span style={{ color: '#888888' }}>{t('contact.messageOptional')}</span>
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder={t('contact.placeholderMessage')}
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
                {t('contact.sendWhatsApp')}
              </a>
              <a
                href={buildMailtoUrl()}
                className="font-sans font-semibold text-xs uppercase tracking-widest px-6 py-3 text-center flex-1 transition-opacity hover:opacity-90"
                style={{ backgroundColor: '#edd98f', color: '#474748' }}
              >
                {t('contact.sendEmail')}
              </a>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
