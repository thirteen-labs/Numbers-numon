import { reduceNumber, digitSum, reduceWithMaster, isMasterNumber } from '@/lib/numerology/reduce';

describe('reduceNumber', () => {
  it('reduces single digit to itself', () => {
    expect(reduceNumber(5)).toBe(5);
  });

  it('reduces multi-digit to single digit', () => {
    expect(reduceNumber(38)).toBe(11); // 38 → 11 (master number, stop)
  });

  it('preserves master numbers', () => {
    expect(reduceNumber(11)).toBe(11);
    expect(reduceNumber(22)).toBe(22);
    expect(reduceNumber(33)).toBe(33);
  });

  it('reduces 0 to 0', () => {
    expect(reduceNumber(0)).toBe(0);
  });
});

describe('digitSum', () => {
  it('sums digits of a number', () => {
    expect(digitSum(38)).toBe(11);
  });

  it('returns number for single digit', () => {
    expect(digitSum(5)).toBe(5);
  });
});

describe('isMasterNumber', () => {
  it('identifies 11, 22, 33 as master', () => {
    expect(isMasterNumber(11)).toBe(true);
    expect(isMasterNumber(22)).toBe(true);
    expect(isMasterNumber(33)).toBe(true);
  });

  it('rejects other numbers', () => {
    expect(isMasterNumber(7)).toBe(false);
    expect(isMasterNumber(44)).toBe(false);
  });
});

describe('reduceWithMaster', () => {
  it('preserves master numbers through reduction', () => {
    expect(reduceWithMaster(11)).toBe(11);
    expect(reduceWithMaster(22)).toBe(22);
    expect(reduceWithMaster(33)).toBe(33);
  });

  it('reduces non-master numbers', () => {
    expect(reduceWithMaster(38)).toBe(11); // 38 → 11 (master, preserve)
  });
});
