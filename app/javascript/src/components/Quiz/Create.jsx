import React from "react";

import { buildUrl } from "@bigbinary/neeto-commons-frontend/utils";
import { Button } from "neetoui/index";
import { useTranslation } from "react-i18next";
import { useParams, useHistory } from "react-router-dom";

import PageHeader from "./PageHeader";

import { routes } from "../../routes";

const Create = () => {
  const { quizId } = useParams();
  const history = useHistory();
  const { t } = useTranslation();

  const handleQuestionNavigation = () => {
    const url = buildUrl(routes.question.create, { quizId });
    history.push(url);
  };

  return (
    <div className="w-screen">
      <PageHeader />
      <div className="float-end m-6 h-[5vh] ">
        <Button
          className="bg-blue-600"
          label={t("button.addQuestion")}
          onClick={handleQuestionNavigation}
        />
      </div>
    </div>
  );
};

export default Create;
