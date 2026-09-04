import { Colors } from '@/constants/theme';
import { THEMES, type ThemeColors, type ThemeName } from '@/constants/themes';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useAppStore } from '@/lib/store';

export function useTheme(): ThemeColors {
  const scheme = useColorScheme();
  const { theme, selectedThemeName } = useAppStore();

  // Support both legacy 'theme' values (light/dark/system) and new selectedThemeName.
  // If theme is a concrete ThemeName (e.g. 'mystic'), honor it. Otherwise use selectedThemeName.
  const effectiveTheme = (theme !== 'system' && (THEMES[theme as ThemeName] ? theme : null)) ?? null;

  if (theme === 'system') {
    const resolved: ThemeName = scheme === 'unspecified' || scheme === null ? 'light' : (scheme as ThemeName);
    // When in system mode, prefer selectedThemeName only if it's light/dark/amoled etc matching system?
    // Otherwise use system resolved light/dark.
    return THEMES[resolved] ?? THEMES.dark;
  }

  // If user picked a custom theme like 'mystic' via settings, ThemeMode may be that value directly.
  if (effectiveTheme) {
    return THEMES[effectiveTheme as ThemeName] ?? THEMES.dark;
  }

  // Fallback to selectedThemeName if present
  if (selectedThemeName && THEMES[selectedThemeName]) {
    return THEMES[selectedThemeName];
  }

  const key = theme as keyof typeof Colors;
  return THEMES[key as ThemeName] ?? Colors[key] ?? THEMES.dark;
}
