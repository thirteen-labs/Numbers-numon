import { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import { Button, Input, Section } from '@/components/ui';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { insertGoal } from '@/lib/database';
import type { Goal } from '@/lib/database';

export default function NewGoalScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [favorableNumber, setFavorableNumber] = useState('');

  async function handleSave() {
    if (!title.trim()) return;
    const goal: Goal = {
      id: crypto.randomUUID(),
      profileId: null,
      title: title.trim(),
      description: description.trim(),
      targetDate: null,
      status: 'active',
      progress: 0,
      favorableNumber: parseInt(favorableNumber, 10) || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await insertGoal(goal);
    router.back();
  }

  const bottomPadding = insets.bottom + BottomTabInset + Spacing.three;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.background }}
      contentContainerStyle={[styles.container, { paddingBottom: bottomPadding }]}>
      <ThemedView style={styles.inner}>
        <Section title="New Goal">
          <Input label="Goal Title" value={title} onChangeText={setTitle} placeholder="What do you want to achieve?" autoCapitalize="words" />
          <Input label="Description" value={description} onChangeText={setDescription} placeholder="Details about your goal" multiline />
          <Input label="Favorable Number (optional)" value={favorableNumber} onChangeText={setFavorableNumber} placeholder="e.g. 7" keyboardType="number-pad" />
          <Button title="Create Goal" onPress={handleSave} />
        </Section>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', justifyContent: 'center' },
  inner: { maxWidth: MaxContentWidth, flexGrow: 1, gap: Spacing.five, padding: Spacing.four },
});
