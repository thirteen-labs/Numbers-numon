import { useCallback, useState } from 'react';
import { Pressable, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router, useFocusEffect } from 'expo-router';

import { Button, Card, Input, Section } from '@/components/ui';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { RichTextDisplay } from '@/components/rich-text-display';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { getAllEntries, searchEntries } from '@/lib/database';
import type { JournalEntry } from '@/lib/database';

export default function JournalListScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [search, setSearch] = useState('');

  useFocusEffect(
    useCallback(() => {
      loadEntries();
    }, [])
  );

  async function loadEntries(q?: string) {
    const data = q ? await searchEntries(q) : await getAllEntries();
    setEntries(data);
  }

  const bottomPadding = insets.bottom + BottomTabInset + Spacing.three;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.background }}
      contentContainerStyle={[styles.container, { paddingBottom: bottomPadding }]}>
      <ThemedView style={styles.inner}>
        <Section title="Journal" subtitle="Your personal reflections">
          <Input label="Search" value={search} onChangeText={(v) => { setSearch(v); loadEntries(v); }} placeholder="Search entries..." autoCapitalize="none" />
          <Button title="New Entry" onPress={() => router.push('/journal/new')} />
        </Section>

        {entries.length === 0 && (
          <ThemedText themeColor="textSecondary">No entries yet. Start writing!</ThemedText>
        )}

        {entries.map((entry) => (
          <Pressable key={entry.id} onPress={() => router.push(`/journal/${entry.id}`)}>
            <Card title={entry.title}>
              <ThemedText type="small" numberOfLines={2}>{entry.content.replace(/[*#•—]/g, '').slice(0, 100)}</ThemedText>
              <ThemedView style={styles.meta}>
                {entry.mood && <ThemedText type="small">Mood: {entry.mood}</ThemedText>}
                <ThemedText type="small">{entry.createdAt.toLocaleDateString()}</ThemedText>
              </ThemedView>
              {entry.tags.length > 0 && (
                <ThemedText type="small">{entry.tags.map((t) => `#${t}`).join(' ')}</ThemedText>
              )}
            </Card>
          </Pressable>
        ))}
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', justifyContent: 'center' },
  inner: { maxWidth: MaxContentWidth, flexGrow: 1, gap: Spacing.five, padding: Spacing.four },
  meta: { flexDirection: 'row', justifyContent: 'space-between', marginTop: Spacing.two },
});
