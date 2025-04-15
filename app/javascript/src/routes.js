export const routes = {
  root: "/",
  authentication: {
    signup: "/signup",
    login: "/login",
  },
  quiz: {
    create: "/quiz/:quizId/create",
    register: "/quiz/:quizId/register",
    attempt: "/quiz/:quizId/attempt",
    submissions: "/quiz/:quizId/submissions",
  },
  submission: "/submission/:submissionId",
  question: {
    create: "/question/:quizId/create/:questionNumber",
    edit: "/question/:questionId/edit",
  },
  admin: "/admin",
  settings: "/settings",
};
