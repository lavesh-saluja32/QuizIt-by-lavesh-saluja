import { create } from "zustand";
import { persist } from "zustand/middleware";

const useQuizStore = create(
  persist(
    set => ({
      selectedAnswers: {},
      questionNumber: 0,
      setSelectedAnswer: (questionId, optionId) =>
        set(state => {
          const updatedAnswers = { ...state.selectedAnswers };

          if (optionId === null) {
            delete updatedAnswers[questionId];
          } else {
            updatedAnswers[questionId] = optionId;
          }

          return { selectedAnswers: updatedAnswers };
        }),
      setQuestionNumber: number => set({ questionNumber: number }),
      resetQuiz: () =>
        set({
          selectedAnswers: {},
          questionNumber: 0,
        }),
    }),
    {
      name: "quiz-progress-storage",
    }
  )
);

export default useQuizStore;
