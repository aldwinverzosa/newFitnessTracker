const client = require("./client")

// database functions
async function getAllActivities() {

  try {
    const { rows } = await client.query(`
    SELECT *
    FROM activities
    ORDER BY id;
    `);

    return rows;
  } catch (error) {
    throw error;
  }

}

async function getActivityById(id) {

  try {
    const { rows } = await client.query(`
    SELECT *
    FROM activities
    WHERE activities.id=$1;
    `, [id]);

    return rows;
  } catch (error) {
    throw error;
  }

  
}

async function getActivityByName(name) {

  try {
    const { rows } = await client.query(`
    SELECT *
    FROM activities
    WHERE activities.name=$1;
    `, [name]);

    return rows;
  } catch (error) {
    throw error;
  }

}

// select and return an array of all activities
// This must be where we need to output the array of activities on the routines
async function attachActivitiesToRoutines(routines) {

  console.log("1. Inside attachActivitiesToRoutines and routines is", routines);

  const routineIds = routines.map((routine) => routine.id).join(",");

  try {
    const { rows: activities } = await client.query(
      `
      SELECT activities.*, routine_activities.duration, routine_activities.count, routine_activities."routineActivityId", routine_activities."routineId"
      FROM activities 
      JOIN routine_activities ON routine_activities."routineActivityId" = activities.id
      WHERE routine_activities."routineId" IN (${routineIds});
    `
    );

    for (const routine of routines) {
      const addActivities = activities.filter(
        (activity) => activity.routineId === routine.id
      );
      routine.activities = addActivities;
    }
    return routines;
  } catch (error) {
    throw error;
  }
}

// return the new activity
async function createActivity({ name, description }) {

  try {
    const { rows } = await client.query(`
    INSERT INTO activities(name, description) VALUES ($1, $2)
    --ON CONFLICT (name) DO NOTHING;
    --RETURNING *;
    `, [name, description]);

    return rows;
  } catch (error) {
    throw error;
  }

}

// don't try to update the id
// do update the name and description
// return the updated activity
async function updateActivity(id, fields = {}) {

  // build the set string
  const setString = Object.keys(fields).map(
    (key, index) => `"${ key }"=$${ index + 1 }`
  ).join(', ');

  try {
    if (setString.length > 0) {
      await client.query(`
      UPDATE activities 
      SET ${ setString }
      WHERE activities.id=${ id }
      RETURNING *;
    `, Object.values(fields));
    }

    return getActivityById(id);
  } catch (error) {
    throw error;
  }

}


module.exports = {
  getAllActivities,
  getActivityById,
  getActivityByName,
  attachActivitiesToRoutines,
  createActivity,
  updateActivity,
}
