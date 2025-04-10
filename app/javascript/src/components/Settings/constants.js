import * as yup from "yup";

export const VALIDATION_SCHEMA = yup.object({
  name: yup.string().required("Quiz site name is required"),
});
