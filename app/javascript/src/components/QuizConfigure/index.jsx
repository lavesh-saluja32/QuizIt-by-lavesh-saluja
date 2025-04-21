import React from "react";

import { withT } from "@bigbinary/neeto-commons-frontend/react-utils";
import { buildUrl } from "@bigbinary/neeto-commons-frontend/utils";
import PageHeader from "components/Quiz/PageHeader";
import { useShowQuiz } from "hooks/reactQuery/useQuizzes";
import { Typography } from "neetoui";
import { useParams, useHistory } from "react-router-dom";

import Card from "./Card";
import getConfigureData from "./utils";

const Configure = ({ t }) => {
  const { quizId } = useParams();
  const { data: { data: { quiz = {} } = {} } = {} } = useShowQuiz(quizId);

  const history = useHistory();

  const handleNavigation = url => {
    history.push(buildUrl(url, { quizId }));
  };

  return (
    <div className="flex h-screen w-screen flex-col bg-slate-100">
      <PageHeader {...{ quiz, quizId }} />
      <div className="flex w-full justify-center">
        <div className="w-[75vw] space-y-9 p-5">
          <Typography className="mt-10" style="h1">
            {t("headers.settings.configure")}
          </Typography>
          <div className="grid grid-cols-3 gap-6">
            {getConfigureData().map(
              ({ titleKey, descriptionKey, icon, url }, index) => (
                <Card
                  Icon={icon}
                  description={t(descriptionKey)}
                  key={index}
                  title={t(titleKey)}
                  onClick={() => handleNavigation(url)}
                />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default withT(Configure);
