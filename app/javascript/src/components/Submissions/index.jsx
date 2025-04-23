import React, { useState, useEffect } from "react";

import { isNotEmpty } from "@bigbinary/neeto-cist";
import useQueryParams from "@bigbinary/neeto-commons-frontend/react-utils/useQueryParams";
import createConsumer from "channels/consumer";
import { subscribeToReportDownloadChannel } from "channels/reportDownloadChannel";
import PageLoader from "components/commons/PageLoader";
import { NoData } from "neetoui/index";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import Header from "./Header";
import Progress from "./Progress";
import Subheader from "./Subheader";
import Table from "./Table";

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

  const { t } = useTranslation();

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

  if (isLoading) return <PageLoader />;

  return (
    <div className="flex h-full w-screen flex-col overflow-hidden bg-slate-100">
      <PageHeader {...{ quizId, quiz }} />
      <div className="p-10">
        <Header />
        {isNotEmpty(submissions) ? (
          <>
            <Subheader
              {...{ generatePdf, submissionsCount: submissions.length }}
            />
            <Table data={submissions} {...{ isLoading }} />
          </>
        ) : (
          <div className="flex h-full w-full flex-1 items-center justify-center">
            <NoData
              className="m-auto"
              title={t("response.error.submissionsNotFound")}
            />
          </div>
        )}
      </div>
      <Progress isLoading={isLoadingReport} {...{ progress }} />
    </div>
  );
};

export default Submissions;
