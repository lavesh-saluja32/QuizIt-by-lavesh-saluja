import React, { useState } from "react";

import useQueryParams from "@bigbinary/neeto-commons-frontend/react-utils/useQueryParams";
import { buildUrl } from "@bigbinary/neeto-commons-frontend/utils";
import PageLoader from "components/commons/PageLoader";
import { Typography, Button, Pagination } from "neetoui/index";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import SidePane from "./QuizSidepane";
import { DEFAULT_PAGE_SIZE } from "./QuizSidepane/constants";
import SearchInput from "./SearchInput";
import Table from "./Table";

import { useFetchQuizzes } from "../../hooks/reactQuery/useQuizzes";
import { routes } from "../../routes";

const Dashboard = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isSidePaneOpen, setIsSidePaneOpen] = useState(false);

  const { t } = useTranslation();

  const history = useHistory();

  const { status, page, search } = useQueryParams();

  const {
    data: { data: { quizzes = [], totalSize = 0 } = {} } = {},
    isLoading,
  } = useFetchQuizzes({ status, page, search });

  if (isLoading) return <PageLoader />;

  const handleQuizNavigate = quizId => {
    const url = buildUrl(routes.quiz.create, { quizId });
    history.push(url);
  };

  return (
    <div className="h-screen flex-1 p-10 transition-all duration-300">
      <div className="flex flex-1 justify-between p-6">
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
      <div className="table p-4">
        <Table
          {...{
            data: quizzes,
            selectedRows,
            setSelectedRows,
            selectedRowKeys,
            setSelectedRowKeys,
            handleQuizNavigate,
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
