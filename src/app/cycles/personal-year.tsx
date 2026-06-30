import { ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';

import { Card, NumberCircle, Section } from '@/components/ui';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { PERSONAL_YEAR_INTERPRETATIONS } from '@/data/personal-year';
import { useTheme } from '@/hooks/use-theme';
import { colorForNumber } from '@/lib/numerology/utils';

export default function PersonalYearScreen() {
  const { n } = useLocalSearchParams<{ n: string }>();
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  const num = parseInt(n ?? '0', 10);
  const interpretation = PERSONAL_YEAR_INTERPRETATIONS[num];

  const bottomPadding = insets.bottom + BottomTabInset + Spacing.three;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.background }}
      contentContainerStyle={[styles.container, { paddingBottom: bottomPadding }]}>
      <ThemedView style={styles.inner}>
        <Section title="Personal Year">
          <ThemedView style={styles.center}>
            <NumberCircle number={num} size={80} color={colorForNumber(num, theme)} />
            {interpretation && (
              <ThemedText type="smallBold">{interpretation.overallTheme}</ThemedText>
            )}
          </ThemedView>
        </Section>

        {interpretation && (
          <>
            <Card title="Love">
              <ThemedText type="small">{interpretation.love}</ThemedText>
            </Card>
            <Card title="Career">
              <ThemedText type="small">{interpretation.career}</ThemedText>
            </Card>
            <Card title="Finance">
              <ThemedText type="small">{interpretation.finance}</ThemedText>
            </Card>
            <Card title="Health">
              <ThemedText type="small">{interpretation.health}</ThemedText>
            </Card>
            <Card title="Best Actions">
              {interpretation.bestActions.map((a: string) => (
                <ThemedText key={a} type="small">• {a}</ThemedText>
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
