import { PYTHAGOREAN_MAP } from './pythagorean';

export const CORNERSTONE_MEANINGS: Record<string, { letter: string; meaning: string; trait: string }> = {
  A: { letter: 'A', meaning: 'Leadership and ambition', trait: 'You approach life with confidence and a pioneering spirit.' },
  B: { letter: 'B', meaning: 'Sensitivity and intuition', trait: 'You are emotionally aware and deeply intuitive.' },
  C: { letter: 'C', meaning: 'Creativity and optimism', trait: 'You express yourself with enthusiasm and joy.' },
  D: { letter: 'D', meaning: 'Practicality and discipline', trait: 'You are grounded, hardworking, and reliable.' },
  E: { letter: 'E', meaning: 'Freedom and adventure', trait: 'You are adaptable, curious, and love exploration.' },
  F: { letter: 'F', meaning: 'Love and responsibility', trait: 'You are nurturing, caring, and family-oriented.' },
  G: { letter: 'G', meaning: 'Wisdom and spirituality', trait: 'You are analytical, introspective, and seek truth.' },
  H: { letter: 'H', meaning: 'Ambition and creativity', trait: 'You are driven, entrepreneurial, and resourceful.' },
  I: { letter: 'I', meaning: 'Compassion and sensitivity', trait: 'You are empathetic, artistic, and understanding.' },
  J: { letter: 'J', meaning: 'Independence and leadership', trait: 'You are self-reliant, determined, and ambitious.' },
  K: { letter: 'K', meaning: 'Intuition and diplomacy', trait: 'You are perceptive, balanced, and fair-minded.' },
  L: { letter: 'L', meaning: 'Creativity and expression', trait: 'You are artistic, social, and inspiring.' },
  M: { letter: 'M', meaning: 'Practicality and hard work', trait: 'You are methodical, dependable, and disciplined.' },
  N: { letter: 'N', meaning: 'Freedom and adaptability', trait: 'You are versatile, curious, and progressive.' },
  O: { letter: 'O', meaning: 'Responsibility and spirituality', trait: 'You are devoted, wise, and service-oriented.' },
  P: { letter: 'P', meaning: 'Wisdom and knowledge', trait: 'You are thoughtful, analytical, and spiritual.' },
  Q: { letter: 'Q', meaning: 'Leadership and uniqueness', trait: 'You are original, independent, and unconventional.' },
  R: { letter: 'R', meaning: 'Service and responsibility', trait: 'You are nurturing, dutiful, and community-minded.' },
  S: { letter: 'S', meaning: 'Charisma and leadership', trait: 'You are magnetic, ambitious, and inspiring.' },
  T: { letter: 'T', meaning: 'Cooperation and sensitivity', trait: 'You are diplomatic, patient, and intuitive.' },
  U: { letter: 'U', meaning: 'Creativity and expression', trait: 'You are imaginative, optimistic, and communicative.' },
  V: { letter: 'V', meaning: 'Discipline and structure', trait: 'You are practical, organized, and determined.' },
  W: { letter: 'W', meaning: 'Versatility and change', trait: 'You are adaptable, curious, and freedom-loving.' },
  X: { letter: 'X', meaning: 'Sensitivity and service', trait: 'You are caring, responsible, and intuitive.' },
  Y: { letter: 'Y', meaning: 'Wisdom and introspection', trait: 'You are philosophical, analytical, and spiritual.' },
  Z: { letter: 'Z', meaning: 'Power and ambition', trait: 'You are efficient, determined, and success-oriented.' },
};

export function getCornerstoneMeaning(letter: string) {
  const upper = letter.toUpperCase();
  return CORNERSTONE_MEANINGS[upper] ?? { letter: upper, meaning: 'Unknown', trait: 'Unique and individual.' };
}
