import React from "react";

import { Table as NeetoTable } from "@bigbinary/neetoui";
import { useTranslation } from "react-i18next";

import getColumns from "./tableColumns";

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

  return (
    <NeetoTable
      enableColumnResize
      rowSelection
      bordered={false}
      dataSource={data}
      scroll={{ x: true }}
      selectedRowKeys={selectedRowKeys}
      columnData={getColumns({
        t,
        handleDelete,
        handlePublish,
        handleQuizNavigate,
      })}
      onRowSelect={handleSelect}
    />
  );
};

export default Table;
