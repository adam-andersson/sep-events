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

  canViewEvent() {
    return (
      this.canCreateEvent() ||
      this.canEditEvent() ||
      this.role === "Production Manager" ||
      this.role === "Service Manager"
    );
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

  canCreateFinancialRequest() {
    return (
      this.role === "Production Manager" || this.role === "Service Manager"
    );
  }

  canEditFinancialRequest() {
    return (
      this.canCreateFinancialRequest() || this.role === "Financial Manager"
    );
  }

  canProcessFinancialRequest() {
    return this.role === "Financial Manager";
  }

  canViewFinancialRequest() {
    return this.canEditFinancialRequest();
  }

  canViewDepartmentTasks() {
    return this.isInProductionTeam() || this.isInServicesTeam();
  }

  canCreateDepartmentTasks() {
    return (
      this.role === "Production Manager" || this.role === "Service Manager"
    );
  }

  isInProductionTeam() {
    return (
      this.role === "Production Manager" ||
      this.role === "Decorating Architect" ||
      this.role === "Decorating Specialist" ||
      this.role === "Assistant"
    );
  }

  isInServicesTeam() {
    return (
      this.role === "Service Manager" ||
      this.role === "Top Chef" ||
      this.role === "Chef"
    );
  }

  convertToJson() {
    return JSON.stringify(this);
  }
}

export default Employee;
