import { Eye, Clock, Settings, Notification } from "neetoicons";
import { routes } from "routes";

const getConfigureData = () => {
  const cardConfig = [
    {
      titleKey: "configure.visibility.title",
      descriptionKey: "configure.visibility.description",
      icon: Eye,
      url: routes.quiz.configureVisibility,
    },
    {
      titleKey: "configure.timing.title",
      descriptionKey: "configure.timing.description",
      icon: Clock,
      url: routes.quiz.configureTimings,
    },
    {
      titleKey: "configure.questions.title",
      descriptionKey: "configure.questions.description",
      icon: Settings,
      url: routes.quiz.configureQuestions,
    },
    {
      titleKey: "configure.notifications.title",
      descriptionKey: "configure.notifications.description",
      icon: Notification,
      url: routes.quiz.configureNotifications,
    },
  ];

  return cardConfig;
};

export default getConfigureData;
