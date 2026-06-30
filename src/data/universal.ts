export interface UniversalInterpretation {
  number: number;
  yearTheme: string;
  monthTheme: string;
  dayTheme: string;
}

export const UNIVERSAL_INTERPRETATIONS: Record<number, UniversalInterpretation> = {
  1: {
    number: 1,
    yearTheme: 'A year of global new beginnings. Innovation, leadership, and pioneering energy influence world events.',
    monthTheme: 'A month of fresh starts and initiative. Collective energy supports new ventures.',
    dayTheme: 'A day to take initiative. The collective energy supports leadership and action.',
  },
  2: {
    number: 2,
    yearTheme: 'A year of diplomacy and cooperation. Peace, partnerships, and harmony are global themes.',
    monthTheme: 'A month of cooperation and patience. Collective energy favors diplomacy.',
    dayTheme: 'A day for cooperation and patience. Collective energy supports harmony.',
  },
  3: {
    number: 3,
    yearTheme: 'A year of creative expression and social connection. Art, entertainment, and communication thrive.',
    monthTheme: 'A month of creativity and social joy. Collective energy supports expression.',
    dayTheme: 'A day for creativity and social connection. Express yourself.',
  },
  4: {
    number: 4,
    yearTheme: 'A year of building and structure. Hard work, organization, and practical progress define global trends.',
    monthTheme: 'A month of hard work and organization. Collective energy supports building.',
    dayTheme: 'A day for practical work and organization. Focus on foundations.',
  },
  5: {
    number: 5,
    yearTheme: 'A year of change and freedom. Travel, innovation, and progressive movements gain momentum.',
    monthTheme: 'A month of change and adventure. Collective energy supports freedom.',
    dayTheme: 'A day for change and exploration. Embrace the unexpected.',
  },
  6: {
    number: 6,
    yearTheme: 'A year of love and responsibility. Family, community, and service are global priorities.',
    monthTheme: 'A month of love and service. Collective energy supports nurturing.',
    dayTheme: 'A day for love and responsibility. Focus on family and community.',
  },
  7: {
    number: 7,
    yearTheme: 'A year of reflection and wisdom. Research, spirituality, and inner development are emphasized.',
    monthTheme: 'A month of reflection and study. Collective energy supports introspection.',
    dayTheme: 'A day for rest and reflection. Take time for inner work.',
  },
  8: {
    number: 8,
    yearTheme: 'A year of abundance and achievement. Economic focus, power shifts, and material progress.',
    monthTheme: 'A month of achievement and abundance. Collective energy supports success.',
    dayTheme: 'A day for achievement and progress. Take decisive action.',
  },
  9: {
    number: 9,
    yearTheme: 'A year of completion and transformation. Endings, humanitarian concerns, and global healing.',
    monthTheme: 'A month of completion and release. Collective energy supports letting go.',
    dayTheme: 'A day for completion and compassion. Practice forgiveness.',
  },
};
