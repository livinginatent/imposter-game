import { Game } from '@/components/game/Game';
import { AboutSection } from '@/components/seo/AboutSection';
import { FAQ, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/data/site';

const STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: SITE_NAME,
      alternateName: ['Imposter Game', 'Imposter Word Game'],
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      applicationCategory: 'GameApplication',
      genre: 'Party game',
      operatingSystem: 'Any (web browser)',
      browserRequirements: 'Requires JavaScript',
      isAccessibleForFree: true,
      numberOfPlayers: { '@type': 'QuantitativeValue', minValue: 3, maxValue: 12 },
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
    {
      '@type': 'FAQPage',
      mainEntity: FAQ.map(({ question, answer }) => ({
        '@type': 'Question',
        name: question,
        acceptedAnswer: { '@type': 'Answer', text: answer },
      })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA).replace(/</g, '\u003c') }}
      />
      <Game>
        <AboutSection />
      </Game>
    </>
  );
}
