import React from "react";

import { withT } from "@bigbinary/neeto-commons-frontend/react-utils";
import { LeftArrow } from "@bigbinary/neeto-icons";
import { Button, Typography } from "neetoui";
import { routes } from "routes";

const Header = ({ t, history, totalQuestions }) => (
  <div className="flex w-full flex-col items-center border-b-2 border-gray-200">
    <Typography style="h1">{t("quiz.result.title")}</Typography>
    <div className="flex w-full justify-between p-10">
      <Button
        className="bg-blue-600"
        icon={LeftArrow}
        iconPosition="left"
        label={t("button.home")}
        onClick={() => history.push(routes.root)}
      />
      <Typography>
        {t("quiz.result.totalQuestions", { totalQuestions })}
      </Typography>
    </div>
  </div>
);

export default withT(Header);
