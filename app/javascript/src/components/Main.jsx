import React from "react";

import { either, isEmpty, isNil } from "ramda";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import { getFromLocalStorage } from "utils/storage";

import { Login, Signup } from "./Authentication";
import QuizSignup from "./Authentication/QuizSignup/Signup";
import PrivateRoute from "./commons/PrivateRoute";
import Sidebar from "./commons/Sidebar";
import Dashboard from "./Dashboard";
import Edit from "./Edit";
import Public from "./Public";
import QuestionBuilder from "./Question/Create";
import Create from "./Quiz/Create";
import QuizAttempt from "./QuizAttempt";
import Submission from "./Submission";

import { routes } from "../routes";

const Main = () => {
  const authToken = getFromLocalStorage("authToken");
  const isLoggedIn = !either(isNil, isEmpty)(authToken);

  return (
    <div className="flex h-screen w-screen">
      {isLoggedIn && <Sidebar />}
      <Switch>
        <Route exact component={Login} path={routes.authentication.login} />
        <Route exact component={Signup} path={routes.authentication.signup} />
        <Route exact component={QuizSignup} path={routes.quiz.register} />
        <Route exact component={Create} path={routes.quiz.create} />
        <Route exact component={Submission} path={routes.submission} />
        <Route
          exact
          component={QuestionBuilder}
          path={routes.question.create}
        />
        <Route exact component={Public} path={routes.public} />
        <Route exact component={QuizAttempt} path={routes.quiz.attempt} />
        <Route exact component={Edit} path={routes.question.edit} />
        <PrivateRoute
          component={Dashboard}
          condition={isLoggedIn}
          path={routes.root}
          redirectRoute={routes.public}
        />
      </Switch>
    </div>
  );
};
export default Main;
