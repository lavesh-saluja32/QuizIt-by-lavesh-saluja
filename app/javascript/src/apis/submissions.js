import axios from "axios";

const fetch = ({ quizId, params }) =>
  axios.get(`/admin/quizzes/${quizId}/submissions`, { params });

const submissionsApi = { fetch };
export default submissionsApi;
