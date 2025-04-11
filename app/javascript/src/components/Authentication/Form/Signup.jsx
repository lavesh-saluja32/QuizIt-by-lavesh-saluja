import React from "react";

import { Button } from "@bigbinary/neetoui";
import { Form, Input } from "@bigbinary/neetoui/formik";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { routes } from "../../../routes";
import { SIGNUP_INITIAL_VALUES, SIGNUP_VALIDATION_SCHEMA } from "../constants";

const Signup = ({ handleSubmit, loading }) => {
  const { t } = useTranslation();

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-700">
          {t("auth.signupTitle")}
        </h2>
        <div className="text-center">
          <Link
            to={routes.authentication.login}
            className="text-bb-purple mt-2 text-sm font-medium text-blue-300 transition duration-150 ease-in-out
              focus:underline focus:outline-none"
          >
            {t("auth.orLogin")}
          </Link>
        </div>
        <Form
          formikProps={{
            initialValues: SIGNUP_INITIAL_VALUES,
            validationSchema: SIGNUP_VALIDATION_SCHEMA,
            onSubmit: handleSubmit,
          }}
        >
          {({ isValid, dirty }) => (
            <div className="mt-8 flex flex-col gap-y-6">
              <Input
                required
                label={t("auth.name")}
                name="name"
                placeholder={t("auth.placeholders.name")}
              />
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
              <Input
                required
                label={t("auth.passwordConfirmation")}
                name="password_confirmation"
                placeholder={t("auth.placeholders.passwordConfirmation")}
                type="password"
              />
              <Button
                disabled={!isValid || !dirty}
                label={t("button.register")}
                loading={loading}
                type="submit"
              />
            </div>
          )}
        </Form>
      </div>
    </div>
  );
};

export default Signup;
