import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Screen } from '@/components/ui/Screen';
import type { Countdown } from '@/hooks/useCountdown';
import { formatClock } from '@/utils/format';

interface TimerScreenProps {
  readonly countdown: Countdown;
  /** Display name of the randomly chosen player who asks the first question. */
  readonly startingPlayerName: string;
  readonly onEndGame: () => void;
}

export function TimerScreen({ countdown, startingPlayerName, onEndGame }: TimerScreenProps) {
  const { remainingMs, isRunning, toggle } = countdown;
  const isExpired = remainingMs === 0;

  const status = isExpired ? 'Time expired' : isRunning ? 'Running' : 'Paused';

  return (
    <Screen eyebrow="INTERROGATION" title="Question each other">
      <Card className="flex flex-col items-center gap-2 py-6 text-center">
        <span className="text-xs uppercase tracking-[0.3em] text-ink/60">Goes first</span>
        <span className="text-2xl font-semibold tracking-tight break-words text-accent">{startingPlayerName}</span>
      </Card>

      <Card className="flex flex-col items-center gap-4 py-12">
        <span className="text-xs uppercase tracking-[0.3em] text-ink/60">{status}</span>
        <time className="font-mono text-7xl tabular-nums text-accent sm:text-8xl">{formatClock(remainingMs)}</time>
      </Card>

      <div className="mt-auto flex flex-col gap-3">
        <Button variant="accent" disabled={isExpired} onClick={toggle}>
          {isRunning ? 'Pause' : 'Start'}
        </Button>
        <Button variant="outline" onClick={onEndGame}>
          End Game
        </Button>
      </div>
    </Screen>
  );
}
