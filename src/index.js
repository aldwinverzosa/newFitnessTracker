import { createRoot } from "react-dom/client";
import React, { useState, useEffect } from "react";
import Login from "./login";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./notLoggedinDashboard";
import LogoutButton from "./logoutButton";
import Register from "./registerPage";
import LoggedInDashboard from "./loggedInDashboard";
import AllRoutines from "./allRoutines";
import AllActivities from "./allActivities";

const App = () => {

  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(null);
  
  useEffect(() => {

    if (currentUser) {
      console.log("Current user is ", currentUser);
    }
  
  }, [currentUser]); 

  return (
    <div>
      <div>
        <nav className="navbar">
          <ul className="nav-list">
            <li className="list-item"><Link to="/login"></Link></li>
          </ul>
        </nav>
        <div>
        </div>

        <Routes>
          <Route path="/login" element={<Login currentUser={currentUser} setCurrentUser={setCurrentUser} setToken={setToken} token={token}/>}></Route>
          <Route path="/register" element={<Register currentUser={currentUser} setCurrentUser={setCurrentUser} token={token} setToken={setToken}/>}></Route>
          <Route path="/dashboard" element={<LoggedInDashboard/>}></Route>
          <Route path="/" element={<Register/>}></Route>
          <Route path="/allactivities" element={<AllActivities/>}></Route>



          <Route path="/allroutines" element={<AllRoutines/>}></Route>


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
