// @ts-ignore - expo-router Tabs type resolution varies by SDK/bundler
import { Tabs } from 'expo-router';
// @ts-ignore - @types/react-native not installed, but runtime type exists
import { Image, useColorScheme } from 'react-native';

import { Colors } from '@/constants/theme';

// Stable Tabs implementation — replaces experimental NativeTabs which crashes
// when navigating to non-tab routes like /onboarding (fatal native exception).
export default function AppTabs() {
  const scheme = useColorScheme();
  const resolvedScheme = scheme === 'unspecified' || scheme === null ? 'light' : scheme;
  const colors = Colors[resolvedScheme];

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.tint,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.tabBar,
          borderTopColor: colors.backgroundElement,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' as const },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <Image
              source={require('@/assets/images/tabIcons/home.png')}
              style={{ width: 24, height: 24, tintColor: focused ? colors.tint : colors.textSecondary }}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="calculator"
        options={{
          title: 'Calculator',
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <Image
              source={require('@/assets/images/tabIcons/calculator.png')}
              style={{ width: 24, height: 24, tintColor: focused ? colors.tint : colors.textSecondary }}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profiles',
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <Image
              source={require('@/assets/images/tabIcons/profiles.png')}
              style={{ width: 24, height: 24, tintColor: focused ? colors.tint : colors.textSecondary }}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <Image
              source={require('@/assets/images/tabIcons/explore.png')}
              style={{ width: 24, height: 24, tintColor: focused ? colors.tint : colors.textSecondary }}
              resizeMode="contain"
            />
          ),
        }}
      />
      {/* Hidden routes — not shown in tab bar but accessible via router.
          Prevents crash that occurred with NativeTabs which had no Trigger for these. */}
      <Tabs.Screen name="onboarding" options={{ href: null, headerShown: false, tabBarStyle: { display: 'none' } }} />
      <Tabs.Screen name="affirmations" options={{ href: null }} />
      <Tabs.Screen name="angel-numbers" options={{ href: null }} />
      <Tabs.Screen name="baby-name" options={{ href: null }} />
      <Tabs.Screen name="backup" options={{ href: null }} />
      <Tabs.Screen name="education" options={{ href: null }} />
      <Tabs.Screen name="goals" options={{ href: null }} />
      <Tabs.Screen name="house-number" options={{ href: null }} />
      <Tabs.Screen name="journal" options={{ href: null }} />
      <Tabs.Screen name="lucky" options={{ href: null }} />
      <Tabs.Screen name="phone-number" options={{ href: null }} />
      <Tabs.Screen name="reports" options={{ href: null }} />
      <Tabs.Screen name="search" options={{ href: null }} />
      <Tabs.Screen name="settings" options={{ href: null }} />
      <Tabs.Screen name="stats" options={{ href: null }} />
      <Tabs.Screen name="vehicle-number" options={{ href: null }} />
      <Tabs.Screen name="zodiac" options={{ href: null }} />
      <Tabs.Screen name="about" options={{ href: null }} />
      <Tabs.Screen name="compatibility" options={{ href: null }} />
      <Tabs.Screen name="cycles" options={{ href: null }} />
      <Tabs.Screen name="numbers" options={{ href: null }} />
    </Tabs>
  );
}
