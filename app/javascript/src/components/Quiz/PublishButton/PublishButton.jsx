import React from "react";

import { Button } from "@bigbinary/neetoui";
import { Link } from "neetoicons";

import PublishActions from "./Actions";
import DraftStatus from "./DraftStatus";

const PublishButton = ({ handlePublish, copyLink, t, quiz }) => (
  <div className="flex items-center gap-4 rounded-md bg-gray-100 p-2">
    {quiz.status === "draft" && (
      <DraftStatus lastSavedAt={quiz.lastSavedAt} t={t} />
    )}
    <div className="flex rounded-md bg-blue-600">
      <PublishActions {...{ handlePublish, quiz, t }} />
    </div>
    <Button icon={Link} style="text" onClick={copyLink} />
  </div>
);

export default PublishButton;
