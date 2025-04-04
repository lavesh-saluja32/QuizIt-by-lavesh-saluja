import React from "react";

import { Alert } from "@bigbinary/neetoui";
import { Trans } from "react-i18next";

const DeleteAlert = ({
  quizId,
  handleDelete,
  isOpen,
  setIsOpen,
  quizName,
  isDeletePending,
}) => (
  <Alert
    closeButton
    {...{ isOpen }}
    cancelButtonLabel={<Trans i18nKey="deleteAlert.cancel" />}
    isSubmitting={isDeletePending}
    submitButtonLabel={<Trans i18nKey="deleteAlert.delete" />}
    title={<Trans i18nKey="deleteAlert.title" />}
    message={
      <Trans
        components={{ span: <span className="font-semibold" />, br: <br /> }}
        i18nKey="deleteAlert.message"
        values={{ name: quizName }}
      />
    }
    onClose={() => setIsOpen(false)}
    onSubmit={() => handleDelete(quizId)}
  />
);
export default DeleteAlert;
