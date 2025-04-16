import axios from "axios";

const update = payload =>
  axios.put(`/admin/organizations`, {
    organization: payload,
  });

const show = () => axios.get(`/admin/organizations/`);

const organizationsApi = { update, show };

export default organizationsApi;
