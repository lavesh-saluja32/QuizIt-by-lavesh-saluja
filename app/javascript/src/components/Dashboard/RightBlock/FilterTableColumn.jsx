import React from "react";

import { Column } from "@bigbinary/neeto-icons";
import { Dropdown, Checkbox } from "neetoui/index";
import { useTranslation } from "react-i18next";
import useColumnStore from "stores/useQuizColumnStore";

import { columns } from "./constant";

const FilterTableColumn = () => {
  const { Menu, MenuItem } = Dropdown;
  const { t } = useTranslation();
  const { visibleColumns, setVisibleColumn } = useColumnStore();

  return (
    <Dropdown
      buttonStyle="secondary"
      className="space-y-3 p-4"
      closeOnSelect={false}
      icon={Column}
    >
      <Menu className="space-y-5">
        {columns.map(({ label, key }) => (
          <MenuItem key={key}>
            <Checkbox
              checked={key === "name" ? true : visibleColumns[key]}
              disabled={key === "name"}
              label={t(label)}
              onChange={() => setVisibleColumn(key)}
            />
          </MenuItem>
        ))}
      </Menu>
    </Dropdown>
  );
};

export default FilterTableColumn;
