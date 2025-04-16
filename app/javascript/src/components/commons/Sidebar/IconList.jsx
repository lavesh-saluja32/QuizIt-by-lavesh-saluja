import React from "react";

import { Settings, Globe, List } from "@bigbinary/neeto-icons";
import { NeetoQuiz } from "@bigbinary/neeto-icons/logos";
import classNames from "classnames";
import { Button } from "neetoui";
import { NavLink } from "react-router-dom";
import { routes } from "routes";

const navItems = [
  { to: routes.admin, icon: List },
  { to: routes.settings, icon: Settings },
  { to: routes.root, icon: Globe },
];

const IconList = ({ isExpanded }) => (
  <div
    className={classNames(
      "flex h-full w-full flex-col items-center space-y-2 p-2 pt-3 transition-all",
      { hidden: isExpanded }
    )}
  >
    <div>
      <NeetoQuiz className="rounded-lg bg-blue-600" color="blue" size={60} />
    </div>
    {navItems.map(({ to, icon: Icon }, index) => (
      <NavLink
        exact
        activeClassName="active-link-icon"
        className="w-full rounded-lg text-center"
        key={index}
        to={to}
      >
        <Button icon={() => <Icon />} style="link" />
      </NavLink>
    ))}
  </div>
);

export default IconList;
