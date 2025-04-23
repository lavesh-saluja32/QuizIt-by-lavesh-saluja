import React from "react";

import { NeetoQuiz } from "@bigbinary/neeto-icons/logos";
import classNames from "classnames";
import { Button } from "neetoui";
import { NavLink, useLocation } from "react-router-dom";

import { navItems } from "./utils";

const IconList = ({ isExpanded }) => {
  const location = useLocation();

  return (
    <div
      className={classNames(
        "flex h-full w-full flex-col items-center space-y-2 p-2 pt-3 transition-all",
        { hidden: isExpanded }
      )}
    >
      <div>
        <NeetoQuiz className="rounded-lg bg-blue-600" color="blue" size={60} />
      </div>
      {navItems.map(({ to, icon: Icon, matchPath }, index) => {
        const isActive = matchPath
          ? location.pathname.startsWith(matchPath)
          : location.pathname === to;

        return (
          <NavLink
            exact
            key={index}
            to={to}
            className={classNames("w-full rounded-lg text-center", {
              "active-link-icon": isActive,
            })}
          >
            <Button icon={() => <Icon />} style="link" />
          </NavLink>
        );
      })}
    </div>
  );
};

export default IconList;
