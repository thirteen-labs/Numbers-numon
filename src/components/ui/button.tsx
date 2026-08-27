import { Pressable, StyleSheet, type PressableProps, type ViewStyle } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

export type ButtonProps = PressableProps & {
  variant?: ButtonVariant;
  title: string;
};

export function Button({ variant = 'primary', title, style, disabled, ...rest }: ButtonProps) {
  const theme = useTheme();

  const bgColor: ViewStyle =
    variant === 'primary' ? { backgroundColor: theme.text } :
    variant === 'secondary' ? { backgroundColor: theme.backgroundElement } :
    { backgroundColor: 'transparent' };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.base,
        bgColor,
        pressed ? { opacity: 0.7 } : undefined,
        disabled ? { opacity: 0.4 } : undefined,
        style as ViewStyle,
      ] as any}
      disabled={disabled}
      {...rest}>
      <ThemedText
        // @ts-expect-error style array with conditional undefined
        style={[
          styles.text,
          variant === 'primary' ? { color: theme.background } : undefined,
          variant === 'ghost' ? { color: theme.text } : undefined,
        ]}>
        {title}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.four,
    borderRadius: Spacing.three,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '600' as const,
  },
});
