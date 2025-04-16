import React from "react";

import { CheckCircle } from "@bigbinary/neeto-icons";
import { Input } from "@bigbinary/neetoui";
import classNames from "classnames";
import { Button } from "neetoui";
import useQuizStore from "stores/useQuizStore";

const Option = ({ id, questionId, optionText }) => {
  const { selectedAnswers, setSelectedAnswer } = useQuizStore();
  const selectedOption = selectedAnswers[questionId];

  const handleClick = () => {
    if (id === selectedOption) {
      setSelectedAnswer(questionId, null);
    } else {
      setSelectedAnswer(questionId, id);
    }
  };

  const isSelected = id === selectedOption;

  return (
    <div className="flex w-full items-center rounded-md border border-gray-300 bg-white p-2">
      <Button
        className="bg-transparent"
        style="link"
        icon={() => (
          <div
            className={classNames(
              "flex h-8 w-8 items-center justify-center rounded-full",
              { "bg-green-500": isSelected }
            )}
          >
            <CheckCircle color={isSelected ? "white" : "#2563eb"} size={32} />
          </div>
        )}
        onClick={handleClick}
      />
      <Input disabled nakedInput className="w-96" value={optionText} />
    </div>
  );
};

export default Option;
