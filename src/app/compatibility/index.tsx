import { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button, Card, Input, NumberCircle, Section } from '@/components/ui';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { getCompatibilityDescription } from '@/data/name-compatibility';
import { useTheme } from '@/hooks/use-theme';
import { calculateExpression } from '@/lib/numerology';
import { colorForNumber } from '@/lib/numerology/utils';
import type { PersonInput } from '@/lib/numerology/core';

export default function CompatibilityScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [result, setResult] = useState<{
    num1: number; num2: number; difference: number; comp: ReturnType<typeof getCompatibilityDescription>;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleCompare() {
    if (!name1.trim() || !name2.trim()) {
      setError('Both names are required');
      return;
    }

    const person1: PersonInput = { firstName: name1.trim(), lastName: '', dateOfBirth: new Date(2000, 0, 1) };
    const person2: PersonInput = { firstName: name2.trim(), lastName: '', dateOfBirth: new Date(2000, 0, 1) };

    const num1 = calculateExpression(person1);
    const num2 = calculateExpression(person2);
    const difference = Math.abs(num1 - num2);
    const comp = getCompatibilityDescription(difference);

    setResult({ num1, num2, difference, comp });
    setError(null);
  }

  const bottomPadding = insets.bottom + BottomTabInset + Spacing.three;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.background }}
      contentContainerStyle={[styles.container, { paddingBottom: bottomPadding }]}>
      <ThemedView style={styles.inner}>
        <Section title="Name Compatibility" subtitle="Compare two names for emotional, romantic, and business harmony">
          <ThemedText type="small">
            Enter two names to see how their expression numbers interact. Based on the difference between their numbers.
          </ThemedText>
        </Section>

        <Section title="Person 1">
          <Input label="Full Name" value={name1} onChangeText={setName1} placeholder="Enter first name" autoCapitalize="words" />
        </Section>

        <Section title="Person 2">
          <Input label="Full Name" value={name2} onChangeText={setName2} placeholder="Enter first name" autoCapitalize="words" />
        </Section>

        {error && <ThemedText style={styles.error}>{error}</ThemedText>}
        <Button title="Compare Names" onPress={handleCompare} />

        {result && (
          <>
            <Section title="Expression Numbers">
              <ThemedView style={styles.numberGrid}>
                <NumberCircle number={result.num1} label={name1} color={colorForNumber(result.num1, theme)} />
                <NumberCircle number={result.num2} label={name2} color={colorForNumber(result.num2, theme)} />
              </ThemedView>
            </Section>

            <Section title={`Compatibility Score: ${result.comp.score}`}>
              <Card title="Emotional">
                <ThemedText type="small">{result.comp.emotional}</ThemedText>
              </Card>
              <Card title="Friendship">
                <ThemedText type="small">{result.comp.friendship}</ThemedText>
              </Card>
              <Card title="Romance">
                <ThemedText type="small">{result.comp.romance}</ThemedText>
              </Card>
              <Card title="Communication">
                <ThemedText type="small">{result.comp.communication}</ThemedText>
              </Card>
              <Card title="Business">
                <ThemedText type="small">{result.comp.business}</ThemedText>
              </Card>
            </Section>
          </>
        )}
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', justifyContent: 'center' },
  inner: { maxWidth: MaxContentWidth, flexGrow: 1, gap: Spacing.five, padding: Spacing.four },
  numberGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.three, justifyContent: 'center' },
  error: { color: '#ff4444' },
});
