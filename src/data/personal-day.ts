export interface PersonalDayInterpretation {
  number: number;
  energy: string;
  guidance: string;
  affirmation: string;
}

export const PERSONAL_DAY_INTERPRETATIONS: Record<number, PersonalDayInterpretation> = {
  1: {
    number: 1,
    energy: 'Leadership and initiative',
    guidance: 'Take charge of your day. Start something new, make decisions, and assert your independence.',
    affirmation: 'Today I lead with courage and confidence.',
  },
  2: {
    number: 2,
    energy: 'Cooperation and sensitivity',
    guidance: 'Focus on relationships today. Listen, cooperate, and practice patience.',
    affirmation: 'Today I find harmony in connection.',
  },
  3: {
    number: 3,
    energy: 'Creativity and expression',
    guidance: 'Express yourself creatively. Socialize, share ideas, and find joy in the moment.',
    affirmation: 'Today I express my true self joyfully.',
  },
  4: {
    number: 4,
    energy: 'Discipline and work',
    guidance: 'Focus on practical tasks. Organize, plan, and work steadily toward your goals.',
    affirmation: 'Today I build my future with discipline.',
  },
  5: {
    number: 5,
    energy: 'Freedom and change',
    guidance: 'Be open to change and adventure. Try something new and embrace spontaneity.',
    affirmation: 'Today I embrace change with an open heart.',
  },
  6: {
    number: 6,
    energy: 'Love and responsibility',
    guidance: 'Focus on home, family, and loved ones. Serve others and create harmony.',
    affirmation: 'Today I give and receive love freely.',
  },
  7: {
    number: 7,
    energy: 'Reflection and wisdom',
    guidance: 'Take time for yourself. Reflect, study, and connect with your inner wisdom.',
    affirmation: 'Today I trust my inner guidance.',
  },
  8: {
    number: 8,
    energy: 'Power and achievement',
    guidance: 'Focus on your goals and take decisive action. Success is within reach.',
    affirmation: 'Today I achieve with integrity and purpose.',
  },
  9: {
    number: 9,
    energy: 'Completion and compassion',
    guidance: 'Complete what you started. Practice forgiveness and release what no longer serves you.',
    affirmation: 'Today I let go and trust new beginnings.',
  },
};
