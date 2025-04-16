import React, { useState } from "react";

import { buildUrl } from "@bigbinary/neeto-commons-frontend/utils";
import { useCreateQuestion } from "hooks/reactQuery/useQuestions";
import { useShowQuiz } from "hooks/reactQuery/useQuizzes";
import { useParams, useHistory } from "react-router-dom";
import { routes } from "routes";

import { DEFAULT_CORRECT_OPTION } from "./constants";
import QuestionForm from "./Form";
import { formatPayload } from "./utlis";

import PageHeader from "../Quiz/PageHeader";

const Create = () => {
  const [isSaveLoading, setIsSaveLoading] = useState(false);
  const [isSaveNextLoading, setIsSaveNextLoading] = useState(false);
  const [correctOption, setCorrectOption] = useState(DEFAULT_CORRECT_OPTION);

  const { quizId, questionNumber } = useParams();
  const { data: { data: { quiz = {} } = {} } = {} } = useShowQuiz(quizId);

  const history = useHistory();

  const { mutate: createQuestion } = useCreateQuestion();

  const handleSubmit = (values, actionType) => {
    const payload = formatPayload(values, correctOption);

    if (actionType === "save") {
      setIsSaveLoading(true);
    } else if (actionType === "saveNext") {
      setIsSaveNextLoading(true);
    }

    createQuestion(
      { quizId, payload },
      {
        onSuccess: () => {
          if (actionType === "save") {
            history.push(buildUrl(routes.quiz.create, { quizId }));
          } else {
            window.location.replace(
              buildUrl(routes.question.create, {
                quizId,
                questionNumber: Number(questionNumber) + 1,
              })
            );
          }
        },
        onSettled: () => {
          setIsSaveLoading(false);
          setIsSaveNextLoading(false);
        },
      }
    );
  };

  return (
    <div className="w-screen bg-slate-100">
      <PageHeader {...{ quizId, quiz }} />
      <div className="flex h-[80vh] w-full items-center justify-center">
        <QuestionForm
          isSaveNextbutton
          {...{
            questionNumber,
            quizId,
            isSaveLoading,
            isSaveNextLoading,
            correctOption,
            setCorrectOption,
            handleSubmit,
          }}
        />
      </div>
    </div>
  );
};

export default Create;
