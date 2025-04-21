import axios from "axios";
const baseURL = "/submissions";
const create = payload =>
  axios.post(baseURL, {
    submission: payload,
  });

const update = ({ submissionId, payload }) =>
  axios.patch(`${baseURL}/${submissionId}`, {
    submission: payload,
  });

const show = submissionId => axios.get(`${baseURL}/${submissionId}`);

const submissionsApi = { create, update, show };
export default submissionsApi;
