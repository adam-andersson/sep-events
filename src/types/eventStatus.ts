export type EventStatus = "Pending" | "Accepted" | "Rejected";
export const isOfTypeEventStatus = (status: string): status is EventStatus => {
  return ["Pending", "Accepted", "Rejected"].includes(status);
};
