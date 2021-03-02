const {User} = require('../models')
const {comparePassword} = require('../helpers/bcrypt');
const jwt = require('jsonwebtoken');

class UserController {
  static register (req, res) {
    let body = req.body;
    let email = body.email;
    let password = body.password;

    let object = {
      email, password
    }

    User.create(object)
      .then(data => {
        let object = {
          id : data.id,
          email : data.email
        }

        res.status(201).json({success: true, message: 'User created', object})
      })
      .catch(err => {
        res.status(500).json({message : 'Internal server error'});
      })
  }

  static login (req, res) {
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
              'sweet kitten'
            )
            res.status(200).json({ acessToken }) 
          } else {
            throw { message : "invalid email or password" }
          }

        } else {
          throw { message : "invalid email or password" }
        }
      })
      .catch(err => {
        let errorMessage;

        if (err.message) {
          errorMessage = err.message;
        } else {
          errorMessage = 'internal server errror';
        }
        res.status(500).json({message : errorMessage})

      })
  }
}

module.exports = UserController;