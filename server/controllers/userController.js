const {User} = require('../models')
const {comparePassword} = require('../helpers/bcrypt');
const jwt = require('jsonwebtoken');

class UserController {
  static register (req, res, next) {
    let body = req.body;
    let email = body.email;
    let password = body.password;

    let object = {
      email, password
    }

    User.create(object)
      .then(data => {
          let createdUser = {
          id : data.id,
          email : data.email
        }
        
        res.status(201).json({success: true, message: 'User created', createdUser})
      })
      .catch(err => {
        if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
          next(err);
        } else {
          next({
            code : 500,
            message : 'Internal server error'
          })
        }
      })
  }

  static login (req, res, next) {
    let body = req.body;
    let email = body.email;
    let password = body.password;

    User.findAll( {
      where : {
        email
      }
    })
      .then(user => {
        if (user) {
          let checkPassword = comparePassword(password, user[0].password);
          let id = user[0].id;
          let email = user[0].email;

          if (checkPassword) {
            const acessToken = jwt.sign({ 
              id, email
            },
              process.env.SECRETKEY
            )
            res.status(200).json({ acessToken }) 
          } else {
            next ({ 
              code: 401,
              message : "Invalid email or password" })
          }
          
        } else {
          next ({ 
            code: 401, 
            message : "Invalid email or password" })
        }
      })
      .catch(err => {
        next ({
          code : 500,
          message : "Internal server error"
        })
      })
  }
}

module.exports = UserController;