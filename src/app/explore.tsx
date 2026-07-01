import { Platform, Pressable, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { WebBadge } from '@/components/web-badge';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

interface ToolLink {
  title: string;
  description: string;
  route: string;
  color: string;
}

const TOOLS: ToolLink[] = [
  { title: 'Calculator', description: 'Core numbers, personal days, life cycles', route: '/calculator', color: '#FF6B35' },
  { title: 'Profiles', description: 'Save and manage profiles', route: '/profile', color: '#4ECDC4' },
  { title: 'Search', description: 'Search numbers, meanings, zodiac', route: '/search', color: '#FFE66D' },
  { title: 'Settings', description: 'Theme, notifications, preferences', route: '/settings', color: '#2C3E50' },
  { title: 'Affirmations', description: 'Daily affirmations by number', route: '/affirmations', color: '#E74C3C' },
  { title: 'Journal', description: 'Private journal with mood tracking', route: '/journal', color: '#2ECC71' },
  { title: 'Goals', description: 'Track personal growth goals', route: '/goals', color: '#9B59B6' },
  { title: 'Name Compatibility', description: 'Compare two names for harmony', route: '/compatibility', color: '#34495E' },
  { title: 'Business Name', description: 'Analyze business name energy', route: '/compatibility/business-name', color: '#1ABC9C' },
  { title: 'Baby Name', description: 'Baby name numerological fit', route: '/baby-name', color: '#F39C12' },
  { title: 'Phone Number', description: 'Analyze phone number vibration', route: '/phone-number', color: '#FF6B35' },
  { title: 'House Number', description: 'Home address energy analysis', route: '/house-number', color: '#4ECDC4' },
  { title: 'Vehicle Number', description: 'License plate numerological meaning', route: '/vehicle-number', color: '#FFE66D' },
  { title: 'Lucky Numbers & Colors', description: 'Personal lucky numbers, colors, days', route: '/lucky?n=7', color: '#2C3E50' },
  { title: 'Angel Numbers', description: 'Hundreds of angel number meanings', route: '/angel-numbers', color: '#E74C3C' },
  { title: 'Chinese Zodiac', description: 'Zodiac animals, elements, compatibility', route: '/zodiac', color: '#2ECC71' },
  { title: 'Education', description: 'Learn numerology fundamentals', route: '/education', color: '#9B59B6' },
  { title: 'Pinnacles', description: 'Four major life stage cycles', route: '/cycles/pinnacles?lp=1', color: '#34495E' },
  { title: 'Challenges', description: 'Life lessons and growth periods', route: '/cycles/challenges?lp=1', color: '#1ABC9C' },
  { title: 'Statistics', description: 'Track your numerology journey', route: '/stats', color: '#F39C12' },
  { title: 'Reports', description: 'Generate and export numerology reports', route: '/reports', color: '#7C3AED' },
  { title: 'Backup', description: 'Export/import your data', route: '/backup', color: '#FF6B35' },
];

export default function ExploreScreen() {
  const safeAreaInsets = useSafeAreaInsets();
  const insets = {
    ...safeAreaInsets,
    bottom: safeAreaInsets.bottom + BottomTabInset + Spacing.three,
  };
  const theme = useTheme();

  const contentPlatformStyle = Platform.select({
    android: {
      paddingTop: insets.top,
      paddingLeft: insets.left,
      paddingRight: insets.right,
      paddingBottom: insets.bottom,
    },
    web: {
      paddingTop: Spacing.six,
      paddingBottom: Spacing.four,
    },
  });

  return (
    <ScrollView
      style={[styles.scrollView, { backgroundColor: theme.background }]}
      contentInset={insets}
      contentContainerStyle={[styles.contentContainer, contentPlatformStyle]}>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="subtitle">Explore</ThemedText>
          <ThemedText style={styles.centerText} themeColor="textSecondary">
            All numerology tools and references
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.grid}>
          {TOOLS.map((tool) => (
            <Pressable
              key={tool.route}
              onPress={() => router.push(tool.route as any)}
              style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
              <ThemedView type="backgroundElement" style={[styles.cardInner, { borderLeftColor: tool.color }]}>
                <ThemedText type="smallBold">{tool.title}</ThemedText>
                <ThemedText type="small" themeColor="textSecondary">{tool.description}</ThemedText>
              </ThemedView>
            </Pressable>
          ))}
        </ThemedView>

        {Platform.OS === 'web' && <WebBadge />}
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: { flex: 1 },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  container: {
    maxWidth: MaxContentWidth,
    flexGrow: 1,
  },
  titleContainer: {
    gap: Spacing.three,
    alignItems: 'center',
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.six,
  },
  centerText: {
    textAlign: 'center',
  },
  grid: {
    gap: Spacing.three,
    paddingHorizontal: Spacing.four,
    paddingBottom: Spacing.four,
  },
  card: {
    borderRadius: Spacing.three,
  },
  pressed: {
    opacity: 0.7,
  },
  cardInner: {
    padding: Spacing.four,
    borderRadius: Spacing.three,
    gap: Spacing.two,
    borderLeftWidth: 3,
  },
});
