import React from "react";

import EditorContent from "@bigbinary/neeto-editor/EditorContent";
import { isEditorEmpty } from "@bigbinary/neeto-editor/utils";
import { Typography } from "neetoui";

import Option from "./Option";

const QuestionCard = ({
  id: questionId,
  questionText,
  description,
  options = [],
  selectedAnswers,
  setSelectedAnswer,
}) => {
  const selectedOption = selectedAnswers[questionId] || null;

  return (
    <div className="flex w-[40vw] flex-col space-y-4">
      <div>
        <Typography style="h3">{questionText}</Typography>
        {!isEditorEmpty(description) && (
          <div className="mt-2 w-full rounded-lg border border-slate-200 p-3 shadow-sm">
            <EditorContent content={description} />
          </div>
        )}
      </div>
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
