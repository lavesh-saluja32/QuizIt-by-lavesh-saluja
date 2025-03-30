import React, { useState } from "react";

import useQueryParams from "@bigbinary/neeto-commons-frontend/react-utils/useQueryParams";
import PageLoader from "components/commons/PageLoader";
import { Typography, Button, Pagination } from "neetoui/index";
import { useTranslation } from "react-i18next";

import SidePane from "./QuizSidepane";
import { DEFAULT_PAGE_SIZE } from "./QuizSidepane/constants";
import SearchInput from "./SearchInput";
import Table from "./Table";

import { useFetchQuizzes } from "../../hooks/useQuizzes";

const Dashboard = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isSidePaneOpen, setIsSidePaneOpen] = useState(false);
  const { t } = useTranslation();

  const { status, page, search } = useQueryParams();

  const {
    data: { data: { quizzes = [], total_size: totalSize = 0 } = {} } = {},
    isLoading,
  } = useFetchQuizzes({ status, page, search });
  if (isLoading) return <PageLoader />;

  return (
    <div className="flex h-screen w-full flex-grow flex-col p-10 transition-all duration-300">
      <div className="flex w-full justify-between p-6">
        <Typography style="h1">{t("quiz.title")}</Typography>
        <div className="flex items-center justify-center space-x-3">
          <SearchInput searchKey={search} />
          <Button
            className="bg-blue-600"
            label={t("button.addQuiz")}
            style="primary"
            onClick={() => setIsSidePaneOpen(true)}
          />
        </div>
      </div>
      <div className="table flex-grow overflow-auto p-4">
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
      <div className="mt-4">
        <Pagination
          count={totalSize}
          pageNo={Number(page) || 1}
          pageSize={DEFAULT_PAGE_SIZE}
        />
      </div>
      <SidePane isOpen={isSidePaneOpen} setIsOpen={setIsSidePaneOpen} />
    </div>
  );
};

export default Dashboard;
