import { ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';

import { Card, NumberCircle, Section } from '@/components/ui';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { LUCKY_COLORS } from '@/data/lucky-colors';
import { LUCKY_DAYS } from '@/data/lucky-days';
import { useTheme } from '@/hooks/use-theme';
import { colorForNumber } from '@/lib/numerology/utils';

export default function LuckyScreen() {
  const { n } = useLocalSearchParams<{ n: string }>();
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  const num = parseInt(n ?? '7', 10);
  const colors = LUCKY_COLORS[num];
  const days = LUCKY_DAYS[num];

  const expression = num + 1 > 9 ? 1 : num + 1;
  const soulUrge = num - 1 < 1 ? 9 : num - 1;
  const luckyNumbers = [num, expression, soulUrge, num + 9, num * 3].map((x) => x > 9 ? x - 9 : x || 1);

  const bottomPadding = insets.bottom + BottomTabInset + Spacing.three;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.background }}
      contentContainerStyle={[styles.container, { paddingBottom: bottomPadding }]}>
      <ThemedView style={styles.inner}>
        <Section title="Your Lucky Numbers">
          <ThemedView style={styles.numberGrid}>
            {[...new Set(luckyNumbers)].slice(0, 5).map((ln) => (
              <NumberCircle key={ln} number={ln} size={56} color={colorForNumber(ln, theme)} />
            ))}
          </ThemedView>
          <ThemedText type="small">
            Based on your Life Path number {num}. These numbers resonate with your personal energy.
          </ThemedText>
        </Section>

        {colors && (
          <Section title="Lucky Colors">
            <Card title={`Primary: ${colors.primary}`}>
              <ThemedView style={styles.colorRow}>
                {colors.hex.slice(0, 4).map((hex, i) => (
                  <ThemedView key={hex + i} style={[styles.swatch, { backgroundColor: hex }]} />
                ))}
              </ThemedView>
            </Card>
            <Card title="Secondary Colors">
              {colors.secondary.map((c) => (
                <ThemedText key={c} type="small">• {c}</ThemedText>
              ))}
            </Card>
            <ThemedText type="small">
              Wearing or surrounding yourself with these colors amplifies your natural energy.
            </ThemedText>
          </Section>
        )}

        {days && (
          <Section title="Lucky Days">
            <Card title="Favorable Weekdays">
              {days.weekdays.map((d) => (
                <ThemedText key={d} type="small">• {d}</ThemedText>
              ))}
            </Card>
            <Card title="Favorable Dates">
              {days.dates.map((d) => (
                <ThemedText key={d} type="small">• {d}th of each month</ThemedText>
              ))}
            </Card>
            <ThemedText type="small">{days.explanation}</ThemedText>
          </Section>
        )}
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', justifyContent: 'center' },
  inner: { maxWidth: MaxContentWidth, flexGrow: 1, gap: Spacing.five, padding: Spacing.four },
  numberGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.three, justifyContent: 'center' },
  colorRow: { flexDirection: 'row', gap: Spacing.two, marginTop: Spacing.two },
  swatch: { width: 36, height: 36, borderRadius: Spacing.two },
});
