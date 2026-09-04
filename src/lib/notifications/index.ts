import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';

try {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
      shouldShowBanner: true,
      shouldShowList: true,
    }),
  });
} catch (e) {
  console.warn('[Notifications] setNotificationHandler failed', e);
}

export async function requestPermissions(): Promise<boolean> {
  const existing = await Notifications.getPermissionsAsync();
  if (existing.granted) return true;

  const result = await Notifications.requestPermissionsAsync();
  return result.granted;
}

export async function scheduleDailyNumberNotification(hour: number, minute: number) {
  await Notifications.cancelScheduledNotificationAsync('daily-number');

  await Notifications.scheduleNotificationAsync({
    identifier: 'daily-number',
    content: {
      title: 'Your Daily Number',
      body: 'Tap to see today\'s personal number and affirmation.',
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour,
      minute,
    },
  });
}

export async function scheduleDailyAffirmationNotification(hour: number, minute: number) {
  await Notifications.cancelScheduledNotificationAsync('daily-affirmation');

  await Notifications.scheduleNotificationAsync({
    identifier: 'daily-affirmation',
    content: {
      title: 'Daily Affirmation',
      body: 'Start your day with a positive affirmation.',
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour,
      minute,
    },
  });
}

export async function scheduleGoalReminderNotification(hour: number, minute: number) {
  await Notifications.cancelScheduledNotificationAsync('goal-reminder');

  await Notifications.scheduleNotificationAsync({
    identifier: 'goal-reminder',
    content: {
      title: 'Goal Reminder',
      body: 'Check in on your goals and track your progress today.',
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour,
      minute,
    },
  });
}

export async function schedulePersonalYearReminderNotification(hour: number, minute: number) {
  await Notifications.cancelScheduledNotificationAsync('personal-year');

  await Notifications.scheduleNotificationAsync({
    identifier: 'personal-year',
    content: {
      title: 'Personal Year Update',
      body: 'Reflect on your personal year energy and how it shapes your journey.',
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour,
      minute,
    },
  });
}

export async function cancelAllNotifications() {
  await Notifications.cancelAllScheduledNotificationsAsync();
}

export async function setupNotificationCategories() {
  if (Platform.OS === 'ios') {
    await Notifications.setNotificationCategoryAsync('daily', [
      {
        identifier: 'view',
        buttonTitle: 'View',
        options: { opensAppToForeground: true },
      },
    ]);
  }
}
