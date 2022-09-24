const express = require('express');
const { getAllActivities, getPublicRoutinesByActivity } = require('../db');
const router = express.Router();

// GET /api/activities/:activityId/routines
router.get('/:activityId/routines', async (req, res) => {


    console.log("Inside GET routines by activity ID", req.params.activityId);
    const routines = await getPublicRoutinesByActivity(req.params.activityId);
    console.log("routines is ", routines);
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

module.exports = router;
