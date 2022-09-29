import React from "react";
import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import LogoutButton from "./logoutButton";
import Login from "./login";
import { storeCurrentActivity } from "./auth";




const AllActivities = () => {
  const [activities, setAllActivities] = useState([]);
  const path = process.env.REACT_APP_BASE_URL;
  let navigate = useNavigate();

  useEffect(() => {
    const getAllData = async () => {
      await getAllActivities();
    };
    getAllData();
  }, []);

  const editActivity = async (activity) => {

    storeCurrentActivity(activity);
    await navigate("/editActivity");
  
  }

  const getAllActivities = async () => {
    const response = await fetch(`http://localhost:3001/api/activities`);
    const data = await response.json();
    console.log("DATA", data);
    // console.log("ACTIVITY", data.activities);

    // console.log("activity name", data.activities[0].name);
    const data2 = data.activities
    console.log('data2', data2)
    setAllActivities(data2)

    // const routine1_activity1_description = data[0].Activity[0].description;
    // const routine1 = data[0];
    // const routine1_activity1 = routine1.Activity[0];
    // const routine1_activity_1_DESCRIPTION = routine1_activity1.description;
    // id = element1.id;
  };

  const createActivity = async () => {

    console.log("Inside create activity");
    await navigate('/createActivity');

  }


  return (
    <div>
      <h1>All Activities</h1>
      <button id="addactivity" onClick={createActivity}>Add an Activity</button>

      {activities.map((singleItem, i) => {
        return (
          <div className="card" key={i}>
            <h2 className="postName">NAME: {singleItem.name}</h2>
            <h2 className="postName">DESCRIPTION: {singleItem.description}</h2>
            <h2 className="postName">ID: {singleItem.id}</h2>
            <button onClick={() => editActivity(singleItem)}>Edit</button>
          </div>
        );
      })}
    </div>
  );
};

export default AllActivities;