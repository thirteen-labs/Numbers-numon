export const PYTHAGOREAN_MAP: Record<string, number> = {
  A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9,
  J: 1, K: 2, L: 3, M: 4, N: 5, O: 6, P: 7, Q: 8, R: 9,
  S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8,
};

export const PYTHAGOREAN_NUMBERS: Record<number, { positive: string[]; negative: string[] }> = {
  1: {
    positive: ['independent', 'ambitious', 'creative', 'leader', 'pioneer'],
    negative: ['arrogant', 'domineering', 'selfish', 'lonely', 'stubborn'],
  },
  2: {
    positive: ['cooperative', 'diplomatic', 'sensitive', 'patient', 'peacemaker'],
    negative: ['shy', 'overly-sensitive', 'indecisive', 'moody', 'dependent'],
  },
  3: {
    positive: ['creative', 'expressive', 'social', 'optimistic', 'charming'],
    negative: ['scattered', 'superficial', 'extravagant', 'dramatic', 'unfocused'],
  },
  4: {
    positive: ['practical', 'disciplined', 'reliable', 'honest', 'hardworking'],
    negative: ['rigid', 'stubborn', 'dogmatic', 'impatient', 'narrow-minded'],
  },
  5: {
    positive: ['adventurous', 'versatile', 'curious', 'freedom-loving', 'energetic'],
    negative: ['restless', 'impulsive', 'irresponsible', 'inconsistent', 'anxious'],
  },
  6: {
    positive: ['nurturing', 'responsible', 'compassionate', 'harmonious', 'selfless'],
    negative: ['interfering', 'self-righteous', 'anxious', 'martyr', 'overbearing'],
  },
  7: {
    positive: ['analytical', 'introspective', 'wise', 'spiritual', 'perfectionist'],
    negative: ['secretive', 'isolated', 'sarcastic', 'distrustful', 'critical'],
  },
  8: {
    positive: ['ambitious', 'efficient', 'organized', 'authoritative', 'visionary'],
    negative: ['materialistic', 'workaholic', 'power-hungry', 'ruthless', 'stress-prone'],
  },
  9: {
    positive: ['compassionate', 'generous', 'artistic', 'tolerant', 'humanitarian'],
    negative: ['dramatic', 'unrealistic', 'overwhelmed', 'resentful', 'possessive'],
  },
};
