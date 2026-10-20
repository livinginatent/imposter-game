/** Returns a float in [0, 1). Injectable so pure logic can be tested deterministically. */
export type RandomSource = () => number;

/**
 * Fisher-Yates shuffle. Works on a copy, so the input array is never mutated.
 */
export function shuffle<T>(items: readonly T[], random: RandomSource = Math.random): T[] {
  const result = [...items];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

export function pickRandom<T>(items: readonly T[], random: RandomSource = Math.random): T {
  if (items.length === 0) {
    throw new RangeError('pickRandom requires a non-empty array');
  }

  return items[Math.floor(random() * items.length)];
}
