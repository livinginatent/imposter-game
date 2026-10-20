/** Fires haptic feedback when the Vibration API exists. Silently no-ops elsewhere (iOS Safari, desktop). */
export function vibrate(pattern: number | number[]): boolean {
  if (typeof navigator === 'undefined' || typeof navigator.vibrate !== 'function') {
    return false;
  }

  return navigator.vibrate(pattern);
}
