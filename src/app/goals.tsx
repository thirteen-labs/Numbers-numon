import { ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Card, Section } from '@/components/ui';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export default function GoalsScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const bottomPadding = insets.bottom + BottomTabInset + Spacing.three;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.background }}
      contentContainerStyle={[styles.container, { paddingBottom: bottomPadding }]}>
      <ThemedView style={styles.inner}>
        <Section title="Goals" subtitle="Track personal growth goals">
          <Card>
            <ThemedText type="small">No goals yet. Create one to track your progress.</ThemedText>
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
