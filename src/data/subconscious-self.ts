export interface SubconsciousSelfInterpretation {
  number: number;
  confidenceLevel: string;
  description: string;
}

export const SUBCONSCIOUS_SELF_INTERPRETATIONS: Record<number, SubconsciousSelfInterpretation> = {
  1: {
    number: 1,
    confidenceLevel: 'Very High Confidence',
    description: 'You naturally project confidence and self-assurance. Your subconscious believes in your ability to handle anything life throws at you.',
  },
  2: {
    number: 2,
    confidenceLevel: 'Moderate Confidence – Relationship-Dependent',
    description: 'Your confidence fluctuates based on your relationships. You feel most secure when surrounded by supportive people.',
  },
  3: {
    number: 3,
    confidenceLevel: 'Moderate-High Confidence – Social',
    description: 'You are confident in social settings and creative expression. Your confidence flows when you are expressing yourself.',
  },
  4: {
    number: 4,
    confidenceLevel: 'Steady, Earned Confidence',
    description: 'Your confidence is built through hard work and achievement. You feel secure when you have prepared and earned your position.',
  },
  5: {
    number: 5,
    confidenceLevel: 'Adaptive Confidence',
    description: 'Your confidence adapts to situations. You are versatile and can find your footing in almost any environment.',
  },
  6: {
    number: 6,
    confidenceLevel: 'Confidence Through Service',
    description: 'Your confidence comes from being needed and helping others. You feel most secure when contributing to your community.',
  },
  7: {
    number: 7,
    confidenceLevel: 'Inner Confidence – Reserved',
    description: 'Your confidence is deep but not always visible. You trust your inner knowing regardless of external validation.',
  },
  8: {
    number: 8,
    confidenceLevel: 'High Confidence – Achievement-Oriented',
    description: 'You project strong confidence, especially in professional and material matters. Success fuels your self-assurance.',
  },
  9: {
    number: 9,
    confidenceLevel: 'Universal Confidence',
    description: 'Your confidence comes from a sense of universal connection. You trust in the bigger picture and your place in it.',
  },
};
