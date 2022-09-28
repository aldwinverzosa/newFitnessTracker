import { createRoot } from "react-dom/client";
import React, { useState, useEffect } from "react";
import Login from "./login";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import Dashboard from "./notLoggedinDashboard";
import LogoutButton from "./logoutButton";
import Register from "./registerPage";
import LoggedInDashboard from "./loggedInDashboard";
import AllRoutines from "./allRoutines";
import AllActivities from "./allActivities";

const App = () => {

  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(null);
  let logInStr = '';

  let navigate = useNavigate();
  
  useEffect(() => {

    if (currentUser) {
      console.log("Current user is ", currentUser);
      
    }
  }, [currentUser]); 

  if (currentUser) {
    logInStr = "Log Out";
    } else {
    logInStr = "Log In";
  }

  const logOutUser = () => {

    if (currentUser && logInStr === "Log Out") {
      setCurrentUser(null);
      setToken(null);
    }
}

  return (
    <div>
      <div>
        <nav className="navbar">
          <ul className="nav-list">
            <li className="list-item"><Link to="/loggedinDashboard"></Link></li>
            <li className="list-item"><Link to="/allroutines">Routines</Link></li>
            <li className="list-item"><Link to="/allactivities">Activities</Link></li>
            <li className="list-item"><Link to="/login">My Routines</Link></li>
            <li className="list-item"><Link to="/register">Register</Link></li>
            <li className="list-item" onClick={logOutUser}><Link to="/login">{logInStr}</Link></li>
          </ul>
        </nav>
        <div>
        </div>

        <Routes>
          <Route path="/login" element={<Login currentUser={currentUser} setCurrentUser={setCurrentUser} setToken={setToken} token={token}/>}></Route>
          <Route path="/register" element={<Register currentUser={currentUser} setCurrentUser={setCurrentUser} token={token} setToken={setToken}/>}></Route>
          <Route path="/dashboard" element={<LoggedInDashboard currentUser={currentUser}/>}></Route>
          <Route path="/" element={<Register/>}></Route>
          <Route path="/allactivities" element={<AllActivities/>}></Route>
          <Route path="/allroutines" element={<AllRoutines/>}></Route>
          <Route path="/loggedinDashboard" element={<LoggedInDashboard currentUser={currentUser}/>}></Route>
        </Routes>
      </div>

    </div>
  );
};

const container = document.getElementById("app");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <Router>
    <App />
  </Router>
);
