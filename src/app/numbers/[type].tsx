import { ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';

import { Card, NumberCircle, Section } from '@/components/ui';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { NUMBER_MEANINGS } from '@/data/number-meanings';
import { useTheme } from '@/hooks/use-theme';
import { colorForNumber } from '@/lib/numerology/utils';

const LABELS: Record<string, string> = {
  'life-path': 'Life Path',
  expression: 'Expression',
  'soul-urge': 'Soul Urge',
  personality: 'Personality',
  birthday: 'Birthday',
  attitude: 'Attitude',
  maturity: 'Maturity',
};

export default function NumberDetailScreen() {
  const { type, n } = useLocalSearchParams<{ type: string; n: string }>();
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  const num = parseInt(n ?? '0', 10);
  const label = LABELS[type] ?? type;
  const meaning = NUMBER_MEANINGS[num];

  if (!meaning) {
    return (
      <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ThemedText>Number not found</ThemedText>
      </ThemedView>
    );
  }

  const bottomPadding = insets.bottom + BottomTabInset + Spacing.three;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.background }}
      contentContainerStyle={[styles.container, { paddingBottom: bottomPadding }]}>
      <ThemedView style={styles.inner}>
        <Section title={`${label} — ${meaning.title}`}>
          <ThemedView style={styles.center}>
            <NumberCircle number={num} size={80} color={colorForNumber(num, theme)} />
            <ThemedText type="small" style={styles.keywords}>{meaning.keywords.join(' · ')}</ThemedText>
          </ThemedView>
        </Section>

        <Section title="Description">
          <ThemedText type="small">{meaning.description}</ThemedText>
        </Section>

        <Card title="Strengths">
          {meaning.positive.map((s: string) => (
            <ThemedText key={s} type="small">• {s}</ThemedText>
          ))}
        </Card>

        <Card title="Challenges">
          {meaning.negative.map((s: string) => (
            <ThemedText key={s} type="small">• {s}</ThemedText>
          ))}
        </Card>

        <Card title="Career Paths">
          {meaning.career.map((c: string) => (
            <ThemedText key={c} type="small">• {c}</ThemedText>
          ))}
        </Card>

        <Card title="Relationships">
          <ThemedText type="small">{meaning.relationships}</ThemedText>
        </Card>

        <Card title="Spiritual Growth">
          <ThemedText type="small">{meaning.spiritual}</ThemedText>
        </Card>
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
  keywords: {
    textAlign: 'center',
    opacity: 0.7,
  },
});
