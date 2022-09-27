import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { storeCurrentUser, storeCurrentToken, clearCurrentToken, getCurrentToken, clearCurrentUser } from './auth';



const Register = (props) => {

  const [newUser, setNewUser] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const setToken = props.setToken;
  const token = props.token;
  const currentUser = props.currentUser;
  const setCurrentUser = props.setCurrentUser;
  
  const handleSubmit = async (event) => {

    const path = process.env.REACT_APP_BASE_URL;

    event.preventDefault();

    if (document.getElementById("password").value !== document.getElementById("confirmpassword").value) {
      alert("Passwords do not match...try again");
      document.getElementById("password").value = "";
      document.getElementById("confirmpassword").value = "";
      document.getElementById("password").focus();
    } else {
         
      console.log("NAME AND PASSWORD", newUser, newPassword);
      const response = await fetch("http://localhost:3001/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          {
            username: newUser,
            password: newPassword,
          },
        ),
      });
      const data = await response.json();
   
      if (data.success) {
        console.log("data is ", data);
        alert(data.message + ' ' + data.user.username);
        setToken(data.token);
        setCurrentUser(data.user.username);
        storeCurrentToken(data.token);
        storeCurrentUser(data.user);
      } else {
        alert("error occurred during registration process")
      }
    }
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
          placeholder="Enter username"
          onChange={(event) => {
            setNewUser(event.target.value);
            console.log("New user set to ", event.target.value);
          }}
        ></input>
        PASSWORD
        <input
          id="password"
          type="password"
          placeholder="Enter password"
          onChange={(event) => {
            setNewPassword(event.target.value);
            console.log(event.target.value);
          }}
        ></input>
        CONFIRM PASSWORD
        <input
          id="confirmpassword"
          type="password"
          placeholder="Confirm password"
          //onChange={(event) => {
          //  setNewPassword(event.target.value);
           // console.log(event.target.value);
          //}}
          ></input>
        <button type="text">Register</button>
        
      </form>
    </div>
  );
};

export default Register;