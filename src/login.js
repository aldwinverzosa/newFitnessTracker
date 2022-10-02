import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoggedInDashboard from "./loggedInDashboard";
import { storeCurrentUser, storeCurrentToken, clearCurrentToken, getCurrentToken, clearCurrentUser } from './auth';


const Login = (props) => {

  const currentUser = props.currentUser;
  const setCurrentUser = props.setCurrentUser;
  const token = props.token;
  const setToken = props.setToken;

  let UserName = '';
  const path = process.env.REACT_APP_BASE_URL;
  let navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleUserLogout = (event) => {
    setCurrentUser(null);
    clearCurrentToken();
    clearCurrentUser();
  }

  const handleUserLogin = async () => {

    console.log("User name and password are ", document.getElementById("username").value, document.getElementById("password").value);

    const response = await fetch(`${path}/users/login`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
          {
            username: document.getElementById("username").value,
            password: document.getElementById("password").value
          }
        )
    });
    
    const data = await response.json();
    console.log("Data is ", data);
    
    if (!data.success) {
        alert(data.message);
        //bError = true;
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
        document.getElementById("username").focus();
    } else {
        //bError = false;
        alert(data.message);
        setToken(data.token);
        setCurrentUser(data.user.username);
        storeCurrentUser(data.user);
        storeCurrentToken(data.token);
        navigate('/loggedInDashboard');  
     }
}

const saveUsername = () => {

  UserName = document.getElementById("username").value;
  console.log("Inside save username", UserName);

}

  return (
    <div className="container">
      <h1>Login</h1>
      <form id="login" className="user-login" onSubmit={handleSubmit}>
        <label htmlFor="username">Username: </label>
        <input
          id="username"
          name="username"
          onBlur={saveUsername}
          type="text"
          placeholder="Enter username"
          required
        ></input>
        <label htmlFor="password">Password: </label>
        <input
          id="password"
          type="password"
          name="password"
          //pattern="(?=.*\d)(?=.*[a-z])(?=.{8,}"
          placeholder="Enter password"
          title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
          required
        ></input>
        <input type="submit" onClick={handleUserLogin} value="Login"></input>
      </form>
    </div>
  );
};

export default Login;