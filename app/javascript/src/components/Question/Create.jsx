import React, { useState } from "react";

import { buildUrl } from "@bigbinary/neeto-commons-frontend/utils";
import { useTranslation } from "react-i18next";
import { useParams, useHistory } from "react-router-dom";

import { DEFAULT_CORRECT_OPTION } from "./constant";
import QuestionForm from "./Form";
import { formatPayload } from "./utlis";

import { useCreateQuestion } from "../../hooks/reactQuery/useQuestions";
import { routes } from "../../routes";
import PageHeader from "../Quiz/PageHeader";

const Create = () => {
  const [isSaveLoading, setIsSaveLoading] = useState(false);
  const [isSaveNextLoading, setIsSaveNextLoading] = useState(false);
  const [correctOption, setCorrectOption] = useState(DEFAULT_CORRECT_OPTION);

  const { quizId, questionNumber } = useParams();
  const { t } = useTranslation();

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
      <PageHeader {...{ quizId }} />
      <div className="flex h-[80vh] w-full items-center justify-center">
        <QuestionForm
          isSaveNextbutton
          {...{
            questionNumber,
            quizId,
            t,
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
