import React from "react";

import classNames from "classnames";
import { useTranslation } from "react-i18next";

const AnswerStatus = ({ selectedOption, isCorrectSelected }) => {
  const { t } = useTranslation();

  let statusText = t("quiz.result.unanswered");

  if (selectedOption) {
    statusText = isCorrectSelected
      ? t("quiz.result.correctAnswerSelected")
      : t("quiz.result.incorrectAnswerSelected");
  }

  const statusClass = classNames(
    "w-full rounded-md px-3 py-2 text-sm font-medium",
    {
      "bg-gray-400 text-white": !selectedOption,
      "bg-green-100 text-green-700": selectedOption && isCorrectSelected,
      "bg-red-100 text-red-700": selectedOption && !isCorrectSelected,
    }
  );

  return <div className={statusClass}>{statusText}</div>;
};

export default AnswerStatus;
