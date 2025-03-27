import React, { useState } from "react";

import { Typography, Input, Button } from "neetoui/index";
import { useTranslation } from "react-i18next";

import Table from "./Table";

const Dashboard = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const { t } = useTranslation();

  return (
    <div className="h-screen w-screen p-10">
      <div className="flex w-full justify-between p-6">
        <Typography style="h1">{t("quiz.title")}</Typography>
        <div className="flex items-center justify-center space-x-3">
          <Input className="w-[15vw]" placeholder={t("quiz.search")} />
          <Button
            className="bg-blue-600"
            label={t("button.addQuiz")}
            style="primary"
          />
        </div>
      </div>
      <div className="table p-4">
        <Table
          {...{
            data,
            selectedRows,
            setSelectedRows,
            selectedRowKeys,
            setSelectedRowKeys,
          }}
        />
      </div>
    </div>
  );
};

const data = [
  {
    id: 1,
    name: "How do you know the solar system?",
    submissions: 20,
    createdOn: "10 October 2024",
    status: "Published",
    category: "General",
  },
  {
    id: 2,
    name: "Science and Nature Trivia",
    submissions: 12,
    createdOn: "10 October 2024",
    status: "Draft",
    category: "Science",
  },
  {
    id: 3,
    name: "Rails Models",
    submissions: 55,
    createdOn: "10 October 2024",
    status: "Published",
    category: "Ruby on Rails",
  },
  {
    id: 4,
    name: "React Hooks",
    submissions: 34,
    createdOn: "10 October 2024",
    status: "Published",
    category: "React",
  },
  {
    id: 5,
    name: "World Geography",
    submissions: 81,
    createdOn: "10 October 2024",
    status: "Draft",
    category: "Science",
  },
  {
    id: 6,
    name: "Environmental Awareness Quiz",
    submissions: 13,
    createdOn: "10 October 2024",
    status: "Published",
    category: "General",
  },
  {
    id: 7,
    name: "History Quiz",
    submissions: 20,
    createdOn: "10 October 2024",
    status: "Published",
    category: "General",
  },
  {
    id: 8,
    name: "General Knowledge Challenge",
    submissions: 10,
    createdOn: "10 October 2024",
    status: "Draft",
    category: "General",
  },
  {
    id: 9,
    name: "SQL",
    submissions: 0,
    createdOn: "10 October 2024",
    status: "Published",
    category: "SQL",
  },
  {
    id: 10,
    name: "ROR General",
    submissions: 100,
    createdOn: "10 October 2024",
    status: "Published",
    category: "Ruby on Rails",
  },
];

export default Dashboard;
