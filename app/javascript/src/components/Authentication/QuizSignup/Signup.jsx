import React from "react";

import { buildUrl } from "@bigbinary/neeto-commons-frontend/utils";
import PageLoader from "components/commons/PageLoader";
import { useShowQuiz } from "hooks/reactQuery/public/useQuizzes";
import { useCreateSubmission } from "hooks/reactQuery/public/useSubmissions";
import { Typography, Button } from "neetoui";
import { Form, Input } from "neetoui/formik";
import { useTranslation } from "react-i18next";
import { useParams, useHistory } from "react-router-dom";
import { routes } from "routes";
import useQuizStore from "stores/useQuizStore";
import useSubmissionStore from "stores/useSubmissionStore";

import {
  QUIZ_SIGNUP_FORM_INITIAL_VALUES,
  getQuizSignupFormValidationSchema,
} from "./constants";

const Signup = () => {
  const { t } = useTranslation();

  const { setSubmissionId } = useSubmissionStore();

  const { resetQuiz } = useQuizStore();

  const { quizSlug } = useParams();

  const { data: { data: quiz = {} } = {} } = useShowQuiz(quizSlug);

  const history = useHistory();

  const handleSubmit = values => {
    createSubmission(
      {
        name: `${values.firstName} ${values.lastName}`,
        quizSlug,
        email: values.email,
      },
      {
        onSuccess: response => {
          const submissionId = response.data.submissionId;
          setSubmissionId(submissionId);
          resetQuiz();
          history.push(buildUrl(routes.quiz.attempt, { quizSlug }));
        },
      }
    );
  };

  const { mutate: createSubmission, isPending } = useCreateSubmission();

  if (isPending) <PageLoader />;

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="w-1/2 space-y-32">
        <div className="text-left">
          <Typography style="h1">{quiz.name}</Typography>
        </div>
        <div className="w-full">
          <Form
            className="space-y-16"
            formikProps={{
              initialValues: QUIZ_SIGNUP_FORM_INITIAL_VALUES,
              validationSchema: getQuizSignupFormValidationSchema(t),
              onSubmit: handleSubmit,
            }}
          >
            <div className="flex items-center justify-center space-x-4">
              <Input
                required
                label={t("auth.fullName")}
                name="firstName"
                placeholder={t("auth.placeholders.name")}
                type="name"
              />
              <Input
                required
                className="mt-5"
                label=""
                name="lastName"
                type="name"
              />
            </div>
            <Input
              required
              label={t("auth.emailAddress")}
              name="email"
              placeholder={t("auth.placeholders.email")}
              type="email"
            />
            <Button
              className="bg-blue-600"
              label={t("button.startQuiz")}
              type="submit"
            />
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
