import { useEffect } from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router';
import { useColorScheme } from 'react-native';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import AppTabs from '@/components/app-tabs';
import { useAppStore } from '@/lib/store';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { theme, setLastOpenedScreen } = useAppStore();

  const resolvedTheme = theme === 'system' ? colorScheme ?? 'light' : theme;
  const navTheme = resolvedTheme === 'dark' ? DarkTheme : DefaultTheme;

  useEffect(() => {
    setLastOpenedScreen('home');
  }, [setLastOpenedScreen]);

  return (
    <ThemeProvider value={navTheme}>
      <AnimatedSplashOverlay />
      <AppTabs />
    </ThemeProvider>
  );
}
