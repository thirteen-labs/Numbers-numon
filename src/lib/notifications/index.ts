import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export async function requestPermissions(): Promise<boolean> {
  const { status: existing } = await Notifications.getPermissionsAsync();
  if (existing === 'granted') return true;

  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
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
