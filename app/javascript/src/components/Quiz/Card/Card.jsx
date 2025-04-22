import React from "react";

import EditorContent from "@bigbinary/neeto-editor/EditorContent";
import { isEditorEmpty } from "@bigbinary/neeto-editor/utils";
import { Typography, Radio } from "@bigbinary/neetoui";

import Dropdown from "./Dropdown";

const Card = ({
  question: { questionText, description, id: questionId, options = [] },
  handleDelete,
  handleEditNavigation,
  handleClone,
  questionNumber,
}) => (
  <div className="flex w-[50vw] flex-col space-y-3 bg-white p-3">
    <div className="flex items-center justify-between">
      <div className="w-full">
        <Typography weight="bold">{questionText}</Typography>
        {!isEditorEmpty(description) && (
          <div className="mt-2 w-full rounded-lg border border-slate-200 p-3 shadow-sm">
            <EditorContent content={description} />
          </div>
        )}
      </div>
      <Dropdown
        {...{
          questionId,
          handleDelete,
          handleEditNavigation,
          handleClone,
          questionNumber,
        }}
      />
    </div>
    <Radio stacked>
      {options.map(({ id, optionText, isCorrect }) => (
        <Radio.Item
          disabled
          checked={isCorrect}
          key={id}
          label={optionText}
          name={`question-${questionId}`}
          value={id}
        />
      ))}
    </Radio>
  </div>
);

export default Card;
