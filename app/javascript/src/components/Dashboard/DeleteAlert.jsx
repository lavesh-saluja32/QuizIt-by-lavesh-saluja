import React from "react";

import { Alert } from "@bigbinary/neetoui";
import { Trans, useTranslation } from "react-i18next";

const DeleteAlert = ({
  handleDelete,
  isOpen,
  setIsOpen,
  quizName,
  isDeletePending,
  isDeleteAll,
  handleBulkDelete,
  setDeleteAllAlert,
  selectedRows,
}) => {
  const { t } = useTranslation();
  const title = isDeleteAll
    ? t("deleteAlert.bulkTitle")
    : t("deleteAlert.title");

  const message = isDeleteAll ? (
    <Trans
      components={{ span: <span className="font-semibold" /> }}
      values={{ count: selectedRows.length }}
      i18nKey={`deleteAlert.bulkMessage${
        selectedRows.length === 1 ? "One" : "Other"
      }`}
    />
  ) : (
    <Trans
      components={{ span: <span className="font-semibold" /> }}
      i18nKey="deleteAlert.message"
      values={{ name: quizName }}
    />
  );

  const onSubmit = isDeleteAll
    ? () => handleBulkDelete()
    : () => handleDelete();

  return (
    <Alert
      closeButton
      cancelButtonLabel={<Trans i18nKey="deleteAlert.cancel" />}
      isOpen={isOpen}
      isSubmitting={isDeletePending}
      message={message}
      submitButtonLabel={<Trans i18nKey="deleteAlert.delete" />}
      title={title}
      onSubmit={onSubmit}
      onClose={() => {
        setDeleteAllAlert(false);
        setIsOpen(null);
      }}
    />
  );
};

export default DeleteAlert;
