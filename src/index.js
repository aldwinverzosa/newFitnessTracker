console.log("HELLO");
import { createRoot } from "react-dom/client";
import React from "react";
import { Link } from "react-router-dom";
import Login from "./login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  console.log("hello from index.js");

  return (
    <div>
      <div>
        <h1>Fitness Tracker</h1>
        <nav>
          <ul className="nav-list">
            <li className="list-item">
              <Link to="/login"> </Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </div>

      <h1>React is super cool</h1>
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
