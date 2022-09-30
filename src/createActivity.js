import React, { useEffect, useState } from 'react';
import { useNavigate, Redirect } from 'react-router-dom';
import { getCurrentToken, getCurrentUser } from './auth';


const EditActivity = (props) => {

    const currentUser = props.currentUser;

    let navigate = useNavigate();
    
    const path = process.env.REACT_APP_BASE_URL;
    const token = getCurrentToken();
     
                
    const handleSubmit = (event) => {
        event.preventDefault();
    }

    const handleCreateActivity = async () => {

        console.log("Inside create activity and user is", currentUser);
        if (!token) {
            alert("Please login or register to create an activity");
        } else {

            const response = await fetch(`${path}/activities/`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
              },
              body : JSON.stringify({
                
                      name: document.getElementById("name").value,
                      description: document.getElementById("description").value
             
              })
            });
            const data = await response.json();
            if (data.success) {
                console.log('data', data);
                await getAllActivities();
            } else {
                console.log(data.message);
                alert(data.message);
            }
        }
        navigate('/allActivities');
    }
   
    
    return (

        <div className="create-activity">
            <form id="editform" className="edit" > {/*onClick={ handleSubmit }>*/}
            {
                <>
                    <label htmlFor="title">Enter Activty Name: </label>
                    <input id="name" name="name" type="text" placeholder="Enter a name"></input>
                    <label htmlFor="description">Description: </label>
                    <input id="description" type="text" name="description" placeholder="Enter a description"></input>
                    <input type="submit" onClick={handleCreateActivity} value="Create Activity"></input>
                </>
            } 
            </form>
        </div>
                
    )


}

export default EditActivity;