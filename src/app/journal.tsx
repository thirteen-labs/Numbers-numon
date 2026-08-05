import { ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Card, Section } from '@/components/ui';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export default function JournalScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const bottomPadding = insets.bottom + BottomTabInset + Spacing.three;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.background }}
      contentContainerStyle={[styles.container, { paddingBottom: bottomPadding }]}>
      <ThemedView style={styles.inner}>
        <Section title="Journal" subtitle="Private journal with mood tracking">
          <Card>
            <ThemedText type="small">No journal entries yet. Start writing your thoughts.</ThemedText>
          </Card>
        </Section>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', justifyContent: 'center' },
  inner: { maxWidth: MaxContentWidth, flexGrow: 1, gap: Spacing.five, padding: Spacing.four },
});
