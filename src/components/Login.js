import React, { useState } from "react";

const Login = ({ employees, handleGoodUser, handleBadUser }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSetName = (newNameEvent) => {
    setName(newNameEvent.target.value);
  };

  const handleSetPassword = (newPasswordEvent) => {
    setPassword(newPasswordEvent.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const user = employees.find((employee) => employee.name === name);
    if (user && user.password === password) {
      handleGoodUser(user);
    } else {
      handleBadUser();
    }
  };

  return (
    <div style={{ margin: "30px" }}>
      <form onSubmit={handleSubmit}>
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
    </div>
  );
};

export default Login;
