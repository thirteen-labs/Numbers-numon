export const CAPSTONE_MEANINGS: Record<string, { letter: string; meaning: string; trait: string }> = {
  A: { letter: 'A', meaning: 'Innovation and leadership', trait: 'You leave a legacy of originality and courage.' },
  B: { letter: 'B', meaning: 'Sensitivity and intuition', trait: 'You leave a legacy of emotional depth and understanding.' },
  C: { letter: 'C', meaning: 'Creativity and communication', trait: 'You leave a legacy of inspiration and joy.' },
  D: { letter: 'D', meaning: 'Discipline and legacy', trait: 'You leave a legacy of structure and reliability.' },
  E: { letter: 'E', meaning: 'Freedom and adventure', trait: 'You leave a legacy of exploration and change.' },
  F: { letter: 'F', meaning: 'Love and responsibility', trait: 'You leave a legacy of care and community.' },
  G: { letter: 'G', meaning: 'Wisdom and analysis', trait: 'You leave a legacy of knowledge and insight.' },
  H: { letter: 'H', meaning: 'Ambition and achievement', trait: 'You leave a legacy of success and resourcefulness.' },
  I: { letter: 'I', meaning: 'Compassion and artistry', trait: 'You leave a legacy of beauty and empathy.' },
  J: { letter: 'J', meaning: 'Leadership and determination', trait: 'You leave a legacy of independence and strength.' },
  K: { letter: 'K', meaning: 'Diplomacy and balance', trait: 'You leave a legacy of peace and fairness.' },
  L: { letter: 'L', meaning: 'Creativity and expression', trait: 'You leave a legacy of art and inspiration.' },
  M: { letter: 'M', meaning: 'Practicality and reliability', trait: 'You leave a legacy of stability and hard work.' },
  N: { letter: 'N', meaning: 'Adaptability and progress', trait: 'You leave a legacy of change and innovation.' },
  O: { letter: 'O', meaning: 'Responsibility and spirituality', trait: 'You leave a legacy of service and wisdom.' },
  P: { letter: 'P', meaning: 'Wisdom and introspection', trait: 'You leave a legacy of depth and understanding.' },
  Q: { letter: 'Q', meaning: 'Innovation and individuality', trait: 'You leave a legacy of uniqueness and vision.' },
  R: { letter: 'R', meaning: 'Service and dedication', trait: 'You leave a legacy of love and responsibility.' },
  S: { letter: 'S', meaning: 'Leadership and charisma', trait: 'You leave a legacy of influence and inspiration.' },
  T: { letter: 'T', meaning: 'Cooperation and sensitivity', trait: 'You leave a legacy of harmony and connection.' },
  U: { letter: 'U', meaning: 'Creativity and expression', trait: 'You leave a legacy of art and communication.' },
  V: { letter: 'V', meaning: 'Discipline and determination', trait: 'You leave a legacy of order and integrity.' },
  W: { letter: 'W', meaning: 'Versatility and change', trait: 'You leave a legacy of adaptability and progress.' },
  X: { letter: 'X', meaning: 'Sensitivity and service', trait: 'You leave a legacy of compassion and care.' },
  Y: { letter: 'Y', meaning: 'Wisdom and philosophy', trait: 'You leave a legacy of insight and truth.' },
  Z: { letter: 'Z', meaning: 'Power and achievement', trait: 'You leave a legacy of success and efficiency.' },
};

export function getCapstoneMeaning(letter: string) {
  const upper = letter.toUpperCase();
  return CAPSTONE_MEANINGS[upper] ?? { letter: upper, meaning: 'Unknown', trait: 'Unique and individual.' };
}
