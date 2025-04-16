import React from "react";

import { withT } from "@bigbinary/neeto-commons-frontend/react-utils";
import { Delete } from "@bigbinary/neeto-icons";
import Search from "@bigbinary/neeto-molecules/Search";
import { Button, Dropdown } from "neetoui";
import { Trans } from "react-i18next";

const BulkActions = ({
  t,
  selectedRows,
  totalSize,
  handleBulkUpdate,
  categories,
  setCategorySearchValue,
  setDeleteAllAlert,
}) => {
  if (!selectedRows.length || totalSize === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-4">
      <Trans
        components={{ strong: <strong /> }}
        values={{ selectedRowsSize: selectedRows.length, totalSize }}
        i18nKey={
          selectedRows.length > 1
            ? "subheader.filters.selectedRows"
            : "subheader.filters.selectedRow"
        }
      />
      <Dropdown buttonStyle="secondary" label={t("button.changeStatus")}>
        <Dropdown.Menu>
          {["published", "draft"].map(status => (
            <Dropdown.MenuItem key={status}>
              <Dropdown.MenuItem.Button
                className="text-black"
                onClick={() => handleBulkUpdate({ status })}
              >
                {t(`quiz.${status}`)}
              </Dropdown.MenuItem.Button>
            </Dropdown.MenuItem>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      <Dropdown
        buttonStyle="secondary"
        className="p-4"
        closeOnSelect={false}
        label={t("button.changeCategory")}
      >
        <Dropdown.Menu className="space-y-2">
          <Dropdown.MenuItem>
            <Search
              placeholder={t("placeholder.searchCategory")}
              onSearch={setCategorySearchValue}
            />
          </Dropdown.MenuItem>
          {categories.map(({ id, name }) => (
            <Dropdown.MenuItem key={id}>
              <Dropdown.MenuItem.Button
                onClick={() => handleBulkUpdate({ categoryId: id })}
              >
                {name}
              </Dropdown.MenuItem.Button>
            </Dropdown.MenuItem>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      <Button
        icon={Delete}
        label={t("button.delete")}
        style="danger"
        onClick={() => setDeleteAllAlert(true)}
      />
    </div>
  );
};

export default withT(BulkActions);
