import React from "react";

import { MenuHorizontal } from "@bigbinary/neeto-icons";
import {
  Table as NeetoTable,
  Tooltip,
  Dropdown,
  Typography,
} from "@bigbinary/neetoui";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { formatDate } from "../../utils/formatDate";
import Status from "../commons/Status";

const Table = ({
  data,
  handleDelete,
  handlePublish,
  setSelectedRows,
  selectedRowKeys,
  setSelectedRowKeys,
  handleQuizNavigate,
}) => {
  const { t } = useTranslation();

  const handleSelect = (selectedRowKeys, selectedRows) => {
    setSelectedRowKeys(selectedRowKeys);
    setSelectedRows(selectedRows);
  };

  const columns = [
    {
      dataIndex: "name",
      key: "name",
      title: t("quiz.name"),
      render: (text, record) => (
        <Tooltip content={text} position="top">
          <Typography className="max-w-xs truncate" style="body2">
            <Link onClick={() => handleQuizNavigate(record.id)}>{text}</Link>
          </Typography>
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
        <Dropdown
          buttonStyle="text"
          icon={MenuHorizontal}
          position="bottom-end"
          strategy="fixed"
        >
          <Dropdown.Menu>
            <Dropdown.MenuItem.Button
              className="text-black"
              style="link"
              onClick={() =>
                handlePublish(
                  record.id,
                  record.status === "Published" ? "unpublished" : "published"
                )
              }
            >
              {record.status === "Published"
                ? t("quiz.unpublish")
                : t("quiz.publish")}
            </Dropdown.MenuItem.Button>
            <Dropdown.Divider />
            <Dropdown.MenuItem.Button
              label={t("button.delete")}
              style="danger"
              type="delete"
              onClick={() => handleDelete(record.id)}
            >
              {t("button.delete")}
            </Dropdown.MenuItem.Button>
          </Dropdown.Menu>
        </Dropdown>
      ),
    },
  ];

  const handleRowClick = (_, record) => {
    handleQuizNavigate(record.id);
  };

  return (
    <NeetoTable
      enableColumnResize
      rowSelection
      bordered={false}
      columnData={columns}
      dataSource={data}
      scroll={{ x: true }}
      selectedRowKeys={selectedRowKeys}
      onRowClick={handleRowClick}
      onRowSelect={handleSelect}
    />
  );
};

export default Table;
