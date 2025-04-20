import React from "react";

import { withT } from "@bigbinary/neeto-commons-frontend/react-utils";
import {
  useCreateCategory,
  useShowCategory,
  useUpdateCategory,
} from "hooks/reactQuery/useCategories";
import { Form, Input } from "neetoui/formik";
import { Modal, Typography, Button } from "neetoui/index";

import { getAddValidationSchema } from "./constants";

const AddCategoryModal = ({
  isModalOpen,
  setIsModalOpen,
  t,
  editCategoryId,
  setEditCategoryId,
}) => {
  const handleClose = () => {
    setIsModalOpen(false);
    setEditCategoryId("");
  };

  const { mutate: createCategory, isPending: isCreatePending } =
    useCreateCategory();

  const { mutate: updateCategory, isPending: isUpdatePending } =
    useUpdateCategory();

  const { data: { data: category = {} } = {} } =
    useShowCategory(editCategoryId);

  const handleSubmit = values => {
    createCategory(values);
    handleClose();
  };

  const handleUpdate = values => {
    updateCategory({ categoryId: editCategoryId, payload: values });
    handleClose();
  };

  return (
    <Modal isOpen={isModalOpen || editCategoryId} onClose={handleClose}>
      <Modal.Header>
        <Typography style="h2">
          {t(`headers.${!editCategoryId ? "newCategory" : "editCategory"}`)}
        </Typography>
      </Modal.Header>
      <Form
        formikProps={{
          initialValues: { name: category?.name || "" },
          validationSchema: getAddValidationSchema(t),
          enableReinitialize: true,
          onSubmit: !editCategoryId ? handleSubmit : handleUpdate,
        }}
      >
        {({ dirty, isValid }) => (
          <>
            <Modal.Body>
              <Input
                label={t("labels.categoryTitle")}
                name="name"
                placeholder={t("placeholder.categoryTitle")}
              />
            </Modal.Body>
            <Modal.Footer className="space-x-2">
              <Button
                disabled={!(dirty && isValid)}
                label={t(`button.${!editCategoryId ? "add" : "save"}`)}
                loading={isCreatePending || isUpdatePending}
                type="submit"
              />
              <Button
                label={t("button.cancel")}
                style="text"
                onClick={handleClose}
              />
            </Modal.Footer>
          </>
        )}
      </Form>
    </Modal>
  );
};

export default withT(AddCategoryModal);
