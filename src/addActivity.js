import React from "react";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { getCurrentToken, getCurrentUser } from "./auth";
import { ListBox } from 'primereact/listbox';
import 'react-listbox/dist/react-listbox.css';
//import 'primereact/core/core.min.js';
//import 'primereact/listbox/listbox.min.js';

const AddActivity = (props) => {

  const allActivities = props.allActivities;
    
  const navigate = useNavigate();
  const path = process.env.REACT_APP_BASE_URL;
  let opt = '';
  
  console.log("All Activities are ", allActivities);
  const activities = allActivities;
   
  const OPTIONS = [];
  for (let i = 0; i < activities.length; i++) {
    OPTIONS.push(activities[i].name);
    console.log("Options are ", OPTIONS);
  }
  
  const handleSubmit = (event) => {
      event.preventDefault();
  }
  
   return (
          <div>
            <ListBox options={OPTIONS}/>                 
          </div>
       )
}

export default AddActivity;