import axios from "axios";

const create = payload =>
  axios.post("/submissions", {
    submission: payload,
  });

const update = ({ submissionId, payload }) =>
  axios.patch(`/submissions/${submissionId}`, {
    submission: payload,
  });

const submissionsApi = { create, update };
export default submissionsApi;
