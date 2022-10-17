export type EmployeeRole =
  | "Customer Service Officer"
  | "Senior Customer Service Officer"
  | "Human Resources"
  | "Marketing"
  | "Administration Manager"
  | "Financial Manager"
  | "Production Manager"
  | "Decorating Architect" // part of decorations team which is a Production subteam
  | "Decorating Specialist" // part of decorations team which is a Production subteam
  | "Assistant" // part of decorations team which is a Production subteam
  | "Service Manager"
  | "Top Chef" // part of chef team which is a Services subteam
  | "Chef" // part of chef team which is a Services subteam
  | "Vice President"
  | "Unknown Role";
export const isOfTypeEmployeeRole = (role: string): role is EmployeeRole => {
  return [
    "Customer Service Officer",
    "Senior Customer Service Officer",
    "Human Resources",
    "Marketing",
    "Administration Manager",
    "Financial Manager",
    "Production Manager",
    "Decorating Architect",
    "Decorating Specialist",
    "Assistant",
    "Service Manager",
    "Top Chef",
    "Chef",
    "Vice President",
    "Unknown Role",
  ].includes(role);
};
