export interface ChallengeInterpretation {
  number: number;
  theme: string;
  growthOpportunity: string;
  copingStrategy: string;
}

export const CHALLENGE_INTERPRETATIONS: Record<number, ChallengeInterpretation> = {
  0: {
    number: 0,
    theme: 'All Possibilities – The Gifts of Free Will',
    growthOpportunity: 'You have no specific karmic challenge, meaning all paths are open to you. Your growth comes from making conscious choices.',
    copingStrategy: 'Stay grounded and make decisions aligned with your highest self. Your freedom is your greatest teacher.',
  },
  1: {
    number: 1,
    theme: 'Assertiveness and Independence',
    growthOpportunity: 'You must learn to stand up for yourself, develop self-confidence, and assert your individuality without aggression.',
    copingStrategy: 'Practice speaking your truth in small ways daily. Build confidence through small acts of self-assertion.',
  },
  2: {
    number: 2,
    theme: 'Sensitivity and Cooperation',
    growthOpportunity: 'You must learn to be sensitive without being overly emotional, and to cooperate without losing your identity.',
    copingStrategy: 'Develop healthy boundaries. Practice being both independent and connected.',
  },
  3: {
    number: 3,
    theme: 'Self-Expression and Communication',
    growthOpportunity: 'You must learn to express yourself clearly and creatively, overcoming fear of judgment or rejection.',
    copingStrategy: 'Start a creative practice. Write, speak, or create daily without worrying about perfection.',
  },
  4: {
    number: 4,
    theme: 'Discipline and Order',
    growthOpportunity: 'You must learn organization, discipline, and the value of hard work. Chaos may surround you until you create structure.',
    copingStrategy: 'Build small daily routines. Create order in your physical space to bring order to your mind.',
  },
  5: {
    number: 5,
    theme: 'Freedom and Responsibility',
    growthOpportunity: 'You must learn to balance your need for freedom with responsibility. Change may feel chaotic until you find your center.',
    copingStrategy: 'Embrace change as growth. Find security within yourself rather than in circumstances.',
  },
  6: {
    number: 6,
    theme: 'Love and Boundaries',
    growthOpportunity: 'You must learn to love without losing yourself, and to set healthy boundaries in relationships.',
    copingStrategy: 'Practice saying no. Remember that caring for yourself allows you to better care for others.',
  },
  7: {
    number: 7,
    theme: 'Trust and Faith',
    growthOpportunity: 'You must learn to trust life, develop faith, and overcome skepticism that isolates you from others.',
    copingStrategy: 'Practice trusting the process. Allow yourself to be vulnerable with safe people.',
  },
  8: {
    number: 8,
    theme: 'Balance and Judgment',
    growthOpportunity: 'You must learn to balance material and spiritual values, and to develop good judgment in financial and personal matters.',
    copingStrategy: 'Seek balance in all things. Use power and resources with integrity and generosity.',
  },
  9: {
    number: 9,
    theme: 'Letting Go and Forgiveness',
    growthOpportunity: 'You must learn to release the past, forgive others and yourself, and embrace life\'s natural cycles of completion.',
    copingStrategy: 'Practice forgiveness daily. Let go of what no longer serves your highest good.',
  },
};
