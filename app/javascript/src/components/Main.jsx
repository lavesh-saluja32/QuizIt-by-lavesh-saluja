import React from "react";

import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";

import Sidebar from "./commons/Sidebar";
import Dashboard from "./Dashboard";

import { routes } from "../routes";

const Main = () => (
  <div className="flex">
    <Sidebar />
    <Switch>
      <Route exact component={Dashboard} path={routes.root} />
    </Switch>
  </div>
);

export default Main;
