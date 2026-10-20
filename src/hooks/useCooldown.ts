import { useEffect, useState } from 'react';

/**
 * Returns false for `durationMs` after mount, then true.
 * Mount-based by design: remount the consuming component (via `key`) to restart the cooldown.
 */
export function useCooldown(durationMs: number): boolean {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => setIsReady(true), durationMs);
    return () => window.clearTimeout(timeoutId);
  }, [durationMs]);

  return isReady;
}
