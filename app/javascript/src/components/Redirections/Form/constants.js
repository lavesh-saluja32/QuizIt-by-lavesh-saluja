import * as yup from "yup";

export const DOMAIN = "http://localhost:3000";

export const initialValues = {
  from: "",
  to: "",
};

export const getValidationSchema = t =>
  yup.object().shape({
    from: yup.string().required(t("validation.required")),

    to: yup.string().required(t("validation.required")),
  });
