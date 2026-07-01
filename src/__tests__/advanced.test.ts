import {
  calculatePersonalYear, calculatePersonalMonth, calculatePersonalDay,
  calculateUniversalYear, calculateAllPersonalNumbers,
} from '@/lib/numerology/personal';
import {
  calculateKarmicDebt, calculateKarmicLessons, calculateHiddenPassion,
  calculateBalance,
} from '@/lib/numerology/advanced';
import { calculatePinnacleNumbers, calculatePinnacleAges, calculateChallengeNumbers } from '@/lib/numerology/cycles';
import type { PersonInput } from '@/lib/numerology/core';

const testPerson: PersonInput = {
  firstName: 'John',
  middleName: 'Michael',
  lastName: 'Doe',
  dateOfBirth: new Date(1990, 5, 15),
};

describe('personal year/month/day', () => {
  it('calculates personal year for 2026', () => {
    const py = calculatePersonalYear(testPerson.dateOfBirth, 2026);
    expect(py).toBeGreaterThanOrEqual(1);
    expect(py).toBeLessThanOrEqual(22); // can be master number 11 or 22
  });

  it('calculates personal month', () => {
    const pm = calculatePersonalMonth(4, 6);
    expect(pm).toBeGreaterThanOrEqual(1);
  });

  it('calculates personal day', () => {
    const pd = calculatePersonalDay(5, 15);
    expect(pd).toBeGreaterThanOrEqual(1);
  });

  it('calculates all personal numbers', () => {
    const all = calculateAllPersonalNumbers(testPerson.dateOfBirth, new Date(2026, 5, 15));
    expect(all.personalYear).toBeDefined();
    expect(all.personalMonth).toBeDefined();
    expect(all.personalDay).toBeDefined();
    expect(all.universalYear).toBeDefined();
    expect(all.universalMonth).toBeDefined();
    expect(all.universalDay).toBeDefined();
  });
});

describe('universal year', () => {
  it('calculates universal year', () => {
    expect(calculateUniversalYear(2026)).toBe(1); // 2+0+2+6 = 10 => 1
  });
});

describe('cycles', () => {
  const testDob = new Date(1990, 5, 15);

  it('calculates pinnacle numbers', () => {
    const pinnacles = calculatePinnacleNumbers(testDob);
    expect(pinnacles).toHaveLength(4);
  });

  it('calculates pinnacle ages', () => {
    const ages = calculatePinnacleAges(7);
    expect(ages).toHaveLength(4);
    expect(ages[0]!.start).toBe(0);
  });

  it('calculates challenge numbers', () => {
    const challenges = calculateChallengeNumbers(testDob);
    expect(challenges).toHaveLength(4);
  });
});

describe('advanced numbers', () => {
  it('detects karmic debt', () => {
    const debts = calculateKarmicDebt(testPerson);
    expect(Array.isArray(debts)).toBe(true);
  });

  it('calculates karmic lessons', () => {
    const lessons = calculateKarmicLessons(testPerson);
    expect(lessons.length).toBeGreaterThanOrEqual(0);
    expect(lessons.length).toBeLessThanOrEqual(9);
  });

  it('calculates hidden passion', () => {
    const passions = calculateHiddenPassion(testPerson);
    expect(passions.length).toBeGreaterThanOrEqual(1);
  });

  it('calculates balance number', () => {
    const balance = calculateBalance(testPerson);
    expect(balance).toBeGreaterThanOrEqual(1);
    expect(balance).toBeLessThanOrEqual(9);
  });
});
