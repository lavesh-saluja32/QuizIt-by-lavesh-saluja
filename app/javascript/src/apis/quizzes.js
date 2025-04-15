import axios from "axios";

const baseURL = "/admin/quizzes";
const quizURL = quizId => `${baseURL}/${quizId}`;

const create = payload =>
  axios.post(baseURL, {
    quiz: payload,
  });

const fetch = params => axios.get(baseURL, { params });
const update = ({ quizId, payload }) =>
  axios.put(`${baseURL}/${quizId}`, {
    quiz: payload,
  });

const show = quizId => axios.get(quizURL(quizId));

const destroy = quizId => axios.delete(quizURL(quizId));

const clone = quizId => axios.post(`${quizURL(quizId)}/clone`);

const bulkDelete = ids =>
  axios.delete(`${baseURL}/bulk_delete`, {
    data: { ids },
  });

const bulkUpdate = payload =>
  axios.patch(`${baseURL}/bulk_update`, {
    quizzes: payload,
  });

const createReport = quizId => axios.post(`${quizURL(quizId)}/report`);

const downloadReport = quizId =>
  axios.get(`${quizURL(quizId)}/report`, {
    responseType: "blob",
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
  createReport,
  downloadReport,
};
export default quizzesApi;
