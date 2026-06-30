import { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Card, Input, Section } from '@/components/ui';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { ANGEL_NUMBERS } from '@/data/angel-numbers';
import { useTheme } from '@/hooks/use-theme';

export default function AngelNumbersScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const [search, setSearch] = useState('');

  const filtered = search.trim()
    ? ANGEL_NUMBERS.filter((a) => a.number.includes(search.trim()) || a.meaning.toLowerCase().includes(search.trim().toLowerCase()))
    : [];

  const bottomPadding = insets.bottom + BottomTabInset + Spacing.three;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.background }}
      contentContainerStyle={[styles.container, { paddingBottom: bottomPadding }]}>
      <ThemedView style={styles.inner}>
        <Section title="Angel Numbers" subtitle="Search for angel number meanings">
          <Input
            label="Search Number or Keyword"
            value={search}
            onChangeText={setSearch}
            placeholder="e.g. 111, love, abundance"
            autoCapitalize="none"
          />
        </Section>

        {filtered.map((angel) => (
          <Card key={angel.number} title={`Angel Number ${angel.number}`}>
            <ThemedText type="small">{angel.meaning}</ThemedText>
            <ThemedText type="small" style={styles.subtitle}>Love</ThemedText>
            <ThemedText type="small">{angel.love}</ThemedText>
            <ThemedText type="small" style={styles.subtitle}>Career</ThemedText>
            <ThemedText type="small">{angel.career}</ThemedText>
            <ThemedText type="small" style={styles.subtitle}>Finance</ThemedText>
            <ThemedText type="small">{angel.finance}</ThemedText>
            <ThemedText type="small" style={styles.subtitle}>Spirituality</ThemedText>
            <ThemedText type="small">{angel.spirituality}</ThemedText>
          </Card>
        ))}

        {search.trim() && filtered.length === 0 && (
          <ThemedText themeColor="textSecondary">No angel numbers found for "{search}"</ThemedText>
        )}

        {!search.trim() && (
          <>
            <ThemedText type="small" style={styles.hint}>
              Enter a number or keyword above to search. There are {ANGEL_NUMBERS.length} angel number interpretations available.
            </ThemedText>
            <ThemedView style={styles.recentGrid}>
              {['111', '222', '333', '444', '555', '666', '777', '888', '999', '1111', '1212', '2222'].map((n) => (
                <Card key={n} title={n} style={styles.recentCard}>
                  <ThemedText type="small" numberOfLines={2}>{ANGEL_NUMBERS.find((a) => a.number === n)?.meaning}</ThemedText>
                </Card>
              ))}
            </ThemedView>
          </>
        )}
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', justifyContent: 'center' },
  inner: { maxWidth: MaxContentWidth, flexGrow: 1, gap: Spacing.five, padding: Spacing.four },
  subtitle: { fontWeight: '600', marginTop: Spacing.two, opacity: 0.7 },
  hint: { textAlign: 'center', opacity: 0.6 },
  recentGrid: { gap: Spacing.three },
  recentCard: { width: '100%' },
});
