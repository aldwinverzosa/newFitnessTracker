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

  const routine = await getRoutineById(routineId);
  console.log("Routine is ", routine);
  
  //try {
  //  const { rows: activity } = await client.query(`
  //  INSERT INTO routines("routineId", "activityId", count, duration) VALUES ($1, $2, $3, $4)
  //  RETURNING *;
  //  `, [routineId, activityId, count, duration]);

    //return routine;
  //} catch (error) {
  //  throw error;
  //}


    
}

async function getRoutineActivitiesByRoutine({id}) {
}

async function updateRoutineActivity ({id, ...fields}) {
}

async function destroyRoutineActivity(id) {
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
