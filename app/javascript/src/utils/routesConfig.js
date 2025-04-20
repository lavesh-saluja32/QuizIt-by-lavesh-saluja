import { Login, Signup } from "components/Authentication";
import QuizSignup from "components/Authentication/QuizSignup/Signup";
import Categories from "components/Categories";
import Dashboard from "components/Dashboard";
import Edit from "components/Edit";
import Settings from "components/GeneralSettings";
import Public from "components/Public";
import QuestionBuilder from "components/Question/Create";
import Create from "components/Quiz/Create";
import QuizAttempt from "components/QuizAttempt";
import Redirections from "components/Redirections";
import Result from "components/Result";
import Submissions from "components/Submissions";
import { routes } from "routes";

export const routeConfig = [
  { path: routes.root, component: Public, isPrivate: false },
  { path: routes.authentication.login, component: Login, isPrivate: false },
  { path: routes.authentication.signup, component: Signup, isPrivate: false },
  { path: routes.quiz.register, component: QuizSignup, isPrivate: false },
  { path: routes.submission, component: Result, isPrivate: false },
  { path: routes.quiz.attempt, component: QuizAttempt, isPrivate: false },

  { path: routes.quiz.create, component: Create, isPrivate: true },
  { path: routes.quiz.submissions, component: Submissions, isPrivate: true },
  { path: routes.settings.general, component: Settings, isPrivate: true },
  { path: routes.question.create, component: QuestionBuilder, isPrivate: true },
  { path: routes.question.edit, component: Edit, isPrivate: true },
  { path: routes.admin, component: Dashboard, isPrivate: true },
  {
    path: routes.settings.redirection,
    component: Redirections,
    isPrivate: true,
  },
  {
    path: routes.settings.categories,
    component: Categories,
    isPrivate: true,
  },
];
