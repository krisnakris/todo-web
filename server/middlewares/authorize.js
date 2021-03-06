const {Todo} = require('../models');

const authorize = (req, res, next) => {
  let id = req.params.id;
  let headerId = req.headers.decoded.id;

  Todo.findByPk(id, {
    where : {
      id
    }
  })
    .then(todo => {
      if (todo.UserId == headerId) {
        next();
      } else {
        next({
          code: 401, 
          message : "Unauthorize"
        })
      }
    })
    .catch(err => {
      next({
        code: 404, 
        message : "Not Found"
      })
    })
}

module.exports = authorize;
