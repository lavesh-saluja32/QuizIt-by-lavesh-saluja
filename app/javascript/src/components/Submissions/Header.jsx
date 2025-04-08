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
        onChange: () => {},
        value: "",
        placeholder: t("placeholder.searchNames"),
      }}
    />
  );
};

export default Header;
