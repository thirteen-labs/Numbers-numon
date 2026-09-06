import type { PropsWithChildren } from 'react';
import { StyleSheet, type ViewStyle } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';

export type CardProps = PropsWithChildren & {
  title?: string;
  style?: ViewStyle;
  accessibilityLabel?: string;
};

export function Card({ title, children, style, accessibilityLabel }: CardProps) {
  return (
    <ThemedView
      type="backgroundElement"
      style={[styles.card, style]}
      accessibilityLabel={accessibilityLabel ?? title}>
      {title && (
        <ThemedText type="heading" style={styles.title}>
          {title}
        </ThemedText>
      )}
      {children}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: Spacing.four,
    borderRadius: Spacing.three,
    borderCurve: 'continuous',
    gap: Spacing.two,
  },
  title: {
    marginBottom: Spacing.one,
  },
});
