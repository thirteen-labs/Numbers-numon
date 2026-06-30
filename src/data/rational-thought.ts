export interface RationalThoughtInterpretation {
  number: number;
  description: string;
  thinkingPattern: string;
}

export const RATIONAL_THOUGHT_INTERPRETATIONS: Record<number, RationalThoughtInterpretation> = {
  1: {
    number: 1,
    description: 'You think independently and originally. Your mind is designed for innovation and leadership.',
    thinkingPattern: 'You approach problems by seeking new solutions. You trust your own judgment and think outside the box.',
  },
  2: {
    number: 2,
    description: 'You think cooperatively and considerately. Your mind is designed for balance and diplomacy.',
    thinkingPattern: 'You approach problems by considering all perspectives. You seek harmony and collaborative solutions.',
  },
  3: {
    number: 3,
    description: 'You think creatively and expressively. Your mind is designed for communication and inspiration.',
    thinkingPattern: 'You approach problems by brainstorming creative possibilities. You think in words, images, and stories.',
  },
  4: {
    number: 4,
    description: 'You think practically and systematically. Your mind is designed for order and structure.',
    thinkingPattern: 'You approach problems methodically, step by step. You value facts, logic, and proven methods.',
  },
  5: {
    number: 5,
    description: 'You think adaptively and progressively. Your mind is designed for versatility and innovation.',
    thinkingPattern: 'You approach problems by exploring multiple options. You think on your feet and adapt quickly.',
  },
  6: {
    number: 6,
    description: 'You think responsibly and harmoniously. Your mind is designed for service and beauty.',
    thinkingPattern: 'You approach problems by considering how solutions affect others. You seek win-win outcomes.',
  },
  7: {
    number: 7,
    description: 'You think analytically and deeply. Your mind is designed for research and discovery.',
    thinkingPattern: 'You approach problems by analyzing all angles. You seek underlying truths and hidden patterns.',
  },
  8: {
    number: 8,
    description: 'You think strategically and efficiently. Your mind is designed for success and organization.',
    thinkingPattern: 'You approach problems by identifying the most effective path. You think in terms of systems and results.',
  },
  9: {
    number: 9,
    description: 'You think holistically and compassionately. Your mind is designed for universal understanding.',
    thinkingPattern: 'You approach problems by seeing the big picture. You consider global impact and long-term consequences.',
  },
};
