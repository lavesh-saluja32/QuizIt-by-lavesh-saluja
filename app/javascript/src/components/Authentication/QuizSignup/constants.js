import * as yup from "yup";

export const QUIZ_SIGNUP_FORM_INITIAL_VALUES = {
  firstName: "",
  lastName: "",
  email: "",
};

export const getQuizSignupFormValidationSchema = t =>
  yup.object().shape({
    firstName: yup
      .string()
      .required(t("validation.quizSignup.firstNameRequired"))
      .min(2, t("validation.quizSignup.firstNameMin")),
    lastName: yup
      .string()
      .required(t("validation.quizSignup.lastNameRequired"))
      .min(2, t("validation.quizSignup.lastNameMin")),
    email: yup
      .string()
      .required(t("validation.quizSignup.emailRequired"))
      .email(t("validation.quizSignup.emailInvalid")),
  });
