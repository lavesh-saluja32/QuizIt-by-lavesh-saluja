import axios from "axios";

const create = payload =>
  axios.post("/admin/quizzes", {
    quiz: payload,
  });

const fetch = () => axios.get("/admin/quizzes");

const quizzesApi = { create, fetch };
export default quizzesApi;
