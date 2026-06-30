import { PYTHAGOREAN_MAP } from '@/data/pythagorean';
import { CHALDEAN_MAP } from '@/data/chaldean';

const VOWELS = new Set(['A', 'E', 'I', 'O', 'U']);
const VOWEL_Y_PATTERN = /[aeiou]/i;

export function letterToNumber(letter: string, system: 'pythagorean' | 'chaldean' = 'pythagorean'): number {
  const map = system === 'pythagorean' ? PYTHAGOREAN_MAP : CHALDEAN_MAP;
  return map[letter.toUpperCase()] ?? 0;
}

export function nameToNumbers(name: string, system: 'pythagorean' | 'chaldean' = 'pythagorean'): number[] {
  return name
    .toUpperCase()
    .replace(/[^A-Z]/g, '')
    .split('')
    .map((l) => letterToNumber(l, system))
    .filter((n) => n > 0);
}

export function sumNameNumbers(name: string, system: 'pythagorean' | 'chaldean' = 'pythagorean'): number {
  return nameToNumbers(name, system).reduce((acc, n) => acc + n, 0);
}

export function isVowel(letter: string): boolean {
  const upper = letter.toUpperCase();
  return VOWELS.has(upper);
}

export function isConsonant(letter: string): boolean {
  const upper = letter.toUpperCase();
  return /^[A-Z]$/.test(upper) && !VOWELS.has(upper);
}

export function getVowels(name: string): string {
  return name
    .toUpperCase()
    .replace(/[^A-Z]/g, '')
    .split('')
    .filter(isVowel)
    .join('');
}

export function getConsonants(name: string): string {
  return name
    .toUpperCase()
    .replace(/[^A-Z]/g, '')
    .split('')
    .filter(isConsonant)
    .join('');
}

export function sumVowels(name: string, system: 'pythagorean' | 'chaldean' = 'pythagorean'): number {
  return getVowels(name)
    .split('')
    .reduce((acc, l) => acc + letterToNumber(l, system), 0);
}

export function sumConsonants(name: string, system: 'pythagorean' | 'chaldean' = 'pythagorean'): number {
  return getConsonants(name)
    .split('')
    .reduce((acc, l) => acc + letterToNumber(l, system), 0);
}

export function getFirstLetter(name: string): string {
  return name.replace(/[^A-Za-z]/g, '').charAt(0).toUpperCase();
}

export function getLastLetter(name: string): string {
  const clean = name.replace(/[^A-Za-z]/g, '');
  return clean.charAt(clean.length - 1).toUpperCase();
}

export function getFirstVowel(name: string): string | null {
  const match = name.match(VOWEL_Y_PATTERN);
  return match ? match[0].toUpperCase() : null;
}

export function getFirstConsonant(name: string): string | null {
  for (const char of name) {
    if (/^[A-Za-z]$/.test(char) && !VOWEL_Y_PATTERN.test(char)) {
      return char.toUpperCase();
    }
  }
  return null;
}
