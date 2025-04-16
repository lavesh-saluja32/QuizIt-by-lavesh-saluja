import React from "react";

import { withT } from "@bigbinary/neeto-commons-frontend/react-utils";
import { Button } from "@bigbinary/neetoui";
import { ExternalLink } from "neetoicons";

const Actions = ({
  quiz,
  handlePublish,
  t,
  handleQuizPublicNavigation,
  totalQuestions,
}) => (
  <div className="flex items-center">
    <Button
      className="rounded-none rounded-l-md border-r border-white bg-blue-600 px-2 text-white"
      disabled={quiz.status === "published" || totalQuestions <= 0}
      label={t("quiz.publish")}
      style="primary"
      onClick={() => handlePublish({ quizId: quiz.id, status: "published" })}
    />
    <Button
      className="rounded-r-md bg-blue-600"
      disabled={quiz.status === "draft" || totalQuestions <= 0}
      icon={() => <ExternalLink color="white" />}
      style="primary"
      onClick={handleQuizPublicNavigation}
    />
  </div>
);

export default withT(Actions);
