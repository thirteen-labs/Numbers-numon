import { useCallback, useState } from 'react';
import { Pressable, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router, useFocusEffect } from 'expo-router';

import { Button, Card, Section } from '@/components/ui';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { getAllGoals } from '@/lib/database';
import type { Goal } from '@/lib/database';

const STATUS_COLORS: Record<string, string> = { active: '#4ECDC4', completed: '#2ECC71', cancelled: '#E74C3C' };

export default function GoalsListScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const [goals, setGoals] = useState<Goal[]>([]);

  useFocusEffect(
    useCallback(() => {
      getAllGoals()
        .then(setGoals)
        .catch((e) => {
          console.error('Failed to load goals', e);
          setGoals([]);
        });
    }, [])
  );

  const bottomPadding = insets.bottom + BottomTabInset + Spacing.three;
  const active = goals.filter((g) => g.status === 'active');
  const completed = goals.filter((g) => g.status === 'completed');

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.background }}
      contentContainerStyle={[styles.container, { paddingBottom: bottomPadding }]}>
      <ThemedView style={styles.inner}>
        <Section title="Goals" subtitle="Track your personal growth">
          <Button title="New Goal" onPress={() => router.push('/goals/new')} />
        </Section>

        {active.map((goal) => (
          <Pressable key={goal.id} onPress={() => router.push(`/goals/${goal.id}`)}>
            <Card title={goal.title} style={{ borderLeftColor: STATUS_COLORS[goal.status], borderLeftWidth: 3 }}>
              <ThemedText type="small" numberOfLines={2}>{goal.description || 'No description'}</ThemedText>
              <ThemedView style={styles.meta}>
                <ThemedText type="small">Progress: {goal.progress}%</ThemedText>
                {goal.targetDate && <ThemedText type="small">Due: {goal.targetDate.toLocaleDateString()}</ThemedText>}
              </ThemedView>
            </Card>
          </Pressable>
        ))}

        {completed.length > 0 && (
          <Section title={`Completed (${completed.length})`}>
            {completed.map((goal) => (
              <Card key={goal.id} title={goal.title}>
                <ThemedText type="small">Completed!</ThemedText>
              </Card>
            ))}
          </Section>
        )}

        {goals.length === 0 && <ThemedText themeColor="textSecondary">No goals yet. Create one!</ThemedText>}
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', justifyContent: 'center' },
  inner: { maxWidth: MaxContentWidth, flexGrow: 1, gap: Spacing.five, padding: Spacing.four },
  meta: { flexDirection: 'row', justifyContent: 'space-between', marginTop: Spacing.two },
});
