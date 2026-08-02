import { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import { Button, Input, Section } from '@/components/ui';
import { ThemedView } from '@/components/themed-view';
import { RichTextInput } from '@/components/rich-text-input';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { insertEntry } from '@/lib/database';
import type { JournalEntry } from '@/lib/database';

export default function NewJournalEntryScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mood, setMood] = useState('');
  const [tags, setTags] = useState('');

  async function handleSave() {
    if (!title.trim()) return;
    const entry: JournalEntry = {
      id: crypto.randomUUID(),
      profileId: null,
      title: title.trim(),
      content: content.trim(),
      mood: mood.trim() || null,
      tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await insertEntry(entry);
    router.back();
  }

  const bottomPadding = insets.bottom + BottomTabInset + Spacing.three;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.background }}
      contentContainerStyle={[styles.container, { paddingBottom: bottomPadding }]}>
      <ThemedView style={styles.inner}>
        <Section title="New Journal Entry">
          <Input label="Title" value={title} onChangeText={setTitle} placeholder="Entry title" autoCapitalize="words" />
          <RichTextInput value={content} onChangeText={setContent} placeholder="Write your thoughts..." />
          <Input label="Mood" value={mood} onChangeText={setMood} placeholder="e.g. happy, reflective, anxious" autoCapitalize="none" />
          <Input label="Tags (comma-separated)" value={tags} onChangeText={setTags} placeholder="e.g. gratitude, insight, dream" autoCapitalize="none" />
          <Button title="Save Entry" onPress={handleSave} />
        </Section>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', justifyContent: 'center' },
  inner: { maxWidth: MaxContentWidth, flexGrow: 1, gap: Spacing.five, padding: Spacing.four },
});
