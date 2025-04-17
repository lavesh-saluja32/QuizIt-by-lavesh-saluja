import React, { useState } from "react";

import { withT } from "@bigbinary/neeto-commons-frontend/react-utils";
import { Plus } from "neetoicons";
import { Typography, Button } from "neetoui";
import { Form as NeetoForm } from "neetoui/formik";

import { initialValues, validationSchema } from "./constants";
import Inputs from "./Inputs";

const Form = ({ t }) => {
  const [data, setData] = useState(sampleData);
  const handleSubmit = values => {
    logger.info(values);
  };

  return (
    <div className="w-full pl-20">
      <div className="mt-6 flex w-full items-center justify-stretch">
        <Typography>{t("subheader.settings.from")}</Typography>
        <Typography>{t("subheader.settings.to")}</Typography>
      </div>
      <div className="flex flex-col space-y-3">
        {data.map(({ from, to }, index) => (
          <NeetoForm
            key={index}
            formikProps={{
              initialValues: { from, to },
              validationSchema,
              onSubmit: handleSubmit,
            }}
          >
            {({ dirty, isValid }) => <Inputs disabled={!dirty || !isValid} />}
          </NeetoForm>
        ))}
      </div>
      <Button
        className="mt-6"
        icon={Plus}
        iconPosition="left"
        label={t("button.addRedirection")}
        style="link"
        onClick={() => setData(prev => [...prev, initialValues])}
      />
    </div>
  );
};

const sampleData = [
  {
    from: "https://oldsite.com/page-1",
    to: "https://newsite.com/page-1",
  },
  {
    from: "https://oldsite.com/blog",
    to: "https://newsite.com/articles",
  },
  {
    from: "https://oldsite.com/contact",
    to: "https://newsite.com/support",
  },
];

export default withT(Form);
