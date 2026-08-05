import { ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';

import { Card, Section } from '@/components/ui';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { LUCKY_COLORS } from '@/data/lucky-colors';
import { LUCKY_DAYS } from '@/data/lucky-days';
import { useTheme } from '@/hooks/use-theme';

export default function LuckyScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const { n } = useLocalSearchParams<{ n?: string }>();
  const number = parseInt(n ?? '1', 10);
  const colors = LUCKY_COLORS[number];
  const days = LUCKY_DAYS[number];
  const bottomPadding = insets.bottom + BottomTabInset + Spacing.three;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.background }}
      contentContainerStyle={[styles.container, { paddingBottom: bottomPadding }]}>
      <ThemedView style={styles.inner}>
        <Section title={`Lucky Numbers & Colors for ${number}`}>
          {colors && (
            <Card title="Lucky Colors">
              <ThemedView style={styles.colorRow}>
                {colors.hex.map((hex, i) => (
                  <ThemedView key={hex + i} style={[styles.swatch, { backgroundColor: hex }]} />
                ))}
              </ThemedView>
              <ThemedText type="small">Primary: {colors.primary}</ThemedText>
            </Card>
          )}
          {days && (
            <Card title="Lucky Days">
              <ThemedText type="small">Weekdays: {days.weekdays.join(', ')}</ThemedText>
              <ThemedText type="small">Dates: {days.dates.join(', ')}</ThemedText>
            </Card>
          )}
        </Section>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', justifyContent: 'center' },
  inner: { maxWidth: MaxContentWidth, flexGrow: 1, gap: Spacing.five, padding: Spacing.four },
  colorRow: { flexDirection: 'row', gap: 8, marginBottom: 8 },
  swatch: { width: 32, height: 32, borderRadius: 16 },
});
