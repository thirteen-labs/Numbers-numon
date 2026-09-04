import { Image } from 'expo-image';
import { ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import { Button, Card } from '@/components/ui';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

interface Developer {
  name: string;
  image: ReturnType<typeof require>;
  description: string;
  role: string;
}

const DEVELOPERS: Developer[] = [
  {
    name: 'Thirteen Labs',
    image: require('@/assets/images/thirteen-labs.png'),
    role: 'Development Studio',
    description: 'Crafting innovative digital experiences with precision and creativity. Thirteen Labs brings technical excellence to the Numera platform.',
  },
  {
    name: 'Obsidian Northern',
    image: require('@/assets/images/obsidian-northern.png'),
    role: 'Design & Product Studio',
    description: 'Shaping beautiful, intuitive interfaces. Obsidian Northern ensures Numera delivers a premium, mystic-inspired user experience.',
  },
];

export default function AboutScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const bottomPadding = insets.bottom + BottomTabInset + Spacing.three;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.background }}
      contentContainerStyle={[styles.container, { paddingBottom: bottomPadding }]}>
      <ThemedView style={styles.inner}>
        {/* Header */}
        <ThemedView style={styles.header}>
          <Image source={require('@/assets/images/icon.png')} style={styles.appIcon} contentFit="contain" />
          <ThemedText type="subtitle" style={styles.appName}>Numera</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">v1.0.0 — Complete Offline Numerology Platform</ThemedText>
          <ThemedText type="small" style={styles.tagline}>
            The most comprehensive offline numerology & personal insight platform. All calculations happen locally on your device — private, fast, and beautiful.
          </ThemedText>
        </ThemedView>

        {/* Developers */}
        <ThemedView style={styles.devSection}>
          <ThemedText type="smallBold" style={styles.sectionLabel}>Developed By</ThemedText>
          <ThemedView style={styles.devGrid}>
            {DEVELOPERS.map((dev) => (
              <Card key={dev.name} style={styles.devCard}>
                <ThemedView style={styles.devImageWrap}>
                  <Image source={dev.image} style={styles.devImage} contentFit="contain" transition={200} />
                </ThemedView>
                <ThemedView style={styles.devInfo}>
                  <ThemedText type="smallBold" style={styles.devName}>{dev.name}</ThemedText>
                  <ThemedText type="small" themeColor="textSecondary" style={styles.devRole}>{dev.role}</ThemedText>
                  <ThemedText type="small" style={styles.devDesc}>{dev.description}</ThemedText>
                </ThemedView>
              </Card>
            ))}
          </ThemedView>
        </ThemedView>

        {/* App info */}
        <Card>
          <ThemedText type="smallBold">Privacy by Design</ThemedText>
          <ThemedText type="small" themeColor="textSecondary" style={styles.infoText}>
            Every calculation is performed offline on your device. No accounts, no tracking, no data leaves your phone unless you explicitly export it.
          </ThemedText>
        </Card>

        <Card>
          <ThemedText type="smallBold">Offline First</ThemedText>
          <ThemedText type="small" themeColor="textSecondary" style={styles.infoText}>
            20+ numerology systems, angel numbers, Chinese zodiac, compatibility, lucky colors & more — fully functional without internet.
          </ThemedText>
        </Card>

        <ThemedView style={styles.actions}>
          <Button title="Back to Settings" onPress={() => router.back()} style={styles.backBtn} />
        </ThemedView>

        <ThemedText type="small" themeColor="textSecondary" style={styles.footer}>
          © {new Date().getFullYear()} Numera · Built with Thirteen Labs × Obsidian Northern
        </ThemedText>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', justifyContent: 'center' },
  inner: { maxWidth: MaxContentWidth, flexGrow: 1, gap: Spacing.five, padding: Spacing.four },
  header: { alignItems: 'center', gap: Spacing.two, paddingVertical: Spacing.four },
  appIcon: { width: 72, height: 72, borderRadius: 18 },
  appName: { fontSize: 32, textAlign: 'center' },
  tagline: { textAlign: 'center', lineHeight: 20, marginTop: Spacing.one, opacity: 0.9 },
  devSection: { gap: Spacing.three },
  sectionLabel: { textAlign: 'center', letterSpacing: 1.2, textTransform: 'uppercase', opacity: 0.7 },
  devGrid: { gap: Spacing.four },
  devCard: { alignItems: 'center', gap: Spacing.three, paddingVertical: Spacing.four },
  devImageWrap: {
    width: 160,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Spacing.two,
    overflow: 'hidden',
  },
  devImage: { width: 160, height: 80 },
  devInfo: { alignItems: 'center', gap: Spacing.one, maxWidth: 360 },
  devName: { fontSize: 18, textAlign: 'center' },
  devRole: { textAlign: 'center', fontSize: 12, letterSpacing: 0.6, textTransform: 'uppercase' },
  devDesc: { textAlign: 'center', lineHeight: 20, marginTop: Spacing.one },
  infoText: { marginTop: Spacing.two, lineHeight: 20 },
  actions: { alignItems: 'center', marginTop: Spacing.two },
  backBtn: { minWidth: 200 },
  footer: { textAlign: 'center', marginTop: Spacing.two, fontSize: 12 },
});
