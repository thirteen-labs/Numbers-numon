export const FIRST_VOWEL_MEANINGS: Record<string, { vowel: string; meaning: string; emotionalTendency: string }> = {
  A: { vowel: 'A', meaning: 'Leadership and independence', emotionalTendency: 'You express emotions assertively. You feel things deeply but project strength.' },
  E: { vowel: 'E', meaning: 'Freedom and expression', emotionalTendency: 'You express emotions openly and need freedom in emotional expression.' },
  I: { vowel: 'I', meaning: 'Sensitivity and intuition', emotionalTendency: 'You are highly sensitive and intuitive. Your emotions are deep and reflective.' },
  O: { vowel: 'O', meaning: 'Responsibility and depth', emotionalTendency: 'You feel emotions with great depth and responsibility. You are a loyal emotional partner.' },
  U: { vowel: 'U', meaning: 'Creativity and uniqueness', emotionalTendency: 'You express emotions creatively. Your feelings are unique and sometimes unconventional.' },
};

export function getFirstVowelMeaning(vowel: string) {
  const upper = vowel.toUpperCase() as keyof typeof FIRST_VOWEL_MEANINGS;
  return FIRST_VOWEL_MEANINGS[upper] ?? { vowel: upper, meaning: 'Balanced expression', emotionalTendency: 'You have a balanced approach to emotional expression.' };
}
