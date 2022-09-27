console.log("HELLO");
import { createRoot } from "react-dom/client";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Login from "./login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./notLoggedinDashboard";
import LogoutButton from "./logoutButton";
import RegUser from "./registerPage";
import LoggedInDashboard from "./loggedInDashboard";

const App = () => {

  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(null);

  console.log("hello from index.js");

  return (
    <div>
      <div>
        <nav>
          <ul className="nav-list">
            <li className="list-item">
              <Link to="/login"> </Link>
            </li>
          </ul>
        </nav>
        <div>
        </div>

        <Routes>
          <Route path="/login" element={<Dashboard currentUser={currentUser} setCurrentUser={setCurrentUser} setToken={setToken} token={token}/>}></Route>
          <Route path="/" element={<RegUser />}></Route>
          <Route path="/dashboard" element={<LoggedInDashboard/>}></Route>


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
