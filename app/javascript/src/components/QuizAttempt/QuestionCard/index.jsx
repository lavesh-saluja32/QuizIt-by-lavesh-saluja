import React from "react";

import { Typography } from "neetoui";

import Option from "./Option";

const QuestionCard = ({
  id: questionId,
  questionText,
  options = [],
  selectedAnswers,
  setSelectedAnswer,
}) => {
  const selectedOption = selectedAnswers[questionId] || null;

  return (
    <div className="flex w-[40vw] flex-col space-y-4">
      <Typography style="h3">{questionText}</Typography>
      <div className="flex flex-col space-y-2">
        {options.map(({ id, optionText }) => (
          <Option
            key={id}
            {...{
              selectedOption,
              setSelectedAnswer,
              questionId,
              id,
              optionText,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
