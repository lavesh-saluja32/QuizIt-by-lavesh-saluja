import React from "react";

import useQueryParams from "@bigbinary/neeto-commons-frontend/react-utils/useQueryParams";
import { buildUrl } from "@bigbinary/neeto-commons-frontend/utils";
import { Typography } from "@bigbinary/neetoui";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { useRouteMatch, useHistory } from "react-router-dom";
import { routes } from "routes";
import useQuizSelectionStore from "stores/useQuizSelectionStore";
import useQuizStatsStore from "stores/useQuizStatsStore";

import { DEFAULT_QUIZ_COUNT } from "../constant";

const MenuFilterList = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const queryParams = useQueryParams();
  const { clearSelections } = useQuizSelectionStore();
  const { statusCounts } = useQuizStatsStore();
  const filterStatus = queryParams.status;
  const homePage = useRouteMatch(routes.admin);

  const handleFilterNavigation = status => {
    const query = status !== "all" ? { status } : {};
    history.push(buildUrl(routes.admin, query));
    clearSelections();
  };

  const filterItems = [
    {
      label: t("button.filter.all"),
      status: "all",
      count:
        Number(statusCounts?.draft || DEFAULT_QUIZ_COUNT) +
        Number(statusCounts?.published || DEFAULT_QUIZ_COUNT),
    },
    {
      label: t("button.filter.published"),
      status: "published",
      count: statusCounts.published || DEFAULT_QUIZ_COUNT,
    },
    {
      label: t("button.filter.draft"),
      status: "draft",
      count: statusCounts.draft || DEFAULT_QUIZ_COUNT,
    },
  ];

  return (
    <div
      className={classNames(
        "flex flex-col overflow-hidden transition-all duration-300",
        {
          "max-h-0 opacity-0": !homePage?.isExact,
          "mt-2 max-h-[300px] space-y-3 opacity-100": homePage?.isExact,
        }
      )}
    >
      {filterItems.map(({ label, status, count }) => (
        <div
          key={status}
          className={classNames(
            "flex cursor-pointer items-center justify-between rounded p-2 hover:bg-gray-100",
            {
              "bg-gray-100":
                (status === "all" && !filterStatus) || filterStatus === status,
            }
          )}
          onClick={() => handleFilterNavigation(status)}
        >
          <Typography>{label}</Typography>
          <Typography>{count}</Typography>
        </div>
      ))}
    </div>
  );
};

export default MenuFilterList;
