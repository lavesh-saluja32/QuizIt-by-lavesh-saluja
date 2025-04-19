import React, { useEffect, useState } from "react";

import { withT } from "@bigbinary/neeto-commons-frontend/react-utils";
import PageLoader from "components/commons/PageLoader";
import {
  useCreateRedirection,
  useDeleteRedirection,
  useFetchRedirections,
  useUpdateRedirection,
} from "hooks/reactQuery/useRedirections";
import { Plus } from "neetoicons";
import { Typography, Button } from "neetoui";
import { Form as NeetoForm } from "neetoui/formik";

import { initialValues, getValidationSchema } from "./constants";
import Inputs from "./Inputs";

import { getToUrl } from "../utils";

const Form = ({ t }) => {
  const [data, setData] = useState([]);
  const [isAddRedirectionActive, setIsAddRedirectionActive] = useState(true);

  const {
    data: { data: redirections = [] } = {},
    isLoading: isRedirectionsLoading,
  } = useFetchRedirections();

  const { mutate: createRedirection, isPending } = useCreateRedirection();

  const { mutate: updateRedirection } = useUpdateRedirection();

  const { mutate: deleteRedirection } = useDeleteRedirection();

  const handleSubmit = values => {
    const { fullUrl } = getToUrl(values.to);
    createRedirection(
      {
        ...values,
        to: fullUrl || values.to, // use preview URL if valid, else fallback
      },
      {
        onSuccess: () => setIsAddRedirectionActive(true),
      }
    );
  };

  const handleEdit = (redirectionId, values) => {
    const { fullUrl } = getToUrl(values.to);
    updateRedirection({
      redirectionId,
      payload: {
        ...values,
        to: fullUrl || values.to,
      },
    });
  };

  const handleDelete = redirectionId => {
    deleteRedirection(redirectionId);
  };

  useEffect(() => {
    setData(redirections);
  }, [redirections]);

  if (isRedirectionsLoading) return <PageLoader />;

  return (
    <div className="w-full pl-20">
      <div className="mt-6 flex w-full items-center justify-stretch">
        <Typography>{t("subheader.settings.from")}</Typography>
        <Typography>{t("subheader.settings.to")}</Typography>
      </div>
      <div className="flex flex-col space-y-3">
        {data.map(({ from, to, id }, index) => (
          <NeetoForm
            key={index}
            formikProps={{
              initialValues: { from, to },
              validationSchema: getValidationSchema(t),
              onSubmit: handleSubmit,
            }}
          >
            {({ dirty, isValid }) => (
              <Inputs
                disabled={!dirty || !isValid}
                {...{
                  id,
                  isPending,
                  handleEdit,
                  handleDelete,
                  handleRemove: () =>
                    setData(previousData =>
                      previousData.slice(0, previousData.length - 1)
                    ),
                }}
              />
            )}
          </NeetoForm>
        ))}
      </div>
      <Button
        className="mt-6"
        disabled={!isAddRedirectionActive}
        icon={Plus}
        iconPosition="left"
        label={t("button.addRedirection")}
        style="link"
        onClick={() => {
          setData(prev => [...prev, initialValues]);
          setIsAddRedirectionActive(false);
        }}
      />
    </div>
  );
};

export default withT(Form);
