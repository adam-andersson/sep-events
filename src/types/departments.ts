export type Department =
  | "Administration"
  | "Services"
  | "Production"
  | "Financial";

export const isOfTypeDepartment = (status: string): status is Department => {
  return ["Administration", "Services", "Production", "Financial"].includes(
    status
  );
};
