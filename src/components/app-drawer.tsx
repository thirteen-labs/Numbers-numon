import { Image } from 'expo-image';
import { Pressable, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router, usePathname } from 'expo-router';
import { Drawer } from 'expo-router/drawer';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { TopBar } from '@/components/top-bar';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

interface DrawerEntry {
  label: string;
  route: string;
  icon?: number;
  glyph?: string;
  match: (pathname: string) => boolean;
}

interface DrawerGroup {
  title?: string;
  entries: DrawerEntry[];
}

const HOME_ICON = require('@/assets/images/tabIcons/home.png');
const CALC_ICON = require('@/assets/images/tabIcons/calculator.png');
const PROFILES_ICON = require('@/assets/images/tabIcons/profiles.png');
const EXPLORE_ICON = require('@/assets/images/tabIcons/explore.png');

const GROUPS: DrawerGroup[] = [
  {
    entries: [
      { label: 'Home', route: '/', icon: HOME_ICON, match: (p) => p === '/' },
      { label: 'Calculator', route: '/calculator', icon: CALC_ICON, match: (p) => p.startsWith('/calculator') },
      { label: 'Profiles', route: '/profile', icon: PROFILES_ICON, match: (p) => p.startsWith('/profile') },
      { label: 'Explore', route: '/explore', icon: EXPLORE_ICON, match: (p) => p === '/explore' },
      { label: 'Search', route: '/search', glyph: '⌕', match: (p) => p.startsWith('/search') },
    ],
  },
  {
    title: 'Practice',
    entries: [
      { label: 'Journal', route: '/journal', glyph: '✎', match: (p) => p.startsWith('/journal') },
      { label: 'Goals', route: '/goals', glyph: '◎', match: (p) => p.startsWith('/goals') },
      { label: 'Reports', route: '/reports', glyph: '▤', match: (p) => p.startsWith('/reports') },
      { label: 'Statistics', route: '/stats', glyph: '◔', match: (p) => p.startsWith('/stats') },
    ],
  },
  {
    title: 'References',
    entries: [
      { label: 'Affirmations', route: '/affirmations', glyph: '✦', match: (p) => p.startsWith('/affirmations') },
      { label: 'Angel Numbers', route: '/angel-numbers', glyph: '◈', match: (p) => p.startsWith('/angel-numbers') },
      { label: 'Chinese Zodiac', route: '/zodiac', glyph: '⬡', match: (p) => p.startsWith('/zodiac') },
      { label: 'Lucky Numbers & Colors', route: '/lucky?n=7', glyph: '❖', match: (p) => p.startsWith('/lucky') },
      { label: 'Education', route: '/education', glyph: '✐', match: (p) => p.startsWith('/education') },
    ],
  },
  {
    title: 'Tools',
    entries: [
      { label: 'Name Compatibility', route: '/compatibility', glyph: '♡', match: (p) => p === '/compatibility' },
      { label: 'Business Name', route: '/compatibility/business-name', glyph: '⬣', match: (p) => p.startsWith('/compatibility/business-name') },
      { label: 'Baby Name', route: '/baby-name', glyph: '○', match: (p) => p.startsWith('/baby-name') },
      { label: 'Phone Number', route: '/phone-number', glyph: '✆', match: (p) => p.startsWith('/phone-number') },
      { label: 'House Number', route: '/house-number', glyph: '⌂', match: (p) => p.startsWith('/house-number') },
      { label: 'Vehicle Number', route: '/vehicle-number', glyph: '⬔', match: (p) => p.startsWith('/vehicle-number') },
      { label: 'Backup', route: '/backup', glyph: '⤓', match: (p) => p.startsWith('/backup') },
    ],
  },
  {
    title: 'System',
    entries: [
      { label: 'Settings', route: '/settings', glyph: '⚙', match: (p) => p.startsWith('/settings') },
      { label: 'About', route: '/about', glyph: 'ⓘ', match: (p) => p.startsWith('/about') },
    ],
  },
];

function DrawerRow({ entry, active, onNavigate }: { entry: DrawerEntry; active: boolean; onNavigate: (route: string) => void }) {
  const theme = useTheme();
  return (
    <Pressable
      onPress={() => onNavigate(entry.route)}
      accessibilityRole="button"
      accessibilityLabel={`Go to ${entry.label}`}
      accessibilityState={{ selected: active }}
      android_ripple={{ color: theme.textSecondary }}
      style={[
        styles.row,
        active ? { backgroundColor: theme.backgroundSelected } : undefined,
      ]}>
      {entry.icon ? (
        <Image
          source={entry.icon}
          style={[styles.rowIcon, { tintColor: active ? theme.tint : theme.textSecondary }]}
          contentFit="contain"
          accessibilityLabel={`${entry.label} icon`}
        />
      ) : (
        <ThemedView style={styles.glyphWrap}>
          <ThemedText themeColor={active ? 'text' : 'textSecondary'} style={styles.rowGlyph}>
            {entry.glyph}
          </ThemedText>
        </ThemedView>
      )}
      <ThemedText type="smallBold" themeColor={active ? 'text' : 'textSecondary'} numberOfLines={1}>
        {entry.label}
      </ThemedText>
    </Pressable>
  );
}

