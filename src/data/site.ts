/** Canonical origin. Set NEXT_PUBLIC_SITE_URL in the deploy environment to the production domain. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').replace(/\/$/, '');

export const SITE_NAME = 'Imposter';

export const SITE_TITLE = 'Play Imposter Online Free – No Download, One Phone';

export const SITE_DESCRIPTION =
  'Play Imposter, the party word game, free in your browser. No app download, no sign-up. Pass one phone around, find the imposter, and vote. 3–12 players.';

export const BRAND_COLOR = '#0f0f13';

export const ACCENT_COLOR = '#22d3ee';

export interface FaqEntry {
  readonly question: string;
  readonly answer: string;
}

/** Rendered on the page and mirrored into FAQPage structured data, so the two never drift. */
export const FAQ: readonly FaqEntry[] = [
  {
    question: 'Is Imposter free to play?',
    answer: 'Yes. Imposter is completely free, with no in-app purchases and no account to create.',
  },
  {
    question: 'Do I need to download an app?',
    answer:
      'No. Imposter runs in any phone, tablet, or laptop browser. Open the page and start a game in seconds. You can add it to your home screen if you want one-tap access.',
  },
  {
    question: 'How many players do you need?',
    answer: 'You need 3 to 12 players and a single device. Up to 5 players can be imposters, depending on group size.',
  },
  {
    question: 'What is the imposter hint?',
    answer:
      'With hints on, each imposter sees a loosely related clue, such as "Coast" for Lighthouse. It gives them a fighting chance to blend in without giving the word away. Turn it off for a harder game.',
  },
  {
    question: 'Does it work offline?',
    answer:
      'Once the page has loaded, a round needs no connection. Everything happens on the one device you pass around.',
  },
];

export const HOW_TO_PLAY: readonly string[] = [
  'Pick the number of players, imposters, and a word category.',
  'Pass the phone around. Each player presses and holds to see their secret word privately.',
  'Imposters see "IMPOSTER" instead of the word, plus an optional hint.',
  'Take turns asking each other questions about the word for up to five minutes.',
  'Vote on who you think the imposter is, then reveal the word.',
];
