import { ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';

import { Card, NumberCircle, Section } from '@/components/ui';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { PERSONAL_MONTH_INTERPRETATIONS } from '@/data/personal-month';
import { useTheme } from '@/hooks/use-theme';
import { colorForNumber } from '@/lib/numerology/utils';

export default function PersonalMonthScreen() {
  const { n } = useLocalSearchParams<{ n: string }>();
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  const num = parseInt(n ?? '0', 10);
  const interpretation = PERSONAL_MONTH_INTERPRETATIONS[num];

  const bottomPadding = insets.bottom + BottomTabInset + Spacing.three;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.background }}
      contentContainerStyle={[styles.container, { paddingBottom: bottomPadding }]}>
      <ThemedView style={styles.inner}>
        <Section title="Personal Month">
          <ThemedView style={styles.center}>
            <NumberCircle number={num} size={80} color={colorForNumber(num, theme)} />
            {interpretation && (
              <ThemedText type="smallBold">{interpretation.focus}</ThemedText>
            )}
          </ThemedView>
        </Section>

        {interpretation && (
          <>
            <Card title="Opportunities">
              {interpretation.opportunities.map((o: string) => (
                <ThemedText key={o} type="small">• {o}</ThemedText>
              ))}
            </Card>
            <Card title="Warnings">
              {interpretation.warnings.map((w: string) => (
                <ThemedText key={w} type="small">• {w}</ThemedText>
              ))}
            </Card>
          </>
        )}
      </ThemedView>
    </ScrollView>
  );
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
  center: {
    alignItems: 'center',
    gap: Spacing.three,
  },
});
