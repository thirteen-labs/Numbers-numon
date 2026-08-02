import { useCallback, useState } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';

import { Button, Card, DatePickerField, Input, NumberCircle, Section } from '@/components/ui';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { WebBadge } from '@/components/web-badge';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { ATTITUDE_INTERPRETATIONS } from '@/data/attitude';
import { BALANCE_INTERPRETATIONS } from '@/data/balance';
import { BIRTHDAY_INTERPRETATIONS } from '@/data/birthday';
import { EXPRESSION_INTERPRETATIONS } from '@/data/expression';
import { HIDDEN_PASSION_INTERPRETATIONS } from '@/data/hidden-passion';
import { KARMIC_DEBT_INTERPRETATIONS } from '@/data/karmic-debt';
import { LIFE_PATH_INTERPRETATIONS } from '@/data/life-path';
import { MATURITY_INTERPRETATIONS } from '@/data/maturity';
import { NUMBER_MEANINGS } from '@/data/number-meanings';
import { PERSONALITY_INTERPRETATIONS } from '@/data/personality';
import { SOUL_URGE_INTERPRETATIONS } from '@/data/soul-urge';
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
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
  const [gender, setGender] = useState('');
  const [birthTime, setBirthTime] = useState('');
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
        setDateOfBirth(profile.person.dateOfBirth);
        setGender(profile.person.gender ?? '');
        setBirthTime(profile.person.birthTime ?? '');
        setResult(null);
      });
    }, [id])
  );

  function handleCalculate() {
    if (!firstName.trim()) { setError('First name is required'); return; }
    if (!lastName.trim()) { setError('Last name is required'); return; }
    if (!dateOfBirth) { setError('Date of birth is required'); return; }

    const person: PersonInput = { firstName: firstName.trim(), lastName: lastName.trim(), middleName: middleName.trim() || undefined, dateOfBirth, birthTime: birthTime.trim() || undefined };

    const core = calculateAllCoreNumbers(person);
    const personal = calculateAllPersonalNumbers(person.dateOfBirth);
    const cycles = calculateCycles(core, person.dateOfBirth);

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
          <DatePickerField label="Date of Birth" value={dateOfBirth} onChange={setDateOfBirth} />

          <ThemedText type="smallBold" style={{ marginTop: Spacing.three }}>Gender (optional)</ThemedText>
          <ThemedView style={styles.genderRow}>
            {['', 'male', 'female', 'other'].map((key) => (
              <Pressable
                key={key}
                onPress={() => setGender(key)}
                style={[
                  styles.genderChip,
                  { backgroundColor: gender === key ? theme.tint : theme.backgroundElement },
                ]}>
                <ThemedText type="small" themeColor={gender === key ? 'background' : 'text'}>
                  {key ? key.charAt(0).toUpperCase() + key.slice(1) : 'Prefer not to say'}
                </ThemedText>
              </Pressable>
            ))}
          </ThemedView>

          <Input label="Birth Time (optional)" value={birthTime} onChangeText={setBirthTime} placeholder="HH:MM AM/PM" />

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
                {result.core.birthTimeNumber !== null && (
                  <Pressable onPress={() => goToNumberDetail('birth-time', result.core.birthTimeNumber!)}>
                    <NumberCircle number={result.core.birthTimeNumber!} label="Birth Time" color={colorForNumber(result.core.birthTimeNumber!, theme)} />
                  </Pressable>
                )}
              </ThemedView>
            </Section>

            <Section title={'Life Path — ' + (LIFE_PATH_INTERPRETATIONS[result.core.lifePath]?.title ?? NUMBER_MEANINGS[result.core.lifePath]?.title ?? '')}>
              <ThemedText type="small">{LIFE_PATH_INTERPRETATIONS[result.core.lifePath]?.overview ?? NUMBER_MEANINGS[result.core.lifePath]?.description}</ThemedText>
              <Card title="Strengths">
                {(LIFE_PATH_INTERPRETATIONS[result.core.lifePath]?.strengths ?? NUMBER_MEANINGS[result.core.lifePath]?.positive ?? []).map((s: string) => (
                  <ThemedText key={s} type="small">• {s}</ThemedText>
                ))}
              </Card>
              <Card title="Challenges">
                {(LIFE_PATH_INTERPRETATIONS[result.core.lifePath]?.challenges ?? NUMBER_MEANINGS[result.core.lifePath]?.negative ?? []).map((s: string) => (
                  <ThemedText key={s} type="small">• {s}</ThemedText>
                ))}
              </Card>
              <Card title="Career Paths">
                {(LIFE_PATH_INTERPRETATIONS[result.core.lifePath]?.career ?? NUMBER_MEANINGS[result.core.lifePath]?.career ?? []).map((c: string) => (
                  <ThemedText key={c} type="small">• {c}</ThemedText>
                ))}
              </Card>
              <Card title="Relationships">
                <ThemedText type="small">{LIFE_PATH_INTERPRETATIONS[result.core.lifePath]?.relationships}</ThemedText>
              </Card>
              <Card title="Spiritual Growth">
                <ThemedText type="small">{LIFE_PATH_INTERPRETATIONS[result.core.lifePath]?.spiritualGrowth}</ThemedText>
              </Card>
              {LIFE_PATH_INTERPRETATIONS[result.core.lifePath]?.famousExamples && (
                <Card title="Famous Examples">
                  {LIFE_PATH_INTERPRETATIONS[result.core.lifePath]!.famousExamples.map((name: string) => (
                    <ThemedText key={name} type="small">• {name}</ThemedText>
                  ))}
                </Card>
              )}
            </Section>

            <Section title={'Expression — ' + (EXPRESSION_INTERPRETATIONS[result.core.expression]?.title ?? NUMBER_MEANINGS[result.core.expression]?.title ?? '')}>
              <ThemedText type="small">{EXPRESSION_INTERPRETATIONS[result.core.expression]?.potential ?? NUMBER_MEANINGS[result.core.expression]?.description}</ThemedText>
              <Card title="Natural Talents">
                {(EXPRESSION_INTERPRETATIONS[result.core.expression]?.naturalTalents ?? []).map((t: string) => (
                  <ThemedText key={t} type="small">• {t}</ThemedText>
                ))}
              </Card>
              <Card title="Personal Development">
                <ThemedText type="small">{EXPRESSION_INTERPRETATIONS[result.core.expression]?.personalDevelopment}</ThemedText>
              </Card>
            </Section>

            <Section title={'Soul Urge — ' + (SOUL_URGE_INTERPRETATIONS[result.core.soulUrge]?.title ?? NUMBER_MEANINGS[result.core.soulUrge]?.title ?? '')}>
              <ThemedText type="small">{SOUL_URGE_INTERPRETATIONS[result.core.soulUrge]?.innerDesire ?? NUMBER_MEANINGS[result.core.soulUrge]?.description}</ThemedText>
              <Card title="Emotional Motivation">
                <ThemedText type="small">{SOUL_URGE_INTERPRETATIONS[result.core.soulUrge]?.emotionalMotivation}</ThemedText>
              </Card>
              <Card title="Hidden Dreams">
                <ThemedText type="small">{SOUL_URGE_INTERPRETATIONS[result.core.soulUrge]?.hiddenDreams}</ThemedText>
              </Card>
              <Card title="Personal Fulfillment">
                <ThemedText type="small">{SOUL_URGE_INTERPRETATIONS[result.core.soulUrge]?.personalFulfillment}</ThemedText>
              </Card>
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
                  <Button title="View Pinnacles Detail" variant="secondary" onPress={() => {
                    const dob = result.person.dateOfBirth;
                    router.push(`/cycles/pinnacles?lp=${result.core.lifePath}&y=${dob.getFullYear()}&m=${dob.getMonth()+1}&d=${dob.getDate()}`);
                  }} />
                  <Button title="View Challenges Detail" variant="ghost" onPress={() => {
                    const dob = result.person.dateOfBirth;
                    router.push(`/cycles/challenges?lp=${result.core.lifePath}&y=${dob.getFullYear()}&m=${dob.getMonth()+1}&d=${dob.getDate()}`);
                  }} />
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
  genderRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  genderChip: {
    paddingVertical: Spacing.one,
    paddingHorizontal: Spacing.three,
    borderRadius: Spacing.three,
  },
});
