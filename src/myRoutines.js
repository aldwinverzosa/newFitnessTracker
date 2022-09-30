import { useEffect, useState } from "react";
import { getCurrentToken, getCurrentUser } from "./auth";

const path = process.env.REACT_APP_BASE_URL;

const MyProfile = () => {
  const [myResult, setmyResult] = useState([]);

  useEffect(() => {
    const getAllData = async () => {
      await test();
    };
    getAllData();
  }, []);


  const user = getCurrentUser();
//   console.log(user.username);
  const username = user.username;
  const token = getCurrentToken();
  let data = [];

  const test = async () => {
    const response = await fetch(
      `${path}/users/${username}/routines`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    data = await response.json(); 
    console.log("DATA", data);
    console.log("DATA", data[0].name);
    console.log("DATA", data.isPublic);



     
    
    // const result3 = data.isPublic.filter(
    //     (post) => post.isPublic === false
    //   );
    // const result = data.filter(item => data.isP);

      setmyResult(data)

    // console.log("TEST", data[0].creatorName)
    // console.log("DATA CREATOR NAME", data[0].creatorName);

    // setmyResult(data);


  };


//   test();

    // const onLoad = () => {
    //   useEffect(() => {
    //     test();
    //   }, [test]);
    // };
    // onLoad();


  return (
    <div>
        <h1>{`${username}`}'s Routines</h1>
      <h1>
       
      {myResult.map((singleItem, i) => {
        return (
          <div className="card" key={i}>
            <h2 className="postName">NAME: {singleItem.name}</h2>
            <h2 className="postName">Creator: {singleItem.creatorName}</h2>
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
      </h1>
    </div>
  );
};

export default MyProfile;
