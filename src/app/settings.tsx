import { useState } from 'react';
import { ScrollView, StyleSheet, Switch } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button, Card, Section } from '@/components/ui';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { THEMES } from '@/constants/themes';
import { useTheme } from '@/hooks/use-theme';
import { useAppStore } from '@/lib/store';
import { requestPermissions, cancelAllNotifications, scheduleDailyNumberNotification, scheduleDailyAffirmationNotification, scheduleGoalReminderNotification, schedulePersonalYearReminderNotification } from '@/lib/notifications';

const THEME_OPTIONS: { key: string; label: string }[] = [
  { key: 'system', label: 'System' },
  { key: 'light', label: 'Light' },
  { key: 'dark', label: 'Dark' },
  { key: 'amoled', label: 'AMOLED' },
  { key: 'mystic', label: 'Mystic' },
  { key: 'cosmic', label: 'Cosmic' },
  { key: 'emerald', label: 'Emerald' },
  { key: 'royal', label: 'Royal' },
  { key: 'glass', label: 'Glass' },
];

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const { theme: themeMode, setTheme, notificationPrefs, setNotificationPrefs } = useAppStore();
  const [notifStatus, setNotifStatus] = useState<string | null>(null);

  const bottomPadding = insets.bottom + BottomTabInset + Spacing.three;

  async function handleToggleNotifications(key: 'dailyNumber' | 'dailyAffirmation' | 'goalReminders', value: boolean) {
    if (value) {
      const granted = await requestPermissions();
      if (!granted) {
        setNotifStatus('Notification permission denied');
        return;
      }
      if (key === 'dailyNumber') await scheduleDailyNumberNotification(8, 0);
      else if (key === 'dailyAffirmation') await scheduleDailyAffirmationNotification(8, 0);
      else if (key === 'goalReminders') await scheduleGoalReminderNotification(12, 0);
      setNotificationPrefs({ [key]: true });
      setNotifStatus('Notifications enabled');
    } else {
      setNotificationPrefs({ [key]: false });
      const any = notificationPrefs.dailyNumber || notificationPrefs.dailyAffirmation || notificationPrefs.goalReminders;
      if (!any) await cancelAllNotifications();
      setNotifStatus('Notifications disabled');
    }
    setTimeout(() => setNotifStatus(null), 2000);
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.background }}
      contentContainerStyle={[styles.container, { paddingBottom: bottomPadding }]}>
      <ThemedView style={styles.inner}>
        <Section title="Theme" subtitle="Choose your appearance">
          <ThemedView style={styles.themeRow}>
            {THEME_OPTIONS.map((opt) => (
              <Button
                key={opt.key}
                title={opt.label}
                variant={themeMode === opt.key ? 'primary' : 'ghost'}
                onPress={() => setTheme(opt.key as any)}
                style={styles.themeBtn}
              />
            ))}
          </ThemedView>
        </Section>

        <Section title="App Theme Colors" subtitle="Preview selected palette">
          <ThemedView style={styles.swatchRow}>
            {Object.entries(THEMES).map(([name, colors]) => (
              <ThemedView
                key={name}
                style={[styles.swatch, { backgroundColor: colors.tint }]}
              />
            ))}
          </ThemedView>
        </Section>

        <Section title="Notifications">
          <Card>
            <ThemedView style={styles.switchRow}>
              <ThemedText type="small">Daily Number Reminder</ThemedText>
              <Switch
                value={notificationPrefs.dailyNumber}
                onValueChange={(v) => handleToggleNotifications('dailyNumber', v)}
                trackColor={{ false: theme.textSecondary, true: theme.tint }}
              />
            </ThemedView>
            <ThemedView style={styles.switchRow}>
              <ThemedText type="small">Daily Affirmation</ThemedText>
              <Switch
                value={notificationPrefs.dailyAffirmation}
                onValueChange={(v) => handleToggleNotifications('dailyAffirmation', v)}
                trackColor={{ false: theme.textSecondary, true: theme.tint }}
              />
            </ThemedView>
            <ThemedView style={styles.switchRow}>
              <ThemedText type="small">Goal Reminders</ThemedText>
              <Switch
                value={notificationPrefs.goalReminders}
                onValueChange={(v) => handleToggleNotifications('goalReminders', v)}
                trackColor={{ false: theme.textSecondary, true: theme.tint }}
              />
            </ThemedView>
          </Card>
          {notifStatus && <ThemedText type="small" style={styles.status}>{notifStatus}</ThemedText>}
        </Section>

        <Section title="About">
          <Card>
            <ThemedText type="small">Numon v1.0.0</ThemedText>
            <ThemedText type="small">Complete Offline Numerology Platform</ThemedText>
            <ThemedText type="small">All calculations are performed locally on your device.</ThemedText>
          </Card>
        </Section>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', justifyContent: 'center' },
  inner: { maxWidth: MaxContentWidth, flexGrow: 1, gap: Spacing.five, padding: Spacing.four },
  themeRow: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.one },
  themeBtn: { flex: 1, minWidth: 80 },
  swatchRow: { flexDirection: 'row', gap: Spacing.two, flexWrap: 'wrap' },
  swatch: { width: 28, height: 28, borderRadius: 14 },
  switchRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: Spacing.one },
  status: { textAlign: 'center', marginTop: Spacing.two },
});
