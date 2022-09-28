import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LogoutButton from "./logoutButton";
import Login from "./login";

const REACT_APP_BASE_URL = "http://localhost:3001/api/";

const AllRoutines = () => {
  const [allRoutines, setallRoutines] = useState([]);

  useEffect(() => {
    const getAllData = async () => {
      await getAllRoutines();
    };
    getAllData();
  }, []);

  const getAllRoutines = async () => {
    const response = await fetch(`http://localhost:3001/api/routines`);
    const data = await response.json();
    console.log("DATA", data);
    setallRoutines(data)

    // const routine1_activity1_description = data[0].Activity[0].description;
    // const routine1 = data[0];
    // const routine1_activity1 = routine1.Activity[0];
    // const routine1_activity_1_DESCRIPTION = routine1_activity1.description;
    // id = element1.id;
  };
//   getAllRoutines();

  return (
    <div>
      <h1>All Routines</h1>

      {allRoutines.map((singleItem, i) => {
        return (
          <div className="card" key={i}>
            <h2 className="postName">NAME: {singleItem.name}</h2>
            <h2 className="postName">Goal: {singleItem.goal}</h2>
          </div>
        );
      })}
    </div>
  );
};

export default AllRoutines;
