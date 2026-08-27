import { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { File, Paths } from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';

import { Button, Card, Section } from '@/components/ui';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import {
  getAllProfiles, getAllEntries, getAllGoals,
  insertProfile, insertEntry, insertGoal,
  clearAllData, getProfileById,
} from '@/lib/database';
import type { Profile } from '@/lib/schema';
import type { JournalEntry, Goal } from '@/lib/database';

function csvEscape(v: string): string {
  if (v.includes(',') || v.includes('"') || v.includes('\n')) return `"${v.replace(/"/g, '""')}"`;
  return v;
}

function profilesToCSV(profiles: Profile[]): string {
  const header = 'id,name,firstName,middleName,lastName,dateOfBirth,nickname,gender,notes,isFavorite';
  const rows = profiles.map((p) =>
    [p.id, csvEscape(p.name), csvEscape(p.person.firstName), csvEscape(p.person.middleName ?? ''), csvEscape(p.person.lastName),
      p.person.dateOfBirth.toISOString(), csvEscape(p.person.nickname ?? ''), p.person.gender ?? '',
      csvEscape(p.person.notes ?? ''), p.isFavorite ? 'true' : 'false'].join(',')
  );
  return [header, ...rows].join('\n');
}

function entriesToCSV(entries: JournalEntry[]): string {
  const header = 'id,profileId,title,content,mood,tags,createdAt,updatedAt';
  const rows = entries.map((e) =>
    [e.id, e.profileId ?? '', `"${e.title.replace(/"/g, '""')}"`, `"${e.content.replace(/"/g, '""')}"`,
      e.mood ?? '', e.tags.join(';'), e.createdAt.toISOString(), e.updatedAt.toISOString()].join(',')
  );
  return [header, ...rows].join('\n');
}

function goalsToCSV(goals: Goal[]): string {
  const header = 'id,profileId,title,description,targetDate,status,progress,favorableNumber,createdAt,updatedAt';
  const rows = goals.map((g) =>
    [g.id, g.profileId ?? '', `"${g.title.replace(/"/g, '""')}"`, `"${g.description.replace(/"/g, '""')}"`,
      g.targetDate?.toISOString() ?? '', g.status, g.progress, g.favorableNumber ?? '',
      g.createdAt.toISOString(), g.updatedAt.toISOString()].join(',')
  );
  return [header, ...rows].join('\n');
}

export default function BackupScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const [lastExport, setLastExport] = useState<string | null>(null);
  const [importing, setImporting] = useState(false);

  async function handleExportJSON() {
    try {
      const profiles = await getAllProfiles();
      const entries = await getAllEntries();
      const goals = await getAllGoals();
      const backup = { version: '1.0', exportedAt: new Date().toISOString(), profiles, entries, goals };
      const json = JSON.stringify(backup, null, 2);
      const filename = `numon-backup-${Date.now()}.json`;
      const dir = Paths.cache;
      const path = `${dir}/${filename}`;
      const file = new File(path);
      await file.write(json);
      setLastExport(path);
      Alert.alert('JSON Backup Created', `Exported to: ${path}`);
    } catch (e) {
      Alert.alert('Export Failed', String(e));
    }
  }

  async function handleExportCSV() {
    try {
      const profiles = await getAllProfiles();
      const entries = await getAllEntries();
      const goals = await getAllGoals();
      const dir = Paths.cache;
      const files = [
        { name: `profiles-${Date.now()}.csv`, data: profilesToCSV(profiles) },
        { name: `entries-${Date.now()}.csv`, data: entriesToCSV(entries) },
        { name: `goals-${Date.now()}.csv`, data: goalsToCSV(goals) },
      ];
      for (const f of files) {
        const file = new File(`${dir}/${f.name}`);
        await file.write(f.data);
      }
      setLastExport(String(dir));
      Alert.alert('CSV Exports Created', `Saved to: ${String(dir)}\n${files.map((f) => f.name).join('\n')}`);
    } catch (e) {
      Alert.alert('Export Failed', String(e));
    }
  }

  async function handleImport() {
    try {
      setImporting(true);
      const result = await DocumentPicker.getDocumentAsync({ type: 'application/json' });
      if (result.canceled) { setImporting(false); return; }

      const file = result.assets?.[0];
      if (!file) { setImporting(false); return; }

      const content = await new File(file.uri).text();
      const data = JSON.parse(content);

      if (!data.version) {
        Alert.alert('Invalid File', 'Not a valid Numon backup file.');
        setImporting(false);
        return;
      }

      await clearAllData();

      if (data.profiles) {
        for (const p of data.profiles) {
          const existing = await getProfileById(p.id);
          if (!existing) {
            const profile: Profile = {
              ...p,
              person: {
                ...p.person,
                dateOfBirth: new Date(p.person.dateOfBirth),
              },
              createdAt: new Date(p.createdAt),
              updatedAt: new Date(p.updatedAt),
            };
            await insertProfile(profile);
          }
        }
      }

      if (data.entries) {
        for (const e of data.entries) {
          const entry: JournalEntry = {
            ...e,
            createdAt: new Date(e.createdAt),
            updatedAt: new Date(e.updatedAt),
          };
          await insertEntry(entry);
        }
      }

      if (data.goals) {
        for (const g of data.goals) {
          const goal: Goal = {
            ...g,
            targetDate: g.targetDate ? new Date(g.targetDate) : null,
            createdAt: new Date(g.createdAt),
            updatedAt: new Date(g.updatedAt),
          };
          await insertGoal(goal);
        }
      }

      Alert.alert('Import Complete', `Restored ${data.profiles?.length ?? 0} profiles, ${data.entries?.length ?? 0} entries, ${data.goals?.length ?? 0} goals.`);
    } catch (e) {
      Alert.alert('Import Failed', String(e));
    } finally {
      setImporting(false);
    }
  }

  const bottomPadding = insets.bottom + BottomTabInset + Spacing.three;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.background }}
      contentContainerStyle={[styles.container, { paddingBottom: bottomPadding }]}>
      <ThemedView style={styles.inner}>
        <Section title="Backup & Restore" subtitle="Export or import your Numon data">
          <Card title="Export as JSON">
            <ThemedText type="small">Creates a complete JSON backup of all profiles, journal entries, and goals.</ThemedText>
          </Card>
          <Button title="Export JSON Backup" onPress={handleExportJSON} />

          <Card title="Export as CSV">
            <ThemedText type="small">Export profiles, entries, and goals as separate CSV files for spreadsheet analysis.</ThemedText>
          </Card>
          <Button title="Export CSV Files" variant="secondary" onPress={handleExportCSV} />

          {lastExport && <ThemedText type="small" themeColor="textSecondary">Last export: {lastExport}</ThemedText>}

          <Card title="Import from JSON">
            <ThemedText type="small">Pick a previously exported Numon backup file to restore all data. Existing data will be replaced.</ThemedText>
          </Card>
          <Button title={importing ? 'Importing...' : 'Import JSON Backup'} variant="secondary" onPress={handleImport} disabled={importing} />
        </Section>

        <Section title="Data Summary">
          <BackupStat label="Profiles" fetch={async () => (await getAllProfiles()).length} />
          <BackupStat label="Journal Entries" fetch={async () => (await getAllEntries()).length} />
          <BackupStat label="Goals" fetch={async () => (await getAllGoals()).length} />
        </Section>
      </ThemedView>
    </ScrollView>
  );
}

function BackupStat({ label, fetch }: { label: string; fetch: () => Promise<number> }) {
  const [count, setCount] = useState<number | null>(null);
  useEffect(() => { fetch().then(setCount); }, [fetch]);
  return (
    <Card title={label}>
      <ThemedText type="small">{count !== null ? `${count} items` : 'Loading...'}</ThemedText>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', justifyContent: 'center' },
  inner: { maxWidth: MaxContentWidth, flexGrow: 1, gap: Spacing.five, padding: Spacing.four },
});
