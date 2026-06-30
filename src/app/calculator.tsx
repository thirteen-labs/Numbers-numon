import { useCallback, useEffect, useState } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';

import { Button, Card, Input, NumberCircle, Section } from '@/components/ui';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { WebBadge } from '@/components/web-badge';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { BALANCE_INTERPRETATIONS } from '@/data/balance';
import { CHALLENGE_INTERPRETATIONS } from '@/data/challenges';
import { HIDDEN_PASSION_INTERPRETATIONS } from '@/data/hidden-passion';
import { KARMIC_DEBT_INTERPRETATIONS } from '@/data/karmic-debt';
import { NUMBER_MEANINGS } from '@/data/number-meanings';
import { PERSONAL_DAY_INTERPRETATIONS } from '@/data/personal-day';
import { PERSONAL_MONTH_INTERPRETATIONS } from '@/data/personal-month';
import { PERSONAL_YEAR_INTERPRETATIONS } from '@/data/personal-year';
import { useTheme } from '@/hooks/use-theme';
import {
  calculateAllCoreNumbers,
  calculateAllPersonalNumbers,
  calculateCycles,
} from '@/lib/numerology';
import {
  calculateBalance,
  calculateKarmicDebt,
  calculateKarmicLessons,
  calculateHiddenPassion,
} from '@/lib/numerology/advanced';
import type { PersonInput } from '@/lib/numerology/core';
import { colorForNumber } from '@/lib/numerology/utils';
import { getProfileById } from '@/lib/database';

