export interface PersonalityInterpretation {
  number: number;
  title: string;
  firstImpressions: string;
  publicPersona: string;
  communicationStyle: string;
  socialImage: string;
}

export const PERSONALITY_INTERPRETATIONS: Record<number, PersonalityInterpretation> = {
  1: {
    number: 1,
    title: 'The Confident Leader',
    firstImpressions: 'You appear confident, self-assured, and capable. People immediately sense your leadership qualities and independent nature. You may come across as strong-willed or even intimidating.',
    publicPersona: 'The world sees you as a pioneer who takes charge and isn\'t afraid to go against the grain. You project an image of strength and determination.',
    communicationStyle: 'Direct, assertive, and commanding. You speak with authority and expect to be heard. You don\'t waste words.',
    socialImage: 'People see you as a natural leader who is ambitious and goal-oriented. You may be perceived as competitive or dominant.',
  },
  2: {
    number: 2,
    title: 'The Gentle Diplomat',
    firstImpressions: 'You appear warm, approachable, and sensitive. People feel comfortable opening up to you. You may come across as shy or reserved at first.',
    publicPersona: 'The world sees you as a peacemaker who avoids conflict and seeks harmony. You project an image of cooperation and grace.',
    communicationStyle: 'Tactful, diplomatic, and considerate. You choose your words carefully to maintain harmony and avoid offense.',
    socialImage: 'People see you as a supportive friend and team player. You may be perceived as too passive or overly accommodating.',
  },
  3: {
    number: 3,
    title: 'The Charismatic Communicator',
    firstImpressions: 'You appear charming, friendly, and immediately likeable. People are drawn to your magnetic personality and positive energy.',
    publicPersona: 'The world sees you as a creative, expressive individual who brings joy and inspiration. You project an image of optimism and enthusiasm.',
    communicationStyle: 'Expressive, animated, and engaging. You have a gift with words and can charm any audience.',
    socialImage: 'People see you as the life of the party, creative, and fun. You may be perceived as superficial or scattered.',
  },
  4: {
    number: 4,
    title: 'The Solid Citizen',
    firstImpressions: 'You appear serious, reliable, and trustworthy. People immediately sense your dependability and practical nature.',
    publicPersona: 'The world sees you as a hard worker who values order and stability. You project an image of discipline and responsibility.',
    communicationStyle: 'Straightforward, factual, and no-nonsense. You say what you mean and mean what you say.',
    socialImage: 'People see you as dependable, honest, and loyal. You may be perceived as rigid or overly serious.',
  },
  5: {
    number: 5,
    title: 'The Magnetic Adventurer',
    firstImpressions: 'You appear energetic, dynamic, and exciting. People are intrigued by your adventurous spirit and zest for life.',
    publicPersona: 'The world sees you as a free spirit who embraces change and lives life to the fullest. You project an image of versatility and adaptability.',
    communicationStyle: 'Charismatic, persuasive, and engaging. You can talk to anyone about anything with enthusiasm.',
    socialImage: 'People see you as exciting, versatile, and fun-loving. You may be perceived as unreliable or restless.',
  },
  6: {
    number: 6,
    title: 'The Responsible Caregiver',
    firstImpressions: 'You appear warm, nurturing, and trustworthy. People feel safe and cared for in your presence.',
    publicPersona: 'The world sees you as a responsible, community-minded individual who puts others first. You project an image of love and service.',
    communicationStyle: 'Warm, supportive, and advisory. You speak with compassion and often give thoughtful advice.',
    socialImage: 'People see you as a natural caretaker, counselor, and mentor. You may be perceived as interfering or overbearing.',
  },
  7: {
    number: 7,
    title: 'The Mysterious Intellectual',
    firstImpressions: 'You appear reserved, thoughtful, and somewhat mysterious. People sense your depth and intelligence immediately.',
    publicPersona: 'The world sees you as a wise, analytical person who values knowledge and truth. You project an image of dignity and discernment.',
    communicationStyle: 'Reserved, precise, and thoughtful. You speak only when you have something meaningful to say.',
    socialImage: 'People see you as intelligent, trustworthy, and deep. You may be perceived as aloof, distant, or critical.',
  },
  8: {
    number: 8,
    title: 'The Powerful Executive',
    firstImpressions: 'You appear authoritative, capable, and commanding. People immediately recognize your executive presence.',
    publicPersona: 'The world sees you as a successful, ambitious person who gets things done. You project an image of power and competence.',
    communicationStyle: 'Direct, commanding, and efficient. You speak with authority and expect results.',
    socialImage: 'People see you as a natural executive, leader, and achiever. You may be perceived as intimidating or materialistic.',
  },
  9: {
    number: 9,
    title: 'The Compassionate Visionary',
    firstImpressions: 'You appear warm, wise, and somewhat idealistic. People sense your depth and compassion immediately.',
    publicPersona: 'The world sees you as a humanitarian with a global perspective. You project an image of tolerance, wisdom, and artistic sensitivity.',
    communicationStyle: 'Inspirational, persuasive, and heartfelt. You speak from the heart and inspire others with your vision.',
    socialImage: 'People see you as compassionate, artistic, and wise. You may be perceived as overly dramatic or impractical.',
  },
};
