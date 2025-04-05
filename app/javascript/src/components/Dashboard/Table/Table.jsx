import React, { useState } from "react";

import SubHeader from "@bigbinary/neeto-molecules/SubHeader";
import { Table as NeetoTable, Tooltip, Typography } from "@bigbinary/neetoui";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import TableDropdown from "./ActionDropdown";

import { useBulkDelete } from "../../../hooks/reactQuery/useQuizzes";
import useColumnStore from "../../../stores/useColumnStore";
import { formatDate } from "../../../utils/formatDate";
import Status from "../../commons/Status";
import DeleteAlert from "../DeleteAlert";
import RightBlock from "../RightBlock";
import SubHeaderContent from "../SubHeaderContent";

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
  totalSize,
  history,
  selectedRows,
}) => {
  const { t } = useTranslation();
  const [quizToDelete, setQuizToDelete] = useState("");
  const [deleteAllAlert, setDeleteAllAlert] = useState(false);
  const handleSelect = (selectedRowKeys, selectedRows) => {
    setSelectedRowKeys(selectedRowKeys);
    setSelectedRows(selectedRows);
  };

  const { visibleColumns } = useColumnStore();

  const getfilteredColumns = () =>
    columns.filter(
      column => visibleColumns[column.key] || column.key === "action"
    );

  const { mutate: bulkDeleteQuiz } = useBulkDelete();

  const handleBulkDelete = () => {
    bulkDeleteQuiz(
      selectedRows.map(row => row.id),
      {
        onSuccess: () => {
          setDeleteAllAlert(false);
          setSelectedRowKeys([]);
          setSelectedRows([]);
        },
      }
    );
  };

  const columns = [
    {
      dataIndex: "name",
      key: "name",
      title: t("quiz.name"),
      render: (text, record) => (
        <Tooltip content={text} disabled={text.length <= 20} position="top">
          <Link
            className="block text-blue-400"
            onClick={() => handleQuizNavigate(record.id)}
          >
            <Typography className="max-w-xs truncate" style="body2">
              {text.length > 20 ? `${text.slice(0, 20)}...` : text}
            </Typography>
          </Link>
        </Tooltip>
      ),
    },
    {
      dataIndex: "submissionCount",
      key: "submissions",
      title: t("quiz.submissions"),
      width: 250,
    },
    {
      dataIndex: "createdAt",
      key: "createdAt",
      title: t("quiz.createdOn"),
      render: created_at => formatDate(created_at),
    },
    {
      dataIndex: "status",
      key: "status",
      title: t("quiz.status"),
      render: status => <Status text={status} />,
    },
    {
      dataIndex: "categoryName",
      key: "category",
      title: t("quiz.category"),
    },
    {
      dataIndex: "action",
      key: "action",
      title: "",
      render: (_, record) => (
        <TableDropdown
          {...{
            record,
            handleDelete,
            handlePublish,
            t,
            handleClone,
            setQuizToDelete,
          }}
        />
      ),
    },
  ];

  return (
    <>
      <SubHeader
        rightActionBlock={<RightBlock />}
        leftActionBlock={
          <SubHeaderContent
            {...{
              category,
              search,
              status,
              totalSize,
              history,
              t,
              selectedRows,
              setDeleteAllAlert,
            }}
          />
        }
      />
      <NeetoTable
        enableColumnResize
        rowSelection
        bordered={false}
        columnData={getfilteredColumns()}
        dataSource={data}
        scroll={{ x: true }}
        selectedRowKeys={selectedRowKeys}
        onRowSelect={handleSelect}
      />
      <DeleteAlert
        {...{ setDeleteAllAlert, handleBulkDelete, selectedRows }}
        isDeleteAll={deleteAllAlert}
        isDeletePending={isDeletePending}
        isOpen={!!quizToDelete || deleteAllAlert}
        quizId={quizToDelete?.id}
        quizName={quizToDelete?.name}
        setIsOpen={setQuizToDelete}
        handleDelete={() => {
          handleDelete(quizToDelete.id);
          setQuizToDelete("");
        }}
      />
    </>
  );
};

export default Table;
