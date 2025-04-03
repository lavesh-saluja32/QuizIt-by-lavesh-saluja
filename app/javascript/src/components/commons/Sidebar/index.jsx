import React, { useState } from "react";

import classNames from "classnames";

import SidebarMenu from "./IconList";
import ExpandedSidebar from "./Menu";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={classNames(
        "flex h-full bg-indigo-50 shadow-lg transition-all duration-100",
        {
          "w-64": isExpanded,
          "w-16": !isExpanded,
        }
      )}
      onMouseOut={() => setIsExpanded(false)}
      onMouseOver={() => setIsExpanded(true)}
    >
      <SidebarMenu {...{ isExpanded }} />
      <ExpandedSidebar {...{ isExpanded }} />
    </div>
  );
};

export default Sidebar;
