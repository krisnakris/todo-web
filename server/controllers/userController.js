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
        res.status(201).json({success: true, message: 'User created', data})
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
          console.log(user[0].password);
          let checkPassword = comparePassword(password, user[0].password);

          if (checkPassword) {
            const token = jwt.sign({ 
              id: user.id, 
              email: user.email
            },
              "sweet kitten"
            )

             res.status(200).json({ token }) 
          } else {
            throw {message : "invalid email or password" }
          }

        } else {
          throw {message : "invalid email or password" }
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({message : 'internal server error'})
      })
  }
}

module.exports = UserController;