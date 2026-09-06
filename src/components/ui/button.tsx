import { Pressable, StyleSheet, type PressableProps, type ViewStyle } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

export type ButtonProps = PressableProps & {
  variant?: ButtonVariant;
  title: string;
  loading?: boolean;
};

export function Button({ variant = 'primary', title, style, disabled, loading, accessibilityLabel, accessibilityHint, ...rest }: ButtonProps) {
  const theme = useTheme();
  const isDisabled = disabled || loading;

  const bgColor: ViewStyle =
    variant === 'primary' ? { backgroundColor: theme.text } :
    variant === 'secondary' ? { backgroundColor: theme.backgroundElement } :
    { backgroundColor: 'transparent' };

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? title}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled: !!isDisabled, busy: !!loading }}
      android_ripple={{ color: theme.textSecondary }}
      style={({ pressed }) => [
        styles.base,
        bgColor,
        pressed ? { opacity: 0.7 } : undefined,
        isDisabled ? { opacity: 0.4 } : undefined,
        style as ViewStyle,
      ] as any}
      disabled={isDisabled}
      {...rest}>
      <ThemedText
        // @ts-expect-error style array with conditional undefined
        style={[
          styles.text,
          variant === 'primary' ? { color: theme.background } : undefined,
          variant === 'ghost' ? { color: theme.text } : undefined,
        ]}>
        {loading ? 'Loading…' : title}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.four,
    borderRadius: Spacing.three,
    borderCurve: 'continuous',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  text: {
    fontSize: 16,
    fontWeight: '600' as const,
  },
});
