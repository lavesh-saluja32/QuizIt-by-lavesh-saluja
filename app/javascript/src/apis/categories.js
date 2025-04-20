import axios from "axios";

const baseURL = "/admin/categories";
const categoryURL = id => `${baseURL}/${id}`;

const fetch = () => axios.get(baseURL);
const reorder = ({ categoryId, payload }) =>
  axios.post(`${categoryURL(categoryId)}/reorder`, { category: payload });

const categoriesApi = { fetch, reorder };
export default categoriesApi;
