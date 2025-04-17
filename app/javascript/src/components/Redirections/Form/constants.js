import * as yup from "yup";

export const initialValues = {
  from: "",
  to: "",
};

export const validationSchema = yup.object().shape({
  from: yup
    .string()
    .required("From URL is required")
    .url("Please enter a valid URL"),
  to: yup
    .string()
    .required("To URL is required")
    .url("Please enter a valid URL"),
});
