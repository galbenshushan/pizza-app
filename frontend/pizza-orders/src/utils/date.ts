import { format } from "date-fns";

export const getFormattedTime = (date: string) => {
  return format(new Date(date), "dd/MM/yyyy HH:mm");
};
