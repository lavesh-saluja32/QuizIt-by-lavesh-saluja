export const routes = {
  root: "/",
  authentication: {
    signup: "/signup",
    login: "/login",
  },
  quiz: {
    create: "/quiz/:quizId/create",
    register: "/quiz/:quizSlug/register",
    attempt: "/quiz/:quizSlug/attempt",
    submissions: "/quiz/:quizId/submissions",
  },
  submission: "/submission/:submissionId",
  question: {
    create: "/question/:quizId/create/:questionNumber",
    edit: "/question/:questionId/edit/:questionNumber",
  },
  admin: "/admin",
  settings: {
    general: "/settings/general",
    redirection: "/settings/redirections",
    categories: "/settings/categories",
  },
};
