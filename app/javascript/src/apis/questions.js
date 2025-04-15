import axios from "axios";

const quizQuestionBaseURL = id => `/admin/quizzes/${id}/questions`;
const questionBaseURL = id => `/admin/questions/${id}`;

const fetch = quizId => axios.get(quizQuestionBaseURL(quizId));

const create = ({ quizId, payload }) =>
  axios.post(quizQuestionBaseURL(quizId), {
    question: payload,
  });

const destroy = questionId => axios.delete(questionBaseURL(questionId));

const update = ({ questionId, payload }) =>
  axios.put(questionBaseURL(questionId), {
    question: payload,
  });

const show = questionId => axios.get(questionBaseURL(questionId));

const clone = questionId => axios.post(`${questionBaseURL(questionId)}/clone`);
const questionsApi = { fetch, create, destroy, update, show, clone };
export default questionsApi;
