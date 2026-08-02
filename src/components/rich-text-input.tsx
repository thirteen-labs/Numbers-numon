import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, TextInput } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

interface RichTextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  minHeight?: number;
}

const TOOLBAR_BUTTONS = [
  { label: 'B', action: 'bold', tooltip: 'Bold' },
  { label: 'I', action: 'italic', tooltip: 'Italic' },
  { label: '—', action: 'line', tooltip: 'Divider' },
  { label: '•', action: 'bullet', tooltip: 'Bullet' },
  { label: '#', action: 'heading', tooltip: 'Heading' },
] as const;

function wrapSelection(text: string, start: number, end: number, prefix: string, suffix: string) {
  const before = text.slice(0, start);
  const selected = text.slice(start, end);
  const after = text.slice(end);
  if (selected) {
    return { newText: `${before}${prefix}${selected}${suffix}${after}`, newCursor: end + prefix.length + suffix.length };
  }
  return { newText: `${before}${prefix}${suffix}${after}`, newCursor: start + prefix.length };
}

function insertAtCursor(text: string, cursor: number, insertion: string) {
  return { newText: text.slice(0, cursor) + insertion + text.slice(cursor), newCursor: cursor + insertion.length };
}

export function RichTextInput({ value, onChangeText, placeholder, minHeight = 200 }: RichTextInputProps) {
  const theme = useTheme();
  const [cursorPos, setCursorPos] = useState(0);
  const [selection, setSelection] = useState<{ start: number; end: number }>({ start: 0, end: 0 });

  function handleToolbar(action: string) {
    const start = Math.min(selection.start, selection.end);
    const end = Math.max(selection.start, selection.end);

    let result: { newText: string; newCursor: number };

    switch (action) {
      case 'bold':
        result = wrapSelection(value, start, end, '**', '**');
        break;
      case 'italic':
        result = wrapSelection(value, start, end, '*', '*');
        break;
      case 'line':
        result = insertAtCursor(value, cursorPos, '\n---\n');
        break;
      case 'bullet':
        result = insertAtCursor(value, cursorPos, '\n• ');
        break;
      case 'heading':
        result = insertAtCursor(value, cursorPos, '\n## ');
        break;
      default:
        return;
    }

    onChangeText(result.newText);
    setCursorPos(result.newCursor);
  }

  return (
    <ThemedView style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={[styles.toolbar, { backgroundColor: theme.backgroundElement }]}>
        {TOOLBAR_BUTTONS.map((btn) => (
          <Pressable
            key={btn.action}
            style={[styles.toolbarBtn, { borderColor: theme.textSecondary }]}
            onPress={() => handleToolbar(btn.action)}>
            <ThemedText style={[styles.toolbarLabel, btn.action === 'bold' && styles.bold, btn.action === 'italic' && styles.italic]}>
              {btn.label}
            </ThemedText>
          </Pressable>
        ))}
      </ScrollView>
      <TextInput
        style={[styles.input, { color: theme.text, backgroundColor: theme.backgroundElement, minHeight }]}
        value={value}
        onChangeText={onChangeText}
        onSelectionChange={(e) => {
          setSelection(e.nativeEvent.selection);
          setCursorPos(e.nativeEvent.selection.start);
        }}
        placeholder={placeholder}
        placeholderTextColor={theme.textSecondary}
        multiline
        textAlignVertical="top"
      />
      <ThemedText type="small" style={[styles.hint, { color: theme.textSecondary }]}>
        **bold** · *italic* · ## heading · • bullet
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { gap: Spacing.one },
  toolbar: { flexDirection: 'row', padding: Spacing.one, borderRadius: Spacing.two },
  toolbarBtn: {
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.one,
    borderWidth: 1,
    borderRadius: Spacing.one,
    marginRight: Spacing.one,
  },
  toolbarLabel: { fontSize: 14, fontWeight: '500' },
  bold: { fontWeight: '700' },
  italic: { fontStyle: 'italic' },
  input: {
    fontSize: 15,
    lineHeight: 22,
    borderRadius: Spacing.two,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
  },
  hint: { fontStyle: 'italic' },
});
