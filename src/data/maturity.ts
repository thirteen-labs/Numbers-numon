export interface MaturityInterpretation {
  number: number;
  title: string;
  futureDirection: string;
  growthMilestones: string[];
  wisdomGained: string;
}

export const MATURITY_INTERPRETATIONS: Record<number, MaturityInterpretation> = {
  1: {
    number: 1,
    title: 'The Fulfilled Leader',
    futureDirection: 'As you mature, you learn to lead with wisdom rather than ego. Your independence transforms into inspired leadership that uplifts others.',
    growthMilestones: ['Learning to mentor others', 'Balancing independence with collaboration', 'Developing humility alongside confidence'],
    wisdomGained: 'True leadership is service. Your greatest strength is not in standing alone, but in empowering others to rise.',
  },
  2: {
    number: 2,
    title: 'The Wise Peacemaker',
    futureDirection: 'As you mature, your sensitivity becomes wisdom. You learn to create peace while maintaining your own boundaries and identity.',
    growthMilestones: ['Developing healthy boundaries', 'Trusting your own judgment', 'Balancing giving with receiving'],
    wisdomGained: 'Peace begins within. You cannot pour from an empty cup, and true harmony requires self-respect.',
  },
  3: {
    number: 3,
    title: 'The Inspired Creator',
    futureDirection: 'As you mature, your creative gifts deepen and focus. You learn to channel your expression into meaningful work that inspires generations.',
    growthMilestones: ['Developing creative discipline', 'Using art for healing', 'Balancing joy with depth'],
    wisdomGained: 'True creativity is not about attention but about expression. Your art is a gift to be shared authentically.',
  },
  4: {
    number: 4,
    title: 'The Wise Builder',
    futureDirection: 'As you mature, your discipline becomes wisdom. You learn that the strongest structures are built with both strength and flexibility.',
    growthMilestones: ['Learning to adapt', 'Balancing work with joy', 'Building for others, not just security'],
    wisdomGained: 'The best foundations include room for growth. True stability allows for change.',
  },
  5: {
    number: 5,
    title: 'The Free Sage',
    futureDirection: 'As you mature, your need for freedom transforms into wisdom. You learn that true freedom is a state of mind, not a destination.',
    growthMilestones: ['Finding freedom in commitment', 'Channeling energy purposefully', 'Developing depth alongside breadth'],
    wisdomGained: 'Freedom is not the absence of commitment but the presence of purpose. True adventure is found in meaningful living.',
  },
  6: {
    number: 6,
    title: 'The Compassionate Sage',
    futureDirection: 'As you mature, your nurturing becomes universal wisdom. You learn to love without losing yourself.',
    growthMilestones: ['Setting healthy boundaries', 'Extending compassion to yourself', 'Balancing service with self-care'],
    wisdomGained: 'Love includes yourself. You teach others how to treat you by how you treat yourself.',
  },
  7: {
    number: 7,
    title: 'The Enlightened Seeker',
    futureDirection: 'As you mature, your analysis becomes wisdom. You learn that true knowledge is found in the heart as much as the mind.',
    growthMilestones: ['Integrating intellect with emotion', 'Sharing wisdom with others', 'Finding balance in community'],
    wisdomGained: 'The highest knowledge is knowing that we are all connected. Wisdom without love is incomplete.',
  },
  8: {
    number: 8,
    title: 'The Benevolent Executive',
    futureDirection: 'As you mature, your ambition becomes purpose. You learn that true power is the ability to serve.',
    growthMilestones: ['Balancing material with spiritual', 'Using resources for good', 'Leading with compassion'],
    wisdomGained: 'True wealth is measured by what you give, not what you keep. Power is a responsibility, not a privilege.',
  },
  9: {
    number: 9,
    title: 'The Cosmic Wise One',
    futureDirection: 'As you mature, your compassion becomes universal wisdom. You learn that letting go is the highest form of love.',
    growthMilestones: ['Practicing detachment', 'Embracing forgiveness', 'Accepting life\'s cycles'],
    wisdomGained: 'The greatest wisdom is knowing that everything passes. Letting go is not losing; it is making space for what comes next.',
  },
};
