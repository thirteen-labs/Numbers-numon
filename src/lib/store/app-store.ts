import { create } from 'zustand';

export type ThemeMode = 'light' | 'dark' | 'system' | ThemeName;
export type ThemeName = 'light' | 'dark' | 'amoled' | 'mystic' | 'cosmic' | 'emerald' | 'royal' | 'glass';

interface NotificationPrefs {
  dailyNumber: boolean;
  dailyAffirmation: boolean;
  goalReminders: boolean;
}

interface AppState {
  theme: ThemeMode;
  selectedThemeName: ThemeName;
  isOnboarded: boolean;
  currentProfileId: string | null;
  lastOpenedScreen: string | null;
  notificationPrefs: NotificationPrefs;
}

interface AppActions {
  setTheme: (theme: ThemeMode) => void;
  setSelectedThemeName: (name: ThemeName) => void;
  setOnboarded: (onboarded: boolean) => void;
  setCurrentProfileId: (id: string | null) => void;
  setLastOpenedScreen: (screen: string | null) => void;
  setNotificationPrefs: (prefs: Partial<NotificationPrefs>) => void;
  reset: () => void;
}

const initialState: AppState = {
  theme: 'system',
  selectedThemeName: 'dark',
  isOnboarded: false,
  currentProfileId: null,
  lastOpenedScreen: null,
  notificationPrefs: { dailyNumber: false, dailyAffirmation: false, goalReminders: false },
};

export const useAppStore = create<AppState & AppActions>((set) => ({
  ...initialState,
  setTheme: (theme) => set((state) => {
    // Keep selectedThemeName in sync when a concrete theme is chosen (e.g. 'mystic')
    const isCustom = theme !== 'system' && theme !== 'light' && theme !== 'dark';
    if (isCustom) {
      return { theme, selectedThemeName: theme as ThemeName };
    }
    return { theme };
  }),
  setSelectedThemeName: (selectedThemeName) => set({ selectedThemeName }),
  setOnboarded: (isOnboarded) => set({ isOnboarded }),
  setCurrentProfileId: (currentProfileId) => set({ currentProfileId }),
  setLastOpenedScreen: (lastOpenedScreen) => set({ lastOpenedScreen }),
  setNotificationPrefs: (prefs) =>
    set((state) => ({ notificationPrefs: { ...state.notificationPrefs, ...prefs } })),
  reset: () => set(initialState),
}));
