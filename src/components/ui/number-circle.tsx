import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type NumberCircleProps = {
  number: number;
  size?: number;
  label?: string;
  color?: string;
};

export function NumberCircle({ number, size = 64, label, color }: NumberCircleProps) {
  const theme = useTheme();

  return (
    <ThemedView
      style={styles.container}
      accessibilityLabel={label ? `${label}: ${number}` : `Number ${number}`}
      accessibilityRole="text">
      <ThemedView
        style={[
          styles.circle,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: color ?? theme.text,
          },
        ]}>
        <ThemedText
          style={[
            styles.number,
            {
              fontSize: size * 0.4,
              lineHeight: size * 0.5,
              color: theme.background,
              fontVariant: 'tabular-nums',
            },
          ]}
          maxFontSizeMultiplier={1.5}>
          {number}
        </ThemedText>
      </ThemedView>
      {label && (
        <ThemedText type="small" style={styles.label} maxFontSizeMultiplier={2}>
          {label}
        </ThemedText>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: Spacing.one,
    minWidth: 72,
    minHeight: 72,
  },
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  number: {
    fontWeight: '700',
    textAlign: 'center',
  },
  label: {
    textAlign: 'center',
  },
});
