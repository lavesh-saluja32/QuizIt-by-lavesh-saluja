export const formatPayload = (values, correctOption, previousOptions = []) => ({
  questionText: values.question,
  description: values.description,
  optionsAttributes: [
    ...previousOptions.map(option => ({
      id: option.id,
      _destroy: true,
    })),
    ...values.options.map((option, index) => ({
      optionText: option.text,
      isCorrect: index === correctOption,
    })),
  ],
});
