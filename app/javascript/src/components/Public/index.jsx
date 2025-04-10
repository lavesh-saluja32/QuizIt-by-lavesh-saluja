import { Typography, Button } from "neetoui";
import React from "react";
import { routes } from "../../routes";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Search from "@bigbinary/neeto-molecules/Search";
import { Filter } from "@bigbinary/neeto-icons";
import QuizCard from "./QuizCard";
import { buildUrl } from "@bigbinary/neeto-commons-frontend/utils";
import { useFetchQuizzes } from "../../hooks/reactQuery/public/useQuizzes";

const Public = () => {
  const history = useHistory();

  const { t } = useTranslation();

  const { data: { data: { quizzes = [], organizationName = "" } = {} } = {} } =
    useFetchQuizzes();
  console.log(quizzes);

  const handleAuthNavigation = () => {
    history.push(routes.authentication.login);
  };

  const handleQuizLoginNavigation = quizId => {
    history.push(buildUrl(routes.quiz.register, { quizId }));
  };

  return (
    <div className="h-full w-full bg-slate-100">
      <div className="ml-auto mr-auto mt-2 w-5/6">
        <div className="flex h-[10vh] items-center justify-between">
          <Typography style="h1">{organizationName}</Typography>
          <Button
            onClick={handleAuthNavigation}
            label={t("button.loginAdmin")}
            className="bg-blue-600"
          />
        </div>
        <div className="flex h-[25vh] w-full items-center justify-center">
          <div>
            <Search
              searchParamName="search"
              placeholder={t("placeholder.searchQuiz")}
              className="w-[30vw]"
            />
          </div>
          <Button icon={Filter} style="link" />
        </div>
        <div className="m-auto flex flex-wrap justify-center">
          {quizzes.map(quiz => (
            <QuizCard
              key={quiz.id}
              {...{ ...quiz, handleQuizLoginNavigation, t }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Public;
