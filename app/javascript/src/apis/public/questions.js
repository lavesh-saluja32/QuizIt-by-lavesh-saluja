import axios from "axios";

const fetch = quizId => axios.get(`/quizzes/${quizId}/questions`);
const questionsApi = { fetch };
export default questionsApi;
