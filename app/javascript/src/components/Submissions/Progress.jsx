import React from "react";

import { ProgressBar, Typography, Modal } from "@bigbinary/neetoui";
import { withTranslation } from "react-i18next";

const Progress = ({ isLoading, progress, t }) => (
  <Modal closeButton={false} isOpen={isLoading}>
    <Modal.Header>
      <Typography style="h1">{t("quiz.download")}</Typography>
    </Modal.Header>
    <Modal.Body>
      <ProgressBar
        progressPercentage={progress}
        progressValue={`${progress}%`}
      />
    </Modal.Body>
  </Modal>
);

export default withTranslation()(Progress);
