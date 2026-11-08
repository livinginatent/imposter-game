import { IMPOSTER_COUNT, PLAYER_COUNT, PLAYER_NAME_MAX_LENGTH } from '@/data/constants';
import {
  GAME_PHASE,
  RANDOM_CATEGORY,
  type CategorySelection,
  type GameEngineState,
  type GamePhase,
  type GameSession,
} from '@/types/game';
import { resizePlayerNames } from './players';
import { getMaxImposters } from './roles';

export type GameAction =
  | { type: 'SET_PLAYER_COUNT'; playerCount: number }
  | { type: 'SET_IMPOSTER_COUNT'; imposterCount: number }
  | { type: 'SET_CATEGORY'; categoryId: CategorySelection }
  | { type: 'SET_HINT_ENABLED'; isHintEnabled: boolean }
  | { type: 'SET_PLAYER_NAME'; index: number; name: string }
  | { type: 'BEGIN_HANDOFF'; session: GameSession }
  | { type: 'ADVANCE_PLAYER' }
  | { type: 'END_GAME' }
  | { type: 'TOGGLE_WORD_REVEAL' }
  | { type: 'RETURN_TO_SETUP' };

export function createInitialState(): GameEngineState {
  return {
    phase: GAME_PHASE.SETUP,
    config: {
      playerCount: PLAYER_COUNT.DEFAULT,
      imposterCount: IMPOSTER_COUNT.DEFAULT,
      categoryId: RANDOM_CATEGORY,
      isHintEnabled: true,
      playerNames: resizePlayerNames([], PLAYER_COUNT.DEFAULT),
    },
    session: null,
    currentPlayerIndex: 0,
    isWordRevealed: false,
  };
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function isInPhase(state: GameEngineState, ...phases: GamePhase[]): boolean {
  return phases.includes(state.phase);
}

/**
 * Pure state machine: SETUP -> HANDOFF -> INTERROGATION -> RESOLUTION.
 * Every transition returns a new object and ignores actions that are illegal in the current phase.
 * Randomness is injected upstream (createGameSession), keeping this function deterministic.
 */
export function gameReducer(state: GameEngineState, action: GameAction): GameEngineState {
  switch (action.type) {
    case 'SET_PLAYER_COUNT': {
      if (!isInPhase(state, GAME_PHASE.SETUP)) return state;

      const playerCount = clamp(action.playerCount, PLAYER_COUNT.MIN, PLAYER_COUNT.MAX);
      const imposterCount = clamp(
        state.config.imposterCount,
        IMPOSTER_COUNT.MIN,
        getMaxImposters(playerCount),
      );

      const playerNames = resizePlayerNames(state.config.playerNames, playerCount);

      return { ...state, config: { ...state.config, playerCount, imposterCount, playerNames } };
    }

    case 'SET_IMPOSTER_COUNT': {
      if (!isInPhase(state, GAME_PHASE.SETUP)) return state;

      const imposterCount = clamp(
        action.imposterCount,
        IMPOSTER_COUNT.MIN,
        getMaxImposters(state.config.playerCount),
      );

      return { ...state, config: { ...state.config, imposterCount } };
    }

    case 'SET_CATEGORY': {
      if (!isInPhase(state, GAME_PHASE.SETUP)) return state;

      return { ...state, config: { ...state.config, categoryId: action.categoryId } };
    }

    case 'SET_HINT_ENABLED': {
      if (!isInPhase(state, GAME_PHASE.SETUP)) return state;

      return { ...state, config: { ...state.config, isHintEnabled: action.isHintEnabled } };
    }

    case 'SET_PLAYER_NAME': {
      if (!isInPhase(state, GAME_PHASE.SETUP)) return state;
      if (action.index < 0 || action.index >= state.config.playerCount) return state;

      const playerNames = state.config.playerNames.map((name, index) =>
        index === action.index ? action.name.slice(0, PLAYER_NAME_MAX_LENGTH) : name,
      );

      return { ...state, config: { ...state.config, playerNames } };
    }

    case 'BEGIN_HANDOFF': {
      if (!isInPhase(state, GAME_PHASE.SETUP, GAME_PHASE.RESOLUTION)) return state;

      return {
        ...state,
        phase: GAME_PHASE.HANDOFF,
        session: action.session,
        currentPlayerIndex: 0,
        isWordRevealed: false,
      };
    }

    case 'ADVANCE_PLAYER': {
      if (!isInPhase(state, GAME_PHASE.HANDOFF) || !state.session) return state;

      const nextIndex = state.currentPlayerIndex + 1;
      const isLastPlayer = nextIndex >= state.session.roles.length;

      if (isLastPlayer) {
        return { ...state, phase: GAME_PHASE.INTERROGATION };
      }

      return { ...state, currentPlayerIndex: nextIndex };
    }

    case 'END_GAME': {
      if (!isInPhase(state, GAME_PHASE.INTERROGATION)) return state;

      return { ...state, phase: GAME_PHASE.RESOLUTION };
    }

    case 'TOGGLE_WORD_REVEAL': {
      if (!isInPhase(state, GAME_PHASE.RESOLUTION)) return state;

      return { ...state, isWordRevealed: !state.isWordRevealed };
    }

    case 'RETURN_TO_SETUP': {
      if (!isInPhase(state, GAME_PHASE.RESOLUTION, GAME_PHASE.INTERROGATION)) return state;

      return { ...state, phase: GAME_PHASE.SETUP, session: null, currentPlayerIndex: 0, isWordRevealed: false };
    }
  }
}
