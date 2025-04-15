import React from "react";

import { PrivateRoute } from "@bigbinary/neeto-commons-frontend/react-utils";
import { either, isEmpty, isNil } from "ramda";
import { Route, Switch, useLocation, matchPath } from "react-router-dom";
import { getFromLocalStorage } from "utils/storage";

import { Login, Signup } from "./Authentication";
import QuizSignup from "./Authentication/QuizSignup/Signup";
import PageNotFound from "./commons/PageNotFound";
import Sidebar from "./commons/Sidebar";
import Dashboard from "./Dashboard";
import Edit from "./Edit";
import Public from "./Public";
import QuestionBuilder from "./Question/Create";
import Create from "./Quiz/Create";
import QuizAttempt from "./QuizAttempt";
import Result from "./Result";
import Settings from "./Settings";
import Submissions from "./Submissions";

import { routes } from "../routes";

const Main = () => {
  const authToken = getFromLocalStorage("authToken");
  const isLoggedIn = !either(isNil, isEmpty)(authToken);
  const location = useLocation();

  const hideSidebarRoutes = [
    routes.root,
    routes.quiz.register,
    routes.quiz.attempt,
    routes.quiz.submissions,
  ];

  const shouldHideSidebar = hideSidebarRoutes.some(path =>
    matchPath(location.pathname, { path, exact: true })
  );

  return (
    <div className="flex h-screen w-screen">
      {!shouldHideSidebar && isLoggedIn && <Sidebar />}
      <Switch>
        <Route exact component={Public} path={routes.root} />
        <Route exact component={Login} path={routes.authentication.login} />
        <Route exact component={Signup} path={routes.authentication.signup} />
        <Route exact component={QuizSignup} path={routes.quiz.register} />
        <Route exact component={Result} path={routes.submission} />
        <Route exact component={QuizAttempt} path={routes.quiz.attempt} />
        <Route exact component={Create} path={routes.quiz.create} />
        <Route exact component={Submissions} path={routes.quiz.submissions} />
        <Route exact component={Settings} path={routes.settings} />
        <Route
          exact
          component={QuestionBuilder}
          path={routes.question.create}
        />
        <Route exact component={Edit} path={routes.question.edit} />
        <PrivateRoute
          exact
          component={Dashboard}
          condition={isLoggedIn}
          path={routes.admin}
          redirectRoute={routes.root}
        />
        <Route component={PageNotFound} path="*" />
      </Switch>
    </div>
  );
};

export default Main;
