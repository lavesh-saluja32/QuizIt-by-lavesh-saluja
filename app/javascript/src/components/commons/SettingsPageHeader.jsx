import React from "react";

import { withT } from "@bigbinary/neeto-commons-frontend/react-utils";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { routes } from "routes";

const SettingsPageHeader = ({ t }) => (
  <div className="flex h-20 items-center justify-center border-b border-gray-400 bg-slate-100">
    <div className="flex items-center space-x-12">
      <NavLink
        activeClassName="active-quiz-link"
        className="text-lg text-gray-400"
        to={routes.settings.general}
      >
        {t("link.settings.general")}
      </NavLink>
      <NavLink
        activeClassName="active-quiz-link"
        className="text-lg text-gray-400"
        to={routes.settings.redirection}
      >
        {t("link.settings.redirections")}
      </NavLink>
      <NavLink
        activeClassName="active-quiz-link"
        className="text-lg text-gray-400"
        to={routes.settings.categories}
      >
        {t("link.settings.categories")}
      </NavLink>
    </div>
  </div>
);

export default withT(SettingsPageHeader);
