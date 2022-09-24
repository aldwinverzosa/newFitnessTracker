const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { getUserByUsername, createUser, getUserById } = require('../db');


router.use((req, res, next) => {
  console.log("A request is being made to /users");

  next();
  
});


// POST /api/users/login
router.post('/login', async (req, res, next) => {

    const { username, password } = req.body;
    
    // request must have both
    if (!username || !password) {
      next({
        name: "MissingCredentialsError",
        message: "Please supply both a username and password"
      });
    }

    try {
        const user = await getUserByUsername(username);
                
        if (user && user.password === password) {
          // create token & return to user
          const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET);
          req.user = user;
          res.send({ user: user, message: "you're logged in!", token: token });
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
    res.send({user: user, message: "Thank you for signing up", token});
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
  const { username } = req.params.username;
  let bPublicOnly = true;

  if (!auth) {
    console.log("No Authorization provided but can send only public routines");
    bPublicOnly = true;
  } else if (auth.startsWith(prefix)) {
      const token = auth.slice(prefix.length);

      try {
          const { id } = jwt.verify(token, process.env.JWT_SECRET);
    
          if (id) {
            req.user = await getUserById(id);
            //If the logged in user is making the request with their own username then send both public and private
            if (req.user.username === username) {
              bPublicOnly = false;
            }
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


module.exports = router;
