import axios from "axios";

const create = payload =>
  axios.post("/admin/quizzes", {
    quiz: payload,
  });

const fetch = params => axios.get("/admin/quizzes", { params });

const quizzesApi = { create, fetch };
export default quizzesApi;
