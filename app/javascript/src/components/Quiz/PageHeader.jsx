import React from "react";

import { LeftArrow } from "@bigbinary/neeto-icons";
import { Button, Typography } from "neetoui/index";
import { useTranslation } from "react-i18next";
import { NavLink, useHistory } from "react-router-dom";

const PageHeader = () => {
  const { t } = useTranslation();
  const history = useHistory();

  return (
    <div className="flex h-20 w-full items-center border-b border-gray-400 bg-slate-100 outline-slate-400">
      <div className="flex w-1/2 items-center justify-between">
        <div className="ml-3 flex items-center justify-center space-x-2 p-3">
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
            className="text-lg"
            to="#"
          >
            {t("link.quiz.questions")}
          </NavLink>
          <NavLink
            activeClassName="active-quiz-link"
            className="text-lg"
            to="#"
          >
            {t("link.quiz.submissions")}
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
