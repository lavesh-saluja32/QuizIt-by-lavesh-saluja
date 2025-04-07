import React from "react";

import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import Header from "./Header";
import ScoreCards from "./Scores";

const Submission = () => {
  // const { submissionId } = useParams();
  const { t } = useTranslation();

  const history = useHistory();

  return (
    <div className="h-full w-full">
      <div className="m-auto mt-[10vh] w-3/4">
        <Header {...{ t, history }} />
        <ScoreCards />
      </div>
    </div>
  );
};

export default Submission;
