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

function reducePlate(plate: string): number {
  const upper = plate.toUpperCase().replace(/[^A-Z0-9]/g, '');
  if (!upper) return 0;

  const letterMap: Record<string, number> = {
    A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9,
    J: 1, K: 2, L: 3, M: 4, N: 5, O: 6, P: 7, Q: 8, R: 9,
    S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8,
  };

  let sum = 0;
  for (const char of upper) {
    if (char >= '0' && char <= '9') sum += parseInt(char, 10);
    else sum += letterMap[char] ?? 0;
  }

  return reduceNumber(sum);
}

export default function VehicleNumberScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const [plate, setPlate] = useState('');
  const [result, setResult] = useState<number | null>(null);

  function handleAnalyze() {
    const n = reducePlate(plate);
    if (n === 0) return;
    setResult(n);
  }

  const bottomPadding = insets.bottom + BottomTabInset + Spacing.three;
  const meaning = result ? NUMBER_MEANINGS[result] : null;

  const vehicleMeanings: Record<number, string> = {
    1: 'A pioneering vehicle. Great for road trips and adventures.',
    2: 'A smooth, reliable ride. Good for daily commutes.',
    3: 'A fun, expressive vehicle. Perfect for social outings.',
    4: 'A durable, practical vehicle. Built to last.',
    5: 'An exciting, fast vehicle. Loves the open road.',
    6: 'A safe, family-friendly vehicle. Prioritizes comfort.',
    7: 'A sophisticated, refined vehicle. Built for quality.',
    8: 'A powerful, prestigious vehicle. Commands attention.',
    9: 'A versatile, humanitarian vehicle. Great for carpooling.',
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.background }}
      contentContainerStyle={[styles.container, { paddingBottom: bottomPadding }]}>
      <ThemedView style={styles.inner}>
        <Section title="Vehicle Number Analysis" subtitle="Discover your license plate's numerological vibration">
          <Input label="License Plate" value={plate} onChangeText={setPlate} placeholder="e.g. ABC 123" autoCapitalize="characters" />
          <Button title="Analyze" onPress={handleAnalyze} />
        </Section>

        {result !== null && (
          <Section title={`Vehicle Energy: ${result}`}>
            <ThemedView style={styles.center}>
              <NumberCircle number={result} size={80} color={colorForNumber(result, theme)} />
            </ThemedView>
            <Card title={numberTitle(result)}>
              <ThemedText type="small">{meaning?.description}</ThemedText>
            </Card>
            <Card title="Vehicle Vibration">
              <ThemedText type="small">{vehicleMeanings[result] ?? 'Unique and individual.'}</ThemedText>
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
