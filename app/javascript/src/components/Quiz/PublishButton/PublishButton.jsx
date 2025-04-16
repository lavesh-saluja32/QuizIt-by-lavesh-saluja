import React from "react";

import { Button } from "@bigbinary/neetoui";
import { Link } from "neetoicons";
import { formatDate } from "utils/formatDate";

import PublishActions from "./Actions";
import DraftStatus from "./DraftStatus";

const PublishButton = ({
  handlePublish,
  quiz,
  handleQuizPublicNavigation,
  copyQuizPublicUrl,
  totalQuestions,
}) => (
  <div className="flex items-center gap-4 rounded-md bg-gray-100 p-2">
    {quiz.status === "draft" && (
      <DraftStatus
        lastSavedAt={formatDate(quiz.updatedAt || quiz.createdAt, true)}
      />
    )}
    <div className="flex rounded-md bg-blue-600">
      <PublishActions
        {...{
          handlePublish,
          quiz,
          handleQuizPublicNavigation,
          totalQuestions,
        }}
      />
    </div>
    {quiz.status === "published" && (
      <Button icon={Link} style="text" onClick={copyQuizPublicUrl} />
    )}
  </div>
);

export default PublishButton;
