import { create } from "zustand";

const defaultColumns = {
  name: true,
  email: true,
  submissionDate: true,
  correctAnswers: true,
  wrongAnswers: true,
  unanswered: true,
  questions: true,
  status: true,
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
