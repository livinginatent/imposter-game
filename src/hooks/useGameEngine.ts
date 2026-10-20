import { useCallback, useReducer } from 'react';
import { INTERROGATION_DURATION_MS } from '@/data/constants';
import type { CategorySelection } from '@/types/game';
import { createInitialState, gameReducer } from '@/utils/gameReducer';
import { getMaxImposters } from '@/utils/roles';
import { createGameSession } from '@/utils/session';
import { useCountdown } from './useCountdown';

/**
 * Owns the whole game lifecycle. The UI reads `phase` and calls `actions`;
 * it never dispatches directly and never generates randomness itself.
 */
export function useGameEngine() {
  const [state, dispatch] = useReducer(gameReducer, undefined, createInitialState);

  const handleTimerComplete = useCallback(() => dispatch({ type: 'END_GAME' }), []);

  const countdown = useCountdown({
    durationMs: INTERROGATION_DURATION_MS,
    onComplete: handleTimerComplete,
  });

  const { reset: resetTimer } = countdown;

  const setPlayerCount = useCallback(
    (playerCount: number) => dispatch({ type: 'SET_PLAYER_COUNT', playerCount }),
    [],
  );

  const setImposterCount = useCallback(
    (imposterCount: number) => dispatch({ type: 'SET_IMPOSTER_COUNT', imposterCount }),
    [],
  );

  const setCategory = useCallback(
    (categoryId: CategorySelection) => dispatch({ type: 'SET_CATEGORY', categoryId }),
    [],
  );

  const setHintEnabled = useCallback(
    (isHintEnabled: boolean) => dispatch({ type: 'SET_HINT_ENABLED', isHintEnabled }),
    [],
  );

  const startGame = useCallback(() => {
    dispatch({ type: 'BEGIN_HANDOFF', session: createGameSession(state.config) });
    resetTimer();
  }, [state.config, resetTimer]);

  const playAgain = useCallback(() => {
    dispatch({
      type: 'BEGIN_HANDOFF',
      session: createGameSession(state.config, state.session?.secretWord),
    });
    resetTimer();
  }, [state.config, state.session, resetTimer]);

  const advancePlayer = useCallback(() => dispatch({ type: 'ADVANCE_PLAYER' }), []);

  // Stops the clock before transitioning so a paused-or-running timer cannot fire later.
  const endGame = useCallback(() => {
    resetTimer();
    dispatch({ type: 'END_GAME' });
  }, [resetTimer]);

  const toggleWordReveal = useCallback(() => dispatch({ type: 'TOGGLE_WORD_REVEAL' }), []);

  const returnToSetup = useCallback(() => {
    resetTimer();
    dispatch({ type: 'RETURN_TO_SETUP' });
  }, [resetTimer]);

  return {
    phase: state.phase,
    config: state.config,
    session: state.session,
    currentPlayerIndex: state.currentPlayerIndex,
    isWordRevealed: state.isWordRevealed,
    maxImposters: getMaxImposters(state.config.playerCount),
    countdown,
    actions: {
      setPlayerCount,
      setImposterCount,
      setCategory,
      setHintEnabled,
      startGame,
      playAgain,
      advancePlayer,
      endGame,
      toggleWordReveal,
      returnToSetup,
    },
  };
}
