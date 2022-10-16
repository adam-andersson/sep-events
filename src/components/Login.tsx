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
    setName(newNameEvent.target.value);
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
    <div style={{ margin: "30px" }}>
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
          The credentials that you have entered does not exist in the database.
        </div>
      )}
    </div>
  );
};

export default Login;
