const express = require('express');
const jwt = require('jsonwebtoken');
const { updateRoutineActivity, getRoutineByActivityId } = require('../db');
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
            const routine = await getRoutineByActivityId(req.params.routineActivityId);
            console.log("routine id and id are", id, routine[0].creatorId);
            if (id === routine[0].creatorId ) {
              const updatedRoutineActivity = await updateRoutineActivity(req.params.routineActivityId, {count, duration}); 
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

module.exports = router;
