import React from "react";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { getCurrentToken, getCurrentUser } from "./auth";

//DELETE /api/routines/:routineId (**)
const path = process.env.REACT_APP_BASE_URL;

const CreateRoutine = () => {
  const [name, setname] = useState("");
  const [goal, setgoal] = useState("");

  const navigate = useNavigate();

  const user = getCurrentUser();
  //   console.log(user.username);
    
    const username = user.username;
    const token = getCurrentToken();
    let data = [];

  const handleSubmit = (event) => {
      event.preventDefault();
  }
  const PostHandle = async (ev) => {
    
    console.log("name", name);
    console.log("goal", goal);
    const response = await fetch(`${path}/routines`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
         
          name,
          goal, 
        
      }),
    });
    const data = await response.json();
    console.log("DATA", data);

    setname("");
    setgoal("");
    navigate('/myRoutines')
  };

  return (
    <div>
      <nav>

      </nav>
      <div className="logout2">
        </div>

      <h1>Create Routine</h1>
      <form onSubmit={handleSubmit}>
        Routine Name
        <input
          type="text"
          value={name}
          onChange={(event) => {
            setname(event.target.value);
            console.log(event.target.value);
          }}
        ></input>
        Goal
        <input
          type="text"
          value={goal}
          onChange={(event) => {
            setgoal(event.target.value);
            console.log(event.target.value);
          }}
        ></input>
  
        <button type="text" onClick={PostHandle}>Create</button>
      </form>
    </div>
  );
};

export default CreateRoutine;







// import React from "react";
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import LogoutButton from "./logoutButton";
// import Login from "./login";

// const REACT_APP_BASE_URL = "http://localhost:3001/api/";

// const CreateRoutine = () => {
//   const [CreateRoutine, setCreateRoutine] = useState([]);

//   useEffect(() => {
//     const getAllData = async () => {
//       await getCreateRoutine();
//     };
//     getAllData();
//   }, []);

//   const getCreateRoutine = async () => {
//     const response = await fetch(`http://localhost:3001/api/routines`);
//     const data = await response.json();
//     console.log("DATA", data);
//     setCreateRoutine(data);

//     // const routine1_activity1_goal = data[0].Activity[0].goal;
//     // const routine1 = data[0];
//     // const routine1_activity1 = routine1.Activity[0];
//     // const routine1_activity_1_goal = routine1_activity1.goal;
//     // id = element1.id;
//   };
//   //   getCreateRoutine();

//   return (
//     <div>
//       <h1>Create Routine</h1>


//     </div>
//   );
// };

// export default CreateRoutine;
