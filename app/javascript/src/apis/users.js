import axios from "axios";
import { getFromLocalStorage } from "utils/storage";

const authUserId = getFromLocalStorage("authUserId");
const show = () => axios.get(`/users/${authUserId}`);
const update = payload =>
  axios.patch(`/users/${authUserId}`, {
    user: payload,
  });
const usersApi = { show, update };
export default usersApi;
