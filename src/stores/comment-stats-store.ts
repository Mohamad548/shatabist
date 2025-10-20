// stores/commentStatsStore.ts
import { create } from "zustand";

interface CommentStatsState {
  averageRate: number;
  imageIds: number[];
  totalComments: number;
  setStats: (data: {
    averageRate: number;
    imageIds: number[];
    totalComments: number;
  }) => void;
}

export const useCommentStatsStore = create<CommentStatsState>((set) => ({
  averageRate: 0,
  imageIds: [],
  totalComments: 0,
  setStats: ({ averageRate, imageIds, totalComments }) =>
    set({ averageRate, imageIds, totalComments }),
}));
