import { reduceNumber } from './reduce';
import { sumNameNumbers, sumVowels, sumConsonants } from './mapping';

export interface PersonInput {
  firstName: string;
  lastName: string;
  middleName?: string;
  dateOfBirth: Date;
}

export function getFullName(person: PersonInput): string {
  return [person.firstName, person.middleName, person.lastName]
    .filter(Boolean)
    .join(' ');
}

export function calculateLifePath(dob: Date): number {
  const month = dob.getMonth() + 1;
  const day = dob.getDate();
  const year = dob.getFullYear();
  const monthSum = reduceNumber(month);
  const daySum = reduceNumber(day);
  const yearSum = reduceNumber(year);
  return reduceNumber(monthSum + daySum + yearSum);
}

export function calculateExpression(person: PersonInput): number {
  const fullName = getFullName(person);
  const total = sumNameNumbers(fullName);
  return reduceNumber(total);
}

export function calculateSoulUrge(person: PersonInput): number {
  const fullName = getFullName(person);
  const vowelSum = sumVowels(fullName);
  return reduceNumber(vowelSum);
}

export function calculatePersonality(person: PersonInput): number {
  const fullName = getFullName(person);
  const consonantSum = sumConsonants(fullName);
  return reduceNumber(consonantSum);
}

export function calculateBirthday(dob: Date): number {
  return reduceNumber(dob.getDate());
}

export function calculateAttitude(dob: Date): number {
  const month = dob.getMonth() + 1;
  const day = dob.getDate();
  return reduceNumber(month + day);
}

export function calculateMaturity(lifePath: number, expression: number): number {
  return reduceNumber(lifePath + expression);
}

export interface CoreNumbers {
  lifePath: number;
  expression: number;
  soulUrge: number;
  personality: number;
  birthday: number;
  attitude: number;
  maturity: number;
}

export function calculateAllCoreNumbers(person: PersonInput): CoreNumbers {
  const lifePath = calculateLifePath(person.dateOfBirth);
  const expression = calculateExpression(person);
  return {
    lifePath,
    expression,
    soulUrge: calculateSoulUrge(person),
    personality: calculatePersonality(person),
    birthday: calculateBirthday(person.dateOfBirth),
    attitude: calculateAttitude(person.dateOfBirth),
    maturity: calculateMaturity(lifePath, expression),
  };
}
