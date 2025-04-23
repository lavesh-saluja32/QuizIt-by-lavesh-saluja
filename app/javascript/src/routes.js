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
    configure: "/quiz/:quizId/configure",
    configureVisibility: "/quiz/:quizId/configure/visibility",
    configureTimings: "/quiz/:quizId/configure/timings",
    configureQuestions: "/quiz/:quizId/configure/questions",
    configureNotifications: "/quiz/:quizId/configure/notifications",
  },
  submission: "/submission/:submissionId",
  question: {
    create: "/question/:quizId/create/:questionNumber",
    edit: "/question/:questionId/edit/:questionNumber",
  },
  admin: "/admin",
  settings: {
    root: "/settings",
    general: "/settings/general",
    redirection: "/settings/redirections",
    categories: "/settings/categories",
  },
};
