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

function reducePhoneNumber(phone: string): number {
  const digits = phone.replace(/\D/g, '');
  if (!digits) return 0;
  let sum = digits.split('').reduce((a, d) => a + parseInt(d, 10), 0);
  return reduceNumber(sum);
}

export default function PhoneNumberScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const [phone, setPhone] = useState('');
  const [result, setResult] = useState<number | null>(null);

  function handleAnalyze() {
    const n = reducePhoneNumber(phone);
    if (n === 0) return;
    setResult(n);
  }

  const bottomPadding = insets.bottom + BottomTabInset + Spacing.three;
  const meaning = result ? NUMBER_MEANINGS[result] : null;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.background }}
      contentContainerStyle={[styles.container, { paddingBottom: bottomPadding }]}>
      <ThemedView style={styles.inner}>
        <Section title="Phone Number Analysis" subtitle="Discover the vibration of your phone number">
          <Input label="Phone Number" value={phone} onChangeText={setPhone} placeholder="e.g. 555-123-4567" keyboardType="phone-pad" autoCapitalize="none" />
          <Button title="Analyze" onPress={handleAnalyze} />
        </Section>

        {result !== null && (
          <Section title={`Energy Number: ${result}`}>
            <ThemedView style={styles.center}>
              <NumberCircle number={result} size={80} color={colorForNumber(result, theme)} />
            </ThemedView>
            <Card title={numberTitle(result)}>
              <ThemedText type="small">{meaning?.description}</ThemedText>
            </Card>
            {meaning && (
              <>
                <Card title="Keywords">
                  <ThemedText type="small">{meaning.keywords.join(' · ')}</ThemedText>
                </Card>
                <Card title="Vibration">
                  <ThemedText type="small">This phone number carries the energy of {meaning.title}, influencing calls and connections made through it.</ThemedText>
                </Card>
              </>
            )}
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
