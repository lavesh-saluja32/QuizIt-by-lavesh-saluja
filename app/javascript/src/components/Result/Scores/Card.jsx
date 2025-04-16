import React from "react";

import classNames from "classnames";
import { Typography } from "neetoui/index";

import { STYLE, label } from "./constants";

const Card = ({ style = STYLE.unanswered, score, totalScore }) => {
  const containerClasses = classNames(
    "flex flex-col items-center rounded-xl px-6 py-4 shadow-sm w-1/5 h-[15vh]",
    {
      "bg-gray-100 text-black": style === STYLE.total,
      "bg-green-100 text-green-700": style === STYLE.correct,
      "bg-red-100 text-red-600": style === STYLE.wrong,
      "bg-gray-200 text-black": style === STYLE.unanswered,
    }
  );

  return (
    <div className={containerClasses}>
      <Typography className="text-xl" style="body1">
        {label[style]}
      </Typography>
      <Typography className="mt-5 text-3xl" style="h1">
        {style === STYLE.total ? `${score}/${totalScore}` : score}
      </Typography>
    </div>
  );
};

export default Card;
