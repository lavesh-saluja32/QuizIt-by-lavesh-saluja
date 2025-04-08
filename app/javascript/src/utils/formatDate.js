import dayjs from "dayjs";

export const formatDate = (dateString, time = false) => {
  if (!dateString) return "";

  return time
    ? dayjs(dateString).format("DD MMMM YYYY, hh:mm A")
    : dayjs(dateString).format("DD MMMM YYYY");
};
