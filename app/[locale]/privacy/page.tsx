'use client';

import { useState } from 'react';

const en = {
  updated: 'Last updated: April 2026',
  sections: [
    {
      title: '1. Introduction',
      body: 'Solar Living (operated by BE CAPITAL, obrt za poslovanje nekretninama, vl. Evan Beaković, OIB: 30760238873, Ul. 8. ožujka 1A, Umag, Croatia) is committed to protecting your privacy. This policy explains how we collect, use, and protect your personal data when you visit solarliving.hr or contact us.',
    },
    {
      title: '2. Data We Collect',
      body: 'When you submit an inquiry through our website, we may collect:',
      list: [
        'Your name',
        'Your email address',
        'Your phone number',
        'Your travel dates and preferences',
        'Any message you choose to send us',
      ],
      note: 'We do not collect this data automatically — it is only submitted when you choose to contact us via our inquiry form.',
    },
    {
      title: '3. How We Use Your Data',
      body: 'We use your personal data solely to:',
      list: [
        'Respond to your booking or property management inquiry',
        'Communicate with you regarding your stay or partnership request',
        'Fulfill our contractual obligations to you',
      ],
      note: 'We do not sell, rent, or share your personal data with third parties for marketing purposes.',
    },
    {
      title: '4. Cookies',
      body: 'This website does not use tracking cookies, analytics cookies, or advertising cookies. We do not use Google Analytics or any third-party tracking tools. The only cookies that may be set are strictly necessary session cookies required for the website to function (such as language preference). No consent is required for these cookies under EU law.',
    },
    {
      title: '5. Data Retention',
      body: 'We retain your personal data only for as long as necessary to respond to your inquiry or fulfill our contractual obligations. If you would like your data deleted, please contact us and we will remove it promptly.',
    },
    {
      title: '6. Your Rights (GDPR)',
      body: 'Under the General Data Protection Regulation (GDPR), you have the right to:',
      list: [
        'Access the personal data we hold about you',
        'Request correction of inaccurate data',
        'Request deletion of your data',
        'Object to processing of your data',
        'Lodge a complaint with the Croatian Personal Data Protection Agency (AZOP)',
      ],
    },
    {
      title: '7. Contact',
      body: 'For any privacy-related requests or questions, please contact:',
      contact: [
        'BE CAPITAL, vl. Evan Beaković',
        'Email: solarliving.info@gmail.com',
        'WhatsApp: +385 91 548 3354',
      ],
    },
  ],
};

const hr = {
  updated: 'Zadnje ažuriranje: Travanj 2026.',
  sections: [
    {
      title: '1. Uvod',
      body: 'Solar Living (kojim upravlja BE CAPITAL, obrt za poslovanje nekretninama, vl. Evan Beaković, OIB: 30760238873, Ul. 8. ožujka 1A, Umag, Hrvatska) predan je zaštiti vaše privatnosti. Ova politika objašnjava kako prikupljamo, koristimo i štitimo vaše osobne podatke kada posjetite solarliving.hr ili nas kontaktirate.',
    },
    {
      title: '2. Podaci koje prikupljamo',
      body: 'Kada pošaljete upit putem naše web stranice, možemo prikupiti:',
      list: [
        'Vaše ime',
        'Vašu adresu e-pošte',
        'Vaš broj telefona',
        'Vaše datume putovanja i preferencije',
        'Poruku koju nam odlučite poslati',
      ],
      note: 'Ne prikupljamo ove podatke automatski — dostavljaju se samo kada nas odlučite kontaktirati putem obrasca za upite.',
    },
    {
      title: '3. Kako koristimo vaše podatke',
      body: 'Vaše osobne podatke koristimo isključivo za:',
      list: [
        'Odgovaranje na vaš upit za rezervaciju ili upravljanje nekretninom',
        'Komunikaciju s vama u vezi vašeg boravka ili zahtjeva za partnerstvo',
        'Ispunjavanje naših ugovornih obveza prema vama',
      ],
      note: 'Ne prodajemo, ne iznajmljujemo niti ne dijelimo vaše osobne podatke s trećim stranama u marketinške svrhe.',
    },
    {
      title: '4. Kolačići (Cookies)',
      body: 'Ova web stranica ne koristi kolačiće za praćenje, analitičke kolačiće niti oglašivačke kolačiće. Ne koristimo Google Analytics niti alate za praćenje trećih strana. Jedini kolačići koji se mogu postaviti su strogo nužni kolačići sesije potrebni za funkcioniranje web stranice (poput preferencije jezika). Za ove kolačiće nije potreban pristanak prema EU pravu.',
    },
    {
      title: '5. Čuvanje podataka',
      body: 'Vaše osobne podatke čuvamo samo onoliko dugo koliko je potrebno za odgovaranje na vaš upit ili ispunjavanje naših ugovornih obveza. Ako želite da se vaši podaci izbrišu, kontaktirajte nas i promptno ćemo ih ukloniti.',
    },
    {
      title: '6. Vaša prava (GDPR)',
      body: 'Prema Općoj uredbi o zaštiti podataka (GDPR), imate pravo na:',
      list: [
        'Pristup osobnim podacima koje čuvamo o vama',
        'Zahtjev za ispravak netočnih podataka',
        'Zahtjev za brisanje vaših podataka',
        'Prigovor na obradu vaših podataka',
        'Podnošenje pritužbe Agenciji za zaštitu osobnih podataka (AZOP)',
      ],
    },
    {
      title: '7. Kontakt',
      body: 'Za sve zahtjeve ili pitanja vezana uz privatnost, kontaktirajte nas:',
      contact: [
        'BE CAPITAL, vl. Evan Beaković',
        'E-pošta: solarliving.info@gmail.com',
        'WhatsApp: +385 91 548 3354',
      ],
    },
  ],
};

