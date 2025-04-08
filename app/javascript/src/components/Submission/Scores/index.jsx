import React from "react";

import Card from "./Card";

const Scores = ({ correctAnswers, wrongAnswers, unanswered }) => (
  <div className="mt-8 flex w-full justify-center space-x-1">
    <Card
      score={correctAnswers}
      style="total"
      totalScore={correctAnswers + wrongAnswers + unanswered}
    />
    <Card score={correctAnswers} style="correct" />
    <Card score={wrongAnswers} style="wrong" />
    <Card score={unanswered} style="unanswered" />
  </div>
);

export default Scores;
