import React from "react";

import { Delete } from "@bigbinary/neeto-icons";
import Search from "@bigbinary/neeto-molecules/Search";
import { Typography, Button, Dropdown } from "neetoui";
import { isEmpty } from "ramda";
import { Trans } from "react-i18next";

import { routes } from "../../routes";

const SubHeaderContent = ({
  totalSize,
  search,
  category,
  status,
  history,
  t,
  selectedRows,
  setDeleteAllAlert,
  handleBulkUpdate,
  categories = [],
  setCategorySearchValue,
}) => (
  <div className="flex flex-col space-y-4">
    <div>
      {!isEmpty(selectedRows) && totalSize !== 0 ? (
        <div className="flex items-center space-x-4">
          <Trans
            components={{ strong: <strong className="p-1" /> }}
            values={{ selectedRowsSize: selectedRows.length, totalSize }}
            i18nKey={
              selectedRows.length > 1
                ? "subheader.filters.selectedRows"
                : "subheader.filters.selectedRow"
            }
          />
          <Dropdown buttonStyle="secondary" label={t("button.changeStatus")}>
            <Dropdown.Menu>
              <Dropdown.MenuItem>
                <Dropdown.MenuItem.Button
                  className="text-black"
                  onClick={() => handleBulkUpdate({ status: "published" })}
                >
                  {t("quiz.publish")}
                </Dropdown.MenuItem.Button>
              </Dropdown.MenuItem>
              <Dropdown.MenuItem>
                <Dropdown.MenuItem.Button
                  className="text-black"
                  onClick={() => handleBulkUpdate({ status: "draft" })}
                >
                  {t("quiz.draft")}
                </Dropdown.MenuItem.Button>
              </Dropdown.MenuItem>
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
      ) : (
        <Trans i18nKey="subheader.filters.totalSize" values={{ totalSize }} />
      )}
    </div>
    <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
      {search && (
        <Typography>
          <Trans
            components={{ span: <span className="text-gray-300" /> }}
            i18nKey="subheader.filters.name"
            values={{ search }}
          />
        </Typography>
      )}
      {Array.isArray(category) && category.length > 0 && (
        <Typography>
          <Trans
            components={{ span: <span className="text-gray-300" /> }}
            i18nKey="subheader.filters.category"
            values={{ categories: category.join(", ") }}
          />
        </Typography>
      )}
      {status && status !== "all" && (
        <Typography>
          <Trans
            components={{ span: <span className="text-gray-300" /> }}
            i18nKey="subheader.filters.status"
            values={{ status }}
          />
        </Typography>
      )}
      {(status || Array.isArray(category) || search) && (
        <Button
          label={t("button.filter.clear")}
          style="secondary"
          onClick={() => history.push(routes.root)}
        />
      )}
    </div>
  </div>
);

export default SubHeaderContent;
