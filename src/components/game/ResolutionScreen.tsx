import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Screen } from '@/components/ui/Screen';

interface ResolutionScreenProps {
  readonly categoryLabel: string;
  readonly secretWord: string;
  readonly hint: string | null;
  readonly isWordRevealed: boolean;
  readonly onToggleWordReveal: () => void;
  readonly onPlayAgain: () => void;
  readonly onReturnToSetup: () => void;
}

export function ResolutionScreen({
  categoryLabel,
  secretWord,
  hint,
  isWordRevealed,
  onToggleWordReveal,
  onPlayAgain,
  onReturnToSetup,
}: ResolutionScreenProps) {
  return (
    <Screen eyebrow="RESOLUTION" title="Vote now" description="Everyone points at their suspect on three.">
      <div className="flex flex-col gap-3">
        <Card className="flex flex-col items-center gap-2 py-10 text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-ink/60">{categoryLabel}</span>
          <span className="min-h-10 text-3xl font-semibold tracking-tight">
            {isWordRevealed ? secretWord : 'Word hidden'}
          </span>
          <span className="min-h-5 font-mono text-sm uppercase tracking-[0.2em] text-ink/60">
            {isWordRevealed && hint ? `Hint: ${hint}` : ''}
          </span>
        </Card>
        <Button variant="outline" onClick={onToggleWordReveal}>
          {isWordRevealed ? 'Hide Word' : 'Reveal Word'}
        </Button>
      </div>

      <div className="mt-auto flex flex-col gap-3">
        <Button variant="solid" onClick={onPlayAgain}>
          Play Again
        </Button>
        <Button variant="outline" onClick={onReturnToSetup}>
          Change Settings
        </Button>
      </div>
    </Screen>
  );
}
