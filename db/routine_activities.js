const client = require('./client');
const { getRoutineById } = require('./routines');

async function getRoutineActivityById(id){
}


async function addActivityToRoutine({
  routineId,
  activityId,
  count,
  duration,
}) {

  
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

async function updateRoutineActivity ({id, ...fields}) {
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
}

module.exports = {
  getRoutineActivityById,
  addActivityToRoutine,
  getRoutineActivitiesByRoutine,
  updateRoutineActivity,
  destroyRoutineActivity,
  canEditRoutineActivity,
};
