import axios from "axios";

const baseURL = "/quizzes";

const fetch = params => axios.get(baseURL, { params });
const show = quizId => axios.get(`${baseURL}/${quizId}`);
const quizzesApi = { fetch, show };
export default quizzesApi;
