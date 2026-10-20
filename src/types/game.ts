import type { CategoryId } from './words';

export const GAME_PHASE = {
  SETUP: 'SETUP',
  HANDOFF: 'HANDOFF',
  INTERROGATION: 'INTERROGATION',
  RESOLUTION: 'RESOLUTION',
} as const;

export type GamePhase = (typeof GAME_PHASE)[keyof typeof GAME_PHASE];

export const ROLE = {
  CREW: 'CREW',
  IMPOSTER: 'IMPOSTER',
} as const;

export type Role = (typeof ROLE)[keyof typeof ROLE];

export const RANDOM_CATEGORY = 'RANDOM';

export type CategorySelection = CategoryId | typeof RANDOM_CATEGORY;

export interface GameConfig {
  readonly playerCount: number;
  readonly imposterCount: number;
  readonly categoryId: CategorySelection;
  /** When on, imposters see a loosely related clue alongside their role. */
  readonly isHintEnabled: boolean;
}

/** Immutable snapshot of one round: the secret word and the shuffled role deck. */
export interface GameSession {
  readonly categoryLabel: string;
  readonly secretWord: string;
  /** Clue for imposters; null when hints are off. */
  readonly hint: string | null;
  /** roles[i] belongs to player i + 1. */
  readonly roles: readonly Role[];
}

export interface GameEngineState {
  readonly phase: GamePhase;
  readonly config: GameConfig;
  readonly session: GameSession | null;
  readonly currentPlayerIndex: number;
  readonly isWordRevealed: boolean;
}
