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
      this.role === "Senior Customer Service Officer" ||
      this.role === "Administration Manager"
    );
  }

  canEditEvent() {
    return (
      this.role === "Senior Customer Service Officer" ||
      this.role === "Financial Manager" ||
      this.role === "Administration Manager"
    );
  }

  canEditEventDetails() {
    return (
      this.role === "Customer Service Officer" ||
      this.role === "Senior Customer Service Officer" ||
      this.role === "Administration Manager"
    );
  }

  canAddFinancialComments() {
    return this.role === "Financial Manager";
  }

  canRedirectToFinancialManager() {
    return (
      this.role === "Senior Customer Service Officer" ||
      this.role === "Financial Manager" ||
      this.role === "Administration Manager"
    );
  }

  canRedirectToAdministrationManager() {
    return (
      this.role === "Financial Manager" ||
      this.role === "Administration Manager"
    );
  }

  canRejectEvent() {
    return (
      this.role === "Senior Customer Service Officer" ||
      this.role === "Administration Manager"
    );
  }

  canAcceptEvent() {
    return this.role === "Administration Manager";
  }

  convertToJson() {
    return JSON.stringify(this);
  }
}

export default Employee;
