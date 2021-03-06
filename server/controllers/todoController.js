const {Todo} = require('../models');
const axios = require('axios');

class TodoController {
  static createTodo (req, res, next) {
    let body = req.body;

    let status = !body.status ? 'active' : body.status;

    if (status !== 'active' || status !== 'nonactive') {
      status = 'active';
    } 

    let object = {
      title: body.title,
      description : body.description,
      status,
      due_date : body.due_date
    }

    let header = req.headers;
    object.UserId = header.decoded.id;
    let hasil = null;

    Todo.create(object)
      .then(data => {
        
        return axios({
          method : 'GET',
          url : 'https://stoicquotesapi.com/v1/api/quotes/random'
        })
      })
      .then(quotes => {
        let Quotes = {
          quote : quotes.data.body,
          author : quotes.data.author
        };
        res.status(201).json({Quotes});
      })
      .catch(err => {
        if (err.name === 'SequelizeValidationError') {
          next(err);
        } else {
          next( {
            code : 500,
            message : 'Internal server error'
          })
        }
      })
  }

  static getTodo (req, res, next) {
    Todo.findAll({
      order : [['due_date', 'DESC']]
      }
    ) 
      .then(data => {
        res.status(200).send(data);
      })
      .catch(err => {
        next({
          code : 500,
          message : 'Internal server error'
        })
      })
  }

  static getTodoById (req, res, next) {
    let id = req.params.id;

    Todo.findByPk(id)
      .then(data => {
        res.status(200).send(data);
      })
      .catch(err => {
        next({
          code : 500,
          message : 'Internal server error'
        })
      })
  }

  static putTodo (req, res, next) {
    let id = req.params.id;
    let body = req.body;

    let object = {
      title : body.title,
      description : body.description,
      status : body.status,
      due_date : body.due_date,
    }

    Todo.findByPk(id)
      .then(todoDb => {
        let createdAt = todoDb.createdAt;
        let updatedAt = todoDb.updatedAt;

        object.createdAt = createdAt;
        object.updatedAt = updatedAt;

        return Todo.update(object, {
          where : {
            id
          }
        })
      })
      .then(data2 => {
        res.status(200).send(object);
      })
      .catch(err => {
        if (err.name === 'SequelizeValidationError') {
          next(err);
        } else {
          next( {
            code : 500,
            message : 'Internal server error'
          })
        }
      })
  }

  static patchTodo (req, res, next) {
    let id = req.params.id;
    let body = req.body;

    let object = {
      status : body.status
    }
    // let object = {};

    Todo.findByPk(id)
      .then(data => {
        let createdAt = data.createdAt;
        let updatedAt = data.updatedAt;
        let title = data.title;
        let description = data.description;
        // let status = data.status;
        let due_date = data.due_date;

        if (status == 'active') {
          status = 'nonactive';
        } else {
          status = 'active';
        }

        object.createdAt = createdAt;
        object.updatedAt = updatedAt;
        object.description = description;
        object.title = title;
        object.status = status;
        object.due_date = due_date;

        return Todo.update(object, {
          where : {
            id
          }
        })
      })
      .then(todoDbAfterUpdate => {
        res.status(200).send(object);
      })
      .catch(err => {
        if (err.name === 'SequelizeValidationError') {
          next(err);
        } else {
          next( {
            code : 500,
            message : 'Internal server error'
          })
        }
      })
  }

  static deleteTodo (req, res, next) {
    let id = req.params.id;

    Todo.destroy({
      where: {
        id
      }
    })
      .then(data => {
        res.status(200).send({ message : 'Todo success to delete' });
      })
      .catch(err => {
        next({
          code : 500,
          message : 'Internal server error'
        })
      })
  }
}

module.exports = TodoController;