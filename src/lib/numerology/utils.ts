export function colorForNumber(n: number, theme: { text: string }): string {
  const colors: Record<number, string> = {
    1: '#FF6B35', 2: '#4ECDC4', 3: '#FFE66D', 4: '#2C3E50',
    5: '#E74C3C', 6: '#2ECC71', 7: '#9B59B6', 8: '#34495E',
    9: '#E91E63', 11: '#1ABC9C', 22: '#F39C12', 33: '#8E44AD',
  };
  return colors[n] ?? theme.text;
}

export function numberTitle(n: number): string {
  const titles: Record<number, string> = {
    1: 'The Leader', 2: 'The Peacemaker', 3: 'The Creative',
    4: 'The Builder', 5: 'The Adventurer', 6: 'The Nurturer',
    7: 'The Seeker', 8: 'The Achiever', 9: 'The Humanitarian',
    11: 'The Illuminator', 22: 'The Master Builder', 33: 'The Master Teacher',
  };
  return titles[n] ?? `Number ${n}`;
}
