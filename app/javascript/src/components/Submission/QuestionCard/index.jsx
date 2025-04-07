import React from "react";

import { Typography } from "neetoui";

import Option from "./Option";

const QuestionCard = ({
  id,
  questionText,
  options = [],
  selectedAnswers,
  setSelectedAnswer,
}) => {
  const selectedOption = selectedAnswers[id] || null;

  return (
    <div className="flex w-[40vw] flex-col space-y-4">
      <Typography style="h3">{questionText}</Typography>
      <div className="flex flex-col space-y-2">
        {options.map(option => (
          <Option
            id={option.id}
            key={option.id}
            optionText={option.optionText}
            questionId={id}
            {...{ selectedOption, setSelectedAnswer }}
          />
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
