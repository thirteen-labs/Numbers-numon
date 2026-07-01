import { useCallback, useState } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router, useFocusEffect } from 'expo-router';

import { Button, Card, NumberCircle, Section } from '@/components/ui';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { WebBadge } from '@/components/web-badge';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { AFFIRMATIONS_BY_NUMBER } from '@/data/affirmations';
import { LUCKY_COLORS } from '@/data/lucky-colors';
import { LUCKY_DAYS } from '@/data/lucky-days';
import { PERSONAL_DAY_INTERPRETATIONS } from '@/data/personal-day';
import { PERSONAL_MONTH_INTERPRETATIONS } from '@/data/personal-month';
import { PERSONAL_YEAR_INTERPRETATIONS } from '@/data/personal-year';
import { useTheme } from '@/hooks/use-theme';
import { useProfileStore } from '@/lib/store';
import { getAllProfiles } from '@/lib/database';
import {
  calculateAllPersonalNumbers,
  calculateAllCoreNumbers,
} from '@/lib/numerology';
import { colorForNumber } from '@/lib/numerology/utils';
import type { Profile } from '@/lib/schema';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const { profiles, setProfiles } = useProfileStore();
  const [activeProfile, setActiveProfile] = useState<Profile | null>(null);

  useFocusEffect(
    useCallback(() => {
      getAllProfiles().then((data) => {
        setProfiles(data);
        if (data.length > 0) {
          if (!activeProfile || !data.find((p) => p.id === activeProfile.id)) {
            setActiveProfile(data[0]!);
          }
        } else {
          setActiveProfile(null);
        }
      });
    }, [setProfiles, activeProfile])
  );

  const now = new Date();
  const personal = activeProfile
    ? calculateAllPersonalNumbers(activeProfile.person.dateOfBirth, now)
    : calculateAllPersonalNumbers(new Date(1990, 0, 1), now);

  const affKey = personal.personalDay;
  const affirmations = AFFIRMATIONS_BY_NUMBER[affKey] ?? AFFIRMATIONS_BY_NUMBER[1]!;
  const dailyAffirmation = affirmations[now.getDate() % affirmations.length]!;

  const mainNumber = activeProfile
    ? calculateAllCoreNumbers(activeProfile.person).lifePath
    : 1;
  const luckyColors = LUCKY_COLORS[mainNumber];
  const luckyDays = LUCKY_DAYS[mainNumber];

  const bottomPadding = insets.bottom + BottomTabInset + Spacing.three;

  function switchProfile(id: string) {
    const found = profiles.find((p) => p.id === id);
    if (found) setActiveProfile(found);
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.background }}
      contentContainerStyle={[styles.container, { paddingBottom: bottomPadding }]}>
      <ThemedView style={styles.inner}>
        {activeProfile ? (
          <Section title={'Welcome, ' + activeProfile.person.firstName}>
            {profiles.length > 1 && (
              <ThemedView style={styles.profileRow}>
                {profiles.map((p) => (
                  <Pressable key={p.id} onPress={() => switchProfile(p.id)}>
                    <ThemedView
                      type={p.id === activeProfile.id ? 'backgroundSelected' : 'backgroundElement'}
                      style={styles.profileChip}>
                      <ThemedText type="small">{p.person.firstName}</ThemedText>
                    </ThemedView>
                  </Pressable>
                ))}
              </ThemedView>
            )}
            <Pressable onPress={() => router.push(`/profile/${activeProfile.id}`)}>
              <Card>
                <ThemedText type="small">
                  {activeProfile.person.firstName} {activeProfile.person.lastName}
                  {' — '}
                  {activeProfile.person.dateOfBirth.toLocaleDateString()}
                </ThemedText>
              </Card>
            </Pressable>
          </Section>
        ) : (
          <Section title="Welcome to Numon" subtitle="Create a profile to see your personalized numerology">
            <Button title="Create Profile" onPress={() => router.push('/profile/new')} />
          </Section>
        )}

        <Section title="Today's Numbers" subtitle={now.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}>
          <ThemedView style={styles.numberGrid}>
            <NumberCircle number={personal.personalDay} label="Personal Day" color={colorForNumber(personal.personalDay, theme)} />
            <NumberCircle number={personal.personalMonth} label="Personal Month" color={colorForNumber(personal.personalMonth, theme)} />
            <NumberCircle number={personal.personalYear} label="Personal Year" color={colorForNumber(personal.personalYear, theme)} />
            <NumberCircle number={personal.universalDay} label="Universal Day" color={colorForNumber(personal.universalDay, theme)} />
          </ThemedView>
        </Section>

        {activeProfile && luckyColors && (
          <Section title="Lucky Numbers & Colors">
            <ThemedView style={styles.luckyRow}>
              <Pressable onPress={() => router.push(`/lucky?n=${mainNumber}`)}>
                <Card style={styles.luckyCard}>
                  <ThemedText type="smallBold">Lucky Number</ThemedText>
                  <ThemedText type="subtitle">{mainNumber}</ThemedText>
                </Card>
              </Pressable>
              <Card style={styles.luckyCard}>
                <ThemedText type="smallBold">Lucky Color</ThemedText>
                <ThemedView style={styles.colorRow}>
                  {luckyColors.hex.slice(0, 3).map((hex, i) => (
                    <ThemedView key={hex + i} style={[styles.colorSwatch, { backgroundColor: hex }]} />
                  ))}
                </ThemedView>
                <ThemedText type="small">{luckyColors.primary}</ThemedText>
              </Card>
              {luckyDays && (
                <Card style={styles.luckyCard}>
                  <ThemedText type="smallBold">Lucky Day</ThemedText>
                  <ThemedText type="small">{luckyDays.weekdays[0]}</ThemedText>
                </Card>
              )}
            </ThemedView>
          </Section>
        )}

        <Section title="Daily Affirmation">
          <Card>
            <ThemedText style={styles.affirmationText}>{dailyAffirmation}</ThemedText>
          </Card>
        </Section>

        <Section title={'Personal Day — ' + PERSONAL_DAY_INTERPRETATIONS[personal.personalDay]?.energy}>
          <ThemedText type="small">{PERSONAL_DAY_INTERPRETATIONS[personal.personalDay]?.guidance}</ThemedText>
        </Section>

        <Section title={'Personal Year — ' + PERSONAL_YEAR_INTERPRETATIONS[personal.personalYear]?.overallTheme}>
          <Card title="Love">
            <ThemedText type="small">{PERSONAL_YEAR_INTERPRETATIONS[personal.personalYear]?.love}</ThemedText>
          </Card>
          <Card title="Career">
            <ThemedText type="small">{PERSONAL_YEAR_INTERPRETATIONS[personal.personalYear]?.career}</ThemedText>
          </Card>
          <Card title="Best Actions">
            {PERSONAL_YEAR_INTERPRETATIONS[personal.personalYear]?.bestActions.map((a: string) => (
              <ThemedText key={a} type="small">• {a}</ThemedText>
            ))}
          </Card>
        </Section>

        <Section title={'Personal Month — ' + PERSONAL_MONTH_INTERPRETATIONS[personal.personalMonth]?.focus}>
          <Card title="Opportunities">
            {PERSONAL_MONTH_INTERPRETATIONS[personal.personalMonth]?.opportunities.map((o: string) => (
              <ThemedText key={o} type="small">• {o}</ThemedText>
            ))}
          </Card>
        </Section>

        <ThemedView style={styles.quickLinks}>
          <Button title="Calculator" onPress={() => router.push('/calculator')} style={{ flex: 1 }} />
          <Button title="Journal" variant="secondary" onPress={() => router.push('/journal')} style={{ flex: 1 }} />
        </ThemedView>
        <ThemedView style={styles.quickLinks}>
          <Button title="Goals" variant="secondary" onPress={() => router.push('/goals')} style={{ flex: 1 }} />
          <Button title="Stats" variant="ghost" onPress={() => router.push('/stats')} style={{ flex: 1 }} />
        </ThemedView>
        <ThemedView style={styles.quickLinks}>
          <Button title="Affirmations" variant="ghost" onPress={() => router.push('/affirmations')} style={{ flex: 1 }} />
          <Button title="Search" variant="ghost" onPress={() => router.push('/search')} style={{ flex: 1 }} />
          <Button title="Settings" variant="ghost" onPress={() => router.push('/settings')} style={{ flex: 1 }} />
        </ThemedView>

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
  affirmationText: {
    fontSize: 18,
    fontStyle: 'italic',
    lineHeight: 26,
    textAlign: 'center',
  },
  quickLinks: {
    flexDirection: 'row',
    gap: Spacing.three,
  },
  profileRow: {
    flexDirection: 'row',
    gap: Spacing.two,
    marginBottom: Spacing.three,
  },
  profileChip: {
    paddingVertical: Spacing.one,
    paddingHorizontal: Spacing.three,
    borderRadius: Spacing.three,
  },
  luckyRow: {
    flexDirection: 'row',
    gap: Spacing.three,
    flexWrap: 'wrap',
  },
  luckyCard: {
    flex: 1,
    minWidth: 100,
    alignItems: 'center',
  },
  colorRow: {
    flexDirection: 'row',
    gap: Spacing.one,
    marginVertical: Spacing.two,
  },
  colorSwatch: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
});
