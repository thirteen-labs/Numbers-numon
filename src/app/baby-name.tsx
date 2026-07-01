import { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button, Card, Input, NumberCircle, Section } from '@/components/ui';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { NUMBER_MEANINGS } from '@/data/number-meanings';
import { useTheme } from '@/hooks/use-theme';
import { calculateLifePath, calculateExpression } from '@/lib/numerology';
import { colorForNumber, numberTitle } from '@/lib/numerology/utils';
import type { PersonInput } from '@/lib/numerology/core';

export default function BabyNameScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  const [parentDob, setParentDob] = useState('');
  const [babyName, setBabyName] = useState('');
  const [babyDob, setBabyDob] = useState('');
  const [result, setResult] = useState<{
    babyLP: number; babyExp: number; parentLP: number; compatibility: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  function parseDate(str: string): Date | null {
    const parts = str.split('/');
    if (parts.length !== 3) return null;
    const m = parseInt(parts[0]!, 10) - 1;
    const d = parseInt(parts[1]!, 10);
    const y = parseInt(parts[2]!, 10);
    if (isNaN(m) || isNaN(d) || isNaN(y)) return null;
    return new Date(y, m, d);
  }

  function handleAnalyze() {
    if (!parentDob.trim() || !babyName.trim() || !babyDob.trim()) {
      setError('All fields are required');
      return;
    }

    const parentDate = parseDate(parentDob);
    const babyDate = parseDate(babyDob);
    if (!parentDate || !babyDate) { setError('Invalid date format. Use MM/DD/YYYY'); return; }

    const baby: PersonInput = { firstName: babyName.trim(), lastName: '', dateOfBirth: babyDate };

    const babyLP = calculateLifePath(babyDate);
    const babyExp = calculateExpression(baby);
    const parentLP = calculateLifePath(parentDate);
    const diff = Math.abs(babyLP - parentLP);

    const compatMap: Record<number, string> = {
      1: 'Strong alignment — leadership and independence flow naturally.',
      2: 'Harmonious — nurturing and cooperative bond.',
      3: 'Creative and joyful connection.',
      4: 'Stable and grounded relationship.',
      5: 'Adventurous — may need flexibility in expectations.',
      6: 'Loving and responsible — a family-oriented match.',
      7: 'Deep and thoughtful — mutual respect for space.',
      8: 'Ambitious pair — both driven to succeed.',
      9: 'Compassionate and understanding bond.',
    };

    const compatibility = compatMap[diff] ?? compatMap[5]!;
    setResult({ babyLP, babyExp, parentLP, compatibility });
    setError(null);
  }

  const bottomPadding = insets.bottom + BottomTabInset + Spacing.three;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.background }}
      contentContainerStyle={[styles.container, { paddingBottom: bottomPadding }]}>
      <ThemedView style={styles.inner}>
        <Section title="Baby Name Analyzer" subtitle="Check numerological compatibility between baby name and birth date">
          <Input label="Parent's DOB (MM/DD/YYYY)" value={parentDob} onChangeText={setParentDob} placeholder="MM/DD/YYYY" keyboardType="numbers-and-punctuation" />
          <Input label="Baby's Full Name" value={babyName} onChangeText={setBabyName} placeholder="Baby name" autoCapitalize="words" />
          <Input label="Baby's DOB (MM/DD/YYYY)" value={babyDob} onChangeText={setBabyDob} placeholder="MM/DD/YYYY" keyboardType="numbers-and-punctuation" />
          {error && <ThemedText style={styles.error}>{error}</ThemedText>}
          <Button title="Analyze" onPress={handleAnalyze} />
        </Section>

        {result && (
          <Section title="Results">
            <ThemedView style={styles.numberGrid}>
              <NumberCircle number={result.babyLP} label="Baby Life Path" color={colorForNumber(result.babyLP, theme)} />
              <NumberCircle number={result.babyExp} label="Baby Expression" color={colorForNumber(result.babyExp, theme)} />
              <NumberCircle number={result.parentLP} label="Parent Life Path" color={colorForNumber(result.parentLP, theme)} />
            </ThemedView>
            <Card title="Parent-Child Compatibility">
              <ThemedText type="small">{result.compatibility}</ThemedText>
            </Card>
            <Card title={`Baby's Life Path: ${numberTitle(result.babyLP)}`}>
              <ThemedText type="small">{NUMBER_MEANINGS[result.babyLP]?.description}</ThemedText>
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
  numberGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.three, justifyContent: 'center' },
  error: { color: '#ff4444' },
});
