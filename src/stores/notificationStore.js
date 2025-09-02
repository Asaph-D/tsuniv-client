import { create } from "zustand";
// Store Zustand pour les préférences de notification
export const useNotificationStore = create((set) => ({
  email: true,
  push: true,
  newsletter: false,
  priceAlerts: true,
  toggleNotification: (type) => set((state) => ({ [type]: !state[type] })),
}));
