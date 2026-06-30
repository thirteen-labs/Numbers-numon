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
    <ThemedView style={styles.container}>
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
              fontSize: size * 0.45,
              color: color ? theme.background : theme.background,
            },
          ]}>
          {number}
        </ThemedText>
      </ThemedView>
      {label && (
        <ThemedText type="small" style={styles.label}>
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
  },
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  number: {
    fontWeight: '700',
  },
  label: {
    textAlign: 'center',
  },
});
