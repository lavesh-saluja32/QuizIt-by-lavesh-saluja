import axios from "axios";

const create = payload =>
  axios.post("/admin/quizzes", {
    quiz: payload,
  });

const fetch = params => axios.get("/admin/quizzes", { params });
const update = ({ quizId, payload }) =>
  axios.put(`/admin/quizzes/${quizId}`, {
    quiz: payload,
  });

const show = quizId => axios.get(`/admin/quizzes/${quizId}`);

const destroy = quizId => axios.delete(`/admin/quizzes/${quizId}`);

const clone = quizId => axios.post(`/admin/quizzes/${quizId}/clone`);

const bulkDelete = ids =>
  axios.delete("/admin/quizzes/bulk_delete", {
    data: { ids },
  });

const bulkUpdate = payload =>
  axios.patch("/admin/quizzes/bulk_update", {
    quizzes: payload,
  });

const quizzesApi = {
  create,
  fetch,
  update,
  show,
  destroy,
  clone,
  bulkDelete,
  bulkUpdate,
};
export default quizzesApi;
