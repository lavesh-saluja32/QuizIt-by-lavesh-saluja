import axios from "axios";

const fetch = params => axios.get("/categories", { params });

const categoriesApi = { fetch };
export default categoriesApi;
