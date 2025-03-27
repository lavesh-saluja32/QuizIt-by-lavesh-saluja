import React from "react";

import { MenuHorizontal } from "@bigbinary/neeto-icons";
import {
  Table as NeetoTable,
  Tooltip,
  Dropdown,
  Typography,
} from "@bigbinary/neetoui";

const Table = ({
  // selectedColumns = [],
  data,
  handleDelete,
  handlePublish,
  setSelectedRows,
  selectedRowKeys,
  setSelectedRowKeys,
}) => {
  const handleSelect = (selectedRowKeys, selectedRows) => {
    setSelectedRowKeys(selectedRowKeys);
    setSelectedRows(selectedRows);
  };
  // const { MenuItem } = Dropdown;
  // const { Button: MenuButton } = MenuItem;

  const columns = [
    {
      dataIndex: "name",
      key: "name",
      title: "Name",
      render: text => (
        <Tooltip content={text} position="top">
          <Typography className="max-w-xs truncate" style="body2">
            {text}
          </Typography>
        </Tooltip>
      ),
      width: 250,
    },
    {
      dataIndex: "submissions",
      key: "submissions",
      title: "Submission Count",
      width: 100,
    },
    {
      dataIndex: "createdOn",
      key: "createdOn",
      title: "Created On",
      width: 150,
    },
    {
      dataIndex: "status",
      key: "status",
      title: "Status",
      render: status => ({ status }),
      width: 100,
    },
    {
      dataIndex: "category",
      key: "category",
      title: "Category",
      width: 150,
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
              {record.status === "Published" ? "Unpublish" : "Publish"}
            </Dropdown.MenuItem.Button>
            <Dropdown.Divider />
            <Dropdown.MenuItem.Button
              label="Delete"
              style="danger"
              type="delete"
              onClick={() => handleDelete(record.id)}
            >
              Delete
            </Dropdown.MenuItem.Button>
          </Dropdown.Menu>
        </Dropdown>
      ),
      width: 50,
    },
  ];

  return (
    <div className="ant-table-thead">
      <NeetoTable
        enableColumnReorder
        rowSelection
        bordered={false}
        columns={columns}
        dataSource={data}
        enableColumnResize={false}
        selectedRowKeys={selectedRowKeys}
        onRowSelect={handleSelect}
      />
    </div>
  );
};
export default Table;
