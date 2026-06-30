import { TextInput, StyleSheet, type TextInputProps } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type InputProps = TextInputProps & {
  label?: string;
  error?: string;
};

export function Input({ label, error, style, ...rest }: InputProps) {
  const theme = useTheme();

  return (
    <ThemedView style={styles.container}>
      {label && (
        <ThemedText type="smallBold" style={styles.label}>
          {label}
        </ThemedText>
      )}
      <ThemedView
        type="backgroundElement"
        style={[styles.inputContainer, error && { borderColor: '#ff4444', borderWidth: 1 }]}>
        <TextInput
          style={[
            styles.input,
            { color: theme.text },
            style,
          ]}
          placeholderTextColor={theme.textSecondary}
          {...rest}
        />
      </ThemedView>
      {error && (
        <ThemedText type="small" style={styles.error}>
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
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
  },
  input: {
    fontSize: 16,
    lineHeight: 22,
  },
  error: {
    color: '#ff4444',
    marginLeft: Spacing.one,
  },
});
