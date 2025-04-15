import React from "react";

import { buildUrl } from "@bigbinary/neeto-commons-frontend/utils";
import { Right } from "@bigbinary/neeto-icons";
import { Typography } from "neetoui";
import { NavLink } from "react-router-dom";

import { routes } from "../routes";

const Breadcrumb = ({ quizId, questionNumber, t }) => (
  <div className="custom-breadcrumbs flex items-center space-x-3">
    <NavLink to={buildUrl(routes.quiz.create, { quizId })}>
      {t("link.question.allQuestion")}
    </NavLink>
    <Right />
    <Typography>
      {t("link.question.question", { number: questionNumber })}
    </Typography>
  </div>
);

export default Breadcrumb;
