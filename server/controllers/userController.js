const {User} = require('../models')
const {comparePassword} = require('../helpers/bcrypt');
const {OAuth2Client} = require('google-auth-library');
const { createToken }  = require('../helpers/jwt');

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
        let id = data.id;
        
        res.status(201).json({id, email})
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
        if (user.length > 0) {

          let checkPassword = comparePassword(password, user[0].password);
          let id = user[0].id;
          let email = user[0].email;

          if (checkPassword) {
            const accessToken = createToken({ 
              id, email
            })
            res.status(200).json({ accessToken }) 
          } else {
            next ({
              name: "customError", 
              code: 400,
              message : "Invalid email or password" })
          }
          
        } else {
          next ({
            name: "customError",  
            code: 400, 
            message : "Invalid email or password" })
        }
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

  static googleLogin (req, res, next) {
    const client = new OAuth2Client(process.env.CLIENT_ID);
    
    client.verifyIdToken({
      idToken : req.body.googleToken,
      audience : process.env.CLIENT_ID
    })
      .then(ticket => {
        const payload = ticket.getPayload();
        let email = payload.email;

        return User.findOrCreate({
          where : {email},
          defaults: {
            email, 
            password : process.env.PASS_GOOGLEUSER
          }
        })
          .then(userDb => {
            let id = userDb[0].id;
            const token = createToken({
              id,
              email
            });
            res.status(200).json({id, email, accessToken : token});
          })
      })
      .catch(err => {
        
      })
  }
}

module.exports = UserController;