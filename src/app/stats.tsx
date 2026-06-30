import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import { Button, Card, Section } from '@/components/ui';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { getAllProfiles, getAllEntries, getAllGoals } from '@/lib/database';
import { useProfileStore } from '@/lib/store';

export default function StatsScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const { profiles } = useProfileStore();
  const [entryCount, setEntryCount] = useState(0);
  const [goalCount, setGoalCount] = useState(0);
  const [completedGoals, setCompletedGoals] = useState(0);

  useEffect(() => {
    getAllEntries().then((e) => setEntryCount(e.length));
    getAllGoals().then((g) => {
      setGoalCount(g.length);
      setCompletedGoals(g.filter((x) => x.status === 'completed').length);
    });
  }, []);

  const bottomPadding = insets.bottom + BottomTabInset + Spacing.three;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.background }}
      contentContainerStyle={[styles.container, { paddingBottom: bottomPadding }]}>
      <ThemedView style={styles.inner}>
        <Section title="Your Statistics" subtitle="Track your numerology journey">
          <ThemedView style={styles.grid}>
            <StatCard label="Profiles" value={profiles.length} />
            <StatCard label="Journal Entries" value={entryCount} />
            <StatCard label="Total Goals" value={goalCount} />
            <StatCard label="Goals Completed" value={completedGoals} />
            <StatCard label="Completion Rate" value={goalCount > 0 ? Math.round((completedGoals / goalCount) * 100) + '%' : '0%'} />
          </ThemedView>
        </Section>

        <Section title="Quick Actions">
          <Button title="View Profiles" variant="secondary" onPress={() => router.push('/profile')} />
          <Button title="Journal" variant="secondary" onPress={() => router.push('/journal')} />
          <Button title="Goals" variant="secondary" onPress={() => router.push('/goals')} />
          <Button title="Backup Data" variant="ghost" onPress={() => router.push('/backup')} />
        </Section>
      </ThemedView>
    </ScrollView>
  );
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <Card style={styles.statCard}>
      <ThemedText type="subtitle" style={styles.statValue}>{value}</ThemedText>
      <ThemedText type="small" themeColor="textSecondary">{label}</ThemedText>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', justifyContent: 'center' },
  inner: { maxWidth: MaxContentWidth, flexGrow: 1, gap: Spacing.five, padding: Spacing.four },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.three },
  statCard: { flex: 1, minWidth: 100, alignItems: 'center' },
  statValue: { fontSize: 28, fontWeight: '700' },
});
