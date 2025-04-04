import React from "react";

import { Tooltip, Typography } from "@bigbinary/neetoui";
import { Link } from "react-router-dom";

import TableDropdown from "./ActionDropdown";

import { formatDate } from "../../../utils/formatDate";
import Status from "../../commons/Status";

const renderNameColumn = (text, record, handleQuizNavigate) => (
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
);

const getColumns = ({ t, handleDelete, handlePublish, handleQuizNavigate }) => [
  {
    dataIndex: "name",
    key: "name",
    title: t("quiz.name"),
    render: (text, record) =>
      renderNameColumn(text, record, handleQuizNavigate),
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
      <TableDropdown {...{ record, handleDelete, handlePublish, t }} />
    ),
  },
];

export default getColumns;
