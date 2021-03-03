const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  try {
    const token = req.headers.accesstoken;
    const decoded = jwt.verify(token, process.env.SECRETKEY);
    req.headers.decoded = decoded;
    next();
  }
  catch (err) {
    res.status(401).json({
      message : 'Token invalid'
    })
  }
}

module.exports = authenticate;