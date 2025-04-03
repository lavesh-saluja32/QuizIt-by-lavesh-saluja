import React, { useState, useEffect, useMemo } from "react";

import { buildUrl } from "@bigbinary/neeto-commons-frontend/utils";
import { useTranslation } from "react-i18next";
import { useHistory, useParams, useLocation } from "react-router-dom";

import { formatQuestionFormInitialValue } from "./utils";

import {
  useUpdateQuestion,
  useShowQuestion,
} from "../../hooks/reactQuery/useQuestions";
import { routes } from "../../routes";
import QuestionForm from "../Question/Form";
import { formatPayload } from "../Question/utlis";

const Index = () => {
  const [isSaveLoading, setIsSaveLoading] = useState(false);
  const [correctOption, setCorrectOption] = useState("");

  const history = useHistory();

  const { questionId } = useParams();

  const { t } = useTranslation();

  const location = useLocation();

  if (!location.state) history.goBack();
  const { quizId = "" } = location.state || "";
  const { mutate: updateQuestion } = useUpdateQuestion();

  const { data: { data: { question = {} } = {} } = {} } =
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

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="w-[50vw]">
        <QuestionForm
          showBreadcrumbs={false}
          {...{
            isSaveLoading,
            correctOption,
            setCorrectOption,
            handleSubmit,
            t,
            initialQuestion: initialValues,
          }}
        />
      </div>
    </div>
  );
};

export default Index;
