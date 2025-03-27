import React from "react";

import { either, isEmpty, isNil } from "ramda";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import { getFromLocalStorage } from "utils/storage";

import { Login, Signup } from "./Authentication";
import PrivateRoute from "./commons/PrivateRoute";
import Sidebar from "./commons/Sidebar";
import Dashboard from "./Dashboard";

import { routes } from "../routes";

const Main = () => {
  const authToken = getFromLocalStorage("authToken");
  const isLoggedIn = !either(isNil, isEmpty)(authToken);

  return (
    <div className="flex">
      <Sidebar />
      <Switch>
        <Route exact component={Login} path={routes.authentication.login} />
        <Route exact component={Signup} path={routes.authentication.signup} />
        <PrivateRoute
          component={Dashboard}
          condition={isLoggedIn}
          path={routes.root}
          redirectRoute={routes.authentication.login}
        />
      </Switch>
    </div>
  );
};
export default Main;
