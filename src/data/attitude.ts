export interface AttitudeInterpretation {
  number: number;
  title: string;
  initialReactions: string;
  dailyMindset: string;
  approachToLife: string;
  decisionMaking: string;
}

export const ATTITUDE_INTERPRETATIONS: Record<number, AttitudeInterpretation> = {
  1: {
    number: 1,
    title: 'The Bold Responder',
    initialReactions: 'You react quickly and decisively. Your first instinct is to take charge and assert your position.',
    dailyMindset: 'You wake up ready to conquer the day. Your attitude is "I can do this" and you tackle problems head-on.',
    approachToLife: 'You approach life as a series of challenges to overcome and goals to achieve. You are proactive rather than reactive.',
    decisionMaking: 'You make decisions quickly and confidently. You trust your instincts and rarely second-guess yourself.',
  },
  2: {
    number: 2,
    title: 'The Considerate Observer',
    initialReactions: 'You pause and assess before responding. Your first instinct is to consider how others feel.',
    dailyMindset: 'You wake up attuned to the mood of those around you. Your attitude is cooperative and considerate.',
    approachToLife: 'You approach life through relationships and connections. You seek harmony and avoid unnecessary conflict.',
    decisionMaking: 'You make decisions carefully, considering all perspectives. You may struggle with indecisiveness.',
  },
  3: {
    number: 3,
    title: 'The Enthusiastic Optimist',
    initialReactions: 'You respond with enthusiasm and optimism. Your first instinct is to find the bright side.',
    dailyMindset: 'You wake up excited about possibilities. Your attitude is cheerful, social, and creative.',
    approachToLife: 'You approach life as an adventure full of creative opportunities. You seek joy and self-expression.',
    decisionMaking: 'You make decisions based on intuition and what feels exciting. You may act impulsively.',
  },
  4: {
    number: 4,
    title: 'The Practical Realist',
    initialReactions: 'You respond with caution and practicality. Your first instinct is to assess the facts and logistics.',
    dailyMindset: 'You wake up with a plan and a schedule. Your attitude is disciplined, focused, and reliable.',
    approachToLife: 'You approach life with structure and method. You believe in hard work and building solid foundations.',
    decisionMaking: 'You make decisions based on logic, facts, and practical considerations. You are thorough and careful.',
  },
  5: {
    number: 5,
    title: 'The Adventurous Spirit',
    initialReactions: 'You respond with curiosity and excitement. Your first instinct is to explore the possibilities.',
    dailyMindset: 'You wake up ready for whatever comes. Your attitude is adaptable, free, and open to change.',
    approachToLife: 'You approach life as a grand adventure. You seek freedom, variety, and new experiences.',
    decisionMaking: 'You make decisions quickly, based on whether something feels freeing and exciting.',
  },
  6: {
    number: 6,
    title: 'The Responsible Helper',
    initialReactions: 'You respond with care and responsibility. Your first instinct is to help and nurture.',
    dailyMindset: 'You wake up thinking about what needs to be done for others. Your attitude is caring and dutiful.',
    approachToLife: 'You approach life through service and responsibility. You find meaning in caring for others.',
    decisionMaking: 'You make decisions based on responsibility and the needs of those you care for.',
  },
  7: {
    number: 7,
    title: 'The Thoughtful Analyst',
    initialReactions: 'You pause and analyze before responding. Your first instinct is to understand deeply.',
    dailyMindset: 'You wake up with a thoughtful, introspective attitude. You value quiet time and reflection.',
    approachToLife: 'You approach life as a mystery to be understood. You seek knowledge, wisdom, and truth.',
    decisionMaking: 'You make decisions slowly and carefully, based on thorough analysis and inner knowing.',
  },
  8: {
    number: 8,
    title: 'The Decisive Executive',
    initialReactions: 'You respond with authority and efficiency. Your first instinct is to take control.',
    dailyMindset: 'You wake up focused on goals and results. Your attitude is ambitious, organized, and determined.',
    approachToLife: 'You approach life as a business to be managed. You seek success, efficiency, and material mastery.',
    decisionMaking: 'You make decisions quickly and decisively, based on strategic goals and desired outcomes.',
  },
  9: {
    number: 9,
    title: 'The Compassionate Idealist',
    initialReactions: 'You respond with empathy and idealism. Your first instinct is to understand the bigger picture.',
    dailyMindset: 'You wake up with a sense of purpose and compassion. Your attitude is tolerant, wise, and giving.',
    approachToLife: 'You approach life as a journey of service and completion. You seek to make a difference.',
    decisionMaking: 'You make decisions based on compassion, intuition, and what serves the greater good.',
  },
};
