import React, { useState, useEffect, useMemo } from "react";

import { capitalize, isNotEmpty } from "@bigbinary/neeto-cist";
import useQueryParams from "@bigbinary/neeto-commons-frontend/react-utils/useQueryParams";
import { buildUrl } from "@bigbinary/neeto-commons-frontend/utils";
import { Typography, Button, Pagination, NoData } from "neetoui/index";
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
import PageLoader from "../commons/PageLoader";

const Dashboard = () => {
  const [isSidePaneOpen, setIsSidePaneOpen] = useState(false);
  const { t } = useTranslation();
  const history = useHistory();

  const { status, page, search, category } = useQueryParams();

  const {
    selectedRows,
    selectedRowKeys,
    setSelectedRows,
    setSelectedRowKeys,
    clearSelections,
  } = useQuizSelectionStore();

  const setStatusCounts = useQuizStatsStore(state => state.setStatusCounts);

  const { data = {}, isLoading } = useFetchQuizzes({
    status,
    page,
    search,
    category,
  });
  const { quizzes = [], totalSize = 0, statusCounts = {} } = data.data || {};

  const { mutate: updateQuiz } = useUpdateQuiz();
  const { mutate: cloneQuiz } = useCloneQuiz();
  const { mutate: deleteQuiz, isDeletePending } = useDeleteQuiz();

  const memoizedStatusCounts = useMemo(() => statusCounts, [statusCounts]);

  useEffect(() => {
    setStatusCounts(memoizedStatusCounts);
  }, [memoizedStatusCounts, setStatusCounts]);

  const handleQuizNavigate = quizId => {
    history.push(buildUrl(routes.quiz.create, { quizId }));
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

  const handleClearFilter = key => {
    const newQuery = { status, search, category };
    delete newQuery[key];
    history.push(buildUrl(routes.admin, newQuery));
  };

  if (isLoading) return <PageLoader />;

  return (
    <div className="flex h-full w-full flex-1 flex-col overflow-auto p-10 transition-all duration-300">
      <div className="flex justify-between p-6">
        <Typography style="h1">
          {t("quiz.title", { title: capitalize(status || t("quiz.all")) })}
        </Typography>
        <div className="flex items-center justify-center space-x-3">
          <SearchInput clearSelections={clearSelections} searchKey={search} />
          <Button
            className="bg-blue-600"
            label={t("button.addQuiz")}
            style="primary"
            onClick={() => setIsSidePaneOpen(true)}
          />
        </div>
      </div>
      <div className="custom-table ant-table-thead h-full w-full overflow-auto p-4">
        {isNotEmpty(quizzes) ? (
          <Table
            category={category}
            data={quizzes}
            handleClone={handleClone}
            handleDelete={handleDelete}
            handlePublish={handlePublish}
            handleQuizNavigate={handleQuizNavigate}
            handleclearFilter={handleClearFilter}
            history={history}
            isDeletePending={isDeletePending}
            search={search}
            selectedRowKeys={selectedRowKeys}
            selectedRows={selectedRows}
            setSelectedRowKeys={setSelectedRowKeys}
            setSelectedRows={setSelectedRows}
            status={status}
            totalSize={totalSize}
          />
        ) : (
          <div className="flex h-full w-full flex-1 items-center justify-center">
            <NoData
              className="m-auto"
              title={t("response.error.quizzesNotFound")}
            />
          </div>
        )}
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
