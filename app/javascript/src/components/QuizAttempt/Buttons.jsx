import React from "react";

import { Button } from "neetoui";

const Buttons = ({
  t,
  isFirstQuestion,
  isLastQuestion,
  handleSubmit,
  handleNext,
  handlePrevious,
}) => (
  <div className="flex space-x-4">
    {!isFirstQuestion && (
      <Button
        className="bg-blue-600"
        label={t("button.previous")}
        onClick={handlePrevious}
      />
    )}
    {!isLastQuestion && (
      <Button
        className="bg-blue-600"
        label={t("button.next")}
        onClick={handleNext}
      />
    )}
    {isLastQuestion && (
      <Button
        className="bg-green-600"
        label={t("button.saveAndSubmit")}
        onClick={handleSubmit}
      />
    )}
  </div>
);

export default Buttons;
