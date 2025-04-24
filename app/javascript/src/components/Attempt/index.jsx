import React, { useEffect, useState } from "react";

import { buildUrl } from "@bigbinary/neeto-commons-frontend/utils";
import { useFetchQuestions } from "hooks/reactQuery/public/useQuestions";
import { useShowQuiz } from "hooks/reactQuery/public/useQuizzes";
import { useShowSubmission } from "hooks/reactQuery/public/useSubmissions";
import { Typography } from "neetoui";
import { useTranslation } from "react-i18next";
import { useParams, useHistory } from "react-router-dom";
import { routes } from "routes";
import useQuizStore from "stores/useQuizStore";
import useSubmissionStore from "stores/useSubmissionStore";

import Buttons from "./Buttons";
import QuestionCard from "./QuestionCard";
import { calculateTimeLeft } from "./utils";

const QuizAttempt = () => {
  const { quizSlug } = useParams();
  const { t } = useTranslation();
  const history = useHistory();

  const { data: { data: { questions = [] } = {} } = {} } =
    useFetchQuestions(quizSlug);
  const { data: { data: quiz = {} } = {} } = useShowQuiz(quizSlug);
  const isTimeEnabled = quiz?.isTimerEnabled;
  const totalTime = quiz.time;

  const {
    questionNumber,
    setQuestionNumber,
    selectedAnswers,
    setSelectedAnswer,
  } = useQuizStore();
  const { submissionId } = useSubmissionStore();
  const { data: { data: submission = {} } = {} } =
    useShowSubmission(submissionId);

  const startedAt = submission?.createdAt;

  const [timeLeft, setTimeLeft] = useState(totalTime);

  useEffect(() => {
    if (timeLeft <= 0 && isTimeEnabled) {
      handleSubmit();
    }

    let timer;
    if (isTimeEnabled) {
      timer = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [timeLeft, isTimeEnabled]);

  useEffect(() => {
    setQuestionNumber(0);
  }, []);

  useEffect(() => {
    setTimeLeft(calculateTimeLeft(startedAt, totalTime));
  }, [startedAt, totalTime]);

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
        <div className="flex items-center justify-between">
          <Typography>
            {t("quiz.questionNumber", {
              questionNumber: questionNumber + 1,
              totalQuestions: questions.length,
            })}
          </Typography>
          {isTimeEnabled && (
            <div className="text-xl font-bold">
              <Typography>
                {t("quiz.timeLeft", {
                  timeLeft: `${Math.floor(timeLeft / 60)}:${
                    timeLeft % 60 < 10 ? "0" : ""
                  }${timeLeft % 60}`,
                })}
              </Typography>
            </div>
          )}
        </div>
        <QuestionCard
          {...{
            ...questions[questionNumber],
            setSelectedAnswer,
            selectedAnswers,
          }}
        />
        <Buttons
          {...{ handleSubmit, handleNext, handlePrevious }}
          isFirstQuestion={questionNumber === 0}
          isLastQuestion={questionNumber === questions.length - 1}
        />
      </div>
    </div>
  );
};

export default QuizAttempt;
