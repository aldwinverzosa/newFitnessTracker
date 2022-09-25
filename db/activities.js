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

  console.log("Inside attach activities to routines and routine is", routines);
  let id = routines.id;
  
  try {
    const { rows } = await client.query(`
    SELECT "routineActivityId", "routineId", duration, count, activities.id, activities.name, activities.description
    FROM routine_activities
    INNER JOIN activities
      ON routine_activities."routineActivityId"=activities.id
    WHERE routine_activities."routineId"=${id};
    
    `);


    return rows;
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
