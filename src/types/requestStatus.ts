export type RequestStatus = "Pending" | "Processed" | "Rejected";

export const isOfTypeRequestStatus = (
  status: string
): status is RequestStatus => {
  return ["Pending", "Processed", "Rejected"].includes(status);
};
