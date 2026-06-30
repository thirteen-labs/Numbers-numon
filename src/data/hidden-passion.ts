export interface HiddenPassionInterpretation {
  number: number;
  description: string;
  dominantAbilities: string[];
}

export const HIDDEN_PASSION_INTERPRETATIONS: Record<number, HiddenPassionInterpretation> = {
  1: {
    number: 1,
    description: 'You have a hidden passion for leadership and originality. You are driven to create, initiate, and stand out as an individual.',
    dominantAbilities: ['Leadership', 'Innovation', 'Self-reliance', 'Courage', 'Determination'],
  },
  2: {
    number: 2,
    description: 'You have a hidden passion for harmony and partnership. You are driven to connect, cooperate, and create peace.',
    dominantAbilities: ['Diplomacy', 'Sensitivity', 'Cooperation', 'Patience', 'Intuition'],
  },
  3: {
    number: 3,
    description: 'You have a hidden passion for creative expression. You are driven to communicate, inspire, and bring beauty into the world.',
    dominantAbilities: ['Creativity', 'Communication', 'Optimism', 'Social charm', 'Artistic talent'],
  },
  4: {
    number: 4,
    description: 'You have a hidden passion for building and organizing. You are driven to create order, structure, and lasting foundations.',
    dominantAbilities: ['Practicality', 'Discipline', 'Reliability', 'Organization', 'Hard work'],
  },
  5: {
    number: 5,
    description: 'You have a hidden passion for freedom and exploration. You are driven to experience, adapt, and break limitations.',
    dominantAbilities: ['Versatility', 'Adaptability', 'Courage', 'Curiosity', 'Resourcefulness'],
  },
  6: {
    number: 6,
    description: 'You have a hidden passion for love and service. You are driven to nurture, heal, and create harmony.',
    dominantAbilities: ['Nurturing', 'Responsibility', 'Compassion', 'Creativity', 'Community building'],
  },
  7: {
    number: 7,
    description: 'You have a hidden passion for truth and wisdom. You are driven to analyze, understand, and discover hidden knowledge.',
    dominantAbilities: ['Analysis', 'Intellect', 'Spiritual insight', 'Research', 'Perfectionism'],
  },
  8: {
    number: 8,
    description: 'You have a hidden passion for achievement and power. You are driven to succeed, organize, and master the material world.',
    dominantAbilities: ['Leadership', 'Organization', 'Ambition', 'Strategic thinking', 'Efficiency'],
  },
  9: {
    number: 9,
    description: 'You have a hidden passion for compassion and universal love. You are driven to serve, heal, and make a difference.',
    dominantAbilities: ['Compassion', 'Artistic talent', 'Wisdom', 'Tolerance', 'Generosity'],
  },
};
