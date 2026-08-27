import { useRef, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import { Button } from '@/components/ui';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useAppStore } from '@/lib/store';
import { setOnboardingDone } from '@/lib/storage';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface Slide {
  title: string;
  subtitle: string;
  description: string;
  color: string;
}

const SLIDES: Slide[] = [
  {
    title: 'Numon',
    subtitle: 'Your Personal Numerology Companion',
    description: 'Discover the hidden meanings behind numbers and unlock insights about your life path, personality, and destiny.',
    color: '#BB86FC',
  },
  {
    title: 'Calculate',
    subtitle: 'Complete Numerology Reports',
    description: 'Enter your name and birth date to generate comprehensive reports including Life Path, Expression, Soul Urge, and 20+ other numbers.',
    color: '#448AFF',
  },
  {
    title: 'Explore',
    subtitle: 'Daily Insights & Guidance',
    description: 'Get daily affirmations, personal year forecasts, lucky numbers, angel numbers, Chinese zodiac, and compatibility analysis.',
    color: '#00E676',
  },
  {
    title: 'Private',
    subtitle: '100% Offline & Secure',
    description: 'All calculations happen on your device. Your data never leaves your phone. Journal, set goals, and track your spiritual journey privately.',
    color: '#FFD700',
  },
];

export default function OnboardingScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const { setOnboarded } = useAppStore();
  const scrollRef = useRef<any>(null);

  function handleNext() {
    if (currentIndex < SLIDES.length - 1) {
      const next = currentIndex + 1;
      setCurrentIndex(next);
      try { scrollRef.current?.scrollTo({ x: next * SCREEN_WIDTH, animated: true }); } catch {}
    } else {
      finishOnboarding();
    }
  }

  function handleSkip() {
    finishOnboarding();
  }

  function finishOnboarding() {
    setOnboarded(true);
    setOnboardingDone(true);
    router.replace('/');
  }

  return (
    <ThemedView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        onMomentumScrollEnd={(e) => {
          const idx = Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH);
          if (idx >= 0 && idx < SLIDES.length) setCurrentIndex(idx);
        }}>
        {SLIDES.map((slide, i) => (
          <ThemedView key={i} style={[styles.slide, { width: SCREEN_WIDTH }]}>
            <ThemedView style={styles.slideInner}>
              <ThemedView style={[styles.iconCircle, { backgroundColor: slide.color + '20' }]}>
                <ThemedText style={[styles.iconText, { color: slide.color }]}>
                  {i === 0 ? '✦' : i === 1 ? '∞' : i === 2 ? '◈' : '⬡'}
                </ThemedText>
              </ThemedView>
              <ThemedText type="subtitle" style={styles.slideTitle}>{slide.title}</ThemedText>
              <ThemedText type="smallBold" style={[styles.slideSubtitle, { color: slide.color }]}>{slide.subtitle}</ThemedText>
              <ThemedText type="small" style={[styles.slideDescription, { color: theme.textSecondary }]}>{slide.description}</ThemedText>
            </ThemedView>
          </ThemedView>
        ))}
      </ScrollView>

      <ThemedView style={[styles.footer, { paddingBottom: insets.bottom + Spacing.four }]}>
        <ThemedView style={styles.dots}>
          {SLIDES.map((_, i) => (
            <ThemedView
              key={i}
              style={[
                styles.dot,
                {
                  backgroundColor: i === currentIndex ? SLIDES[currentIndex]!.color : theme.backgroundElement,
                  width: i === currentIndex ? 24 : 8,
                },
              ]}
            />
          ))}
        </ThemedView>

        <ThemedView style={styles.buttons}>
          {currentIndex < SLIDES.length - 1 ? (
            <>
              <Button title="Skip" variant="ghost" onPress={handleSkip} style={styles.buttonHalf} />
              <Button title="Next" onPress={handleNext} style={styles.buttonHalf} />
            </>
          ) : (
            <Button title="Get Started" onPress={finishOnboarding} style={styles.buttonFull} />
          )}
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideInner: {
    maxWidth: MaxContentWidth,
    paddingHorizontal: Spacing.five,
    alignItems: 'center',
    gap: Spacing.three,
  },
  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.two,
  },
  iconText: {
    fontSize: 48,
  },
  slideTitle: {
    fontSize: 40,
    textAlign: 'center',
  },
  slideSubtitle: {
    fontSize: 18,
    textAlign: 'center',
  },
  slideDescription: {
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
  },
  footer: {
    paddingHorizontal: Spacing.five,
    gap: Spacing.four,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.one,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  buttons: {
    flexDirection: 'row',
    gap: Spacing.three,
  },
  buttonHalf: {
    flex: 1,
  },
  buttonFull: {
    flex: 1,
  },
});
