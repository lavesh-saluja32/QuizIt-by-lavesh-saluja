import React from "react";

import { Tooltip, Typography } from "@bigbinary/neetoui";
import Status from "components/commons/Status";
import i18next from "i18next";
import { Link } from "react-router-dom";
import { formatDate } from "utils/formatDate";

import TableDropdown from "./ActionDropdown";

export const getColumnsData = ({
  handleQuizNavigate,
  handleDelete,
  handlePublish,
  handleClone,
  setQuizToDelete,
}) => [
  {
    dataIndex: "name",
    key: "name",
    title: i18next.t("quiz.name"),
    render: (text, record) => (
      <Tooltip
        content={text}
        disabled={!text || text.length <= 0}
        position="top"
      >
        <div className="w-full">
          <Link
            className="block w-full text-blue-400"
            onClick={() => handleQuizNavigate(record.id)}
          >
            <Typography className="w-full truncate" style="body2">
              {text}
            </Typography>
          </Link>
        </div>
      </Tooltip>
    ),
  },
  {
    dataIndex: "submissionCount",
    key: "submissions",
    title: i18next.t("quiz.submissions"),
    width: 250,
  },
  {
    dataIndex: "createdAt",
    key: "createdAt",
    title: i18next.t("quiz.createdOn"),
    render: created_at => formatDate(created_at),
  },
  {
    dataIndex: "status",
    key: "status",
    title: i18next.t("quiz.status"),
    render: status => <Status text={status} />,
  },
  {
    dataIndex: "categoryName",
    key: "category",
    title: i18next.t("quiz.category"),
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
          t: i18next.t,
          handleClone,
          setQuizToDelete,
        }}
      />
    ),
  },
];
