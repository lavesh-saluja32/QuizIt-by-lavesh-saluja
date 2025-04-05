import { create } from "zustand";

const defaultColumns = {
  name: true,
  submissions: true,
  createdAt: true,
  status: true,
  category: true,
};

const useColumnStore = create(set => ({
  visibleColumns: defaultColumns,
  setVisibleColumn: newColumn =>
    set(({ visibleColumns }) => ({
      visibleColumns: {
        ...visibleColumns,
        [newColumn]: !visibleColumns[newColumn],
      },
    })),
}));

export default useColumnStore;
