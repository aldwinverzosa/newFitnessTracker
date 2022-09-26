const client = require('./client');
const { getRoutineById } = require('./routines');

async function getRoutineActivityById(id){

  try {
    const { rows : [routine] } = await client.query(`
    SELECT *
    FROM routine_activities
    WHERE routine_actvities."routineActivityId"=$1
    `, [id]);

    return routine;
  } catch (error) {
    throw error;
  }
}


//async function addActivityToRoutine(routineId, activityId, count, duration) {
async function addActivityToRoutine(routineActivity) {
  
  console.log("Inside addActivityToRoutine", routineActivity);
  const { routineId, activityId, count, duration } = routineActivity;
   try {
    const { rows : [routine] } = await client.query(`
    INSERT INTO routine_activities ("routineId", "routineActivityId", count, duration) VALUES ($1, $2, $3, $4)
    RETURNING *;
    `, [routineId, activityId, count, duration]);

    return routine;
  } catch (error) {
    throw error;
  }
 
}

async function getRoutineActivitiesByRoutine({id}) {
}

async function updateRoutineActivity (id, fields = {}) {

  console.log("Inside updateRoutineActivity");
  // build the set string
  const setString = Object.keys(fields).map(
    (key, index) => `"${ key }"=$${ index + 1 }`
  ).join(', ');

  console.log("set String is ", setString);

  try {
    if (setString.length > 0) {
      await client.query(`
      UPDATE routine_activities 
      SET ${ setString }
      WHERE routine_activities."routineActivityId"=${ id }
      RETURNING *;
    `, Object.values(fields));
    }

    return getRoutineActivityById(id);
  } catch (error) {
    throw error;
  }

}

async function destroyRoutineActivity(id) {

  console.log("Inside destroy routine activities");
  try {
    const { rows } = await client.query(`
    DELETE
    FROM routine_activities
    WHERE "routineId"=$1;
    `, [id]);

    //WE shouldn't need to return anything here; just delete the routine_activities
    //return rows;
  } catch (error) {
    throw error;
  }


}

async function canEditRoutineActivity(routineActivityId, userId) {

  //const routine = getRoutineActivityById(routineActivityId);
  //if (routine[0].)

}

module.exports = {
  getRoutineActivityById,
  addActivityToRoutine,
  getRoutineActivitiesByRoutine,
  updateRoutineActivity,
  destroyRoutineActivity,
  canEditRoutineActivity,
};
