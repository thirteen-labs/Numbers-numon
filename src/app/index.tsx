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
        if (data.length > 0) setActiveProfile(data[0]!);
      });
    }, [setProfiles])
  );

  const now = new Date();
  const personal = activeProfile
    ? calculateAllPersonalNumbers(activeProfile.person.dateOfBirth, now)
    : calculateAllPersonalNumbers(new Date(1990, 0, 1), now);

  const affKey = personal.personalDay;
  const affirmations = AFFIRMATIONS_BY_NUMBER[affKey] ?? AFFIRMATIONS_BY_NUMBER[1]!;
  const dailyAffirmation = affirmations[now.getDate() % affirmations.length]!;

  const bottomPadding = insets.bottom + BottomTabInset + Spacing.three;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.background }}
      contentContainerStyle={[styles.container, { paddingBottom: bottomPadding }]}>
      <ThemedView style={styles.inner}>
        {activeProfile && (
          <Section title={'Welcome, ' + activeProfile.person.firstName}>
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
        )}

        {!activeProfile && profiles.length === 0 && (
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
});
