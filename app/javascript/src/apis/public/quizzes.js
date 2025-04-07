import axios from "axios";

const fetch = params => axios.get("/quizzes", { params });
const show = quizId => axios.get(`/quizzes/${quizId}`);
const quizzesApi = { fetch, show };
export default quizzesApi;
