import axios from "axios";

const fetch = quizId => axios.get(`/admin/quizzes/${quizId}/questions`);
const create = ({ quizId, payload }) =>
  axios.post(`/admin/quizzes/${quizId}/questions`, {
    question: payload,
  });

const questionsApi = { fetch, create };
export default questionsApi;
