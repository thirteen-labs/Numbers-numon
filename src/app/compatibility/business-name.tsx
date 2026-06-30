import { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button, Card, Input, NumberCircle, Section } from '@/components/ui';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { BUSINESS_NAME_INTERPRETATIONS } from '@/data/business-name';
import { useTheme } from '@/hooks/use-theme';
import { sumNameNumbers, reduceNumber } from '@/lib/numerology';
import { colorForNumber } from '@/lib/numerology/utils';

export default function BusinessNameScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  const [name, setName] = useState('');
  const [result, setResult] = useState<{
    number: number; interpretation: typeof BUSINESS_NAME_INTERPRETATIONS[number];
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleAnalyze() {
    if (!name.trim()) { setError('Business name is required'); return; }
    const total = sumNameNumbers(name.trim());
    const num = reduceNumber(total);
    const interpretation = BUSINESS_NAME_INTERPRETATIONS[num];
    setResult({ number: num, interpretation });
    setError(null);
  }

  const bottomPadding = insets.bottom + BottomTabInset + Spacing.three;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.background }}
      contentContainerStyle={[styles.container, { paddingBottom: bottomPadding }]}>
      <ThemedView style={styles.inner}>
        <Section title="Business Name Analysis" subtitle="Evaluate the numerological energy of your business name">
          <Input label="Business Name" value={name} onChangeText={setName} placeholder="Enter business name" autoCapitalize="words" />
          {error && <ThemedText style={styles.error}>{error}</ThemedText>}
          <Button title="Analyze" onPress={handleAnalyze} />
        </Section>

        {result && (
          <>
            <Section title={`Energy Number: ${result.number}`}>
              <ThemedView style={styles.center}>
                <NumberCircle number={result.number} size={80} color={colorForNumber(result.number, theme)} />
              </ThemedView>
            </Section>

            <Card title="Energy">
              <ThemedText type="small">{result.interpretation.energy}</ThemedText>
            </Card>
            <Card title="Branding Vibration">
              <ThemedText type="small">{result.interpretation.brandingVibration}</ThemedText>
            </Card>
            <Card title="Prosperity">
              <ThemedText type="small">{result.interpretation.prosperity}</ThemedText>
            </Card>
            <Card title="Best For">
              {result.interpretation.bestFor.map((b: string) => (
                <ThemedText key={b} type="small">• {b}</ThemedText>
              ))}
            </Card>
          </>
        )}
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', justifyContent: 'center' },
  inner: { maxWidth: MaxContentWidth, flexGrow: 1, gap: Spacing.five, padding: Spacing.four },
  center: { alignItems: 'center', gap: Spacing.three },
  error: { color: '#ff4444' },
});
