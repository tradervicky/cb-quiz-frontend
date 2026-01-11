import moment from "moment";

// 📅 Common Date Formatters
export const formatDate = (date: string | Date) =>
  moment(date).format("DD/MM/YYYY");

export const formatDateTime = (date: string | Date) =>
  moment(date).format("DD/MM/YYYY HH:mm");

export const formatTime = (date: string | Date) => moment(date).format("HH:mm");

export const formatMonthYear = (date: string | Date) =>
  moment(date).format("MMMM YYYY");

export const formatDayName = (date: string | Date) =>
  moment(date).format("dddd");

export const formatISO = (date: string | Date) => moment(date).toISOString();
export const formatShortMonthDate = (date: string | Date) =>
  moment(date).format("DD MMM YYYY");

export const getToday = () => moment().format("DD/MM/YYYY");
export const getTomorrow = () => moment().add(1, "day").format("DD/MM/YYYY");
export const getYesterday = () =>
  moment().subtract(1, "day").format("DD/MM/YYYY");
export const fromNow = (date: string | Date) => moment(date).fromNow();
