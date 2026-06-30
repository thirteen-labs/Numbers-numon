import { ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';

import { Card, NumberCircle, Section } from '@/components/ui';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { BALANCE_INTERPRETATIONS } from '@/data/balance';
import { HIDDEN_PASSION_INTERPRETATIONS } from '@/data/hidden-passion';
import { KARMIC_DEBT_INTERPRETATIONS } from '@/data/karmic-debt';
import { useTheme } from '@/hooks/use-theme';
import { colorForNumber } from '@/lib/numerology/utils';
import type { PersonInput } from '@/lib/numerology/core';
import {
  calculateBalance,
  calculateCornerstone,
  calculateCapstone,
  calculateFirstVowel,
  calculateFirstConsonant,
  calculateKarmicDebt,
  calculateKarmicLessons,
  calculateHiddenPassion,
  calculateRationalThought,
  calculateSubconsciousSelf,
} from '@/lib/numerology/advanced';

export default function AdvancedNumbersScreen() {
  const { fn, mn, ln, y, m, d } = useLocalSearchParams<{ fn: string; mn?: string; ln: string; y: string; m: string; d: string }>();
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  const person: PersonInput = {
    firstName: fn ?? '',
    middleName: mn ?? undefined,
    lastName: ln ?? '',
    dateOfBirth: new Date(parseInt(y ?? '2000', 10), parseInt(m ?? '1', 10) - 1, parseInt(d ?? '1', 10)),
  };

  const karmicDebt = calculateKarmicDebt(person);
  const karmicLessons = calculateKarmicLessons(person);
  const hiddenPassion = calculateHiddenPassion(person);
  const balance = calculateBalance(person);
  const rationalThought = calculateRationalThought(person);
  const subconsciousSelf = calculateSubconsciousSelf(person);
  const cornerstone = calculateCornerstone(person);
  const capstone = calculateCapstone(person);
  const firstVowel = calculateFirstVowel(person);
  const firstConsonant = calculateFirstConsonant(person);

  const bottomPadding = insets.bottom + BottomTabInset + Spacing.three;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.background }}
      contentContainerStyle={[styles.container, { paddingBottom: bottomPadding }]}>
      <ThemedView style={styles.inner}>
        <Section title="Advanced Numbers" subtitle="Deeper insights from your name and birth date">
          <ThemedText type="small">
            These calculations reveal hidden patterns, karmic influences, and deeper aspects of your personality.
          </ThemedText>
        </Section>

        {karmicDebt.length > 0 && (
          <Section title="Karmic Debt Numbers">
            {karmicDebt.map((n) => {
              const ki = KARMIC_DEBT_INTERPRETATIONS[n];
              return (
                <Card key={n} title={ki?.title ?? `Karmic Debt ${n}`}>
                  <NumberCircle number={n} size={48} color={colorForNumber(n, theme)} />
                  {ki && (
                    <>
                      <ThemedText type="small" style={styles.subtitle}>Historical Meaning</ThemedText>
                      <ThemedText type="small">{ki.historicalMeaning}</ThemedText>
                      <ThemedText type="small" style={styles.subtitle}>Modern Interpretation</ThemedText>
                      <ThemedText type="small">{ki.modernInterpretation}</ThemedText>
                      <ThemedText type="small" style={styles.subtitle}>Practical Advice</ThemedText>
                      {ki.practicalAdvice.map((a: string) => (
                        <ThemedText key={a} type="small">• {a}</ThemedText>
                      ))}
                    </>
                  )}
                </Card>
              );
            })}
          </Section>
        )}

        {karmicLessons.length > 0 && (
          <Section title={`Karmic Lessons — ${karmicLessons.join(', ') || 'None'}`}>
            <ThemedText type="small">
              {karmicLessons.length === 0
                ? 'All numbers 1–9 are present in your name. No missing qualities.'
                : `Missing numbers: ${karmicLessons.join(', ')}. These represent qualities you need to develop in this lifetime.`}
            </ThemedText>
          </Section>
        )}

        <Section title="Hidden Passion">
          {hiddenPassion.map((n) => {
            const hi = HIDDEN_PASSION_INTERPRETATIONS[n];
            return (
              <Card key={n} title={hi?.description ?? `Number ${n}`}>
                <NumberCircle number={n} size={48} color={colorForNumber(n, theme)} />
                {hi && (
                  <>
                    <ThemedText type="small" style={styles.subtitle}>Dominant Abilities</ThemedText>
                    {hi.dominantAbilities.map((a: string) => (
                      <ThemedText key={a} type="small">• {a}</ThemedText>
                    ))}
                  </>
                )}
              </Card>
            );
          })}
        </Section>

        <Section title="Balance Number">
          <ThemedView style={styles.numberRow}>
            <NumberCircle number={balance} size={48} color={colorForNumber(balance, theme)} />
            {BALANCE_INTERPRETATIONS[balance] && (
              <ThemedView style={{ flex: 1, gap: Spacing.two }}>
                <ThemedText type="smallBold">{BALANCE_INTERPRETATIONS[balance]!.description}</ThemedText>
                <ThemedText type="small" style={styles.subtitle}>Under Stress:</ThemedText>
                <ThemedText type="small">{BALANCE_INTERPRETATIONS[balance]!.underStress}</ThemedText>
                <ThemedText type="small" style={styles.subtitle}>Growth Path:</ThemedText>
                <ThemedText type="small">{BALANCE_INTERPRETATIONS[balance]!.growthPath}</ThemedText>
              </ThemedView>
            )}
          </ThemedView>
        </Section>

        <Section title="Rational Thought">
          <ThemedView style={styles.numberRow}>
            <NumberCircle number={rationalThought} size={48} color={colorForNumber(rationalThought, theme)} />
            <ThemedText type="small" style={{ flex: 1 }}>
              Your rational thought number is {rationalThought}. This reflects your logical thinking pattern and how you process information.
            </ThemedText>
          </ThemedView>
        </Section>

        <Section title="Subconscious Self">
          <ThemedView style={styles.numberRow}>
            <NumberCircle number={subconsciousSelf} size={48} color={colorForNumber(subconsciousSelf, theme)} />
            <ThemedText type="small" style={{ flex: 1 }}>
              This measures your inner confidence and subconscious patterns based on the diversity of letters in your name.
            </ThemedText>
          </ThemedView>
        </Section>

        <Section title="Letter Analysis">
          {cornerstone && (
            <Card title={`Cornerstone — ${cornerstone}`}>
              <ThemedText type="small">
                The first letter of your name reveals your approach to life and first impressions.
              </ThemedText>
            </Card>
          )}
          {capstone && (
            <Card title={`Capstone — ${capstone}`}>
              <ThemedText type="small">
                The last letter of your name reveals how you complete things and leave lasting impressions.
              </ThemedText>
            </Card>
          )}
          {firstVowel && (
            <Card title={`First Vowel — ${firstVowel}`}>
              <ThemedText type="small">
                Your first vowel reveals your emotional nature and inner motivations.
              </ThemedText>
            </Card>
          )}
          {firstConsonant && (
            <Card title={`First Consonant — ${firstConsonant}`}>
              <ThemedText type="small">
                Your first consonant reveals how others perceive you at first meeting.
              </ThemedText>
            </Card>
          )}
        </Section>
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
  subtitle: {
    fontWeight: '600',
    marginTop: Spacing.two,
    opacity: 0.7,
  },
  numberRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.three,
  },
});
