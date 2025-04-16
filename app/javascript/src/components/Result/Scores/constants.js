import { t } from "i18next";

export const STYLE = {
  correct: "correct",
  wrong: "wrong",
  unanswered: "unanswered",
  total: "total",
};

export const label = {
  [STYLE.total]: t("quiz.result.score"),
  [STYLE.correct]: t("quiz.result.correct"),
  [STYLE.wrong]: t("quiz.result.wrong"),
  [STYLE.unanswered]: t("quiz.result.unanswered"),
};
