import { reduceNumber } from './reduce';
import type { CoreNumbers } from './core';

export function calculatePinnacleNumbers(dob: Date): number[] {
  const month = reduceNumber(dob.getMonth() + 1);
  const day = reduceNumber(dob.getDate());
  const year = reduceNumber(dob.getFullYear());
  const firstPinnacle = reduceNumber(month + day);
  const secondPinnacle = reduceNumber(day + year);
  const thirdPinnacle = reduceNumber(firstPinnacle + secondPinnacle);
  const fourthPinnacle = reduceNumber(month + year);
  return [firstPinnacle, secondPinnacle, thirdPinnacle, fourthPinnacle];
}

export function calculatePinnacleAges(lifePath: number): { start: number; end: number }[] {
  const firstEnd = 36 - lifePath;
  if (firstEnd <= 0) return [
    { start: 0, end: 27 },
    { start: 28, end: 54 },
    { start: 55, end: 81 },
    { start: 82, end: 999 },
  ];
  return [
    { start: 0, end: firstEnd },
    { start: firstEnd + 1, end: firstEnd + 27 },
    { start: firstEnd + 28, end: firstEnd + 54 },
    { start: firstEnd + 55, end: 999 },
  ];
}

export function calculateChallengeNumbers(dob: Date): number[] {
  const month = reduceNumber(dob.getMonth() + 1);
  const day = reduceNumber(dob.getDate());
  const year = reduceNumber(dob.getFullYear());
  const firstChallenge = reduceNumber(Math.abs(day - month));
  const secondChallenge = reduceNumber(Math.abs(year - day));
  const thirdChallenge = reduceNumber(Math.abs(firstChallenge - secondChallenge));
  const fourthChallenge = reduceNumber(Math.abs(month - year));
  return [firstChallenge, secondChallenge, thirdChallenge, fourthChallenge];
}

export function calculateChallengeAges(lifePath: number): { start: number; end: number }[] {
  return calculatePinnacleAges(lifePath);
}

export interface PinnacleData {
  number: number;
  ages: { start: number; end: number };
}

export interface ChallengeData {
  number: number;
  ages: { start: number; end: number };
}

export function calculateCycles(core: CoreNumbers, dob: Date): {
  pinnacles: PinnacleData[];
  challenges: ChallengeData[];
} {
  const pinnacleNumbers = calculatePinnacleNumbers(dob);
  const pinnacleAges = calculatePinnacleAges(core.lifePath);
  const challengeNumbers = calculateChallengeNumbers(dob);
  const challengeAges = calculateChallengeAges(core.lifePath);

  return {
    pinnacles: pinnacleNumbers.map((number, i) => ({
      number,
      ages: pinnacleAges[i]!,
    })),
    challenges: challengeNumbers.map((number, i) => ({
      number,
      ages: challengeAges[i]!,
    })),
  };
}
