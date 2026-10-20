import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { RevealZone } from '@/components/ui/RevealZone';
import { Screen } from '@/components/ui/Screen';
import { REVEAL_VIBRATION_PATTERN } from '@/data/constants';
import { useHoldToReveal } from '@/hooks/useHoldToReveal';
import type { GameSession } from '@/types/game';
import { padNumber } from '@/utils/format';
import { getRoleCard } from '@/utils/session';
import { vibrate } from '@/utils/vibrate';
import { NextPlayerButton } from './NextPlayerButton';

interface HandoffScreenProps {
  readonly session: GameSession;
  readonly playerIndex: number;
  readonly playerCount: number;
  readonly onAdvance: () => void;
}

/**
 * Rendered with `key={playerIndex}` by the parent, so per-player state (release count)
 * resets automatically for every player.
 */
export function HandoffScreen({ session, playerIndex, playerCount, onAdvance }: HandoffScreenProps) {
  const [releaseCount, setReleaseCount] = useState(0);

  const { isHeld, handlers } = useHoldToReveal({
    onHoldStart: () => vibrate(REVEAL_VIBRATION_PATTERN),
    onHoldEnd: () => setReleaseCount((count) => count + 1),
  });

  const playerNumber = playerIndex + 1;
  const isLastPlayer = playerNumber === playerCount;
  const hasRevealed = releaseCount > 0;
  const roleCard = getRoleCard(session, playerIndex);

  return (
    <Screen
      eyebrow={`Player ${padNumber(playerNumber)} / ${padNumber(playerCount)}`}
      title={
        <>
          Pass device to Player <span className="font-mono">{playerNumber}</span>
        </>
      }
    >
      <RevealZone isRevealed={isHeld} className="flex-1" {...handlers}>
        {isHeld ? (
          <span className="flex flex-col items-center gap-4">
            <span className="text-xs uppercase tracking-[0.3em] opacity-60">{roleCard.label}</span>
            <span className="text-4xl font-semibold tracking-tight break-words sm:text-5xl">{roleCard.title}</span>
            <span className="font-mono text-sm uppercase tracking-[0.2em]">{roleCard.detail}</span>
          </span>
        ) : (
          <span className="text-sm uppercase tracking-[0.3em] text-balance">Press and hold to reveal</span>
        )}
      </RevealZone>

      <div className="flex flex-col gap-3">
        <p className="min-h-4 text-center text-xs uppercase tracking-[0.2em] text-ink/60">
          {hasRevealed && !isHeld ? 'Role hidden. Hand over the device.' : 'Keep the screen private.'}
        </p>

        {!isHeld && hasRevealed ? (
          <NextPlayerButton
            key={releaseCount}
            label={isLastPlayer ? 'Begin Interrogation' : 'Next Player'}
            onClick={onAdvance}
          />
        ) : (
          // Holds the button's height so the reveal zone never resizes mid-hold.
          <Button aria-hidden tabIndex={-1} className="invisible">
            &nbsp;
          </Button>
        )}
      </div>
    </Screen>
  );
}
