import React from "react";

import { Typography, Radio } from "@bigbinary/neetoui";

import Dropdown from "./Dropdown";

const Card = ({
  question: { questionText, id: questionId, options = [] },
  handleDelete,
  handleEditNavigation,
}) => (
  <div className="flex w-[50vw] flex-col space-y-3 bg-white p-3">
    <div className="flex items-center justify-between">
      <Typography weight="bold">{questionText}</Typography>
      <Dropdown {...{ questionId, handleDelete, handleEditNavigation }} />
    </div>
    <Radio stacked>
      {options.map(({ id, optionText, isCorrect }) => (
        <Radio.Item
          disabled
          checked={isCorrect}
          key={id}
          label={optionText}
          name={optionText}
          value={id}
        />
      ))}
    </Radio>
  </div>
);

export default Card;
