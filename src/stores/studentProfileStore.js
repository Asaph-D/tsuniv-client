// @stores/profileStore.js
import { create } from "zustand";

export const useProfileStore = create((set) => ({
  profile: null,
  setProfile: (data) => set({ profile: data }),
  resetProfile: () => set({ profile: null }),
}));
