export const routes = {
  root: "/",
  authentication: {
    signup: "/signup",
    login: "/login",
  },
  quiz: {
    create: "/quiz/:quizId/create",
  },
  question: {
    create: "/question/:quizId/create",
    edit: "/question/:questionId/edit",
  },
};
