import { t } from "i18next";

import { formatDate } from "../../../utils/formatDate";

export const getColumns = (visibleColumns, render) => {
  const allColumns = [
    {
      dataIndex: "name",
      key: "name",
      title: t("auth.name"),
    },
    {
      dataIndex: "email",
      key: "email",
      title: t("auth.email"),
    },
    {
      dataIndex: "submissionTime",
      key: "submissionDate",
      title: t("table.submissionDate"),
      render: text => formatDate(text, true),
      width: "10vw",
    },
    {
      dataIndex: "correctAnswers",
      key: "correctAnswers",
      title: t("table.correctAnswers"),
      width: "10vw",
    },
    {
      dataIndex: "wrongAnswers",
      key: "wrongAnswers",
      title: t("table.wrongAnswers"),
      width: "10vw",
    },
    {
      dataIndex: "unanswered",
      key: "unanswered",
      title: t("table.unanswered"),
      width: "10vw",
    },
    {
      dataIndex: "totalQuestions",
      key: "questions",
      title: t("table.questions"),
      width: "10vw",
    },
    {
      dataIndex: "status",
      key: "status",
      title: t("table.status"),
      width: "10vw",
      render,
    },
  ];

  return allColumns.filter(column => visibleColumns[column.key]);
};
