import React from "react";

import { capitalize } from "@bigbinary/neeto-cist";
import classNames from "classnames";
import { useTranslation } from "react-i18next";

const Status = ({ text }) => {
  const { t } = useTranslation();

  const statusStyles = classNames(
    "px-2 py-1 rounded-full text-xs font-semibold",
    {
      "bg-blue-100 text-blue-600": text === t("quiz.published"),
      "bg-orange-100 text-orange-600": text === t("quiz.draft"),
    }
  );

  return <span className={statusStyles}>{capitalize(text)}</span>;
};

export default Status;
