export interface LuckyDays {
  weekdays: string[];
  dates: number[];
  explanation: string;
}

export const LUCKY_DAYS: Record<number, LuckyDays> = {
  1: {
    weekdays: ['Sunday', 'Monday'],
    dates: [1, 10, 19, 28],
    explanation: 'Days that resonate with leadership and new beginnings amplify your natural initiative.',
  },
  2: {
    weekdays: ['Monday', 'Friday'],
    dates: [2, 11, 20, 29],
    explanation: 'Days that favor cooperation and harmony enhance your diplomatic nature.',
  },
  3: {
    weekdays: ['Thursday', 'Friday'],
    dates: [3, 12, 21, 30],
    explanation: 'Days of creative expression boost your communication and artistic abilities.',
  },
  4: {
    weekdays: ['Saturday', 'Sunday'],
    dates: [4, 13, 22, 31],
    explanation: 'Days of structure and discipline support your practical efforts.',
  },
  5: {
    weekdays: ['Wednesday', 'Friday'],
    dates: [5, 14, 23],
    explanation: 'Days of change and adventure align with your free-spirited nature.',
  },
  6: {
    weekdays: ['Tuesday', 'Thursday'],
    dates: [6, 15, 24],
    explanation: 'Days of love and harmony amplify your nurturing abilities.',
  },
  7: {
    weekdays: ['Saturday', 'Monday'],
    dates: [7, 16, 25],
    explanation: 'Days of introspection and wisdom enhance your spiritual connection.',
  },
  8: {
    weekdays: ['Saturday', 'Tuesday'],
    dates: [8, 17, 26],
    explanation: 'Days of power and achievement support your ambitious goals.',
  },
  9: {
    weekdays: ['Tuesday', 'Thursday'],
    dates: [9, 18, 27],
    explanation: 'Days of compassion and completion serve your humanitarian spirit.',
  },
};
