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

async function getPublicRoutinesByActivity({id}) {
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