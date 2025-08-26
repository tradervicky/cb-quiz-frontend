import moment from "moment";
export const getToday = () => moment().format("DD/MM/YYYY");
export const getDate = (date: string) => moment(date).format("DD/MM/YYYY");
