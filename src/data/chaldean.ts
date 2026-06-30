export const CHALDEAN_MAP: Record<string, number> = {
  A: 1, B: 2, C: 3, D: 4, E: 5, F: 8, G: 3, H: 5, I: 1,
  J: 1, K: 2, L: 3, M: 4, N: 5, O: 7, P: 8, Q: 1, R: 2,
  S: 3, T: 4, U: 6, V: 6, W: 6, X: 5, Y: 1, Z: 7,
};

export const CHALDEAN_NUMBERS: Record<number, { meaning: string; planet: string }> = {
  1: { meaning: 'Will, leadership, originality', planet: 'Sun' },
  2: { meaning: 'Duality, diplomacy, receptivity', planet: 'Moon' },
  3: { meaning: 'Creativity, expression, joy', planet: 'Jupiter' },
  4: { meaning: 'Stability, order, practicality', planet: 'Uranus' },
  5: { meaning: 'Freedom, adventure, change', planet: 'Mercury' },
  6: { meaning: 'Harmony, responsibility, love', planet: 'Venus' },
  7: { meaning: 'Spirituality, analysis, wisdom', planet: 'Neptune' },
  8: { meaning: 'Power, material success, cycles', planet: 'Saturn' },
};
