import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import { Button, DatePickerField, Input, Section } from '@/components/ui';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { insertProfile } from '@/lib/database';
import { useProfileStore } from '@/lib/store';
import type { Profile } from '@/lib/schema';

const GENDER_OPTIONS = [
  { key: '', label: 'Prefer not to say' },
  { key: 'male', label: 'Male' },
  { key: 'female', label: 'Female' },
  { key: 'other', label: 'Other' },
] as const;

export default function NewProfileScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const addProfile = useProfileStore((s) => s.addProfile);

  const [name, setName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
  const [nickname, setNickname] = useState('');
  const [gender, setGender] = useState('');
  const [birthTime, setBirthTime] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    setError(null);
    if (!name.trim()) { setError('Profile name is required'); return; }
    if (!firstName.trim()) { setError('First name is required'); return; }
    if (!lastName.trim()) { setError('Last name is required'); return; }
    if (!dateOfBirth) { setError('Date of birth is required'); return; }
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
        gender: (gender || undefined) as 'male' | 'female' | 'other' | undefined,
        birthTime: birthTime.trim() || '',
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
    } catch {
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
          <DatePickerField label="Date of Birth" value={dateOfBirth} onChange={setDateOfBirth} />
          <Input label="Nickname" value={nickname} onChangeText={setNickname} placeholder="(optional)" autoCapitalize="words" />

          <ThemedText type="smallBold" style={{ marginTop: Spacing.three }}>Gender (optional)</ThemedText>
          <ThemedView style={styles.genderRow}>
            {GENDER_OPTIONS.map((opt) => (
              <Pressable
                key={opt.key}
                onPress={() => setGender(opt.key)}
                style={[
                  styles.genderChip,
                  { backgroundColor: gender === opt.key ? theme.tint : theme.backgroundElement },
                ]}>
                <ThemedText type="small" themeColor={gender === opt.key ? 'background' : 'text'}>
                  {opt.label}
                </ThemedText>
              </Pressable>
            ))}
          </ThemedView>

          <Input label="Birth Time (optional)" value={birthTime} onChangeText={setBirthTime} placeholder="HH:MM AM/PM" />

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
  genderRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  genderChip: {
    paddingVertical: Spacing.one,
    paddingHorizontal: Spacing.three,
    borderRadius: Spacing.three,
  },
});
