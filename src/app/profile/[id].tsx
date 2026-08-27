import { useCallback, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';

import { Button, Card, NumberCircle, Section } from '@/components/ui';
import { NumberRadar } from '@/components/charts';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { BALANCE_INTERPRETATIONS } from '@/data/balance';
import { LIFE_PATH_INTERPRETATIONS } from '@/data/life-path';
import { NUMBER_MEANINGS } from '@/data/number-meanings';
import { useTheme } from '@/hooks/use-theme';
import { getProfileById, deleteProfile, toggleFavorite } from '@/lib/database';
import { useProfileStore } from '@/lib/store';
import { calculateAllCoreNumbers, calculateAllPersonalNumbers } from '@/lib/numerology';
import {
  calculateBalance,
  calculateKarmicDebt,
  calculateKarmicLessons,
} from '@/lib/numerology/advanced';
import { colorForNumber } from '@/lib/numerology/utils';
import type { Profile } from '@/lib/schema';

export default function ProfileDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const { removeProfile, updateProfile } = useProfileStore();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loaded, setLoaded] = useState(false);

  useFocusEffect(
    useCallback(() => {
      if (!id) return;
      let cancelled = false;
      let timeout: ReturnType<typeof setTimeout> | null = null;
      const load = async () => {
        try {
          const p = await Promise.race([
            getProfileById(id),
            new Promise<never>((_, reject) => { timeout = setTimeout(() => reject(new Error('Load profile timed out')), 5000); }),
          ]) as Profile | null;
          if (cancelled) return;
          setProfile(p);
          setLoaded(true);
        } catch (e) {
          if (cancelled) return;
          console.error('Failed to load profile', e);
          setProfile(null);
          setLoaded(true);
        } finally {
          if (timeout) clearTimeout(timeout);
        }
      };
      load();
      return () => { cancelled = true; if (timeout) clearTimeout(timeout); };
    }, [id])
  );

  if (!loaded || !profile) {
    return (
      <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ThemedText>{loaded ? 'Profile not found' : 'Loading...'}</ThemedText>
      </ThemedView>
    );
  }

  const p = profile as Profile;
  const core = calculateAllCoreNumbers(p.person);
  const personal = calculateAllPersonalNumbers(p.person.dateOfBirth);
  const balance = calculateBalance(p.person);
  const karmicDebt = calculateKarmicDebt(p.person);
  const karmicLessons = calculateKarmicLessons(p.person);

  async function handleDelete() {
    Alert.alert('Delete Profile', `Delete ${p.name}?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          await deleteProfile(p.id);
          removeProfile(p.id);
          router.back();
        },
      },
    ]);
  }

  async function handleToggleFavorite() {
    const newFavorite = !p.isFavorite;
    await toggleFavorite(p.id, newFavorite);
    const updated: Profile = {
      id: p.id,
      name: p.name,
      person: p.person,
      isFavorite: newFavorite,
      createdAt: p.createdAt,
      updatedAt: new Date(),
    };
    setProfile(updated);
    updateProfile(p.id, updated);
  }

  const bottomPadding = insets.bottom + BottomTabInset + Spacing.three;

  function goToNumberDetail(type: string, n: number) {
    router.push(`/numbers/${type}?n=${n}`);
  }

  function goToAdvanced() {
    const dob = p.person.dateOfBirth;
    router.push(`/numbers/advanced?fn=${encodeURIComponent(p.person.firstName)}&ln=${encodeURIComponent(p.person.lastName)}&y=${dob.getFullYear()}&m=${dob.getMonth() + 1}&d=${dob.getDate()}`);
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.background }}
      contentContainerStyle={[styles.container, { paddingBottom: bottomPadding }]}>
      <ThemedView style={styles.inner}>
        <Section title={p.name} subtitle={`${p.person.firstName} ${p.person.lastName} — ${p.person.dateOfBirth.toLocaleDateString()}`}>
          <ThemedView style={styles.actions}>
            <Button title={p.isFavorite ? '★ Unfavorite' : '☆ Favorite'} variant="secondary" onPress={handleToggleFavorite} />
          </ThemedView>
        </Section>

        <Section title="Core Numbers">
          <ThemedView style={styles.numberGrid}>
            <Pressable onPress={() => goToNumberDetail('life-path', core.lifePath)}>
              <NumberCircle number={core.lifePath} label="Life Path" color={colorForNumber(core.lifePath, theme)} />
            </Pressable>
            <Pressable onPress={() => goToNumberDetail('expression', core.expression)}>
              <NumberCircle number={core.expression} label="Expression" color={colorForNumber(core.expression, theme)} />
            </Pressable>
            <Pressable onPress={() => goToNumberDetail('soul-urge', core.soulUrge)}>
              <NumberCircle number={core.soulUrge} label="Soul Urge" color={colorForNumber(core.soulUrge, theme)} />
            </Pressable>
            <Pressable onPress={() => goToNumberDetail('personality', core.personality)}>
              <NumberCircle number={core.personality} label="Personality" color={colorForNumber(core.personality, theme)} />
            </Pressable>
            <Pressable onPress={() => goToNumberDetail('birthday', core.birthday)}>
              <NumberCircle number={core.birthday} label="Birthday" color={colorForNumber(core.birthday, theme)} />
            </Pressable>
            <Pressable onPress={() => goToNumberDetail('attitude', core.attitude)}>
              <NumberCircle number={core.attitude} label="Attitude" color={colorForNumber(core.attitude, theme)} />
            </Pressable>
            <Pressable onPress={() => goToNumberDetail('maturity', core.maturity)}>
              <NumberCircle number={core.maturity} label="Maturity" color={colorForNumber(core.maturity, theme)} />
            </Pressable>
          </ThemedView>
          <ThemedView style={styles.chartContainer}>
            <NumberRadar
              numbers={[core.lifePath, core.expression, core.soulUrge, core.personality, core.birthday, core.attitude, core.maturity]}
              labels={['Life Path', 'Expression', 'Soul Urge', 'Personality', 'Birthday', 'Attitude', 'Maturity']}
              size={240}
            />
          </ThemedView>
        </Section>

        <Section title={'Life Path — ' + (LIFE_PATH_INTERPRETATIONS[core.lifePath]?.title ?? NUMBER_MEANINGS[core.lifePath]?.title ?? '')}>
          <ThemedText type="small">{LIFE_PATH_INTERPRETATIONS[core.lifePath]?.overview ?? NUMBER_MEANINGS[core.lifePath]?.description}</ThemedText>
          <Card title="Strengths">
            {(LIFE_PATH_INTERPRETATIONS[core.lifePath]?.strengths ?? NUMBER_MEANINGS[core.lifePath]?.positive ?? []).map((s: string) => (
              <ThemedText key={s} type="small">• {s}</ThemedText>
            ))}
          </Card>
          <Card title="Challenges">
            {(LIFE_PATH_INTERPRETATIONS[core.lifePath]?.challenges ?? NUMBER_MEANINGS[core.lifePath]?.negative ?? []).map((s: string) => (
              <ThemedText key={s} type="small">• {s}</ThemedText>
            ))}
          </Card>
          <Card title="Career Paths">
            {(LIFE_PATH_INTERPRETATIONS[core.lifePath]?.career ?? NUMBER_MEANINGS[core.lifePath]?.career ?? []).map((c: string) => (
              <ThemedText key={c} type="small">• {c}</ThemedText>
            ))}
          </Card>
          <Card title="Relationships">
            <ThemedText type="small">{LIFE_PATH_INTERPRETATIONS[core.lifePath]?.relationships}</ThemedText>
          </Card>
          <Card title="Spiritual Growth">
            <ThemedText type="small">{LIFE_PATH_INTERPRETATIONS[core.lifePath]?.spiritualGrowth}</ThemedText>
          </Card>
          {LIFE_PATH_INTERPRETATIONS[core.lifePath]?.famousExamples && (
            <Card title="Famous Examples">
              {LIFE_PATH_INTERPRETATIONS[core.lifePath]!.famousExamples.map((name: string) => (
                <ThemedText key={name} type="small">• {name}</ThemedText>
              ))}
            </Card>
          )}
        </Section>

        <Section title="Today's Numbers">
          <ThemedView style={styles.numberGrid}>
            <Pressable onPress={() => router.push(`/cycles/personal-day?n=${personal.personalDay}`)}>
              <NumberCircle number={personal.personalDay} size={56} label="Personal Day" color={colorForNumber(personal.personalDay, theme)} />
            </Pressable>
            <Pressable onPress={() => router.push(`/cycles/personal-month?n=${personal.personalMonth}`)}>
              <NumberCircle number={personal.personalMonth} size={56} label="Personal Month" color={colorForNumber(personal.personalMonth, theme)} />
            </Pressable>
            <Pressable onPress={() => router.push(`/cycles/personal-year?n=${personal.personalYear}`)}>
              <NumberCircle number={personal.personalYear} size={56} label="Personal Year" color={colorForNumber(personal.personalYear, theme)} />
            </Pressable>
          </ThemedView>
        </Section>

        <Section title="Advanced Numbers">
          <Card title={`Balance Number: ${balance}`}>
            <ThemedText type="smallBold">{BALANCE_INTERPRETATIONS[balance]?.description}</ThemedText>
            <ThemedText type="small" style={styles.subtitle}>Under Stress:</ThemedText>
            <ThemedText type="small">{BALANCE_INTERPRETATIONS[balance]?.underStress}</ThemedText>
            <ThemedText type="small" style={styles.subtitle}>Growth Path:</ThemedText>
            <ThemedText type="small">{BALANCE_INTERPRETATIONS[balance]?.growthPath}</ThemedText>
          </Card>
          {karmicDebt.length > 0 && (
            <Card title="Karmic Debt">
              {karmicDebt.map((n) => (
                <ThemedText key={n} type="small">• {n}</ThemedText>
              ))}
            </Card>
          )}
          {karmicLessons.length > 0 && (
            <Card title={`Karmic Lessons: ${karmicLessons.join(', ')}`}>
              <ThemedText type="small">Missing numbers suggesting qualities to develop.</ThemedText>
            </Card>
          )}
          <Button title="View All Advanced Numbers" variant="secondary" onPress={goToAdvanced} />
        </Section>

        <ThemedView style={styles.actions}>
          <Button title="Use in Calculator" onPress={() => router.push(`/calculator?id=${p.id}`)} />
          <Button title="Delete Profile" variant="secondary" onPress={handleDelete} />
        </ThemedView>
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
  actions: {
    flexDirection: 'row',
    gap: Spacing.three,
    flexWrap: 'wrap',
  },
  subtitle: {
    fontWeight: '600',
    marginTop: Spacing.two,
    opacity: 0.7,
  },
  chartContainer: {
    alignItems: 'center',
    marginTop: Spacing.four,
  },
});
