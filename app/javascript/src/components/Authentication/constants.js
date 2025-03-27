import { t } from "i18next";
import * as yup from "yup";

export const SIGNUP_INITIAL_VALUES = {
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
};

export const LOGIN_INITIAL_VALUES = {
  email: "",
  password: "",
};

export const LOGIN_VALIDATION_SCHEMA = yup.object().shape({
  email: yup
    .string()
    .email(t("validation.EMAIL_INVALID"))
    .required(t("validation.REQUIRED")),
  password: yup
    .string()
    .min(6, t("validation.PASSWORD_MIN"))
    .required(t("validation.REQUIRED")),
});

export const SIGNUP_VALIDATION_SCHEMA = yup.object().shape({
  name: yup.string().required(t("validation.required")),
  email: yup
    .string()
    .email(t("validation.emailInvalid"))
    .required(t("validation.required")),
  password: yup
    .string()
    .min(6, t("validation.passwordMin"))
    .required(t("validation.required")),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], () => t("validation.passwordMismatch"))
    .required(t("validation.required")),
});
