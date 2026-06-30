export interface ThemeColors {
  text: string;
  background: string;
  backgroundElement: string;
  backgroundSelected: string;
  textSecondary: string;
  tint: string;
  tabBar: string;
}

export type ThemeName = 'light' | 'dark' | 'amoled' | 'mystic' | 'cosmic' | 'emerald' | 'royal' | 'glass';

export const THEMES: Record<ThemeName, ThemeColors> = {
  light: {
    text: '#000000',
    background: '#ffffff',
    backgroundElement: '#F0F0F3',
    backgroundSelected: '#E0E1E6',
    textSecondary: '#60646C',
    tint: '#0a7ea4',
    tabBar: '#ffffff',
  },
  dark: {
    text: '#ffffff',
    background: '#000000',
    backgroundElement: '#212225',
    backgroundSelected: '#2E3135',
    textSecondary: '#B0B4BA',
    tint: '#0a7ea4',
    tabBar: '#000000',
  },
  amoled: {
    text: '#ffffff',
    background: '#000000',
    backgroundElement: '#0A0A0A',
    backgroundSelected: '#1A1A1A',
    textSecondary: '#808080',
    tint: '#00FF88',
    tabBar: '#000000',
  },
  mystic: {
    text: '#E8D5F5',
    background: '#1A0A2E',
    backgroundElement: '#2D1B4E',
    backgroundSelected: '#3D2B5E',
    textSecondary: '#A890D0',
    tint: '#BB86FC',
    tabBar: '#1A0A2E',
  },
  cosmic: {
    text: '#C8E6FF',
    background: '#0A1628',
    backgroundElement: '#1A2A48',
    backgroundSelected: '#2A3A58',
    textSecondary: '#8090B0',
    tint: '#448AFF',
    tabBar: '#0A1628',
  },
  emerald: {
    text: '#D4F5E0',
    background: '#0A1F14',
    backgroundElement: '#1A3F28',
    backgroundSelected: '#2A5F38',
    textSecondary: '#80B090',
    tint: '#00E676',
    tabBar: '#0A1F14',
  },
  royal: {
    text: '#F5E6D0',
    background: '#1A0F0A',
    backgroundElement: '#3A2F1A',
    backgroundSelected: '#5A3F2A',
    textSecondary: '#B09070',
    tint: '#FFD700',
    tabBar: '#1A0F0A',
  },
  glass: {
    text: '#ffffff',
    background: '#0A0A1A',
    backgroundElement: 'rgba(255, 255, 255, 0.08)',
    backgroundSelected: 'rgba(255, 255, 255, 0.12)',
    textSecondary: 'rgba(255, 255, 255, 0.6)',
    tint: '#00D4FF',
    tabBar: 'rgba(10, 10, 26, 0.9)',
  },
};

export const ANIMATION_DURATION = 300;
