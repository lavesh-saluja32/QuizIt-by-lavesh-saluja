import { t } from "i18next";

export const getColumns = (visibleColumns, renderers) => {
  const { renderName, renderStatus, renderAction, renderDate } = renderers;

  const allColumns = [
    {
      dataIndex: "name",
      key: "name",
      title: t("quiz.name"),
      render: renderName,
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
      render: renderDate,
    },
    {
      dataIndex: "status",
      key: "status",
      title: t("quiz.status"),
      render: renderStatus,
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
      render: renderAction,
    },
  ];

  return allColumns.filter(column => visibleColumns[column.key]);
};
