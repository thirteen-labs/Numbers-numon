import { ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';

import { Card, NumberCircle, Section } from '@/components/ui';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { ATTITUDE_INTERPRETATIONS } from '@/data/attitude';
import { BIRTHDAY_INTERPRETATIONS } from '@/data/birthday';
import { EXPRESSION_INTERPRETATIONS } from '@/data/expression';
import { LIFE_PATH_INTERPRETATIONS } from '@/data/life-path';
import { MATURITY_INTERPRETATIONS } from '@/data/maturity';
import { NUMBER_MEANINGS } from '@/data/number-meanings';
import { PERSONALITY_INTERPRETATIONS } from '@/data/personality';
import { SOUL_URGE_INTERPRETATIONS } from '@/data/soul-urge';
import { useTheme } from '@/hooks/use-theme';
import { colorForNumber } from '@/lib/numerology/utils';

const LABELS: Record<string, string> = {
  'life-path': 'Life Path',
  expression: 'Expression',
  'soul-urge': 'Soul Urge',
  personality: 'Personality',
  birthday: 'Birthday',
  attitude: 'Attitude',
  maturity: 'Maturity',
};

export default function NumberDetailScreen() {
  const { type, n } = useLocalSearchParams<{ type: string; n: string }>();
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  const num = parseInt(n ?? '0', 10);
  const label = LABELS[type] ?? type;
  const meaning = NUMBER_MEANINGS[num];

  const lp = LIFE_PATH_INTERPRETATIONS[num];
  const expr = EXPRESSION_INTERPRETATIONS[num];
  const su = SOUL_URGE_INTERPRETATIONS[num];
  const pers = PERSONALITY_INTERPRETATIONS[num];
  const bday = BIRTHDAY_INTERPRETATIONS[num];
  const att = ATTITUDE_INTERPRETATIONS[num];
  const mat = MATURITY_INTERPRETATIONS[num];

  if (!meaning) {
    return (
      <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ThemedText>Number not found</ThemedText>
      </ThemedView>
    );
  }

  const bottomPadding = insets.bottom + BottomTabInset + Spacing.three;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.background }}
      contentContainerStyle={[styles.container, { paddingBottom: bottomPadding }]}>
      <ThemedView style={styles.inner}>
        <Section title={`${label} — ${meaning.title}`}>
          <ThemedView style={styles.center}>
            <NumberCircle number={num} size={80} color={colorForNumber(num, theme)} />
            <ThemedText type="small" style={styles.keywords}>{meaning.keywords.join(' · ')}</ThemedText>
          </ThemedView>
        </Section>

        <Section title="Description">
          <ThemedText type="small">{meaning.description}</ThemedText>
        </Section>

        {type === 'life-path' && lp && (
          <>
            <Card title="Overview">
              <ThemedText type="small">{lp.overview}</ThemedText>
            </Card>
            <Card title="Famous Examples">
              {lp.famousExamples.map((name: string) => (
                <ThemedText key={name} type="small">• {name}</ThemedText>
              ))}
            </Card>
          </>
        )}

        {type === 'expression' && expr && (
          <>
            <Card title="Potential">
              <ThemedText type="small">{expr.potential}</ThemedText>
            </Card>
            <Card title="Natural Talents">
              {expr.naturalTalents.map((t: string) => (
                <ThemedText key={t} type="small">• {t}</ThemedText>
              ))}
            </Card>
            <Card title="Personal Development">
              <ThemedText type="small">{expr.personalDevelopment}</ThemedText>
            </Card>
            <Card title="Hidden Abilities">
              {expr.hiddenAbilities.map((a: string) => (
                <ThemedText key={a} type="small">• {a}</ThemedText>
              ))}
            </Card>
          </>
        )}

        {type === 'soul-urge' && su && (
          <>
            <Card title="Inner Desire">
              <ThemedText type="small">{su.innerDesire}</ThemedText>
            </Card>
            <Card title="Emotional Motivation">
              <ThemedText type="small">{su.emotionalMotivation}</ThemedText>
            </Card>
            <Card title="Hidden Dreams">
              <ThemedText type="small">{su.hiddenDreams}</ThemedText>
            </Card>
            <Card title="Personal Fulfillment">
              <ThemedText type="small">{su.personalFulfillment}</ThemedText>
            </Card>
          </>
        )}

        {type === 'personality' && pers && (
          <>
            <Card title="First Impressions">
              <ThemedText type="small">{pers.firstImpressions}</ThemedText>
            </Card>
            <Card title="Public Persona">
              <ThemedText type="small">{pers.publicPersona}</ThemedText>
            </Card>
            <Card title="Communication Style">
              <ThemedText type="small">{pers.communicationStyle}</ThemedText>
            </Card>
            <Card title="Social Image">
              <ThemedText type="small">{pers.socialImage}</ThemedText>
            </Card>
          </>
        )}

        {type === 'birthday' && bday && (
          <>
            <Card title="Your Gift">
              <ThemedText type="small">{bday.gift}</ThemedText>
            </Card>
            <Card title="Learning Style">
              <ThemedText type="small">{bday.learningStyle}</ThemedText>
            </Card>
            <Card title="Strengths">
              {bday.strengths.map((s: string) => (
                <ThemedText key={s} type="small">• {s}</ThemedText>
              ))}
            </Card>
            <Card title="Challenges">
              {bday.challenges.map((s: string) => (
                <ThemedText key={s} type="small">• {s}</ThemedText>
              ))}
            </Card>
          </>
        )}

        {type === 'attitude' && att && (
          <>
            <Card title="Initial Reactions">
              <ThemedText type="small">{att.initialReactions}</ThemedText>
            </Card>
            <Card title="Daily Mindset">
              <ThemedText type="small">{att.dailyMindset}</ThemedText>
            </Card>
            <Card title="Approach to Life">
              <ThemedText type="small">{att.approachToLife}</ThemedText>
            </Card>
            <Card title="Decision Making">
              <ThemedText type="small">{att.decisionMaking}</ThemedText>
            </Card>
          </>
        )}

        {type === 'maturity' && mat && (
          <>
            <Card title="Future Direction">
              <ThemedText type="small">{mat.futureDirection}</ThemedText>
            </Card>
            <Card title="Growth Milestones">
              {mat.growthMilestones.map((m: string) => (
                <ThemedText key={m} type="small">• {m}</ThemedText>
              ))}
            </Card>
            <Card title="Wisdom Gained">
              <ThemedText type="small">{mat.wisdomGained}</ThemedText>
            </Card>
          </>
        )}

        <Card title="Strengths">
          {meaning.positive.map((s: string) => (
            <ThemedText key={s} type="small">• {s}</ThemedText>
          ))}
        </Card>

        <Card title="Challenges">
          {meaning.negative.map((s: string) => (
            <ThemedText key={s} type="small">• {s}</ThemedText>
          ))}
        </Card>

        <Card title="Career Paths">
          {meaning.career.map((c: string) => (
            <ThemedText key={c} type="small">• {c}</ThemedText>
          ))}
        </Card>

        <Card title="Relationships">
          <ThemedText type="small">{meaning.relationships}</ThemedText>
        </Card>

        <Card title="Spiritual Growth">
          <ThemedText type="small">{meaning.spiritual}</ThemedText>
        </Card>
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
  center: {
    alignItems: 'center',
    gap: Spacing.three,
  },
  keywords: {
    textAlign: 'center',
    opacity: 0.7,
  },
});
