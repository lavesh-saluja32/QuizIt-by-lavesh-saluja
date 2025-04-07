import * as yup from "yup";

export const QUIZ_SIGNUP_FORM_INITIAL_VALUES = {
  firstName: "",
  lastName: "",
  email: "",
};
export const QUIZ_SIGNUP_FORM_VALIDATION_SCHEMA = yup.object().shape({
  firstName: yup
    .string()
    .required("First name is required")
    .min(2, "First name should be at least 2 characters"),

  lastName: yup
    .string()
    .required("Last name is required")
    .min(2, "Last name should be at least 2 characters"),

  email: yup
    .string()
    .required("Email is required")
    .email("Must be a valid email"),
});
