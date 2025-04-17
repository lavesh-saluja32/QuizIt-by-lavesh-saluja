import * as yup from "yup";

export const getValidationSchema = t =>
  yup.object({
    name: yup.string().required(t("validation.required")),
  });
