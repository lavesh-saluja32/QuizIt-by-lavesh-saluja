import React from "react";

import { Typography } from "neetoui";

import AnswerStatus from "./AnswerStatus";
import Option from "./Option";

const QuestionCard = ({
  questionText,
  options = [],
  userAnswerId: selectedOption,
  index,
  t,
}) => {
  const correctOption = options.find(option => option.isCorrect);
  const isCorrectSelected = selectedOption === correctOption?.id;

  return (
    <div className="m-auto flex w-[40vw] flex-col space-y-4 p-10">
      <Typography>
        {t("quiz.result.questionNumber", { number: index + 1 })}
      </Typography>
      <Typography style="h3">{questionText}</Typography>
      <div className="flex flex-col space-y-2">
        {options.map(option => (
          <Option key={option.id} {...{ ...option, selectedOption }} />
        ))}
        <AnswerStatus {...{ selectedOption, isCorrectSelected }} />
      </div>
    </div>
  );
};
export default QuestionCard;
