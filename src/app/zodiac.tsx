import { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button, Card, Input, NumberCircle, Section } from '@/components/ui';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { CHINESE_ZODIAC, getZodiacAnimal, getZodiacElement } from '@/data/chinese-zodiac';
import { useTheme } from '@/hooks/use-theme';
import { colorForNumber } from '@/lib/numerology/utils';

export default function ChineseZodiacScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const [year, setYear] = useState('');
  const [zodiac, setZodiac] = useState<string | null>(null);

  function handleLookup() {
    const y = parseInt(year.trim(), 10);
    if (isNaN(y)) return;
    const animal = getZodiacAnimal(y);
    setZodiac(animal);
  }

  const bottomPadding = insets.bottom + BottomTabInset + Spacing.three;
  const animalData = zodiac ? CHINESE_ZODIAC[zodiac] : null;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.background }}
      contentContainerStyle={[styles.container, { paddingBottom: bottomPadding }]}>
      <ThemedView style={styles.inner}>
        <Section title="Chinese Zodiac" subtitle="Discover your animal sign and its meanings">
          <Input
            label="Birth Year"
            value={year}
            onChangeText={setYear}
            placeholder="e.g. 1990"
            keyboardType="number-pad"
          />
          <Button title="Look Up" onPress={handleLookup} />
        </Section>

        {!zodiac && (
          <Section title="All Zodiac Animals">
            <ThemedView style={styles.zodiacGrid}>
              {Object.entries(CHINESE_ZODIAC).map(([key, data]) => (
                <Card key={key} title={data.animal}>
                  <ThemedText type="small">Element: {data.element}</ThemedText>
                  <ThemedText type="small">Lucky: {data.luckyNumbers.join(', ')}</ThemedText>
                </Card>
              ))}
            </ThemedView>
          </Section>
        )}

        {animalData && (
          <>
            <Section title={animalData.animal}>
              <Card title="Element">
                <ThemedText type="small">{animalData.element}</ThemedText>
              </Card>
              <Card title="Personality">
                {animalData.personality.map((t: string) => (
                  <ThemedText key={t} type="small">• {t}</ThemedText>
                ))}
              </Card>
              <Card title="Career">
                {animalData.careers.map((c: string) => (
                  <ThemedText key={c} type="small">• {c}</ThemedText>
                ))}
              </Card>
              <Card title="Love">
                <ThemedText type="small">{animalData.love}</ThemedText>
              </Card>
              <Card title="Health">
                <ThemedText type="small">{animalData.health}</ThemedText>
              </Card>
              <Card title="Lucky Numbers">
                <ThemedView style={styles.numberRow}>
                  {animalData.luckyNumbers.map((n) => (
                    <NumberCircle key={n} number={n} size={40} color={colorForNumber(n, theme)} />
                  ))}
                </ThemedView>
              </Card>
              <Card title="Lucky Colors">
                {animalData.luckyColors.map((c) => (
                  <ThemedText key={c} type="small">• {c}</ThemedText>
                ))}
              </Card>
              <Card title="Compatible With">
                {animalData.compatibleWith.map((a: string) => (
                  <ThemedText key={a} type="small">• {a.charAt(0).toUpperCase() + a.slice(1)}</ThemedText>
                ))}
              </Card>
              <Card title="Enemy Signs">
                {animalData.enemySigns.map((a: string) => (
                  <ThemedText key={a} type="small">• {a.charAt(0).toUpperCase() + a.slice(1)}</ThemedText>
                ))}
              </Card>
            </Section>
          </>
        )}
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', justifyContent: 'center' },
  inner: { maxWidth: MaxContentWidth, flexGrow: 1, gap: Spacing.five, padding: Spacing.four },
  zodiacGrid: { gap: Spacing.three },
  numberRow: { flexDirection: 'row', gap: Spacing.two, flexWrap: 'wrap' },
});
