import { Typography, Button, NoData } from "neetoui";
import React from "react";
import { routes } from "../../routes";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Search from "@bigbinary/neeto-molecules/Search";
import QuizCard from "./QuizCard";
import { buildUrl } from "@bigbinary/neeto-commons-frontend/utils";
import { useFetchQuizzes } from "../../hooks/reactQuery/public/useQuizzes";
import DropdownFilter from "./DropdownFilter";
import { useQueryParams } from "@bigbinary/neeto-commons-frontend/react-utils";
import { isEmpty } from "ramda";
import PageLoader from "..//commons/PageLoader";
const Public = () => {
  const history = useHistory();

  const { t } = useTranslation();

  const { category = [], search = "" } = useQueryParams();

  const {
    data: {
      data: { quizzes = [], organizationName = "" } = {},
      isLoading,
    } = {},
  } = useFetchQuizzes({ category, search });

  const handleAuthNavigation = () => {
    history.push(routes.authentication.login);
  };

  const handleQuizLoginNavigation = quizId => {
    history.push(buildUrl(routes.quiz.register, { quizId }));
  };

  if (isLoading) return <PageLoader />;

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
              enableUrlSync
              placeholder={t("placeholder.searchQuiz")}
              className="w-[30vw]"
            />
          </div>
          <DropdownFilter />
        </div>
        <div className="m-auto flex flex-wrap justify-center">
          {!isEmpty(quizzes) ? (
            quizzes.map(quiz => (
              <QuizCard
                key={quiz.id}
                {...{ ...quiz, handleQuizLoginNavigation, t }}
              />
            ))
          ) : (
            <NoData title={t("response.error.quizzesNotFound")} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Public;
