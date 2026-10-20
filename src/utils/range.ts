/** Inclusive integer range: createRange(3, 5) -> [3, 4, 5]. */
export function createRange(start: number, end: number): number[] {
  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}
