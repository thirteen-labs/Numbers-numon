import { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Card, Section } from '@/components/ui';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { EDUCATIONAL_CONTENT, type EducationalTopic } from '@/data/educational';
import { useTheme } from '@/hooks/use-theme';

const CATEGORIES: { key: EducationalTopic['category']; label: string }[] = [
  { key: 'history', label: 'History' },
  { key: 'number-meanings', label: 'Number Meanings' },
  { key: 'master-numbers', label: 'Master Numbers' },
  { key: 'karmic-numbers', label: 'Karmic Numbers' },
  { key: 'calculation-methods', label: 'Calculation Methods' },
  { key: 'symbolism', label: 'Symbolism' },
  { key: 'faq', label: 'FAQ' },
];

export default function EducationScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const [activeCategory, setActiveCategory] = useState<EducationalTopic['category'] | null>(null);

  const topics = activeCategory
    ? EDUCATIONAL_CONTENT.filter((t) => t.category === activeCategory)
    : EDUCATIONAL_CONTENT;

  const bottomPadding = insets.bottom + BottomTabInset + Spacing.three;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.background }}
      contentContainerStyle={[styles.container, { paddingBottom: bottomPadding }]}>
      <ThemedView style={styles.inner}>
        <Section title="Educational Library" subtitle="Learn the fundamentals of numerology">
          <ThemedView style={styles.categoryRow}>
            <Card title="All" style={activeCategory === null ? styles.activeCard : undefined}>
              <ThemedText type="small" onPress={() => setActiveCategory(null)}>All Topics</ThemedText>
            </Card>
            {CATEGORIES.map((cat) => (
              <Card key={cat.key} title={cat.label} style={activeCategory === cat.key ? styles.activeCard : undefined}>
                <ThemedText type="small" onPress={() => setActiveCategory(cat.key)}>{cat.label}</ThemedText>
              </Card>
            ))}
          </ThemedView>
        </Section>

        {topics.map((topic) => (
          <Card key={topic.id} title={topic.title}>
            <ThemedText type="small">{topic.content}</ThemedText>
          </Card>
        ))}
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', justifyContent: 'center' },
  inner: { maxWidth: MaxContentWidth, flexGrow: 1, gap: Spacing.five, padding: Spacing.four },
  categoryRow: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.two },
  activeCard: { opacity: 0.7 },
});
