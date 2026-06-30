export interface EducationalTopic {
  id: string;
  title: string;
  category: 'history' | 'number-meanings' | 'master-numbers' | 'karmic-numbers' | 'calculation-methods' | 'symbolism' | 'faq';
  content: string;
}

export const EDUCATIONAL_CONTENT: EducationalTopic[] = [
  {
    id: 'history-intro',
    title: 'A Brief History of Numerology',
    category: 'history',
    content: 'Numerology is the ancient study of the spiritual significance of numbers. Its roots trace back thousands of years to the earliest civilizations. The Babylonian, Egyptian, and Hebrew traditions all contributed to its development. The Greek philosopher Pythagoras (570–495 BCE) is credited with formalizing the Western system of numerology. He believed that numbers were the building blocks of the universe and that each number had its own unique vibration and meaning. The Chinese, Indian, and Mayan civilizations also developed their own numerological systems, each with unique interpretations and applications.',
  },
  {
    id: 'history-pythagorean',
    title: 'The Pythagorean System',
    category: 'history',
    content: 'The Pythagorean system, also known as Western or Modern numerology, is the most widely used system today. It assigns numerical values to letters based on their position in the alphabet (A=1, B=2, ..., Z=8). Pythagoras believed that numbers from 1 to 9 each had distinct spiritual properties, and that master numbers 11, 22, and 33 carried higher vibrations. This system is used to calculate Life Path, Expression, Soul Urge, and other core numbers from a person\'s name and date of birth.',
  },
  {
    id: 'history-chaldean',
    title: 'The Chaldean System',
    category: 'history',
    content: 'The Chaldean system originated in ancient Babylon (modern-day Iraq) around 4000 BCE. It is considered by some to be older and more precise than the Pythagorean system. Unlike the Pythagorean system which assigns values sequentially, the Chaldean system assigns values based on the sound vibrations of letters. It only uses numbers 1–8 (9 is considered sacred and is not assigned). This system is particularly concerned with the name a person is known by, rather than their birth name.',
  },
  {
    id: 'number-1',
    title: 'The Number 1 — The Leader',
    category: 'number-meanings',
    content: 'Number 1 represents the initiating force, the individual, the self. It is the beginning of all things and carries the energy of leadership, independence, and originality. In tarot, it corresponds to The Magician. In astrology, it resonates with the Sun. People influenced by 1 are natural pioneers, inventors, and leaders. They are ambitious, creative, and determined. Their challenge is to avoid arrogance and to learn cooperation while maintaining their unique identity.',
  },
  {
    id: 'number-2',
    title: 'The Number 2 — The Peacemaker',
    category: 'number-meanings',
    content: 'Number 2 embodies balance, partnership, and receptivity. It is the energy of connection, diplomacy, and harmony. In tarot, it corresponds to The High Priestess. In astrology, it resonates with the Moon. People influenced by 2 are natural peacemakers, diplomats, and collaborators. They are sensitive, intuitive, and patient. Their challenge is to develop self-confidence and avoid becoming overly dependent on others.',
  },
  {
    id: 'number-3',
    title: 'The Number 3 — The Creative',
    category: 'number-meanings',
    content: 'Number 3 radiates creative expression, joy, and inspiration. It is the energy of communication, art, and social interaction. In tarot, it corresponds to The Empress. In astrology, it resonates with Jupiter. People influenced by 3 are natural communicators, artists, and entertainers. They are optimistic, charming, and imaginative. Their challenge is to develop focus and depth alongside their natural breadth of interests.',
  },
  {
    id: 'number-4',
    title: 'The Number 4 — The Builder',
    category: 'number-meanings',
    content: 'Number 4 represents structure, order, and solid foundation. It is the energy of hard work, discipline, and building lasting systems. In tarot, it corresponds to The Emperor. In astrology, it resonates with Uranus. People influenced by 4 are practical, reliable, and hardworking. They are the pillars of society who create stability through dedication. Their challenge is to remain flexible and open to change.',
  },
  {
    id: 'number-5',
    title: 'The Number 5 — The Adventurer',
    category: 'number-meanings',
    content: 'Number 5 vibrates with freedom, change, and adventure. It is the energy of experience, sensation, and progressive thinking. In tarot, it corresponds to The Hierophant. In astrology, it resonates with Mercury. People influenced by 5 are versatile, curious, and freedom-loving. They thrive on variety and new experiences. Their challenge is to find stability and commitment without feeling trapped.',
  },
  {
    id: 'number-6',
    title: 'The Number 6 — The Nurturer',
    category: 'number-meanings',
    content: 'Number 6 represents love, responsibility, and domestic harmony. It is the energy of nurturing, service, and healing. In tarot, it corresponds to The Lovers. In astrology, it resonates with Venus. People influenced by 6 are caring, responsible, and community-minded. They find fulfillment in supporting others. Their challenge is to balance caring for others with caring for themselves.',
  },
  {
    id: 'number-7',
    title: 'The Number 7 — The Seeker',
    category: 'number-meanings',
    content: 'Number 7 is the seeker of truth, wisdom, and spiritual understanding. It is the energy of analysis, introspection, and the search for hidden knowledge. In tarot, it corresponds to The Chariot. In astrology, it resonates with Neptune. People influenced by 7 are analytical, wise, and spiritual. They delve beneath the surface of life. Their challenge is to stay connected to others while pursuing their inner journey.',
  },
  {
    id: 'number-8',
    title: 'The Number 8 — The Achiever',
    category: 'number-meanings',
    content: 'Number 8 represents power, abundance, and material success. It is the energy of authority, organization, and achievement. In tarot, it corresponds to Strength. In astrology, it resonates with Saturn. People influenced by 8 are ambitious, efficient, and visionary. They understand how to build wealth and influence. Their challenge is to balance material success with spiritual fulfillment.',
  },
  {
    id: 'number-9',
    title: 'The Number 9 — The Humanitarian',
    category: 'number-meanings',
    content: 'Number 9 embodies universal love, compassion, and artistic genius. It is the energy of completion, wisdom, and humanitarian service. In tarot, it corresponds to The Hermit. In astrology, it resonates with Mars. People influenced by 9 are compassionate, generous, and idealistic. They work for the greater good. Their challenge is to practice letting go and to maintain healthy boundaries.',
  },
  {
    id: 'master-numbers',
    title: 'Master Numbers 11, 22, and 33',
    category: 'master-numbers',
    content: 'Master numbers are the only numbers that are not reduced to a single digit in numerology. They carry higher spiritual vibrations and greater potential — along with greater challenges. Master Number 11 (The Illuminator) represents intuition, inspiration, and spiritual insight. Master Number 22 (The Master Builder) combines vision with practicality to manifest grand dreams. Master Number 33 (The Master Teacher) embodies unconditional love and spiritual teaching at the highest level. Those with master numbers face intense pressure to live up to their potential but are capable of extraordinary achievements.',
  },
  {
    id: 'karmic-debt',
    title: 'Karmic Debt Numbers 13, 14, 16, and 19',
    category: 'karmic-numbers',
    content: 'Karmic Debt numbers indicate lessons carried over from past lives that need to be addressed in this lifetime. These numbers appear in core calculations and signal areas that require special attention. Number 13 represents the debt of laziness — learning to work hard and complete tasks. Number 14 represents the debt of indulgence — learning moderation and self-control. Number 16 represents the debt of ego — learning humility and rebuilding after downfall. Number 19 represents the debt of selfishness — learning to serve others and share resources.',
  },
  {
    id: 'calculation-life-path',
    title: 'How to Calculate Your Life Path Number',
    category: 'calculation-methods',
    content: 'Your Life Path number is the most important number in your numerology chart. It represents the path you are meant to walk in this lifetime. To calculate it: 1) Write your full date of birth as numbers (MM/DD/YYYY). 2) Reduce each component (month, day, year) to a single digit or master number. 3) Add those three numbers together. 4) Reduce the total to a single digit or master number. For example, December 25, 1989: Month (12 → 1+2 = 3), Day (25 → 2+5 = 7), Year (1989 → 1+9+8+9 = 27 → 2+7 = 9). Then 3+7+9 = 19 → 1+9 = 10 → 1+0 = 1. Life Path is 1.',
  },
  {
    id: 'calculation-expression',
    title: 'How to Calculate Your Expression Number',
    category: 'calculation-methods',
    content: 'Your Expression (Destiny) number reveals your natural talents, abilities, and potential. It is calculated from your full birth name as recorded on your birth certificate. Using the Pythagorean chart (A=1, B=2, ..., Z=8), assign a number to each letter in your full name. Add the numbers for each name separately, reduce each to a single digit or master number, then add those totals together and reduce again. This number represents the person you are meant to become and the gifts you bring to the world.',
  },
  {
    id: 'calculation-soul-urge',
    title: 'How to Calculate Your Soul Urge Number',
    category: 'calculation-methods',
    content: 'Your Soul Urge (Heart\'s Desire) number reveals your inner motivations, hidden dreams, and what truly fulfills you. It is calculated using only the vowels in your full birth name (A, E, I, O, U, and sometimes Y when it makes a vowel sound). Assign numbers to each vowel using the Pythagorean chart, add them, and reduce to a single digit or master number. This number reveals what your soul truly yearns for beneath the surface of your daily life.',
  },
  {
    id: 'symbolism-numbers',
    title: 'The Symbolism of Numbers',
    category: 'symbolism',
    content: 'Throughout history, numbers have carried deep symbolic meaning across cultures. One represents unity and creation. Two represents duality and balance. Three represents the trinity and harmony. Four represents stability and the elements. Five represents change and the human senses. Six represents beauty and harmony. Seven represents spiritual perfection and divine rest. Eight represents rebirth and infinity. Nine represents completion and universal love. These universal symbols appear in religion, mythology, art, and architecture across all civilizations.',
  },
  {
    id: 'faq-accuracy',
    title: 'How Accurate is Numerology?',
    category: 'faq',
    content: 'Numerology is a tool for self-reflection and personal growth, not a predictive science. Its accuracy depends on how honestly you apply its insights to your life. Many people find that their core numbers accurately describe their personality, strengths, and challenges. The value of numerology lies not in predicting the future but in providing a framework for understanding yourself and your life patterns. The most accurate readings come from combining multiple numbers and interpretations to form a complete picture.',
  },
  {
    id: 'faq-master-numbers',
    title: 'What If I Have a Master Number?',
    category: 'faq',
    content: 'Master numbers (11, 22, 33) are not reduced to a single digit. They carry higher spiritual potential and greater challenges. If you have a master number, you are considered an "old soul" with significant spiritual work to do. However, you may also struggle with the intensity of the energy. Some numerologists suggest that if you are not ready to embody the master number, you can reduce it to its base number (11→2, 22→4, 33→6) and work with that vibration until you are ready for the higher path.',
  },
  {
    id: 'faq-name-change',
    title: 'What Happens If I Change My Name?',
    category: 'faq',
    content: 'In numerology, your birth name carries your core destiny. However, if you change your name through marriage, adoption, or personal choice, the new name creates an additional influence. Some numerologists consider your birth name your "destiny potential" and your current legal name your "active expression." A nickname or chosen name can also be analyzed for its influence. Many people find that their chosen name reflects the person they have grown into.',
  },
  {
    id: 'faq-which-system',
    title: 'Which Numerology System Should I Use?',
    category: 'faq',
    content: 'The Pythagorean system is the most commonly used and is recommended for beginners. It is systematic, well-documented, and widely taught. The Chaldean system is considered by some to be more precise but is also more complex and has fewer resources available. Many numerologists recommend starting with Pythagorean and exploring Chaldean after you have a solid foundation. Both systems can provide valuable insights, and many professionals incorporate elements of both.',
  },
];
