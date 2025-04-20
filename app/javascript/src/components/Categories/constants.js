// constants.js
import * as yup from "yup";

export const INITIAL_VALUES = {
  name: "",
};

export const getAddValidationSchema = t =>
  yup.object({
    name: yup.string().required(t("validation.required")),
  });

export const DELETE_FORM_INITIAL_VALUES = {
  category: {},
};

export const getDeleteValidationSchema = t =>
  yup.object().shape({
    category: yup.object().required(t("validation.required")),
  });
