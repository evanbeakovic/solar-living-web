import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Apartments | Solar Living Umag',
  description:
    "Browse Solar Living's curated apartments in Umag, Croatia. Elaine's View — first row to the sea. Stella's Garden — Mediterranean garden in Umag's finest new building.",
  robots: 'index, follow',
  alternates: { canonical: 'https://solarliving.hr/apartments' },
  openGraph: {
    title: 'Our Apartments | Solar Living Umag',
    description:
      "Browse Solar Living's curated apartments in Umag, Croatia. Elaine's View — first row to the sea. Stella's Garden — Mediterranean garden in Umag's finest new building.",
    url: 'https://solarliving.hr/apartments',
    siteName: 'Solar Living',
    type: 'website',
    images: [{ url: 'https://solarliving.hr/images/umag-1-main.jpg' }],
  },
  twitter: { card: 'summary_large_image' },
};

const apartmentsJsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Apartment',
    name: "Elaine's View",
    description:
      'First row to the sea. Panoramic views of the Adriatic, sunsets and Umag Old Town. 3 bedrooms, 6 guests, terrace and balcony.',
    url: 'https://solarliving.hr/apartments',
    image: 'https://solarliving.hr/images/umag-1-main.jpg',
    numberOfRooms: 3,
    occupancy: { '@type': 'QuantitativeValue', maxValue: 6 },
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: 'Sea view', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Terrace', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Air conditioning', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Wi-Fi', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Parking', value: true },
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Ul. 8. ožujka 1A',
      addressLocality: 'Umag',
      addressCountry: 'HR',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '9.9',
      bestRating: '10',
      reviewCount: '8',
    },
    review: [
      { '@type': 'Review', author: { '@type': 'Person', name: 'Tania' }, reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' }, reviewBody: 'The apartment was clean and comfortable with balcony views of evening sunsets over the Adriatic and the old town of Umag. Umag is a perfect spot to enjoy Istria including day trips into Italy.' },
      { '@type': 'Review', author: { '@type': 'Person', name: 'Jana' }, reviewRating: { '@type': 'Rating', ratingValue: '10', bestRating: '10' }, reviewBody: 'Perfect accommodation. A premium apartment with a stunning sea view. Right in front of the building is a city beach with easy sea access and very few people. Very friendly and professional communication with the host. We will definitely return.' },
      { '@type': 'Review', author: { '@type': 'Person', name: 'Stephan' }, reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' }, reviewBody: 'We were received very kindly and personally. A big well laid out apartment overlooking the sea. There is a balcony to the sea side but also to the side which is very practical. We found it very quiet.' },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Apartment',
    name: "Stella's Garden",
    description:
      "Ground-floor apartment in Umag's finest new building with private Mediterranean garden and terrace. 2 bedrooms, 6 guests.",
    url: 'https://solarliving.hr/apartments',
    image: 'https://solarliving.hr/images/umag-2-main.jpg',
    numberOfRooms: 2,
    occupancy: { '@type': 'QuantitativeValue', maxValue: 6 },
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: 'Garden', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Terrace', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Air conditioning', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Wi-Fi', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Parking', value: true },
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Ulica 154. brigada HV 7',
      addressLocality: 'Umag',
      addressCountry: 'HR',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '9.8',
      bestRating: '10',
      reviewCount: '9',
    },
    review: [
      { '@type': 'Review', author: { '@type': 'Person', name: 'Peter' }, reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' }, reviewBody: 'Everything was sparkling clean and very modern, you almost felt like we were the first guests. Extremely friendly host, always immediately available for questions with very quick answers.' },
      { '@type': 'Review', author: { '@type': 'Person', name: 'Jehona' }, reviewRating: { '@type': 'Rating', ratingValue: '10', bestRating: '10' }, reviewBody: 'Everything is excellent, better than a 5-star hotel. I recommend it to everyone. I have never seen something like this. The owner was very kind and showed us everything.' },
      { '@type': 'Review', author: { '@type': 'Person', name: 'Maciej' }, reviewRating: { '@type': 'Rating', ratingValue: '9', bestRating: '10' }, reviewBody: 'Highly recommended. Spacious ground-floor apartment with comfortable beds, a well-equipped kitchen, air conditioning, and two bathrooms. Large terrace with assigned parking. 2 minutes by car to shopping centers, 4-5 minutes to the nearest beach.' },
    ],
  },
];

export default function ApartmentsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(apartmentsJsonLd) }}
      />
      {children}
    </>
  );
}
