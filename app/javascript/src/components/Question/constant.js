import { t } from "i18next";
import * as yup from "yup";

export const OPTION_VALUE = { text: "" };

export const QUESTION_INITIAL_VALUES = {
  question: "",
  options: [OPTION_VALUE, OPTION_VALUE],
};

export const MAX_OPTIONS = 6;

export const QUESTION_VALIDATION_SCHEMA = yup.object({
  question: yup.string().required(t("validation.questionRequired")),
  options: yup
    .array()
    .of(
      yup.object().shape({
        text: yup
          .string()
          .required("Option is required")
          .min(1, t("validation.optionMin")),
      })
    )
    .min(2, t("validation.minOptions"))
    .max(MAX_OPTIONS, t("validation.maxOptions", { max: MAX_OPTIONS })),
});

export const DEFAULT_CORRECT_OPTION = -1;
