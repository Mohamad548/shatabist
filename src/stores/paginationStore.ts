// src/stores/paginationStore.ts
import { create } from "zustand";

interface PaginationStore {
  offset: number;
  limit: number;
  setOffset: (offset: number) => void;
  setLimit: (limit: number) => void;
}

export const usePaginationStore = create<PaginationStore>((set) => ({
  offset: 0,
  limit: 12,
  setOffset: (offset) => set({ offset }),
  setLimit: (limit) => set({ limit }),
}));
