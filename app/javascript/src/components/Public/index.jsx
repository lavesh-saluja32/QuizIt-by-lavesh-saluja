import React from "react";

import { useQueryParams } from "@bigbinary/neeto-commons-frontend/react-utils";
import { buildUrl } from "@bigbinary/neeto-commons-frontend/utils";
import Search from "@bigbinary/neeto-molecules/Search";
import PageLoader from "components/commons/PageLoader";
import { useFetchQuizzes } from "hooks/reactQuery/public/useQuizzes";
import { Typography, Button, NoData } from "neetoui";
import { isEmpty } from "ramda";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { routes } from "routes";

import DropdownFilter from "./DropdownFilter";
import QuizCard from "./QuizCard";

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
            className="bg-blue-600"
            label={t("button.loginAdmin")}
            onClick={handleAuthNavigation}
          />
        </div>
        <div className="flex h-[25vh] w-full items-center justify-center">
          <div>
            <Search
              enableUrlSync
              className="w-[30vw]"
              placeholder={t("placeholder.searchQuiz")}
              searchParamName="search"
            />
          </div>
          <DropdownFilter />
        </div>
        <div className="m-auto flex flex-wrap justify-center">
          {!isEmpty(quizzes) ? (
            quizzes.map(quiz => (
              <QuizCard
                key={quiz.id}
                {...{ ...quiz, handleQuizLoginNavigation }}
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
