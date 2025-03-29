import React from "react";

import useQueryParams from "@bigbinary/neeto-commons-frontend/react-utils/useQueryParams";
import { buildUrl } from "@bigbinary/neeto-commons-frontend/utils";
import { Typography, Button } from "@bigbinary/neetoui";
import classNames from "classnames";
import { List, Settings, Globe } from "neetoicons";
import { useTranslation } from "react-i18next";
import { NavLink, useHistory } from "react-router-dom";

import { routes } from "../../../routes";

const Menu = ({ isExpanded }) => {
  const history = useHistory();

  const { status: filterStatus } = useQueryParams();

  const { t } = useTranslation();
  const handleFilterNavigation = status => {
    const url = status ? buildUrl(routes.root, { status }) : routes.root;
    history.replace(url);
  };

  return (
    <div
      className={classNames(
        "flex h-full w-full flex-col bg-white p-4 shadow-lg transition-all",
        {
          "h-0 w-0 opacity-0": !isExpanded,
        }
      )}
    >
      <div className="mb-4">
        <div className="flex items-center space-x-2 rounded-lg bg-blue-500 p-2 text-white">
          <List />
          <span className="font-semibold">Quizzes</span>
        </div>
        <div className="mt-2 flex flex-col space-y-2 space-y-3">
          <Button
            style="link"
            className={classNames(
              "flex items-center justify-between rounded p-2 hover:bg-gray-100",
              {
                "bg-gray-100": !filterStatus,
              }
            )}
            onClick={() => handleFilterNavigation("")}
          >
            <Typography>{t("button.filter.all")}</Typography>
            {/* <span className="rounded bg-gray-200 px-2 py-1 text-xs text-gray-700">
              30
            </span> */}
          </Button>
          <Button
            style="link"
            className={classNames(
              "flex items-center justify-between rounded p-2 hover:bg-gray-100",
              {
                "bg-gray-100": filterStatus === "published",
              }
            )}
            onClick={() => handleFilterNavigation("published")}
          >
            <Typography>{t("button.filter.published")}</Typography>
            {/* <span className="rounded bg-gray-200 px-2 py-1 text-xs text-gray-700">
              22

            </span> */}
          </Button>
          <Button
            style="link"
            className={classNames(
              "flex items-center justify-between rounded p-2 hover:bg-gray-100",
              {
                "bg-gray-100": filterStatus === "draft",
              }
            )}
            onClick={() => handleFilterNavigation("draft")}
          >
            <Typography>{t("button.filter.draft")}</Typography>
            {/* <span className="rounded bg-gray-200 px-2 py-1 text-xs text-gray-700">
              8
            </span> */}
          </Button>
        </div>
      </div>
      <div className="space-y-2">
        <NavLink
          className="flex items-center space-x-2 rounded p-2 hover:bg-gray-100"
          to="/settings"
        >
          <Settings />
          <span>Settings</span>
        </NavLink>
        <NavLink
          className="flex items-center space-x-2 rounded p-2 hover:bg-gray-100"
          to="/public"
        >
          <Globe />
          <span>Public Page</span>
        </NavLink>
      </div>
      <div className="mt-auto border-t pt-4">
        <div className="flex items-center space-x-2 p-2">
          <img
            alt="Profile"
            className="rounded-full"
            src="https://via.placeholder.com/24"
          />
          <div>
            <p className="text-sm font-semibold">Oliver Smith</p>
            <p className="text-xs text-gray-500">oliver@example.com</p>
          </div>
        </div>
        <NavLink
          className="flex items-center space-x-2 rounded p-2 text-red-500 hover:bg-gray-100"
          to="/logout"
        >
          <span>←</span>
          <span>Logout</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Menu;
