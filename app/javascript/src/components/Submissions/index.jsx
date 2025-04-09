import React, { useState, useEffect } from "react";

import useQueryParams from "@bigbinary/neeto-commons-frontend/react-utils/useQueryParams";
import { useParams } from "react-router-dom";

import Header from "./Header";
import Progress from "./Progress";
import Subheader from "./Subheader";
import Table from "./Table";

import createConsumer from "../../channels/consumer";
import { subscribeToReportDownloadChannel } from "../../channels/reportDownloadChannel";
import {
  useShowQuiz,
  useCreateReport,
  useDownloadReport,
} from "../../hooks/reactQuery/useQuizzes";
import { useFetchSubmissions } from "../../hooks/reactQuery/useSubmissions";
import PageHeader from "../Quiz/PageHeader";

const Submissions = () => {
  const [isLoadingReport, setIsLoadingReport] = useState(false);
  const [progress, setProgress] = useState(0);

  const consumer = createConsumer();
  const { quizId } = useParams();
  const params = useQueryParams();
  const { data: { data: { quiz = {} } = {} } = {} } = useShowQuiz(quizId);
  const { data: { data: { submissions = [] } = {} } = {}, isLoading } =
    useFetchSubmissions({ quizId, params });

  const { mutate: generateReport } = useCreateReport();

  const { mutate: downloadReport } = useDownloadReport();

  const generatePdf = () => {
    setIsLoadingReport(true);
    subscribeToReportDownloadChannel({
      consumer,
      setProgress,
      generatePdf: () => generateReport(quizId),
    });
  };

  const download = () => {
    downloadReport(quizId, { onSuccess: () => setIsLoadingReport(false) });
  };

  useEffect(
    () => () => {
      consumer.disconnect();
    },
    []
  );

  useEffect(() => {
    if (progress === 100) {
      download();
    }
  }, [progress]);

  return (
    <div className="flex h-full w-screen flex-col overflow-hidden bg-slate-100">
      <PageHeader {...{ quizId, quiz }} />
      <div className="p-10">
        <Header />
        <Subheader {...{ generatePdf }} />
        <Table data={submissions} {...{ isLoading }} />
      </div>
      <Progress isLoading={isLoadingReport} {...{ progress }} />
    </div>
  );
};

export default Submissions;
