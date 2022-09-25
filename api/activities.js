const express = require('express');
const { getAllActivities, getPublicRoutinesByActivity, attachActivitiesToRoutines, getActivityById, updateActivity } = require('../db');
const router = express.Router();

// GET /api/activities/:activityId/routines
router.get('/:activityId/routines', async (req, res) => {

    //console.log("Inside GET routines by activity ID", req.params.activityId);
    const routines = await getPublicRoutinesByActivity(req.params.activityId);

    //Once we have all the routines we can map over them and add the Array of activities
    //Attach activities for each routine
    for (let i = 0; i < routines.length; i++) {
        let activitiesArr = await attachActivitiesToRoutines(routines[i]);
        routines[i].Activity = activitiesArr;
    }
    console.log("Routines with attached activities are :", routines);
    res.send(routines);

});

// GET /api/activities
router.get('/', async (req, res) => {

    //console.log("Inside GET all activities");
    const activities = await getAllActivities();
    //console.log("activities is ", activities);
    res.send(activities);

});

// POST /api/activities


// PATCH /api/activities/:activityId
router.patch('/:activityId', async (req, res) => {

    const { name, description } = req.body;
    console.log("Inside patch activity and ", name, description, req.params.activityId);

    //console.log("Inside Patch activity");
    const activity = await updateActivity(req.params.activityId, {name, description});
    //console.log("activities is ", activities);
    res.send(activity);

});

module.exports = router;
