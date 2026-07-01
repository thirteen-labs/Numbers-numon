import { useState } from 'react';
import { Platform, Pressable, StyleSheet } from 'react-native';
import RNDateTimePicker from '@expo/ui/community/datetime-picker';

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
  const [show, setShow] = useState(false);


  const formatted = value
    ? `${String(value.getMonth() + 1).padStart(2, '0')}/${String(value.getDate()).padStart(2, '0')}/${value.getFullYear()}`
    : '';

  if (Platform.OS === 'web') {
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

  function handleChange(_event: any, date?: Date) {
    if (date) {
      onChange(date);
    }
    setShow(false);
  }

  function handleDismiss() {
    setShow(false);
  }

  return (
    <ThemedView>
      <ThemedText type="small" themeColor="textSecondary" style={styles.label}>{label}</ThemedText>
      <Pressable onPress={() => setShow(true)}>
        <ThemedView type="backgroundElement" style={styles.input}>
          <ThemedText style={formatted ? undefined : styles.placeholder}>
            {formatted || placeholder}
          </ThemedText>
        </ThemedView>
      </Pressable>
      {show && (
        <RNDateTimePicker
          value={value ?? new Date()}
          mode="date"
          display="default"
          onChange={handleChange}
          onDismiss={handleDismiss}
        />
      )}
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
