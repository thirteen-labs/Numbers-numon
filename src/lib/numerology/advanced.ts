import { reduceNumber } from './reduce';
import { sumNameNumbers, getConsonants, getFirstLetter, getLastLetter, getFirstVowel, getFirstConsonant } from './mapping';
import type { PersonInput } from './core';
import { getFullName } from './core';

const KARMIC_DEBT_NUMBERS = new Set([9, 13, 14, 16, 19]);

export function calculateKarmicDebt(person: PersonInput): number[] {
  const fullName = getFullName(person);
  const total = sumNameNumbers(fullName);
  const debts: number[] = [];
  for (const n of [9, 13, 14, 16, 19]) {
    if (total === n || reduceNumber(total) === reduceNumber(n)) {
      debts.push(n);
    }
  }
  return debts;
}

export function calculateKarmicLessons(person: PersonInput): number[] {
  const fullName = getFullName(person);
  const name = fullName.toUpperCase().replace(/[^A-Z]/g, '');
  const letters = new Set(name.split(''));
  const map: Record<string, number> = {
    A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9,
    J: 1, K: 2, L: 3, M: 4, N: 5, O: 6, P: 7, Q: 8, R: 9,
    S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8,
  };
  const presentNumbers = new Set<number>();
  for (const letter of letters) {
    const num = map[letter];
    if (num) presentNumbers.add(num);
  }
  const missing: number[] = [];
  for (let i = 1; i <= 9; i++) {
    if (!presentNumbers.has(i)) missing.push(i);
  }
  return missing;
}

export function calculateHiddenPassion(person: PersonInput): number[] {
  const fullName = getFullName(person);
  const name = fullName.toUpperCase().replace(/[^A-Z]/g, '');
  const map: Record<string, number> = {
    A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9,
    J: 1, K: 2, L: 3, M: 4, N: 5, O: 6, P: 7, Q: 8, R: 9,
    S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8,
  };
  const counts: Record<number, number> = {};
  for (const letter of name) {
    const num = map[letter];
    if (num) counts[num] = (counts[num] ?? 0) + 1;
  }
  const countValues = Object.values(counts);
  if (countValues.length === 0) return [];
  const maxCount = Math.max(...countValues);
  return Object.entries(counts)
    .filter(([, count]) => count === maxCount)
    .map(([num]) => parseInt(num, 10));
}

export function calculateBalance(person: PersonInput): number {
  const fullName = getFullName(person);
  const initialLetters = fullName
    .split(' ')
    .filter(Boolean)
    .map((n) => n.charAt(0))
    .join('');
  const sum = sumNameNumbers(initialLetters);
  return reduceNumber(sum);
}

export function calculateRationalThought(person: PersonInput): number {
  const fullName = getFullName(person);
  const consonants = getConsonants(fullName);
  const sum = sumNameNumbers(consonants) + fullName.replace(/[^A-Za-z]/g, '').length;
  return reduceNumber(sum);
}

export function calculateSubconsciousSelf(person: PersonInput): number {
  const fullName = getFullName(person);
  const name = fullName.toUpperCase().replace(/[^A-Z]/g, '');
  const uniqueLetters = new Set(name.split('')).size;
  return reduceNumber(uniqueLetters);
}

export function calculateCornerstone(person: PersonInput): string {
  return getFirstLetter(getFullName(person));
}

export function calculateCapstone(person: PersonInput): string {
  return getLastLetter(getFullName(person));
}

export function calculateFirstVowel(person: PersonInput): string | null {
  return getFirstVowel(getFullName(person));
}

export function calculateFirstConsonant(person: PersonInput): string | null {
  return getFirstConsonant(getFullName(person));
}

export function hasKarmicDebt(total: number): number | null {
  if (KARMIC_DEBT_NUMBERS.has(total)) return total;
  return null;
}
