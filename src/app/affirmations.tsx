import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Card, NumberCircle, Section } from '@/components/ui';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { AFFIRMATIONS_BY_NUMBER } from '@/data/affirmations';
import { useTheme } from '@/hooks/use-theme';
import { colorForNumber } from '@/lib/numerology/utils';

const NUMBER_KEYS = Object.keys(AFFIRMATIONS_BY_NUMBER).map(Number).sort((a, b) => a - b);

export default function AffirmationsScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);

  const bottomPadding = insets.bottom + BottomTabInset + Spacing.three;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.background }}
      contentContainerStyle={[styles.container, { paddingBottom: bottomPadding }]}>
      <ThemedView style={styles.inner}>
        <Section title="Daily Affirmations" subtitle="Positive affirmations aligned with your numbers">
          <ThemedView style={styles.numberRow}>
            {NUMBER_KEYS.map((n) => (
              <Pressable key={n} onPress={() => setSelectedNumber(selectedNumber === n ? null : n)}>
                <NumberCircle
                  number={n}
                  size={44}
                  color={colorForNumber(n, theme)}
                />
              </Pressable>
            ))}
          </ThemedView>
        </Section>

        {selectedNumber && (
          <Section title={`Affirmations for ${selectedNumber}`}>
            {AFFIRMATIONS_BY_NUMBER[selectedNumber]?.map((a, i) => (
              <Card key={i}>
                <ThemedText style={styles.affirmationText}>{'\u201C'}{a}{'\u201D'}</ThemedText>
              </Card>
            ))}
          </Section>
        )}
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', justifyContent: 'center' },
  inner: { maxWidth: MaxContentWidth, flexGrow: 1, gap: Spacing.five, padding: Spacing.four },
  numberRow: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.two, justifyContent: 'center' },
  affirmationText: { fontSize: 16, fontStyle: 'italic', lineHeight: 24, textAlign: 'center' },
});