type Lang = 'en' | 'hr';

export default function PrivacyPage() {
  const [lang, setLang] = useState<Lang>('en');
  const content = lang === 'en' ? en : hr;

  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────────────────────── */}
      <section className="py-32 px-6 text-center" style={{ backgroundColor: '#474748' }}>
        <p className="font-sans text-xs uppercase tracking-widest mb-6" style={{ color: '#86cae7' }}>
          Legal
        </p>
        <h1 className="font-serif text-5xl md:text-6xl leading-tight text-white">
          Privacy &amp; Cookie Policy
        </h1>
      </section>

      {/* ─── CONTENT ──────────────────────────────────────────────────────── */}
      <section className="py-24 px-6" style={{ backgroundColor: '#474748' }}>
        <div className="max-w-3xl mx-auto">

          {/* Language toggle */}
          <div className="flex gap-3 mb-12">
            {(['en', 'hr'] as Lang[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className="font-sans text-xs uppercase tracking-widest px-4 py-2 transition-colors"
                style={{
                  border: `1px solid ${lang === l ? '#86cae7' : 'rgba(255,255,255,0.2)'}`,
                  color: lang === l ? '#ffffff' : '#888888',
                  backgroundColor: 'transparent',
                }}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Last updated */}
          <p className="font-sans text-xs mb-12" style={{ color: '#888888' }}>
            {content.updated}
          </p>

          {/* Sections */}
          <div className="space-y-10">
            {content.sections.map((section) => (
              <div
                key={section.title}
                className="pl-5 border-l-2"
                style={{ borderColor: '#edd98f' }}
              >
                <h2 className="font-sans font-semibold text-sm uppercase tracking-widest mb-3 text-white">
                  {section.title}
                </h2>
                <p className="font-sans text-sm leading-relaxed mb-3" style={{ color: '#c8c8c8' }}>
                  {section.body}
                </p>
                {section.list && (
                  <ul className="space-y-1.5 mb-3 pl-4">
                    {section.list.map((item) => (
                      <li
                        key={item}
                        className="font-sans text-sm leading-relaxed"
                        style={{ color: '#c8c8c8', listStyleType: 'none' }}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
                {section.note && (
                  <p className="font-sans text-sm leading-relaxed" style={{ color: '#c8c8c8' }}>
                    {section.note}
                  </p>
                )}
                {section.contact && (
                  <ul className="space-y-1.5">
                    {section.contact.map((line) => (
                      <li key={line} className="font-sans text-sm" style={{ color: '#c8c8c8' }}>
                        {line}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
