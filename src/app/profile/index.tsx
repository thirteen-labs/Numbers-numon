import { useCallback, useState } from 'react';
import { Pressable, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router, useFocusEffect } from 'expo-router';

import { Button, Card, Section } from '@/components/ui';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useProfileStore } from '@/lib/store';
import { getAllProfiles } from '@/lib/database';
import type { Profile } from '@/lib/schema';

export default function ProfileListScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const { profiles, setProfiles, setLoading } = useProfileStore();
  const [initialized, setInitialized] = useState(false);

  useFocusEffect(
    useCallback(() => {
      async function load() {
        setLoading(true);
        try {
          const data = await getAllProfiles();
          setProfiles(data);
        } catch (e) {
          console.error('Failed to load profiles', e);
        } finally {
          setLoading(false);
          setInitialized(true);
        }
      }
      load();
    }, [setProfiles, setLoading])
  );

  const bottomPadding = insets.bottom + BottomTabInset + Spacing.three;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.background }}
      contentContainerStyle={[styles.container, { paddingBottom: bottomPadding }]}>
      <ThemedView style={styles.inner}>
        <Section title="Profiles" subtitle="Manage your numerology profiles">
          <Button title="Create New Profile" onPress={() => router.push('/profile/new')} />

          {!initialized && (
            <ThemedText type="small" style={styles.center}>
              Loading...
            </ThemedText>
          )}

          {initialized && profiles.length === 0 && (
            <Card>
              <ThemedText type="small" style={styles.center}>
                No profiles yet. Create one to get started.
              </ThemedText>
            </Card>
          )}

          {profiles.map((profile: Profile) => (
            <Pressable
              key={profile.id}
              onPress={() => router.push(`/profile/${profile.id}`)}
              style={({ pressed }) => [pressed && { opacity: 0.7 }]}>
              <Card title={profile.name}>
                <ThemedText type="small">
                  {profile.person.firstName} {profile.person.lastName}
                  {' — '}
                  {profile.person.dateOfBirth.toLocaleDateString()}
                </ThemedText>
                {profile.isFavorite && (
                  <ThemedText type="small" style={styles.favorite}>
                    ★ Favorite
                  </ThemedText>
                )}
              </Card>
            </Pressable>
          ))}
        </Section>
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
    textAlign: 'center',
  },
  favorite: {
    color: '#FFD700',
    marginTop: Spacing.half,
  },
});
