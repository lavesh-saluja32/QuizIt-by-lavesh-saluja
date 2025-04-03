export const formatPayload = (values, correctOption, previousOptions = []) => ({
  question_text: values.question,
  options_attributes: [
    ...previousOptions.map(option => ({
      id: option.id,
      _destroy: true,
    })),
    ...values.options.map((option, index) => ({
      option_text: option.text,
      is_correct: index === correctOption,
    })),
  ],
});
