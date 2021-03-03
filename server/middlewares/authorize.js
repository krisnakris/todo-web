const {Todo} = require('../models');

const authorize = (req, res, next) => {
  let id = req.params.id;
  let headerId = req.headers.decoded.id;

  Todo.findByPk(id, {
    where : {
      id
    }
  })
    .then(data => {
      if (data.UserId == headerId) {
        next();
      } else {
        next({
          code : 401,
          message : "Unauthorized"
        })
      }
    })
    .catch(err => {
      next({
        code : 404,
        message : "Resource not found"
      })
    })
}

module.exports = authorize;
