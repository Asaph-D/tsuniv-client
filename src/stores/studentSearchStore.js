import { create } from "zustand";

// Définition de l'état et des actions
export const useStudentSearchStore = create((set) => ({
  searchText: "",
  roomType: "Tous les types",
  priceRange: [8000, 150000],
  isCertified: false,
  sortOption: "Prix croissant",

  // État de la pagination
  currentPage: 1,
  itemsPerPage: 10, // Rendu configurable

  // Actions pour modifier l'état
  setSearchText: (text) => set({ searchText: text }),
  setRoomType: (type) => set({ roomType: type, currentPage: 1 }), // Réinitialise la page lors du changement de type
  setPriceRange: (range) => set({ priceRange: range, currentPage: 1 }),
  toggleCertified: () =>
    set((state) => ({ isCertified: !state.isCertified, currentPage: 1 })),
  setSortOption: (option) => set({ sortOption: option, currentPage: 1 }),

  // Actions pour la pagination
  setCurrentPage: (page) => set({ currentPage: page }),
}));
 