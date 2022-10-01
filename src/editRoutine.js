import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate, Redirect } from 'react-router-dom';
import { clearCurrentActivity, getCurrentActivity, getCurrentRoutine, getCurrentToken, clearCurrentRoutine} from './auth';

const EditRoutine = () => {

    let navigate = useNavigate();
    const routine = getCurrentRoutine();
    
    const path = process.env.REACT_APP_BASE_URL;
   
    const handleSubmit = (event) => {
        event.preventDefault();
    }

    const handleEditRoutine = async (id) => {

        console.log("Inside edit routine and index is ", id);
        const token = getCurrentToken();
              

        const response = await fetch(`${path}/routines/${id}`, {
          method: "PATCH",
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
              },
              body : JSON.stringify({
                
                      name: document.getElementById("name").value,
                      goal: document.getElementById("goal").value,
                      isPublic: document.getElementById("public").value
             
              })
        });
        const data = await response.json();
        console.log('data', data);
        clearCurrentRoutine();
        navigate('/myRoutines');
    }
   
    
    return (

        <div className="edit-routine">
            <form id="editform" className="edit" > {/*onClick={ handleSubmit }>*/}
            {
                <>
                    <label htmlFor="name">Routine Name: </label>
                    <input id="name" name="name" type="text" defaultValue={routine.name}></input>
                    <label htmlFor="goal">Goal: </label>
                    <input id="goal" type="text" name="goal" defaultValue={routine.goal}></input>
                    <label htmlFor="public">Public: </label>
                    <input id="public" type="text" name="public" defaultValue={routine.isPublic}></input>
                    <input type="submit" onClick={() => handleEditRoutine(routine.id)} value="Edit Routine"></input>
                </>
            } 
            </form>
        </div>
                
    )

}

export default EditRoutine;