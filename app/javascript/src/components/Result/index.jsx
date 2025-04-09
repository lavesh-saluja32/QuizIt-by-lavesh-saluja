import React, { useEffect, useState } from "react";

import PageLoader from "components/commons/PageLoader";
import { useTranslation } from "react-i18next";
import { useHistory, useParams } from "react-router-dom";

import Header from "./Header";
import QuestionCard from "./QuestionCard";
import ScoreCards from "./Scores";

import { useUpdateSubmission } from "../../hooks/reactQuery/public/useSubmissions";
import useQuizStore from "../../stores/useQuizStore";

const Result = () => {
  const { submissionId } = useParams();

  const { selectedAnswers } = useQuizStore();

  const { t } = useTranslation();

  const { mutate: updateSubmission, isPending } = useUpdateSubmission();

  const [questions, setQuestions] = useState([]);
  const [submissionResult, setSubmissionResult] = useState({});

  useEffect(() => {
    if (submissionId) {
      updateSubmission(
        {
          submissionId,
          payload: {
            answers: selectedAnswers,
          },
        },
        {
          onSuccess: response => {
            setQuestions(response.data.questions);
            setSubmissionResult(response.data.submission);
          },
        }
      );
    }
  }, [submissionId]);

  const history = useHistory();

  if (isPending) <PageLoader />;

  return (
    <div className="h-full w-full overflow-y-scroll">
      <div className="m-auto mt-[10vh] w-3/4 ">
        <Header {...{ t, history }} />
        <ScoreCards {...submissionResult} />
        {questions.map((question, index) => (
          <QuestionCard {...{ ...question, index, t }} key={question.id} />
        ))}
      </div>
    </div>
  );
};

export default Result;
