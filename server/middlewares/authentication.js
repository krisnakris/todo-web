const {User} = require('../models');
const { verifyToken } = require('../helpers/jwt');

const authenticate = (req, res, next) => {
  try {
    const token = req.headers.accesstoken;
    const decoded = verifyToken(token);
    console.log('decoded: ', decoded);
    let { email } = decoded;

    User.findOne({
      where: {
        email
      }
    })
      .then(userDb => {
        if (userDb) {
          req.currentUser = decoded;
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
    console.log(err);
    next({
      code: 401, 
      message : "Invalid token"
    })
  }
}

module.exports = authenticate;