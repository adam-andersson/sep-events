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

  convertToJson() {
    return JSON.stringify(this);
  }
}

export default Employee;
