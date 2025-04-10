import React from "react";

import { Typography } from "neetoui/index";
import { withTranslation } from "react-i18next";

const LeftBlock = ({ submissionsCount, t }) => (
  <Typography style="h3">
    {submissionsCount} {t("link.quiz.submissions")}
  </Typography>
);

export default withTranslation()(LeftBlock);
