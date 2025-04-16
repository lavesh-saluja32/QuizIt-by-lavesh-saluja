import React from "react";

import { withT } from "@bigbinary/neeto-commons-frontend/react-utils";
import { ProgressBar, Typography, Modal } from "@bigbinary/neetoui";

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

export default withT(Progress);
