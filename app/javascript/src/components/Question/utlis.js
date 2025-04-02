export const formatPayload = (values, correctOption) => ({
  question_text: values.question,
  options_attributes: values.options.map((option, index) => ({
    option_text: option.text,
    is_correct: index === correctOption,
  })),
});
