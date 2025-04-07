import { create } from "zustand";

const useQuizSelectionStore = create(set => ({
  selectedRows: [],
  selectedRowKeys: [],

  setSelectedRows: rows => set({ selectedRows: rows }),
  setSelectedRowKeys: keys => set({ selectedRowKeys: keys }),

  clearSelections: () => set({ selectedRows: [], selectedRowKeys: [] }),
}));

export default useQuizSelectionStore;
