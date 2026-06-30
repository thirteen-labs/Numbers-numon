import { reduceNumber, digitSum } from './reduce';

export function calculatePersonalYear(dob: Date, targetYear: number = new Date().getFullYear()): number {
  const month = dob.getMonth() + 1;
  const day = dob.getDate();
  const yearSum = reduceNumber(targetYear);
  return reduceNumber(month + day + yearSum);
}

export function calculatePersonalMonth(personalYear: number, targetMonth: number = new Date().getMonth() + 1): number {
  return reduceNumber(personalYear + targetMonth);
}

export function calculatePersonalDay(personalMonth: number, targetDay: number = new Date().getDate()): number {
  return reduceNumber(personalMonth + targetDay);
}

export function calculateUniversalYear(targetYear: number = new Date().getFullYear()): number {
  return reduceNumber(targetYear);
}

export function calculateUniversalMonth(targetYear: number = new Date().getFullYear(), targetMonth: number = new Date().getMonth() + 1): number {
  return reduceNumber(reduceNumber(targetYear) + targetMonth);
}

export function calculateUniversalDay(targetYear: number = new Date().getFullYear(), targetMonth: number = new Date().getMonth() + 1, targetDay: number = new Date().getDate()): number {
  return reduceNumber(reduceNumber(targetYear) + targetMonth + targetDay);
}

export function calculatePersonalDayFromDob(dob: Date, date: Date = new Date()): number {
  const personalYear = calculatePersonalYear(dob, date.getFullYear());
  const personalMonth = calculatePersonalMonth(personalYear, date.getMonth() + 1);
  return calculatePersonalDay(personalMonth, date.getDate());
}

export interface PersonalTimeNumbers {
  personalYear: number;
  personalMonth: number;
  personalDay: number;
  universalYear: number;
  universalMonth: number;
  universalDay: number;
}

export function calculateAllPersonalNumbers(dob: Date, now: Date = new Date()): PersonalTimeNumbers {
  const personalYear = calculatePersonalYear(dob, now.getFullYear());
  const personalMonth = calculatePersonalMonth(personalYear, now.getMonth() + 1);
  return {
    personalYear,
    personalMonth,
    personalDay: calculatePersonalDay(personalMonth, now.getDate()),
    universalYear: calculateUniversalYear(now.getFullYear()),
    universalMonth: calculateUniversalMonth(now.getFullYear(), now.getMonth() + 1),
    universalDay: calculateUniversalDay(now.getFullYear(), now.getMonth() + 1, now.getDate()),
  };
}
