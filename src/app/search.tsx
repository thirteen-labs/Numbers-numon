import { useState, useMemo } from 'react';
import { FlatList, Pressable, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import { Input } from '@/components/ui';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, Spacing } from '@/constants/theme';
import { NUMBER_MEANINGS } from '@/data/number-meanings';
import { ANGEL_NUMBERS } from '@/data/angel-numbers';
import { CHINESE_ZODIAC } from '@/data/chinese-zodiac';
import { EDUCATIONAL_CONTENT } from '@/data/educational';
import { useTheme } from '@/hooks/use-theme';

interface SearchResult {
  id: string;
  title: string;
  subtitle: string;
  route: string;
}

export default function SearchScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    const items: SearchResult[] = [];

    for (const [num, meaning] of Object.entries(NUMBER_MEANINGS)) {
      if (meaning.title.toLowerCase().includes(q) || meaning.description.toLowerCase().includes(q) || meaning.keywords.some((k) => k.toLowerCase().includes(q))) {
        items.push({ id: `number-${num}`, title: `${meaning.title} (${num})`, subtitle: meaning.description.slice(0, 80), route: `/numbers/life-path?n=${num}` });
      }
    }

    for (const angel of ANGEL_NUMBERS) {
      if (angel.number.includes(q) || angel.meaning.toLowerCase().includes(q)) {
        items.push({ id: `angel-${angel.number}`, title: `Angel ${angel.number}`, subtitle: angel.meaning.slice(0, 80), route: '/angel-numbers' });
      }
    }

    for (const animal of Object.values(CHINESE_ZODIAC)) {
      if (animal.animal.toLowerCase().includes(q) || animal.personality.some((c) => c.toLowerCase().includes(q))) {
        items.push({ id: `zodiac-${animal.animal}`, title: `Chinese Zodiac: ${animal.animal}`, subtitle: animal.personality.slice(0, 3).join(', '), route: `/zodiac?year=${animal.years[0] ?? 2024}` });
      }
    }

    for (const topic of EDUCATIONAL_CONTENT) {
      if (topic.title.toLowerCase().includes(q) || topic.content.toLowerCase().includes(q)) {
        items.push({ id: `edu-${topic.id}`, title: topic.title, subtitle: topic.content.slice(0, 80), route: '/education' });
      }
    }

    return items.slice(0, 50);
  }, [query]);

  const bottomPadding = insets.bottom + BottomTabInset + Spacing.three;

  return (
    <ThemedView style={{ flex: 1 }}>
      <ThemedView style={[styles.header, { paddingTop: insets.top + Spacing.three }]}>
        <Input
          value={query}
          onChangeText={setQuery}
          placeholder="Search numbers, meanings, zodiac..."
          autoCapitalize="none"
          autoFocus
        />
      </ThemedView>

      {query.trim() && results.length === 0 && (
        <ThemedView style={styles.empty}>
          <ThemedText type="small" themeColor="textSecondary">No results found</ThemedText>
        </ThemedView>
      )}

      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: bottomPadding, paddingHorizontal: Spacing.four }}
        renderItem={({ item }) => (
          <Pressable onPress={() => router.push(item.route as any)} style={({ pressed }) => [styles.result, pressed && { opacity: 0.7 }]}>
            <ThemedText type="smallBold">{item.title}</ThemedText>
            <ThemedText type="small" themeColor="textSecondary" numberOfLines={2}>{item.subtitle}</ThemedText>
          </Pressable>
        )}
        ItemSeparatorComponent={() => <ThemedView style={{ height: 1, backgroundColor: theme.textSecondary, opacity: 0.2 }} />}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  header: { paddingHorizontal: Spacing.four, paddingBottom: Spacing.three },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  result: { paddingVertical: Spacing.three, gap: Spacing.one },
});
