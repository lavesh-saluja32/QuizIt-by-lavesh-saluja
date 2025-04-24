import React from "react";

import ToggleFeatureCard from "@bigbinary/neeto-molecules/ToggleFeatureCard";
import PageLoader from "components/commons/PageLoader";
import PageHeader from "components/Quiz/PageHeader";
import { useShowQuiz, useUpdateQuiz } from "hooks/reactQuery/useQuizzes";
import { Button, Typography } from "neetoui";
import { Form } from "neetoui/formik";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import Header from "../commons/ConfigureSettingsTitle";

const QuizVisibility = () => {
  const { quizId } = useParams();

  const { t } = useTranslation();
  const { data: { data: quiz = {} } = {}, isLoading } = useShowQuiz(quizId);
  const { mutate: updateQuiz, isPending } = useUpdateQuiz();

  const handleUpdate = values => {
    updateQuiz({ quizId, payload: { isPublic: values.enableQuizVisibility } });
  };

  if (isLoading) return <PageLoader />;

  return (
    <div className="flex h-screen w-screen flex-col bg-slate-100">
      <PageHeader {...{ quiz, quizId }} />
      <Header {...{ quizId, pageTitle: t("configure.visibility.title") }} />
      <div className="flex w-full flex-col items-center justify-center">
        <div className="w-[60vw] bg-white p-10">
          <Form
            formikProps={{
              initialValues: {
                enableQuizVisibility: quiz.isPublic && quiz.status !== "draft",
              },
              enableReinitialize: true,
              onSubmit: handleUpdate,
            }}
          >
            {({ dirty }) => (
              <>
                <ToggleFeatureCard
                  description={t("configure.visibility.buttonDescription")}
                  isDisabled={quiz.status === "draft"}
                  switchName="enableQuizVisibility"
                  title={t("configure.visibility.buttonTitle")}
                />
                {quiz.status === "draft" && (
                  <Typography className="mt-1 text-sm text-red-500">
                    {t("validation.visibility")}
                  </Typography>
                )}
                <div className="flex space-x-2 p-5">
                  <Button
                    className="bg-blue-600"
                    disabled={!dirty || quiz.status === "draft"}
                    label={t("button.save")}
                    loading={isPending}
                    type="submit"
                  />
                  <Button
                    label={t("button.cancel")}
                    style="text"
                    type="reset"
                  />
                </div>
              </>
            )}
          </Form>
        </div>
      </div>
    </div>
  );
};

export default QuizVisibility;
