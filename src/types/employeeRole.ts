export type EmployeeRole =
  | "Customer Service Officer"
  | "Senior Customer Service Officer "
  | "Human Resources"
  | "Marketing"
  | "Administration"
  | "Financial Manager"
  | "Production Manager"
  | "Service Manager"
  | "Vice President"
  | "Unknown Role";
export const isOfTypeEmployeeRole = (role: string): role is EmployeeRole => {
  return [
    "Customer Service Officer",
    "Senior Customer Service Officer ",
    "Human Resources",
    "Marketing",
    "Administration",
    "Financial Manager",
    "Production Manager",
    "Service Manager",
    "Vice President",
  ].includes(role);
};
