import axios from "axios";

const create = payload =>
  axios.post("/admin/quizzes", {
    quiz: payload,
  });

const fetch = params => axios.get("/admin/quizzes", { params });
const update = ({ quizId, payload }) =>
  axios.put(`/admin/quizzes/${quizId}`, {
    quiz: payload,
  });

const show = quizId => axios.get(`/admin/quizzes/${quizId}`);

const quizzesApi = { create, fetch, update, show };
export default quizzesApi;
