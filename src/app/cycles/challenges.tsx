import { ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';

import { Card, NumberCircle, Section } from '@/components/ui';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { CHALLENGE_INTERPRETATIONS } from '@/data/challenges';
import { useTheme } from '@/hooks/use-theme';
import { calculateChallengeNumbers, calculatePinnacleAges } from '@/lib/numerology/cycles';
import { colorForNumber } from '@/lib/numerology/utils';
import type { CoreNumbers } from '@/lib/numerology/core';

export default function ChallengesScreen() {
  const { lp, fn, ln } = useLocalSearchParams<{ lp: string; fn?: string; ln?: string }>();
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  const lifePathNum = parseInt(lp ?? '0', 10);

  const dummyCore: CoreNumbers = {
    lifePath: lifePathNum,
    expression: parseInt(lp ?? '0', 10),
    soulUrge: parseInt(lp ?? '0', 10),
    personality: 0,
    birthday: 0,
    attitude: 0,
    maturity: 0,
  };

  const challenges = calculateChallengeNumbers(dummyCore);
  const ages = calculatePinnacleAges(lifePathNum);

  const bottomPadding = insets.bottom + BottomTabInset + Spacing.three;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.background }}
      contentContainerStyle={[styles.container, { paddingBottom: bottomPadding }]}>
      <ThemedView style={styles.inner}>
        <Section title="Life Challenges" subtitle="Four challenge periods based on your Life Path number">
          <ThemedText type="small">
            Challenges reveal the lessons and growth opportunities you will encounter during each major life period.
          </ThemedText>
        </Section>

        {challenges.map((num, i) => {
          const interpretation = CHALLENGE_INTERPRETATIONS[num];
          const age = ages[i];

          return (
            <Card key={i} title={`Challenge ${i + 1} — Age ${age?.start ?? '?'} to ${age?.end === 999 ? 'Present' : age?.end ?? '?'}`}>
              <ThemedView style={styles.challengeHeader}>
                <NumberCircle number={num} size={56} color={colorForNumber(num || 0, theme)} />
                {interpretation && (
                  <ThemedText type="smallBold" style={styles.theme}>{interpretation.theme}</ThemedText>
                )}
              </ThemedView>
              {interpretation && (
                <>
                  <ThemedText type="small" style={styles.subtitle}>Growth Opportunity</ThemedText>
                  <ThemedText type="small">{interpretation.growthOpportunity}</ThemedText>
                  <ThemedText type="small" style={styles.subtitle}>Coping Strategy</ThemedText>
                  <ThemedText type="small">{interpretation.copingStrategy}</ThemedText>
                </>
              )}
            </Card>
          );
        })}
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  inner: {
    maxWidth: MaxContentWidth,
    flexGrow: 1,
    gap: Spacing.five,
    padding: Spacing.four,
  },
  challengeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    marginBottom: Spacing.three,
  },
  theme: {
    flex: 1,
  },
  subtitle: {
    fontWeight: '600',
    marginTop: Spacing.two,
    opacity: 0.7,
  },
});
