export interface ExpressionInterpretation {
  number: number;
  title: string;
  naturalTalents: string[];
  potential: string;
  career: string[];
  personalDevelopment: string;
  hiddenAbilities: string[];
}

export const EXPRESSION_INTERPRETATIONS: Record<number, ExpressionInterpretation> = {
  1: {
    number: 1,
    title: 'The Original Leader',
    naturalTalents: ['Leadership', 'Originality', 'Ambition', 'Initiative', 'Creative vision'],
    potential: 'Your greatest potential lies in pioneering new paths and inspiring others through your courage and originality. You have the ability to start projects, lead teams, and create innovative solutions.',
    career: ['CEO', 'entrepreneur', 'inventor', 'director', 'manager', 'solo business owner'],
    personalDevelopment: 'Learn to balance assertiveness with diplomacy. Your growth comes from channeling your drive into projects that serve others, not just your ego.',
    hiddenAbilities: ['Ability to inspire others', 'Natural authority', 'Crisis management', 'Innovation thinking'],
  },
  2: {
    number: 2,
    title: 'The Diplomatic Builder',
    naturalTalents: ['Diplomacy', 'Cooperation', 'Detail orientation', 'Patience', 'Sensitivity'],
    potential: 'Your greatest potential lies in creating harmony and building bridges between people. You excel in roles that require tact, patience, and the ability to see all sides of a situation.',
    career: ['diplomat', 'counselor', 'mediator', 'designer', 'teacher', 'psychologist'],
    personalDevelopment: 'Develop confidence in your own abilities and learn to express your needs. Your growth comes from valuing your own perspective as much as others\'.',
    hiddenAbilities: ['Peacemaking in conflicts', 'Reading people', 'Artistic sensitivity', 'Team building'],
  },
  3: {
    number: 3,
    title: 'The Expressive Artist',
    naturalTalents: ['Creative expression', 'Communication', 'Social charm', 'Optimism', 'Inspiration'],
    potential: 'Your greatest potential lies in creative expression and communication. You have the gift of bringing joy, beauty, and inspiration to others through your artistic and verbal abilities.',
    career: ['writer', 'performer', 'musician', 'speaker', 'artist', 'designer'],
    personalDevelopment: 'Develop focus and discipline to match your creative gifts. Your growth comes from channeling your abundant creative energy into structured projects.',
    hiddenAbilities: ['Healing through art', 'Public speaking', 'Creative problem solving', 'Entertainment'],
  },
  4: {
    number: 4,
    title: 'The Solid Builder',
    naturalTalents: ['Practicality', 'Discipline', 'Reliability', 'Organization', 'Hard work'],
    potential: 'Your greatest potential lies in creating stable foundations and practical systems. You have the ability to build enduring structures through methodical effort and unwavering dedication.',
    career: ['architect', 'engineer', 'accountant', 'project manager', 'administrator', 'craftsman'],
    personalDevelopment: 'Learn to be flexible and embrace change when necessary. Your growth comes from balancing your need for order with life\'s natural unpredictability.',
    hiddenAbilities: ['System building', 'Crisis stability', 'Teaching practical skills', 'Financial management'],
  },
  5: {
    number: 5,
    title: 'The Freedom Seeker',
    naturalTalents: ['Versatility', 'Adaptability', 'Communication', 'Courage', 'Resourcefulness'],
    potential: 'Your greatest potential lies in embracing change and inspiring others to break free from limitations. You have the ability to adapt to any situation and thrive in dynamic environments.',
    career: ['travel industry', 'sales', 'marketing', 'journalism', 'entertainment', 'entrepreneur'],
    personalDevelopment: 'Learn to find freedom within commitment and stability. Your growth comes from channeling your need for variety into productive pursuits.',
    hiddenAbilities: ['Multilingual ability', 'Sales persuasion', 'Crisis adaptability', 'Networking genius'],
  },
  6: {
    number: 6,
    title: 'The Loving Guardian',
    naturalTalents: ['Nurturing', 'Responsibility', 'Compassion', 'Creativity', 'Community building'],
    potential: 'Your greatest potential lies in creating harmony and healing through love and service. You have the ability to build community, heal relationships, and create beauty in your surroundings.',
    career: ['teacher', 'healthcare', 'counselor', 'social worker', 'artist', 'community leader'],
    personalDevelopment: 'Learn to care for yourself as much as you care for others. Your growth comes from balancing service with self-nurturing.',
    hiddenAbilities: ['Healing touch', 'Family counseling', 'Creative arts', 'Community organizing'],
  },
  7: {
    number: 7,
    title: 'The Wise Analyst',
    naturalTalents: ['Analysis', 'Research', 'Spiritual insight', 'Perfectionism', 'Wisdom'],
    potential: 'Your greatest potential lies in uncovering truth and sharing wisdom. You have the ability to probe deeply into any subject and emerge with profound insights.',
    career: ['scientist', 'researcher', 'philosopher', 'analyst', 'spiritual teacher', 'writer'],
    personalDevelopment: 'Learn to share your inner world with others and not isolate. Your growth comes from balancing intellectual pursuits with emotional connections.',
    hiddenAbilities: ['Pattern recognition', 'Deep research', 'Spiritual healing', 'Technical mastery'],
  },
  8: {
    number: 8,
    title: 'The Executive Visionary',
    naturalTalents: ['Leadership', 'Organization', 'Strategic thinking', 'Ambition', 'Efficiency'],
    potential: 'Your greatest potential lies in achieving material mastery and using power wisely. You have the ability to organize resources, lead large projects, and build lasting wealth.',
    career: ['CEO', 'financial executive', 'real estate developer', 'judge', 'business owner'],
    personalDevelopment: 'Learn to balance material success with spiritual fulfillment. Your growth comes from using power and resources for the greater good.',
    hiddenAbilities: ['Financial genius', 'Organizational mastery', 'Strategic vision', 'Resource management'],
  },
  9: {
    number: 9,
    title: 'The Universal Humanitarian',
    naturalTalents: ['Compassion', 'Artistic genius', 'Wisdom', 'Tolerance', 'Generosity'],
    potential: 'Your greatest potential lies in serving humanity through compassion and creative expression. You have the ability to inspire, heal, and uplift on a global scale.',
    career: ['nonprofit leader', 'artist', 'philanthropist', 'healer', 'teacher', 'international work'],
    personalDevelopment: 'Learn to let go of what no longer serves you. Your growth comes from embracing forgiveness and understanding your role in the larger human story.',
    hiddenAbilities: ['Universal perspective', 'Artistic mastery', 'Healing presence', 'Global vision'],
  },
  11: {
    number: 11,
    title: 'The Inspired Illuminator',
    naturalTalents: ['Intuition', 'Inspiration', 'Spiritual insight', 'Charisma', 'Creativity'],
    potential: 'Your greatest potential lies in inspiring others and bringing higher consciousness to the world. You have the ability to channel divine inspiration and illuminate the path for others.',
    career: ['spiritual teacher', 'healer', 'artist', 'counselor', 'visionary', 'philanthropist'],
    personalDevelopment: 'Learn to manage the intense spiritual energy you carry. Your growth comes from grounding your inspiration in practical action.',
    hiddenAbilities: ['Clairvoyance', 'Spiritual channeling', 'Inspiring communication', 'Creative genius'],
  },
  22: {
    number: 22,
    title: 'The Master Builder',
    naturalTalents: ['Visionary practicality', 'Leadership', 'Organizational genius', 'Manifestation', 'Inspiration'],
    potential: 'Your greatest potential lies in turning the grandest dreams into practical reality. You have the ability to build structures and systems that serve humanity on a massive scale.',
    career: ['world leader', 'CEO', 'innovator', 'architect', 'developer', 'humanitarian leader'],
    personalDevelopment: 'Learn to handle the immense responsibility of your potential. Your growth comes from using your power humbly and wisely.',
    hiddenAbilities: ['Massive project execution', 'Visionary practicality', 'Transformational leadership', 'World changing'],
  },
  33: {
    number: 33,
    title: 'The Master Teacher',
    naturalTalents: ['Unconditional love', 'Spiritual wisdom', 'Healing', 'Teaching', 'Compassion'],
    potential: 'Your greatest potential lies in teaching and healing through unconditional love. You have the ability to raise consciousness and transform lives through your presence.',
    career: ['spiritual teacher', 'healer', 'humanitarian', 'artist', 'mentor', 'guide'],
    personalDevelopment: 'Learn to protect your energy while serving others. Your growth comes from embodying divine love in every action.',
    hiddenAbilities: ['Spiritual mastery', 'Divine healing', 'Universal love', 'Consciousness raising'],
  },
};
