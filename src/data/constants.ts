export const PLAYER_COUNT = {
  MIN: 3,
  MAX: 12,
  DEFAULT: 4,
} as const;

export const IMPOSTER_COUNT = {
  MIN: 1,
  DEFAULT: 1,
} as const;

export const INTERROGATION_DURATION_MS = 5 * 60 * 1000;

export const NEXT_PLAYER_COOLDOWN_MS = 1000;

export const TIMER_TICK_MS = 250;

export const REVEAL_VIBRATION_PATTERN: number[] = [50];

export const IMPOSTER_LABEL = 'IMPOSTER';

export const PLAYER_NAME_MAX_LENGTH = 20;
