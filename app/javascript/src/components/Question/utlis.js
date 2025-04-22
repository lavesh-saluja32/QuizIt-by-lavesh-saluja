export const formatPayload = (values, correctOption, previousOptions = []) => ({
  question_text: values.question,
  description: values.description,
  options_attributes: [
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
