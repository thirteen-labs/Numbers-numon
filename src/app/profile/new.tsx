import { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import { Button, Input, Section } from '@/components/ui';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { insertProfile } from '@/lib/database';
import { useProfileStore } from '@/lib/store';
import type { Profile } from '@/lib/schema';

export default function NewProfileScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const addProfile = useProfileStore((s) => s.addProfile);

  const [name, setName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dobString, setDobString] = useState('');
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    setError(null);
    if (!name.trim()) { setError('Profile name is required'); return; }
    if (!firstName.trim()) { setError('First name is required'); return; }
    if (!lastName.trim()) { setError('Last name is required'); return; }
    if (!dobString.trim()) { setError('Date of birth is required'); return; }

    const parts = dobString.split('/');
    if (parts.length !== 3) { setError('Use format MM/DD/YYYY'); return; }

    const month = parseInt(parts[0]!, 10) - 1;
    const day = parseInt(parts[1]!, 10);
    const year = parseInt(parts[2]!, 10);
    if (isNaN(month) || isNaN(day) || isNaN(year)) { setError('Invalid date'); return; }

    const dateOfBirth = new Date(year, month, day);
    const now = new Date();

    const profile: Profile = {
      id: crypto.randomUUID(),
      name: name.trim(),
      person: {
        firstName: firstName.trim(),
        middleName: middleName.trim(),
        lastName: lastName.trim(),
        dateOfBirth,
        nickname: nickname.trim(),
        notes: '',
      },
      isFavorite: false,
      createdAt: now,
      updatedAt: now,
    };

    setSaving(true);
    try {
      await insertProfile(profile);
      addProfile(profile);
      router.back();
    } catch (e) {
      setError('Failed to save profile');
    } finally {
      setSaving(false);
    }
  }

  const bottomPadding = insets.bottom + BottomTabInset + Spacing.three;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.background }}
      contentContainerStyle={[styles.container, { paddingBottom: bottomPadding }]}>
      <ThemedView style={styles.inner}>
        <Section title="New Profile" subtitle="Save a profile for quick calculations">
          <Input label="Profile Name" value={name} onChangeText={setName} placeholder="e.g. John Doe" />
          <Input label="First Name" value={firstName} onChangeText={setFirstName} placeholder="John" autoCapitalize="words" />
          <Input label="Middle Name" value={middleName} onChangeText={setMiddleName} placeholder="(optional)" autoCapitalize="words" />
          <Input label="Last Name" value={lastName} onChangeText={setLastName} placeholder="Doe" autoCapitalize="words" />
          <Input label="Date of Birth" value={dobString} onChangeText={setDobString} placeholder="MM/DD/YYYY" keyboardType="numbers-and-punctuation" />
          <Input label="Nickname" value={nickname} onChangeText={setNickname} placeholder="(optional)" autoCapitalize="words" />

          {error && <ThemedText style={styles.error}>{error}</ThemedText>}

          <ThemedView style={styles.buttons}>
            <Button title="Cancel" variant="secondary" onPress={() => router.back()} />
            <Button title={saving ? 'Saving...' : 'Save Profile'} onPress={handleSave} disabled={saving} />
          </ThemedView>
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
  buttons: {
    flexDirection: 'row',
    gap: Spacing.three,
    marginTop: Spacing.three,
  },
  error: {
    color: '#ff4444',
  },
});