function DrawerContent({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const pathname = usePathname();

  function navigate(route: string) {
    try { navigation.closeDrawer(); } catch {}
    // Slight delay so the drawer close animation starts before navigating.
    setTimeout(() => {
      try { router.push(route as any); } catch {}
    }, 60);
  }

  return (
    <ThemedView style={[styles.container, { paddingTop: insets.top }]}>
      <Pressable
        onPress={() => navigate('/')}
        accessibilityRole="button"
        accessibilityLabel="Numera home"
        style={styles.brand}>
        <Image
          source={require('@/assets/images/icon.png')}
          style={styles.brandIcon}
          contentFit="contain"
          accessibilityLabel="Numera app icon"
        />
        <ThemedView style={styles.brandText}>
          <ThemedText type="heading" numberOfLines={1}>Numera</ThemedText>
          <ThemedText type="small" themeColor="textSecondary" numberOfLines={1}>
            Offline numerology
          </ThemedText>
        </ThemedView>
      </Pressable>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={[styles.list, { paddingBottom: insets.bottom + Spacing.four }]}>
        {GROUPS.map((group, gi) => (
          <ThemedView key={group.title ?? `main-${gi}`} style={styles.group}>
            {group.title && (
              <ThemedText type="smallBold" themeColor="textSecondary" style={styles.groupTitle}>
                {group.title.toUpperCase()}
              </ThemedText>
            )}
            {group.entries.map((entry) => (
              <DrawerRow
                key={entry.route}
                entry={entry}
                active={entry.match(pathname)}
                onNavigate={navigate}
              />
            ))}
          </ThemedView>
        ))}
        <ThemedText type="small" themeColor="textSecondary" style={[styles.version, { color: theme.textSecondary }]}>
          Numera v1.0.0
        </ThemedText>
      </ScrollView>
    </ThemedView>
  );
}

export default function AppDrawer() {
  const theme = useTheme();

  return (
    <Drawer
      drawerContent={(props: any) => <DrawerContent navigation={props.navigation} />}
      screenOptions={{
        headerShown: true,
        header: () => <TopBar />,
        drawerStyle: { width: 300, backgroundColor: theme.background },
        drawerActiveTintColor: theme.text,
        drawerInactiveTintColor: theme.textSecondary,
        swipeEnabled: true,
      } as any}>
      <Drawer.Screen name="index" options={{ title: 'Home' } as any} />
      <Drawer.Screen name="calculator" options={{ title: 'Calculator' } as any} />
      <Drawer.Screen name="profile" options={{ title: 'Profiles' } as any} />
      <Drawer.Screen name="explore" options={{ title: 'Explore' } as any} />
      <Drawer.Screen
        name="onboarding"
        options={{ title: 'Onboarding', headerShown: false, swipeEnabled: false } as any}
      />
      <Drawer.Screen name="affirmations" options={{ title: 'Affirmations' } as any} />
      <Drawer.Screen name="angel-numbers" options={{ title: 'Angel Numbers' } as any} />
      <Drawer.Screen name="baby-name" options={{ title: 'Baby Name' } as any} />
      <Drawer.Screen name="backup" options={{ title: 'Backup' } as any} />
      <Drawer.Screen name="education" options={{ title: 'Education' } as any} />
      <Drawer.Screen name="goals" options={{ title: 'Goals' } as any} />
      <Drawer.Screen name="house-number" options={{ title: 'House Number' } as any} />
      <Drawer.Screen name="journal" options={{ title: 'Journal' } as any} />
      <Drawer.Screen name="lucky" options={{ title: 'Lucky' } as any} />
      <Drawer.Screen name="phone-number" options={{ title: 'Phone Number' } as any} />
      <Drawer.Screen name="reports" options={{ title: 'Reports' } as any} />
      <Drawer.Screen name="search" options={{ title: 'Search' } as any} />
      <Drawer.Screen name="settings" options={{ title: 'Settings' } as any} />
      <Drawer.Screen name="stats" options={{ title: 'Statistics' } as any} />
      <Drawer.Screen name="vehicle-number" options={{ title: 'Vehicle Number' } as any} />
      <Drawer.Screen name="zodiac" options={{ title: 'Chinese Zodiac' } as any} />
      <Drawer.Screen name="about" options={{ title: 'About' } as any} />
      <Drawer.Screen name="compatibility" options={{ title: 'Compatibility' } as any} />
      <Drawer.Screen name="cycles" options={{ title: 'Cycles' } as any} />
      <Drawer.Screen name="numbers" options={{ title: 'Numbers' } as any} />
    </Drawer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.three,
    minHeight: 72,
  },
  brandIcon: {
    width: 44,
    height: 44,
    borderRadius: 10,
  },
  brandText: {
    flex: 1,
    gap: 2,
  },
  list: {
    paddingHorizontal: Spacing.two,
    gap: Spacing.two,
  },
  group: {
    gap: Spacing.one,
    marginTop: Spacing.two,
  },
  groupTitle: {
    paddingHorizontal: Spacing.three,
    fontSize: 12,
    letterSpacing: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    minHeight: 48,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    borderRadius: Spacing.two,
    borderCurve: 'continuous',
  },
  rowIcon: {
    width: 22,
    height: 22,
  },
  glyphWrap: {
    width: 22,
    alignItems: 'center',
  },
  rowGlyph: {
    fontSize: 18,
    lineHeight: 24,
  },
  version: {
    textAlign: 'center',
    marginTop: Spacing.four,
    fontSize: 12,
  },
});
