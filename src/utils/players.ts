/** Resizes the name list to `playerCount`, keeping existing names and padding with blanks. */
export function resizePlayerNames(names: readonly string[], playerCount: number): string[] {
  return Array.from({ length: playerCount }, (_, index) => names[index] ?? '');
}

/** Display name for a player: their entered name, or "Player N" when left blank. */
export function getPlayerName(names: readonly string[], index: number): string {
  return names[index]?.trim() || `Player ${index + 1}`;
}
