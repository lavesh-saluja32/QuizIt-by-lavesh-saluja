import React from "react";

import { withT } from "@bigbinary/neeto-commons-frontend/react-utils";
import { Typography } from "neetoui/index";

const Header = ({ t }) => (
  <div className="h-[20vh] w-full p-20">
    <Typography style="h1">{t("headers.settings.redirections")}</Typography>
    <Typography style="body2">
      {t("subheader.settings.redirections")}
    </Typography>
  </div>
);

export default withT(Header);
