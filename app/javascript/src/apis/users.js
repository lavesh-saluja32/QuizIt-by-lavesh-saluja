import axios from "axios";
import { getFromLocalStorage } from "utils/storage";

const authUserId = getFromLocalStorage("authUserId");
const show = () => axios.get(`/users/${authUserId}`);

const usersApi = { show };
export default usersApi;
