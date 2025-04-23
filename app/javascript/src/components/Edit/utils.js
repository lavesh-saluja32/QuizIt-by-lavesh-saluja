export const formatQuestionFormInitialValue = question => ({
  question: question.questionText,
  description: question.description,
  options: question.options?.map(option => ({
    text: option.optionText,
    is_correct: option.isCorrect,
  })),
});
