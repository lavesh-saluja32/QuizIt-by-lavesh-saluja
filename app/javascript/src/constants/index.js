import { routes } from "routes";

export const BASE_URL = "/api/v1";

export const showSidebarRoutes = [
  routes.admin,
  routes.settings.general,
  routes.settings.redirection,
  routes.settings.categories,
  routes.quiz.configure,
  routes.quiz.configureVisibility,
  routes.quiz.configureTimings,
  routes.quiz.configureQuestions,
  routes.quiz.configureNotifications,
  routes.quiz.submissions,
  routes.quiz.create,
];
