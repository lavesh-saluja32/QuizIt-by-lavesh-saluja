export const formatQuestionFormInitialValue = question => ({
  question: question.questionText,
  description: question.description,
  options: question.options?.map(option => ({
    text: option.optionText,
    isCorrect: option.isCorrect,
  })),
});
