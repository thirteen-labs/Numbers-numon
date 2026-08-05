import { ScrollView, StyleSheet, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState } from 'react';

import { Button, Card, Section } from '@/components/ui';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export default function PhoneNumberScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const [phone, setPhone] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const bottomPadding = insets.bottom + BottomTabInset + Spacing.three;

  function analyze() {
    const digits = phone.replace(/\D/g, '');
    if (!digits) return;
    let sum = 0;
    for (const d of digits) sum += parseInt(d, 10);
    while (sum > 9) sum = Math.floor(sum / 10) + (sum % 10);
    setResult(sum);
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.background }}
      contentContainerStyle={[styles.container, { paddingBottom: bottomPadding }]}>
      <ThemedView style={styles.inner}>
        <Section title="Phone Number Analysis" subtitle="Analyze phone number vibration">
          <TextInput
            style={[styles.input, { color: theme.text, borderColor: theme.backgroundElement }]}
            placeholder="Enter phone number"
            placeholderTextColor={theme.textSecondary}
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
          <Button title="Analyze" onPress={analyze} />
          {result !== null && (
            <Card title={`Vibration Number: ${result}`}>
              <ThemedText type="small">Your phone number reduces to {result}.</ThemedText>
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
  input: { borderWidth: 1, borderRadius: 8, padding: 12, fontSize: 16 },
});
