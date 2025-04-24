import React from "react";

import ToggleFeatureCard from "@bigbinary/neeto-molecules/ToggleFeatureCard";
import PageHeader from "components/Quiz/PageHeader";
import { useShowQuiz, useUpdateQuiz } from "hooks/reactQuery/useQuizzes";
import { Button } from "neetoui";
import { Form, Input } from "neetoui/formik";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import {
  quizTimingValidationSchema,
  MINIMUM_TIME,
  MAXIMUM_TIME,
} from "./constants";
import { getHours, getMinutes } from "./utils";

import Header from "../commons/ConfigureSettingsTitle";

const QuizTimings = () => {
  const { quizId } = useParams();
  const { t } = useTranslation();

  const { data: { data: quiz = {} } = {} } = useShowQuiz(quizId);
  const { mutate: updateQuiz, isPending } = useUpdateQuiz();

  const handleUpdate = values => {
    updateQuiz({
      quizId,
      payload: {
        isTimerEnabled: values.enableQuizTiming,
        time: values.hours * 60 + values.minutes,
      },
    });
  };

  const initialHours = getHours(quiz.time);
  const initialRemainingMinutes = getMinutes(quiz.time);

  return (
    <div className="flex h-screen w-screen flex-col bg-slate-100">
      <PageHeader {...{ quiz, quizId }} />
      <Header {...{ quizId, pageTitle: t("configure.timing.title") }} />
      <div className="flex w-full flex-col items-center justify-center">
        <div className="w-[60vw] bg-white p-10 shadow-md">
          <Form
            formikProps={{
              initialValues: {
                enableQuizTiming: quiz.isTimerEnabled,
                hours: initialHours,
                minutes: initialRemainingMinutes,
              },
              enableReinitialize: true,
              validationSchema: quizTimingValidationSchema(t),
              onSubmit: handleUpdate,
            }}
          >
            {({ dirty, values }) => (
              <>
                <ToggleFeatureCard
                  description={t("configure.timing.buttonDescription")}
                  switchName="enableQuizTiming"
                  title={t("configure.timing.buttonTitle")}
                />
                {values.enableQuizTiming && (
                  <div className="mt-6 flex space-x-6">
                    <Input
                      className="w-1/2"
                      label={t("configure.timing.hours")}
                      min={MINIMUM_TIME}
                      name="hours"
                      type="number"
                    />
                    <Input
                      className="w-1/2"
                      label={t("configure.timing.minutes")}
                      max={MAXIMUM_TIME}
                      min={MINIMUM_TIME}
                      name="minutes"
                      type="number"
                    />
                  </div>
                )}
                <div className="mt-8 flex space-x-3">
                  <Button
                    className="bg-blue-600"
                    disabled={!dirty}
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

export default QuizTimings;
