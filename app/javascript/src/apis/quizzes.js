import axios from "axios";

const create = payload =>
  axios.post("/admin/quizzes", {
    quiz: payload,
  });

const quizzesApi = { create };
export default quizzesApi;
