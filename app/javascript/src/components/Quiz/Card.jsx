import React from "react";

import { Typography, Radio } from "@bigbinary/neetoui";

const Card = ({ question }) => (
  <div className="flex w-[50vw] flex-col space-y-3 bg-white p-3">
    <Typography weight="bold">{question.questionText}</Typography>
    <Radio stacked>
      {question.options.map(({ id, optionText, isCorrect }) => (
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
