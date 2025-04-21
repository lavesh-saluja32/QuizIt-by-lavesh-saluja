import React from "react";

import { withT } from "@bigbinary/neeto-commons-frontend/react-utils";
import { buildUrl } from "@bigbinary/neeto-commons-frontend/utils";
import Breadcrumbs from "@bigbinary/neeto-molecules/Breadcrumbs";
import { Typography } from "neetoui/index";
import { routes } from "routes";

const Header = ({ t, pageTitle, quizId }) => (
  <div className=" p-10 pl-10 pl-32 pt-20">
    <Breadcrumbs
      className="mb-1"
      breadcrumbs={[
        {
          link: buildUrl(routes.quiz.configure, { quizId }),
          text: t("link.settings.configure"),
        },
        {
          text: pageTitle,
        },
      ]}
    />
    <Typography style="h1">{pageTitle}</Typography>
  </div>
);

export default withT(Header);
