export const AFFIRMATIONS_BY_NUMBER: Record<number, string[]> = {
  1: [
    'I am a natural leader and inspire others through my courage.',
    'I trust my unique path and follow my own truth.',
    'My independence is my strength, and I use it wisely.',
    'I have the power to create my reality.',
    'I am confident, capable, and courageous.',
  ],
  2: [
    'I am worthy of love and respect exactly as I am.',
    'I trust my intuition and honor my feelings.',
    'Peace begins with me, and I choose harmony.',
    'I balance giving and receiving with grace.',
    'My sensitivity is my superpower.',
  ],
  3: [
    'My creative expression brings joy to the world.',
    'I speak my truth with confidence and love.',
    'I am worthy of celebration and abundance.',
    'My optimism opens doors of opportunity.',
    'I express myself authentically and fearlessly.',
  ],
  4: [
    'I build my life on a foundation of love and integrity.',
    'My hard work creates lasting results.',
    'I am worthy of stability and abundance.',
    'I embrace change while honoring my need for order.',
    'My discipline is a gift that serves my highest good.',
  ],
  5: [
    'I embrace change as a path to growth.',
    'Freedom is my birthright, and I use it wisely.',
    'I adapt to life with courage and grace.',
    'Every experience is an opportunity to learn.',
    'I am free to create the life I desire.',
  ],
  6: [
    'I give love freely and receive love openly.',
    'I care for myself as deeply as I care for others.',
    'My love heals and transforms.',
    'I create harmony in my home and heart.',
    'I am worthy of unconditional love.',
  ],
  7: [
    'I trust my inner wisdom completely.',
    'My solitude is sacred and replenishing.',
    'I am open to spiritual truth and understanding.',
    'My analytical mind serves my highest good.',
    'I am deeply connected to universal wisdom.',
  ],
  8: [
    'I am worthy of unlimited abundance.',
    'I use my power with integrity and compassion.',
    'Success flows to me naturally and effortlessly.',
    'I balance material success with spiritual fulfillment.',
    'My prosperity serves the greater good.',
  ],
  9: [
    'I release what no longer serves me with love.',
    'My compassion changes the world.',
    'I am connected to all beings in universal love.',
    'Forgiveness sets me free.',
    'I am a channel of divine love and healing.',
  ],
  11: [
    'I am a channel for divine inspiration.',
    'My intuition guides me perfectly.',
    'I illuminate the path for others with my light.',
    'I trust the spiritual gifts I carry.',
    'I am grounded and spiritually connected.',
  ],
  22: [
    'I manifest my dreams into reality.',
    'My vision serves the highest good of all.',
    'I build structures that benefit humanity.',
    'I am a master builder of my destiny.',
    'My power is grounded in love and wisdom.',
  ],
  33: [
    'I embody unconditional love in all I do.',
    'My presence heals and uplifts others.',
    'I am a master teacher of divine love.',
    'I serve humanity through compassion and wisdom.',
    'My life is a blessing to the world.',
  ],
};

export function getDailyAffirmation(number: number): string {
  const affirmations = AFFIRMATIONS_BY_NUMBER[number] ?? AFFIRMATIONS_BY_NUMBER[1]!;
  const dayIndex = new Date().getDate();
  return affirmations[dayIndex % affirmations.length]!;
}
