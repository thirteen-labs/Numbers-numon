export interface BalanceInterpretation {
  number: number;
  description: string;
  underStress: string;
  growthPath: string;
}

export const BALANCE_INTERPRETATIONS: Record<number, BalanceInterpretation> = {
  1: {
    number: 1,
    description: 'Under stress, you tend to become aggressive and domineering. Your challenge is to lead without overpowering others.',
    underStress: 'You may become bossy, impatient, and isolated. You push others away when you need them most.',
    growthPath: 'Practice stepping back and allowing others to contribute. True leadership empowers, not controls.',
  },
  2: {
    number: 2,
    description: 'Under stress, you tend to become overly passive and withdrawn. Your challenge is to maintain your voice.',
    underStress: 'You may become indecisive, overly sensitive, and lose yourself in others\' needs.',
    growthPath: 'Practice asserting your needs and opinions. Your voice matters as much as anyone else\'s.',
  },
  3: {
    number: 3,
    description: 'Under stress, you tend to become scattered and dramatic. Your challenge is to stay focused.',
    underStress: 'You may become unfocused, exaggerate, or use humor to deflect from real issues.',
    growthPath: 'Practice grounding yourself and addressing problems directly rather than avoiding them.',
  },
  4: {
    number: 4,
    description: 'Under stress, you tend to become rigid and controlling. Your challenge is to remain flexible.',
    underStress: 'You may become stubborn, dogmatic, and resistant to necessary change.',
    growthPath: 'Practice going with the flow. Not everything needs a rigid plan.',
  },
  5: {
    number: 5,
    description: 'Under stress, you tend to become impulsive and restless. Your challenge is to stay committed.',
    underStress: 'You may escape through overindulgence, reckless behavior, or avoiding responsibilities.',
    growthPath: 'Practice finding freedom within commitment. True freedom is a state of mind.',
  },
  6: {
    number: 6,
    description: 'Under stress, you tend to become meddling and anxious. Your challenge is to trust others.',
    underStress: 'You may become overbearing, worry excessively, and try to fix things that aren\'t yours to fix.',
    growthPath: 'Practice letting others live their own lives. Trust that they can handle their own challenges.',
  },
  7: {
    number: 7,
    description: 'Under stress, you tend to become withdrawn and critical. Your challenge is to stay connected.',
    underStress: 'You may isolate yourself, become sarcastic, and distrust everyone around you.',
    growthPath: 'Practice staying engaged even when it\'s uncomfortable. Connection heals.',
  },
  8: {
    number: 8,
    description: 'Under stress, you tend to become controlling and workaholic. Your challenge is to find balance.',
    underStress: 'You may become obsessed with money, power, or control, neglecting relationships and health.',
    growthPath: 'Practice balancing material pursuits with spiritual and emotional wellbeing.',
  },
  9: {
    number: 9,
    description: 'Under stress, you tend to become dramatic and resentful. Your challenge is to practice detachment.',
    underStress: 'You may become overly emotional, play the martyr, or hold onto grudges.',
    growthPath: 'Practice letting go and forgiving. Holding onto resentment only hurts you.',
  },
};
