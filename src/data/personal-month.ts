export interface PersonalMonthInterpretation {
  number: number;
  focus: string;
  opportunities: string[];
  warnings: string[];
}

export const PERSONAL_MONTH_INTERPRETATIONS: Record<number, PersonalMonthInterpretation> = {
  1: {
    number: 1,
    focus: 'New beginnings and taking initiative',
    opportunities: ['Start new projects', 'Take the lead', 'Make decisions', 'Set intentions'],
    warnings: ['Don\'t be overly aggressive', 'Avoid impulsive choices', 'Remember to collaborate'],
  },
  2: {
    number: 2,
    focus: 'Cooperation and patience',
    opportunities: ['Build relationships', 'Practice diplomacy', 'Listen to intuition', 'Be patient'],
    warnings: ['Avoid codependency', 'Don\'t suppress your needs', 'Stay grounded in emotions'],
  },
  3: {
    number: 3,
    focus: 'Creativity and social connection',
    opportunities: ['Express yourself', 'Network socially', 'Enjoy life', 'Share your talents'],
    warnings: ['Don\'t overcommit socially', 'Avoid superficiality', 'Stay focused on priorities'],
  },
  4: {
    number: 4,
    focus: 'Hard work and organization',
    opportunities: ['Create systems', 'Build discipline', 'Organize your space', 'Work steadily'],
    warnings: ['Avoid rigidity', 'Don\'t overwork', 'Stay flexible'],
  },
  5: {
    number: 5,
    focus: 'Change and adventure',
    opportunities: ['Travel', 'Try new things', 'Embrace change', 'Meet new people'],
    warnings: ['Avoid reckless behavior', 'Don\'t escape responsibilities', 'Stay grounded'],
  },
  6: {
    number: 6,
    focus: 'Love and responsibility',
    opportunities: ['Nurture relationships', 'Help others', 'Create beauty', 'Serve your community'],
    warnings: ['Don\'t over-give', 'Avoid meddling', 'Set healthy boundaries'],
  },
  7: {
    number: 7,
    focus: 'Rest and reflection',
    opportunities: ['Study', 'Meditate', 'Spend time alone', 'Analyze your life'],
    warnings: ['Avoid isolation', 'Don\'t overthink', 'Stay connected to loved ones'],
  },
  8: {
    number: 8,
    focus: 'Achievement and abundance',
    opportunities: ['Pursue goals', 'Manage finances', 'Seek recognition', 'Lead projects'],
    warnings: ['Avoid workaholism', 'Don\'t neglect relationships', 'Balance power with compassion'],
  },
  9: {
    number: 9,
    focus: 'Completion and release',
    opportunities: ['Let go', 'Forgive', 'Complete projects', 'Practice gratitude'],
    warnings: ['Don\'t hold onto the past', 'Avoid resentment', 'Trust new beginnings'],
  },
};
