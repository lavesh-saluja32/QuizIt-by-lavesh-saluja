import React, { useState, useEffect, useMemo } from "react";

import useQueryParams from "@bigbinary/neeto-commons-frontend/react-utils/useQueryParams";
import { buildUrl } from "@bigbinary/neeto-commons-frontend/utils";
import PageLoader from "components/commons/PageLoader";
import { Typography, Button, Pagination } from "neetoui/index";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import SidePane from "./QuizSidepane";
import { DEFAULT_PAGE_SIZE, DEFAULT_PAGE } from "./QuizSidepane/constants";
import SearchInput from "./SearchInput";
import Table from "./Table/Table";

import {
  useFetchQuizzes,
  useUpdateQuiz,
  useCloneQuiz,
  useDeleteQuiz,
} from "../../hooks/reactQuery/useQuizzes";
import { routes } from "../../routes";
import useQuizSelectionStore from "../../stores/useQuizSelectionStore";
import useQuizStatsStore from "../../stores/useQuizStatsStore";

const Dashboard = () => {
  const [isSidePaneOpen, setIsSidePaneOpen] = useState(false);

  const { t } = useTranslation();

  const {
    selectedRows,
    selectedRowKeys,
    setSelectedRows,
    setSelectedRowKeys,
    clearSelections,
  } = useQuizSelectionStore();

  const setStatusCounts = useQuizStatsStore(state => state.setStatusCounts);

  const history = useHistory();

  const { status, page, search, category } = useQueryParams();
  const {
    data: {
      data: { quizzes = [], totalSize = 0, statusCounts = {} } = {},
    } = {},
    isLoading,
  } = useFetchQuizzes({ status, page, search, category });

  const memoizedStatusCounts = useMemo(() => statusCounts, [statusCounts]);

  const { mutate: updateQuiz } = useUpdateQuiz();

  const { mutate: cloneQuiz } = useCloneQuiz();

  const { mutate: deleteQuiz, isDeletePending } = useDeleteQuiz();

  const handleQuizNavigate = quizId => {
    const url = buildUrl(routes.quiz.create, { quizId });
    history.push(url);
    clearSelections();
  };

  const handlePublish = ({ quizId, status }) => {
    updateQuiz({ quizId, payload: { status } });
  };

  const handleDelete = quizId => {
    deleteQuiz(quizId);
  };

  const handleClone = quizId => {
    cloneQuiz(quizId);
  };

  useEffect(() => {
    if (memoizedStatusCounts) {
      setStatusCounts(memoizedStatusCounts);
    }
  }, [memoizedStatusCounts]);

  if (isLoading) return <PageLoader />;

  return (
    <div className="flex h-full w-full flex-1 flex-col overflow-auto p-10 transition-all duration-300">
      <div className="flex justify-between p-6">
        <Typography style="h1">{t("quiz.title")}</Typography>
        <div className="flex items-center justify-center space-x-3">
          <SearchInput searchKey={search} {...{ clearSelections }} />
          <Button
            className="bg-blue-600"
            label={t("button.addQuiz")}
            style="primary"
            onClick={() => setIsSidePaneOpen(true)}
          />
        </div>
      </div>
      <div className=" custom-table ant-table-thead h-full w-full overflow-auto p-4">
        <Table
          {...{
            data: quizzes,
            selectedRows,
            setSelectedRows,
            selectedRowKeys,
            setSelectedRowKeys,
            handleQuizNavigate,
            handlePublish,
            handleDelete,
            handleClone,
            isDeletePending,
            category,
            search,
            status,
            totalSize,
            history,
          }}
        />
      </div>
      <div className="mt-4">
        <Pagination
          count={totalSize}
          pageNo={Number(page) || DEFAULT_PAGE}
          pageSize={DEFAULT_PAGE_SIZE}
        />
      </div>
      <SidePane isOpen={isSidePaneOpen} setIsOpen={setIsSidePaneOpen} />
    </div>
  );
};

export default Dashboard;
