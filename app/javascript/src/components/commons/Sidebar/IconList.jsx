import React from "react";

import { Settings, Globe, List } from "@bigbinary/neeto-icons";
import { NeetoQuiz } from "@bigbinary/neeto-icons/logos";
import classNames from "classnames";
import { Button } from "neetoui";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

import { routes } from "../../../routes";

const IconList = ({ isExpanded }) => (
  <div
    className={classNames(
      "flex  h-full w-full grid-rows-1 flex-col items-center  space-y-2 p-2 pt-3 transition-all",
      {
        " hidden": isExpanded,
      }
    )}
  >
    <div className="">
      <NeetoQuiz className="rounded-lg bg-blue-600" color="blue" size={60} />
    </div>
    <NavLink
      exact
      activeClassName="active-link-icon"
      className="w-full rounded-lg text-center"
      to={routes.root}
    >
      <Button icon={() => <List />} style="link" />
    </NavLink>
    <NavLink
      exact
      activeClassName="active-link-icon"
      className="w-full rounded-lg text-center"
      to={routes.settings}
    >
      <Button icon={() => <Settings />} style="link" />
    </NavLink>
    <NavLink
      exact
      activeClassName="active-link-icon"
      className="w-full rounded-lg text-center"
      to={routes.public}
    >
      <Button icon={() => <Globe />} style="link" />
    </NavLink>
  </div>
);

export default IconList;
