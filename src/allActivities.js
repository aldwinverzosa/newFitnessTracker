import React from "react";
import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import LogoutButton from "./logoutButton";
import Login from "./login";
import { clearCurrentActivity, storeCurrentActivity } from "./auth";

const AllActivities = (props) => {

  //const [activities, setAllActivities] = useState([]);
  const activities = props.allActivities;
  const setAllActivities = props.setAllActivities;
  const viewPublicRoutines = props.viewPublicRoutines;
  const setViewPublicRoutines = props.setViewPublicRoutines
  
  
  const currentUser = props.currentUser;
  
  console.log("Current User is ", currentUser);

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
    const response = await fetch(`${path}/activities`);
    const data = await response.json();
    console.log("DATA", data);
    // console.log("ACTIVITY", data.activities);

    // console.log("activity name", data.activities[0].name);
    const data2 = data.activities
    console.log('data2', data2)
    setAllActivities(data2);
    
  };

  const getPublicRoutines = async (id) => {

    console.log("Inside view public routines", id);
    const response = await fetch(`${path}/activities/${id}/routines`);
    const data = await response.json();
        
    if (data.success) {
      console.log(data);
      setViewPublicRoutines(data);
      navigate('/viewPublicRoutines');
    } else {
      alert("No public routines for this activity");
    }

  }

  const createActivity = async () => {

    console.log("Inside create activity");
    navigate('/createActivity');

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
            <button onClick={() => getPublicRoutines(singleItem.id)}>View Public Routines</button>
            {
              currentUser ?
              <>
                <button disabled={false} onClick={() => editActivity(singleItem)}>Edit</button>
              </>
              :
              <>
                <button disabled={true} onClick={() => editActivity(singleItem)}>Edit</button> 
              </> 
            }
            
          </div>
        );
      })}
    </div>
  );
};

export default AllActivities;