export default function CalculatorScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [dobString, setDobString] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    person: PersonInput;
    core: ReturnType<typeof calculateAllCoreNumbers>;
    personal: ReturnType<typeof calculateAllPersonalNumbers>;
    cycles: ReturnType<typeof calculateCycles>;
  } | null>(null);

  useFocusEffect(
    useCallback(() => {
      if (!id) return;
      getProfileById(id).then((profile) => {
        if (!profile) return;
        setFirstName(profile.person.firstName);
        setLastName(profile.person.lastName);
        setMiddleName(profile.person.middleName ?? '');
        const dob = profile.person.dateOfBirth;
        const mm = String(dob.getMonth() + 1).padStart(2, '0');
        const dd = String(dob.getDate()).padStart(2, '0');
        const yyyy = dob.getFullYear();
        setDobString(`${mm}/${dd}/${yyyy}`);
        setResult(null);
      });
    }, [id])
  );

  function handleCalculate() {
    if (!firstName.trim()) { setError('First name is required'); return; }
    if (!lastName.trim()) { setError('Last name is required'); return; }
    if (!dobString.trim()) { setError('Date of birth is required'); return; }

    const parts = dobString.split('/');
    if (parts.length !== 3) { setError('Use format MM/DD/YYYY'); return; }

    const month = parseInt(parts[0]!, 10) - 1;
    const day = parseInt(parts[1]!, 10);
    const year = parseInt(parts[2]!, 10);

    if (isNaN(month) || isNaN(day) || isNaN(year)) { setError('Invalid date'); return; }

    const dateOfBirth = new Date(year, month, day);
    const person: PersonInput = { firstName: firstName.trim(), lastName: lastName.trim(), middleName: middleName.trim() || undefined, dateOfBirth };

    const core = calculateAllCoreNumbers(person);
    const personal = calculateAllPersonalNumbers(person.dateOfBirth);
    const cycles = calculateCycles(core);

    setResult({ person, core, personal, cycles });
    setError(null);
  }

  const bottomPadding = insets.bottom + BottomTabInset + Spacing.three;

  function goToNumberDetail(type: string, n: number) {
    router.push(`/numbers/${type}?n=${n}`);
  }

  function goToAdvanced() {
    const dob = result!.person.dateOfBirth;
    router.push(`/numbers/advanced?fn=${encodeURIComponent(result!.person.firstName)}&ln=${encodeURIComponent(result!.person.lastName)}&y=${dob.getFullYear()}&m=${dob.getMonth() + 1}&d=${dob.getDate()}`);
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.background }}
      contentContainerStyle={[styles.container, { paddingBottom: bottomPadding }]}>
      <ThemedView style={styles.inner}>
        <Section title="Numerology Calculator" subtitle={id ? 'Loaded from profile' : 'Enter details or load a profile'}>
          {!id && (
            <Button title="Load from Profile" variant="secondary" onPress={() => router.push('/profile')} />
          )}

          <Input label="First Name" value={firstName} onChangeText={setFirstName} placeholder="John" autoCapitalize="words" />
          <Input label="Middle Name" value={middleName} onChangeText={setMiddleName} placeholder="(optional)" autoCapitalize="words" />
          <Input label="Last Name" value={lastName} onChangeText={setLastName} placeholder="Doe" autoCapitalize="words" />
          <Input label="Date of Birth" value={dobString} onChangeText={setDobString} placeholder="MM/DD/YYYY" keyboardType="numbers-and-punctuation" />
          {error && <ThemedText style={styles.error}>{error}</ThemedText>}
          <Button title="Calculate" onPress={handleCalculate} />
        </Section>

        {result && (
          <>
            <Section title="Core Numbers">
              <ThemedView style={styles.numberGrid}>
                <Pressable onPress={() => goToNumberDetail('life-path', result.core.lifePath)}>
                  <NumberCircle number={result.core.lifePath} label="Life Path" color={colorForNumber(result.core.lifePath, theme)} />
                </Pressable>
                <Pressable onPress={() => goToNumberDetail('expression', result.core.expression)}>
                  <NumberCircle number={result.core.expression} label="Expression" color={colorForNumber(result.core.expression, theme)} />
                </Pressable>
                <Pressable onPress={() => goToNumberDetail('soul-urge', result.core.soulUrge)}>
                  <NumberCircle number={result.core.soulUrge} label="Soul Urge" color={colorForNumber(result.core.soulUrge, theme)} />
                </Pressable>
                <Pressable onPress={() => goToNumberDetail('personality', result.core.personality)}>
                  <NumberCircle number={result.core.personality} label="Personality" color={colorForNumber(result.core.personality, theme)} />
                </Pressable>
                <Pressable onPress={() => goToNumberDetail('birthday', result.core.birthday)}>
                  <NumberCircle number={result.core.birthday} label="Birthday" color={colorForNumber(result.core.birthday, theme)} />
                </Pressable>
                <Pressable onPress={() => goToNumberDetail('attitude', result.core.attitude)}>
                  <NumberCircle number={result.core.attitude} label="Attitude" color={colorForNumber(result.core.attitude, theme)} />
                </Pressable>
                <Pressable onPress={() => goToNumberDetail('maturity', result.core.maturity)}>
                  <NumberCircle number={result.core.maturity} label="Maturity" color={colorForNumber(result.core.maturity, theme)} />
                </Pressable>
              </ThemedView>
            </Section>

            <Section title={'Life Path — ' + (NUMBER_MEANINGS[result.core.lifePath]?.title ?? '')}>
              <ThemedText type="small">{NUMBER_MEANINGS[result.core.lifePath]?.description}</ThemedText>
              <Card title="Strengths">
                {NUMBER_MEANINGS[result.core.lifePath]?.positive.map((s: string) => (
                  <ThemedText key={s} type="small">• {s}</ThemedText>
                ))}
              </Card>
              <Card title="Challenges">
                {NUMBER_MEANINGS[result.core.lifePath]?.negative.map((s: string) => (
                  <ThemedText key={s} type="small">• {s}</ThemedText>
                ))}
              </Card>
              <Card title="Career Paths">
                {NUMBER_MEANINGS[result.core.lifePath]?.career.map((c: string) => (
                  <ThemedText key={c} type="small">• {c}</ThemedText>
                ))}
              </Card>
            </Section>

            <Section title={'Expression — ' + (NUMBER_MEANINGS[result.core.expression]?.title ?? '')}>
              <ThemedText type="small">{NUMBER_MEANINGS[result.core.expression]?.description}</ThemedText>
            </Section>

            <Section title={'Soul Urge — ' + (NUMBER_MEANINGS[result.core.soulUrge]?.title ?? '')}>
              <ThemedText type="small">{NUMBER_MEANINGS[result.core.soulUrge]?.description}</ThemedText>
            </Section>

            <Section title="Today's Numbers">
              <ThemedView style={styles.numberGrid}>
                <Pressable onPress={() => router.push(`/cycles/personal-day?n=${result.personal.personalDay}`)}>
                  <NumberCircle number={result.personal.personalDay} size={56} label="Personal Day" color={colorForNumber(result.personal.personalDay, theme)} />
                </Pressable>
                <Pressable onPress={() => router.push(`/cycles/personal-month?n=${result.personal.personalMonth}`)}>
                  <NumberCircle number={result.personal.personalMonth} size={56} label="Personal Month" color={colorForNumber(result.personal.personalMonth, theme)} />
                </Pressable>
                <Pressable onPress={() => router.push(`/cycles/personal-year?n=${result.personal.personalYear}`)}>
                  <NumberCircle number={result.personal.personalYear} size={56} label="Personal Year" color={colorForNumber(result.personal.personalYear, theme)} />
                </Pressable>
                <NumberCircle number={result.personal.universalDay} size={56} label="Universal Day" color={colorForNumber(result.personal.universalDay, theme)} />
              </ThemedView>
              <Card title={'Personal Year — ' + (PERSONAL_YEAR_INTERPRETATIONS[result.personal.personalYear]?.overallTheme ?? '')}>
                <ThemedText type="small">{PERSONAL_YEAR_INTERPRETATIONS[result.personal.personalYear]?.love}</ThemedText>
              </Card>
              <Card title={'Personal Month — ' + (PERSONAL_MONTH_INTERPRETATIONS[result.personal.personalMonth]?.focus ?? '')}>
                {PERSONAL_MONTH_INTERPRETATIONS[result.personal.personalMonth]?.opportunities.map((o: string) => (
                  <ThemedText key={o} type="small">• {o}</ThemedText>
                ))}
              </Card>
              <Card title={'Personal Day — ' + (PERSONAL_DAY_INTERPRETATIONS[result.personal.personalDay]?.energy ?? '')}>
                <ThemedText type="small">{PERSONAL_DAY_INTERPRETATIONS[result.personal.personalDay]?.guidance}</ThemedText>
              </Card>
            </Section>

            {result.cycles.pinnacles.length > 0 && (
              <Section title="Life Cycles">
                <Card title="Pinnacles">
                  {result.cycles.pinnacles.map((p: { number: number; ages: { start: number; end: number } }, i: number) => (
                    <ThemedText key={i} type="small">
                      Pinnacle {i + 1} (age {p.ages.start}-{p.ages.end === 999 ? 'now' : p.ages.end}): {p.number}
                    </ThemedText>
                  ))}
                </Card>
                <ThemedView style={styles.actions}>
                  <Button title="View Pinnacles Detail" variant="secondary" onPress={() => router.push(`/cycles/pinnacles?lp=${result.core.lifePath}`)} />
                  <Button title="View Challenges Detail" variant="ghost" onPress={() => router.push(`/cycles/challenges?lp=${result.core.lifePath}`)} />
                </ThemedView>
              </Section>
            )}

            <Section title="Advanced Numbers">
              <Card title="Balance Number">
                <ThemedView style={styles.numberRow}>
                  <NumberCircle number={calculateBalance(result.person)} size={40} color={colorForNumber(calculateBalance(result.person), theme)} />
                  <ThemedText type="small" style={{ flex: 1 }}>
                    {BALANCE_INTERPRETATIONS[calculateBalance(result.person)]?.description ?? 'How you respond under stress.'}
                  </ThemedText>
                </ThemedView>
              </Card>

              {(() => {
                const debts = calculateKarmicDebt(result.person);
                return debts.length > 0 ? (
                  <Card title="Karmic Debt">
                    {debts.map((n) => (
                      <ThemedText key={n} type="small">• {n} — {KARMIC_DEBT_INTERPRETATIONS[n]?.title}</ThemedText>
                    ))}
                  </Card>
                ) : null;
              })()}

              {(() => {
                const lessons = calculateKarmicLessons(result.person);
                return lessons.length > 0 ? (
                  <Card title={`Missing Numbers (Karmic Lessons): ${lessons.join(', ')}`}>
                    <ThemedText type="small">These numbers are absent from your name, suggesting qualities to develop.</ThemedText>
                  </Card>
                ) : null;
              })()}

              {(() => {
                const passions = calculateHiddenPassion(result.person);
                return (
                  <Card title="Hidden Passion">
                    {passions.map((n) => {
                      const hi = HIDDEN_PASSION_INTERPRETATIONS[n];
                      return hi ? (
                        <ThemedText key={n} type="small">• {hi.description}</ThemedText>
                      ) : null;
                    })}
                  </Card>
                );
              })()}

              <Button title="View All Advanced Numbers" variant="secondary" onPress={goToAdvanced} />
            </Section>

            <ThemedView style={styles.actions}>
              <Button title="Save as Profile" variant="secondary" onPress={() => router.push('/profile/new')} />
              <Button title="Calculate Again" variant="ghost" onPress={() => { setResult(null); }} />
            </ThemedView>
          </>
        )}

        {Platform.OS === 'web' && <WebBadge />}
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
  numberGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.three,
    justifyContent: 'center',
  },
  error: {
    color: '#ff4444',
  },
  actions: {
    flexDirection: 'row',
    gap: Spacing.three,
    flexWrap: 'wrap',
  },
  numberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
});
