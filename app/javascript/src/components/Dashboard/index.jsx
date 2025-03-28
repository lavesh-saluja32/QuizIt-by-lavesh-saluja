import React, { useState } from "react";

import PageLoader from "components/commons/PageLoader";
import { Typography, Input, Button } from "neetoui/index";
import { useTranslation } from "react-i18next";

import SidePane from "./QuizSidepane";
import Table from "./Table";

import { useFetchQuizzes } from "../../hooks/useQuizzes";

const Dashboard = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isSidePaneOpen, setIsSidePaneOpen] = useState(false);

  const { data: { data: { quizzes = [] } = {} } = {}, isLoading } =
    useFetchQuizzes();
  const { t } = useTranslation();

  if (isLoading) return <PageLoader />;

  return (
    <div className="h-screen w-screen overflow-y-scroll p-10">
      <div className="flex w-full justify-between p-6">
        <Typography style="h1">{t("quiz.title")}</Typography>
        <div className="flex items-center justify-center space-x-3">
          <Input className="w-[15vw]" placeholder={t("quiz.search")} />
          <Button
            className="bg-blue-600"
            label={t("button.addQuiz")}
            style="primary"
            onClick={() => setIsSidePaneOpen(true)}
          />
        </div>
      </div>
      <div className="table p-4">
        <Table
          {...{
            data: quizzes,
            selectedRows,
            setSelectedRows,
            selectedRowKeys,
            setSelectedRowKeys,
          }}
        />
      </div>
      <SidePane isOpen={isSidePaneOpen} setIsOpen={setIsSidePaneOpen} />
    </div>
  );
};

export default Dashboard;
