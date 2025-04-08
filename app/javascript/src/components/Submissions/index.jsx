import React from "react";

import { useParams } from "react-router-dom";

import Header from "./Header";
import Subheader from "./Subheader";
import Table from "./Table";

import { useShowQuiz } from "../../hooks/reactQuery/useQuizzes";
import { useFetchSubmissions } from "../../hooks/reactQuery/useSubmissions";
import PageHeader from "../Quiz/PageHeader";

const Submissions = () => {
  const { quizId } = useParams();
  const { data: { data: { quiz = {} } = {} } = {} } = useShowQuiz(quizId);

  const { data: { data: { submissions = [] } = {} } = {}, isLoading } =
    useFetchSubmissions({ quizId });

  return (
    <div className="flex h-full w-screen flex-col overflow-hidden bg-slate-100">
      <PageHeader {...{ quizId, quiz }} />
      <div className="p-10">
        <Header />
        <Subheader />
        <Table data={submissions} {...{ isLoading }} />
      </div>
    </div>
  );
};

export default Submissions;
