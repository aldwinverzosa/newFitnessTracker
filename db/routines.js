const { attachActivitiesToRoutines } = require('./activities');
const client = require('./client');
const { destroyRoutineActivity } = require('./routine_activities');

async function getRoutineById(id){

  try {
    const { rows: routine } = await client.query(`
    SELECT *
    FROM routines
    WHERE id=$1;
    `, [id]);

    return routine;
  } catch (error) {
    throw error;
  }
}

//TM DEBUG: Should this only return those routines whose AcivityArray length = 0?
//If so, this needs to change to reflect that.
async function getRoutinesWithoutActivities(){

  try {
    const { rows } = await client.query(`
    SELECT *
    FROM routines;
    `);

    return rows;
  } catch (error) {
    throw error;
  }

}

async function getAllRoutines() {
  try {
    const { rows: routines } = await client.query(`
    SELECT routines.*, users.username AS "creatorName"
    FROM routines
    JOIN users ON routines."creatorId" = users.id 
    `);
    console.log("About to call attachActivitiesToRoutines from getAllRoutines and routines is ", routines);
    return attachActivitiesTxoRoutines(routines);
  } catch (error) {
    throw error;
  }
}

async function getAllRoutinesByUser(username) {

  console.log("Getting all routines by user ", username);

  try {
    const { rows: routines } = await client.query(`
    SELECT * 
    FROM routines
    WHERE "creatorName"=$1;
   `, [username]);

   console.log("About to call attach from getAllRoutinesByUser and user routines are ", routines);
    const userRoutines = await attachActivitiesToRoutines(routines);
    return userRoutines;
  } catch (error) {
    throw error;
  }

  
}

async function getPublicRoutinesByUser(username) {

  console.log("Getting all public routines by user ", username);
  try {
    const { rows: routines } = await client.query(`
    SELECT * 
    FROM routines
    WHERE "creatorName"=$1 AND "isPublic"=true;
   `, [username]);

    const userRoutines = await attachActivitiesToRoutines(routines);
    return userRoutines;
  } catch (error) {
    throw error;
  }


}

async function getAllPublicRoutines() {

  console.log("Getting all public routines");
  try {
    const { rows } = await client.query(`
    SELECT * 
    FROM routines
    WHERE "isPublic"= true;
   `);

    return rows;
  } catch (error) {
    throw error;
  }

}

//Here we are passing in the routineActivityId of a specific item in the routine_activities table
//We need to return the routine that is the parent of this particular activity.
//This will be used later to determine if the user logged in can modify the count and duration
//fields in the routine_activity item.
async function getRoutineByActivityId(id) {

  console.log("Inside getRoutineByActivityid and id is ", id);
  try {
    const { rows } = await client.query(`
    SELECT *
    FROM routines
    INNER JOIN routine_activities
      ON routine_activities."routineActivityId"=$1
    WHERE routines.id=routine_activities."routineId";
    `, [id]);

    return rows;
  } catch (error) {
    throw error;
  }

}

async function getPublicRoutinesByActivity(id) {

  console.log("Inside getPublicRoutinesByActivity", id);

  //I think I need to grab all public routines that are associated with the activity Id passed in.
  //Once I get those rows then I call map on each row to attach activity to routine.
  try {
    const { rows } = await client.query(`
    SELECT routines.*
    FROM routines
    INNER JOIN routine_activities
      ON routine_activities."routineId"=routines.id AND routine_activities."routineActivityId"=$1
    WHERE routines."isPublic"=true;
    `, [id]);

    if (rows.length) {
      const routines = attachActivitiesToRoutines(rows);
      return(routines);
    } else {
      return({success: false, message: "No public routines for this activity"});
    }
  } catch (error) {
    throw error;
  }

}

async function createRoutine({creatorId, creatorName, isPublic, name, goal}) {

  try {
    const { rows: [routine] } = await client.query(`
    INSERT INTO routines("creatorId", "creatorName", "isPublic", name, goal) VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
    `, [creatorId, creatorName, isPublic, name, goal]);

    return routine;
  } catch (error) {
    throw error;
  }

}

async function updateRoutine(id, fields = {}) {

  console.log("Inside updateRoutine");
  // build the set string
  const setString = Object.keys(fields).map(
    (key, index) => `"${ key }"=$${ index + 1 }`
  ).join(', ');

  console.log("set String is ", setString);

  try {
    if (setString.length > 0) {
      await client.query(`
      UPDATE routines 
      SET ${ setString }
      WHERE routines.id=${ id }
      RETURNING *;
    `, Object.values(fields));
    }

    return getRoutineById(id);
  } catch (error) {
    throw error;
  }

}

async function destroyRoutine(id) {

  console.log("Inside destroy routine", id);

  //We need to delete the routine activities first because of the dependency relationship
  //with the routine itself. Like the situation involving dropping tables in seedData.
  destroyRoutineActivity(id);

  //Save it off before we delete it so we can return the correct info.
  const deletedRoutine = await getRoutineById(id);

  try {
    const { rows: routine } = await client.query(`
    DELETE 
    FROM routines
    WHERE id=$1;
    `, [id]);
    deletedRoutine.success = true;
    return deletedRoutine;
  } catch (error) {
    throw error;
  }

}

module.exports = {
  getRoutineById,
  getRoutineByActivityId,
  getRoutinesWithoutActivities,
  getAllRoutines,
  getAllPublicRoutines,
  getAllRoutinesByUser,
  getPublicRoutinesByUser,
  getPublicRoutinesByActivity,
  createRoutine,
  updateRoutine,
  destroyRoutine,
}