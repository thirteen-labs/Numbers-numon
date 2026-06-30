import { useCallback, useState } from 'react';
import { Alert, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';

import { Button, Card, Input, Section } from '@/components/ui';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { getEntryById, updateEntry, deleteEntry } from '@/lib/database';
import type { JournalEntry } from '@/lib/database';

export default function JournalDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const [entry, setEntry] = useState<JournalEntry | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editMood, setEditMood] = useState('');
  const [editing, setEditing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      if (!id) return;
      getEntryById(id).then((e) => {
        setEntry(e);
        if (e) {
          setEditTitle(e.title);
          setEditContent(e.content);
          setEditMood(e.mood ?? '');
        }
      });
    }, [id])
  );

  async function handleSave() {
    if (!entry) return;
    await updateEntry(entry.id, {
      title: editTitle.trim(),
      content: editContent.trim(),
      mood: editMood.trim() || null,
    });
    setEditing(false);
    getEntryById(id!).then(setEntry);
  }

  async function handleDelete() {
    if (!entry) return;
    Alert.alert('Delete Entry', 'Delete this journal entry?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => deleteEntry(entry.id).then(() => router.back()) },
    ]);
  }

  if (!entry) return null;

  const bottomPadding = insets.bottom + BottomTabInset + Spacing.three;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.background }}
      contentContainerStyle={[styles.container, { paddingBottom: bottomPadding }]}>
      <ThemedView style={styles.inner}>
        {editing ? (
          <Section title="Edit Entry">
            <Input label="Title" value={editTitle} onChangeText={setEditTitle} autoCapitalize="words" />
            <Input label="Content" value={editContent} onChangeText={setEditContent} multiline />
            <Input label="Mood" value={editMood} onChangeText={setEditMood} autoCapitalize="none" />
            <Button title="Save Changes" onPress={handleSave} />
            <Button title="Cancel" variant="ghost" onPress={() => setEditing(false)} />
          </Section>
        ) : (
          <>
            <Section title={entry.title} subtitle={entry.createdAt.toLocaleString()}>
              <Card>
                <ThemedText type="small">{entry.content}</ThemedText>
              </Card>
              {entry.mood && <Card title="Mood"><ThemedText type="small">{entry.mood}</ThemedText></Card>}
              {entry.tags.length > 0 && (
                <Card title="Tags">
                  <ThemedText type="small">{entry.tags.map((t) => `#${t}`).join(' ')}</ThemedText>
                </Card>
              )}
            </Section>
            <Button title="Edit" onPress={() => setEditing(true)} />
            <Button title="Delete" variant="secondary" onPress={handleDelete} />
          </>
        )}
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', justifyContent: 'center' },
  inner: { maxWidth: MaxContentWidth, flexGrow: 1, gap: Spacing.five, padding: Spacing.four },
});
