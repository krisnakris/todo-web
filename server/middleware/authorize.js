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
        res.status(401).json({ message : 'Unathorized' });
      }
    })
    .catch(err => {
      res.status(404).json({ message : 'Resource not found' });
    })
}

module.exports = authorize;
