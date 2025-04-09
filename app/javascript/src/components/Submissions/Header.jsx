import React from "react";

import NeetoHeader from "@bigbinary/neeto-molecules/Header";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t } = useTranslation();

  return (
    <NeetoHeader
      className="bg-slate-100"
      title={t("headers.submissions")}
      searchProps={{
        placeholder: t("placeholder.searchNames"),
        searchParamName: "search",
      }}
    />
  );
};

export default Header;
