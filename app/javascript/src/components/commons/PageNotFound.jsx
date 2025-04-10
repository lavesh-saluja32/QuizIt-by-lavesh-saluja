import React from "react";

import { NoData } from "neetoui";
import { withTranslation } from "react-i18next";

import { routes } from "../../routes";

const PageNotFound = ({ t }) => (
  <div className="flex h-screen w-full  items-center justify-center">
    <NoData
      title={t("response.error.pageNotFound")}
      primaryButtonProps={{
        label: t("button.home"),
        className: "bg-neutral-800 hover:bg-neutral-950",
        to: routes.public,
      }}
    />
  </div>
);

export default withTranslation()(PageNotFound);
