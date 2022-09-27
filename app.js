require("dotenv").config();

const express = require("express");
const morgan = require('morgan');
const router = require('./api/index');
const client = require('./db/client');
const cors = require('cors');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

app.use('/api', router);

client.connect();

// Setup your Middleware and API Router here

// all routers attached ABOVE here
router.use((error, req, res, next) => {
    res.send({
      name: error.name,
      message: error.message
    });
});


module.exports = app;
