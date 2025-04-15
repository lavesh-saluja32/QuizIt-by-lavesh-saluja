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

export const getLoginValidationSchema = t =>
  yup.object().shape({
    email: yup
      .string()
      .email(t("validation.emailInvalid"))
      .required(t("validation.required")),
    password: yup.string().required(t("validation.required")),
  });

export const getSignupValidationSchema = t =>
  yup.object().shape({
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
      .oneOf([yup.ref("password"), null], t("validation.passwordMismatch"))
      .required(t("validation.required")),
  });
