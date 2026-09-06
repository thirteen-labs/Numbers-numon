import { ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Card, Section } from '@/components/ui';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export default function EducationScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const bottomPadding = insets.bottom + BottomTabInset + Spacing.three;

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{ flex: 1, backgroundColor: theme.background }}
      contentContainerStyle={[styles.container, { paddingBottom: bottomPadding }]}>
      <ThemedView style={styles.inner}>
        <Section title="Learn Numerology" subtitle="Educational resources">
          <Card title="History of Numerology">
            <ThemedText type="small" selectable>
              Numerology is the study of numbers and their influence on human life. It dates back to ancient
              civilizations including the Babylonians, Egyptians, and Greeks.
            </ThemedText>
          </Card>
          <Card title="Pythagorean System">
            <ThemedText type="small" selectable>
              The most widely used system today, developed by Pythagoras. It assigns numbers 1-9 to letters A-Z.
            </ThemedText>
          </Card>
          <Card title="Chaldean System">
            <ThemedText type="small" selectable>
              An older system that assigns numbers based on vibrational frequency rather than sequential order.
            </ThemedText>
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
