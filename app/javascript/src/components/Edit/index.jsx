import React, { useState, useEffect, useMemo } from "react";

import { buildUrl } from "@bigbinary/neeto-commons-frontend/utils";
import PageLoader from "components/commons/PageLoader";
import { useShowQuiz } from "hooks/reactQuery/useQuizzes";
import { useTranslation } from "react-i18next";
import { useHistory, useParams, useLocation } from "react-router-dom";
import { routes } from "routes";

import { formatQuestionFormInitialValue } from "./utils";

import {
  useUpdateQuestion,
  useShowQuestion,
} from "../../hooks/reactQuery/useQuestions";
import QuestionForm from "../Question/Form";
import { formatPayload } from "../Question/utlis";
import PageHeader from "../Quiz/PageHeader";

const Edit = () => {
  const [isSaveLoading, setIsSaveLoading] = useState(false);
  const [correctOption, setCorrectOption] = useState("");

  const history = useHistory();

  const { questionId, questionNumber } = useParams();

  const { t } = useTranslation();

  const location = useLocation();

  if (!location.state) history.goBack();
  const { quizId = "" } = location.state || {};
  const { data: quiz = {} } = useShowQuiz(quizId);

  const { mutate: updateQuestion } = useUpdateQuestion();

  const { data: { data: { question = {} } = {} } = {}, isLoading } =
    useShowQuestion(questionId);

  const initialValues = useMemo(
    () => formatQuestionFormInitialValue(question),
    [question]
  );

  const handleSubmit = values => {
    const payload = formatPayload(values, correctOption);
    setIsSaveLoading(true);

    updateQuestion(
      { questionId, payload },
      {
        onSuccess: () => history.push(buildUrl(routes.quiz.create, { quizId })),
        onSettled: () => setIsSaveLoading(false),
      }
    );
  };

  useEffect(() => {
    setCorrectOption(question?.options?.findIndex(option => option.isCorrect));
  }, [question]);

  if (isLoading) return <PageLoader />;

  return (
    <div className="flex h-full w-screen flex-col overflow-hidden overflow-y-scroll bg-slate-100">
      <PageHeader {...{ quiz, quizId }} />
      <div className="m-auto w-[50vw]">
        <QuestionForm
          showBreadcrumbs
          {...{
            quizId,
            isSaveLoading,
            correctOption,
            setCorrectOption,
            handleSubmit,
            t,
            initialQuestion: initialValues,
            questionNumber,
          }}
        />
      </div>
    </div>
  );
};

export default Edit;
