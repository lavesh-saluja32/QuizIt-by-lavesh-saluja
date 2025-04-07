import React from "react";

import Card from "./Card";

const Scores = () => (
  <div className="mt-8 flex w-full justify-center space-x-1">
    <Card score={2} style="total" totalScore={4} />
    <Card score={2} style="correct" />
    <Card score={2} style="wrong" />
    <Card score={2} style="unanswered" />
  </div>
);

export default Scores;
