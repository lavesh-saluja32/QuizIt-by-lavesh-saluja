import axios from "axios";

const update = payload =>
  axios.put("/admin/organizations", {
    organization: payload,
  });

const organizationsApi = { update };

export default organizationsApi;
