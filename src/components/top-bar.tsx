import { Pressable, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { DrawerToggleButton } from 'expo-router/drawer';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

function TopBarAction({
  glyph,
  label,
  hint,
  onPress,
}: {
  glyph: string;
  label: string;
  hint: string;
  onPress: () => void;
}) {
  const theme = useTheme();
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityHint={hint}
      android_ripple={{ color: theme.textSecondary }}
      style={({ pressed }) => [styles.action, pressed ? { opacity: 0.7 } : undefined]}>
      <ThemedText style={[styles.glyph, { color: theme.text }]}>{glyph}</ThemedText>
    </Pressable>
  );
}

export function TopBar() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  return (
    <ThemedView
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          borderBottomColor: theme.backgroundElement,
        },
      ]}>
      <ThemedView style={styles.row}>
        <ThemedView style={styles.left}>
          <DrawerToggleButton tintColor={theme.text} />
          <Pressable
            onPress={() => router.push('/')}
            accessibilityRole="button"
            accessibilityLabel="Numera home"
            accessibilityHint="Goes to the home dashboard"
            android_ripple={{ color: theme.textSecondary }}
            style={({ pressed }) => [styles.brand, pressed ? { opacity: 0.7 } : undefined]}>
            <ThemedText type="heading" numberOfLines={1}>
              Numera
            </ThemedText>
          </Pressable>
        </ThemedView>
        <ThemedView style={styles.icons}>
          <TopBarAction
            glyph="⌕"
            label="Search"
            hint="Searches numbers, meanings, zodiac and guides"
            onPress={() => router.push('/search')}
          />
          <TopBarAction
            glyph="＋"
            label="Add profile"
            hint="Creates a new numerology profile"
            onPress={() => router.push('/profile/new')}
          />
          <TopBarAction
            glyph="⚙"
            label="Settings"
            hint="Opens app settings"
            onPress={() => router.push('/settings')}
          />
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  row: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.one,
    gap: Spacing.one,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
    gap: Spacing.one,
  },
  brand: {
    minHeight: 44,
    justifyContent: 'center',
    paddingHorizontal: Spacing.one,
    flexShrink: 1,
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
  },
  action: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 22,
    borderCurve: 'continuous',
  },
  glyph: {
    fontSize: 22,
    lineHeight: 28,
    textAlign: 'center',
  },
});
