export type EventStatus =
  | "Pending"
  | "Accepted"
  | "Rejected"
  | "Under Financial Review"
  | "Under Administration Review";
export const isOfTypeEventStatus = (status: string): status is EventStatus => {
  return [
    "Pending",
    "Accepted",
    "Rejected",
    "Under Financial Review",
    "Under Administration Review",
  ].includes(status);
};
