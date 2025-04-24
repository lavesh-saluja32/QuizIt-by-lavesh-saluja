import { showSidebarRoutes } from "constants";

import React from "react";

import { PrivateRoute } from "@bigbinary/neeto-commons-frontend/react-utils";
import { either, isEmpty, isNil } from "ramda";
import { Route, Switch, useLocation, matchPath } from "react-router-dom";
import { routes } from "routes";
import { routeConfig } from "utils/routesConfig";
import { getFromLocalStorage } from "utils/storage";

import PageNotFound from "./commons/PageNotFound";
import Sidebar from "./commons/Sidebar";

const authToken = getFromLocalStorage("authToken");
const isLoggedIn = !either(isNil, isEmpty)(authToken);

const Main = () => {
  const location = useLocation();

  const shouldHideSidebar = showSidebarRoutes.some(path =>
    matchPath(location.pathname, { path, exact: true })
  );

  return (
    <div className="flex h-screen w-screen">
      {shouldHideSidebar && isLoggedIn && <Sidebar />}
      <Switch>
        {routeConfig.map(({ path, component, isPrivate }, index) =>
          isPrivate ? (
            <PrivateRoute
              exact
              component={component}
              condition={isLoggedIn}
              key={index}
              path={path}
              redirectRoute={routes.root}
            />
          ) : (
            <Route exact component={component} key={index} path={path} />
          )
        )}
        <Route component={PageNotFound} path="*" />
      </Switch>
    </div>
  );
};

export default Main;
