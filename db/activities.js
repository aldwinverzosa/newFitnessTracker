const client = require("./client")

// database functions
async function getAllActivities() {

  try {
    const { rows } = await client.query(`
    SELECT *
    FROM activities;
    `);

    return rows;
  } catch (error) {
    throw error;
  }

}

async function getActivityById(id) {
  
}

async function getActivityByName(name) {

}

// select and return an array of all activities
// This must be where we need to output the array of activities on the routines
async function attachActivitiesToRoutines(routines) {

  //console.log("Inside attach activities to routines and routine is", routines);
  try {
    const { rows } = await client.query(`
    SELECT *
    FROM routine_activities
    INNER JOIN routines
    ON routine_activities."routineId"=routines.id;
    `);

    return rows;
  } catch (error) {
    throw error;
  }

}

// return the new activity
async function createActivity({ name, description }) {

  try {
    const { rows: [activity] } = await client.query(`
    INSERT INTO activities(name, description) VALUES ($1, $2)
    ON CONFLICT (name) DO NOTHING
    RETURNING *;
    `, [name, description]);

    return activity;
  } catch (error) {
    throw error;
  }

}

// don't try to update the id
// do update the name and description
// return the updated activity
async function updateActivity({ id, ...fields }) {

}


module.exports = {
  getAllActivities,
  getActivityById,
  getActivityByName,
  attachActivitiesToRoutines,
  createActivity,
  updateActivity,
}
