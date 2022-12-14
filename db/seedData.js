// require in the database adapter functions as you write them (createUser, createActivity...)
 const { createUser, createActivity, createRoutine, getRoutinesWithoutActivities, getAllActivities, addActivityToRoutine } = require('./');
const client = require("./client")

async function dropTables() {
  console.log("Dropping All Tables...")
  // drop all tables, in the correct order
  try {
     await client.query(`
      DROP TABLE IF EXISTS routine_activities;
      DROP TABLE IF EXISTS routines;
      DROP TABLE IF EXISTS users;
      DROP TABLE IF EXISTS activities;

    `);

    console.log("FINISHED DROPPING TABLES");
  } catch (error) {
    console.log("ERROR Dropping Tables");
    throw error; // we pass the error up to the function that calls dropTables
  }
}

async function createTables() {
  console.log("Starting to build tables...")
  // create all tables, in the correct order
  try {
    await client.query(`
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      username varchar(255) UNIQUE NOT NULL,
      password varchar(255) NOT NULL
      );
    `);

    await client.query(`
    CREATE TABLE activities (
      id SERIAL PRIMARY KEY,
      name varchar(255) UNIQUE NOT NULL,
      description TEXT NOT NULL
      );
    `);

    await client.query(`
    CREATE TABLE routines (
      id SERIAL PRIMARY KEY,
      "creatorId" INTEGER REFERENCES users(id),
      "creatorName" varchar(255) NOT NULL,
      "isPublic" BOOLEAN DEFAULT true,
      name varchar(255) NOT NULL,
      goal varchar(255) NOT NULL
      );
    `);

    await client.query(`
    CREATE TABLE routine_activities (
      id SERIAL PRIMARY KEY,
      "routineActivityId" INTEGER REFERENCES activities(id),
      "routineId" INTEGER REFERENCES routines(id),
      duration INTEGER NOT NULL,
      count INTEGER NOT NULL,
      CONSTRAINT UC_routine_activities UNIQUE ("routineActivityId", "routineId")
      );
    `);


    console.log("FINISHED BUILDING TABLES");
    } catch (error) {
      console.log("ERROR Building Tables");
      throw error; // we pass the error up to the function that calls createTables
    }
}

/* 

DO NOT CHANGE ANYTHING BELOW. This is default seed data, and will help you start testing, before getting to the tests. 

*/

async function createInitialUsers() {
  console.log("Starting to create users...")
  try {
    const usersToCreate = [
      { username: "albert", password: "bertie99" },
      { username: "sandra", password: "sandra123" },
      { username: "glamgal", password: "glamgal123" },
    ]

    for (let i = 0; i < usersToCreate.length; i++) {
      await createUser(usersToCreate[i]);
    }
    
    console.log("Users created:")
    console.log(usersToCreate);
    console.log("Finished creating users!")
  } catch (error) {
    console.error("Error creating users!")
    throw error
  }
}
async function createInitialActivities() {

  try {
    console.log("Starting to create activities...")

    const activitiesToCreate = [
      {
        name: "wide-grip standing barbell curl",
        description: "Lift that barbell!",
      },
      {
        name: "Incline Dumbbell Hammer Curl",
        description:
          "Lie down face up on an incline bench and lift thee barbells slowly upward toward chest",
      },
      {
        name: "bench press",
        description: "Lift a safe amount, but push yourself!",
      },
      { name: "Push Ups", description: "Pretty sure you know what to do!" },
      { name: "squats", description: "Heavy lifting." },
      { name: "treadmill", description: "running" },
      { name: "stairs", description: "climb those stairs" },
    ]
    for (let i = 0; i < activitiesToCreate.length; i++) {
      await createActivity(activitiesToCreate[i]);
    }
    //const activities = await Promise.all(activitiesToCreate.map(createActivity))

    console.log("activities created:")
    console.log(activitiesToCreate);

    console.log("Finished creating activities!")
  } catch (error) {
    console.error("Error creating activities!")
    throw error
  }
}

async function createInitialRoutines() {
  console.log("starting to create routines...")

  const routinesToCreate = [
    {
      creatorId: 1,
      creatorName: "albert",
      isPublic: false,
      name: "Bicep Day",
      goal: "Work the Back and Biceps.",
    },
    {
      creatorId: 2,
      creatorName: "sandra",
      isPublic: true,
      name: "Chest Day",
      goal: "To beef up the Chest and Triceps!",
    },
    {
      creatorId: 2,
      creatorName: "sandra",
      isPublic: false,
      name: "Leg Day",
      goal: "Running, stairs, squats",
    },
    {
      creatorId: 1,
      creatorName: "albert",
      isPublic: true,
      name: "Cardio Day",
      goal: "Running, stairs. Stuff that gets your heart pumping!",
    },
  ]
  const routines = await Promise.all(
    routinesToCreate.map((routine) => createRoutine(routine))
  )
  console.log("Routines Created: ", routines)
  console.log("Finished creating routines.")
}

async function createInitialRoutineActivities() {
  console.log("starting to create routine_activities...")
  const [bicepRoutine, chestRoutine, legRoutine, cardioRoutine] =
    await getRoutinesWithoutActivities()
  const [bicep1, bicep2, chest1, chest2, leg1, leg2, leg3] =
    await getAllActivities();

    //console.log("bicep1 is ", bicep1);
    //console.log("leg3 is ", leg3);
    //bicep1 is 1, bicep2 is 2,...,leg3 is 7

    
  const routineActivitiesToCreate = [
    {
      routineId: bicepRoutine.id,
      activityId: bicep1.id,
      count: 10,
      duration: 5,
    },
    {
      routineId: bicepRoutine.id,
      activityId: bicep2.id,
      count: 10,
      duration: 8,
    },
    {
      routineId: chestRoutine.id,
      activityId: chest1.id,
      count: 10,
      duration: 8,
    },
    {
      routineId: chestRoutine.id,
      activityId: chest2.id,
      count: 10,
      duration: 7,
    },
    {
      routineId: legRoutine.id,
      activityId: leg1.id,
      count: 10,
      duration: 9,
    },
    {
      routineId: legRoutine.id,
      activityId: leg2.id,
      count: 10,
      duration: 10,
    },
    {
      routineId: legRoutine.id,
      activityId: leg3.id,
      count: 10,
      duration: 7,
    },
    {
      routineId: cardioRoutine.id,
      activityId: leg2.id,
      count: 10,
      duration: 10,
    },
    {
      routineId: cardioRoutine.id,
      activityId: leg3.id,
      count: 10,
      duration: 15,
    },
  ]
  const routineActivities = await Promise.all(
    routineActivitiesToCreate.map(addActivityToRoutine)
  )
  console.log("routine_activities created: ", routineActivities)
  console.log("Finished creating routine_activities!")
}

async function rebuildDB() {
  try {
    await dropTables()
    await createTables()
    await createInitialUsers()
    await createInitialActivities()
    await createInitialRoutines()
    await createInitialRoutineActivities()
  } catch (error) {
    console.log("Error during rebuildDB")
    throw error
  }
}

module.exports = {
  rebuildDB,
  dropTables,
  createTables,
}
