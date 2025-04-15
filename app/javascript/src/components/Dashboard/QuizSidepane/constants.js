import * as yup from "yup";

export const getQuizFormValidationSchema = t =>
  yup.object().shape({
    name: yup.string().required(t("validation.required")),
    category: yup
      .object({
        label: yup.string().required(),
        value: yup.string().required(),
      })
      .nullable()
      .required(t("validation.required")),
  });

export const QUIZ_INITIAL_VALUES = {
  name: "",
  category: null,
};

export const DEFAULT_PAGE_SIZE = 8;
export const DEFAULT_PAGE = 1;
