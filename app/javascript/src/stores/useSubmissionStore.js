import { create } from "zustand";
import { persist } from "zustand/middleware";

const useSubmissionStore = create(
  persist(
    set => ({
      submissionId: null,
      setSubmissionId: id => set({ submissionId: id }),
      clearSubmissionId: () => set({ submissionId: null }),
    }),
    {
      name: "submission-storage", // key in localStorage
    }
  )
);

export default useSubmissionStore;
