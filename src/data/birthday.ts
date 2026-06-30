export interface BirthdayInterpretation {
  number: number;
  title: string;
  gift: string;
  learningStyle: string;
  strengths: string[];
  challenges: string[];
}

export const BIRTHDAY_INTERPRETATIONS: Record<number, BirthdayInterpretation> = {
  1: {
    number: 1,
    title: 'The Natural Leader',
    gift: 'You have the gift of initiative and originality. You can start projects and inspire others to follow your lead with confidence.',
    learningStyle: 'You learn best by doing and leading. Hands-on experience and teaching others solidifies your understanding.',
    strengths: ['Initiative', 'Courage', 'Original thinking', 'Self-reliance'],
    challenges: ['Learning to cooperate', 'Managing impatience', 'Accepting help from others'],
  },
  2: {
    number: 2,
    title: 'The Sensitive Diplomat',
    gift: 'You have the gift of sensitivity and perception. You can read people and situations with remarkable accuracy.',
    learningStyle: 'You learn best in cooperative environments through discussion and mutual exchange of ideas.',
    strengths: ['Sensitivity', 'Diplomacy', 'Patience', 'Attention to detail'],
    challenges: ['Overcoming shyness', 'Building self-confidence', 'Avoiding over-sensitivity'],
  },
  3: {
    number: 3,
    title: 'The Creative Expressionist',
    gift: 'You have the gift of creative expression and communication. You can inspire, entertain, and uplift others through your artistic abilities.',
    learningStyle: 'You learn best through creative expression and social interaction. Discussion and creative projects enhance your learning.',
    strengths: ['Creativity', 'Communication', 'Optimism', 'Social grace'],
    challenges: ['Developing focus', 'Following through', 'Avoiding superficiality'],
  },
  4: {
    number: 4,
    title: 'The Practical Builder',
    gift: 'You have the gift of practicality and persistence. You can build lasting structures through methodical effort.',
    learningStyle: 'You learn best through structured, systematic approaches. Step-by-step instruction suits you well.',
    strengths: ['Practicality', 'Reliability', 'Discipline', 'Organization'],
    challenges: ['Embracing change', 'Being flexible', 'Avoiding rigidity'],
  },
  5: {
    number: 5,
    title: 'The Versatile Explorer',
    gift: 'You have the gift of adaptability and versatility. You can thrive in any environment and learn any skill.',
    learningStyle: 'You learn best through varied experiences and hands-on exploration. You need freedom to learn your way.',
    strengths: ['Adaptability', 'Versatility', 'Courage', 'Resourcefulness'],
    challenges: ['Committing to one path', 'Developing depth', 'Managing impulsiveness'],
  },
  6: {
    number: 6,
    title: 'The Loving Nurturer',
    gift: 'You have the gift of responsibility and love. You can create harmony and heal relationships wherever you go.',
    learningStyle: 'You learn best when material is presented in a caring environment with real-world applications.',
    strengths: ['Responsibility', 'Nurturing', 'Creativity', 'Community spirit'],
    challenges: ['Avoiding over-involvement', 'Setting boundaries', 'Managing worry'],
  },
  7: {
    number: 7,
    title: 'The Analytical Thinker',
    gift: 'You have the gift of analysis and wisdom. You can probe beneath the surface to uncover hidden truths.',
    learningStyle: 'You learn best through research, analysis, and quiet contemplation. You need time to process.',
    strengths: ['Analysis', 'Intellect', 'Spiritual insight', 'Perfectionism'],
    challenges: ['Connecting emotionally', 'Sharing with others', 'Avoiding isolation'],
  },
  8: {
    number: 8,
    title: 'The Executive Achiever',
    gift: 'You have the gift of organization and leadership. You can manage resources and people to achieve great results.',
    learningStyle: 'You learn best through practical application and goal-oriented study. Results motivate you.',
    strengths: ['Leadership', 'Organization', 'Ambition', 'Efficiency'],
    challenges: ['Balancing work and life', 'Managing power wisely', 'Developing patience'],
  },
  9: {
    number: 9,
    title: 'The Universal Humanitarian',
    gift: 'You have the gift of compassion and vision. You can see the bigger picture and serve humanity with wisdom.',
    learningStyle: 'You learn best through holistic and humanitarian contexts. Understanding the "why" matters to you.',
    strengths: ['Compassion', 'Artistic talent', 'Wisdom', 'Tolerance'],
    challenges: ['Letting go', 'Setting boundaries', 'Staying grounded'],
  },
};
