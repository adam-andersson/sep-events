import { EmployeeRole } from "../types/employeeRole";

class Employee {
  name: string;
  email: string;
  password: string;
  role: EmployeeRole;

  constructor(
    name: string,
    email: string,
    password: string,
    role: EmployeeRole
  ) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
  }

  canCreateEvent() {
    return (
      this.role === "Customer Service Officer" ||
      this.role === "Senior Customer Service Officer "
    );
  }

  canEditEvent() {
    return (
      this.role === "Senior Customer Service Officer " ||
      this.role === "Financial Manager" ||
      this.role === "Administration Manager" ||
      this.role === "Production Manager" ||
      this.role === "Service Manager"
    );
  }

  convertToJson() {
    return JSON.stringify(this);
  }
}

export default Employee;
