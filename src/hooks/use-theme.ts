import { Colors } from '@/constants/theme';
import { THEMES, type ThemeColors, type ThemeName } from '@/constants/themes';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useAppStore } from '@/lib/store';

export function useTheme(): ThemeColors {
  const scheme = useColorScheme();
  const { theme } = useAppStore();

  if (theme === 'system') {
    const resolved: ThemeName = scheme === 'unspecified' ? 'light' : (scheme as ThemeName);
    return THEMES[resolved];
  }

  const key = theme as keyof typeof Colors;
  return THEMES[key as ThemeName] ?? Colors[key];
}
