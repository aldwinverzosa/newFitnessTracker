const express = require('express');
const { attachActivitiesToRoutines } = require('../db');
const router = express.Router();
const { getAllRoutines } = require('../db/routines')

// GET /api/routines
router.get('/', async (req, res) => {

    const routines = await getAllRoutines();

    for (let i = 0; i < routines.length; i++) {
        let activitiesArr = await attachActivitiesToRoutines(routines[i]);
        routines[i].Activity = activitiesArr;
    }
    res.send(routines);

});

// POST /api/routines

// PATCH /api/routines/:routineId

// DELETE /api/routines/:routineId

// POST /api/routines/:routineId/activities

module.exports = router;
