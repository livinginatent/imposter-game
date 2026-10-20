'use client';

import type { ReactNode } from 'react';
import { useGameEngine } from '@/hooks/useGameEngine';
import { GAME_PHASE } from '@/types/game';
import { HandoffScreen } from './HandoffScreen';
import { ResolutionScreen } from './ResolutionScreen';
import { SetupForm } from './SetupForm';
import { TimerScreen } from './TimerScreen';

interface GameProps {
  /** Shown below the setup screen only, so it never distracts during a round. */
  readonly children?: ReactNode;
}

/** Maps engine phase to a view. No game logic lives here. */
export function Game({ children }: GameProps) {
  const engine = useGameEngine();
  const { actions } = engine;

  switch (engine.phase) {
    case GAME_PHASE.SETUP:
      return (
        <>
          <SetupForm
            config={engine.config}
            maxImposters={engine.maxImposters}
            onPlayerCountChange={actions.setPlayerCount}
            onImposterCountChange={actions.setImposterCount}
            onCategoryChange={actions.setCategory}
            onHintChange={actions.setHintEnabled}
            onStart={actions.startGame}
          />
          {children}
        </>
      );

    case GAME_PHASE.HANDOFF:
      if (!engine.session) return null;

      return (
        <HandoffScreen
          key={engine.currentPlayerIndex}
          session={engine.session}
          playerIndex={engine.currentPlayerIndex}
          playerCount={engine.config.playerCount}
          onAdvance={actions.advancePlayer}
        />
      );

    case GAME_PHASE.INTERROGATION:
      return <TimerScreen countdown={engine.countdown} onEndGame={actions.endGame} />;

    case GAME_PHASE.RESOLUTION:
      if (!engine.session) return null;

      return (
        <ResolutionScreen
          categoryLabel={engine.session.categoryLabel}
          secretWord={engine.session.secretWord}
          hint={engine.session.hint}
          isWordRevealed={engine.isWordRevealed}
          onToggleWordReveal={actions.toggleWordReveal}
          onPlayAgain={actions.playAgain}
          onReturnToSetup={actions.returnToSetup}
        />
      );
  }
}
