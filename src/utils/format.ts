export function padNumber(value: number, width = 2): string {
  return String(value).padStart(width, '0');
}

/** Formats milliseconds as MM:SS, rounding up so the display never shows 00:00 while time remains. */
export function formatClock(ms: number): string {
  const totalSeconds = Math.ceil(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${padNumber(minutes)}:${padNumber(seconds)}`;
}
