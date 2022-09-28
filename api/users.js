const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { getUserByUsername, createUser, getUserById, getAllRoutinesByUser, getPublicRoutinesByUser, attachActivitiesToRoutines } = require('../db');


router.use((req, res, next) => {
  console.log("A request is being made to /users");

  next();
  
});


// POST /api/users/login
router.post('/login', async (req, res, next) => {

    const { username, password } = req.body;
    console.log("username/password is ", username, password);
    //console.log("req is ", req);
    
    // request must have both
    if (!username || !password) {
      next({
        name: "MissingCredentialsError",
        message: "Please supply both a username and password"
      });
    }

    try {
        const user = await getUserByUsername(username);
        const hashedPassword = user.password;
        const isValid = await bcrypt.compare(password, hashedPassword);

        if (user && isValid) {
          // create token & return to user
          const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET);
          req.user = user;
          res.send({ success: true, user: user, message: "you're logged in!", token: token });
        } else {
          next({ 
            name: 'IncorrectCredentialsError', 
            message: 'Username or password is incorrect'
          });
        }
      } catch(error) {
        console.log(error);
        next(error);
      }
    });  


// POST /api/users/register
router.post('/register', async (req, res, next) => {

  const { username, password } = req.body;

  try {
    const _user = await getUserByUsername(username);
    
    if(_user) {
      next({
        name: 'UserExistsError',
        message: 'A user by that username already exists'
      });
    }

    const user = await createUser({username, password});
    
    const token = jwt.sign({id: user.id, username}, process.env.JWT_SECRET, {expiresIn: '1w'});
    res.send({success: true, user: user, message: "Thank you for signing up", token});
  } catch ({ name, message }) {
    next({ name, message})
  }
});


// GET /api/users/me
router.get('/me', async (req, res) => {

    const prefix = 'Bearer '
    const auth = req.header('Authorization');
  
    if (!auth) {
      console.log("No Authorization provided");
    } else if (auth.startsWith(prefix)) {
        const token = auth.slice(prefix.length);
  
        try {
            const { id } = jwt.verify(token, process.env.JWT_SECRET);
      
            if (id) {
              req.user = await getUserById(id);
              res.send({user: req.user});
            } else {
              res.send({message: "Invalid token submitted"});
            }
        } catch (error) {
            console.log(error);
        }
    } else {
          res.send({
            name: 'AuthorizationHeaderError',
            message: `Authorization token must start with ${ prefix }`
          });
    }
  
});


// GET /api/users/:username/routines
router.get('/:username/routines', async (req, res) => {

  const prefix = 'Bearer '
  const auth = req.header('Authorization');
  let token = '';
  let activitiesArr = [];
  
  console.log("User name in api/users/username is and auth is", req.params.username, auth);

  if (!auth) {
    //do nothing
  } else if (auth.startsWith(prefix)) {
    token = auth.slice(prefix.length);
    console.log("Token inside of :username/routines is", token);
  }

  try {

      if (token !== '') {
        const { id } = jwt.verify(token, process.env.JWT_SECRET);
          
        if (id) {
          req.user = await getUserById(id);
          //If the logged in user is making the request with their own username then send both public and private
          if (req.user.username === req.params.username) {
            const allRoutines = await getAllRoutinesByUser(req.params.username);
            activitiesArr = await Promise.all(allRoutines.map(attachActivitiesToRoutines));
            allRoutines.activity = activitiesArr;
            res.send(allRoutines);
          }
        }
      } else {
        const publicRoutines = await getPublicRoutinesByUser(req.params.username);
        activitiesArr = await Promise.all(publicRoutines.map(attachActivitiesToRoutines));
        publicRoutines.activity = activitiesArr;
        console.log("After attachment Public routines are ", publicRoutines);
        res.send(publicRoutines);
      }

  } catch (error) {
    console.log(error);
  }

});


module.exports = router;
