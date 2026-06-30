export interface CompatibilityInterpretation {
  score: number;
  emotional: string;
  friendship: string;
  romance: string;
  communication: string;
  business: string;
}

export const COMPATIBILITY_INTERPRETATIONS: Record<number, CompatibilityInterpretation> = {
  1: {
    score: 1,
    emotional: 'Two individuals with strong wills. Can be passionate but may clash.',
    friendship: 'Mutual respect and shared ambition. Can inspire each other.',
    romance: 'Intense chemistry but power struggles possible. Both need space.',
    communication: 'Direct and honest. May need to soften edges.',
    business: 'Powerful partnership if egos are managed. Great for leadership roles.',
  },
  2: {
    score: 2,
    emotional: 'A nurturing, supportive emotional bond.',
    friendship: 'Deep, loyal friendship. Both value the connection.',
    romance: 'Gentle, loving, and harmonious. Both seek peace.',
    communication: 'Kind and considerate. May avoid conflict.',
    business: 'Good supportive partnership. One leads, one supports.',
  },
  3: {
    score: 3,
    emotional: 'Joyful and expressive emotional connection.',
    friendship: 'Fun, social, and creative friendship.',
    romance: 'Playful and passionate. Creative expression flows.',
    communication: 'Excellent, engaging, and inspiring conversations.',
    business: 'Creative collaborations flourish. Great for artistic ventures.',
  },
  4: {
    score: 4,
    emotional: 'Stable and reliable but may lack spontaneity.',
    friendship: 'Loyal, dependable friendship built on trust.',
    romance: 'Steady and committed. May need more excitement.',
    communication: 'Practical and straightforward. May lack depth.',
    business: 'Excellent for structured, methodical work.',
  },
  5: {
    score: 5,
    emotional: 'Exciting but unpredictable emotional connection.',
    friendship: 'Adventurous, fun friendship with shared interests.',
    romance: 'Passionate but may struggle with commitment.',
    communication: 'Lively, engaging, and ever-changing.',
    business: 'Good for dynamic, change-oriented projects.',
  },
  6: {
    score: 6,
    emotional: 'Deeply caring and responsible emotional bond.',
    friendship: 'Supportive, nurturing friendship. Both care deeply.',
    romance: 'Loving, committed, and family-oriented.',
    communication: 'Warm, caring, and advisory.',
    business: 'Service-oriented partnerships. Great for community work.',
  },
  7: {
    score: 7,
    emotional: 'Deep but reserved emotional connection.',
    friendship: 'Intellectual friendship with deep conversations.',
    romance: 'Mysterious and intense. Both need space.',
    communication: 'Meaningful, philosophical, and analytical.',
    business: 'Good for research, analysis, and intellectual work.',
  },
  8: {
    score: 8,
    emotional: 'Strong emotions focused on achievement.',
    friendship: 'Mutually ambitious. Push each other to succeed.',
    romance: 'Powerful attraction. May compete with each other.',
    communication: 'Direct, efficient, and goal-oriented.',
    business: 'Excellent business partnership. Power couple energy.',
  },
  9: {
    score: 9,
    emotional: 'Universal, compassionate emotional bond.',
    friendship: 'Selfless, giving friendship. Both care about humanity.',
    romance: 'Idealistic and romantic. Deep soul connection.',
    communication: 'Inspiring, philosophical, and heartfelt.',
    business: 'Great for humanitarian and creative ventures.',
  },
};

export function getCompatibilityDescription(difference: number): CompatibilityInterpretation {
  const score = difference === 0 ? 9 : Math.min(difference, 9);
  return COMPATIBILITY_INTERPRETATIONS[score] ?? COMPATIBILITY_INTERPRETATIONS[5]!;
}
