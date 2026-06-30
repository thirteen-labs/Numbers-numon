export interface ZodiacAnimal {
  animal: string;
  years: number[];
  element: string;
  personality: string[];
  careers: string[];
  love: string;
  health: string;
  luckyColors: string[];
  luckyNumbers: number[];
  luckyDays: string[];
  compatibleWith: string[];
  enemySigns: string[];
}

export const CHINESE_ZODIAC: Record<string, ZodiacAnimal> = {
  rat: {
    animal: 'Rat',
    years: [1912, 1924, 1936, 1948, 1960, 1972, 1984, 1996, 2008, 2020, 2032],
    element: 'Water',
    personality: ['Quick-witted', 'Resourceful', 'Versatile', 'Kind', 'Curious'],
    careers: ['Writer', 'Researcher', 'Designer', 'Salesperson', 'Manager'],
    love: 'Passionate and romantic but may be possessive. Best matched with Dragon or Monkey.',
    health: 'Prone to stress-related issues. Regular exercise and meditation recommended.',
    luckyColors: ['Blue', 'Gold', 'Green'],
    luckyNumbers: [2, 3, 8],
    luckyDays: ['4th', '7th', '13th'],
    compatibleWith: ['dragon', 'monkey'],
    enemySigns: ['horse'],
  },
  ox: {
    animal: 'Ox',
    years: [1913, 1925, 1937, 1949, 1961, 1973, 1985, 1997, 2009, 2021, 2033],
    element: 'Earth',
    personality: ['Diligent', 'Dependable', 'Strong', 'Determined', 'Honest'],
    careers: ['Architect', 'Engineer', 'Farmer', 'Doctor', 'Military'],
    love: 'Loyal and devoted partner. Best matched with Rat or Snake.',
    health: 'Generally strong but prone to overwork. Rest is essential.',
    luckyColors: ['Yellow', 'Green', 'White'],
    luckyNumbers: [1, 4, 9],
    luckyDays: ['5th', '8th', '17th'],
    compatibleWith: ['rat', 'snake'],
    enemySigns: ['goat'],
  },
  tiger: {
    animal: 'Tiger',
    years: [1914, 1926, 1938, 1950, 1962, 1974, 1986, 1998, 2010, 2022, 2034],
    element: 'Wood',
    personality: ['Brave', 'Confident', 'Charismatic', 'Competitive', 'Generous'],
    careers: ['Entrepreneur', 'Military', 'Athlete', 'Actor', 'Explorer'],
    love: 'Intense and passionate. Best matched with Horse or Dragon.',
    health: 'Prone to accidents and injuries. Need to practice caution.',
    luckyColors: ['Orange', 'Blue', 'Grey'],
    luckyNumbers: [1, 3, 4],
    luckyDays: ['7th', '10th', '17th'],
    compatibleWith: ['horse', 'dragon'],
    enemySigns: ['monkey'],
  },
  rabbit: {
    animal: 'Rabbit',
    years: [1915, 1927, 1939, 1951, 1963, 1975, 1987, 1999, 2011, 2023, 2035],
    element: 'Wood',
    personality: ['Gentle', 'Elegant', 'Kind', 'Responsible', 'Artistic'],
    careers: ['Artist', 'Diplomat', 'Judge', 'Designer', 'Librarian'],
    love: 'Romantic and devoted. Best matched with Goat or Pig.',
    health: 'Sensitive health. Need peaceful environment and proper diet.',
    luckyColors: ['Red', 'Pink', 'Purple'],
    luckyNumbers: [3, 6, 9],
    luckyDays: ['2nd', '6th', '12th'],
    compatibleWith: ['goat', 'pig'],
    enemySigns: ['rooster'],
  },
  dragon: {
    animal: 'Dragon',
    years: [1916, 1928, 1940, 1952, 1964, 1976, 1988, 2000, 2012, 2024, 2036],
    element: 'Earth',
    personality: ['Confident', 'Intelligent', 'Enthusiastic', 'Charismatic', 'Ambitious'],
    careers: ['CEO', 'Artist', 'Politician', 'Inventor', 'Entertainer'],
    love: 'Passionate and protective. Best matched with Rat or Monkey.',
    health: 'Generally strong but prone to stress. Need relaxation.',
    luckyColors: ['Gold', 'Silver', 'Yellow'],
    luckyNumbers: [1, 6, 7],
    luckyDays: ['1st', '7th', '11th'],
    compatibleWith: ['rat', 'monkey'],
    enemySigns: ['dog'],
  },
  snake: {
    animal: 'Snake',
    years: [1917, 1929, 1941, 1953, 1965, 1977, 1989, 2001, 2013, 2025, 2037],
    element: 'Fire',
    personality: ['Wise', 'Mysterious', 'Intuitive', 'Elegant', 'Philosophical'],
    careers: ['Philosopher', 'Psychologist', 'Researcher', 'Writer', 'Investor'],
    love: 'Deeply passionate and private. Best matched with Ox or Rooster.',
    health: 'Generally good but prone to digestive issues.',
    luckyColors: ['Red', 'Black', 'Green'],
    luckyNumbers: [2, 8, 9],
    luckyDays: ['1st', '8th', '15th'],
    compatibleWith: ['ox', 'rooster'],
    enemySigns: ['pig'],
  },
  horse: {
    animal: 'Horse',
    years: [1918, 1930, 1942, 1954, 1966, 1978, 1990, 2002, 2014, 2026, 2038],
    element: 'Fire',
    personality: ['Energetic', 'Independent', 'Adventurous', 'Warm-hearted', 'Witty'],
    careers: ['Athlete', 'Traveler', 'Salesperson', 'Journalist', 'Performer'],
    love: 'Passionate but needs freedom. Best matched with Tiger or Goat.',
    health: 'Energetic but prone to burnout. Need rest and balance.',
    luckyColors: ['Green', 'Yellow', 'Purple'],
    luckyNumbers: [2, 3, 7],
    luckyDays: ['5th', '8th', '14th'],
    compatibleWith: ['tiger', 'goat'],
    enemySigns: ['rat'],
  },
  goat: {
    animal: 'Goat',
    years: [1919, 1931, 1943, 1955, 1967, 1979, 1991, 2003, 2015, 2027, 2039],
    element: 'Earth',
    personality: ['Creative', 'Gentle', 'Compassionate', 'Artistic', 'Peaceful'],
    careers: ['Artist', 'Musician', 'Designer', 'Teacher', 'Nurse'],
    love: 'Romantic and devoted. Best matched with Rabbit or Horse.',
    health: 'Delicate health. Need peaceful environment and proper diet.',
    luckyColors: ['Brown', 'Red', 'Purple'],
    luckyNumbers: [2, 5, 7],
    luckyDays: ['4th', '9th', '16th'],
    compatibleWith: ['rabbit', 'horse'],
    enemySigns: ['ox'],
  },
  monkey: {
    animal: 'Monkey',
    years: [1920, 1932, 1944, 1956, 1968, 1980, 1992, 2004, 2016, 2028, 2040],
    element: 'Metal',
    personality: ['Witty', 'Inventive', 'Curious', 'Social', 'Clever'],
    careers: ['Scientist', 'Inventor', 'Comedian', 'Writer', 'Trader'],
    love: 'Charming and playful. Best matched with Rat or Dragon.',
    health: 'Energetic but prone to minor ailments. Need regular checkups.',
    luckyColors: ['White', 'Blue', 'Gold'],
    luckyNumbers: [1, 7, 8],
    luckyDays: ['6th', '11th', '18th'],
    compatibleWith: ['rat', 'dragon'],
    enemySigns: ['tiger'],
  },
  rooster: {
    animal: 'Rooster',
    years: [1921, 1933, 1945, 1957, 1969, 1981, 1993, 2005, 2017, 2029, 2041],
    element: 'Metal',
    personality: ['Observant', 'Hardworking', 'Courageous', 'Tidy', 'Confident'],
    careers: ['Manager', 'Journalist', 'Chef', 'Soldier', 'Teacher'],
    love: 'Faithful but demanding. Best matched with Ox or Snake.',
    health: 'Generally healthy but prone to respiratory issues.',
    luckyColors: ['Gold', 'Brown', 'Yellow'],
    luckyNumbers: [5, 7, 8],
    luckyDays: ['6th', '10th', '17th'],
    compatibleWith: ['ox', 'snake'],
    enemySigns: ['rabbit'],
  },
  dog: {
    animal: 'Dog',
    years: [1922, 1934, 1946, 1958, 1970, 1982, 1994, 2006, 2018, 2030, 2042],
    element: 'Earth',
    personality: ['Loyal', 'Honest', 'Kind', 'Protective', 'Reliable'],
    careers: ['Judge', 'Teacher', 'Doctor', 'Social Worker', 'Police'],
    love: 'Faithful and devoted. Best matched with Tiger or Rabbit.',
    health: 'Prone to anxiety and stress. Need regular exercise.',
    luckyColors: ['Green', 'Red', 'Purple'],
    luckyNumbers: [3, 4, 9],
    luckyDays: ['7th', '12th', '19th'],
    compatibleWith: ['tiger', 'rabbit'],
    enemySigns: ['dragon'],
  },
  pig: {
    animal: 'Pig',
    years: [1923, 1935, 1947, 1959, 1971, 1983, 1995, 2007, 2019, 2031, 2043],
    element: 'Water',
    personality: ['Generous', 'Compassionate', 'Diligent', 'Honest', 'Optimistic'],
    careers: ['Artist', 'Chef', 'Philanthropist', 'Designer', 'Entertainer'],
    love: 'Romantic and devoted. Best matched with Rabbit or Goat.',
    health: 'Prone to overindulgence. Need balanced diet and exercise.',
    luckyColors: ['Yellow', 'Grey', 'Blue'],
    luckyNumbers: [2, 5, 8],
    luckyDays: ['3rd', '8th', '15th'],
    compatibleWith: ['rabbit', 'goat'],
    enemySigns: ['snake'],
  },
};

export function getZodiacAnimal(year: number): string | null {
  for (const [key, animal] of Object.entries(CHINESE_ZODIAC)) {
    if (animal.years.includes(year)) return key;
  }
  return null;
}

export function getZodiacElement(year: number): string {
  const elements = ['Wood', 'Fire', 'Earth', 'Metal', 'Water'];
  const index = Math.floor((year - 4) % 10 / 2);
  return elements[index];
}
