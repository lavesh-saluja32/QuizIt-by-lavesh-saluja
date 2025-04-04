import React from "react";

import { Typography } from "@bigbinary/neetoui";

const DraftStatus = ({ lastSavedAt, t }) => (
  <Typography className="text-xs text-gray-600" component="i">
    {t("button.draft", { date: lastSavedAt })}
  </Typography>
);

export default DraftStatus;
