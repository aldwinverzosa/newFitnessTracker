const express = require('express');
const jwt = require('jsonwebtoken');
const { requireUser } = require('./utils');
const { createActivity, getAllActivities, getPublicRoutinesByActivity, attachActivitiesToRoutines, getActivityById, updateActivity } = require('../db');
const router = express.Router();

// GET /api/activities/:activityId/routines
router.get('/:activityId/routines', async (req, res) => {

    console.log("Inside GET PUBLIC routines by activity ID", req.params.activityId);
    const routines = await getPublicRoutinesByActivity(req.params.activityId);

    if (routines.length)
      res.send({success: true, routines: routines});
    else 
      res.send({success: false, message: "No public routines for this activity"});

});

// GET /api/activities
router.get('/', async (req, res) => {

    //console.log("Inside GET all activities");
    const activities = await getAllActivities();
    //console.log("activities is ", activities);
    res.send({success: true, activities: activities});

});

// POST /api/activities
router.post('/', requireUser, async (req, res, next) => {

    const { name, description } = req.body;

    const prefix = 'Bearer '
    const auth = req.header('Authorization');

    if (!auth) {
        console.log("No Authorization provided");
    } else if (auth.startsWith(prefix)) {
          const token = auth.slice(prefix.length);
          try {
            const { id } = jwt.verify(token, process.env.JWT_SECRET);
            //We have a valid logged in user, so continue
            if (id) {
              const postData = {};
              if (name)
                postData.name = name;
              if (description)
                postData.description = description;

              const activity = await createActivity(postData);
              if (activity.length) {
                res.send({success: true, Activity: activity});
              } else {
                console.log("Are we getting here");
                res.send({success: false, message: "An activity by that name already exists...please rename."});
              }
            } else {
              res.send({success: false, message: "No user token passed in."})
            }
        } catch ({ name, message }) {
        next({ name, message });
        }
    } else {
        next({message: "No token passed in."})
    }
});

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
