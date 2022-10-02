import React from "react";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { getCurrentToken, getCurrentUser } from "./auth";

const path = process.env.REACT_APP_BASE_URL;

const ViewPublicRoutines = (props) => {


  const viewPublicRoutines = props.viewPublicRoutines;
  const setViewPublicRoutines = props.setViewPublicRoutines;

  const navigate = useNavigate();

  const handleSubmit = (event) => {
      event.preventDefault();
  }

  console.log("View public routines are ", viewPublicRoutines);
  const routines = viewPublicRoutines.routines;

  return (
    <div>
    <h1>Public routines</h1>
    {
              routines.length ?
              routines.map((routine, index) => {
                return (
             
                  <div key={index}>
                    <h3>Routine {index + 1}:</h3>
                    <h3>ID: {routine.id}</h3>
                    <h3>Creator ID: {routine.creatorId}</h3>
                    <h3>Creator Name: {routine.creatorName}</h3>
                    <h3>Is Public: {routine.isPublic}</h3>
                    <h3>Name: {routine.name}</h3>
                    <hr></hr>
                  </div>
             
                )
              })
              :
              <>
              <h2>show nothing</h2>
              </>
            }
    </div>
  )

}

export default ViewPublicRoutines;