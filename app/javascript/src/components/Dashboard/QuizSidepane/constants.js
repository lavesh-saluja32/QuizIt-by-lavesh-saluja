import { t } from "i18next";
import * as yup from "yup";

export const QUIZ_VALIDATION_SCHEMA = yup.object().shape({
  name: yup.string().required(t("validation.required")),
  category: yup
    .object({
      label: yup.string().required(),
      value: yup.string().required(),
    })
    .required(t("validation.required"))
    .nullable(),
});

export const QUIZ_INITIAL_VALUES = {
  name: "",
  category: null,
};

export const DEFAULT_PAGE_SIZE = 8;
