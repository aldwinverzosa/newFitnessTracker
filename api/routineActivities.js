const express = require('express');
const { de } = require('faker/lib/locales');
const jwt = require('jsonwebtoken');
const { updateRoutineActivity, getRoutineByActivityId, destroyRoutineActivity, getRoutineActivityById, canEditRoutineActivity } = require('../db');
const router = express.Router();

// PATCH /api/routine_activities/:routineActivityId
router.patch('/:routineActivityId' , async (req, res, next) => {

    const { count, duration } = req.body;
    console.log("Inside patch routine activity and ", req.params.routineActivityId, count, duration);
   
    //Now we need to see if the user logged in is the owner of this routine
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
            //const routine = await getRoutineByActivityId(req.params.routineActivityId);
            //console.log("routine id and id are", id, routine[0].creatorId);
            if (canEditRoutineActivity(req.params.routineActivityId, id)) {
            //if (id === routine[0].creatorId ) {
              const updatedRoutineActivity = await updateRoutineActivity(req.params.routineActivityId, {count, duration}); 
              console.log("THE updated Routine activity is", updatedRoutineActivity);
              res.send(updatedRoutineActivity);
            } else {
              next({message: "You are not the owner of this routine."}) 
            }
        } catch ({ name, message }) {
            next({ name, message });
        }
    }

});

// DELETE /api/routine_activities/:routineActivityId
router.delete('/:routineActivityId' , async (req, res, next) => {

    console.log("Inside delete routine activity", req.params.routineActivityId);
       
    //Now we need to see if the user logged in is the owner of this routine
    //TODO: Perform the check in this routine to make sure the logged in user is the owner 
    //      of this routine.
    const prefix = 'Bearer '
    const auth = req.header('Authorization');

    if (!auth) {
        next({message: "No Authorization provided"});
    } else if (auth.startsWith(prefix)) {
        const token = auth.slice(prefix.length); 
        try {
            //There could be situations where the Activity ID is being used by more than
            //one user on a particular routine. We need to filter the one we own.
            const { id } = jwt.verify(token, process.env.JWT_SECRET);
            let routine = await getRoutineByActivityId(req.params.routineActivityId);
            if (routine.length > 1) {
                routine = routine.filter(rtn => rtn.creatorId === id);
            }
            console.log("routine we want is", routine);
            if (id === routine[0].creatorId ) {
              const deletedRoutineActivity = await destroyRoutineActivity(req.params.routineActivityId);
              routine[0].success = true;
              console.log("The deleted Routine activity is", routine);
              delete routine[0].creatorId; delete routine[0].creatorName;
              res.send(routine);
            } else {
              next({message: "You are not the owner of this routine."});
            }
        } catch ({ name, message }) {
            next({ name, message });
        }
    }
});

module.exports = router;
