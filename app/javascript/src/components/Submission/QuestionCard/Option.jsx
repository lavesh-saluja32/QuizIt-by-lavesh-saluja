import React from "react";

import { CheckCircle } from "@bigbinary/neeto-icons";
import classNames from "classnames";
import { Button, Typography } from "neetoui";
import { useTranslation } from "react-i18next";

const Option = ({ id, optionText, isCorrect, selectedOption }) => {
  const { t } = useTranslation();

  const isSelected = selectedOption === id;
  const isCorrectSelected = isSelected && isCorrect;
  const isIncorrectSelected = isSelected && !isCorrect;

  const iconBgClass = classNames(
    "flex h-8 w-8 items-center justify-center rounded-full",
    {
      "bg-green-500 border-b b-green-500": isCorrectSelected,
      "bg-red-500 border-b b-red-500": isIncorrectSelected,
    }
  );

  const iconColor =
    isCorrectSelected || isIncorrectSelected ? "white" : "#2563eb";

  return (
    <div
      className={classNames(
        "flex w-full flex-col justify-between rounded-md border border-gray-300 bg-white p-2",
        {
          "border-b border-green-500": isCorrectSelected,
          "border-b border-red-500 ": isIncorrectSelected,
        }
      )}
    >
      <div className="flex items-center space-x-2">
        <Button
          className="bg-transparent"
          style="link"
          icon={() => (
            <div className={iconBgClass}>
              <CheckCircle color={iconColor} size={32} />
            </div>
          )}
        />
        <Typography>{optionText}</Typography>
      </div>
      <div className="flex flex-grow items-end justify-end">
        {isCorrect && (
          <Typography className="text-green-600" style="body1">
            {t("quiz.result.correctAnswer")}
          </Typography>
        )}
        {isIncorrectSelected && (
          <Typography style="body1">{t("quiz.result.yourAnswer")}</Typography>
        )}
      </div>
    </div>
  );
};

export default Option;
