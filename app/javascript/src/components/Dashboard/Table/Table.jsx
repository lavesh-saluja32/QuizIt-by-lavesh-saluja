import React, { useState } from "react";

import SubHeader from "@bigbinary/neeto-molecules/SubHeader";
import { Table as NeetoTable } from "@bigbinary/neetoui";
import { useBulkDelete, useBulkUpdate } from "hooks/reactQuery/useQuizzes";
import useColumnStore from "stores/useQuizColumnStore";

import { getColumnsData } from "./utils";

import useFetchCategories from "../../../hooks/reactQuery/useFetchCategories";
import DeleteAlert from "../DeleteAlert";
import RightBlock from "../RightBlock";
import SubHeaderContent from "../Subheader";

const Table = ({
  data,
  handleDelete,
  handlePublish,
  setSelectedRows,
  selectedRowKeys,
  setSelectedRowKeys,
  handleQuizNavigate,
  handleClone,
  isDeletePending,
  category,
  search,
  status,
  history,
  selectedRows,
  handleclearFilter,
}) => {
  const [quizToDelete, setQuizToDelete] = useState("");
  const [deleteAllAlert, setDeleteAllAlert] = useState(false);
  const [categorySearchValue, setCategorySearchValue] = useState("");

  const { visibleColumns } = useColumnStore();

  const { data: categoryResponse = {} } = useFetchCategories({
    search: categorySearchValue,
  });

  const categories = categoryResponse.data?.categories || [];

  const { mutate: bulkDeleteQuiz } = useBulkDelete();
  const { mutate: bulkUpdateQuiz } = useBulkUpdate();

  const columns = getColumnsData({
    handleQuizNavigate,
    handleDelete,
    handlePublish,
    handleClone,
    setQuizToDelete,
  });

  const filteredColumns = columns.filter(
    column => visibleColumns[column.key] || column.key === "action"
  );

  const handleSelect = (selectedKeys, selectedRows) => {
    setSelectedRowKeys(selectedKeys);
    setSelectedRows(selectedRows);
  };

  const handleBulkDelete = () => {
    const ids = selectedRows.map(row => row.id);
    bulkDeleteQuiz(ids, {
      onSuccess: () => {
        setDeleteAllAlert(false);
        setSelectedRowKeys([]);
        setSelectedRows([]);
      },
    });
  };

  const handleBulkUpdate = updateParams => {
    const ids = selectedRows.map(row => row.id);
    bulkUpdateQuiz({ ids, ...updateParams });
  };

  const handleSingleDelete = () => {
    handleDelete(quizToDelete.id);
    setQuizToDelete("");
  };

  return (
    <>
      <SubHeader
        rightActionBlock={<RightBlock />}
        leftActionBlock={
          <SubHeaderContent
            {...{
              handleclearFilter,
              category,
              search,
              status,
              totalSize: data.length,
              history,
              selectedRows,
              setDeleteAllAlert,
              handleBulkUpdate,
              setCategorySearchValue,
              categories,
            }}
          />
        }
      />
      <NeetoTable
        enableColumnResize
        rowSelection
        bordered={false}
        columnData={filteredColumns}
        dataSource={data}
        scroll={{ x: true }}
        selectedRowKeys={selectedRowKeys}
        onRowSelect={handleSelect}
      />
      <DeleteAlert
        handleBulkDelete={handleBulkDelete}
        handleDelete={handleSingleDelete}
        isDeleteAll={deleteAllAlert}
        isDeletePending={isDeletePending}
        isOpen={!!quizToDelete || deleteAllAlert}
        quizId={quizToDelete?.id}
        quizName={quizToDelete?.name}
        selectedRows={selectedRows}
        setDeleteAllAlert={setDeleteAllAlert}
        setIsOpen={setQuizToDelete}
      />
    </>
  );
};

export default Table;
