import { TextInput, StyleSheet, type TextInputProps } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type InputProps = TextInputProps & {
  label?: string;
  error?: string;
  hint?: string;
};

export function Input({ label, error, hint, style, ...rest }: InputProps) {
  const theme = useTheme();
  const describedBy = error ? `${label ?? 'input'}-error` : undefined;

  return (
    <ThemedView style={styles.container}>
      {label && (
        <ThemedText type="smallBold" style={styles.label}>
          {label}
        </ThemedText>
      )}
      <ThemedView
        type="backgroundElement"
        style={[styles.inputContainer, error ? { borderColor: theme.error, borderWidth: 1 } : undefined]}>
        <TextInput
          style={[
            styles.input,
            { color: theme.text },
            style as object,
          ]}
          placeholderTextColor={theme.textSecondary}
          accessibilityLabel={label ?? rest.placeholder}
          accessibilityHint={hint}
          accessibilityState={{ disabled: rest.editable === false }}
          {...(describedBy ? ({ 'aria-describedby': describedBy } as object) : {})}
          {...rest}
        />
      </ThemedView>
      {error && (
        <ThemedText
          type="small"
          themeColor="error"
          style={styles.error}
          accessibilityRole="alert"
          accessibilityLiveRegion="assertive">
          {error}
        </ThemedText>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.one,
  },
  label: {
    marginLeft: Spacing.one,
  },
  inputContainer: {
    borderRadius: Spacing.two,
    borderCurve: 'continuous',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    minHeight: 48,
    justifyContent: 'center',
  },
  input: {
    fontSize: 16,
    lineHeight: 22,
  },
  error: {
    marginLeft: Spacing.one,
  },
});
