import { createMMKV } from 'react-native-mmkv';

let storageInstance: ReturnType<typeof createMMKV> | null = null;
const memoryFallback = new Map<string, string | boolean>();
let mmkvFailed = false;

try {
  storageInstance = createMMKV({ id: 'numon-storage' });
} catch (e) {
  console.warn('[Storage] MMKV init failed, using memory fallback', e);
  mmkvFailed = true;
}

function getStorage() {
  if (!mmkvFailed && storageInstance) return storageInstance;
  return null;
}

export const storage: ReturnType<typeof createMMKV> = (getStorage() as unknown as ReturnType<typeof createMMKV>) ?? ({
  getString: (k: string) => (memoryFallback.get(k) as string | undefined),
  set: (k: string, v: string | boolean) => { memoryFallback.set(k, v); },
  getBoolean: (k: string) => (memoryFallback.get(k) as boolean | undefined),
  delete: (k: string) => { memoryFallback.delete(k); },
  clearAll: () => { memoryFallback.clear(); },
} as unknown as ReturnType<typeof createMMKV>);

const KEYS = {
  THEME: 'theme',
  LAST_SCREEN: 'last_screen',
  ONBOARDING_DONE: 'onboarding_done',
  DAILY_CACHE: 'daily_cache',
  SETTINGS: 'settings',
} as const;

export function getTheme(): string {
  try { return getStorage()?.getString(KEYS.THEME) ?? (memoryFallback.get(KEYS.THEME) as string | undefined) ?? 'system'; } catch { return (memoryFallback.get(KEYS.THEME) as string | undefined) ?? 'system'; }
}

export function setTheme(theme: string): void {
  try { const s = getStorage(); if (s) s.set(KEYS.THEME, theme); else memoryFallback.set(KEYS.THEME, theme); } catch (e) { console.warn('[Storage] setTheme failed', e); memoryFallback.set(KEYS.THEME, theme); }
}

export function getLastScreen(): string | null {
  try { return getStorage()?.getString(KEYS.LAST_SCREEN) ?? (memoryFallback.get(KEYS.LAST_SCREEN) as string | undefined) ?? null; } catch { return (memoryFallback.get(KEYS.LAST_SCREEN) as string | undefined) ?? null; }
}

export function setLastScreen(screen: string): void {
  try { const s = getStorage(); if (s) s.set(KEYS.LAST_SCREEN, screen); else memoryFallback.set(KEYS.LAST_SCREEN, screen); } catch (e) { console.warn('[Storage] setLastScreen failed', e); memoryFallback.set(KEYS.LAST_SCREEN, screen); }
}

export function isOnboardingDone(): boolean {
  try { return getStorage()?.getBoolean(KEYS.ONBOARDING_DONE) ?? (memoryFallback.get(KEYS.ONBOARDING_DONE) as boolean | undefined) ?? false; } catch { return (memoryFallback.get(KEYS.ONBOARDING_DONE) as boolean | undefined) ?? false; }
}

export function setOnboardingDone(done: boolean): void {
  try { const s = getStorage(); if (s) s.set(KEYS.ONBOARDING_DONE, done); else memoryFallback.set(KEYS.ONBOARDING_DONE, done); } catch (e) { console.warn('[Storage] setOnboardingDone failed', e); memoryFallback.set(KEYS.ONBOARDING_DONE, done); }
}

export function getDailyCache(): string | null {
  try { return getStorage()?.getString(KEYS.DAILY_CACHE) ?? (memoryFallback.get(KEYS.DAILY_CACHE) as string | undefined) ?? null; } catch { return (memoryFallback.get(KEYS.DAILY_CACHE) as string | undefined) ?? null; }
}

export function setDailyCache(data: string): void {
  try { const s = getStorage(); if (s) s.set(KEYS.DAILY_CACHE, data); else memoryFallback.set(KEYS.DAILY_CACHE, data); } catch (e) { console.warn('[Storage] setDailyCache failed', e); memoryFallback.set(KEYS.DAILY_CACHE, data); }
}

export function getSettings(): Record<string, string> {
  try {
    const raw = getStorage()?.getString(KEYS.SETTINGS) ?? (memoryFallback.get(KEYS.SETTINGS) as string | undefined);
    return raw ? JSON.parse(raw) : {};
  } catch { return {}; }
}

export function setSettings(settings: Record<string, string>): void {
  try { const s = getStorage(); const v = JSON.stringify(settings); if (s) s.set(KEYS.SETTINGS, v); else memoryFallback.set(KEYS.SETTINGS, v); } catch (e) { console.warn('[Storage] setSettings failed', e); }
}

export function clearAll(): void {
  try { const s = getStorage(); if (s) s.clearAll(); memoryFallback.clear(); } catch (e) { console.warn('[Storage] clearAll failed', e); memoryFallback.clear(); }
}
