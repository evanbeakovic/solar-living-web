import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ | Solar Living Umag',
  description:
    'Frequently asked questions about Solar Living apartments in Umag, Istria — booking, amenities, location, and property management services.',
  robots: 'index, follow',
  alternates: { canonical: 'https://solarliving.hr/faq' },
  openGraph: {
    title: 'FAQ | Solar Living Umag',
    description:
      'Frequently asked questions about Solar Living apartments in Umag, Istria — booking, amenities, location, and property management services.',
    url: 'https://solarliving.hr/faq',
    siteName: 'Solar Living',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Where are the Solar Living apartments located?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Both apartments are located in Umag, a charming coastal town on the northwestern tip of Istria, Croatia. Elaine's View is in Umag Old Town, first row to the sea. Stella's Garden is in a brand new building in a quiet residential area of Umag, 4-5 minutes from the beach.",
      },
    },
    {
      '@type': 'Question',
      name: 'What is included in the apartments?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "All apartments are fully equipped with air conditioning, Wi-Fi, a fully equipped kitchen, Smart TV, and fresh linen. Elaine's View also includes a washing machine and sea view terrace. Stella's Garden features a private Mediterranean garden and terrace.",
      },
    },
    {
      '@type': 'Question',
      name: 'How do I book an apartment?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Send a booking inquiry directly through our website. Click Check Availability and Book on any apartment, fill in your details, and send via WhatsApp or email. We confirm availability and handle everything from there.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the guest ratings for Solar Living apartments?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Elaine's View holds a 9.9/10 rating on Booking.com and 5.0/5 on Airbnb. Stella's Garden holds a 9.8/10 on Booking.com and 5.0/5 on Airbnb.",
      },
    },
    {
      '@type': 'Question',
      name: 'Is there parking available?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes. Both Elaine's View and Stella's Garden include dedicated parking.",
      },
    },
    {
      '@type': 'Question',
      name: 'How far are the apartments from the beach?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Elaine's View is first row to the sea with a city beach directly in front of the building. Stella's Garden is approximately 4-5 minutes by car from the nearest beach.",
      },
    },
    {
      '@type': 'Question',
      name: 'What does Solar Living property management include?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Full-service property management including professional photography, multi-platform listing management on Airbnb and Booking.com, 24/7 guest communication, cleaning and maintenance coordination, dynamic pricing optimization, and monthly performance reporting.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which areas does Solar Living operate in?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Solar Living currently operates in Umag, Istria, Croatia, and is expanding across the Istrian peninsula.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Solar Living a licensed property management company?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Solar Living operates under BE CAPITAL, obrt za poslovanje nekretninama, vl. Evan Beaković, OIB: 30760238873, registered in Croatia.',
      },
    },
  ],
};

const guestFaqs = [
  {
    q: 'Where are the Solar Living apartments located?',
    a: "Both apartments are located in Umag, a charming coastal town on the northwestern tip of Istria, Croatia. Elaine's View is in Umag Old Town, first row to the sea. Stella's Garden is in a brand new building in a quiet residential area of Umag, 4–5 minutes from the beach.",
  },
  {
    q: 'What is included in the apartments?',
    a: "All apartments are fully equipped with air conditioning, Wi-Fi, a fully equipped kitchen, Smart TV, and fresh linen. Elaine's View also includes a washing machine and sea view terrace. Stella's Garden features a private Mediterranean garden and terrace.",
  },
  {
    q: 'How do I book an apartment?',
    a: 'You can send a booking inquiry directly through our website. Click "Check Availability & Book" on any apartment, fill in your details, and send via WhatsApp or email. We confirm availability and handle everything from there — no third-party platform needed.',
  },
  {
    q: 'Is there parking available?',
    a: "Yes. Both Elaine's View and Stella's Garden include dedicated parking.",
  },
  {
    q: 'What are the guest ratings for Solar Living apartments?',
    a: "Elaine's View holds a 9.9/10 rating on Booking.com and 5.0/5 on Airbnb. Stella's Garden holds a 9.8/10 on Booking.com and 5.0/5 on Airbnb.",
  },
  {
    q: 'How far are the apartments from the beach?',
    a: "Elaine's View is first row to the sea — there is a city beach directly in front of the building. Stella's Garden is approximately 4–5 minutes by car from the nearest beach.",
  },
  {
    q: 'Can I take day trips from Umag?',
    a: "Absolutely. Umag is ideally located for day trips to Venice (approx. 2 hours), Pula, Rovinj, and the Brijuni Islands. Italy's Aquileia and Trieste are also within easy reach.",
  },
];

const ownerFaqs = [
  {
    q: "What does Solar Living's property management service include?",
    a: 'We offer full-service property management including professional photography, multi-platform listing management (Airbnb, Booking.com, direct), 24/7 guest communication, cleaning and maintenance coordination, dynamic pricing optimization, and monthly performance reporting.',
  },
  {
    q: 'Which areas does Solar Living operate in?',
    a: 'We currently operate in Umag, Istria, Croatia, and are expanding across the Istrian peninsula.',
  },
  {
    q: 'How do I get started with Solar Living as a property owner?',
    a: 'Contact us via WhatsApp or email for a free consultation. We\'ll visit your property, provide recommendations, and agree on terms — with no commitment required.',
  },
  {
    q: 'Is Solar Living a licensed property management company?',
    a: 'Yes. Solar Living operates under BE CAPITAL, obrt za poslovanje nekretninama, vl. Evan Beaković, OIB: 30760238873, registered in Croatia.',
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  return (
    <div className="pl-5 border-l-2" style={{ borderColor: '#edd98f' }}>
      <h3 className="font-sans font-semibold text-sm mb-2 text-white">{q}</h3>
      <p className="font-sans text-sm leading-relaxed" style={{ color: '#c8c8c8' }}>{a}</p>
    </div>
  );
}

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* ─── HERO ─────────────────────────────────────────────────────────── */}
      <section className="py-32 px-6 text-center" style={{ backgroundColor: '#474748' }}>
        <p className="font-sans text-xs uppercase tracking-widest mb-6" style={{ color: '#86cae7' }}>
          Questions &amp; Answers
        </p>
        <h1 className="font-serif text-5xl md:text-6xl leading-tight text-white">
          Everything You Need to Know
        </h1>
      </section>

      {/* ─── GUEST FAQs ───────────────────────────────────────────────────── */}
      <section className="py-24 px-6" style={{ backgroundColor: '#474748' }}>
        <div className="max-w-3xl mx-auto">
          <p className="font-sans text-xs uppercase tracking-widest mb-10" style={{ color: '#86cae7' }}>
            For Guests
          </p>
          <div className="space-y-10">
            {guestFaqs.map((item) => (
              <FaqItem key={item.q} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── OWNER FAQs ───────────────────────────────────────────────────── */}
      <section className="py-24 px-6" style={{ backgroundColor: '#525253' }}>
        <div className="max-w-3xl mx-auto">
          <p className="font-sans text-xs uppercase tracking-widest mb-10" style={{ color: '#86cae7' }}>
            For Property Owners
          </p>
          <div className="space-y-10">
            {ownerFaqs.map((item) => (
              <FaqItem key={item.q} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
