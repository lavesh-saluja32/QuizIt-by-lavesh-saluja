import { routes } from "routes";
import * as yup from "yup";

export const DOMAIN = "http://localhost:3000";

export const initialValues = {
  from: "",
  to: "",
};

export const getValidationSchema = t =>
  yup.object().shape({
    from: yup
      .string()
      .required(t("validation.required"))
      .test("not-admin-or-redirections", t("validation.url"), value => {
        if (!value) return true;

        return (
          !value.includes(routes.admin) &&
          !value.includes(routes.settings.redirection)
        );
      }),
    to: yup.string().required(t("validation.required")),
  });
