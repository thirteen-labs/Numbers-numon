import { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button, Card, Input, NumberCircle, Section } from '@/components/ui';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { NUMBER_MEANINGS } from '@/data/number-meanings';
import { useTheme } from '@/hooks/use-theme';
import { reduceNumber } from '@/lib/numerology';
import { colorForNumber, numberTitle } from '@/lib/numerology/utils';

function reduceHouseNumber(address: string): number {
  const digits = address.replace(/\D/g, '');
  if (!digits) return 0;
  let sum = digits.split('').reduce((a, d) => a + parseInt(d, 10), 0);
  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    sum = String(sum).split('').reduce((a, d) => a + parseInt(d, 10), 0);
  }
  return sum;
}

export default function HouseNumberScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const [address, setAddress] = useState('');
  const [result, setResult] = useState<number | null>(null);

  function handleAnalyze() {
    const n = reduceHouseNumber(address);
    if (n === 0) return;
    setResult(n);
  }

  const bottomPadding = insets.bottom + BottomTabInset + Spacing.three;
  const meaning = result ? NUMBER_MEANINGS[result] : null;

  const houseMeanings: Record<number, string> = {
    1: 'A home of leadership and independence. Best for entrepreneurs and pioneers.',
    2: 'A peaceful, harmonious home. Perfect for partnerships and family.',
    3: 'A creative, social household full of expression and joy.',
    4: 'A stable, grounded home. Strong foundation for building a life.',
    5: 'An adventurous, ever-changing home. Great for free spirits.',
    6: 'A nurturing, loving home. The ultimate family residence.',
    7: 'A quiet, introspective home. Ideal for thinkers and spiritual seekers.',
    8: 'A prosperous, ambitious home. Supports financial success.',
    9: 'A compassionate, welcoming home. A haven for all.',
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.background }}
      contentContainerStyle={[styles.container, { paddingBottom: bottomPadding }]}>
      <ThemedView style={styles.inner}>
        <Section title="House Number Analysis" subtitle="Understand the energy of your home address">
          <Input label="Address or House Number" value={address} onChangeText={setAddress} placeholder="e.g. 742 Evergreen Terrace" autoCapitalize="words" />
          <Button title="Analyze" onPress={handleAnalyze} />
        </Section>

        {result !== null && (
          <Section title={`Home Energy: ${result}`}>
            <ThemedView style={styles.center}>
              <NumberCircle number={result} size={80} color={colorForNumber(result, theme)} />
            </ThemedView>
            <Card title={numberTitle(result)}>
              <ThemedText type="small">{meaning?.description}</ThemedText>
            </Card>
            <Card title="Home Vibration">
              <ThemedText type="small">{houseMeanings[result] ?? 'Unique and individual.'}</ThemedText>
            </Card>
          </Section>
        )}
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', justifyContent: 'center' },
  inner: { maxWidth: MaxContentWidth, flexGrow: 1, gap: Spacing.five, padding: Spacing.four },
  center: { alignItems: 'center' },
});
