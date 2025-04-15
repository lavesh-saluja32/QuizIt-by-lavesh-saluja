import React from "react";

import { Button } from "@bigbinary/neetoui";
import { Form, Input } from "@bigbinary/neetoui/formik";
import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { routes } from "../../../routes";
import { LOGIN_INITIAL_VALUES, getLoginValidationSchema } from "../constants";

const Login = ({ handleSubmit, loading, t }) => (
  <div className="flex h-screen w-screen items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
    <div className="w-full max-w-md">
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-700">
        {t("auth.loginTitle")}
      </h2>
      <div className="text-center">
        <Link
          to={routes.authentication.signup}
          className="mt-2 text-sm font-medium text-blue-300 transition duration-150 ease-in-out
              ease-in-out focus:underline focus:outline-none "
        >
          {t("auth.orSignup")}
        </Link>
      </div>
      <Form
        formikProps={{
          initialValues: LOGIN_INITIAL_VALUES,
          validationSchema: getLoginValidationSchema(t),
          onSubmit: handleSubmit,
        }}
      >
        {({ isValid, dirty }) => (
          <div className="mt-8 flex flex-col gap-y-6">
            <Input
              required
              label={t("auth.email")}
              name="email"
              placeholder={t("auth.placeholders.email")}
              type="email"
            />
            <Input
              required
              label={t("auth.password")}
              name="password"
              placeholder={t("auth.placeholders.password")}
              type="password"
            />
            <Button
              disabled={!isValid || !dirty}
              label={t("button.login")}
              loading={loading}
              type="submit"
            />
          </div>
        )}
      </Form>
    </div>
  </div>
);

export default withTranslation()(Login);
