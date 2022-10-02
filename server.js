const http = require("http")
const chalk = require("chalk")
const app = require("./app")
const express = require('express');

const { PORT = 3001 } = process.env;
//const PORT = process.env.PORT;


const server = http.createServer(app);

server.listen(process.env.PORT, () => {
  console.log(
    chalk.blueBright("Server is listening on PORT:"),
    chalk.yellow(PORT),
    chalk.blueBright("Get your routine on!")
  )
})
