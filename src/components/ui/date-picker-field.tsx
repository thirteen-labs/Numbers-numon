import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export function DatePickerField({
  value,
  onChange,
  label,
  placeholder = 'Select date',
}: {
  value: Date | null;
  onChange: (date: Date) => void;
  label: string;
  placeholder?: string;
}) {
  const theme = useTheme();

  return (
    <ThemedView>
      <ThemedText type="small" themeColor="textSecondary" style={styles.label}>{label}</ThemedText>
      <ThemedView type="backgroundElement" style={styles.input}>
        <input
          type="date"
          value={value ? value.toISOString().split('T')[0] : ''}
          onChange={(e) => {
            const d = e.target.value ? new Date(e.target.value + 'T00:00:00') : null;
            if (d) onChange(d);
          }}
          style={{
            background: 'transparent',
            border: 'none',
            color: theme.text,
            fontFamily: 'inherit',
            fontSize: 16,
            width: '100%',
            outline: 'none',
          }}
        />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  label: {
    marginBottom: Spacing.one,
  },
  input: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    borderRadius: Spacing.two,
    minHeight: 40,
    justifyContent: 'center',
  },
  placeholder: {
    opacity: 0.4,
  },
});
