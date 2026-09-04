import { useCallback, useState } from 'react';
import { Alert, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router, useFocusEffect } from 'expo-router';
import { File, Paths } from 'expo-file-system';

import { Button, Card, NumberCircle, Section } from '@/components/ui';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { getAllProfiles, getAllReports, insertReport, deleteReport, getProfileById } from '@/lib/database';
import { calculateAllCoreNumbers, calculateAllPersonalNumbers, calculateCycles } from '@/lib/numerology';
import { calculateKarmicDebt, calculateKarmicLessons, calculateHiddenPassion, calculateBalance } from '@/lib/numerology/advanced';
import { colorForNumber } from '@/lib/numerology/utils';
import { exportReportAsPdf, exportReportAsCsv } from '@/lib/reports/export';
import type { Profile } from '@/lib/schema';
import type { Report } from '@/lib/database';

export default function ReportsScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const [reports, setReports] = useState<Report[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [generating, setGenerating] = useState(false);

  async function loadData() {
    const [r, p] = await Promise.all([getAllReports(), getAllProfiles()]);
    setReports(r);
    setProfiles(p as Profile[]);
  }

  useFocusEffect(
    useCallback(() => {
      loadData().catch((e) => {
        console.error('Failed to load reports data', e);
      });
    }, [])
  );

  async function handleGenerate(profile: Profile) {
    setGenerating(true);
    try {
      const core = calculateAllCoreNumbers(profile.person);
      const personal = calculateAllPersonalNumbers(profile.person.dateOfBirth);
      const cycles = calculateCycles(core, profile.person.dateOfBirth);
      const karmicDebt = calculateKarmicDebt(profile.person);
      const karmicLessons = calculateKarmicLessons(profile.person);
      const hiddenPassion = calculateHiddenPassion(profile.person);
      const balance = calculateBalance(profile.person);

      const reportData = {
        profileName: profile.name,
        generatedAt: new Date().toISOString(),
        core,
        personal,
        cycles,
        advanced: { karmicDebt, karmicLessons, hiddenPassion, balance },
      };

      const report: Report = {
        id: crypto.randomUUID(),
        profileId: profile.id,
        type: 'full',
        data: JSON.stringify(reportData),
        createdAt: new Date(),
      };

      await insertReport(report);
      setReports((prev) => [report, ...prev]);
      Alert.alert('Report Generated', `Full numerology report for ${profile.name} created.`);
    } catch (e) {
      Alert.alert('Error', String(e));
    } finally {
      setGenerating(false);
    }
  }

  async function handleExportJSON(report: Report) {
    try {
      const filename = `numera-report-${report.id.slice(0, 8)}.json`;
      const path = `${Paths.cache}/${filename}`;
      const file = new File(path);
      const profile = await getProfileById(report.profileId);
      const exportData = {
        version: '1.0',
        report: JSON.parse(report.data),
        profile: profile ? { name: profile.name, person: profile.person } : null,
        exportedAt: new Date().toISOString(),
      };
      await file.write(JSON.stringify(exportData, null, 2));
      Alert.alert('Report Exported', `Saved to: ${path}`);
    } catch (e) {
      Alert.alert('Export Failed', String(e));
    }
  }

  async function handleExportPdf(report: Report) {
    try {
      const reportData = JSON.parse(report.data);
      const profile = await getProfileById(report.profileId);
      const path = await exportReportAsPdf({ ...reportData, profileName: profile?.name ?? reportData.profileName });
      Alert.alert('PDF Report Exported', `Saved to: ${path}`);
    } catch (e) {
      Alert.alert('Export Failed', String(e));
    }
  }

  async function handleExportCsv(report: Report) {
    try {
      const reportData = JSON.parse(report.data);
      const profile = await getProfileById(report.profileId);
      const path = await exportReportAsCsv({ ...reportData, profileName: profile?.name ?? reportData.profileName });
      Alert.alert('CSV Report Exported', `Saved to: ${path}`);
    } catch (e) {
      Alert.alert('Export Failed', String(e));
    }
  }

  async function handleDelete(id: string) {
    Alert.alert('Delete Report', 'Remove this saved report?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete', style: 'destructive',
        onPress: async () => {
          await deleteReport(id);
          setReports((prev) => prev.filter((r) => r.id !== id));
        },
      },
    ]);
  }

  const bottomPadding = insets.bottom + BottomTabInset + Spacing.three;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.background }}
      contentContainerStyle={[styles.container, { paddingBottom: bottomPadding }]}>
      <ThemedView style={styles.inner}>
        <Section title="Reports" subtitle="Generate and export numerology reports">
          <ThemedText type="small">
            Create comprehensive numerology reports for your saved profiles and export them as PDF, JSON, or CSV files.
          </ThemedText>
        </Section>

        {profiles.length > 0 && (
          <Section title="Generate New Report">
            {profiles.map((p) => (
              <Card key={p.id} title={p.name}>
                <ThemedText type="small">
                  {p.person.firstName} {p.person.lastName} — {p.person.dateOfBirth.toLocaleDateString()}
                </ThemedText>
                <Button
                  title={generating ? 'Generating...' : 'Generate Full Report'}
                  onPress={() => handleGenerate(p)}
                  disabled={generating}
                />
              </Card>
            ))}
          </Section>
        )}

        {reports.length === 0 && (
          <Section title="No Reports Yet">
            <ThemedText type="small">Generate a report from one of your saved profiles above.</ThemedText>
          </Section>
        )}

        {reports.length > 0 && (
          <Section title={`Saved Reports (${reports.length})`}>
            {reports.map((r) => {
              const parsed = JSON.parse(r.data);
              return (
                <Card key={r.id} title={parsed.profileName ?? 'Report'}>
                  <ThemedText type="small">
                    Generated: {r.createdAt.toLocaleDateString()} at {r.createdAt.toLocaleTimeString()}
                  </ThemedText>
                  {parsed.core && (
                    <ThemedView style={styles.numberRow}>
                      <NumberCircle number={parsed.core.lifePath} size={32} label="LP" color={colorForNumber(parsed.core.lifePath, theme)} />
                      <NumberCircle number={parsed.core.expression} size={32} label="Exp" color={colorForNumber(parsed.core.expression, theme)} />
                      <NumberCircle number={parsed.core.soulUrge} size={32} label="SU" color={colorForNumber(parsed.core.soulUrge, theme)} />
                      <NumberCircle number={parsed.core.personality} size={32} label="Per" color={colorForNumber(parsed.core.personality, theme)} />
                    </ThemedView>
                  )}
                  <ThemedView style={styles.actions}>
                    <Button title="PDF" variant="primary" onPress={() => handleExportPdf(r)} />
                    <Button title="JSON" variant="secondary" onPress={() => handleExportJSON(r)} />
                    <Button title="CSV" variant="secondary" onPress={() => handleExportCsv(r)} />
                    <Button title="Delete" variant="ghost" onPress={() => handleDelete(r.id)} />
                  </ThemedView>
                </Card>
              );
            })}
          </Section>
        )}

        {profiles.length === 0 && (
          <Button title="Create a Profile First" onPress={() => router.push('/profile/new')} />
        )}
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', justifyContent: 'center' },
  inner: { maxWidth: MaxContentWidth, flexGrow: 1, gap: Spacing.five, padding: Spacing.four },
  numberRow: { flexDirection: 'row', gap: Spacing.two, marginVertical: Spacing.two },
  actions: { flexDirection: 'row', gap: Spacing.three, marginTop: Spacing.three },
});
