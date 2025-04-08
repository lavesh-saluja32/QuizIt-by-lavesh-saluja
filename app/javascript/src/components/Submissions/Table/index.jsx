import React from "react";

import { Table as NeetoTable, Spinner } from "neetoui/index";

import { getColumns } from "./columns";

import useColumnStore from "../../../stores/useSubmissionColumnStore";

const Table = ({ data = [], isLoading }) => {
  const { visibleColumns } = useColumnStore();

  return (
    <div className="custom-table ant-table-thead">
      {!isLoading ? (
        <NeetoTable
          enableColumnResize
          bordered={false}
          columnData={getColumns(visibleColumns)}
          dataSource={data}
        />
      ) : (
        <div className="flex w-full flex-grow items-center justify-center">
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default Table;
