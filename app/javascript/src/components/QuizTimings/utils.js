export const getHours = (time = 0) => Math.floor(time / 60);
export const getMinutes = (time = 0) => time % 60;
