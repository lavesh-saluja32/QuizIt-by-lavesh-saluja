import dayjs from "dayjs";

export const formatDate = dateString => {
  if (!dateString) return "";

  return dayjs(dateString).format("DD MMMM YYYY");
};
