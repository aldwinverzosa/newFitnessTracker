import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";



const RegUser = () => {
  const [newUser, setNewUser] = useState("");
  const [newPassword, setNewPassword] = useState("");
  let [apiSuccess, setApiSuccess] = useState("");

  const handleSubmit = async (event) => {

    const path = process.env.REACT_APP_BASE_URL;
    event.preventDefault();
    console.log("NAME AND PASSWORD", newUser, newPassword);
    // console.log("registerUser");
    const response = await fetch("https://localhost:3001/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username: newUser,
          password: newPassword,
        },
      }),
    });

    const data = await response.json();
    console.log("data", data);
    //console.log("data2", data.data.token);
    //console.log("SUCCESS", data.success);
    apiSuccess = setApiSuccess(data.success);
    console.log("apiSuccess", apiSuccess);
    console.log("apiSuccess datatype", typeof apiSuccess);
    setNewUser("");
    setNewPassword("");
  };
  return (
    <div>
      <div>
        <nav className="nav">
  
          <Link className="navBarLink" to="/login">
            Login
          </Link>

        </nav>
      </div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        NAME
        <input
          type="text"
          value={newUser}
          onChange={(event) => {
            setNewUser(event.target.value);
            console.log(event.target.value);
          }}
        ></input>
        PASSWORD
        <input
          type="password"
          value={newPassword}
          onChange={(event) => {
            setNewPassword(event.target.value);
            console.log(event.target.value);
          }}
        ></input>
        <button type="text">Register</button>
        <h4>{apiSuccess}</h4>
        {apiSuccess === false ? (
          <h3>User name already exists!</h3>
        ) : apiSuccess === true ? (
          <h3>You have successfully registered. Please Login</h3>
        ) : (
          ""
        )}
      </form>
    </div>
  );
};

export default RegUser;
