import { ROLE, type Role } from '@/types/game';
import { shuffle, type RandomSource } from './shuffle';

/** Keeps crew in the majority: at most floor((players - 1) / 2) imposters, never below 1. */
export function getMaxImposters(playerCount: number): number {
  return Math.max(1, Math.floor((playerCount - 1) / 2));
}

export function buildRoles(
  playerCount: number,
  imposterCount: number,
  random: RandomSource = Math.random,
): Role[] {
  if (imposterCount < 1 || imposterCount >= playerCount) {
    throw new RangeError(`Invalid imposter count ${imposterCount} for ${playerCount} players`);
  }

  const crew = Array.from({ length: playerCount - imposterCount }, () => ROLE.CREW);
  const imposters = Array.from({ length: imposterCount }, () => ROLE.IMPOSTER);

  return shuffle([...crew, ...imposters], random);
}
