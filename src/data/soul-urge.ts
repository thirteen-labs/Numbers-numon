export interface SoulUrgeInterpretation {
  number: number;
  title: string;
  innerDesire: string;
  emotionalMotivation: string;
  hiddenDreams: string;
  personalFulfillment: string;
}

export const SOUL_URGE_INTERPRETATIONS: Record<number, SoulUrgeInterpretation> = {
  1: {
    number: 1,
    title: 'The Independent Spirit',
    innerDesire: 'To be first, to lead, to stand out as a unique individual. You deeply desire to express your originality and make your mark on the world.',
    emotionalMotivation: 'You are motivated by the need for recognition and personal achievement. Your emotions are driven by your sense of identity and self-worth.',
    hiddenDreams: 'To be remembered as a pioneer, to create something entirely new, to be respected for your unique contributions.',
    personalFulfillment: 'Fulfillment comes when you have the courage to follow your own path and express your authentic self without apology.',
  },
  2: {
    number: 2,
    title: 'The Harmonious Partner',
    innerDesire: 'To love and be loved, to create harmonious relationships, to find peace through connection with others.',
    emotionalMotivation: 'You are motivated by the need for emotional connection and belonging. Your emotions are deeply affected by the harmony of your relationships.',
    hiddenDreams: 'To find your soulmate, to create a peaceful home, to be valued for your sensitivity and support.',
    personalFulfillment: 'Fulfillment comes through deep, meaningful relationships and creating peace wherever you go.',
  },
  3: {
    number: 3,
    title: 'The Creative Communicator',
    innerDesire: 'To express yourself creatively, to be heard, to inspire joy and optimism in others through your unique voice.',
    emotionalMotivation: 'You are motivated by the need for self-expression and social connection. Your emotions flow through creative channels.',
    hiddenDreams: 'To be celebrated for your creative talents, to move people with your words or art, to live a joyful expressive life.',
    personalFulfillment: 'Fulfillment comes when you share your creative gifts freely and inspire others through your expression.',
  },
  4: {
    number: 4,
    title: 'The Solid Foundation',
    innerDesire: 'To build something lasting, to create order from chaos, to feel secure and established in all areas of life.',
    emotionalMotivation: 'You are motivated by the need for stability and control. Your emotions are grounded in practical realities.',
    hiddenDreams: 'To own a beautiful home, to build a secure future, to be known as reliable and trustworthy.',
    personalFulfillment: 'Fulfillment comes through creating lasting structures, whether physical, financial, or relational.',
  },
  5: {
    number: 5,
    title: 'The Free Spirit',
    innerDesire: 'To be free, to experience everything life has to offer, to break all limitations and explore the unknown.',
    emotionalMotivation: 'You are motivated by the need for freedom and variety. Your emotions respond to new experiences and change.',
    hiddenDreams: 'To travel the world, to live without restrictions, to experience life in all its fullness.',
    personalFulfillment: 'Fulfillment comes when you have the freedom to explore, experience, and expand your horizons.',
  },
  6: {
    number: 6,
    title: 'The Loving Caregiver',
    innerDesire: 'To love unconditionally, to nurture and protect, to create beauty and harmony in your home and community.',
    emotionalMotivation: 'You are motivated by the need to serve and care for others. Your emotions are deeply invested in the wellbeing of loved ones.',
    hiddenDreams: 'To have a beautiful family, to create a warm home, to be remembered for your love and generosity.',
    personalFulfillment: 'Fulfillment comes through loving service and creating harmony in your relationships and surroundings.',
  },
  7: {
    number: 7,
    title: 'The Truth Seeker',
    innerDesire: 'To understand the mysteries of life, to find truth, to gain wisdom and spiritual insight.',
    emotionalMotivation: 'You are motivated by the need for knowledge and understanding. Your emotions are refined through introspection.',
    hiddenDreams: 'To discover profound truths, to master a field of knowledge, to achieve spiritual enlightenment.',
    personalFulfillment: 'Fulfillment comes through deep understanding, spiritual insight, and the pursuit of wisdom.',
  },
  8: {
    number: 8,
    title: 'The Power Achiever',
    innerDesire: 'To achieve great success, to gain recognition and authority, to master the material world.',
    emotionalMotivation: 'You are motivated by the need for achievement and recognition. Your emotions are tied to your accomplishments.',
    hiddenDreams: 'To be wealthy and influential, to be respected as a leader, to leave a legacy of success.',
    personalFulfillment: 'Fulfillment comes through achieving your goals and using your power and resources wisely.',
  },
  9: {
    number: 9,
    title: 'The Universal Lover',
    innerDesire: 'To serve humanity, to make a difference in the world, to experience universal love and understanding.',
    emotionalMotivation: 'You are motivated by compassion and the desire to help others. Your emotions are broad and inclusive.',
    hiddenDreams: 'To change the world, to be a force for good, to leave humanity better than you found it.',
    personalFulfillment: 'Fulfillment comes through selfless service and contributing to the greater good of all humanity.',
  },
  11: {
    number: 11,
    title: 'The Spiritual Messenger',
    innerDesire: 'To illuminate and inspire, to channel higher wisdom, to fulfill a spiritual mission.',
    emotionalMotivation: 'You are motivated by spiritual calling and intuitive knowing. Your emotions are highly sensitive and attuned to higher realms.',
    hiddenDreams: 'To be a spiritual teacher, to inspire masses, to bring light to darkness.',
    personalFulfillment: 'Fulfillment comes through spiritual service and using your gifts to elevate consciousness.',
  },
  22: {
    number: 22,
    title: 'The World Transformer',
    innerDesire: 'To build something of lasting value, to manifest visions into reality, to serve humanity on a grand scale.',
    emotionalMotivation: 'You are motivated by the desire to create large-scale positive change. Your emotions are powered by your grand vision.',
    hiddenDreams: 'To build an empire of good, to transform society, to leave a permanent mark on the world.',
    personalFulfillment: 'Fulfillment comes when you manifest your vision into practical reality that serves humanity.',
  },
  33: {
    number: 33,
    title: 'The Divine Healer',
    innerDesire: 'To heal and teach through unconditional love, to raise consciousness, to embody divine love.',
    emotionalMotivation: 'You are motivated by pure love and the desire to uplift all beings. Your emotions are channels of divine compassion.',
    hiddenDreams: 'To heal humanity, to teach universal love, to be an instrument of divine peace.',
    personalFulfillment: 'Fulfillment comes through being a vessel of divine love and healing the world through your presence.',
  },
};
