const client = require("./client");
const bcrypt = require('bcrypt');

// database functions

// user functions
async function createUser({ username, password }) {
  
  const SALT_COUNT = 10;

  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
  password = hashedPassword;

  try {
    const { rows: [user] } = await client.query(`
    INSERT INTO users (username, password) VALUES ($1, $2)
    RETURNING *;
    `, [username, password]);

    return user;
  } catch (error) {
    throw error;
  }
  
}

async function getUser({ username, password }) {

  const user = await getUserByUsername(username);
  const hashedPassword = user.password;

  const isValid = await bcrypt.compare(password, hashedPassword);
  if (isValid) {
    return user;
  } else {
    return ("Password is not correct");
  }

}

async function getUserById(userId) {

  try {
    const { rows: [user] } = await client.query(`
    SELECT *
    FROM users
    WHERE id=$1;
    `, [userId]);

    delete user.password;
    return user;
  } catch (error) {
    throw error;
  }

}

async function getUserByUsername(userName) {

  try {
    const { rows: [user] } = await client.query(`
    SELECT *
    FROM users
    WHERE username=$1;
    `, [userName]);

    return user;
    
  } catch (error) {
    throw error;
  }

}

module.exports = {
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
}
