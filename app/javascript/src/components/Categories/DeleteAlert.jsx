import React from "react";

import { withT } from "@bigbinary/neeto-commons-frontend/react-utils";
import { Info } from "@bigbinary/neeto-icons";
import {
  useFetchCategories,
  useDeleteCategory,
} from "hooks/reactQuery/useCategories";
import { Modal, Button, Typography, Callout } from "neetoui";
import { Form, Select } from "neetoui/formik";
import { Trans } from "react-i18next";

import {
  DELETE_FORM_INITIAL_VALUES,
  getDeleteValidationSchema,
} from "./constants";

const DeleteAlert = ({
  name,
  id,
  quizzesCount,
  isDeleteAlertOpen,
  setIsDeleteAlertOpen,
  t,
}) => {
  const { data: { data: categories = [] } = {} } = useFetchCategories();

  const { mutate: deleteCategory, isPending } = useDeleteCategory();

  const handleSubmit = async ({ category: { value = "" } }) => {
    deleteCategory({ categoryId: id, newCategoryId: value });
  };

  return (
    <Modal
      className="h-fit"
      isOpen={isDeleteAlertOpen}
      size="large"
      onClose={() => setIsDeleteAlertOpen(false)}
    >
      <Modal.Header>
        <Typography style="h2">{t("headers.deleteCategory")}</Typography>
      </Modal.Header>
      <Form
        formikProps={{
          initialValues: DELETE_FORM_INITIAL_VALUES,
          validationSchema: getDeleteValidationSchema(t),
          onSubmit: handleSubmit,
        }}
      >
        <>
          <Modal.Body>
            <Typography>
              <Trans
                component={{ strong: <strong /> }}
                i18nKey="deleteAlert.categoryDeleteSubheader"
                values={{ name }}
              />
            </Typography>
            <Callout style="danger">{t("deleteAlert.categoryGeneral")}</Callout>
            {quizzesCount > 0 && name !== "General" && (
              <div className="mt-4 flex items-center justify-center space-x-5 rounded-lg bg-red-100 p-5">
                <Info color="red" size={30} />
                <Typography className="text-red-500">
                  {categories.length <= 1 ? (
                    <Trans
                      component={{ strong: <strong /> }}
                      i18nKey="deleteAlert.lastCategoryAlert"
                      values={{ name }}
                    />
                  ) : (
                    <Trans
                      component={{ strong: <strong /> }}
                      values={{ name, count: quizzesCount }}
                      i18nKey={`deleteAlert.${
                        quizzesCount <= 1
                          ? "categoryDeleteAlertOne"
                          : "categoryDeleteAlertOther"
                      }`}
                    />
                  )}
                </Typography>
              </div>
            )}
            {categories.length > 1 &&
              quizzesCount > 0 &&
              name !== "General" && (
                <Select
                  required
                  className="mt-5"
                  label={t("labels.categorySelect")}
                  name="category"
                  options={categories
                    .filter(({ id: catId }) => catId !== id)
                    .map(({ id, name }) => ({
                      label: name,
                      value: id,
                    }))}
                />
              )}
          </Modal.Body>
          {name !== "General" && (
            <Modal.Footer className="float-left space-x-2">
              <Button
                label={t("button.proceed")}
                loading={isPending}
                style="danger"
                type="submit"
              />
              <Button
                label={t("button.cancel")}
                style="text"
                onClick={() => setIsDeleteAlertOpen(false)}
              />
            </Modal.Footer>
          )}
        </>
      </Form>
    </Modal>
  );
};

export default withT(DeleteAlert);
