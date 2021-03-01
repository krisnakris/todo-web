const bcrypt = require('bcryptjs');

const hashPassword = password => {
  return bcrypt.hashSync(password, 10);
}

const comparePassword = (inputPass, dbPass) => {
  return bcrypt.compareSync(inputPass, dbPass);
}

module.exports = {hashPassword, comparePassword}