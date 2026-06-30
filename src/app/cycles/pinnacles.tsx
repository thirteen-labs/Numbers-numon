import { ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';

import { Card, NumberCircle, Section } from '@/components/ui';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { PINNACLE_INTERPRETATIONS } from '@/data/pinnacles';
import { calculatePinnacleAges } from '@/lib/numerology/cycles';
import { useTheme } from '@/hooks/use-theme';
import { colorForNumber } from '@/lib/numerology/utils';

export default function PinnaclesScreen() {
  const { lp } = useLocalSearchParams<{ lp: string }>();
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  const lifePath = parseInt(lp ?? '0', 10);
  const ages = calculatePinnacleAges(lifePath);

  const pinnacleNumbers = [
    reduceSimple(lifePath),
  ];

  const p1 = reduceSimple(lifePath);
  const p2 = reduceSimple(lifePath);
  const bottomPadding = insets.bottom + BottomTabInset + Spacing.three;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.background }}
      contentContainerStyle={[styles.container, { paddingBottom: bottomPadding }]}>
      <ThemedView style={styles.inner}>
        <Section title="Life Pinnacles" subtitle="Four major life stages based on your Life Path number">
          <ThemedText type="small">
            Pinnacles represent the four major cycles of your life. Each period has a distinct theme, opportunities, and lessons.
          </ThemedText>
        </Section>

        {ages.map((age, i) => {
          const num = reduceSimple(lifePath + i + 1);
          const interpretation = PINNACLE_INTERPRETATIONS[num];

          return (
            <Card key={i} title={`Pinnacle ${i + 1} — Age ${age.start} to ${age.end === 999 ? 'Present' : age.end}`}>
              <ThemedView style={styles.pinnacleHeader}>
                <NumberCircle number={num} size={56} color={colorForNumber(num, theme)} />
                {interpretation && (
                  <ThemedText type="smallBold" style={styles.theme}>{interpretation.theme}</ThemedText>
                )}
              </ThemedView>
              {interpretation && (
                <>
                  <ThemedText type="small" style={styles.subtitle}>Opportunities</ThemedText>
                  <ThemedText type="small">{interpretation.opportunities}</ThemedText>
                  <ThemedText type="small" style={styles.subtitle}>Lessons</ThemedText>
                  <ThemedText type="small">{interpretation.lessons}</ThemedText>
                </>
              )}
            </Card>
          );
        })}
      </ThemedView>
    </ScrollView>
  );

  function reduceSimple(n: number): number {
    while (n > 9 && n !== 11 && n !== 22 && n !== 33) {
      n = String(n).split('').reduce((a, d) => a + parseInt(d, 10), 0);
    }
    return n;
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  inner: {
    maxWidth: MaxContentWidth,
    flexGrow: 1,
    gap: Spacing.five,
    padding: Spacing.four,
  },
  pinnacleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    marginBottom: Spacing.three,
  },
  theme: {
    flex: 1,
  },
  subtitle: {
    fontWeight: '600',
    marginTop: Spacing.two,
    opacity: 0.7,
  },
});
