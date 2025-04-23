import React from "react";

import Status from "components/commons/Status";
import { Table as NeetoTable, Spinner } from "neetoui/index";

import { getColumns } from "./columns";

import useColumnStore from "../../../stores/useSubmissionColumnStore";

const Table = ({ data = [], isLoading }) => {
  const { visibleColumns } = useColumnStore();

  const render = text => <Status {...{ text }} />;

  return (
    <div className="custom-table ant-table-thead h-[70vh] overflow-y-scroll">
      {!isLoading ? (
        <NeetoTable
          enableColumnResize
          bordered={false}
          columnData={getColumns(visibleColumns, render)}
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
