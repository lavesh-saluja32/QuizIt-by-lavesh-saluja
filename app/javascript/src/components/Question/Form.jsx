import React, { useState } from "react";

import { Formik, Form, FieldArray } from "formik";
import { Button } from "neetoui";

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

const QuestionForm = ({ questionNumber, quizId, t }) => {
  const [correctOption, setCorrectOption] = useState(DEFAULT_CORRECT_OPTION);

  const handleSubmit = () => {
    // console.log(values);
  };

  return (
    <Formik
      initialValues={QUESTION_INITIAL_VALUES}
      validationSchema={QUESTION_VALIDATION_SCHEMA}
      onSubmit={handleSubmit}
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
              type="submit"
            />
            <Button label={t("button.saveNext")} style="secondary" />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default QuestionForm;
