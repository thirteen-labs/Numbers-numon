import { reduceNumber, digitSum } from './reduce';
import { sumNameNumbers, getVowels, getConsonants } from './mapping';
import type { PersonInput, CoreNumbers } from './core';
import { getFullName } from './core';

export function calculatePinnacleNumbers(core: CoreNumbers): number[] {
  const lp = core.lifePath;
  const month = digitSum(lp);
  const day = digitSum(lp * 2);
  const year = digitSum(lp * 3);
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

export function calculateChallengeNumbers(core: CoreNumbers): number[] {
  const lp = core.lifePath;
  const firstChallenge = reduceNumber(digitSum(lp));
  const secondChallenge = reduceNumber(digitSum(lp * 2));
  const thirdChallenge = reduceNumber(Math.abs(firstChallenge - secondChallenge));
  const fourthChallenge = reduceNumber(digitSum(lp * 3));
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

export function calculateCycles(core: CoreNumbers): {
  pinnacles: PinnacleData[];
  challenges: ChallengeData[];
} {
  const pinnacleNumbers = calculatePinnacleNumbers(core);
  const pinnacleAges = calculatePinnacleAges(core.lifePath);
  const challengeNumbers = calculateChallengeNumbers(core);
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
