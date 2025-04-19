import axios from "axios";

const baseURL = "/admin/redirections";

const create = payload => axios.post(baseURL, { redirection: payload });

const fetch = () => axios.get(baseURL);

const update = (redirectionId, payload) =>
  axios.put(`${baseURL}/${redirectionId}`, { redirection: payload });

const destroy = redirectionId => axios.delete(`${baseURL}/${redirectionId}`);

const redirectionsApi = { create, fetch, update, destroy };
export default redirectionsApi;
