import { create } from 'zustand';
import type { Profile } from '@/lib/schema';

interface ProfileState {
  profiles: Profile[];
  loading: boolean;
}

interface ProfileActions {
  setProfiles: (profiles: Profile[]) => void;
  addProfile: (profile: Profile) => void;
  updateProfile: (id: string, updates: Partial<Profile>) => void;
  removeProfile: (id: string) => void;
  setLoading: (loading: boolean) => void;
  getProfile: (id: string) => Profile | undefined;
}

export const useProfileStore = create<ProfileState & ProfileActions>((set, get) => ({
  profiles: [],
  loading: false,
  setProfiles: (profiles) => set({ profiles }),
  addProfile: (profile) => set((state) => ({ profiles: [...state.profiles, profile] })),
  updateProfile: (id, updates) =>
    set((state) => ({
      profiles: state.profiles.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    })),
  removeProfile: (id) =>
    set((state) => ({
      profiles: state.profiles.filter((p) => p.id !== id),
    })),
  setLoading: (loading) => set({ loading }),
  getProfile: (id) => get().profiles.find((p) => p.id === id),
}));
