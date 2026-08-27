import { useEffect, useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { router } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useProfileStore } from '@/lib/store';
import { getAllProfiles } from '@/lib/database';
import type { Profile } from '@/lib/schema';

interface Props {
  onSelect?: (profile: Profile) => void;
}

export default function ProfilePicker({ onSelect }: Props) {
  const theme = useTheme();
  const { profiles, setProfiles } = useProfileStore();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getAllProfiles().then(setProfiles);
  }, [setProfiles]);

  if (profiles.length === 0) return null;

  return (
    <ThemedView>
      <Pressable onPress={() => setOpen(!open)} style={({ pressed }) => [styles.trigger, pressed && { opacity: 0.7 }]}>
        <ThemedText type="small" themeColor="textSecondary">
          {profiles.length} profile{profiles.length !== 1 ? 's' : ''} ▼
        </ThemedText>
      </Pressable>

      {open && (
        <ThemedView type="backgroundElement" style={styles.dropdown}>
          {profiles.map((p) => (
            <Pressable
              key={p.id}
              onPress={() => {
                setOpen(false);
                if (onSelect) onSelect(p);
              }}
              style={({ pressed }) => [styles.item, pressed && { opacity: 0.7 }]}>
              <ThemedText type="small">{p.person.firstName} {p.person.lastName}</ThemedText>
              {p.isFavorite && <ThemedText type="small" style={{ color: theme.tint }}>★</ThemedText>}
            </Pressable>
          ))}
          <Pressable
            onPress={() => { setOpen(false); router.push('/profile/new'); }}
            style={({ pressed }) => [styles.item, pressed && { opacity: 0.7 }]}>
            <ThemedText type="small" style={{ color: theme.tint }}>+ New Profile</ThemedText>
          </Pressable>
        </ThemedView>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  trigger: { paddingVertical: Spacing.one },
  dropdown: { position: 'absolute' as const, top: 24, left: 0, right: 0, zIndex: 100, borderRadius: Spacing.two, padding: Spacing.two, elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 2 } as const, shadowOpacity: 0.2, shadowRadius: 4 },
  item: { flexDirection: 'row' as const, justifyContent: 'space-between', paddingVertical: Spacing.two, paddingHorizontal: Spacing.two },
});
