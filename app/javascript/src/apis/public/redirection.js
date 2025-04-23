import axios from "axios";

const redirect = payload => {
  return axios.post("/redirection", {
    redirection: payload,
  });
};

const redirectionsApi = { redirect };
export default redirectionsApi;
