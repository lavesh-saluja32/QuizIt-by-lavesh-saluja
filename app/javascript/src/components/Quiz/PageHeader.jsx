import React from "react";

import { buildUrl } from "@bigbinary/neeto-commons-frontend/utils";
import { LeftArrow } from "@bigbinary/neeto-icons";
import Rename from "@bigbinary/neeto-molecules/Rename";
import classNames from "classnames";
import { Button } from "neetoui/index";
import { useTranslation } from "react-i18next";
import { NavLink, useHistory, useRouteMatch } from "react-router-dom";

import PublishButton from "./PublishButton/PublishButton";

import { useUpdateQuiz } from "../../hooks/reactQuery/useQuizzes";
import { routes } from "../../routes";

const PageHeader = ({
  quizId,
  showPublishButton,
  quiz,
  handlePublish,
  handleQuizPublicNavigation,
  copyQuizPublicUrl,
  totalQuestions,
}) => {
  const { t } = useTranslation();

  const history = useHistory();

  const { mutate: updateQuiz } = useUpdateQuiz();

  const handleUpdateQuizName = name => {
    updateQuiz({ quizId, payload: { name } });
  };

  const quizMatch = useRouteMatch(routes.quiz.create);
  const questionMatch = useRouteMatch(
    "/question/:quizId/create/:questionNumber"
  );

  return (
    <div className="flex h-20 items-center border-b border-gray-400 bg-slate-100">
      <div
        className={classNames("flex items-center", {
          "w-full justify-between pr-2": showPublishButton,
          " w-[53vw] justify-between": !showPublishButton,
        })}
      >
        <div className="ml-3 flex items-center justify-center space-x-2 p-3 ">
          <Button
            icon={LeftArrow}
            style="link"
            onClick={() => history.goBack()}
          />
          <Rename
            hideMenu
            placeholder="Enter a name"
            value={quiz?.name}
            textProps={{
              className:
                "text-2xl font-semibold bg-white border hover:border-gray-300 px-2 py-1 rounded",
            }}
            onRename={handleUpdateQuizName}
          />
        </div>
        <div className="space-x-6">
          <NavLink
            activeClassName="active-quiz-link"
            to={buildUrl(routes.quiz.create, { quizId })}
            className={classNames("text-lg", {
              "font-bold text-black":
                questionMatch?.isExact || quizMatch?.isExact,
            })}
          >
            {t("link.quiz.questions")}
          </NavLink>
          <NavLink
            activeClassName="active-quiz-link"
            className="text-lg text-gray-400"
            to={buildUrl(routes.quiz.submissions, { quizId })}
          >
            {t("link.quiz.submissions")}
          </NavLink>
        </div>
        {showPublishButton && (
          <PublishButton
            {...{
              t,
              quiz,
              handlePublish,
              handleQuizPublicNavigation,
              copyQuizPublicUrl,
              totalQuestions,
            }}
          />
        )}
      </div>
    </div>
  );
};

export default PageHeader;
