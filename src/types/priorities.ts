export type Priority = "Low" | "Medium" | "High";
export const isOfTypePriority = (priority: string): priority is Priority => {
  return ["Low", "Medium", "High"].includes(priority);
};
