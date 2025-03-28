import React from "react";

import { Pane, Typography } from "@bigbinary/neetoui";
import { Form, Input, Select, Button } from "@bigbinary/neetoui/formik";
import { useTranslation } from "react-i18next";

import { QUIZ_VALIDATION_SCHEMA } from "./constants";

import useCreateQuiz from "../../../hooks/useCreateQuiz";
import useCategories from "../../../hooks/useFetchCategories";

const QuizForm = ({ isOpen, setIsOpen }) => {
  const { Header, Body, Footer } = Pane;
  const { t } = useTranslation();
  const { mutate: createQuiz, isPending } = useCreateQuiz(); // React Query mutation hook
  const handleSubmit = values => {
    createQuiz(
      { ...values, category_id: values.category.value },
      {
        onSuccess: () => setIsOpen(false),
      }
    );
  };

  const { data: { data: { categories = [] } = {} } = {} } = useCategories();

  return (
    <Form
      formikProps={{
        initialValues: { email: "" },
        validationSchema: QUIZ_VALIDATION_SCHEMA,
        onSubmit: handleSubmit,
      }}
    >
      {({ dirty, resetForm }) => (
        <Pane isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <Header>
            <Typography style="h1">{t("button.addQuiz")}</Typography>
          </Header>
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
                onClick={() => {
                  resetForm();
                }}
              />
            </div>
          </Footer>
        </Pane>
      )}
    </Form>
  );
};

export default QuizForm;
