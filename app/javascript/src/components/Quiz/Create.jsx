import React from "react";

import { buildUrl } from "@bigbinary/neeto-commons-frontend/utils";
import PageLoader from "components/commons/PageLoader";
import { Button, Typography, Toastr } from "neetoui/index";
import { useTranslation } from "react-i18next";
import { useParams, useHistory } from "react-router-dom";

import QuestionCard from "./Card/Card";
import PageHeader from "./PageHeader";

import {
  useFetchQuestions,
  useDeleteQuestion,
  useCloneQuestion,
} from "../../hooks/reactQuery/useQuestions";
import { useShowQuiz, useUpdateQuiz } from "../../hooks/reactQuery/useQuizzes";
import { routes } from "../../routes";

const Create = () => {
  const { quizId } = useParams();
  const history = useHistory();
  const { t } = useTranslation();

  const {
    data: { data: { questions = [] } = {} } = {},
    isLoading: isQuestionLoading,
  } = useFetchQuestions(quizId);

  const { data: { data: { quiz = {} } = {} } = {} } = useShowQuiz(quizId);

  const { mutate: deleteQuiz, isPending: isDeleteLoading } =
    useDeleteQuestion();

  const { mutate: cloneQuestion } = useCloneQuestion();

  const { mutate: updateQuiz } = useUpdateQuiz();

  if (isQuestionLoading || isDeleteLoading) return <PageLoader />;

  const handleQuestionNavigation = () => {
    const url = buildUrl(routes.question.create, {
      quizId,
      questionNumber: questions.length + 1,
    });
    history.push(url);
  };

  const handleDelete = questionId => {
    deleteQuiz(questionId);
  };

  const handleClone = questionId => {
    cloneQuestion(questionId);
  };

  const handleEditNavigation = ({ questionId, questionNumber }) => {
    const url = buildUrl(routes.question.edit, { questionId, questionNumber });
    history.push({ pathname: url, state: { quizId } });
  };

  const handlePublish = ({ quizId, status }) => {
    updateQuiz({ quizId, payload: { status } });
  };

  const buildQuizPublicUrl = () =>
    `${window.location.origin}${buildUrl(routes.quiz.register, {
      quizSlug: quiz.slug,
    })}`;

  const handleQuizPublicNavigation = () =>
    window.open(buildQuizPublicUrl(), "_blank");

  const copyQuizPublicUrl = () => {
    navigator.clipboard.writeText(buildQuizPublicUrl());
    Toastr.success(t("response.success.linkCopied"));
  };

  return (
    <div className="flex h-full w-screen flex-col overflow-hidden bg-slate-100">
      <PageHeader
        {...{
          quizId,
          quiz,
          handlePublish,
          handleQuizPublicNavigation,
          copyQuizPublicUrl,
          totalQuestions: questions.length,
        }}
        showPublishButton
      />
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
              {t(
                `placeholder.${
                  questions.length > 1 ? "totalQuestions" : "totalQuestion"
                }`,
                { number: questions.length }
              )}
            </Typography>
            {questions.map((question, index) => (
              <QuestionCard
                key={question.id}
                {...{
                  question,
                  handleDelete,
                  handleEditNavigation,
                  handleClone,
                  questionNumber: index + 1,
                }}
              />
            ))}
          </div>
        ) : (
          <Typography className="text-center text-gray-500">
            {t("placeholder.noQuestions")}
          </Typography>
        )}
      </div>
    </div>
  );
};

export default Create;
