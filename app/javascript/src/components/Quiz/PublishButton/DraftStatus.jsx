import React from "react";

import { withT } from "@bigbinary/neeto-commons-frontend/react-utils";
import { Typography } from "@bigbinary/neetoui";

const DraftStatus = ({ lastSavedAt, t }) => (
  <Typography className="text-xs text-gray-600" component="i">
    {t("button.draft", { date: lastSavedAt })}
  </Typography>
);

export default withT(DraftStatus);
