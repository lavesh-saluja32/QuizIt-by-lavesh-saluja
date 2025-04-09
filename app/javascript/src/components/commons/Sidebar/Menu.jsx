import React, { useEffect, useState } from "react";

import useQueryParams from "@bigbinary/neeto-commons-frontend/react-utils/useQueryParams";
import { buildUrl } from "@bigbinary/neeto-commons-frontend/utils";
import { Typography, Button } from "@bigbinary/neetoui";
import classNames from "classnames";
import { List, Settings, Globe } from "neetoicons";
import { useTranslation } from "react-i18next";
import { NavLink, useHistory, useRouteMatch } from "react-router-dom";

import { routes } from "../../../routes";
import useQuizSelectionStore from "../../../stores/useQuizSelectionStore";

const Menu = ({ isExpanded }) => {
  const history = useHistory();
  const queryParams = useQueryParams();
  const [filterStatus, setFilterStatus] = useState(queryParams.status || "");

  const homePage = useRouteMatch(routes.root);

  const { t } = useTranslation();
  const { clearSelections } = useQuizSelectionStore();
  const handleFilterNavigation = () => {
    const query = filterStatus ? { status: filterStatus } : {};
    history.push(buildUrl(routes.root, query));
    clearSelections();
  };

  useEffect(() => {
    handleFilterNavigation();
  }, [filterStatus]);

  return (
    <div
      className={classNames(
        "flex h-full w-full flex-col bg-white p-4 shadow-lg transition-all ",
        {
          " hidden": !isExpanded,
        }
      )}
    >
      <div className="mb-4">
        <NavLink
          exact
          activeClassName="active-link"
          className="flex items-center space-x-2 rounded p-2 hover:bg-blue-600 hover:text-white"
          to="/"
        >
          <List />
          <Typography className="font-semibold">{t("quiz.heading")}</Typography>
        </NavLink>
        <div
          className={classNames(
            "flex flex-col overflow-hidden transition-all duration-300",
            {
              "max-h-0 opacity-0": !homePage?.isExact,
              "mt-2 max-h-[300px] space-y-3 opacity-100": homePage?.isExact,
            }
          )}
        >
          <Button
            style="link"
            className={classNames(
              "flex items-center justify-between rounded p-2 hover:bg-gray-100",
              {
                "bg-gray-100": !filterStatus,
              }
            )}
            onClick={() => setFilterStatus("")}
          >
            <Typography>{t("button.filter.all")}</Typography>
          </Button>
          <Button
            style="link"
            className={classNames(
              "flex items-center justify-between rounded p-2 hover:bg-gray-100",
              {
                "bg-gray-100": filterStatus === "published",
              }
            )}
            onClick={() => setFilterStatus("published")}
          >
            <Typography>{t("button.filter.published")}</Typography>
          </Button>
          <Button
            style="link"
            className={classNames(
              "flex items-center justify-between rounded p-2 hover:bg-gray-100",
              {
                "bg-gray-100": filterStatus === "draft",
              }
            )}
            onClick={() => setFilterStatus("draft")}
          >
            <Typography>{t("button.filter.draft")}</Typography>
          </Button>
        </div>
      </div>
      <div className="space-y-2">
        <NavLink
          activeClassName="active-link"
          className="flex items-center space-x-2 rounded p-2 hover:bg-blue-600 hover:text-white"
          to="/settings"
        >
          <Settings />
          <Typography>{t("button.settings")}</Typography>
        </NavLink>
        <NavLink
          activeClassName="active-link"
          className="flex items-center space-x-2 rounded p-2 hover:bg-blue-600 hover:text-white"
          to={routes.public}
        >
          <Globe />
          <Typography>{t("button.public")}</Typography>
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
