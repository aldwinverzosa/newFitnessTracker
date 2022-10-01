const http = require("http")
const chalk = require("chalk")
const app = require("./app")
const express = require('express');

const { PORT = 3001 } = process.env;


const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(
    chalk.blueBright("Server is listening on PORT:"),
    chalk.yellow(PORT),
    chalk.blueBright("Get your routine on!")
  )
})
