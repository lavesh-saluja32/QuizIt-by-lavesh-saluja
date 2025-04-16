import React from "react";

import { withT } from "@bigbinary/neeto-commons-frontend/react-utils";
import NeetoHeader from "@bigbinary/neeto-molecules/Header";

const Header = ({ t }) => (
  <NeetoHeader
    className="bg-slate-100"
    title={t("headers.submissions")}
    searchProps={{
      placeholder: t("placeholder.searchNames"),
      searchParamName: "search",
    }}
  />
);

export default withT(Header);
