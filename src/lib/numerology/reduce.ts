const MASTER_NUMBERS = new Set([11, 22, 33]);

export function reduceNumber(n: number): number {
  if (MASTER_NUMBERS.has(n)) return n;
  if (n < 10) return n;
  const sum = digitSum(n);
  return reduceNumber(sum);
}

export function digitSum(n: number): number {
  return String(Math.abs(n)).split('').reduce((acc, d) => acc + parseInt(d, 10), 0);
}

export function reduceWithMaster(n: number, masterSet: Set<number> = MASTER_NUMBERS): number {
  if (masterSet.has(n)) return n;
  if (n < 10) return n;
  return reduceWithMaster(digitSum(n), masterSet);
}

export function isMasterNumber(n: number): boolean {
  return MASTER_NUMBERS.has(n);
}
