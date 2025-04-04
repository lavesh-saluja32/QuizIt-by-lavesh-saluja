import React from "react";

import { buildUrl } from "@bigbinary/neeto-commons-frontend/utils";
import { LeftArrow } from "@bigbinary/neeto-icons";
import classNames from "classnames";
import { Button, Typography } from "neetoui/index";
import { useTranslation } from "react-i18next";
import { NavLink, useHistory, useRouteMatch } from "react-router-dom";

import PublishButton from "./Publish/PublishButton";

import { routes } from "../../routes";

const PageHeader = ({ quizId, showPublishButton, quiz, handlePublish }) => {
  const { t } = useTranslation();
  const history = useHistory();

  const quizMatch = useRouteMatch("/quiz/:quizId/create");
  const questionMatch = useRouteMatch(
    "/question/:quizId/create/:questionNumber"
  );

  return (
    <div className="flex h-20 items-center border-b border-gray-400 bg-slate-100">
      <div
        className={classNames("flex w-full items-center", {
          "justify-between pr-2": showPublishButton,
          " w-[54vw] justify-between": !showPublishButton,
        })}
      >
        <div className="ml-3 flex items-center justify-center space-x-2 p-3 ">
          <Button
            icon={LeftArrow}
            style="link"
            onClick={() => history.goBack()}
          />
          <Typography style="h2">Sample Quiz</Typography>
        </div>
        <div className="space-x-6">
          <NavLink
            activeClassName="active-quiz-link"
            to={buildUrl(routes.quiz.create, { quizId })}
            className={classNames("text-lg", {
              "font-bold": quizMatch || questionMatch,
            })}
          >
            {t("link.quiz.questions")}
          </NavLink>
          <NavLink
            activeClassName="active-quiz-link"
            className="text-lg text-gray-400"
            to="#"
          >
            {t("link.quiz.submissions")}
          </NavLink>
        </div>
        {showPublishButton && <PublishButton {...{ t, quiz, handlePublish }} />}
      </div>
    </div>
  );
};

export default PageHeader;
