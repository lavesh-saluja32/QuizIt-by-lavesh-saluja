import React from "react";

import classNames from "classnames";
import { NeetoQuiz, Settings, Globe, List } from "neetoicons";
import { Button } from "neetoui";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

import { routes } from "../../../routes";

const IconList = ({ isExpanded }) => (
  <div
    className={classNames(
      "flex  h-full w-full flex-col items-center space-y-2  p-2 pt-3 transition-all",
      {
        " h-0 w-0 opacity-0": isExpanded,
      }
    )}
  >
    <NavLink exact activeClassName="active-link" to={routes.root}>
      <Button icon={() => <NeetoQuiz />} style="link" />
    </NavLink>
    <NavLink activeClassName="active-link" to="/l">
      <Button icon={() => <List />} style="link" />
    </NavLink>
    <NavLink activeClassName="active-link" to="/l">
      <Button icon={() => <Settings />} style="link" />
    </NavLink>
    <NavLink activeClassName="active-link" to="/l">
      <Button icon={() => <Globe />} style="link" />
    </NavLink>
  </div>
);

export default IconList;
