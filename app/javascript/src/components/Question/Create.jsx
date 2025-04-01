import React from "react";

import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import QuestionForm from "./Form";

import PageHeader from "../Quiz/PageHeader";

const Create = ({ questionNumber }) => {
  const { quizId } = useParams();
  const { t } = useTranslation();

  return (
    <div className="w-screen bg-slate-100">
      <PageHeader />
      <div className="flex h-[80vh] w-full items-center justify-center">
        <QuestionForm {...{ questionNumber, quizId, t }} />
      </div>
    </div>
  );
};

export default Create;
