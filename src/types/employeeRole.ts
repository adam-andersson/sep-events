export type EmployeeRole =
  | "Customer Service Officer"
  | "Senior Customer Service Officer "
  | "Human Resources"
  | "Marketing"
  | "Administration Manager"
  | "Financial Manager"
  | "Production Manager"
  | "Production Team"
  | "Service Manager"
  | "Vice President"
  | "Unknown Role";
export const isOfTypeEmployeeRole = (role: string): role is EmployeeRole => {
  return [
    "Customer Service Officer",
    "Senior Customer Service Officer ",
    "Human Resources",
    "Marketing",
    "Administration Manager",
    "Financial Manager",
    "Production Manager",
    "Production Team",
    "Service Manager",
    "Vice President",
  ].includes(role);
};
