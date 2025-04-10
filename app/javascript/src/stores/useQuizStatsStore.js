import { create } from "zustand";

const useQuizStatsStore = create(set => ({
  statusCounts: { draft: 0, published: 0 },

  setStatusCounts: counts => set({ statusCounts: counts }),

  clearStatusCounts: () => set({ statusCounts: {} }),
}));

export default useQuizStatsStore;
