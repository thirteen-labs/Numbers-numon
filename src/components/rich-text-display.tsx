import type { PropsWithChildren } from 'react';
import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';

interface RichTextDisplayProps {
  content: string;
}

function parseRichText(text: string): Array<{ type: 'text' | 'bold' | 'italic' | 'heading' | 'bullet' | 'divider'; value: string }> {
  const segments: Array<{ type: 'text' | 'bold' | 'italic' | 'heading' | 'bullet' | 'divider'; value: string }> = [];
  const lines = text.split('\n');

  for (const line of lines) {
    if (line === '---') {
      segments.push({ type: 'divider', value: '' });
    } else if (line.startsWith('## ')) {
      segments.push({ type: 'heading', value: line.slice(3) });
    } else if (line.startsWith('• ')) {
      segments.push({ type: 'bullet', value: line.slice(2) });
    } else {
      segments.push({ type: 'text', value: line });
    }
  }

  return segments;
}

function renderInlineFormatting(text: string) {
  const parts: Array<{ text: string; bold?: boolean; italic?: boolean }> = [];
  let remaining = text;

  const regex = /(\*\*(.+?)\*\*)|(\*(.+?)\*)/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ text: text.slice(lastIndex, match.index) });
    }
    if (match[1]) {
      parts.push({ text: match[2]!, bold: true });
    } else if (match[3]) {
      parts.push({ text: match[4]!, italic: true });
    }
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push({ text: text.slice(lastIndex) });
  }

  return parts.length > 0 ? parts : [{ text }];
}

export function RichTextDisplay({ content }: RichTextDisplayProps) {
  const segments = parseRichText(content);

  return (
    <ThemedView style={styles.container}>
      {segments.map((seg, i) => {
        if (seg.type === 'divider') {
          return <ThemedView key={i} style={styles.divider} />;
        }

        if (seg.type === 'heading') {
          return (
            <ThemedText key={i} type="smallBold" style={styles.heading}>
              {seg.value}
            </ThemedText>
          );
        }

        if (seg.type === 'bullet') {
          const parts = renderInlineFormatting(seg.value);
          return (
            <ThemedView key={i} style={styles.bulletRow}>
              <ThemedText type="small" style={styles.bullet}>•</ThemedText>
              <ThemedView style={styles.bulletContent}>
                {parts.map((p, j) => (
                  <ThemedText key={j} type="small" style={p.bold ? styles.bold : p.italic ? styles.italic : undefined}>
                    {p.text}
                  </ThemedText>
                ))}
              </ThemedView>
            </ThemedView>
          );
        }

        const parts = renderInlineFormatting(seg.value);
        return (
          <ThemedView key={i} style={styles.textRow}>
            {parts.map((p, j) => (
              <ThemedText key={j} type="small" style={p.bold ? styles.bold : p.italic ? styles.italic : undefined}>
                {p.text}
              </ThemedText>
            ))}
          </ThemedView>
        );
      })}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { gap: Spacing.one },
  divider: { height: 1, backgroundColor: '#333', marginVertical: Spacing.two },
  heading: { fontSize: 16, marginTop: Spacing.two, marginBottom: Spacing.one },
  bulletRow: { flexDirection: 'row', gap: Spacing.two },
  bullet: { width: 16 },
  bulletContent: { flex: 1 },
  textRow: {},
  bold: { fontWeight: '700' },
  italic: { fontStyle: 'italic' },
});
