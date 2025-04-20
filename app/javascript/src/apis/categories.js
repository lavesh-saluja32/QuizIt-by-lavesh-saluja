import axios from "axios";

const baseURL = "/admin/categories";
const categoryURL = id => `${baseURL}/${id}`;

const fetch = () => axios.get(baseURL);
const reorder = ({ categoryId, payload }) =>
  axios.patch(`${categoryURL(categoryId)}/reorder`, { category: payload });

const create = payload => axios.post(baseURL, { category: payload });

const update = ({ categoryId, payload }) =>
  axios.patch(categoryURL(categoryId), { category: payload });

const show = categoryId => axios.get(categoryURL(categoryId));

const destroy = ({ categoryId, newCategoryId = "" }) =>
  axios.delete(categoryURL(categoryId), {
    data: {
      category: { new_category_id: newCategoryId },
    },
  });
const categoriesApi = { fetch, reorder, create, update, show, destroy };
export default categoriesApi;
