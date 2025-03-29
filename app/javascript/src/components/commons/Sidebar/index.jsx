import React, { useState } from "react";

import classNames from "classnames";

import SidebarMenu from "./IconList";
import ExpandedSidebar from "./Menu";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={classNames(
        "h-screen bg-indigo-50 shadow-lg transition-all duration-100",
        {
          "w-[20vw]": isExpanded,
          "w-[5vw]": !isExpanded,
        }
      )}
      onMouseOut={() => setIsExpanded(false)}
      onMouseOver={() => setIsExpanded(true)}
    >
      {!isExpanded ? (
        <SidebarMenu {...{ isExpanded }} />
      ) : (
        <ExpandedSidebar {...{ isExpanded }} />
      )}
    </div>
  );
};

export default Sidebar;
