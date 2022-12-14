import { EmployeeRole, isOfTypeEmployeeRole } from "../types/employeeRole";

class Employee {
  name: string;
  email: string;
  password: string;
  role: EmployeeRole = "Unknown Role";

  constructor(name: string, email: string, password: string, role: string) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.setEmployeeRole(role);
  }

  setEmployeeRole(role: string) {
    if (isOfTypeEmployeeRole(role)) this.role = role;
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

  canCreateRecruitmentRequest() {
    return (
      this.role === "Production Manager" || this.role === "Service Manager"
    );
  }

  canEditRecruitmentRequest() {
    return this.canCreateFinancialRequest() || this.role === "Human Resources";
  }

  canProcessRecruitmentRequest() {
    return this.role === "Human Resources";
  }

  canViewRecruitmentRequest() {
    return this.canEditRecruitmentRequest();
  }

  canCreateDepartmentTasks() {
    return (
      this.role === "Production Manager" || this.role === "Service Manager"
    );
  }

  isInSubteamAndNotManager() {
    return (
      (this.isInProductionTeam() || this.isInServicesTeam()) &&
      !this.canCreateDepartmentTasks()
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
