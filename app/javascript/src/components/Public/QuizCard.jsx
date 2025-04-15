import { Typography, Button } from "neetoui";
import React from "react";

const QuizCard = ({
  name,
  totalQuestions,
  id,
  categoryName,
  handleQuizLoginNavigation,
  t,
}) => {
  return (
    <div className="m-1 flex w-1/4 flex-col space-y-8 rounded-xl bg-white p-4">
      <div className="flex flex-col space-y-1">
        <Typography style="h3">{name}</Typography>
        <span className="w-fit rounded-xl bg-red-400 p-1 text-xs text-white">
          {categoryName}
        </span>
      </div>
      <div className="flex flex-col space-y-1">
        <Typography style="h5">
          {t("quiz.totalQuestions", { count: totalQuestions })}
        </Typography>
        <Button
          className="w-full bg-blue-600"
          label="Start Quiz"
          onClick={() => handleQuizLoginNavigation(id)}
        />
      </div>
    </div>
  );
};

export default QuizCard;
