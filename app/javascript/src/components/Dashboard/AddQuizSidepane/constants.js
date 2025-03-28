import { t } from "i18next";
import * as yup from "yup";

export const QUIZ_VALIDATION_SCHEMA = yup.object().shape({
  name: yup.string().required(t("validation.required")),
});
