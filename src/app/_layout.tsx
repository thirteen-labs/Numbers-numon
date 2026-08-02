import { useEffect } from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider, router, useSegments } from 'expo-router';
import { useColorScheme } from 'react-native';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import AppTabs from '@/components/app-tabs';
import { useAppStore } from '@/lib/store';
import { isOnboardingDone } from '@/lib/storage';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { theme, setLastOpenedScreen, isOnboarded, setOnboarded } = useAppStore();
  const segments = useSegments();

  const resolvedTheme = theme === 'system' ? colorScheme ?? 'light' : theme;
  const navTheme = resolvedTheme === 'dark' ? DarkTheme : DefaultTheme;

  useEffect(() => {
    const done = isOnboardingDone();
    setOnboarded(done);
    if (!done) {
      router.replace('/onboarding');
    }
  }, [setOnboarded]);

  useEffect(() => {
    setLastOpenedScreen(segments.join('/'));
  }, [segments, setLastOpenedScreen]);

  return (
    <ThemeProvider value={navTheme}>
      <AnimatedSplashOverlay />
      <AppTabs />
    </ThemeProvider>
  );
}
