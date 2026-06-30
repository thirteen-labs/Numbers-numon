export interface BusinessNameInterpretation {
  number: number;
  energy: string;
  brandingVibration: string;
  prosperity: string;
  bestFor: string[];
}

export const BUSINESS_NAME_INTERPRETATIONS: Record<number, BusinessNameInterpretation> = {
  1: {
    number: 1,
    energy: 'Pioneering, innovative, and original',
    brandingVibration: 'Projects a leadership image. Best for companies that want to be seen as first and unique.',
    prosperity: 'Good for new ventures and market leaders. May face competition.',
    bestFor: ['Startups', 'Technology', 'Innovation', 'Leadership consulting', 'Solo practices'],
  },
  2: {
    number: 2,
    energy: 'Cooperative, diplomatic, and harmonious',
    brandingVibration: 'Projects a partnership image. Best for relationship-oriented businesses.',
    prosperity: 'Steady growth through partnerships and referrals.',
    bestFor: ['Partnerships', 'Counseling', 'Mediation', 'Design', 'Customer service'],
  },
  3: {
    number: 3,
    energy: 'Creative, expressive, and joyful',
    brandingVibration: 'Projects a fun, creative image. Best for artistic and entertainment ventures.',
    prosperity: 'Good for creative industries. May need focus to maintain profitability.',
    bestFor: ['Entertainment', 'Arts', 'Marketing', 'Media', 'Event planning'],
  },
  4: {
    number: 4,
    energy: 'Practical, stable, and reliable',
    brandingVibration: 'Projects a trustworthy, solid image. Best for service-oriented businesses.',
    prosperity: 'Steady, reliable growth. Built on hard work and reputation.',
    bestFor: ['Construction', 'Accounting', 'Law', 'Real estate', 'Manufacturing'],
  },
  5: {
    number: 5,
    energy: 'Dynamic, versatile, and progressive',
    brandingVibration: 'Projects an exciting, forward-thinking image. Best for change-oriented businesses.',
    prosperity: 'Variable but potentially high. Benefits from adaptability.',
    bestFor: ['Travel', 'Marketing', 'Media', 'Sales', 'Consulting'],
  },
  6: {
    number: 6,
    energy: 'Nurturing, responsible, and community-focused',
    brandingVibration: 'Projects a caring, trustworthy image. Best for service and family businesses.',
    prosperity: 'Steady through community support and repeat customers.',
    bestFor: ['Healthcare', 'Education', 'Hospitality', 'Family business', 'Nonprofit'],
  },
  7: {
    number: 7,
    energy: 'Analytical, wise, and specialized',
    brandingVibration: 'Projects an expert, premium image. Best for specialized knowledge businesses.',
    prosperity: 'Moderate but high-margin. Benefits from reputation and expertise.',
    bestFor: ['Research', 'Consulting', 'Technology', 'Spiritual services', 'Analysis'],
  },
  8: {
    number: 8,
    energy: 'Powerful, abundant, and authoritative',
    brandingVibration: 'Projects success, wealth, and authority. Best for ambitious ventures.',
    prosperity: 'High potential for financial success. Natural abundance energy.',
    bestFor: ['Finance', 'Real estate', 'Corporate leadership', 'Investment', 'Law'],
  },
  9: {
    number: 9,
    energy: 'Compassionate, universal, and inspiring',
    brandingVibration: 'Projects idealism and global vision. Best for humanitarian ventures.',
    prosperity: 'May prioritize purpose over profit but attracts support.',
    bestFor: ['Nonprofit', 'Arts', 'Humanitarian work', 'Education', 'International trade'],
  },
};
