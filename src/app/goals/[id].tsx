import { useCallback, useState } from 'react';
import { Alert, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';

import { Button, Card, Input, Section } from '@/components/ui';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { getGoalById, updateGoal, deleteGoal } from '@/lib/database';
import type { Goal } from '@/lib/database';

export default function GoalDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const [goal, setGoal] = useState<Goal | null>(null);
  const [progress, setProgress] = useState('');

  useFocusEffect(useCallback(() => {
    if (!id) return;
    getGoalById(id).then((g) => { setGoal(g); if (g) setProgress(String(g.progress)); });
  }, [id]));

  async function handleUpdateProgress() {
    if (!goal) return;
    const p = Math.min(100, Math.max(0, parseInt(progress, 10) || 0));
    await updateGoal(goal.id, { progress: p });
    getGoalById(id!).then(setGoal);
  }

  async function handleToggleStatus() {
    if (!goal) return;
    const next = goal.status === 'active' ? 'completed' : goal.status === 'completed' ? 'active' : 'active';
    await updateGoal(goal.id, { status: next as Goal['status'] });
    getGoalById(id!).then(setGoal);
  }

  async function handleDelete() {
    if (!goal) return;
    Alert.alert('Delete Goal', 'Delete this goal?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => deleteGoal(goal.id).then(() => router.back()) },
    ]);
  }

  if (!goal) return null;

  const bottomPadding = insets.bottom + BottomTabInset + Spacing.three;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.background }}
      contentContainerStyle={[styles.container, { paddingBottom: bottomPadding }]}>
      <ThemedView style={styles.inner}>
        <Section title={goal.title}>
          <Card title="Description">
            <ThemedText type="small">{goal.description || 'No description'}</ThemedText>
          </Card>
          <Card title={`Status: ${goal.status}`}>
            <ThemedText type="small">Progress: {goal.progress}%</ThemedText>
          </Card>
          {goal.favorableNumber && (
            <Card title={`Favorable Number: ${goal.favorableNumber}`}>
              <ThemedText type="small">Work on this goal during periods aligned with this number.</ThemedText>
            </Card>
          )}
        </Section>

        <Section title="Update Progress">
          <Input label="Progress (0-100)" value={progress} onChangeText={setProgress} keyboardType="number-pad" />
          <Button title="Update" onPress={handleUpdateProgress} />
        </Section>

        <Button title={goal.status === 'active' ? 'Mark Complete' : 'Reactivate'} variant="secondary" onPress={handleToggleStatus} />
        <Button title="Delete Goal" variant="ghost" onPress={handleDelete} />
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', justifyContent: 'center' },
  inner: { maxWidth: MaxContentWidth, flexGrow: 1, gap: Spacing.five, padding: Spacing.four },
});
