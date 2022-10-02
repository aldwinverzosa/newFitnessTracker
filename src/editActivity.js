import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate, Redirect } from 'react-router-dom';
import { clearCurrentActivity, getCurrentActivity } from './auth';

const EditActivity = () => {

    let navigate = useNavigate();
    
    const path = process.env.REACT_APP_BASE_URL;
    const activity = getCurrentActivity();
    const id = activity.id;

                
    const handleSubmit = (event) => {
        event.preventDefault();
    }

    const handleEditActivity = async () => {

        console.log("Inside edit activity and index is ", id);
        

        const response = await fetch(`${path}/activities/${id}`, {
          method: "PATCH",
          headers: {
              'Content-Type': 'application/json',
              },
              body : JSON.stringify({
                
                      name: document.getElementById("name").value,
                      description: document.getElementById("description").value
             
              })
        });
        const data = await response.json();
        console.log('data', data);
        clearCurrentActivity();
        navigate('/allactivities');
    }
   
    
    return (

        <div className="edit-activity">
            <form id="editform" className="edit" onClick={ handleSubmit }> {/*onClick={ handleSubmit }>*/}
            {
                <>
                    <label htmlFor="title">Enter Activty Name: </label>
                    <input id="name" name="name" type="text" defaultValue={activity.name}></input>
                    <label htmlFor="description">Description: </label>
                    <input id="description" type="text" name="description" defaultValue={activity.description}></input>
                    <input type="submit" onClick={handleEditActivity} value="Edit Activity"></input>
                </>
            } 
            </form>
        </div>
                
    )

}

export default EditActivity;