export interface KarmicDebtInterpretation {
  number: number;
  title: string;
  historicalMeaning: string;
  modernInterpretation: string;
  practicalAdvice: string[];
}

export const KARMIC_DEBT_INTERPRETATIONS: Record<number, KarmicDebtInterpretation> = {
  13: {
    number: 13,
    title: 'The Debt of Laziness',
    historicalMeaning: 'In past lives, you avoided hard work and relied on others. You shirked responsibility and took the easy path, leaving tasks unfinished.',
    modernInterpretation: 'This life brings challenges that require persistent effort. You may face obstacles that force you to develop discipline and follow through on commitments.',
    practicalAdvice: [
      'Break large tasks into manageable steps and complete them one at a time',
      'Create daily routines that build discipline',
      'Practice finishing what you start, no matter how small',
      'Embrace hard work as a path to growth rather than a burden',
      'Take pride in your efforts and accomplishments',
    ],
  },
  14: {
    number: 14,
    title: 'The Debt of Indulgence',
    historicalMeaning: 'In past lives, you abused freedom and indulged in excessive behaviors. You prioritized pleasure over responsibility and may have harmed others through selfish actions.',
    modernInterpretation: 'This life brings a strong desire for freedom but with restrictions that teach balance. You may face temptations and must learn self-control and moderation.',
    practicalAdvice: [
      'Practice moderation in all things, especially pleasures',
      'Find freedom through discipline rather than indulgence',
      'Consider how your actions affect others before acting',
      'Develop a spiritual practice to balance material desires',
      'Use your freedom creatively rather than destructively',
    ],
  },
  16: {
    number: 16,
    title: 'The Debt of Ego',
    historicalMeaning: 'In past lives, you abused power and let ego dominate your actions. You may have been arrogant, caused the downfall of others, or used authority selfishly.',
    modernInterpretation: 'This life brings circumstances that challenge your ego and require humility. You may experience setbacks that force you to rebuild from the ground up.',
    practicalAdvice: [
      'Practice humility daily in small ways',
      'Learn to ask for help and accept guidance',
      'Release the need to control outcomes',
      'See setbacks as opportunities for rebuilding',
      'Develop genuine care for others without expectation of return',
    ],
  },
  19: {
    number: 19,
    title: 'The Debt of Selfishness',
    historicalMeaning: 'In past lives, you were self-centered and refused to help others. You may have had power or resources but used them only for personal gain.',
    modernInterpretation: 'This life brings a strong sense of independence that must be balanced with service to others. You are called to use your abilities for the greater good.',
    practicalAdvice: [
      'Look for opportunities to serve others without recognition',
      'Balance your independence with community involvement',
      'Share your knowledge and resources generously',
      'Practice empathy by putting yourself in others\' situations',
      'Recognize that true fulfillment comes through contribution',
    ],
  },
};
