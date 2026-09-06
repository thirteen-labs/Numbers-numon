import { useState } from 'react';
import { Platform, Pressable, StyleSheet } from 'react-native';
import { DateTimePicker } from '@expo/ui/community/datetime-picker';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export function DatePickerField({
  value,
  onChange,
  label,
  placeholder = 'Select date',
  minimumDate,
  maximumDate,
}: {
  value: Date | null;
  onChange: (date: Date) => void;
  label: string;
  placeholder?: string;
  minimumDate?: Date;
  maximumDate?: Date;
}) {
  const theme = useTheme();
  const [showNative, setShowNative] = useState(false);

  const displayValue = value
    ? value.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
    : placeholder;

  if (Platform.OS === 'web') {
    return (
      <ThemedView>
        <ThemedText type="small" themeColor="textSecondary" style={styles.label}>{label}</ThemedText>
        <ThemedView type="backgroundElement" style={styles.input}>
          <input
            aria-label={label}
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

  // Native: press-to-open field + @expo/ui DateTimePicker (SwiftUI/Compose).
  // The community picker renders null on web, so this branch never runs there.

  return (
    <ThemedView>
      <ThemedText type="small" themeColor="textSecondary" style={styles.label}>{label}</ThemedText>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={value ? `${label}, selected date ${displayValue}` : `${label}, ${placeholder}`}
        accessibilityHint="Opens the date picker"
        accessibilityState={{ expanded: showNative }}
        android_ripple={{ color: theme.textSecondary }}
        onPress={() => setShowNative((v) => !v)}
        style={({ pressed }) => [
          styles.input,
          { backgroundColor: theme.backgroundElement, opacity: pressed ? 0.7 : 1 },
        ]}>
        <ThemedText
          type="default"
          themeColor={value ? 'text' : 'textSecondary'}
          style={styles.fieldText}>
          {displayValue}
        </ThemedText>
      </Pressable>
      {showNative && (
        <ThemedView type="backgroundElement" style={styles.pickerWrap}>
          <DateTimePicker
            value={value ?? new Date(1990, 0, 1)}
            mode="date"
            display={Platform.OS === 'ios' ? 'inline' : 'default'}
            minimumDate={minimumDate}
            maximumDate={maximumDate ?? new Date()}
            accentColor={theme.tint}
            onValueChange={(_event, date) => {
              onChange(date);
              if (Platform.OS === 'android') setShowNative(false);
            }}
            onDismiss={() => setShowNative(false)}
          />
        </ThemedView>
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
    minHeight: 48,
    justifyContent: 'center',
    borderCurve: 'continuous',
  },
  fieldText: {
    fontSize: 16,
    lineHeight: 22,
  },
  pickerWrap: {
    marginTop: Spacing.two,
    borderRadius: Spacing.two,
    overflow: 'hidden',
    borderCurve: 'continuous',
  },
});
