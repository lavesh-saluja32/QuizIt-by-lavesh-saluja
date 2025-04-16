import React from "react";

import { withT } from "@bigbinary/neeto-commons-frontend/react-utils";
import { NoData } from "neetoui";
import { routes } from "routes";

const PageNotFound = ({ t }) => (
  <div className="flex h-screen w-full  items-center justify-center">
    <NoData
      title={t("response.error.pageNotFound")}
      primaryButtonProps={{
        label: t("button.home"),
        className: "bg-neutral-800 hover:bg-neutral-950",
        to: routes.root,
      }}
    />
  </div>
);

export default withT(PageNotFound);
