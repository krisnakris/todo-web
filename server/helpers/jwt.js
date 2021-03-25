const jwt = require('jsonwebtoken');

function createToken (payload) {
  try {
    return jwt.sign(payload, process.env.SECRETKEY);
  } catch (error) {
    console.log(error);
  }
}

function verifyToken (payload) {
  try {
    return jwt.verify(payload, process.env.SECRETKEY);
  } catch (error) {
    console.log(error);
  }
}

module.exports = { createToken, verifyToken};