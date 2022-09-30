import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LogoutButton from "./logoutButton";
import Login from "./login";
import { getCurrentToken } from "./auth";

const path = process.env.REACT_APP_BASE_URL;

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
    setallRoutines(data);

    // const routine1_activity1_description = data[0].Activity[0].description;
    // const routine1 = data[0];
    // const routine1_activity1 = routine1.Activity[0];
    // const routine1_activity_1_DESCRIPTION = routine1_activity1.description;
    // id = element1.id;
  };
  
  const removeActivity = async (id) => {

    console.log("Inside remove activity from routine", id);

    const token = getCurrentToken();
    if (!token) {
      alert("Invalid or no token supplied. Please login or register.")
    } else {
      const response = await fetch(`${path}/routine_activities/${id}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
          },
        });
        const data = await response.json();
        if (data.success) {
            await getAllRoutines();
        } else if (data) {
            alert(data.message);
        }

    }
  }

  return (
    <div>
      <h1>All Routines</h1>

      {allRoutines.map((singleItem, i) => {
        return (
          <div className="card" key={i}>
            <h2 className="postName">NAME: {singleItem.creatorName}</h2>
            <h2 className="postName">NAME: {singleItem.name}</h2>
            <h2 className="postName">Goal: {singleItem.goal}</h2>
            <hr></hr>
            {
              singleItem.activities.length ?
              singleItem.activities.map((activity, index) => {
                return (
                  <>
                  <h3>Activity Name: {activity.name}</h3>
                  <h3>Activity Description: {activity.description}</h3>
                  <h3>Activity Duration: {activity.duration}</h3>
                  <h3>Activity Count: {activity.count}</h3>
                  <h3>Routine Activity ID: {activity.routineActivityId}</h3>
                  <button onClick={() => removeActivity(activity.routineActivityId)}>Remove Activity</button>
                  <hr></hr>
                  </>
                )
              })
              :
              <></>
            }
          </div>
        );
      })}
    </div>
  );
};

export default AllRoutines;
