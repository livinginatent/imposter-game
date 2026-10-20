import { Button } from '@/components/ui/Button';
import { NEXT_PLAYER_COOLDOWN_MS } from '@/data/constants';
import { useCooldown } from '@/hooks/useCooldown';

interface NextPlayerButtonProps {
  readonly label: string;
  readonly onClick: () => void;
}

/**
 * Anti-cheat gate: stays disabled for NEXT_PLAYER_COOLDOWN_MS after mount, which blocks accidental
 * double-taps. Mount it with a fresh `key` per reveal to restart the cooldown.
 */
export function NextPlayerButton({ label, onClick }: NextPlayerButtonProps) {
  const isReady = useCooldown(NEXT_PLAYER_COOLDOWN_MS);

  return (
    <Button variant="solid" disabled={!isReady} onClick={onClick}>
      {label}
    </Button>
  );
}
