const client = require('./client');

async function getRoutineById(id){

  try {
    const { rows: routine } = await client.query(`
    SELECT *
    FROM routines
    WHERE id=${id};
    `);

    return routine;
  } catch (error) {
    throw error;
  }


}

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
}

async function getAllRoutinesByUser(username) {

  console.log("Gettting all routines by user ", username);
  try {
    const { rows } = await client.query(`
    SELECT * 
    FROM routines
    WHERE "creatorName"=$1;
   `, [username]);

    return rows;
  } catch (error) {
    throw error;
  }

}

async function getPublicRoutinesByUser(username) {

  console.log("Getting all public routines by user ", username);
  try {
    const { rows } = await client.query(`
    SELECT * 
    FROM routines
    WHERE "creatorName"=$1 AND "isPublic"=true;
   `, [username]);

    return rows;
  } catch (error) {
    throw error;
  }


}

async function getAllPublicRoutines() {
}

async function getPublicRoutinesByActivity(id) {

  console.log("Inside getPublicRoutinesByActivity", id);

  //I think I need to grab all public routines that are associated with the activity Id passed in.
  //Once I get those rows then I call map on each row to attach activity to routine.
  //then do routine.activity = activityArr;
  //return routine
  try {
    const { rows } = await client.query(`
    --SELECT "routineActivityId", "routineId", duration, count, activities.id, activities.name, activities.description
    SELECT *
    FROM routines
    INNER JOIN routine_activities
      ON routine_activities."routineActivityId"=${id}
    INNER JOIN activities
      ON routine_activities."routineId"=routines.id
    WHERE "creatorId"=${id} AND "isPublic"=true;
        
    `);
    return rows;
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

async function updateRoutine({id, ...fields}) {
}

async function destroyRoutine(id) {
}

module.exports = {
  getRoutineById,
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