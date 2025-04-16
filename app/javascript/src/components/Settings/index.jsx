import React from "react";

import {
  useShowOrganization,
  useUpdateOrganization,
} from "hooks/reactQuery/useOrganizations";
import { Button, Typography } from "neetoui";
import { Form, Input } from "neetoui/formik";
import { useTranslation } from "react-i18next";

import { getValidationSchema } from "./constants";

const Settings = () => {
  const { t } = useTranslation();

  const { data: { data: organization = {} } = {} } = useShowOrganization();

  const { mutate: updateOrganization } = useUpdateOrganization();

  const handleSubmit = values => {
    updateOrganization({ name: values.name });
  };

  return (
    <div className="flex h-1/2 w-1/2 items-center justify-center">
      <div className="m-auto w-1/2 space-y-16">
        <div>
          <Typography style="h1">{t("button.settings")}</Typography>
          <Typography style="body3">{t("quiz.placeholder")}</Typography>
        </div>
        <Form
          formikProps={{
            initialValues: { name: organization.name },
            enableReinitialize: true,
            validationSchema: getValidationSchema(t),
            onSubmit: handleSubmit,
          }}
        >
          {({ dirty }) => (
            <>
              <Input
                required
                label={t("auth.name")}
                name="name"
                placeholder={t("placeholder.name")}
                type="text"
              />
              <div className="mt-4 flex gap-2">
                <Button
                  className="bg-blue-600"
                  disabled={!dirty}
                  label={t("button.save")}
                  type="submit"
                />
                <Button
                  className="bg-gray-200 text-black"
                  label={t("button.cancel")}
                  type="reset"
                />
              </div>
            </>
          )}
        </Form>
      </div>
    </div>
  );
};

export default Settings;
