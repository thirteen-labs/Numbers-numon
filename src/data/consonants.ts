export const FIRST_CONSONANT_MEANINGS: Record<string, { consonant: string; meaning: string; outwardPersonality: string }> = {
  B: { consonant: 'B', meaning: 'Sensitivity and intuition', outwardPersonality: 'You appear sensitive and intuitive. Others see you as caring and perceptive.' },
  C: { consonant: 'C', meaning: 'Creativity and optimism', outwardPersonality: 'You appear creative and optimistic. Others see you as expressive and inspiring.' },
  D: { consonant: 'D', meaning: 'Practicality and discipline', outwardPersonality: 'You appear practical and reliable. Others see you as grounded and trustworthy.' },
  F: { consonant: 'F', meaning: 'Love and responsibility', outwardPersonality: 'You appear nurturing and responsible. Others see you as caring and devoted.' },
  G: { consonant: 'G', meaning: 'Wisdom and analysis', outwardPersonality: 'You appear analytical and wise. Others see you as thoughtful and perceptive.' },
  H: { consonant: 'H', meaning: 'Ambition and creativity', outwardPersonality: 'You appear ambitious and resourceful. Others see you as capable and driven.' },
  J: { consonant: 'J', meaning: 'Leadership and independence', outwardPersonality: 'You appear confident and independent. Others see you as a natural leader.' },
  K: { consonant: 'K', meaning: 'Diplomacy and balance', outwardPersonality: 'You appear balanced and diplomatic. Others see you as fair and cooperative.' },
  L: { consonant: 'L', meaning: 'Creativity and expression', outwardPersonality: 'You appear creative and expressive. Others see you as artistic and social.' },
  M: { consonant: 'M', meaning: 'Practicality and hard work', outwardPersonality: 'You appear practical and dependable. Others see you as reliable and dedicated.' },
  N: { consonant: 'N', meaning: 'Adaptability and freedom', outwardPersonality: 'You appear adaptable and free-spirited. Others see you as versatile and curious.' },
  P: { consonant: 'P', meaning: 'Wisdom and spirituality', outwardPersonality: 'You appear wise and introspective. Others see you as thoughtful and spiritual.' },
  Q: { consonant: 'Q', meaning: 'Uniqueness and leadership', outwardPersonality: 'You appear unique and independent. Others see you as original and unconventional.' },
  R: { consonant: 'R', meaning: 'Service and responsibility', outwardPersonality: 'You appear responsible and caring. Others see you as devoted and community-minded.' },
  S: { consonant: 'S', meaning: 'Charisma and leadership', outwardPersonality: 'You appear charismatic and confident. Others see you as influential and inspiring.' },
  T: { consonant: 'T', meaning: 'Cooperation and sensitivity', outwardPersonality: 'You appear cooperative and sensitive. Others see you as diplomatic and patient.' },
  V: { consonant: 'V', meaning: 'Discipline and structure', outwardPersonality: 'You appear disciplined and organized. Others see you as structured and determined.' },
  W: { consonant: 'W', meaning: 'Versatility and change', outwardPersonality: 'You appear versatile and adaptable. Others see you as progressive and curious.' },
  X: { consonant: 'X', meaning: 'Sensitivity and service', outwardPersonality: 'You appear sensitive and caring. Others see you as compassionate and helpful.' },
  Y: { consonant: 'Y', meaning: 'Wisdom and introspection', outwardPersonality: 'You appear wise and introspective. Others see you as philosophical and deep.' },
  Z: { consonant: 'Z', meaning: 'Power and efficiency', outwardPersonality: 'You appear powerful and efficient. Others see you as determined and capable.' },
};

export function getFirstConsonantMeaning(consonant: string) {
  const upper = consonant.toUpperCase() as keyof typeof FIRST_CONSONANT_MEANINGS;
  return FIRST_CONSONANT_MEANINGS[upper] ?? { consonant: upper, meaning: 'Balanced expression', outwardPersonality: 'You have a balanced and adaptable outward personality.' };
}
