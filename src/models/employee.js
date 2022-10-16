class Employee {
  name;
  email;
  password;
  role;

  constructor(name, email, password, role) {
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
