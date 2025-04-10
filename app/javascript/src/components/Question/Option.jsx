import React from "react";

import { Checkmark, Delete } from "@bigbinary/neeto-icons";
import { Input } from "@bigbinary/neetoui/formik";
import { Button } from "neetoui";

const Option = ({
  index,
  remove: removeOption,
  optionLength,
  correctOption,
  setCorrectOption,
}) => (
  <div className="flex w-full items-center rounded-md border border-gray-300 bg-white p-2">
    <Button
      className="bg-transparent"
      style="link"
      icon={() => (
        <Checkmark
          color={index === correctOption ? "green" : "#2563eb"}
          size={index === correctOption ? 30 : 20}
        />
      )}
      onMouseDown={e => e.preventDefault()}
      onClick={() => {
        setCorrectOption(index);
      }}
    />
    <Input
      nakedInput
      className=" w-96"
      name={`options.${index}.text`}
      placeholder={`Type option ${index + 1}`}
      type="text"
    />
    <Button
      className="ml-2 bg-transparent"
      disabled={optionLength === 2}
      icon={Delete}
      style="link"
      onClick={() => removeOption(index)}
    />
  </div>
);

export default Option;
