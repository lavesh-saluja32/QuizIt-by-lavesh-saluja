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
import { Typography, Button, NoData } from "neetoui";
import { Form as NeetoForm } from "neetoui/formik";

import { initialValues, getValidationSchema } from "./constants";
import Inputs from "./Inputs";

import { checkCyclicError, getToUrl } from "../utils";

const Form = ({ t }) => {
  const [data, setData] = useState([]);
  const [isCyclicError, setIsCyclicError] = useState(false);
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
    const newEntry = {
      ...values,
      to: fullUrl || values.to,
    };

    if (checkCyclicError(data, newEntry)) {
      setIsCyclicError(true);

      return;
    }

    createRedirection(newEntry, {
      onSuccess: () => setIsAddRedirectionActive(true),
    });
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

  const handleRemoveEntry = () => {
    setData(previousData => previousData.slice(0, previousData.length - 1));
    setIsCyclicError(false);
  };

  useEffect(() => {
    setData(redirections);
  }, [redirections]);

  if (isRedirectionsLoading) return <PageLoader />;

  return (
    <div className="w-full pl-20">
      {data.length === 0 ? (
        <NoData
          subtitle={t("emptyState.redirections.subtitle")}
          title={t("emptyState.redirections.title")}
          primaryButtonProps={{
            label: t("button.addRedirection"),
            style: "link",
            icon: Plus,
            iconPosition: "left",
            onClick: () => {
              setData(prev => [...prev, initialValues]);
              setIsAddRedirectionActive(false);
            },
          }}
        />
      ) : (
        <>
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
                      handleRemove: handleRemoveEntry,
                    }}
                  />
                )}
              </NeetoForm>
            ))}
          </div>
          {isCyclicError && (
            <Typography className="mt-1 text-sm text-red-500">
              {t("validation.cycle")}
            </Typography>
          )}
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
        </>
      )}
    </div>
  );
};

export default withT(Form);
