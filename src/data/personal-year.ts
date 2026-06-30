export interface PersonalYearInterpretation {
  number: number;
  overallTheme: string;
  love: string;
  career: string;
  finance: string;
  health: string;
  bestActions: string[];
}

export const PERSONAL_YEAR_INTERPRETATIONS: Record<number, PersonalYearInterpretation> = {
  1: {
    number: 1,
    overallTheme: 'New beginnings, independence, and fresh starts. This is a year to take initiative and plant seeds for the next 9-year cycle.',
    love: 'A year of new romantic possibilities. If single, you may meet someone new. If attached, rediscover your partner.',
    career: 'Start new projects, pursue promotions, or launch a business. Your leadership will be recognized.',
    finance: 'A year to establish new financial habits and begin new investments.',
    health: 'Focus on building new healthy routines. Energy is high for starting fitness programs.',
    bestActions: ['Start something new', 'Take calculated risks', 'Assert your independence', 'Set clear goals'],
  },
  2: {
    number: 2,
    overallTheme: 'Patience, cooperation, and relationships. This is a year of partnership and slow, steady growth.',
    love: 'Relationships take center stage. Deepen existing bonds or attract a meaningful partnership.',
    career: 'Collaborate with others. Teamwork and diplomacy will bring better results than going alone.',
    finance: 'A year for careful financial planning rather than major moves.',
    health: 'Focus on emotional health and stress management. Gentle exercise like yoga or walking.',
    bestActions: ['Build partnerships', 'Practice patience', 'Develop your intuition', 'Create harmony'],
  },
  3: {
    number: 3,
    overallTheme: 'Creativity, self-expression, and joy. This is a year to share your talents and celebrate life.',
    love: 'A fun, social year for love. Enjoy dating, romance, and creative expression with your partner.',
    career: 'Your creative skills shine. Speak, write, present, and share your ideas publicly.',
    finance: 'Good year for creative income streams. Be mindful of overspending on social activities.',
    health: 'Focus on mental health and creative expression as therapy.',
    bestActions: ['Express yourself creatively', 'Socialize and network', 'Travel and explore', 'Have fun'],
  },
  4: {
    number: 4,
    overallTheme: 'Hard work, discipline, and building foundations. This is a year for structure and organization.',
    love: 'Relationships require effort and commitment. Build a solid foundation with your partner.',
    career: 'Focus on practical goals and systematic progress. Your hard work will create lasting results.',
    finance: 'A year to budget, save, and build financial security.',
    health: 'Establish consistent health routines. Pay attention to diet and exercise discipline.',
    bestActions: ['Organize your life', 'Work diligently', 'Build solid systems', 'Focus on health'],
  },
  5: {
    number: 5,
    overallTheme: 'Change, freedom, and adventure. This is a year of movement, travel, and embracing the unexpected.',
    love: 'Changes in relationships are likely. Some may end, new ones may begin. Embrace the flow.',
    career: 'Career changes, new opportunities, and travel for work. Stay flexible.',
    finance: 'Fluctuating finances. Avoid major risks but embrace new opportunities.',
    health: 'Focus on nervous system health. Regular exercise helps manage change-related stress.',
    bestActions: ['Embrace change', 'Travel and explore', 'Stay flexible', 'Take calculated risks'],
  },
  6: {
    number: 6,
    overallTheme: 'Responsibility, service, and love. This is a year focused on home, family, and community.',
    love: 'Deep commitment in relationships. Marriage, family expansion, or caring for loved ones.',
    career: 'Service-oriented work is favored. Focus on responsibility and quality.',
    finance: 'Stable but may have increased family-related expenses.',
    health: 'Focus on balance. Avoid burnout from over-giving.',
    bestActions: ['Nurture relationships', 'Serve your community', 'Create home harmony', 'Practice self-care'],
  },
  7: {
    number: 7,
    overallTheme: 'Rest, reflection, and inner wisdom. This is a year for study, spirituality, and personal growth.',
    love: 'A quieter year for love. You may need more alone time. Deepen your connection with yourself.',
    career: 'A year for research, learning, and behind-the-scenes work. Avoid major risks.',
    finance: 'Focus on financial analysis and planning. Not a year for major investments.',
    health: 'Focus on mental and spiritual health. Meditation and rest are essential.',
    bestActions: ['Study and research', 'Meditate and reflect', 'Rest and recharge', 'Trust your intuition'],
  },
  8: {
    number: 8,
    overallTheme: 'Power, success, and abundance. This is a year of achievement, recognition, and material rewards.',
    love: 'Relationships may be tested by career demands. Balance is key.',
    career: 'Major career success is possible. Recognition, promotions, and financial rewards.',
    finance: 'Excellent year for financial growth. Investments and business ventures prosper.',
    health: 'Watch for stress and overwork. Balance ambition with self-care.',
    bestActions: ['Pursue goals aggressively', 'Invest wisely', 'Lead with integrity', 'Celebrate success'],
  },
  9: {
    number: 9,
    overallTheme: 'Completion, release, and transformation. This is a year to let go and prepare for new cycles.',
    love: 'Relationships that have run their course may end. Release with love and gratitude.',
    career: 'Complete projects and tie up loose ends. Prepare for new directions.',
    finance: 'A year to pay debts, clear obligations, and simplify.',
    health: 'Release old patterns. Focus on detoxification and letting go.',
    bestActions: ['Let go of the past', 'Forgive and release', 'Complete unfinished business', 'Prepare for renewal'],
  },
};
