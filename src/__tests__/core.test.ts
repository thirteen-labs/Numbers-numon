import {
  calculateLifePath, calculateExpression, calculateSoulUrge,
  calculatePersonality, calculateBirthday, calculateAttitude,
  calculateAllCoreNumbers,
} from '@/lib/numerology/core';
import type { PersonInput } from '@/lib/numerology/core';

const testPerson: PersonInput = {
  firstName: 'John',
  middleName: 'Michael',
  lastName: 'Doe',
  dateOfBirth: new Date(1990, 5, 15),
};

const singleNamePerson: PersonInput = {
  firstName: 'Anna',
  lastName: 'Bell',
  dateOfBirth: new Date(2000, 0, 1),
};

describe('calculateLifePath', () => {
  it('calculates life path from DOB', () => {
    // 1990-06-15 => month=6, day=15, year=1990
    // 6 + 1+5 + 1+9+9+0 = 6+6+19 = 31 => 4
    expect(calculateLifePath(testPerson.dateOfBirth)).toBe(4);
  });

  it('handles single-digit month/day', () => {
    expect(calculateLifePath(singleNamePerson.dateOfBirth)).toBe(4); // 1+1+2+0+0+0 = 4
  });
});

describe('calculateExpression', () => {
  it('calculates expression from full name', () => {
    const exp = calculateExpression(testPerson);
    expect(exp).toBeGreaterThanOrEqual(1);
    expect(exp).toBeLessThanOrEqual(33);
  });
});

describe('calculateSoulUrge', () => {
  it('calculates soul urge from vowels', () => {
    const su = calculateSoulUrge(testPerson);
    expect(su).toBeGreaterThanOrEqual(1);
  });
});

describe('calculatePersonality', () => {
  it('calculates personality from consonants', () => {
    const pers = calculatePersonality(testPerson);
    expect(pers).toBeGreaterThanOrEqual(1);
  });
});

describe('calculateBirthday', () => {
  it('reduces day of month', () => {
    expect(calculateBirthday(new Date(1990, 5, 15))).toBe(6); // 1+5
    expect(calculateBirthday(new Date(1990, 5, 7))).toBe(7);
  });
});

describe('calculateAttitude', () => {
  it('reduces month + day', () => {
    // June (6) + 15 = 21 => 3
    expect(calculateAttitude(testPerson.dateOfBirth)).toBe(3);
  });
});

describe('calculateAllCoreNumbers', () => {
  it('returns all 7 core numbers', () => {
    const result = calculateAllCoreNumbers(testPerson);
    expect(result.lifePath).toBeDefined();
    expect(result.expression).toBeDefined();
    expect(result.soulUrge).toBeDefined();
    expect(result.personality).toBeDefined();
    expect(result.birthday).toBeDefined();
    expect(result.attitude).toBeDefined();
    expect(result.maturity).toBeDefined();
  });
});
