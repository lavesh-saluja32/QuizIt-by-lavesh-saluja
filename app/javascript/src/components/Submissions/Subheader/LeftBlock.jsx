import React from "react";

import { Typography } from "neetoui/index";
import { withTranslation } from "react-i18next";

const LeftBlock = ({ submissionsCount, t }) => (
  <Typography style="h3">
    {t(
      `link.quiz.${
        submissionsCount <= 1 ? "submissionsOne" : "submissionsMany"
      }`,
      { count: submissionsCount }
    )}
  </Typography>
);

export default withTranslation()(LeftBlock);
