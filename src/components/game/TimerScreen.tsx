import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Screen } from '@/components/ui/Screen';
import type { Countdown } from '@/hooks/useCountdown';
import { formatClock } from '@/utils/format';

interface TimerScreenProps {
  readonly countdown: Countdown;
  readonly onEndGame: () => void;
}

export function TimerScreen({ countdown, onEndGame }: TimerScreenProps) {
  const { remainingMs, isRunning, toggle } = countdown;
  const isExpired = remainingMs === 0;

  const status = isExpired ? 'Time expired' : isRunning ? 'Running' : 'Paused';

  return (
    <Screen eyebrow="INTERROGATION" title="Question each other">
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
