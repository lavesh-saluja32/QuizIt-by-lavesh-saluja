import React from "react";

import { LeftArrow } from "@bigbinary/neeto-icons";
import { Button, Typography } from "neetoui";

import { routes } from "../../routes";

const Header = ({ t, history }) => (
  <div className="flex w-full flex-col items-center border-b-2 border-gray-200">
    <Typography style="h1">{t("quiz.result.title")}</Typography>
    <div className="flex w-full justify-between p-10">
      <Button
        className="bg-blue-600"
        icon={LeftArrow}
        iconPosition="left"
        label={t("button.home")}
        onClick={() => history.push(routes.public)}
      />
      <Typography>
        {t("quiz.result.totalQuestions", { totalQuestions: 3 })}
      </Typography>
    </div>
  </div>
);

export default Header;
