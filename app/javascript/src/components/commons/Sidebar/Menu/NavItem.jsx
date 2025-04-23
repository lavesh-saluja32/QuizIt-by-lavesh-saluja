import React from "react";

import { withT } from "@bigbinary/neeto-commons-frontend/react-utils";
import { Typography } from "@bigbinary/neetoui";
import classNames from "classnames";
import { List, Settings, Globe } from "neetoicons";
import { NavLink, useLocation } from "react-router-dom";
import { routes } from "routes";

import MenuFilterList from "./FilterList";

const baseItemClass =
  "flex items-center space-x-2 rounded p-2 hover:bg-blue-600 hover:text-white";

const MenuNavItem = ({ t }) => {
  const location = useLocation();
  const isSettingsActive = location.pathname.startsWith("/settings");

  return (
    <div className="mb-4">
      <NavLink
        exact
        activeClassName="active-link"
        className={baseItemClass}
        to={routes.admin}
      >
        <List />
        <Typography className="font-semibold">{t("quiz.heading")}</Typography>
      </NavLink>
      <MenuFilterList />
      <div className="mt-4 space-y-2">
        <NavLink
          to={routes.settings.general}
          className={classNames(baseItemClass, {
            "active-link": isSettingsActive,
          })}
        >
          <Settings />
          <Typography>{t("button.settings")}</Typography>
        </NavLink>
        <a
          className={baseItemClass}
          href={routes.root}
          rel="noopener noreferrer"
          target="_blank"
        >
          <Globe />
          <Typography>{t("button.public")}</Typography>
        </a>
      </div>
    </div>
  );
};

export default withT(MenuNavItem);
