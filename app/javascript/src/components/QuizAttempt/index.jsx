import React from "react";

import { buildUrl } from "@bigbinary/neeto-commons-frontend/utils";
import { Typography } from "neetoui";
import { useTranslation } from "react-i18next";
import { useParams, useHistory } from "react-router-dom";

import Buttons from "./Buttons";
import QuestionCard from "./QuestionCard";

import { useFetchQuestions } from "../../hooks/reactQuery/public/useQuestions";
import { routes } from "../../routes";
import useQuizStore from "../../stores/useQuizStore";
import useSubmissionStore from "../../stores/useSubmissionStore";

const QuizAttempt = () => {
  const { quizId } = useParams();
  const { t } = useTranslation();

  const history = useHistory();

  const { data: { data: { questions = [] } = {} } = {} } =
    useFetchQuestions(quizId);

  const {
    questionNumber,
    setQuestionNumber,
    selectedAnswers,
    setSelectedAnswer,
  } = useQuizStore();

  const { submissionId } = useSubmissionStore();

  const handleSubmit = () => {
    history.push(buildUrl(routes.submission, { submissionId }));
  };

  const handleNext = () => {
    setQuestionNumber(questionNumber + 1);
  };

  const handlePrevious = () => {
    setQuestionNumber(questionNumber - 1);
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="space-y-4">
        <Typography>
          {t("quiz.questionNumber", {
            questionNumber: questionNumber + 1,
            totalQuestions: questions.length,
          })}
        </Typography>
        <QuestionCard
          {...{
            ...questions[questionNumber],
            setSelectedAnswer,
            selectedAnswers,
          }}
        />
        <Buttons
          {...{ t, handleSubmit, handleNext, handlePrevious }}
          isFirstQuestion={questionNumber === 0}
          isLastQuestion={questionNumber === questions.length - 1}
        />
      </div>
    </div>
  );
};

export default QuizAttempt;
