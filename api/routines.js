const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { attachActivitiesToRoutines, addActivityToRoutine } = require('../db');
const router = express.Router();
const { getAllRoutines, createRoutine, updateRoutine, getRoutineById, destroyRoutine } = require('../db/routines')
const { requireUser } = require('./utils');
const { getUserById } = require('../db/users');
//const { reset } = require('nodemon');

// GET /api/routines
router.get('/', async (req, res) => {

  const routines = await getAllRoutines();
/*
    for (let i = 0; i < routines.length; i++) {
        let activitiesArr = await attachActivitiesToRoutines(routines[i]);
        routines[i].Activity.push(activitiesArr);
    }*/
    res.send(routines);

});

// POST /api/routines
router.post('/', requireUser, async (req, res, next) => {

    const { name, goal, isPublic } = req.body;
   
    const prefix = 'Bearer '
    const auth = req.header('Authorization');

    if (!auth) {
        console.log("No Authorization provided");
    } else if (auth.startsWith(prefix)) {
          const token = auth.slice(prefix.length);
          try {
            const { id } = jwt.verify(token, process.env.JWT_SECRET);
            if (id) {
              const user = await getUserById(id);

              const postData = {};
              postData.creatorId = user.id;
              postData.creatorName = user.username;
              postData.isPublic = isPublic;
              postData.name = name;
              postData.goal = goal;

              const routine = await createRoutine(postData);
              res.send({routine});
            } 
        } catch ({ name, message }) {
        next({ name, message });
        }
    } else {
        next({message: "No token passed in."})
    }
});

// PATCH /api/routines/:routineId
// This requires a logged in user AND the user logged in must be the owner of the routine
// PATCH /api/activities/:activityId
router.patch('/:routineId', requireUser, async (req, res, next) => {

    const { name, goal, isPublic } = req.body;
    console.log("Inside patch routine and ", name, goal, isPublic, req.params.routineId);

    //TODO: Perform the check in this routine to make sure the logged in user is the owner 
    //      of this routine.
    const prefix = 'Bearer '
    const auth = req.header('Authorization');

    if (!auth) {
        next({message: "No Authorization provided"});
    } else if (auth.startsWith(prefix)) {
        const token = auth.slice(prefix.length); 
        try {
            const { id } = jwt.verify(token, process.env.JWT_SECRET);
            const routine = await getRoutineById(req.params.routineId);
            
            if (id === routine[0].creatorId ) {
              const postData = {};

              //Make sure we only change items sent in
              if (name)
                postData.name = name;
              if (goal)
                postData.goal = goal;
              if (isPublic)
                postData.isPublic = isPublic;
              
              const updatedRoutine = await updateRoutine(req.params.routineId, postData); 
              res.send(updatedRoutine);
            } else {
              next({message: "You are not the owner of this routine."}) 
            }
        } catch ({ name, message }) {
            next({ name, message });
        }
    }
});

// DELETE /api/routines/:routineId
router.delete('/:routineId', requireUser, async (req, res, next) => {

    console.log("Inside delete routine:", req.params.routineId);

    //TODO: Perform the check in this routine to make sure the logged in user is the owner 
    //      of this routine.
    const prefix = 'Bearer '
    const auth = req.header('Authorization');

    if (!auth) {
        next({message: "No Authorization provided"});
    } else if (auth.startsWith(prefix)) {
        const token = auth.slice(prefix.length); 
        try {
            const { id } = jwt.verify(token, process.env.JWT_SECRET);
            const routine = await getRoutineById(req.params.routineId);
            console.log("routine id and id are", id, routine[0].creatorId);
            if (id === routine[0].creatorId ) {
              const deletedRoutine = await destroyRoutine(req.params.routineId); 
              res.send(deletedRoutine);
            } else {
              next({message: "You are not the owner of this routine."}) 
            }
        } catch ({ name, message }) {
            next({ name, message });
        }
    }
});

// POST /api/routines/:routineId/activities
router.post('/:routineId/activities', async (req, res, next) => {

  const { activityId, count, duration } = req.body;
  const routineId = req.params.routineId;


  console.log("Inside post activity to a routine", activityId, count, duration);
  try {
    const routineActivity = await addActivityToRoutine({activityId, routineId, duration, count});
    res.send(routineActivity);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = router;
