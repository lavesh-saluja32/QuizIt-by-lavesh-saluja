import React from "react";

import { Button } from "@bigbinary/neetoui";
import { ExternalLink } from "neetoicons";

const Actions = ({ quiz, handlePublish }) => {
  if (quiz.status === "draft") {
    return (
      <Button
        className="bg-blue-600 px-2 text-white"
        label="Publish"
        style="secondary"
        onClick={() => handlePublish({ quizId: quiz.id, status: "published" })}
      />
    );
  }

  return (
    <>
      <Button
        className="rounded-none rounded-l-md border-r border-white bg-blue-600 px-2 text-white"
        label="Unpublish"
        style="primary"
        onClick={() => handlePublish({ quizId: quiz.id, status: "draft" })}
      />
      <Button
        className="rounded-r-md bg-blue-600"
        icon={() => <ExternalLink color="white" />}
        style="primary"
      />
    </>
  );
};

export default Actions;
