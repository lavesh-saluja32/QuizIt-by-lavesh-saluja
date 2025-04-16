import React from "react";

import classNames from "classnames";

import MenuNavItem from "./NavItem";
import MenuUserInfo from "./UserInfo";

const Menu = ({ isExpanded }) => (
  <div
    className={classNames(
      "flex h-full w-full flex-col bg-white p-4 shadow-lg transition-all",
      { hidden: !isExpanded }
    )}
  >
    <MenuNavItem />
    <MenuUserInfo />
  </div>
);

export default Menu;
