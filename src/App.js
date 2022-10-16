import Employee from "./models/employee";
import Login from "./components/Login";
import jsonEmployees from "./database/employees.json";
import React, { useState } from "react";

function App() {
  const [employees, setEmployees] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const handleGoodUser = (user) => {
    setCurrentUser(user);
  };

  const handleBadUser = () => {
    console.log("Bad Credentials");
    setCurrentUser(null);
  };

  React.useEffect(() => {
    const allEmployees = [];
    jsonEmployees.forEach((employee) => {
      allEmployees.push(
        new Employee(
          employee.name,
          employee.email,
          employee.password,
          employee.role
        )
      );
    });
    setEmployees(allEmployees);
  }, []);

  return (
    <div className="App">
      <Login
        employees={employees}
        handleGoodUser={handleGoodUser}
        handleBadUser={handleBadUser}
      />
      {currentUser && <div>Welcome, {currentUser.name}</div>}
    </div>
  );
}

export default App;
