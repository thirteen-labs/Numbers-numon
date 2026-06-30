import type { PropsWithChildren } from 'react';
import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';

export type SectionProps = PropsWithChildren & {
  title: string;
  subtitle?: string;
};

export function Section({ title, subtitle, children }: SectionProps) {
  return (
    <ThemedView style={styles.section}>
      <ThemedView style={styles.header}>
        <ThemedText type="subtitle">{title}</ThemedText>
        {subtitle && (
          <ThemedText type="small" themeColor="textSecondary">
            {subtitle}
          </ThemedText>
        )}
      </ThemedView>
      {children}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: Spacing.three,
  },
  header: {
    gap: Spacing.half,
  },
});
