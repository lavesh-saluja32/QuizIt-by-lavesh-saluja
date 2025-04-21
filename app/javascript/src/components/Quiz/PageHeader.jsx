import React from "react";

import { buildUrl } from "@bigbinary/neeto-commons-frontend/utils";
import { LeftArrow } from "@bigbinary/neeto-icons";
import Rename from "@bigbinary/neeto-molecules/Rename";
import classNames from "classnames";
import { useUpdateQuiz } from "hooks/reactQuery/useQuizzes";
import { Button } from "neetoui";
import { useTranslation } from "react-i18next";
import { NavLink, useHistory, useRouteMatch } from "react-router-dom";
import { routes } from "routes";

import PublishButton from "./PublishButton/PublishButton";

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

  const quizMatch = useRouteMatch(routes.quiz.create);
  const questionMatch = useRouteMatch(routes.question.create);

  const handleUpdateQuizName = name =>
    updateQuiz({ quizId, payload: { name } });

  const navLinks = [
    {
      label: t("link.quiz.questions"),
      to: buildUrl(routes.quiz.create, { quizId }),
      isActive: questionMatch?.isExact || quizMatch?.isExact,
    },
    {
      label: t("link.quiz.submissions"),
      to: buildUrl(routes.quiz.submissions, { quizId }),
    },
    {
      label: t("link.quiz.configure"),
      to: buildUrl(routes.quiz.configure, { quizId }),
    },
  ];

  return (
    <div className="flex h-20 items-center border-b border-gray-400 bg-slate-100">
      <div
        className={classNames("flex items-center", {
          "w-full justify-between pr-2": showPublishButton,
          "w-[55vw] justify-between": !showPublishButton,
        })}
      >
        <div className="ml-3 flex items-center space-x-2 p-3">
          <Button
            icon={LeftArrow}
            style="link"
            onClick={() => history.push(routes.admin)}
          />
          <Rename
            hideMenu
            value={quiz?.name}
            textProps={{
              className:
                "text-2xl font-semibold hover:border hover:border-gray-300 px-2 py-1 rounded cursor-pointer",
            }}
            onRename={handleUpdateQuizName}
          />
        </div>
        <div className="space-x-6">
          {navLinks.map(({ label, to, isActive }) => (
            <NavLink
              activeClassName="active-quiz-link"
              key={label}
              to={to}
              className={classNames("text-lg", {
                "font-bold text-black": isActive,
                "text-gray-400": !isActive,
              })}
            >
              {label}
            </NavLink>
          ))}
        </div>
        {showPublishButton && (
          <PublishButton
            copyQuizPublicUrl={copyQuizPublicUrl}
            handlePublish={handlePublish}
            handleQuizPublicNavigation={handleQuizPublicNavigation}
            quiz={quiz}
            totalQuestions={totalQuestions}
          />
        )}
      </div>
    </div>
  );
};

export default PageHeader;
