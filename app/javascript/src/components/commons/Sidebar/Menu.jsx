import React from "react";

import useQueryParams from "@bigbinary/neeto-commons-frontend/react-utils/useQueryParams";
import {
  buildUrl,
  getFromLocalStorage,
} from "@bigbinary/neeto-commons-frontend/utils";
import { User } from "@bigbinary/neeto-icons";
import { Typography } from "@bigbinary/neetoui";
import classNames from "classnames";
import { List, Settings, Globe } from "neetoicons";
import { useTranslation } from "react-i18next";
import { NavLink, useHistory, useRouteMatch } from "react-router-dom";

import useLogout from "../../../hooks/reactQuery/useLogout";
import { routes } from "../../../routes";
import useQuizSelectionStore from "../../../stores/useQuizSelectionStore";
import useQuizStatsStore from "../../../stores/useQuizStatsStore";

const Menu = ({ isExpanded }) => {
  const history = useHistory();

  const queryParams = useQueryParams();

  const filterStatus = queryParams.status;

  const { statusCounts } = useQuizStatsStore();

  const homePage = useRouteMatch(routes.root);

  const { t } = useTranslation();

  const { clearSelections } = useQuizSelectionStore();

  const { mutate: logoutUser } = useLogout();

  const handleLogout = () => logoutUser();

  const handleFilterNavigation = status => {
    const query = !(status === "all") ? { status } : {};
    history.push(buildUrl(routes.root, query));
    clearSelections();
  };

  const userName = getFromLocalStorage("authUserName") || "Oliver Smith";
  const userEmail = getFromLocalStorage("authEmail") || "oliver@example.com";

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
          to={routes.root}
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
          <div
            className={classNames(
              "flex w-full cursor-pointer items-center justify-between rounded p-2 hover:bg-gray-100",
              {
                "bg-gray-100": !queryParams.status,
              }
            )}
            onClick={() => handleFilterNavigation("all")}
          >
            <Typography className="text-left">
              {t("button.filter.all")}
            </Typography>
            <Typography className="text-right">
              {statusCounts.draft + statusCounts.published || 0}
            </Typography>
          </div>
          <div
            className={classNames(
              "flex cursor-pointer items-center justify-between rounded p-2 hover:bg-gray-100",
              {
                "bg-gray-100": filterStatus === "published",
              }
            )}
            onClick={() => handleFilterNavigation("published")}
          >
            <Typography>{t("button.filter.published")}</Typography>
            <Typography>{statusCounts.published}</Typography>
          </div>
          <div
            className={classNames(
              "flex cursor-pointer items-center justify-between rounded p-2 hover:bg-gray-100",
              {
                "bg-gray-100": filterStatus === "draft",
              }
            )}
            onClick={() => handleFilterNavigation("draft")}
          >
            <Typography>{t("button.filter.draft")}</Typography>
            <Typography>{statusCounts.draft}</Typography>
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <NavLink
          activeClassName="active-link"
          className="flex items-center space-x-2 rounded p-2 hover:bg-blue-600 hover:text-white"
          to={routes.settings}
        >
          <Settings />
          <Typography>{t("button.settings")}</Typography>
        </NavLink>
        <a
          className="flex items-center space-x-2 rounded p-2 hover:bg-blue-600 hover:text-white"
          href={routes.public}
          rel="noopener noreferrer"
          target="_blank"
        >
          <Globe />
          <Typography>{t("button.public")}</Typography>
        </a>
      </div>
      <div className="mt-auto border-t pt-4">
        <div className="flex items-center space-x-2 p-2">
          <User />
          <div>
            <p className="text-sm font-semibold">{userName}</p>
            <p className="text-xs text-gray-500">{userEmail}</p>
          </div>
        </div>
        <NavLink
          className="flex items-center space-x-2 rounded p-2 text-red-500 hover:bg-gray-100"
          to="/logout"
          onClick={handleLogout}
        >
          <span>←</span>
          <span>Logout</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Menu;
