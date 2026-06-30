import {
  letterToNumber, nameToNumbers, sumNameNumbers,
  isVowel, isConsonant, getVowels, getConsonants,
  getFirstLetter, getLastLetter, getFirstVowel, getFirstConsonant,
} from '@/lib/numerology/mapping';

describe('letterToNumber', () => {
  it('converts A to 1', () => {
    expect(letterToNumber('A')).toBe(1);
  });

  it('converts Z to 8', () => {
    expect(letterToNumber('Z')).toBe(8);
  });

  it('handles lowercase', () => {
    expect(letterToNumber('a')).toBe(1);
  });

  it('returns 0 for non-letters', () => {
    expect(letterToNumber('1')).toBe(0);
    expect(letterToNumber('-')).toBe(0);
  });
});

describe('sumNameNumbers', () => {
  it('sums numbers for a name', () => {
    expect(sumNameNumbers('ABC')).toBe(6); // 1 + 2 + 3
  });

  it('ignores spaces', () => {
    expect(sumNameNumbers('A B C')).toBe(6);
  });
});

describe('vowel/consonant detection', () => {
  it('identifies vowels', () => {
    expect(isVowel('A')).toBe(true);
    expect(isVowel('E')).toBe(true);
    expect(isVowel('B')).toBe(false);
  });

  it('identifies consonants', () => {
    expect(isConsonant('B')).toBe(true);
    expect(isConsonant('A')).toBe(false);
  });

  it('extracts vowels from name', () => {
    expect(getVowels('John Doe')).toBe('O' + 'OE');
  });

  it('extracts consonants from name', () => {
    expect(getConsonants('John Doe')).toBe('JHN' + 'D');
  });
});

describe('first/last letter', () => {
  it('gets first letter ignoring non-alpha', () => {
    expect(getFirstLetter('John')).toBe('J');
  });

  it('gets last letter', () => {
    expect(getLastLetter('John')).toBe('N');
  });
});

describe('first vowel/consonant', () => {
  it('gets first vowel', () => {
    expect(getFirstVowel('John')).toBe('O');
  });

  it('gets first consonant', () => {
    expect(getFirstConsonant('John')).toBe('J');
  });

  it('returns null for vowels on empty/no-match', () => {
    expect(getFirstVowel('')).toBeNull();
  });
});
