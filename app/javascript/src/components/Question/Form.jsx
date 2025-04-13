import React, { useState, useEffect } from "react";

import PageLoader from "components/commons/PageLoader";
import { Formik, Form, FieldArray } from "formik";
import { Button } from "neetoui";

import Breadcrumbs from "./Breadcrumbs";
import {
  QUESTION_INITIAL_VALUES,
  MAX_OPTIONS,
  OPTION_VALUE,
  QUESTION_VALIDATION_SCHEMA,
} from "./constant";
import QuestionInput from "./Input";
import Option from "./Option";

const QuestionForm = ({
  questionNumber,
  quizId,
  t,
  handleSubmit,
  isSaveLoading,
  isSaveNextLoading,
  isSaveNextbutton,
  correctOption,
  setCorrectOption,
  showBreadcrumbs = true,
  initialQuestion = QUESTION_INITIAL_VALUES,
}) => {
  const [formValues, setFormValues] = useState(QUESTION_INITIAL_VALUES);

  useEffect(() => {
    if (initialQuestion) {
      setFormValues({
        ...initialQuestion,
        options: initialQuestion.options ?? [],
      });
    }
  }, [initialQuestion]);

  if (!initialQuestion) {
    return <PageLoader />;
  }

  return (
    <Formik
      enableReinitialize
      initialValues={formValues}
      validationSchema={QUESTION_VALIDATION_SCHEMA}
      onSubmit={values => handleSubmit(values, "save")}
    >
      {({
        values,
        isValid,
        dirty,
        setFieldValue,
        setTouched,
        errors,
        touched,
      }) => (
        <Form className="flex flex-col space-y-8">
          {showBreadcrumbs && (
            <Breadcrumbs {...{ quizId, questionNumber, t }} />
          )}
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
                        setCorrectOption: newIndex => {
                          setCorrectOption(newIndex);
                          setFieldValue(
                            `options[${newIndex}].is_correct`,
                            true
                          );
                          setTouched(`options[${newIndex}].is_correct`, true);
                        },
                      }}
                    />
                  ))}
                </div>
                {typeof errors.options === "string" && touched.options && (
                  <div className="text-sm text-red-500">
                    {t("validation.optionsMustBeUnique")}
                  </div>
                )}
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
              disabled={!isValid || !dirty}
              label={t("button.save")}
              loading={isSaveLoading}
              type="button"
              onClick={() => handleSubmit(values, "save")}
            />
            {isSaveNextbutton && (
              <Button
                disabled={!isValid || !dirty}
                label={t("button.saveNext")}
                loading={isSaveNextLoading}
                style="secondary"
                type="button"
                onClick={() => handleSubmit(values, "saveNext")}
              />
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default QuestionForm;
