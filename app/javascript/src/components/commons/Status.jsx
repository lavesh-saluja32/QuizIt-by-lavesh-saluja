import React from "react";

import { capitalize } from "@bigbinary/neeto-cist";
import classNames from "classnames";

const Status = ({ text }) => {
  const statusStyles = classNames(
    "px-2 py-1 rounded-full text-xs font-semibold",
    {
      "bg-blue-100 text-blue-600": text === "published",
      "bg-orange-100 text-orange-600": text === "draft",
      "bg-yellow-100 text-yellow-600": text === "incomplete",
      "bg-green-100 text-green-600": text === "completed",
    }
  );

  return <span className={statusStyles}>{capitalize(text)}</span>;
};

export default Status;
