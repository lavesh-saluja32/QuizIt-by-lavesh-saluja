import React, { useState } from "react";

import { buildUrl } from "@bigbinary/neeto-commons-frontend/utils";
import { Formik, Form, FieldArray } from "formik";
import { Button } from "neetoui";
import { useHistory } from "react-router-dom";

import Breadcrumbs from "./Breadcrumbs";
import {
  QUESTION_INITIAL_VALUES,
  MAX_OPTIONS,
  OPTION_VALUE,
  QUESTION_VALIDATION_SCHEMA,
  DEFAULT_CORRECT_OPTION,
} from "./constant";
import QuestionInput from "./Input";
import Option from "./Option";
import { formatPayload } from "./utlis";

import { useCreateQuestion } from "../../hooks/reactQuery/useQuestions";
import { routes } from "../../routes";

const QuestionForm = ({ questionNumber, quizId, t }) => {
  const [correctOption, setCorrectOption] = useState(DEFAULT_CORRECT_OPTION);
  const [isSaveLoading, setIsSaveLoading] = useState(false);
  const [isSaveNextLoading, setIsSaveNextLoading] = useState(false);
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
            history.push(buildUrl(routes.question.create, { quizId }));
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
    <Formik
      initialValues={QUESTION_INITIAL_VALUES}
      validationSchema={QUESTION_VALIDATION_SCHEMA}
      onSubmit={values => handleSubmit(values, "save")}
    >
      {({ values }) => (
        <Form className="flex flex-col space-y-8">
          <Breadcrumbs {...{ quizId, questionNumber, t }} />
          <QuestionInput />
          <FieldArray name="options">
            {({ push, remove }) => (
              <>
                <div className="space-y-3">
                  {values.options.map((_, index) => (
                    <Option
                      key={index}
                      {...{
                        index,
                        remove,
                        optionLength: values.options.length,
                        correctOption,
                        setCorrectOption,
                      }}
                    />
                  ))}
                </div>
                <Button
                  className="text-blue-600"
                  disabled={values.options.length === MAX_OPTIONS}
                  label={t("button.option")}
                  style="link"
                  onClick={() => push(OPTION_VALUE)}
                />
              </>
            )}
          </FieldArray>
          <div className="flex space-x-4">
            <Button
              className="bg-blue-600"
              label={t("button.save")}
              loading={isSaveLoading}
              type="button"
              onClick={() => handleSubmit(values, "save")}
            />
            <Button
              label={t("button.saveNext")}
              loading={isSaveNextLoading}
              style="secondary"
              type="button"
              onClick={() => handleSubmit(values, "saveNext")}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default QuestionForm;
