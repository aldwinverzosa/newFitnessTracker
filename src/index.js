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
import EditActivity from "./editActivity";
import MyProfile from "./myRoutines";
import { clearCurrentActivity, clearCurrentRoutine, clearCurrentToken, clearCurrentUser } from "./auth";
import CreateRoutine from './createRoutine';
import CreateActivity from "./createActivity";
import EditRoutine from "./editRoutine";
import AddActivity from "./addActivity";
import ViewPublicRoutines from './viewPublicRoutines';


const App = () => {

  const [currentUser, setCurrentUser] = useState(null);
  const [viewPublicRoutines, setViewPublicRoutines] = useState([]);
  const [allActivities, setAllActivities] = useState([]);
  const [token, setToken] = useState(null);
  
  
  let logInStr = '';

  let navigate = useNavigate();
  
  const logOutUser = () => {

    if (currentUser && logInStr === "Log Out") {
      setCurrentUser(null);
      setToken(null);
      clearCurrentUser();
      clearCurrentToken();
      clearCurrentActivity();
      clearCurrentRoutine();
    }
  }

  if (currentUser) {
    logInStr = "Log Out";
    } else {
      console.log("Why are we coming here");
    logInStr = "Log In";
  }

  return (
    <div>
      <div>
        <nav className="navbar">
          <ul className="nav-list">
            <li className="list-item"><Link to="/loggedinDashboard"></Link></li>
            <li className="list-item"><Link to="/allroutines">Routines</Link></li>
            <li className="list-item"><Link to="/allactivities">Activities</Link></li>
            <li className="list-item"><Link to="/myRoutines">My Routines</Link></li>
            <li className="list-item"><Link to="/createroutine">Create Routine</Link></li> 
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
          <Route path="/allactivities" element={<AllActivities currentUser={currentUser} setViewPublicRoutines={setViewPublicRoutines} viewPublicRoutines={viewPublicRoutines}
                                                allActivities={allActivities} setAllActivities={setAllActivities}/>}></Route>
          <Route path="/allroutines" element={<AllRoutines/>}></Route>
          <Route path="/loggedinDashboard" element={<LoggedInDashboard currentUser={currentUser}/>}></Route>
          <Route path="/editActivity" element={<EditActivity />}></Route>
          <Route path="/editRoutine" element={<EditRoutine />}></Route>
          <Route path="/createActivity" element={<CreateActivity />}></Route>
          <Route path="/myRoutines" element={<MyProfile />}></Route>
          <Route path="/createroutine" element={<CreateRoutine currentUser={currentUser}/>}></Route>
          <Route path="/addActivity" element={<AddActivity allActivities={allActivities}/>}></Route>
          <Route path="/viewPublicRoutines" element={<ViewPublicRoutines setViewPublicRoutines={setViewPublicRoutines} viewPublicRoutines={viewPublicRoutines}/>}></Route>
         
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
