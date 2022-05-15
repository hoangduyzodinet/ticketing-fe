import moment from "moment";

export const formatDate = (date: string): string => {
    return moment(new Date(date)).format("DD/MM/YYYY");
};
