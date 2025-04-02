import React from "react";

import { buildUrl } from "@bigbinary/neeto-commons-frontend/utils";
import PageLoader from "components/commons/PageLoader";
import { Button, Typography } from "neetoui/index";
import { useTranslation } from "react-i18next";
import { useParams, useHistory } from "react-router-dom";

import QuestionCard from "./Card";
import PageHeader from "./PageHeader";

import { useFetchQuestions } from "../../hooks/reactQuery/useQuestions";
import { routes } from "../../routes";

const Create = () => {
  const { quizId } = useParams();
  const history = useHistory();
  const { t } = useTranslation();

  const { data: { data: { questions = [] } = {} } = {}, isLoading } =
    useFetchQuestions(quizId);

  if (isLoading) return <PageLoader />;

  const handleQuestionNavigation = () => {
    const url = buildUrl(routes.question.create, { quizId });
    history.push(url);
  };

  return (
    <div className="flex h-screen w-screen flex-col bg-slate-100">
      <PageHeader {...{ quizId }} />
      <div className="m-6 flex justify-end">
        <Button
          className="bg-blue-600"
          label={t("button.addQuestion")}
          onClick={handleQuestionNavigation}
        />
      </div>
      <div className=" flex-grow items-center justify-center overflow-y-auto px-6">
        {questions.length > 0 ? (
          <div className="m-auto flex w-[50vw] flex-col items-center space-y-4 p-4">
            <Typography className="self-start" weight="bold">
              {t("placeholder.totalQuestions", { number: questions.length })}
            </Typography>
            {questions.map(question => (
              <QuestionCard key={question.id} {...{ question }} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">
            {t("placeholder.noQuestions")}
          </p>
        )}
      </div>
    </div>
  );
};

export default Create;
