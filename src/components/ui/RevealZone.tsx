import type { HTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

export interface RevealZoneProps extends HTMLAttributes<HTMLDivElement> {
  isRevealed: boolean;
}

/**
 * Visual surface for a press-and-hold reveal. Owns no input logic: pass pointer handlers
 * from useHoldToReveal through the spread. Inversion is instant (no transition) by design.
 */
export function RevealZone({ isRevealed, className, children, ...rest }: RevealZoneProps) {
  return (
    <div
      role="button"
      aria-pressed={isRevealed}
      className={cn(
        'flex min-h-72 w-full select-none touch-none items-center justify-center border p-8 text-center transition-none [-webkit-touch-callout:none] [-webkit-user-select:none]',
        isRevealed ? 'border-ink bg-ink text-obsidian' : 'border-accent text-accent',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
