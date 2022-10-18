import React, { useState } from "react";
import Employee from "../models/employee";

const Login: React.FC<{
  employees: Employee[];
  handleGoodUser: (user: Employee) => void;
  handleBadUser: () => void;
}> = ({ employees, handleGoodUser, handleBadUser }) => {
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [invalidUserCred, setInvalidUserCred] = useState<boolean>(false);

  const handleSetName = (newNameEvent: React.ChangeEvent<HTMLInputElement>) => {
    setInvalidUserCred(false);
    setName(newNameEvent.target.value.toLowerCase());
  };

  const handleSetPassword = (
    newPasswordEvent: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInvalidUserCred(false);
    setPassword(newPasswordEvent.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const user = employees.find((employee: Employee) => employee.name === name);
    if (user && user.password === password) {
      handleGoodUser(user);
    } else {
      setInvalidUserCred(true);
      handleBadUser();
    }
  };

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        marginTop: "50px",
        marginBottom: "50px",
      }}
    >
      <div>
        <h2 style={{ marginTop: "0" }}>Please enter your login details.</h2>

        <form onSubmit={handleSubmit} style={{ display: "flex", gap: "10px" }}>
          <label>Name:</label>
          <input type="text" value={name} onChange={handleSetName}></input>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={handleSetPassword}
          ></input>

          <input type="submit"></input>
        </form>

        {invalidUserCred && (
          <div style={{ margin: "10px" }}>
            The credentials that you have entered does not exist in the
            database. <br />
            <i>Hint: name: $name and password: 1234</i>
          </div>
        )}
      </div>

      <div>
        <h3 style={{ marginBottom: "0" }}>Available users:</h3>
        <table id="employees">
          <thead>
            <tr>
              <td>
                <b>Name</b>
              </td>
              <td>
                <b>Role</b>
              </td>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, i) => (
              <tr key={i}>
                <td>{employee.name}</td>
                <td>{employee.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Login;
