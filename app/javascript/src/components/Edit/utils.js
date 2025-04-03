export const formatQuestionFormInitialValue = question => ({
  question: question.questionText,
  options: question.options?.map(option => ({ text: option.optionText })),
});
