import React from "react";

import { Pane, Typography, Button } from "@bigbinary/neetoui";
import { Form, Input, Select } from "@bigbinary/neetoui/formik";
import { useTranslation } from "react-i18next";

import { QUIZ_VALIDATION_SCHEMA, QUIZ_INITIAL_VALUES } from "./constants";

import useCategories from "../../../hooks/reactQuery/useFetchCategories";
import { useCreateQuiz } from "../../../hooks/reactQuery/useQuizzes";

const QuizForm = ({ isOpen, setIsOpen }) => {
  const { Header, Body, Footer } = Pane;

  const { t } = useTranslation();

  const { mutate: createQuiz, isPending } = useCreateQuiz();

  const handleSubmit = values => {
    createQuiz(
      { name: values.name, category_id: values.category.value },
      {
        onSuccess: () => setIsOpen(false),
      }
    );
  };

  const { data: { data: { categories = [] } = {} } = {} } = useCategories();

  return (
    <Pane isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <Header>
        <Typography style="h1">{t("button.addQuiz")}</Typography>
      </Header>
      <Form
        formikProps={{
          initialValues: QUIZ_INITIAL_VALUES,
          validationSchema: QUIZ_VALIDATION_SCHEMA,
          onSubmit: handleSubmit,
        }}
      >
        {({ dirty }) => (
          <>
            <Body>
              <div className="flex w-full flex-col space-y-5">
                <Input
                  required
                  className="w-full"
                  label={t("quiz.name")}
                  name="name"
                  placeholder={t("quiz.placeholder")}
                  type="name"
                />
                <Select
                  required
                  className="w-full"
                  label={t("quiz.category")}
                  name="category"
                  placeholder={t("placeholder.selectCategory")}
                  options={categories?.map(category => ({
                    label: category.name,
                    value: category.id,
                  }))}
                />
              </div>
            </Body>
            <Footer>
              <div className="flex space-x-3">
                <Button
                  className="bg-blue-600"
                  disabled={!dirty}
                  label={t("button.save")}
                  loading={isPending}
                  type="submit"
                />
                <Button
                  label={t("button.cancel")}
                  style="secondary"
                  type="reset"
                />
              </div>
            </Footer>
          </>
        )}
      </Form>
    </Pane>
  );
};

export default QuizForm;
