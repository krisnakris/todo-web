const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  try {
    const token = req.headers.accesstoken;
    const decoded = jwt.verify(token, process.env.SECRETKEY);
    req.headers.decoded = decoded;
    next();
  }
  catch (err) {
    next({
      code: 401, 
      message : "Invalid token"
    })
  }
}

module.exports = authenticate;