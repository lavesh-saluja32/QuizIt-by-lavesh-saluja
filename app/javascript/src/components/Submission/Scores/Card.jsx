import React from "react";

import classNames from "classnames";
import { Typography } from "neetoui/index";
import { useTranslation } from "react-i18next";

import { STYLE } from "./constants";

const Card = ({ style = STYLE.unanswered, score, totalScore }) => {
  const { t } = useTranslation();

  const containerClasses = classNames(
    "flex flex-col items-center rounded-xl px-6 py-4 shadow-sm w-1/5 h-[15vh]",
    {
      "bg-gray-100 text-black": style === STYLE.total,
      "bg-green-100 text-green-700": style === STYLE.correct,
      "bg-red-100 text-red-600": style === STYLE.wrong,
      "bg-gray-200 text-black": style === STYLE.unanswered,
    }
  );

  const label = {
    [STYLE.total]: t("quiz.result.score"),
    [STYLE.correct]: t("quiz.result.correct"),
    [STYLE.wrong]: t("quiz.result.wrong"),
    [STYLE.unanswered]: t("quiz.result.unanswered"),
  };

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
