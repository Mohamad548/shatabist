import { create } from "zustand";

interface StoreState {
  selectedItem: number | null;
  setSelectedItem: (item: number | null) => void;
}

export const useStore = create<StoreState>((set) => ({
  selectedItem: null,
  setSelectedItem: (item) => set({ selectedItem: item }),
}));
