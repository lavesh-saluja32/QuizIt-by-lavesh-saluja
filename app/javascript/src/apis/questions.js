import axios from "axios";

const fetch = quizId => axios.get(`/admin/quizzes/${quizId}/questions`);

const create = ({ quizId, payload }) =>
  axios.post(`/admin/quizzes/${quizId}/questions`, {
    question: payload,
  });

const destroy = questionId => axios.delete(`/admin/questions/${questionId}`);

const update = ({ questionId, payload }) =>
  axios.put(`/admin/questions/${questionId}`, {
    question: payload,
  });

const show = questionId => axios.get(`/admin/questions/${questionId}`);

const clone = questionId => axios.post(`/admin/questions/${questionId}/clone`);
const questionsApi = { fetch, create, destroy, update, show, clone };
export default questionsApi;
