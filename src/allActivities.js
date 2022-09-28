import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LogoutButton from "./logoutButton";
import Login from "./login";

const REACT_APP_BASE_URL = "http://localhost:3001/api/";

const AllActivities = () => {
  const [allRoutines, setallRoutines] = useState([]);

  useEffect(() => {
    const getAllData = async () => {
      await getallRoutines();
    };
    getAllData();
  }, []);

  const getAllRoutines = async () => {
    const response = await fetch(`http://localhost:3001/api/routines`);
    const data = await response.json();
    console.log("DATA", data);
    setallRoutines(data)


  };
  getAllRoutines();

  return (
    <div>
      <nav>
        <Link className="navBarLink" to="/">
          Register
        </Link>
        <Link className="navBarLink" to="/login">
          Login
        </Link>
      </nav>
      <div className="logout2">
        <LogoutButton />
      </div>
      <h1>All Activities</h1>

      {allRoutines.map((singleItem, i) => {
        return (
          <div className="card" key={i}>
            <h2 className="postName">{singleItem.Activity[i].name}</h2>
            <h2 className="postName">Description: {singleItem.Activity[i].description}</h2>
          </div>
        );
      })}
    </div>
  );
};

export default AllActivities;
