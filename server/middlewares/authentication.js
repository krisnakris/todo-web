const jwt = require('jsonwebtoken');
const {User} = require('../models');

const authenticate = (req, res, next) => {
  try {
    const token = req.headers.accesstoken;
    const decoded = jwt.verify(token, process.env.SECRETKEY);
    console.log('decoded: ', decoded);
    let {email} = decoded;

    User.findOne({
      where: {
        email
      }
    })
      .then(userDb => {
        if (userDb) {
          decoded.id = userDb.id;
          req.headers.decoded = decoded;
          next();
        } else {
          next({
            code: 401, 
            message : "Your email not registered"
          })
        }
      })
      .catch(err => {
        console.log('err: ', err);
        next({
          code : 500,
          message : 'Internal server error'
        })
      })

  }
  catch(err) {
    next({
      code: 401, 
      message : "Invalid token"
    })
  }
}

module.exports = authenticate;