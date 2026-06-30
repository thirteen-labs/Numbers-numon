import { createMMKV } from 'react-native-mmkv';

export const storage = createMMKV({
  id: 'numon-storage',
});

const KEYS = {
  THEME: 'theme',
  LAST_SCREEN: 'last_screen',
  ONBOARDING_DONE: 'onboarding_done',
  DAILY_CACHE: 'daily_cache',
  SETTINGS: 'settings',
} as const;

export function getTheme(): string {
  return storage.getString(KEYS.THEME) ?? 'system';
}

export function setTheme(theme: string): void {
  storage.set(KEYS.THEME, theme);
}

export function getLastScreen(): string | null {
  return storage.getString(KEYS.LAST_SCREEN) ?? null;
}

export function setLastScreen(screen: string): void {
  storage.set(KEYS.LAST_SCREEN, screen);
}

export function isOnboardingDone(): boolean {
  return storage.getBoolean(KEYS.ONBOARDING_DONE) ?? false;
}

export function setOnboardingDone(done: boolean): void {
  storage.set(KEYS.ONBOARDING_DONE, done);
}

export function getDailyCache(): string | null {
  return storage.getString(KEYS.DAILY_CACHE) ?? null;
}

export function setDailyCache(data: string): void {
  storage.set(KEYS.DAILY_CACHE, data);
}

export function getSettings(): Record<string, string> {
  const raw = storage.getString(KEYS.SETTINGS);
  return raw ? JSON.parse(raw) : {};
}

export function setSettings(settings: Record<string, string>): void {
  storage.set(KEYS.SETTINGS, JSON.stringify(settings));
}

export function clearAll(): void {
  storage.clearAll();
}
