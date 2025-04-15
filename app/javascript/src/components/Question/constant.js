import * as yup from "yup";

export const OPTION_VALUE = { text: "" };

export const QUESTION_INITIAL_VALUES = {
  question: "",
  options: [OPTION_VALUE, OPTION_VALUE],
};

export const MAX_OPTIONS = 6;
export const DEFAULT_CORRECT_OPTION = -1;

export const getQuestionFormValidationSchema = t =>
  yup.object().shape({
    question: yup.string().required(t("validation.questionRequired")),
    options: yup
      .array()
      .of(
        yup.object().shape({
          text: yup
            .string()
            .required(t("validation.optionRequired"))
            .min(1, t("validation.optionMin")),
        })
      )
      .min(2, t("validation.minOptions"))
      .max(MAX_OPTIONS, t("validation.maxOptions", { max: MAX_OPTIONS }))
      .test(
        "unique-options",
        t("validation.optionsMustBeUnique"),
        (options = []) => {
          const lowerCased = options.map(opt => opt.text?.toLowerCase().trim());

          return new Set(lowerCased).size === lowerCased.length;
        }
      )
      .test(
        "correct-option-selected",
        t("validation.correctOptionRequired"), // Add this key in your i18n file
        (options = []) => options.some(option => option.is_correct)
      ),
  });
