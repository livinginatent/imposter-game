import { IMPOSTER_LABEL } from '@/data/constants';
import { WORD_CATEGORIES } from '@/data/words';
import { RANDOM_CATEGORY, ROLE, type CategorySelection, type GameConfig, type GameSession } from '@/types/game';
import type { WordCategory } from '@/types/words';
import { buildRoles } from './roles';
import { pickRandom, type RandomSource } from './shuffle';

function resolveCategory(selection: CategorySelection, random: RandomSource): WordCategory {
  if (selection === RANDOM_CATEGORY) {
    return pickRandom(WORD_CATEGORIES, random);
  }

  const category = WORD_CATEGORIES.find((candidate) => candidate.id === selection);

  if (!category) {
    throw new Error(`Unknown category: ${selection}`);
  }

  return category;
}

/**
 * Builds a fresh round. `previousWord` is excluded from the word pool when possible,
 * so "Play Again" never repeats the last word back-to-back.
 */
export function createGameSession(
  config: GameConfig,
  previousWord?: string,
  random: RandomSource = Math.random,
): GameSession {
  const category = resolveCategory(config.categoryId, random);
  const freshWords = category.words.filter(({ word }) => word !== previousWord);
  const { word, hint } = pickRandom(freshWords.length > 0 ? freshWords : category.words, random);

  return {
    categoryLabel: category.label,
    secretWord: word,
    hint: config.isHintEnabled ? hint : null,
    roles: buildRoles(config.playerCount, config.imposterCount, random),
    startingPlayerIndex: Math.floor(random() * config.playerCount),
  };
}

export interface RoleCard {
  readonly label: string;
  readonly title: string;
  readonly detail: string;
}

/**
 * What a player sees while holding the reveal zone. Crew and imposter cards share the same
 * three-line shape, so the layout never hints at the role to anyone glancing over.
 */
export function getRoleCard(session: GameSession, playerIndex: number): RoleCard {
  if (session.roles[playerIndex] === ROLE.IMPOSTER) {
    return {
      label: 'You are the',
      title: IMPOSTER_LABEL,
      detail: session.hint ? `Hint: ${session.hint}` : 'No hint. Blend in.',
    };
  }

  return { label: 'Secret word', title: session.secretWord, detail: session.categoryLabel };
}
