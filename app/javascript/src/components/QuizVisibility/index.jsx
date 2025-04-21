import React from "react";

import ToggleFeatureCard from "@bigbinary/neeto-molecules/ToggleFeatureCard";
import PageHeader from "components/Quiz/PageHeader";
import { useShowQuiz, useUpdateQuiz } from "hooks/reactQuery/useQuizzes";
import { Button } from "neetoui";
import { Form } from "neetoui/formik";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import Header from "../commons/ConfigureSettingsTitle";

const QuizVisibility = () => {
  const { quizId } = useParams();

  const { t } = useTranslation();
  const { data: { data: { quiz = {} } = {} } = {} } = useShowQuiz(quizId);
  const { mutate: updateQuiz, isPending } = useUpdateQuiz();

  const handleUpdate = values => {
    updateQuiz({ quizId, payload: { isPublic: values.enableQuizVisibility } });
  };

  return (
    <div className="flex h-screen w-screen flex-col bg-slate-100">
      <PageHeader {...{ quiz, quizId }} />
      <Header {...{ quizId, pageTitle: t("configure.visibility.title") }} />
      <div className="flex w-full flex-col items-center justify-center">
        <div className="w-[60vw] bg-white p-10">
          <Form
            formikProps={{
              initialValues: {
                enableQuizVisibility: quiz.isPublic,
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
